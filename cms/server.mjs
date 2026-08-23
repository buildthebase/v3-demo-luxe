import http from "node:http";
import { createReadStream } from "node:fs";
import { access, copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { AsyncLocalStorage } from "node:async_hooks";
import sharp from "sharp";
import { Codex } from "@openai/codex-sdk";
import {
  buildLinkGraph,
  createEmptyArticle,
  parseInlineInternalLinks,
  routeFromPageFile,
  validateArticle,
} from "./core.mjs";
import {
  collectPublicPaths,
  extractPublicPageRecords,
  publicSnapshotRecords,
} from "./public-knowledge.mjs";
import { ADAPTERS, ProjectRegistry, ensureProjectScaffold } from "./projects.mjs";
import { GoogleSearchConsole } from "./google-search-console.mjs";
import { exportProjectBundle, importProjectBundle, inspectProjectBundle } from "./bundles.mjs";
import { prepareBulkLifecycle } from "./article-lifecycle.mjs";
import { projectStorageHealth, readProjectHelpSessions, writeProjectHelpSessions } from "./storage/help-service.mjs";
import { ProjectLockManager } from "./project-locks.mjs";
import {
  generateOpportunities,
  generateReport,
  importSearchConsoleCsv,
  runTechnicalCrawl,
  saveAnnotation,
  saveIntegration,
  saveOpportunity,
  saveSearchConsoleRows,
  seoState,
} from "./seo.mjs";

const CMS_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(CMS_DIR, "..");
const STATIC_DIR = path.join(CMS_DIR, "public");
const projectRegistry = new ProjectRegistry({ cmsDir: CMS_DIR, defaultRoot: DEFAULT_ROOT, legacySettingsFile: path.join(CMS_DIR, "settings.json") });
const projectLocks = new ProjectLockManager();
const projectStore = new AsyncLocalStorage();
const currentProject = () => {
  const context = projectStore.getStore();
  if (!context) throw Object.assign(new Error("A CMS project context is required."), { status: 409 });
  return context;
};
const projectRoot = () => currentProject().root;
const projectFiles = () => currentProject().files;
const requireCapability = (capability) => {
  if (!currentProject().adapter.capabilities.includes(capability)) {
    throw Object.assign(new Error(`The ${currentProject().adapter.label} adapter does not support ${capability}.`), { status: 409 });
  }
};

function effectiveSettings(projectSettings, globalSettings, manifest) {
  return {
    ...projectSettings,
    host: "127.0.0.1",
    port: globalSettings.port || 4317,
    includedUsageOnly: true,
    paidCreditsDisabledAcknowledged: globalSettings.paidCreditsDisabledAcknowledged === true,
    googleOAuthClientId: globalSettings.googleOAuthClientId || "",
    googleOAuthClientSecret: globalSettings.googleOAuthClientSecret || "",
    publicSiteUrl: projectSettings.publicSiteUrl || manifest.localSiteUrl || manifest.publicSiteUrl,
  };
}

const MUTATION_TOKEN = crypto.randomBytes(32).toString("hex");
const allowedOrigins = new Set();
const activeCodexRuns = new Map();
const managedSiteProcesses = new Map();
const managedSiteUrls = new Map();
const siteStartupPromises = new Map();
let googleSearchConsole;

function beginCodexRun(requestId, timeoutMs) {
  const id = String(requestId || crypto.randomUUID());
  const key = `${currentProject().id}:${id}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error(`Codex exceeded the ${Math.round(timeoutMs / 1000)}-second CMS limit.`)), timeoutMs);
  activeCodexRuns.set(key, controller);
  return {
    id,
    signal: controller.signal,
    finish() {
      clearTimeout(timeout);
      activeCodexRuns.delete(key);
    },
  };
}

function cancelCodexRun(requestId) {
  const controller = activeCodexRuns.get(`${currentProject().id}:${String(requestId || "")}`);
  if (!controller) return false;
  controller.abort(new Error("Cancelled from the CMS."));
  return true;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

async function atomicWriteJson(file, value, { revision = true } = {}) {
  await mkdir(path.dirname(file), { recursive: true });
  if (revision) {
    try {
      await access(file);
      await mkdir(projectFiles().revisions, { recursive: true });
      const stamp = new Date().toISOString().replaceAll(":", "-");
      await copyFile(file, path.join(projectFiles().revisions, `${path.basename(path.dirname(file))}-${path.basename(file, ".json")}-${stamp}.json`));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  const temporary = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
}

async function listFiles(directory, predicate, output = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (["node_modules", ".git", ".next", ".vinext", "dist", ".wrangler"].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await listFiles(full, predicate, output);
    else if (predicate(full)) output.push(full);
  }
  return output;
}

async function knownSitePaths() {
  if (!currentProject().adapter.capabilities.includes("articles")) return [];
  const pages = await listFiles(projectFiles().application, (file) => /\/page\.(tsx|ts|jsx|js)$/.test(file));
  const [metadataSource, published] = await Promise.all([
    readFile(projectFiles().metadata, "utf8"),
    readJson(projectFiles().published, []),
  ]);
  return collectPublicPaths({
    metadataSource,
    staticPaths: pages.map((file) => routeFromPageFile(projectRoot(), file)).filter(Boolean),
    publishedSlugs: published.map((article) => article.slug),
  });
}

async function loadCollections() {
  if (!currentProject().adapter.capabilities.includes("articles")) return { published: [], drafts: [], archived: [], trash: [], all: [] };
  const [published, drafts, archived, trash] = await Promise.all([
    readJson(projectFiles().published, []),
    readJson(projectFiles().draft, []),
    readJson(projectFiles().archived, []),
    readJson(projectFiles().trash, []),
  ]);
  return { published, drafts, archived, trash, all: [...published, ...drafts, ...archived, ...trash] };
}

async function buildState() {
  const [collections, voice, knowledge, snapshot, media, jobs, calendar, calendarConfig, calendarProposals, helpSessions, projectSettings, globalSettings, paths, seo, writerLock] = await Promise.all([
    loadCollections(),
    readJson(projectFiles().voice, {}),
    readJson(projectFiles().knowledge, []),
    readJson(projectFiles().snapshot, { schemaVersion: 1, generatedAt: null, records: [] }),
    readJson(projectFiles().media, []),
    readJson(projectFiles().jobs, []),
    readJson(projectFiles().calendar, []),
    readJson(projectFiles().calendarConfig, defaultCalendarConfig()),
    readJson(projectFiles().calendarProposals, []),
    readProjectHelpSessions(currentProject()),
    readJson(projectFiles().settings, {}),
    projectRegistry.globalSettings(),
    knownSitePaths(),
    seoState(currentProject()),
    projectLocks.status(currentProject()),
  ]);
  const storage = await projectStorageHealth(currentProject());
  const graph = buildLinkGraph(collections.all, paths);
  const issues = Object.fromEntries(collections.all.map((article) => [
    article.slug,
    validateArticle(article, collections.all, { voice, knownPaths: paths, graph }),
  ]));
  const project = currentProject();
  const settings = effectiveSettings(projectSettings, globalSettings, project.manifest);
  return {
    ...collections, voice, knowledge, snapshot, media, jobs, calendar, calendarConfig, calendarProposals, helpSessions,
    settings, knownPaths: paths, graph, issues, seo, storage, writerLock,
    project: { id: project.id, root: project.root, manifest: project.manifest, adapter: project.adapter },
  };
}

function defaultCalendarConfig() {
  return {
    schemaVersion: 1,
    cadencePerMonth: 2,
    preferredWeekdays: ["Tuesday", "Thursday"],
    planningLeadDays: 21,
    defaultCategory: "Event Planning",
    statuses: ["idea", "planned", "brief", "draft", "review", "scheduled", "published", "paused"],
    categoryTargets: {
      "Coffee Catering": 1,
      "Dessert Catering": 1,
      "Event Rentals": 1,
      Weddings: 1,
      "Corporate Events": 1,
      "Brand Activations": 1,
      "Private Events": 1,
      "Event Planning": 1
    },
    blackoutDates: [],
    campaignPeriods: []
  };
}

function json(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

function errorResponse(res, status, message, details) {
  json(res, status, { error: message, ...(details ? { details } : {}) });
}

async function readBody(req, limit = 5_000_000) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > limit) throw Object.assign(new Error("Request is too large."), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function readJsonBody(req) {
  const body = await readBody(req);
  if (!body.length) return {};
  try {
    return JSON.parse(body.toString("utf8"));
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON."), { status: 400 });
  }
}

function isLoopback(req) {
  const address = req.socket.remoteAddress || "";
  const host = String(req.headers.host || "").split(":")[0];
  return ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(address) && ["127.0.0.1", "localhost"].includes(host);
}

function requireMutationToken(req) {
  return crypto.timingSafeEqual(
    Buffer.from(String(req.headers["x-cms-token"] || "").padEnd(64).slice(0, 64)),
    Buffer.from(MUTATION_TOKEN),
  );
}

async function writeCollections(collections) {
  await Promise.all([
    atomicWriteJson(projectFiles().published, collections.published),
    atomicWriteJson(projectFiles().draft, collections.drafts),
    atomicWriteJson(projectFiles().archived, collections.archived),
    atomicWriteJson(projectFiles().trash, collections.trash),
  ]);
}

function proposalItemId(proposal, item, index) {
  return item.id || crypto.createHash("sha256").update(`${proposal.id}:${index}:${item.title}:${item.targetDate || ""}`).digest("hex").slice(0, 20);
}

async function syncProposalArticleState(article) {
  const proposals = await readJson(projectFiles().calendarProposals, []);
  let changed = false;
  for (const proposal of proposals) {
    proposal.items = (proposal.items || []).map((item, index) => {
      const matches = item.articleSlug === article.slug || (!item.articleSlug && item.title === article.title);
      if (!matches) return item;
      changed = true;
      return {
        ...item,
        id: proposalItemId(proposal, item, index),
        articleSlug: article.slug,
        articleStatus: article.status,
        articleStatusUpdatedAt: new Date().toISOString(),
      };
    });
  }
  if (changed) await atomicWriteJson(projectFiles().calendarProposals, proposals);
}

function removeArticle(collections, slug) {
  for (const key of ["published", "drafts", "archived", "trash"]) {
    collections[key] = collections[key].filter((article) => article.slug !== slug);
  }
}

async function saveArticle(article) {
  const collections = await loadCollections();
  const previous = collections.all.find((candidate) => candidate.slug === article.originalSlug || candidate.slug === article.slug);
  if (previous && !article.originalSlug && previous.status !== article.status) {
    throw Object.assign(new Error(`The slug “${article.slug}” is already used by a ${previous.status} article.`), { status: 409 });
  }
  removeArticle(collections, article.originalSlug || article.slug);
  const clean = { ...article, schemaVersion: 1, originalSlug: undefined, modifiedDate: new Date().toISOString() };
  delete clean.originalSlug;
  const key = clean.status === "published" ? "published" : clean.status === "archived" ? "archived" : clean.status === "trash" ? "trash" : "drafts";
  collections[key].push(clean);
  const all = [...collections.published, ...collections.drafts, ...collections.archived, ...collections.trash];
  const state = await buildState();
  const issues = validateArticle(clean, all, { voice: state.voice, knownPaths: state.knownPaths, graph: buildLinkGraph(all, state.knownPaths) });
  if (clean.status === "published" && issues.some((entry) => entry.severity === "error")) {
    throw Object.assign(new Error("Publishing is blocked by validation errors."), { status: 422, details: issues });
  }
  await writeCollections(collections);
  await syncProposalArticleState(clean);
  return { article: clean, previousStatus: previous?.status || null, issues };
}

async function lifecycle(slug, action, options = {}) {
  const collections = await loadCollections();
  const article = collections.all.find((candidate) => candidate.slug === slug);
  if (!article) throw Object.assign(new Error("Article not found."), { status: 404 });
  if (action === "publish") return saveArticle({ ...article, originalSlug: article.slug, status: "published" });
  if (action === "archive") {
    const disposition = options.archiveDisposition;
    if (!["retain-noindex", "redirect"].includes(disposition)) throw Object.assign(new Error("Choose an archive URL disposition."), { status: 422 });
    if (disposition === "redirect" && options.redirectTo === `/blog/${article.slug}`) throw Object.assign(new Error("An archived article cannot redirect to itself."), { status: 422 });
    return saveArticle({ ...article, originalSlug: article.slug, status: "archived", archiveDisposition: disposition, redirectTo: disposition === "redirect" ? options.redirectTo : undefined });
  }
  if (action === "trash") {
    if (article.status === "published") throw Object.assign(new Error("Archive a published article before moving it to Trash."), { status: 409 });
    if (article.status === "archived" && article.archiveDisposition === "retain-noindex") throw Object.assign(new Error("Assign a redirect before trashing an archived retained URL."), { status: 409 });
    return saveArticle({ ...article, originalSlug: article.slug, status: "trash" });
  }
  if (action === "restore") return saveArticle({ ...article, originalSlug: article.slug, status: "draft", archiveDisposition: undefined, redirectTo: undefined });
  throw Object.assign(new Error("Unknown lifecycle action."), { status: 400 });
}

async function bulkLifecycle(slugs, action, options = {}) {
  const collections = await loadCollections();
  const state = await buildState();
  const prepared = prepareBulkLifecycle(collections.all, slugs, action, { ...options, voice: state.voice, knownPaths: state.knownPaths });
  const next = { published: [], drafts: [], archived: [], trash: [] };
  for (const article of prepared.articles) {
    const key = article.status === "published" ? "published" : article.status === "archived" ? "archived" : article.status === "trash" ? "trash" : "drafts";
    next[key].push(article);
  }
  await writeCollections(next);
  await Promise.all(prepared.updated.map((article) => syncProposalArticleState(article)));
  return { updated: prepared.updated.map((article) => ({ slug: article.slug, title: article.title, status: article.status })), issues: prepared.issues };
}

async function scanKnowledge(settings) {
  const [routes, publicSiteUrl] = await Promise.all([
    knownSitePaths(),
    resolvePublicSiteUrl(settings),
  ]);
  const records = [];
  const failures = [];
  for (let offset = 0; offset < routes.length; offset += 4) {
    await Promise.all(routes.slice(offset, offset + 4).map(async (route) => {
      try {
        const response = await fetch(`${publicSiteUrl}${route}`, { signal: AbortSignal.timeout(12_000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        records.push(...extractPublicPageRecords(await response.text(), route));
      } catch (error) {
        failures.push({ route, error: String(error?.message || error) });
      }
    }));
  }
  if (!records.length) throw Object.assign(new Error("No rendered public content could be read. The approved snapshot was not changed."), { status: 503, details: failures });
  const unique = [...new Map(records.map((record) => [record.text.toLowerCase(), record])).values()];
  const prior = await readJson(projectFiles().snapshot, { records: [] });
  const oldById = new Map((prior.records || []).map((record) => [record.id, record]));
  const newById = new Map(unique.map((record) => [record.id, record]));
  const diff = {
    added: unique.filter((record) => !oldById.has(record.id)),
    removed: (prior.records || []).filter((record) => !newById.has(record.id)),
    unchanged: unique.filter((record) => oldById.has(record.id)).length,
    stale: [...unique, ...(await readJson(projectFiles().knowledge, []))].filter((record) => record.reviewDate && Date.parse(record.reviewDate) < Date.now()),
    conflicts: (await readJson(projectFiles().knowledge, [])).filter((record) => (record.conflictsWith || []).length),
  };
  await mkdir(projectFiles().runtime, { recursive: true });
  const candidate = {
    schemaVersion: 2,
    sourcePolicy: "public-rendered-content-only",
    generatedAt: new Date().toISOString(),
    routes,
    failures,
    records: unique,
  };
  await atomicWriteJson(path.join(projectFiles().runtime, "knowledge-scan.json"), candidate, { revision: false });
  return { ...diff, routesScanned: routes.length - failures.length, routeFailures: failures };
}

async function approveKnowledgeScan() {
  const candidate = await readJson(path.join(projectFiles().runtime, "knowledge-scan.json"), null);
  if (!candidate) throw Object.assign(new Error("Run a knowledge scan first."), { status: 409 });
  await atomicWriteJson(projectFiles().snapshot, candidate);
  return candidate;
}

function safeFilename(value) {
  return String(value || "image").toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
}

async function ingestMedia(req, url) {
  const filename = url.searchParams.get("filename") || "image";
  const articleSlug = safeFilename(url.searchParams.get("article") || "library");
  const alt = url.searchParams.get("alt") || "";
  const decorative = url.searchParams.get("decorative") === "true";
  const focalX = Math.min(1, Math.max(0, Number(url.searchParams.get("focalX") || 0.5)));
  const focalY = Math.min(1, Math.max(0, Number(url.searchParams.get("focalY") || 0.5)));
  if (!decorative && !alt.trim()) throw Object.assign(new Error("Alt text is required unless the image is decorative."), { status: 422 });
  const buffer = await readBody(req, 35_000_000);
  const image = sharp(buffer, { failOn: "warning" }).rotate();
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) throw Object.assign(new Error("The uploaded file is not a supported image."), { status: 415 });
  const id = `${articleSlug}-${safeFilename(filename)}-${crypto.randomBytes(4).toString("hex")}`;
  await mkdir(projectFiles().originals, { recursive: true });
  await writeFile(path.join(projectFiles().originals, `${id}.${metadata.format || "bin"}`), buffer, { mode: 0o600 });
  const publicDirectory = path.join(projectRoot(), "public", "images", "blog", articleSlug);
  await mkdir(publicDirectory, { recursive: true });
  const widths = [480, 768, 1200, 1600].filter((width) => width <= metadata.width);
  if (!widths.length) widths.push(metadata.width);
  const derivatives = [];
  for (const width of widths) {
    const output = `${id}-${width}.webp`;
    await sharp(buffer).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(publicDirectory, output));
    const derivativeMetadata = await sharp(path.join(publicDirectory, output)).metadata();
    derivatives.push({ src: `/images/blog/${articleSlug}/${output}`, width: derivativeMetadata.width, height: derivativeMetadata.height, format: "webp" });
  }
  const socialOutput = `${id}-social.webp`;
  const horizontal = focalX < 0.34 ? "west" : focalX > 0.66 ? "east" : "centre";
  const vertical = focalY < 0.34 ? "north" : focalY > 0.66 ? "south" : "centre";
  const gravity = vertical === "centre" ? horizontal : horizontal === "centre" ? vertical : `${vertical}${horizontal}`;
  await sharp(buffer).rotate().resize({ width: 1200, height: 630, fit: "cover", position: gravity, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(publicDirectory, socialOutput));
  const socialMetadata = await sharp(path.join(publicDirectory, socialOutput)).metadata();
  const largest = derivatives.at(-1);
  const record = {
    id,
    originalFilename: filename,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    alt: decorative ? "" : alt.trim(),
    decorative,
    focalPoint: { x: focalX, y: focalY },
    derivatives,
    hero: { id, src: largest.src, alt: decorative ? "" : alt.trim(), width: largest.width, height: largest.height, sizes: "(max-width: 700px) 100vw, 100vw", status: "approved", format: "webp" },
    social: { id: `${id}-social`, src: `/images/blog/${articleSlug}/${socialOutput}`, alt: decorative ? "" : alt.trim(), width: socialMetadata.width, height: socialMetadata.height, sizes: "1200px", status: "approved", format: "webp" },
    createdAt: new Date().toISOString(),
  };
  const manifest = await readJson(projectFiles().media, []);
  manifest.push(record);
  await atomicWriteJson(projectFiles().media, manifest);
  return record;
}

async function publicSiteIsAvailable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(650) });
    if (!response.ok) return false;
    await response.body?.cancel();
    return true;
  } catch {
    return false;
  }
}

function localPreviewPorts(configured) {
  const ports = [];
  try {
    const url = new URL(configured);
    if (["127.0.0.1", "localhost"].includes(url.hostname) && url.port) ports.push(Number(url.port));
  } catch {}
  return [...new Set([...ports, ...currentProject().manifest.previewPortRange])].filter((port) => Number.isInteger(port));
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function startManagedSitePreview(configured) {
  requireCapability("preview");
  const projectId = currentProject().id;
  const existingUrl = managedSiteUrls.get(projectId);
  if (existingUrl && await publicSiteIsAvailable(existingUrl)) return existingUrl;
  if (siteStartupPromises.has(projectId)) return siteStartupPromises.get(projectId);
  const startup = (async () => {
    const failures = [];
    for (const port of localPreviewPorts(configured)) {
      const url = `http://127.0.0.1:${port}`;
      if (await publicSiteIsAvailable(url)) return url;
      let output = "";
      const configuredCommand = currentProject().manifest.developmentCommand;
      const command = process.platform === "win32" && configuredCommand[0] === "npm" ? "npm.cmd" : configuredCommand[0];
      const child = spawn(command, [...configuredCommand.slice(1), "--", "--host", "127.0.0.1", "--port", String(port)], {
        cwd: projectRoot(),
        env: { ...process.env, WRANGLER_LOG_PATH: ".wrangler/wrangler.log" },
        stdio: ["ignore", "pipe", "pipe"],
      });
      managedSiteProcesses.set(projectId, child);
      child.stdout.on("data", (chunk) => { output = `${output}${chunk}`.slice(-6000); });
      child.stderr.on("data", (chunk) => { output = `${output}${chunk}`.slice(-6000); });
      let exited = false;
      child.once("exit", () => { exited = true; });
      for (let attempt = 0; attempt < 100; attempt += 1) {
        if (await publicSiteIsAvailable(url)) {
          managedSiteUrls.set(projectId, url);
          process.stdout.write(`${currentProject().manifest.name} preview renderer: ${url}\n`);
          return url;
        }
        if (exited) break;
        await wait(250);
      }
      if (!exited) child.kill("SIGTERM");
      if (managedSiteProcesses.get(projectId) === child) managedSiteProcesses.delete(projectId);
      failures.push(output.trim().split("\n").slice(-4).join(" "));
    }
    throw Object.assign(new Error(`The CMS could not start the ${currentProject().manifest.name} preview renderer automatically. Restart the CMS, then try Preview again.`), {
      status: 503,
      details: failures.filter(Boolean),
    });
  })();
  siteStartupPromises.set(projectId, startup);
  try {
    return await startup;
  } finally {
    siteStartupPromises.delete(projectId);
  }
}

async function resolvePublicSiteUrl(settings) {
  const configured = String(settings.publicSiteUrl || "").replace(/\/$/, "");
  const candidates = [...new Set([
    configured,
    ...currentProject().manifest.previewPortRange.map((port) => `http://127.0.0.1:${port}`),
    ...currentProject().manifest.previewPortRange.map((port) => `http://localhost:${port}`),
  ].filter(Boolean))];
  for (const candidate of candidates) {
    if (await publicSiteIsAvailable(candidate)) return candidate;
  }
  return startManagedSitePreview(configured);
}

function accessibleKnowledgeRecords(records, snapshot) {
  const manual = (records || []).filter((record) => record.usage !== "prohibited");
  return [...manual, ...publicSnapshotRecords(snapshot)];
}

function routeAffinity(record, terms) {
  const pages = record.applicablePages || [];
  const joined = pages.join(" ").toLowerCase();
  let score = 0;
  if (terms.has("coffee") && joined.includes("coffee-bar")) score += 5;
  if ((terms.has("sweet") || terms.has("dessert")) && joined.includes("sweet-cart")) score += 5;
  if ((terms.has("seating") || terms.has("rental") || terms.has("rentals")) && joined.includes("seating-rentals")) score += 5;
  for (const event of ["weddings", "corporate-events", "brand-activations", "baby-showers", "bridal-showers", "birthdays", "private-events"]) {
    if ([...terms].some((term) => event.includes(term)) && joined.includes(event)) score += 4;
  }
  if (joined === "/faq") score += 1;
  return score;
}

function selectKnowledge(prompt, records, snapshot, limit = 64) {
  const terms = new Set(String(prompt).toLowerCase().match(/[a-z]{4,}/g) || []);
  const candidates = accessibleKnowledgeRecords(records, snapshot);
  return candidates
    .map((record) => ({
      record,
      score: [...terms].filter((term) => `${record.topic} ${record.category} ${record.text} ${(record.applicablePages || []).join(" ")}`.toLowerCase().includes(term)).length + routeAffinity(record, terms),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ record }) => record);
}

function isApprovedPublishableRecord(record) {
  if (!record || record.usage !== "publishable" || record.verificationStatus !== "verified") return false;
  if ((record.conflictsWith || []).length) return false;
  return !record.reviewDate || Date.parse(record.reviewDate) >= Date.now();
}

function relevantApprovedKnowledge(state, query, article) {
  const allRecords = accessibleKnowledgeRecords(state.knowledge, state.snapshot);
  const byId = new Map(allRecords.map((record) => [record.id, record]));
  const referenced = (article?.claims || []).flatMap((claim) => claim.sourceIds || []).map((id) => byId.get(id)).filter(Boolean);
  const matched = selectKnowledge(query, state.knowledge, state.snapshot);
  const seen = new Set();
  return [...matched, ...referenced].filter((record) => {
    if (!isApprovedPublishableRecord(record) || seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  }).slice(0, 48);
}

function articleKnowledgeQuery(article, prompt) {
  return [
    prompt,
    article?.title,
    article?.category,
    ...(article?.claims || []).map((claim) => claim.text),
    ...(article?.content || []).flatMap((block) => [block.title, block.text, ...(block.content || []).map((part) => part.text), ...(block.items || []).flat().map((part) => part.text)]),
  ].filter(Boolean).join(" ");
}

function validateRepairEvidence(proposal, state, article, suppliedSources) {
  const approvedById = new Map(accessibleKnowledgeRecords(state.knowledge, state.snapshot).filter(isApprovedPublishableRecord).map((record) => [record.id, record]));
  const suppliedIds = new Set(suppliedSources.map((record) => record.id));
  for (const evidence of proposal.evidence || []) {
    if (!suppliedIds.has(evidence.sourceId) || !approvedById.has(evidence.sourceId)) {
      throw Object.assign(new Error(`The repair cited unavailable or unapproved evidence: ${evidence.sourceId}. No proposal was saved.`), { status: 422 });
    }
  }
  if (proposal.kind !== "article-update") return;
  const claimsOperation = proposal.operations.find((operation) => operation.field === "claims");
  if (!claimsOperation) return;
  const proposedClaims = parseArticleOperationValue(claimsOperation);
  const existingById = new Map((article?.claims || []).map((claim) => [claim.id, claim]));
  for (const claim of proposedClaims.filter((candidate) => candidate.status === "grounded")) {
    const prior = existingById.get(claim.id);
    const changed = !prior || prior.text !== claim.text || prior.status !== claim.status || JSON.stringify(prior.sourceIds || []) !== JSON.stringify(claim.sourceIds || []);
    if (!changed) continue;
    if (!claim.sourceIds?.length) throw Object.assign(new Error(`The repair marked “${claim.text}” grounded without evidence. No proposal was saved.`), { status: 422 });
    for (const sourceId of claim.sourceIds) {
      if (!suppliedIds.has(sourceId) || !approvedById.has(sourceId)) {
        throw Object.assign(new Error(`The repair tried to ground “${claim.text}” with unavailable evidence ${sourceId}. No proposal was saved.`), { status: 422 });
      }
    }
  }
}

const briefSchema = {
  type: "object",
  properties: {
    angle: { type: "string" }, audience: { type: "string" }, searchIntent: { type: "string" }, category: { type: "string" },
    workingTitle: { type: "string" }, sourceIds: { type: "array", items: { type: "string" } },
    proposedInternalLinks: { type: "array", items: { type: "string" } }, conflicts: { type: "array", items: { type: "string" } },
    qualifications: { type: "array", items: { type: "string" } },
    missingInformation: { type: "array", items: { type: "string" } },
  },
  required: ["angle", "audience", "searchIntent", "category", "workingTitle", "sourceIds", "proposedInternalLinks", "conflicts", "qualifications", "missingInformation"], additionalProperties: false,
};

const outlineSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    sections: { type: "array", items: { type: "object", properties: { heading: { type: "string" }, purpose: { type: "string" }, sourceIds: { type: "array", items: { type: "string" } } }, required: ["heading", "purpose", "sourceIds"], additionalProperties: false } },
    quickAnswerPurpose: { type: "string" }, takeawaysPurpose: { type: "string" },
  },
  required: ["title", "sections", "quickAnswerPurpose", "takeawaysPurpose"], additionalProperties: false,
};

const draftSchema = {
  type: "object",
  properties: {
    slug: { type: "string" }, title: { type: "string" }, seoTitle: { type: "string" }, description: { type: "string" }, excerpt: { type: "string" }, category: { type: "string" },
    blocks: { type: "array", items: { type: "object", properties: {
      kind: { type: "string", enum: ["paragraph", "heading-2", "heading-3", "unordered-list", "ordered-list", "quote", "callout", "quick-answer", "key-takeaways"] },
      id: { type: "string" }, title: { type: "string" }, text: { type: "string" }, items: { type: "array", items: { type: "string" } }, sourceIds: { type: "array", items: { type: "string" } },
    }, required: ["kind", "id", "title", "text", "items", "sourceIds"], additionalProperties: false } },
    relatedArticleSlugs: { type: "array", items: { type: "string" } },
    claims: { type: "array", items: { type: "object", properties: { id: { type: "string" }, text: { type: "string" }, status: { type: "string", enum: ["grounded", "editorial", "inferred", "unverified"] }, sourceIds: { type: "array", items: { type: "string" } }, note: { type: "string" } }, required: ["id", "text", "status", "sourceIds", "note"], additionalProperties: false } },
  },
  required: ["slug", "title", "seoTitle", "description", "excerpt", "category", "blocks", "relatedArticleSlugs", "claims"], additionalProperties: false,
};

const helpSchema = {
  type: "object",
  properties: {
    answer: { type: "string" },
    steps: { type: "array", items: { type: "string" } },
    references: { type: "array", items: { type: "string" } },
    caution: { type: "string" },
  },
  required: ["answer", "steps", "references", "caution"],
  additionalProperties: false,
};

const helpRepairSchema = {
  type: "object",
  properties: {
    kind: { type: "string", enum: ["article-update", "file-patch", "manual-only"] },
    title: { type: "string" },
    summary: { type: "string" },
    risk: { type: "string", enum: ["low", "medium", "high"] },
    operations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          field: { type: "string", enum: ["title", "slug", "seoTitle", "description", "excerpt", "category", "publishDate", "content", "relatedArticleSlugs", "claims"] },
          value: { type: "string" },
          reason: { type: "string" },
        },
        required: ["field", "value", "reason"],
        additionalProperties: false,
      },
    },
    files: { type: "array", items: { type: "string" } },
    unifiedDiff: { type: "string" },
    validationPlan: { type: "array", items: { type: "string" } },
    limitations: { type: "array", items: { type: "string" } },
    evidence: {
      type: "array",
      items: {
        type: "object",
        properties: { sourceId: { type: "string" }, support: { type: "string" } },
        required: ["sourceId", "support"],
        additionalProperties: false,
      },
    },
  },
  required: ["kind", "title", "summary", "risk", "operations", "files", "unifiedDiff", "validationPlan", "limitations", "evidence"],
  additionalProperties: false,
};

const calendarProposalSchema = {
  type: "object",
  properties: {
    summary: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          targetDate: { type: "string" },
          category: { type: "string" },
          contentPillar: { type: "string" },
          audience: { type: "string" },
          searchIntent: { type: "string" },
          rationale: { type: "string" },
          proposedInternalLinks: { type: "array", items: { type: "string" } },
          risks: { type: "array", items: { type: "string" } },
        },
        required: ["title", "targetDate", "category", "contentPillar", "audience", "searchIntent", "rationale", "proposedInternalLinks", "risks"],
        additionalProperties: false,
      },
    },
  },
  required: ["summary", "items"],
  additionalProperties: false,
};

function sanitizedCodexEnv() {
  return Object.fromEntries(Object.entries(process.env).filter(([key, value]) => value !== undefined && !["OPENAI_API_KEY", "CODEX_API_KEY"].includes(key)));
}

function mapUsage(usage) {
  return {
    inputTokens: usage?.input_tokens || 0,
    cachedInputTokens: usage?.cached_input_tokens || 0,
    outputTokens: usage?.output_tokens || 0,
    reasoningOutputTokens: usage?.reasoning_output_tokens || 0,
  };
}

function addUsage(left = {}, right = {}) {
  return {
    inputTokens: (left.inputTokens || 0) + (right.inputTokens || 0), cachedInputTokens: (left.cachedInputTokens || 0) + (right.cachedInputTokens || 0),
    outputTokens: (left.outputTokens || 0) + (right.outputTokens || 0), reasoningOutputTokens: (left.reasoningOutputTokens || 0) + (right.reasoningOutputTokens || 0),
  };
}

function codexOptions(settings) {
  return {
    workingDirectory: projectRoot(),
    sandboxMode: "read-only",
    approvalPolicy: "never",
    networkAccessEnabled: false,
    webSearchMode: "disabled",
    modelReasoningEffort: settings.reasoningEffort || "medium",
    ...(settings.model ? { model: settings.model } : {}),
  };
}

function isUsageError(error) {
  return /usage|limit|credit|quota|allowance|rate.?limit/i.test(String(error?.message || error));
}

async function assertCodexAvailable(state) {
  if (!state.settings.includedUsageOnly) throw Object.assign(new Error("This CMS is configured for included Codex usage only."), { status: 412 });
  if (!state.settings.paidCreditsDisabledAcknowledged) throw Object.assign(new Error("Confirm in Settings that account-level paid credits and auto top-up are disabled before using Codex features."), { status: 412 });
}

function compactHelpContext(state, payload, relevantSources = []) {
  const article = state.all.find((candidate) => candidate.slug === payload.articleSlug);
  return {
    currentView: payload.currentView || "help",
    currentArticle: article ? {
      slug: article.slug,
      title: article.title,
      status: article.status,
      category: article.category,
      issues: state.issues[article.slug] || [],
      links: state.graph[article.slug] || null,
      claims: article.claims || [],
      content: article.content || [],
    } : null,
    relevantApprovedSources: relevantSources,
    reportedError: payload.error || null,
    cmsFacts: {
      localOnly: true,
      storage: "Versioned JSON files under content/blog",
      publishing: "Manual only; Codex cannot publish, commit, push, or deploy",
      preview: "Token-gated, noindex, and served through the real Luxe article template",
      lifecycle: "Draft, Published, Archived, Trash",
      includedUsageOnly: state.settings.includedUsageOnly === true,
    },
    calendar: {
      itemCount: state.calendar.length,
      cadencePerMonth: state.calendarConfig.cadencePerMonth,
      nextItems: state.calendar.filter((item) => item.targetDate).sort((a, b) => a.targetDate.localeCompare(b.targetDate)).slice(0, 8),
    },
  };
}

async function runHelpAssistant(payload) {
  const state = await buildState();
  await assertCodexAvailable(state);
  const question = String(payload.question || "").trim();
  if (!question) throw Object.assign(new Error("Ask a question about the CMS, Blog, Article Studio, SEO, or an error."), { status: 422 });
  const sessions = state.helpSessions;
  let session = sessions.find((candidate) => candidate.id === payload.sessionId);
  if (!session) {
    session = { id: crypto.randomUUID(), threadId: null, title: question.slice(0, 72), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), usage: mapUsage(null), messages: [] };
    sessions.push(session);
  }
  const codex = new Codex({ env: sanitizedCodexEnv() });
  const helpOptions = { ...codexOptions(state.settings), modelReasoningEffort: state.settings.helpReasoningEffort || "low" };
  const thread = session.threadId ? codex.resumeThread(session.threadId, helpOptions) : codex.startThread(helpOptions);
  const activeRun = beginCodexRun(payload.requestId, 45_000);
  const article = state.all.find((candidate) => candidate.slug === payload.articleSlug);
  const relevantSources = relevantApprovedKnowledge(state, articleKnowledgeQuery(article, question), article);
  const context = compactHelpContext(state, payload, relevantSources);
  const prompt = `You are the private help assistant inside the local Luxe Journal CMS. Answer questions about this CMS, its Blog, Article Studio, content lifecycle, SEO/AEO, validation, previews, links, media, and content calendar. Explain errors in plain language and give precise next steps. Use only the supplied context and established CMS facts. Never claim to have changed files or settings. Never suggest publishing, deploying, buying credits, or enabling paid fallback. When information is insufficient, say exactly what is missing.

SOURCE AND CLAIM RULES:
- Treat relevantApprovedSources as the authoritative, verified, publishable source set for this answer.
- For a claim-status error, inspect those sources before concluding that evidence is missing or recommending deletion.
- Prefer a truthful grounded rewrite with exact source IDs when approved evidence supports the underlying point.
- Never state that the approved sources fail to support a fact when a supplied source supports it.
- Distinguish a missing claim-to-source assignment from a genuine absence of approved evidence.
- Include the IDs of material sources you relied on in references.

QUESTION:
${question}

CURRENT CONTEXT:
${JSON.stringify(context)}

RECENT CONVERSATION:
${JSON.stringify(session.messages.slice(-8))}`;
  try {
    const result = await thread.run(prompt, { outputSchema: helpSchema, signal: activeRun.signal });
    const response = JSON.parse(result.finalResponse);
    session.threadId = thread.id;
    session.updatedAt = new Date().toISOString();
    session.usage = addUsage(session.usage, mapUsage(result.usage));
    session.messages.push({ role: "user", text: question, createdAt: new Date().toISOString() });
    session.messages.push({ role: "assistant", ...response, createdAt: new Date().toISOString() });
    await writeProjectHelpSessions(currentProject(), sessions);
    return { sessionId: session.id, threadId: session.threadId, usage: session.usage, response };
  } catch (error) {
    if (activeRun.signal.aborted) throw Object.assign(new Error(activeRun.signal.reason?.message || "CMS Help was cancelled."), { status: 408 });
    if (isUsageError(error)) throw Object.assign(new Error("Codex included usage is unavailable. Your help conversation remains saved."), { status: 429 });
    throw Object.assign(new Error(`CMS Help could not respond: ${error?.message || error}`), { status: 502 });
  } finally {
    activeRun.finish();
  }
}

function findHelpSession(sessions, sessionId) {
  const session = sessions.find((candidate) => candidate.id === sessionId);
  if (!session) throw Object.assign(new Error("Help conversation not found."), { status: 404 });
  return session;
}

async function requestHelpRepair(payload) {
  const state = await buildState();
  await assertCodexAvailable(state);
  const session = findHelpSession(state.helpSessions, payload.sessionId);
  const existing = (session.proposals || []).find((candidate) => candidate.id === payload.proposalId) || null;
  const article = state.all.find((candidate) => candidate.slug === (payload.articleSlug || session.articleSlug));
  const feedback = String(payload.feedback || "").trim();
  const codex = new Codex({ env: sanitizedCodexEnv() });
  const helpOptions = { ...codexOptions(state.settings), modelReasoningEffort: state.settings.helpReasoningEffort || "low" };
  const thread = session.threadId ? codex.resumeThread(session.threadId, helpOptions) : codex.startThread(helpOptions);
  const activeRun = beginCodexRun(payload.requestId, 55_000);
  const relevantSources = relevantApprovedKnowledge(
    state,
    articleKnowledgeQuery(article, `${feedback} ${session.messages.slice(-10).map((message) => message.text || message.answer || "").join(" ")}`),
    article,
  );
  const prompt = `Prepare a precise, reviewable repair proposal for the local Luxe Journal CMS. You have read-only access and must not claim to apply anything. Prefer an article-update when the issue can be solved by changing the selected article. Use a file-patch only for a genuine CMS or website code defect. Use manual-only when a safe automated fix cannot be proven from the supplied context.

ARTICLE-UPDATE RULES:
- Return only the fields that must change.
- For content, relatedArticleSlugs, and claims, encode the complete replacement value as a valid JSON string.
- Never change publication status or publish an article.
- Preserve copy and structure unrelated to the diagnosed issue.
- For a claim-status blocker, inspect APPROVED PUBLISHABLE SOURCES before deciding that support is missing.
- Prefer grounding or accurately rewriting a claim with approved source IDs over deleting useful content.
- Delete a factual statement only when no supplied approved source supports a truthful version of it.
- Never introduce or retain a negative statement about what sources do not establish when a supplied source contradicts it.
- Put every approved source used by the repair in evidence, with its exact sourceId and a concise description of its support.
- Any claim changed to grounded must cite one or more source IDs supplied below.

FILE-PATCH RULES:
- Return a standard unified diff with a/ and b/ paths.
- Only propose files under cms/, app/, scripts/, or tests/.
- Do not touch secrets, environment files, Git configuration, dependencies, lockfiles, published content, media, or generated files.
- No file deletion, rename, binary patch, shell command, commit, push, deployment, or network access.

CURRENT VIEW: ${payload.currentView || "unknown"}
SELECTED ARTICLE: ${JSON.stringify(article || null)}
ARTICLE ISSUES: ${JSON.stringify(article ? state.issues[article.slug] || [] : [])}
APPROVED PUBLISHABLE SOURCES: ${JSON.stringify(relevantSources)}
RECENT HELP CONVERSATION: ${JSON.stringify(session.messages.slice(-10))}
EXISTING PROPOSAL TO REVISE: ${JSON.stringify(existing)}
USER FEEDBACK: ${feedback || "None — create the first proposal."}
KNOWN SITE PATHS: ${JSON.stringify(state.knownPaths)}

Return a concise proposal that a nontechnical editor can accept, decline, or send back with feedback.`;
  try {
    const result = await thread.run(prompt, { outputSchema: helpRepairSchema, signal: activeRun.signal });
    const generated = JSON.parse(result.finalResponse);
    validateRepairEvidence(generated, state, article, relevantSources);
    const proposal = {
      id: existing?.id || crypto.randomUUID(),
      revision: (existing?.revision || 0) + 1,
      status: "pending",
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      articleSlug: article?.slug || null,
      evidenceContextVersion: 1,
      feedbackHistory: [...(existing?.feedbackHistory || []), ...(feedback ? [{ text: feedback, createdAt: new Date().toISOString() }] : [])],
      ...generated,
    };
    session.threadId = thread.id;
    session.articleSlug = article?.slug || session.articleSlug || null;
    session.updatedAt = new Date().toISOString();
    session.usage = addUsage(session.usage, mapUsage(result.usage));
    session.proposals ||= [];
    const index = session.proposals.findIndex((candidate) => candidate.id === proposal.id);
    if (index >= 0) session.proposals[index] = proposal;
    else session.proposals.push(proposal);
    session.messages.push({ role: "assistant", answer: `I prepared “${proposal.title}” for your review. Nothing has been changed yet.`, steps: [], references: proposal.files, caution: proposal.risk === "high" ? "This proposal is high risk and requires careful review." : "Review every proposed change before accepting.", createdAt: new Date().toISOString(), proposalId: proposal.id });
    await writeProjectHelpSessions(currentProject(), state.helpSessions);
    return { sessionId: session.id, proposal, usage: session.usage };
  } catch (error) {
    if (activeRun.signal.aborted) throw Object.assign(new Error(activeRun.signal.reason?.message || "Repair generation was cancelled."), { status: 408 });
    if (isUsageError(error)) throw Object.assign(new Error("Codex included usage is unavailable. No repair proposal was created."), { status: 429 });
    throw Object.assign(new Error(`CMS Help could not prepare the repair: ${error?.message || error}`), { status: 502 });
  } finally {
    activeRun.finish();
  }
}

function parseArticleOperationValue(operation) {
  if (["content", "relatedArticleSlugs", "claims"].includes(operation.field)) {
    try {
      const parsed = JSON.parse(operation.value);
      if (!Array.isArray(parsed)) throw new Error("Expected an array.");
      return parsed;
    } catch (error) {
      throw Object.assign(new Error(`The proposed ${operation.field} change is not valid JSON: ${error.message}`), { status: 422 });
    }
  }
  return String(operation.value);
}

function allowedRepairFiles(diff) {
  if (!diff.trim()) throw Object.assign(new Error("The proposed file patch is empty."), { status: 422 });
  if (/GIT binary patch|deleted file mode|rename from|rename to|^\+\+\+ \/dev\/null/m.test(diff)) {
    throw Object.assign(new Error("Repair patches cannot contain binary changes, renames, or file deletions."), { status: 422 });
  }
  const files = [...diff.matchAll(/^\+\+\+ (?:b\/)?(.+)$/gm)].map((match) => match[1].trim());
  if (!files.length) throw Object.assign(new Error("The repair patch does not identify any files."), { status: 422 });
  const allowedRoots = ["cms/", "app/", "scripts/", "tests/"];
  for (const file of files) {
    if (file.startsWith("/") || file.includes("..") || !allowedRoots.some((root) => file.startsWith(root)) || /(^|\/)(\.env|\.git|node_modules|dist|\.next|\.vinext)(\/|$)/.test(file)) {
      throw Object.assign(new Error(`The repair patch is not allowed to change ${file}.`), { status: 422 });
    }
  }
  return [...new Set(files)];
}

function runLocalProcess(command, args, { input = "", timeoutMs = 120_000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: projectRoot(), env: sanitizedCodexEnv(), stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => child.kill("SIGTERM"), timeoutMs);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => { clearTimeout(timeout); resolve({ code, stdout, stderr }); });
    child.stdin.end(input);
  });
}

async function applyHelpRepair(payload) {
  const state = await buildState();
  const session = findHelpSession(state.helpSessions, payload.sessionId);
  const proposal = (session.proposals || []).find((candidate) => candidate.id === payload.proposalId);
  if (!proposal) throw Object.assign(new Error("Repair proposal not found."), { status: 404 });
  if (proposal.status !== "pending") throw Object.assign(new Error(`This proposal is already ${proposal.status}.`), { status: 409 });
  if (payload.decision === "decline") {
    proposal.status = "declined";
    proposal.decidedAt = new Date().toISOString();
    await writeProjectHelpSessions(currentProject(), state.helpSessions);
    return { proposal, applied: false };
  }
  if (payload.decision !== "accept") throw Object.assign(new Error("Choose accept or decline."), { status: 422 });

  let result;
  if (proposal.kind === "article-update") {
    const article = state.all.find((candidate) => candidate.slug === proposal.articleSlug);
    if (!article) throw Object.assign(new Error("The article targeted by this proposal no longer exists."), { status: 409 });
    if (proposal.evidenceContextVersion !== 1) {
      throw Object.assign(new Error("This proposal was created before source-aware repairs were enabled. Revise or regenerate it so the CMS can verify its evidence before acceptance."), { status: 409 });
    }
    const currentlyApprovedSources = accessibleKnowledgeRecords(state.knowledge, state.snapshot).filter(isApprovedPublishableRecord);
    validateRepairEvidence(proposal, state, article, currentlyApprovedSources);
    const updated = { ...article, originalSlug: article.slug };
    for (const operation of proposal.operations) updated[operation.field] = parseArticleOperationValue(operation);
    const saved = await saveArticle(updated);
    result = { article: saved.article, issues: saved.issues };
  } else if (proposal.kind === "file-patch") {
    const files = allowedRepairFiles(proposal.unifiedDiff);
    const check = await runLocalProcess("git", ["apply", "--check", "--whitespace=error-all", "-"], { input: proposal.unifiedDiff });
    if (check.code !== 0) throw Object.assign(new Error(`The proposed patch no longer applies cleanly: ${check.stderr || check.stdout}`), { status: 409 });
    const revisionDir = path.join(projectFiles().revisions, "help-repairs", proposal.id, `revision-${proposal.revision}`);
    await mkdir(revisionDir, { recursive: true });
    await atomicWriteJson(path.join(revisionDir, "proposal.json"), proposal, { revision: false });
    const applied = await runLocalProcess("git", ["apply", "--whitespace=error-all", "-"], { input: proposal.unifiedDiff });
    if (applied.code !== 0) throw Object.assign(new Error(`The repair could not be applied: ${applied.stderr || applied.stdout}`), { status: 409 });
    const validation = await runLocalProcess("npm", ["run", "lint"], { timeoutMs: 180_000 });
    if (validation.code !== 0) {
      const rolledBack = await runLocalProcess("git", ["apply", "--reverse", "-"], { input: proposal.unifiedDiff });
      throw Object.assign(new Error(`The repair failed validation and was ${rolledBack.code === 0 ? "rolled back" : "left unapplied for manual recovery"}. ${validation.stderr || validation.stdout}`), { status: 422 });
    }
    result = { files, validation: "npm run lint passed" };
  } else {
    throw Object.assign(new Error("This proposal is guidance-only and cannot be applied automatically."), { status: 422 });
  }

  proposal.status = "accepted";
  proposal.decidedAt = new Date().toISOString();
  proposal.result = result;
  session.messages.push({ role: "assistant", answer: `The approved repair “${proposal.title}” was applied successfully.`, steps: [], references: proposal.files, caution: "Review the affected screen before continuing with publication.", createdAt: new Date().toISOString() });
  await writeProjectHelpSessions(currentProject(), state.helpSessions);
  return { proposal, applied: true, result };
}

function normalizeCalendarItem(item, existing = {}) {
  const now = new Date().toISOString();
  const status = String(item.status || existing.status || "idea");
  const targetDate = String(item.targetDate || "");
  if (targetDate) {
    const parsed = new Date(`${targetDate}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate) || Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== targetDate) {
      throw Object.assign(new Error("Calendar dates must be valid and use YYYY-MM-DD."), { status: 422 });
    }
  }
  return {
    id: item.id || existing.id || crypto.randomUUID(),
    title: String(item.title || existing.title || "Untitled idea").trim(),
    status,
    targetDate,
    category: String(item.category || existing.category || "Event Planning").trim(),
    contentPillar: String(item.contentPillar || existing.contentPillar || "").trim(),
    audience: String(item.audience || existing.audience || "").trim(),
    searchIntent: String(item.searchIntent || existing.searchIntent || "").trim(),
    campaign: String(item.campaign || existing.campaign || "").trim(),
    articleSlug: String(item.articleSlug || existing.articleSlug || "").trim(),
    notes: String(item.notes || existing.notes || "").trim(),
    proposedInternalLinks: Array.isArray(item.proposedInternalLinks) ? item.proposedInternalLinks : (existing.proposedInternalLinks || []),
    sourceProposalId: String(item.sourceProposalId || existing.sourceProposalId || ""),
    sourceProposalItemId: String(item.sourceProposalItemId || existing.sourceProposalItemId || ""),
    createdAt: existing.createdAt || now,
    updatedAt: now,
  };
}

async function saveCalendarItem(payload) {
  const items = await readJson(projectFiles().calendar, []);
  const index = items.findIndex((item) => item.id === payload.item?.id);
  const item = normalizeCalendarItem(payload.item || {}, index >= 0 ? items[index] : {});
  if (!item.title) throw Object.assign(new Error("Calendar item title is required."), { status: 422 });
  if (index >= 0) items[index] = item;
  else items.push(item);
  await atomicWriteJson(projectFiles().calendar, items);
  return item;
}

async function deleteCalendarItem(id) {
  const items = await readJson(projectFiles().calendar, []);
  const removed = items.find((item) => item.id === id);
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) throw Object.assign(new Error("Calendar item not found."), { status: 404 });
  const proposals = await readJson(projectFiles().calendarProposals, []);
  let proposalsChanged = false;
  if (removed?.sourceProposalId) {
    const proposal = proposals.find((candidate) => candidate.id === removed.sourceProposalId);
    const proposalItem = proposal?.items?.find((candidate) => candidate.id === removed.sourceProposalItemId);
    if (proposalItem) {
      proposalItem.calendarStatus = "removed";
      proposalItem.calendarRemovedAt = new Date().toISOString();
      proposalsChanged = true;
    }
  }
  await Promise.all([
    atomicWriteJson(projectFiles().calendar, next),
    ...(proposalsChanged ? [atomicWriteJson(projectFiles().calendarProposals, proposals)] : []),
  ]);
  return { deleted: id };
}

async function runCalendarProposal(payload) {
  const state = await buildState();
  await assertCodexAvailable(state);
  const promptText = String(payload.prompt || "").trim();
  if (!promptText) throw Object.assign(new Error("Describe the calendar plan you want."), { status: 422 });
  const codex = new Codex({ env: sanitizedCodexEnv() });
  const thread = codex.startThread(codexOptions(state.settings));
  const context = {
    request: promptText,
    startDate: payload.startDate || new Date().toISOString().slice(0, 10),
    existingCalendar: state.calendar,
    configuration: state.calendarConfig,
    publishedArticles: state.published.map(({ slug, title, category, publishDate }) => ({ slug, title, category, publishDate })),
    drafts: state.drafts.map(({ slug, title, category }) => ({ slug, title, category })),
    knownPaths: state.knownPaths,
    approvedKnowledgeTopics: [...new Set(accessibleKnowledgeRecords(state.knowledge, state.snapshot).map((record) => record.topic))].slice(0, 80),
  };
  try {
    const result = await thread.run(`Create a practical editorial content-calendar proposal for Luxe Event Co. Use the requested cadence and avoid duplicating existing articles or calendar items. Dates must be YYYY-MM-DD, avoid blackout dates, and prefer configured weekdays. Every idea must have a specific rationale, search intent, content pillar, and only valid proposed internal links. This is a proposal only, not publication.\n\nCONTEXT:\n${JSON.stringify(context)}`, { outputSchema: calendarProposalSchema });
    const parsed = JSON.parse(result.finalResponse);
    const proposals = state.calendarProposals;
    const proposal = { id: crypto.randomUUID(), prompt: promptText, createdAt: new Date().toISOString(), threadId: thread.id, usage: mapUsage(result.usage), status: "pending", ...parsed };
    proposal.items = (proposal.items || []).map((item, index) => ({ ...item, id: proposalItemId(proposal, item, index), calendarStatus: "proposed", articleStatus: null }));
    proposals.push(proposal);
    await atomicWriteJson(projectFiles().calendarProposals, proposals);
    return proposal;
  } catch (error) {
    if (isUsageError(error)) throw Object.assign(new Error("Codex included usage is unavailable. No calendar changes were made."), { status: 429 });
    throw Object.assign(new Error(`Calendar planning failed: ${error?.message || error}`), { status: 502 });
  }
}

async function approveCalendarProposal(id) {
  const proposals = await readJson(projectFiles().calendarProposals, []);
  const proposal = proposals.find((candidate) => candidate.id === id);
  if (!proposal) throw Object.assign(new Error("Calendar proposal not found."), { status: 404 });
  if (proposal.status === "approved") return proposal;
  const items = await readJson(projectFiles().calendar, []);
  const config = await readJson(projectFiles().calendarConfig, defaultCalendarConfig());
  const blocked = proposal.items.filter((item) => (config.blackoutDates || []).includes(item.targetDate));
  if (blocked.length) throw Object.assign(new Error(`The proposal includes ${blocked.length} blackout date${blocked.length === 1 ? "" : "s"}. Adjust the proposal or calendar preferences before approval.`), { status: 422, details: blocked });
  proposal.items = (proposal.items || []).map((candidate, index) => {
    const id = proposalItemId(proposal, candidate, index);
    items.push(normalizeCalendarItem({ ...candidate, id: undefined, status: "planned", notes: candidate.rationale, sourceProposalId: proposal.id, sourceProposalItemId: id }));
    return { ...candidate, id, calendarStatus: "planned", calendarAddedAt: new Date().toISOString() };
  });
  proposal.status = "approved";
  proposal.approvedAt = new Date().toISOString();
  await Promise.all([atomicWriteJson(projectFiles().calendar, items), atomicWriteJson(projectFiles().calendarProposals, proposals)]);
  return proposal;
}

async function deleteCalendarProposal(id) {
  const proposals = await readJson(projectFiles().calendarProposals, []);
  const proposal = proposals.find((candidate) => candidate.id === id);
  if (!proposal) throw Object.assign(new Error("Calendar proposal not found."), { status: 404 });
  const next = proposals.filter((candidate) => candidate.id !== id);
  await atomicWriteJson(projectFiles().calendarProposals, next);
  return { deleted: id, retainedCalendarItems: proposal.status === "approved" };
}

async function runCodexStage(stage, payload) {
  const state = await buildState();
  if (!state.settings.includedUsageOnly) throw Object.assign(new Error("This CMS is configured for included Codex usage only."), { status: 412 });
  if (!state.settings.paidCreditsDisabledAcknowledged) throw Object.assign(new Error("Confirm in Settings that account-level paid credits and auto top-up are disabled before using Article Studio."), { status: 412 });

  const codex = new Codex({ env: sanitizedCodexEnv() });
  const now = new Date().toISOString();
  const jobs = state.jobs;
  let job;
  let thread;
  let schema;
  let prompt;

  if (stage === "brief") {
    const retrievalQuery = [payload.prompt, ...Object.values(payload.inputs || {})].filter(Boolean).join(" ");
    const sources = selectKnowledge(retrievalQuery, state.knowledge, state.snapshot);
    job = {
      id: crypto.randomUUID(), status: "running", stage: "brief", prompt: payload.prompt,
      inputs: payload.inputs || {}, sources, threadId: null, model: state.settings.model || "Codex account default",
      createdAt: now, updatedAt: now, usage: mapUsage(null), brief: null, outline: null, articleSlug: null,
    };
    jobs.push(job);
    thread = codex.startThread(codexOptions(state.settings));
    schema = briefSchema;
    prompt = `You are the grounded editorial planner for Luxe Event Co. Use only the supplied approved sources and voice rules. Do not invent facts. Return the requested structured brief.

CLASSIFICATION RULES:
- A conflict is only a direct contradiction between the request and an approved source. Do not label a supported limit, event-specific condition, or careful qualification as a conflict.
- Put supported conditions such as “up to” capacities and event-specific availability in qualifications.
- Missing information must be limited to facts genuinely necessary for this article's proposed angle. Do not produce an exhaustive list of every operational detail Luxe has not published.
- A geography supplied as audience context is not automatically a service-coverage claim. Only flag it if the proposed article would assert unsupported coverage.
- Treat KNOWN SITE PATHS as authoritative proof that those public routes exist.
- Re-check the entire supplied source pack before claiming information is absent.

ARTICLE REQUEST:
${payload.prompt}

OPTIONAL INPUTS:
${JSON.stringify(payload.inputs || {})}

BRAND VOICE:
${JSON.stringify(state.voice)}

APPROVED SOURCES:
${JSON.stringify(sources)}

KNOWN SITE PATHS:
${JSON.stringify(state.knownPaths)}`;
  } else {
    job = jobs.find((candidate) => candidate.id === payload.jobId);
    if (!job) throw Object.assign(new Error("Studio job not found."), { status: 404 });
    if (stage === "outline" && !job.briefApprovedAt) throw Object.assign(new Error("Approve the brief before generating an outline."), { status: 409 });
    if (stage === "draft" && !job.outlineApprovedAt) throw Object.assign(new Error("Approve the outline before generating a draft."), { status: 409 });
    thread = codex.resumeThread(job.threadId, codexOptions(state.settings));
    if (stage === "outline") {
      schema = outlineSchema;
      prompt = `Create a grounded article outline from the approved brief below. Use only its cited source IDs. Include a clear purpose for every section, a Quick Answer, and Key Takeaways. Do not draft the article yet.\n\nAPPROVED BRIEF:\n${JSON.stringify(job.brief)}\n\nSOURCES:\n${JSON.stringify(job.sources)}\n\nVOICE:\n${JSON.stringify(state.voice)}`;
    } else {
      schema = draftSchema;
      prompt = `Draft the complete Luxe Journal article from the approved brief and outline. Use only supplied sources. Every material factual claim in the public-facing blocks must appear in claims with source IDs. Use measured Canadian English and obey excluded language. Internal links must use only known paths. Return structured blocks.

GROUNDING RULES:
- Re-check the complete supplied source set before marking a point unsupported.
- Only records marked verified and publishable may ground factual public copy.
- Claims must inventory material assertions actually present in the article body; do not create claim records merely to repeat a brief's missing-information list.
- Do not turn information gaps into public statements such as “the approved sources do not establish” or “the supplied material does not confirm.”
- If an unsupported detail is not necessary, omit it. If readers genuinely need to verify an event-specific variable, use non-factual editorial guidance such as “Confirm pricing and venue requirements for your event,” and mark that guidance editorial.
- Never make a negative statement about what the sources do not establish when any supplied source supports a truthful positive or conditional version.
- Use inferred or unverified only for genuinely necessary draft content that requires human resolution before publication; never disguise it as fact.
- When adding an internal link inside block text, use [descriptive anchor text](/known-path). The CMS converts that notation into structured link data; never display a bare route as editorial copy.

BRIEF:
${JSON.stringify(job.brief)}

OUTLINE:
${JSON.stringify(job.outline)}

SOURCES:
${JSON.stringify(job.sources)}

VOICE:
${JSON.stringify(state.voice)}

KNOWN PATHS:
${JSON.stringify(state.knownPaths)}`;
    }
  }

  try {
    const result = await thread.run(prompt, { outputSchema: schema });
    const parsed = JSON.parse(result.finalResponse);
    job.threadId = thread.id;
    job.status = "awaiting-approval";
    job.stage = stage;
    job.updatedAt = new Date().toISOString();
    job.usage = addUsage(job.usage, mapUsage(result.usage));
    if (stage === "brief") job.brief = parsed;
    if (stage === "outline") job.outline = parsed;
    if (stage === "draft") {
      const article = generatedDraftToArticle(parsed, job, state.voice);
      const saved = await saveArticle(article);
      job.articleSlug = saved.article.slug;
      job.status = "draft-created";
    }
    await atomicWriteJson(projectFiles().jobs, jobs);
    return job;
  } catch (error) {
    job.status = isUsageError(error) ? "paused-usage-unavailable" : "failed";
    job.error = String(error?.message || error);
    job.updatedAt = new Date().toISOString();
    await atomicWriteJson(projectFiles().jobs, jobs);
    throw Object.assign(new Error(job.status === "paused-usage-unavailable" ? "Codex included usage is unavailable. The job has been paused without losing progress." : `Codex generation failed: ${job.error}`), { status: job.status === "paused-usage-unavailable" ? 429 : 502 });
  }
}

function generatedDraftToArticle(result, job, voice) {
  const now = new Date().toISOString();
  const toParts = (text) => parseInlineInternalLinks(text);
  const content = result.blocks.map((block) => {
    if (block.kind === "paragraph") return { type: "paragraph", content: toParts(block.text) };
    if (block.kind === "heading-2" || block.kind === "heading-3") return { type: "heading", id: block.id || safeFilename(block.title || block.text), level: block.kind === "heading-2" ? 2 : 3, text: block.title || block.text };
    if (block.kind === "unordered-list" || block.kind === "ordered-list") return { type: "list", style: block.kind === "ordered-list" ? "ordered" : "unordered", items: block.items.map(toParts) };
    if (block.kind === "quote") return { type: "quote", quote: block.text, ...(block.title ? { attribution: block.title } : {}) };
    if (block.kind === "quick-answer") return { type: "quick-answer", title: block.title || "Quick answer", content: toParts(block.text) };
    if (block.kind === "key-takeaways") return { type: "key-takeaways", title: block.title || "Key takeaways", items: block.items.map(toParts) };
    return { type: "callout", ...(block.title ? { title: block.title } : {}), content: toParts(block.text) };
  });
  return {
    schemaVersion: 1, slug: result.slug, title: result.title, seoTitle: result.seoTitle, description: result.description, excerpt: result.excerpt, category: result.category,
    publishDate: now, modifiedDate: now, author: { name: "Luxe Event Co.", type: "Organization", url: "https://luxeeventco.ca" },
    heroImage: null, heroAlt: "", socialImage: null, content, relatedArticleSlugs: result.relatedArticleSlugs, status: "draft", claims: result.claims,
    generation: { threadId: job.threadId, stage: "draft", model: job.model, createdAt: job.createdAt, updatedAt: now, knowledgeSnapshot: job.sources.map((source) => source.id).join(","), voiceVersion: voice.version || "unknown", usage: job.usage, briefApprovedAt: job.briefApprovedAt, outlineApprovedAt: job.outlineApprovedAt },
  };
}

function normalizeStudioReview(stage, value) {
  if (stage === "brief") {
    const requiredStrings = ["angle", "audience", "searchIntent", "category", "workingTitle"];
    for (const field of requiredStrings) if (!String(value?.[field] || "").trim()) throw Object.assign(new Error(`Brief ${field} is required.`), { status: 422 });
    return {
      ...Object.fromEntries(requiredStrings.map((field) => [field, String(value[field]).trim()])),
      sourceIds: [...new Set((value.sourceIds || []).map(String).map((item) => item.trim()).filter(Boolean))],
      proposedInternalLinks: [...new Set((value.proposedInternalLinks || []).map(String).map((item) => item.trim()).filter(Boolean))],
      conflicts: (value.conflicts || []).map(String).map((item) => item.trim()).filter(Boolean),
      qualifications: (value.qualifications || []).map(String).map((item) => item.trim()).filter(Boolean),
      missingInformation: (value.missingInformation || []).map(String).map((item) => item.trim()).filter(Boolean),
    };
  }
  if (stage === "outline") {
    if (!String(value?.title || "").trim()) throw Object.assign(new Error("Outline title is required."), { status: 422 });
    if (!Array.isArray(value?.sections) || !value.sections.length) throw Object.assign(new Error("Add at least one article section."), { status: 422 });
    return {
      title: String(value.title).trim(),
      quickAnswerPurpose: String(value.quickAnswerPurpose || "").trim(),
      takeawaysPurpose: String(value.takeawaysPurpose || "").trim(),
      sections: value.sections.map((section, index) => {
        if (!String(section.heading || "").trim()) throw Object.assign(new Error(`Section ${index + 1} needs a heading.`), { status: 422 });
        return {
          heading: String(section.heading).trim(),
          purpose: String(section.purpose || "").trim(),
          sourceIds: [...new Set((section.sourceIds || []).map(String).map((item) => item.trim()).filter(Boolean))],
        };
      }),
    };
  }
  throw Object.assign(new Error("Only brief and outline reviews can be updated."), { status: 400 });
}

async function approveStudioStage(jobId, stage, value) {
  const jobs = await readJson(projectFiles().jobs, []);
  const job = jobs.find((candidate) => candidate.id === jobId);
  if (!job) throw Object.assign(new Error("Studio job not found."), { status: 404 });
  const now = new Date().toISOString();
  if (stage === "brief") {
    if (value) job.brief = normalizeStudioReview("brief", value);
    job.briefApprovedAt = now;
  } else if (stage === "outline") {
    if (value) job.outline = normalizeStudioReview("outline", value);
    job.outlineApprovedAt = now;
  }
  else throw Object.assign(new Error("Only brief and outline stages can be approved."), { status: 400 });
  job.updatedAt = now;
  await atomicWriteJson(projectFiles().jobs, jobs);
  return job;
}

async function serveStatic(req, res, pathname) {
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const file = path.resolve(STATIC_DIR, relative);
  if (!file.startsWith(STATIC_DIR)) return false;
  try {
    const info = await stat(file);
    if (!info.isFile()) return false;
    const extension = path.extname(file);
    const contentType = extension === ".html" ? "text/html; charset=utf-8" : extension === ".css" ? "text/css; charset=utf-8" : extension === ".js" ? "text/javascript; charset=utf-8" : "application/octet-stream";
    res.writeHead(200, { "content-type": contentType, "cache-control": "no-store", "x-content-type-options": "nosniff" });
    createReadStream(file).pipe(res);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function serveBlogMedia(req, res, pathname) {
  if (!pathname.startsWith("/images/blog/") || !["GET", "HEAD"].includes(req.method || "")) return false;
  let relative;
  try {
    relative = decodeURIComponent(pathname.slice("/images/blog/".length));
  } catch {
    return false;
  }
  const file = path.resolve(projectFiles().publicBlogMedia, relative);
  if (file !== projectFiles().publicBlogMedia && !file.startsWith(`${projectFiles().publicBlogMedia}${path.sep}`)) return false;
  try {
    const info = await stat(file);
    if (!info.isFile()) return false;
    const contentTypes = {
      ".avif": "image/avif",
      ".jpeg": "image/jpeg",
      ".jpg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    };
    const contentType = contentTypes[path.extname(file).toLowerCase()];
    if (!contentType) return false;
    res.writeHead(200, {
      "content-type": contentType,
      "content-length": info.size,
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    });
    if (req.method === "HEAD") res.end();
    else createReadStream(file).pipe(res);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function projectHandler(req, res, url) {
  const projectSettings = await readJson(projectFiles().settings, {});
  const globalSettings = await projectRegistry.globalSettings();
  const settings = effectiveSettings(projectSettings, globalSettings, currentProject().manifest);
  if (url.pathname === "/api/state" && req.method === "GET") return json(res, 200, await buildState());
  if (url.pathname.startsWith("/api/preview/") && req.method === "GET") {
    const token = url.pathname.split("/").at(-1);
    if (!/^[a-f0-9]{48}$/.test(token || "")) return errorResponse(res, 404, "Preview not found.");
    const preview = await readJson(path.join(projectFiles().runtime, "previews", `${token}.json`), null);
    if (!preview || preview.token !== token || preview.expiresAt < Date.now()) return errorResponse(res, 404, "Preview expired or unavailable.");
    res.setHeader("cache-control", "no-store");
    res.setHeader("x-robots-tag", "noindex, nofollow");
    return json(res, 200, preview);
  }
  if (url.pathname.startsWith("/api/") && req.method !== "GET" && !requireMutationToken(req)) return errorResponse(res, 403, "Invalid CMS mutation token.");

  try {
    const capabilityByPrefix = [
      ["/api/articles", "articles"], ["/api/preview", "preview"], ["/api/media", "media"],
      ["/api/knowledge", "knowledge"], ["/api/voice", "voice"], ["/api/studio", "studio"],
      ["/api/calendar", "calendar"], ["/api/seo", "seo"],
    ];
    const requiredCapability = capabilityByPrefix.find(([prefix]) => url.pathname.startsWith(prefix))?.[1];
    if (requiredCapability) requireCapability(requiredCapability);
    if (url.pathname === "/api/validate" && req.method === "GET") {
      const project = currentProject();
      const content = project.adapter.capabilities.includes("articles") ? await loadCollections() : null;
      return json(res, 200, { valid: true, projectId: project.id, adapter: project.adapter.id, capabilities: project.adapter.capabilities, articleCounts: content ? { published: content.published.length, drafts: content.drafts.length, archived: content.archived.length, trash: content.trash.length } : null });
    }
    if (url.pathname === "/api/export" && req.method === "POST") return json(res, 200, await exportProjectBundle(currentProject(), await readJsonBody(req)));
    if (url.pathname === "/api/open-folder" && req.method === "POST") {
      const child = spawn("open", [currentProject().root], { stdio: "ignore", detached: true });
      child.unref();
      return json(res, 200, { opened: true, root: currentProject().root });
    }
    if (url.pathname === "/api/seo/search-console/import" && req.method === "POST") {
      const body = await readJsonBody(req);
      return json(res, 200, await importSearchConsoleCsv(currentProject(), body.csv, { commit: body.commit === true }));
    }
    if (url.pathname === "/api/seo/google/start" && req.method === "POST") return json(res, 200, await googleSearchConsole.authorizationUrl(currentProject().id));
    if (url.pathname === "/api/seo/google/sites" && req.method === "GET") return json(res, 200, await googleSearchConsole.sites());
    if (url.pathname === "/api/seo/google/bind" && req.method === "POST") {
      const { property } = await readJsonBody(req);
      if (!String(property || "").trim()) throw Object.assign(new Error("Choose a Search Console property."), { status: 422 });
      const integration = await saveIntegration(currentProject(), { searchConsole: { status: "connected", property: String(property), connectedAt: new Date().toISOString() } });
      return json(res, 200, integration);
    }
    if (url.pathname === "/api/seo/google/unbind" && req.method === "POST") {
      return json(res, 200, await saveIntegration(currentProject(), { searchConsole: { status: "not-configured", property: null, disconnectedAt: new Date().toISOString() } }));
    }
    if (url.pathname === "/api/seo/google/sync" && req.method === "POST") {
      const integration = (await seoState(currentProject())).integration;
      const property = integration.searchConsole?.property;
      if (!property) throw Object.assign(new Error("Bind a Search Console property before synchronizing."), { status: 412 });
      const body = await readJsonBody(req);
      const endDate = body.endDate || new Date(Date.now() - 3 * 86_400_000).toISOString().slice(0, 10);
      const startDate = body.startDate || new Date(Date.parse(`${endDate}T00:00:00Z`) - 89 * 86_400_000).toISOString().slice(0, 10);
      const rows = await googleSearchConsole.searchAnalytics(property, { startDate, endDate });
      return json(res, 200, await saveSearchConsoleRows(currentProject(), rows, { startDate, endDate, property }));
    }
    if (url.pathname === "/api/seo/crawl" && req.method === "POST") return json(res, 200, await runTechnicalCrawl(currentProject(), await readJsonBody(req)));
    if (url.pathname === "/api/seo/opportunities/generate" && req.method === "POST") {
      const cmsState = await buildState();
      return json(res, 200, await generateOpportunities(currentProject(), { published: cmsState.published, graph: cmsState.graph, thresholds: projectSettings.opportunityThresholds }));
    }
    if (url.pathname === "/api/seo/opportunities/save" && req.method === "POST") return json(res, 200, await saveOpportunity(currentProject(), await readJsonBody(req)));
    if (url.pathname === "/api/seo/annotations/save" && req.method === "POST") return json(res, 200, await saveAnnotation(currentProject(), await readJsonBody(req)));
    if (url.pathname === "/api/seo/reports/generate" && req.method === "POST") return json(res, 200, await generateReport(currentProject(), await readJsonBody(req)));
    if (url.pathname === "/api/seo/reports/export" && req.method === "GET") {
      const format = url.searchParams.get("format");
      const reportId = url.searchParams.get("reportId");
      if (!["json", "html", "csv"].includes(format)) throw Object.assign(new Error("Choose a supported report format."), { status: 422 });
      const report = (await seoState(currentProject())).reports.find((item) => item.id === reportId);
      const file = report?.exports?.[format];
      const exportRoot = path.resolve(projectFiles().seo, "report-exports");
      if (!file || !path.resolve(file).startsWith(`${exportRoot}${path.sep}`)) throw Object.assign(new Error("Report export not found."), { status: 404 });
      const info = await stat(file);
      res.writeHead(200, { "content-type": { json: "application/json", html: "text/html; charset=utf-8", csv: "text/csv; charset=utf-8" }[format], "content-length": info.size, "content-disposition": `attachment; filename="${currentProject().manifest.name.replace(/[^a-z0-9]+/gi, "-")}-seo-report.${format}"`, "cache-control": "no-store" });
      return createReadStream(file).pipe(res);
    }
    if (url.pathname === "/api/articles/new" && req.method === "POST") { requireCapability("articles"); return json(res, 200, createEmptyArticle()); }
    if (url.pathname === "/api/articles/save" && req.method === "POST") return json(res, 200, await saveArticle((await readJsonBody(req)).article));
    if (url.pathname === "/api/articles/lifecycle/bulk" && req.method === "POST") {
      const body = await readJsonBody(req);
      return json(res, 200, await bulkLifecycle(body.slugs, body.action, body));
    }
    if (url.pathname === "/api/articles/lifecycle" && req.method === "POST") {
      const body = await readJsonBody(req);
      return json(res, 200, await lifecycle(body.slug, body.action, body));
    }
    if (url.pathname === "/api/preview" && req.method === "POST") {
      const { article } = await readJsonBody(req);
      const token = crypto.randomBytes(24).toString("hex");
      const expiresAt = Date.now() + 30 * 60 * 1000;
      const publicSiteUrl = await resolvePublicSiteUrl(settings);
      await atomicWriteJson(path.join(projectFiles().runtime, "previews", `${token}.json`), { token, expiresAt, article }, { revision: false });
      return json(res, 200, { url: `${publicSiteUrl}/preview/${runtimePort}/${token}/${encodeURIComponent(article.slug)}?project=${encodeURIComponent(currentProject().id)}`, expiresInMinutes: 30, projectId: currentProject().id });
    }
    if (url.pathname === "/api/media" && req.method === "POST") return json(res, 200, await ingestMedia(req, url));
    if (url.pathname === "/api/knowledge/scan" && req.method === "POST") return json(res, 200, await scanKnowledge(settings));
    if (url.pathname === "/api/knowledge/approve" && req.method === "POST") return json(res, 200, await approveKnowledgeScan());
    if (url.pathname === "/api/knowledge/save" && req.method === "POST") {
      const { records } = await readJsonBody(req);
      await atomicWriteJson(projectFiles().knowledge, records);
      return json(res, 200, { saved: records.length });
    }
    if (url.pathname === "/api/voice/save" && req.method === "POST") {
      const { voice } = await readJsonBody(req);
      await atomicWriteJson(projectFiles().voice, voice);
      return json(res, 200, voice);
    }
    if (url.pathname === "/api/settings/save" && req.method === "POST") {
      const body = await readJsonBody(req);
      const globalFields = ["paidCreditsDisabledAcknowledged", "model", "reasoningEffort", "helpReasoningEffort", "googleOAuthClientId", "googleOAuthClientSecret"];
      const globalPatch = Object.fromEntries(globalFields.filter((field) => field in (body.settings || {})).map((field) => [field, body.settings[field]]));
      const projectPatch = Object.fromEntries(Object.entries(body.settings || {}).filter(([field]) => !globalFields.includes(field)));
      const [nextGlobal] = await Promise.all([
        projectRegistry.saveGlobalSettings(globalPatch),
        atomicWriteJson(projectFiles().settings, { ...projectSettings, ...projectPatch, schemaVersion: 1 }, { revision: false }),
      ]);
      return json(res, 200, { ...nextGlobal, ...projectSettings, ...projectPatch });
    }
    if (url.pathname === "/api/codex/cancel" && req.method === "POST") {
      const { requestId } = await readJsonBody(req);
      return json(res, 200, { cancelled: cancelCodexRun(requestId) });
    }
    if (url.pathname === "/api/help/ask" && req.method === "POST") return json(res, 200, await runHelpAssistant(await readJsonBody(req)));
    if (url.pathname === "/api/help/repair" && req.method === "POST") return json(res, 200, await requestHelpRepair(await readJsonBody(req)));
    if (url.pathname === "/api/help/repair/decision" && req.method === "POST") return json(res, 200, await applyHelpRepair(await readJsonBody(req)));
    if (url.pathname === "/api/calendar/item" && req.method === "POST") return json(res, 200, await saveCalendarItem(await readJsonBody(req)));
    if (url.pathname === "/api/calendar/delete" && req.method === "POST") return json(res, 200, await deleteCalendarItem((await readJsonBody(req)).id));
    if (url.pathname === "/api/calendar/config" && req.method === "POST") {
      const { config } = await readJsonBody(req);
      const next = { ...defaultCalendarConfig(), ...config, schemaVersion: 1 };
      for (const date of next.blackoutDates || []) normalizeCalendarItem({ title: "Blackout", targetDate: date });
      if (!Array.isArray(next.statuses) || !next.statuses.length) throw Object.assign(new Error("Add at least one calendar workflow status."), { status: 422 });
      await atomicWriteJson(projectFiles().calendarConfig, next);
      return json(res, 200, next);
    }
    if (url.pathname === "/api/calendar/propose" && req.method === "POST") return json(res, 200, await runCalendarProposal(await readJsonBody(req)));
    if (url.pathname === "/api/calendar/approve" && req.method === "POST") return json(res, 200, await approveCalendarProposal((await readJsonBody(req)).id));
    if (url.pathname === "/api/calendar/proposal/delete" && req.method === "POST") return json(res, 200, await deleteCalendarProposal((await readJsonBody(req)).id));
    if (url.pathname === "/api/studio/brief" && req.method === "POST") return json(res, 200, await runCodexStage("brief", await readJsonBody(req)));
    if (url.pathname === "/api/studio/outline" && req.method === "POST") return json(res, 200, await runCodexStage("outline", await readJsonBody(req)));
    if (url.pathname === "/api/studio/draft" && req.method === "POST") return json(res, 200, await runCodexStage("draft", await readJsonBody(req)));
    if (url.pathname === "/api/studio/approve" && req.method === "POST") {
      const body = await readJsonBody(req);
      return json(res, 200, await approveStudioStage(body.jobId, body.stage, body.value));
    }
    if (url.pathname.startsWith("/api/")) return errorResponse(res, 404, "Project API route not found.");
    if (await serveBlogMedia(req, res, url.pathname)) return;
    if (await serveStatic(req, res, url.pathname)) return;
    errorResponse(res, 404, "Not found.");
  } catch (error) {
    errorResponse(res, error.status || 500, error.message || "Unexpected CMS error.", error.details);
  }
}

async function handler(req, res) {
  if (!isLoopback(req)) return errorResponse(res, 403, "The local CMS accepts loopback connections only.");
  const origin = `http://${req.headers.host}`;
  allowedOrigins.add(origin);
  res.setHeader("content-security-policy", "default-src 'self'; img-src 'self' data: http://127.0.0.1:* http://localhost:*; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-src 'self'; base-uri 'none'; form-action 'self'");
  res.setHeader("referrer-policy", "no-referrer");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  const requestOrigin = req.headers.origin;
  if (requestOrigin && !allowedOrigins.has(requestOrigin)) return errorResponse(res, 403, "Origin is not allowed.");
  const url = new URL(req.url, origin);

  if (url.pathname === "/api/session" && req.method === "GET") {
    const registry = await projectRegistry.list();
    return json(res, 200, { token: MUTATION_TOKEN, loopback: true, registry });
  }
  if (url.pathname === "/api/google/oauth/callback" && req.method === "GET") {
    try {
      const projectId = await googleSearchConsole.callback({ code: url.searchParams.get("code"), requestState: url.searchParams.get("state") });
      res.writeHead(302, { location: `/?project=${encodeURIComponent(projectId)}&google=connected` });
      return res.end();
    } catch (error) { return errorResponse(res, error.status || 500, error.message || "Google authorization failed."); }
  }
  if (url.pathname === "/api/projects" && req.method === "GET") return json(res, 200, await projectRegistry.list());
  if (url.pathname.startsWith("/api/") && req.method !== "GET" && !requireMutationToken(req)) return errorResponse(res, 403, "Invalid CMS mutation token.");
  try {
    if (url.pathname === "/api/projects/add" && req.method === "POST") return json(res, 200, await projectRegistry.add(await readJsonBody(req)));
    if (url.pathname === "/api/projects/activate" && req.method === "POST") return json(res, 200, await projectRegistry.activate((await readJsonBody(req)).projectId));
    if (url.pathname === "/api/projects/reconnect" && req.method === "POST") return json(res, 200, await projectRegistry.reconnect(await readJsonBody(req)));
    if (url.pathname === "/api/projects/disconnect" && req.method === "POST") return json(res, 200, await projectRegistry.disconnect((await readJsonBody(req)).projectId));
    if (url.pathname === "/api/projects/import/inspect" && req.method === "POST") return json(res, 200, await inspectProjectBundle((await readJsonBody(req)).file));
    if (url.pathname === "/api/projects/import" && req.method === "POST") {
      const body = await readJsonBody(req);
      const imported = await importProjectBundle(body.file, body.root, { clone: body.clone === true });
      const context = await projectRegistry.add({ root: imported.root });
      return json(res, 200, { ...imported, context });
    }

    const registry = await projectRegistry.list();
    const scoped = url.pathname.match(/^\/api\/projects\/([^/]+)(\/.*)?$/);
    const projectId = scoped ? decodeURIComponent(scoped[1]) : registry.activeProjectId;
    const context = await projectRegistry.context(projectId);
    await ensureProjectScaffold(context);
    if (req.method !== "GET") await projectLocks.acquire(context);
    if (scoped) url.pathname = `/api${scoped[2] || "/state"}`;
    return projectStore.run(context, () => projectHandler(req, res, url));
  } catch (error) {
    errorResponse(res, error.status || 500, error.message || "Unexpected CMS error.", error.details);
  }
}

await projectRegistry.bootstrap();
const initialSettings = await projectRegistry.globalSettings();
const runtimePort = Number(process.env.LUXE_CMS_PORT) || initialSettings.port || 4317;
googleSearchConsole = new GoogleSearchConsole({ registry: projectRegistry, runtimePort });
const server = http.createServer((req, res) => void handler(req, res));
server.listen(runtimePort, "127.0.0.1", () => {
  process.stdout.write(`Local multi-project CMS: http://127.0.0.1:${runtimePort}\n`);
  if (!initialSettings.paidCreditsDisabledAcknowledged) {
    process.stdout.write("Article Studio is locked until paid-credit auto top-up is confirmed disabled in Settings.\n");
  }
});

async function stopLocalServers() {
  for (const process of managedSiteProcesses.values()) if (!process.killed) process.kill("SIGTERM");
  const registry = await projectRegistry.list().catch(() => ({ projects: [] }));
  const contexts = await Promise.all((registry.projects || []).filter((entry) => entry.connectionStatus === "connected").map((entry) => projectRegistry.context(entry.projectId).catch(() => null)));
  await projectLocks.releaseAll(contexts.filter(Boolean));
  server.close();
}

process.once("SIGINT", () => void stopLocalServers());
process.once("SIGTERM", () => void stopLocalServers());
