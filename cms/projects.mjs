import crypto from "node:crypto";
import path from "node:path";
import { access, copyFile, mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";

const MANIFEST_NAME = "cms-project.json";
const REGISTRY_SCHEMA = 1;

export const ADAPTERS = Object.freeze({
  "luxe-json-v1": {
    id: "luxe-json-v1",
    version: 1,
    label: "Luxe JSON / Vinext",
    capabilities: ["articles", "media", "knowledge", "voice", "studio", "calendar", "preview", "build", "seo"],
  },
  "generic-seo-v1": {
    id: "generic-seo-v1",
    version: 1,
    label: "Generic website SEO",
    capabilities: ["seo"],
  },
});

function cleanUrl(value, fallback = "") {
  try {
    const url = new URL(String(value || fallback));
    return url.toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function assertRelativePath(value, field) {
  const normalized = path.normalize(String(value || ""));
  if (!normalized || path.isAbsolute(normalized) || normalized === ".." || normalized.startsWith(`..${path.sep}`)) {
    throw Object.assign(new Error(`${field} must be a safe project-relative path.`), { status: 422 });
  }
  return normalized;
}

export function validateProjectManifest(value) {
  const adapter = ADAPTERS[value?.adapter];
  if (!adapter) throw Object.assign(new Error("Choose a supported CMS project adapter."), { status: 422 });
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value?.projectId || ""))) {
    throw Object.assign(new Error("Project manifest requires an immutable UUID."), { status: 422 });
  }
  const canonicalBaseUrl = cleanUrl(value.canonicalBaseUrl);
  if (!canonicalBaseUrl) throw Object.assign(new Error("Project manifest requires a valid canonical URL."), { status: 422 });
  return {
    schemaVersion: 1,
    projectId: value.projectId,
    name: String(value.name || new URL(canonicalBaseUrl).hostname).trim(),
    canonicalBaseUrl,
    publicSiteUrl: cleanUrl(value.publicSiteUrl, canonicalBaseUrl),
    localSiteUrl: cleanUrl(value.localSiteUrl, "http://127.0.0.1:3000"),
    adapter: adapter.id,
    adapterVersion: adapter.version,
    contentDirectory: assertRelativePath(value.contentDirectory || ".cms/content", "contentDirectory"),
    publicMediaDirectory: assertRelativePath(value.publicMediaDirectory || "public/images/blog", "publicMediaDirectory"),
    applicationDirectory: assertRelativePath(value.applicationDirectory || "app", "applicationDirectory"),
    metadataFile: assertRelativePath(value.metadataFile || "app/metadata-config.ts", "metadataFile"),
    sitemapPath: String(value.sitemapPath || "/sitemap.xml"),
    robotsPath: String(value.robotsPath || "/robots.txt"),
    previewPortRange: [...new Set((value.previewPortRange || [3000, 3001, 3002, 3003, 3004, 3005]).map(Number).filter((port) => Number.isInteger(port) && port > 0 && port < 65536))],
    developmentCommand: Array.isArray(value.developmentCommand) ? value.developmentCommand.map(String) : ["npm", "run", "dev"],
    buildCommand: Array.isArray(value.buildCommand) ? value.buildCommand.map(String) : ["npm", "run", "build"],
  };
}

async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error?.code === "ENOENT") return fallback; throw error; }
}

async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
}

function within(root, candidate) {
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(candidate);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw Object.assign(new Error("Resolved project path escapes the registered project root."), { status: 403 });
  }
  return resolved;
}

export function projectPaths(root, manifest, { luxeSettingsFile } = {}) {
  const content = within(root, path.join(root, manifest.contentDirectory));
  const local = within(root, path.join(root, ".cms-local"));
  const publicMedia = within(root, path.join(root, manifest.publicMediaDirectory));
  return {
    published: path.join(content, "published", "articles.json"),
    draft: path.join(content, "drafts", "articles.json"),
    archived: path.join(content, "archived", "articles.json"),
    trash: path.join(content, ".trash", "articles.json"),
    revisions: path.join(content, ".revisions"),
    knowledge: path.join(content, "knowledge", "records.json"),
    snapshot: path.join(content, "knowledge", "website-snapshot.json"),
    voice: path.join(content, "voice.json"),
    media: path.join(content, "media", "manifest.json"),
    originals: path.join(content, "media", "originals"),
    jobs: path.join(content, "studio", "jobs.json"),
    calendar: path.join(content, "calendar", "items.json"),
    calendarConfig: path.join(content, "calendar", "config.json"),
    calendarProposals: path.join(content, "calendar", "proposals.json"),
    helpSessions: path.join(content, ".local", "help-sessions.json"),
    settings: manifest.adapter === "luxe-json-v1" && luxeSettingsFile ? luxeSettingsFile : path.join(local, "settings.json"),
    runtime: path.join(local, "runtime"),
    seo: path.join(local, "seo"),
    database: path.join(local, "cms.sqlite"),
    backups: path.join(local, "backups"),
    publicBlogMedia: publicMedia,
    application: within(root, path.join(root, manifest.applicationDirectory)),
    metadata: within(root, path.join(root, manifest.metadataFile)),
    manifest: path.join(root, MANIFEST_NAME),
  };
}

export class ProjectRegistry {
  constructor({ cmsDir, defaultRoot, legacySettingsFile }) {
    this.cmsDir = cmsDir;
    this.defaultRoot = path.resolve(defaultRoot);
    this.registryFile = path.join(cmsDir, ".local", "projects.json");
    this.globalSettingsFile = path.join(cmsDir, ".local", "settings.json");
    this.legacySettingsFile = legacySettingsFile;
  }

  localFile(name) {
    const safe = String(name || "").replace(/[^a-z0-9._-]/gi, "-");
    return path.join(this.cmsDir, ".local", safe);
  }

  async bootstrap() {
    let registry = await readJson(this.registryFile, null);
    if (!registry) {
      const manifest = validateProjectManifest(await readJson(path.join(this.defaultRoot, MANIFEST_NAME), null));
      const legacy = await readJson(this.legacySettingsFile, {});
      registry = {
        schemaVersion: REGISTRY_SCHEMA,
        activeProjectId: manifest.projectId,
        projects: [{ projectId: manifest.projectId, root: this.defaultRoot, connected: true, lastOpenedAt: new Date().toISOString() }],
      };
      await writeJson(this.registryFile, registry);
      await writeJson(this.globalSettingsFile, {
        schemaVersion: 1,
        host: "127.0.0.1",
        port: legacy.port || 4317,
        includedUsageOnly: true,
        paidCreditsDisabledAcknowledged: legacy.paidCreditsDisabledAcknowledged === true,
        model: legacy.model || null,
        reasoningEffort: legacy.reasoningEffort || "medium",
      });
    }
    return registry;
  }

  async globalSettings() {
    await this.bootstrap();
    return readJson(this.globalSettingsFile, { host: "127.0.0.1", port: 4317, includedUsageOnly: true });
  }

  async saveGlobalSettings(value) {
    const current = await this.globalSettings();
    const next = { ...current, ...value, schemaVersion: 1, host: "127.0.0.1", includedUsageOnly: true };
    await writeJson(this.globalSettingsFile, next);
    return next;
  }

  async list() {
    const registry = await this.bootstrap();
    const projects = [];
    for (const entry of registry.projects || []) {
      let manifest = null;
      let connectionStatus = entry.connected === false ? "disconnected" : "unavailable";
      try {
        manifest = validateProjectManifest(await readJson(path.join(entry.root, MANIFEST_NAME), null));
        if (entry.connected !== false) connectionStatus = manifest.projectId === entry.projectId ? "connected" : "identity-mismatch";
      } catch { if (entry.connected !== false) connectionStatus = "unavailable"; }
      projects.push({ ...entry, manifest, connectionStatus, adapter: manifest ? ADAPTERS[manifest.adapter] : null });
    }
    return { ...registry, projects };
  }

  async context(projectId) {
    const registry = await this.list();
    const entry = registry.projects.find((project) => project.projectId === projectId);
    if (!entry) throw Object.assign(new Error("Unknown CMS project."), { status: 404 });
    if (entry.connectionStatus !== "connected") throw Object.assign(new Error("CMS project is not connected at its registered location."), { status: 409 });
    const root = path.resolve(entry.root);
    return {
      id: projectId,
      root,
      manifest: entry.manifest,
      adapter: entry.adapter,
      files: projectPaths(root, entry.manifest, { luxeSettingsFile: projectId === "e798c1f3-0e31-4965-a529-83d50770286f" ? this.legacySettingsFile : null }),
    };
  }

  async activate(projectId) {
    const registry = await this.bootstrap();
    const target = (registry.projects || []).find((project) => project.projectId === projectId);
    if (!target) throw Object.assign(new Error("Unknown CMS project."), { status: 404 });
    if (target.connected === false) throw Object.assign(new Error("Reconnect this project before opening it."), { status: 409 });
    registry.activeProjectId = projectId;
    registry.projects = registry.projects.map((project) => project.projectId === projectId ? { ...project, lastOpenedAt: new Date().toISOString() } : project);
    await writeJson(this.registryFile, registry);
    return this.context(projectId);
  }

  async add({ root, name, canonicalBaseUrl, adapter = "generic-seo-v1" }) {
    const absoluteRoot = path.resolve(String(root || ""));
    const info = await stat(absoluteRoot).catch(() => null);
    if (!info?.isDirectory()) throw Object.assign(new Error("Choose an existing local website directory."), { status: 422 });
    const manifestFile = path.join(absoluteRoot, MANIFEST_NAME);
    let manifest = await readJson(manifestFile, null);
    if (!manifest) {
      manifest = validateProjectManifest({
        projectId: crypto.randomUUID(), name, canonicalBaseUrl, publicSiteUrl: canonicalBaseUrl,
        adapter, contentDirectory: ".cms/content", publicMediaDirectory: "public/images/blog",
      });
      await writeJson(manifestFile, manifest);
    } else manifest = validateProjectManifest(manifest);
    const registry = await this.bootstrap();
    const duplicate = registry.projects.find((project) => project.projectId === manifest.projectId);
    if (duplicate) {
      duplicate.root = absoluteRoot;
      duplicate.connected = true;
      duplicate.lastOpenedAt = new Date().toISOString();
    } else registry.projects.push({ projectId: manifest.projectId, root: absoluteRoot, connected: true, lastOpenedAt: new Date().toISOString() });
    registry.activeProjectId = manifest.projectId;
    await writeJson(this.registryFile, registry);
    const context = await this.context(manifest.projectId);
    const existingSettings = await readJson(context.files.settings, null);
    if (!existingSettings) {
      const defaults = await this.globalSettings();
      await writeJson(context.files.settings, { schemaVersion: 1, publicSiteUrl: manifest.localSiteUrl || manifest.publicSiteUrl, model: defaults.model || null, reasoningEffort: defaults.reasoningEffort || "medium", helpReasoningEffort: defaults.helpReasoningEffort || "low", crawlMaxPages: 250, opportunityThresholds: { minimumImpressions: 100, lowCtr: 0.02 }, reportingPeriodDays: 30 });
    }
    return context;
  }

  async reconnect({ projectId, root }) {
    const absoluteRoot = path.resolve(String(root || ""));
    const manifest = validateProjectManifest(await readJson(path.join(absoluteRoot, MANIFEST_NAME), null));
    if (manifest.projectId !== projectId) throw Object.assign(new Error("The selected folder belongs to a different CMS project."), { status: 409 });
    const registry = await this.bootstrap();
    const entry = registry.projects.find((project) => project.projectId === projectId);
    if (!entry) throw Object.assign(new Error("Unknown CMS project."), { status: 404 });
    entry.root = absoluteRoot;
    entry.connected = true;
    entry.lastOpenedAt = new Date().toISOString();
    await writeJson(this.registryFile, registry);
    return this.context(projectId);
  }

  async disconnect(projectId) {
    const registry = await this.bootstrap();
    const entry = registry.projects.find((project) => project.projectId === projectId);
    if (!entry) throw Object.assign(new Error("Unknown CMS project."), { status: 404 });
    if (registry.activeProjectId === projectId) throw Object.assign(new Error("Open another project before disconnecting the active project."), { status: 409 });
    entry.connected = false;
    await writeJson(this.registryFile, registry);
    return { disconnected: true, filesDeleted: false };
  }
}

export async function ensureProjectScaffold(context) {
  await mkdir(context.files.seo, { recursive: true });
  if (context.manifest.adapter === "generic-seo-v1") {
    await mkdir(path.dirname(context.files.settings), { recursive: true });
  }
}
