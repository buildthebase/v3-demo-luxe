import crypto from "node:crypto";
import path from "node:path";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";

const schemaVersion = 1;

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

function seoFile(context, name) { return path.join(context.files.seo, `${name}.json`); }

export function normalizeProjectUrl(value, manifest) {
  const base = new URL(manifest.canonicalBaseUrl);
  const url = new URL(String(value || "/"), base);
  if (url.hostname === base.hostname || url.hostname === `www.${base.hostname}` || `www.${url.hostname}` === base.hostname) {
    url.protocol = base.protocol;
    url.hostname = base.hostname;
    url.port = base.port;
  }
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|gclid$|fbclid$|msclkid$|ref$)/i.test(key)) url.searchParams.delete(key);
  }
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') { cell += '"'; index += 1; }
      else quoted = !quoted;
    } else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(cell); cell = "";
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); if (row.some((value) => value.trim())) rows.push(row); }
  if (!rows.length) throw Object.assign(new Error("The Search Console CSV is empty."), { status: 422 });
  return rows;
}

const headerAliases = {
  query: ["query", "top queries"],
  page: ["page", "landing page", "top pages"],
  date: ["date", "day"],
  device: ["device"],
  country: ["country"],
  searchType: ["search type", "type"],
  clicks: ["clicks"],
  impressions: ["impressions"],
  ctr: ["ctr", "click through rate", "click-through rate"],
  position: ["position", "average position"],
};

function canonicalHeader(value) {
  const cleaned = String(value || "").trim().toLowerCase().replace(/[_-]+/g, " ");
  return Object.entries(headerAliases).find(([, aliases]) => aliases.includes(cleaned))?.[0] || null;
}

function numberValue(value, { percent = false } = {}) {
  const raw = String(value ?? "").replace(/,/g, "").trim();
  if (!raw) return 0;
  const parsed = Number(raw.replace(/%$/, ""));
  if (!Number.isFinite(parsed)) throw Object.assign(new Error(`Invalid numeric Search Console value: ${value}`), { status: 422 });
  return percent && raw.endsWith("%") ? parsed / 100 : parsed;
}

export function parseSearchConsoleCsv(text, context) {
  const rows = parseCsv(String(text || ""));
  const headers = rows[0].map(canonicalHeader);
  for (const required of ["clicks", "impressions"]) {
    if (!headers.includes(required)) throw Object.assign(new Error(`Search Console CSV requires a ${required} column.`), { status: 422 });
  }
  const importedAt = new Date().toISOString();
  const observations = rows.slice(1).map((values, index) => {
    const source = Object.fromEntries(headers.map((header, cellIndex) => [header, values[cellIndex]]).filter(([header]) => header));
    const parsedDate = source.date ? new Date(source.date) : null;
    if (parsedDate && Number.isNaN(parsedDate.getTime())) throw Object.assign(new Error(`Invalid date on CSV row ${index + 2}.`), { status: 422 });
    const date = parsedDate ? parsedDate.toISOString().slice(0, 10) : null;
    const page = source.page ? normalizeProjectUrl(source.page, context.manifest) : context.manifest.canonicalBaseUrl;
    const clicks = numberValue(source.clicks);
    const impressions = numberValue(source.impressions);
    return {
      id: crypto.createHash("sha256").update(JSON.stringify([context.id, date, source.query || "", page, source.device || "", source.country || "", source.searchType || "web", clicks, impressions])).digest("hex").slice(0, 24),
      schemaVersion, projectId: context.id, source: "search-console-csv", importedAt,
      date, query: source.query || null, page, device: source.device || null, country: source.country || null,
      searchType: source.searchType || "web", clicks, impressions,
      ctr: source.ctr !== undefined ? numberValue(source.ctr, { percent: true }) : impressions ? clicks / impressions : 0,
      position: source.position !== undefined ? numberValue(source.position) : null,
    };
  });
  return { headers: headers.filter(Boolean), observations, rowCount: observations.length };
}

export async function importSearchConsoleCsv(context, text, { commit = false } = {}) {
  const parsed = parseSearchConsoleCsv(text, context);
  const [existing, imports] = await Promise.all([readJson(seoFile(context, "search-observations"), []), readJson(seoFile(context, "imports"), [])]);
  const known = new Set(existing.map((item) => item.id));
  const seenImport = new Set();
  const added = parsed.observations.filter((item) => !known.has(item.id) && !seenImport.has(item.id) && seenImport.add(item.id));
  const result = { ...parsed, observations: parsed.observations.slice(0, 20), added: added.length, duplicates: parsed.observations.length - added.length, committed: commit };
  if (commit) {
    const nextImports = [...imports, { id: crypto.randomUUID(), projectId: context.id, source: "search-console-csv", importedAt: new Date().toISOString(), rows: parsed.rowCount, added: added.length, duplicates: result.duplicates }];
    try {
      await writeJson(seoFile(context, "search-observations"), [...existing, ...added]);
      await writeJson(seoFile(context, "imports"), nextImports);
    } catch (error) {
      await Promise.all([writeJson(seoFile(context, "search-observations"), existing), writeJson(seoFile(context, "imports"), imports)]).catch(() => null);
      throw error;
    }
  }
  return result;
}

export async function saveSearchConsoleRows(context, rows, { startDate, endDate, property }) {
  const syncedAt = new Date().toISOString();
  const observations = rows.map((row) => {
    const [date, query, page, device, country] = row.keys || [];
    const normalizedPage = normalizeProjectUrl(page || context.manifest.canonicalBaseUrl, context.manifest);
    return {
      id: crypto.createHash("sha256").update(JSON.stringify([context.id, date, query, normalizedPage, device, country, "web", row.clicks, row.impressions])).digest("hex").slice(0, 24),
      schemaVersion, projectId: context.id, source: "search-console-api", syncedAt,
      date: date || null, query: query || null, page: normalizedPage, device: device || null, country: country || null,
      searchType: "web", clicks: row.clicks || 0, impressions: row.impressions || 0, ctr: row.ctr || 0, position: row.position ?? null,
    };
  });
  const existing = await readJson(seoFile(context, "search-observations"), []);
  const replacementIds = new Set(observations.map((row) => row.id));
  await writeJson(seoFile(context, "search-observations"), [...existing.filter((row) => !replacementIds.has(row.id)), ...observations]);
  const imports = await readJson(seoFile(context, "imports"), []);
  imports.push({ id: crypto.randomUUID(), projectId: context.id, source: "search-console-api", property, importedAt: syncedAt, startDate, endDate, rows: observations.length, limitations: ["Search Console API results may be bounded and are not guaranteed to include every query row."] });
  await writeJson(seoFile(context, "imports"), imports);
  return { rows: observations.length, syncedAt, startDate, endDate };
}

function extractTag(html, pattern) { return html.match(pattern)?.[1]?.trim() || null; }
function countTags(html, tag) { return (html.match(new RegExp(`<${tag}\\b`, "gi")) || []).length; }
function absoluteLinks(html, base) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"'#]+)["'][^>]*>/gi)) {
    try { links.push(new URL(match[1], base).toString()); } catch {}
  }
  return [...new Set(links)];
}
function imageFindings(html) {
  const images = [...html.matchAll(/<img\b([^>]*)>/gi)].map((match) => match[1]);
  return {
    count: images.length,
    missingAlt: images.filter((attrs) => !/\balt\s*=\s*["'][^"']*["']/i.test(attrs)).length,
    missingDimensions: images.filter((attrs) => !/\bwidth\s*=\s*["']?\d+/i.test(attrs) || !/\bheight\s*=\s*["']?\d+/i.test(attrs)).length,
  };
}

function finding(context, runId, url, ruleId, severity, evidence, resolution, verificationMethod = "live-crawl") {
  return { id: crypto.createHash("sha256").update(`${context.id}:${url}:${ruleId}`).digest("hex").slice(0, 24), schemaVersion, projectId: context.id, runId, ruleId, url, severity, evidence, resolution, verificationMethod, status: "open", detectedAt: new Date().toISOString() };
}

async function sitemapUrls(context, base) {
  const sitemapUrl = new URL(context.manifest.sitemapPath, base).toString();
  try {
    const response = await fetch(sitemapUrl, { signal: AbortSignal.timeout(12_000) });
    if (!response.ok) return [];
    const xml = await response.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim());
  } catch { return []; }
}

export async function runTechnicalCrawl(context, { maxPages = 250, startUrl } = {}) {
  const base = normalizeProjectUrl(startUrl || context.manifest.publicSiteUrl || context.manifest.canonicalBaseUrl, context.manifest);
  const origin = new URL(base).origin;
  const runId = crypto.randomUUID();
  const declaredSitemapUrls = (await sitemapUrls(context, base)).map((url) => normalizeProjectUrl(url, context.manifest));
  const sitemapSet = new Set(declaredSitemapUrls);
  const queued = [...new Set([base, ...declaredSitemapUrls])];
  const seen = new Set();
  const pages = [];
  const findings = [];
  while (queued.length && seen.size < Math.min(1000, Math.max(1, Number(maxPages) || 250))) {
    const url = queued.shift();
    if (seen.has(url) || new URL(url).origin !== origin || /\/(preview|api|cms)(\/|$)/i.test(new URL(url).pathname)) continue;
    seen.add(url);
    try {
      const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000), headers: { "user-agent": "LuxeLocalSEOAudit/1.0" } });
      const contentType = response.headers.get("content-type") || "";
      const html = /text\/html/i.test(contentType) ? await response.text() : "";
      const finalUrl = normalizeProjectUrl(response.url || url, context.manifest);
      const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
      const description = extractTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || extractTag(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
      const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || extractTag(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      const robots = extractTag(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i) || "";
      const h1Count = countTags(html, "h1");
      const structuredDataCount = (html.match(/<script[^>]+type=["']application\/ld\+json["']/gi) || []).length;
      const openGraphTitle = extractTag(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i) || extractTag(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i);
      const openGraphImage = extractTag(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i) || extractTag(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["']/i);
      const images = imageFindings(html);
      const links = absoluteLinks(html, finalUrl);
      const page = { url, finalUrl, status: response.status, title, description, canonical, robots, h1Count, structuredDataCount, openGraphTitle, openGraphImage, images, links, crawledAt: new Date().toISOString() };
      pages.push(page);
      if (response.status >= 400) findings.push(finding(context, runId, url, "http-status", "error", `HTTP ${response.status}`, "Restore the page or update links to a valid destination."));
      if (finalUrl !== url) findings.push(finding(context, runId, url, "redirect", "warning", `Redirects to ${finalUrl}`, "Update internal links to the final canonical destination."));
      if (response.ok && html) {
        if (!title) findings.push(finding(context, runId, url, "missing-title", "error", "No HTML title was found.", "Add one unique descriptive title."));
        if (!description) findings.push(finding(context, runId, url, "missing-description", "warning", "No meta description was found.", "Add a concise unique description."));
        if (!canonical) findings.push(finding(context, runId, url, "missing-canonical", "error", "No canonical link was found.", "Add a self-referencing canonical URL."));
        else if (normalizeProjectUrl(canonical, context.manifest) !== finalUrl) findings.push(finding(context, runId, url, "canonical-mismatch", "warning", `Canonical resolves to ${canonical}.`, "Confirm this URL should canonicalize to the declared destination."));
        if (/noindex/i.test(robots)) findings.push(finding(context, runId, url, "noindex", "warning", `Robots directive: ${robots}`, "Confirm the page is intentionally excluded from search."));
        if (h1Count !== 1) findings.push(finding(context, runId, url, "h1-count", h1Count === 0 ? "error" : "warning", `${h1Count} H1 elements found.`, "Use exactly one descriptive H1 on an indexable page."));
        if (!openGraphTitle) findings.push(finding(context, runId, url, "missing-og-title", "warning", "No Open Graph title was found.", "Add an Open Graph title aligned with the page metadata."));
        if (!openGraphImage) findings.push(finding(context, runId, url, "missing-og-image", "warning", "No Open Graph image was found.", "Add a stable social preview image with explicit dimensions."));
        if (/^\/blog\/[^/]+$/.test(new URL(finalUrl).pathname) && structuredDataCount === 0) findings.push(finding(context, runId, url, "missing-article-schema", "error", "No JSON-LD structured data was found on an article route.", "Output BlogPosting or Article schema and BreadcrumbList schema from the article template."));
        if (sitemapSet.size && !sitemapSet.has(finalUrl) && finalUrl !== base && !/noindex/i.test(robots)) findings.push(finding(context, runId, url, "sitemap-omission", "warning", "This crawlable indexable page was not declared in the sitemap.", "Add the canonical URL to the project sitemap or confirm that exclusion is intentional."));
        if (images.missingAlt) findings.push(finding(context, runId, url, "image-alt", "warning", `${images.missingAlt} images lack an alt attribute.`, "Add meaningful alt text or an explicit empty alt for decorative images."));
        if (images.missingDimensions) findings.push(finding(context, runId, url, "image-dimensions", "warning", `${images.missingDimensions} images lack intrinsic dimensions.`, "Add width and height to prevent layout shift."));
        for (const link of links) if (new URL(link).origin === origin && !seen.has(normalizeProjectUrl(link, context.manifest))) queued.push(normalizeProjectUrl(link, context.manifest));
      }
    } catch (error) {
      pages.push({ url, status: null, error: String(error?.message || error), crawledAt: new Date().toISOString() });
      findings.push(finding(context, runId, url, "fetch-failed", "error", String(error?.message || error), "Confirm the site is reachable and the URL is valid."));
    }
  }
  const titles = new Map();
  for (const page of pages.filter((item) => item.title)) {
    const matches = titles.get(page.title) || [];
    matches.push(page.url); titles.set(page.title, matches);
  }
  for (const [title, urls] of titles) if (urls.length > 1) for (const url of urls) findings.push(finding(context, runId, url, "duplicate-title", "warning", `Title is shared by ${urls.length} pages: ${title}`, "Use a unique title aligned with this page's intent."));
  const runs = await readJson(seoFile(context, "crawl-runs"), []);
  const priorFindings = new Map(runs.flatMap((run) => run.findings || []).map((item) => [item.id, item]));
  const completedAt = new Date().toISOString();
  for (const item of findings) {
    const prior = priorFindings.get(item.id);
    item.firstDetectedAt = prior?.firstDetectedAt || prior?.detectedAt || item.detectedAt;
    item.lastDetectedAt = completedAt;
    item.status = "open";
  }
  const run = { schemaVersion, id: runId, projectId: context.id, startedAt: pages[0]?.crawledAt || completedAt, completedAt, base, sitemapUrlCount: sitemapSet.size, pageCount: pages.length, findingCount: findings.length, pages, findings };
  runs.push(run);
  await writeJson(seoFile(context, "crawl-runs"), runs.slice(-24));
  return run;
}

function aggregatePages(observations) {
  const map = new Map();
  for (const row of observations) {
    const item = map.get(row.page) || { page: row.page, clicks: 0, impressions: 0, weightedPosition: 0 };
    item.clicks += row.clicks || 0;
    item.impressions += row.impressions || 0;
    if (row.position != null) item.weightedPosition += row.position * (row.impressions || 1);
    map.set(row.page, item);
  }
  return [...map.values()].map((item) => ({ ...item, ctr: item.impressions ? item.clicks / item.impressions : 0, position: item.impressions ? item.weightedPosition / item.impressions : null }));
}

function aggregateBy(observations, key) {
  const map = new Map();
  for (const row of observations) {
    const label = row[key] || "Unknown";
    const item = map.get(label) || { label, clicks: 0, impressions: 0, weightedPosition: 0 };
    item.clicks += row.clicks || 0; item.impressions += row.impressions || 0;
    if (row.position != null) item.weightedPosition += row.position * (row.impressions || 1);
    map.set(label, item);
  }
  return [...map.values()].map((item) => ({ ...item, ctr: item.impressions ? item.clicks / item.impressions : 0, position: item.impressions ? item.weightedPosition / item.impressions : null })).sort((a, b) => b.impressions - a.impressions);
}

function routeGroup(page) {
  const pathname = new URL(page).pathname;
  if (pathname.startsWith("/blog")) return "Blog";
  if (pathname.startsWith("/events")) return "Events";
  if (pathname.startsWith("/experiences")) return "Services";
  return pathname === "/" ? "Homepage" : "Other";
}

function totalMetrics(rows) {
  const total = rows.reduce((sum, row) => ({ clicks: sum.clicks + (row.clicks || 0), impressions: sum.impressions + (row.impressions || 0), weightedPosition: sum.weightedPosition + ((row.position || 0) * (row.impressions || 0)) }), { clicks: 0, impressions: 0, weightedPosition: 0 });
  return { clicks: total.clicks, impressions: total.impressions, ctr: total.impressions ? total.clicks / total.impressions : 0, position: total.impressions ? total.weightedPosition / total.impressions : null };
}

function searchViews(observations, context) {
  const dated = observations.filter((row) => row.date).sort((a, b) => a.date.localeCompare(b.date));
  const latestDate = dated.at(-1)?.date || null;
  const latestTime = latestDate ? Date.parse(`${latestDate}T00:00:00Z`) : null;
  const currentStart = latestTime ? new Date(latestTime - 27 * 86_400_000).toISOString().slice(0, 10) : null;
  const previousStart = latestTime ? new Date(latestTime - 55 * 86_400_000).toISOString().slice(0, 10) : null;
  const previousEnd = latestTime ? new Date(latestTime - 28 * 86_400_000).toISOString().slice(0, 10) : null;
  const currentRows = currentStart ? dated.filter((row) => row.date >= currentStart) : observations;
  const previousRows = previousStart ? dated.filter((row) => row.date >= previousStart && row.date <= previousEnd) : [];
  const yearAgoStart = currentStart ? new Date(Date.parse(`${currentStart}T00:00:00Z`) - 365 * 86_400_000).toISOString().slice(0, 10) : null;
  const yearAgoEnd = latestTime ? new Date(latestTime - 365 * 86_400_000).toISOString().slice(0, 10) : null;
  const yearAgoRows = yearAgoStart ? dated.filter((row) => row.date >= yearAgoStart && row.date <= yearAgoEnd) : [];
  const brandTerms = [...new Set([context.manifest.name, new URL(context.manifest.canonicalBaseUrl).hostname.replace(/^www\./, "").split(".")[0]].flatMap((value) => String(value || "").toLowerCase().split(/\s+/)).filter((value) => value.length > 2))];
  const queryRows = aggregateBy(observations, "query").map((row) => ({ ...row, branded: brandTerms.some((term) => row.label.toLowerCase().includes(term)) }));
  const grouped = observations.map((row) => ({ ...row, routeGroup: routeGroup(row.page) }));
  return {
    totals: totalMetrics(observations),
    currentPeriod: { startDate: currentStart, endDate: latestDate, ...totalMetrics(currentRows) },
    previousPeriod: { startDate: previousStart, endDate: previousEnd, ...totalMetrics(previousRows) },
    yearOverYear: { startDate: yearAgoStart, endDate: yearAgoEnd, available: yearAgoRows.length > 0, ...totalMetrics(yearAgoRows) },
    byPage: aggregatePages(observations).sort((a, b) => b.impressions - a.impressions).slice(0, 100),
    byQuery: queryRows.slice(0, 200),
    byDevice: aggregateBy(observations, "device"), byCountry: aggregateBy(observations, "country"), bySearchType: aggregateBy(observations, "searchType"),
    byRouteGroup: aggregateBy(grouped, "routeGroup"),
    branded: totalMetrics(observations.filter((row) => brandTerms.some((term) => String(row.query || "").toLowerCase().includes(term)))),
    nonBranded: totalMetrics(observations.filter((row) => !brandTerms.some((term) => String(row.query || "").toLowerCase().includes(term)))),
    limitations: [...(previousRows.length ? [] : ["A complete comparable previous period is not yet available."]), ...(yearAgoRows.length ? [] : ["Year-over-year comparison is unavailable until the matching prior-year period is imported."])],
  };
}

export async function generateOpportunities(context, { published = [], graph = {}, thresholds = {} } = {}) {
  const [observations, runs, existing] = await Promise.all([
    readJson(seoFile(context, "search-observations"), []),
    readJson(seoFile(context, "crawl-runs"), []),
    readJson(seoFile(context, "opportunities"), []),
  ]);
  const byKey = new Map(existing.map((item) => [item.key, item]));
  const candidates = [];
  const minimumImpressions = Number(thresholds.minimumImpressions) || 100;
  const lowCtr = Number(thresholds.lowCtr) || 0.02;
  for (const page of aggregatePages(observations)) {
    if (page.impressions >= minimumImpressions && page.position != null && page.position <= 20 && page.ctr < lowCtr) candidates.push({ type: "ctr", url: page.page, confidence: page.impressions >= minimumImpressions * 5 ? "high" : "medium", observation: `${page.impressions} impressions with ${(page.ctr * 100).toFixed(1)}% CTR at average position ${page.position.toFixed(1)}.`, proposedAction: "Review title, description, and intent alignment before changing page scope.", metric: "Search CTR" });
    if (page.impressions >= 50 && page.position >= 5 && page.position <= 20) candidates.push({ type: "near-visibility", url: page.page, confidence: page.impressions >= 250 ? "high" : "medium", observation: `${page.impressions} impressions at average position ${page.position.toFixed(1)}.`, proposedAction: "Review the existing answer, evidence, and relevant internal links.", metric: "Average position and clicks" });
  }
  const dated = observations.filter((row) => row.date);
  const latestDate = dated.map((row) => row.date).sort().at(-1);
  if (latestDate) {
    const latestTime = Date.parse(`${latestDate}T00:00:00Z`);
    const currentStart = new Date(latestTime - 27 * 86_400_000).toISOString().slice(0, 10);
    const previousStart = new Date(latestTime - 55 * 86_400_000).toISOString().slice(0, 10);
    const previousEnd = new Date(latestTime - 28 * 86_400_000).toISOString().slice(0, 10);
    const current = new Map(aggregatePages(dated.filter((row) => row.date >= currentStart)).map((item) => [item.page, item]));
    for (const prior of aggregatePages(dated.filter((row) => row.date >= previousStart && row.date <= previousEnd))) {
      const now = current.get(prior.page);
      if (prior.clicks >= 10 && (!now || now.clicks <= prior.clicks * 0.7)) candidates.push({ type: "material-decline", url: prior.page, confidence: prior.clicks >= 30 ? "high" : "medium", observation: `${prior.clicks} clicks in the previous comparable period versus ${now?.clicks || 0} in the current period.`, proposedAction: "Review query and page movement, technical changes, and recent annotations before deciding whether a refresh is warranted.", metric: "Comparable-period clicks" });
    }
  }
  const queryPages = new Map();
  for (const row of observations.filter((item) => item.query && item.page && item.impressions >= 10)) {
    const pages = queryPages.get(row.query) || new Map(); pages.set(row.page, (pages.get(row.page) || 0) + row.impressions); queryPages.set(row.query, pages);
  }
  for (const [query, pages] of queryPages) {
    const ranked = [...pages.entries()].sort((a, b) => b[1] - a[1]);
    if (ranked.length >= 2 && ranked[1][1] >= 25) candidates.push({ type: "intent-overlap", url: ranked[0][0], confidence: "medium", observation: `Query “${query}” produced impressions for ${ranked.length} pages; the leading two received ${ranked[0][1]} and ${ranked[1][1]} impressions.`, proposedAction: "Review whether the pages serve distinct intents before considering internal-link, metadata, or consolidation changes.", metric: "Query-to-page distribution" });
    const topUrl = new URL(ranked[0][0]);
    if (ranked[0][1] >= 50 && topUrl.pathname === "/") candidates.push({ type: "potential-content-gap", url: ranked[0][0], confidence: "low", observation: `Query “${query}” generated ${ranked[0][1]} impressions primarily on the homepage.`, proposedAction: "Confirm whether an existing page answers this intent before creating or expanding content.", metric: "Relevant query impressions", query });
  }
  for (const article of published) if (graph[article.slug]?.orphan) candidates.push({ type: "orphaned-content", url: new URL(`/blog/${article.slug}`, context.manifest.canonicalBaseUrl).toString(), confidence: "high", observation: "No other published article links to this published article.", proposedAction: "Add a genuinely relevant contextual link from another published article; Blog index links do not clear orphan status.", metric: "Published inbound internal links" });
  for (const findingItem of runs.at(-1)?.findings || []) candidates.push({ type: `technical-${findingItem.ruleId}`, url: findingItem.url, confidence: "high", observation: findingItem.evidence, proposedAction: findingItem.resolution, metric: "Technical finding resolved", findingId: findingItem.id });
  const now = new Date().toISOString();
  for (const candidate of candidates) {
    const key = crypto.createHash("sha256").update(`${context.id}:${candidate.type}:${candidate.url}`).digest("hex").slice(0, 24);
    const previous = byKey.get(key);
    byKey.set(key, { schemaVersion, id: previous?.id || crypto.randomUUID(), key, projectId: context.id, evidenceSource: candidate.type.startsWith("technical-") ? "live-crawl" : "search-console", status: previous?.status || "new", createdAt: previous?.createdAt || now, updatedAt: now, limitations: candidate.type.startsWith("technical-") ? [] : ["Search Console data may be incomplete and does not prove causation."], ...candidate });
  }
  const opportunities = [...byKey.values()];
  await writeJson(seoFile(context, "opportunities"), opportunities);
  return opportunities;
}

export async function saveOpportunity(context, value) {
  const opportunities = await readJson(seoFile(context, "opportunities"), []);
  const index = opportunities.findIndex((item) => item.id === value.id);
  if (index < 0) throw Object.assign(new Error("SEO opportunity not found."), { status: 404 });
  const allowed = ["new", "reviewing", "approved", "scheduled", "in-progress", "completed", "monitoring", "rejected", "dismissed"];
  if (!allowed.includes(value.status)) throw Object.assign(new Error("Invalid SEO opportunity status."), { status: 422 });
  opportunities[index] = { ...opportunities[index], status: value.status, notes: String(value.notes || ""), updatedAt: new Date().toISOString() };
  await writeJson(seoFile(context, "opportunities"), opportunities);
  return opportunities[index];
}

export async function saveAnnotation(context, value) {
  const annotations = await readJson(seoFile(context, "annotations"), []);
  const requestedUrls = value.urls || (value.url ? [value.url] : []);
  const annotation = { schemaVersion, id: value.id || crypto.randomUUID(), projectId: context.id, title: String(value.title || "Recorded change"), type: String(value.type || "site-release"), urls: [...new Set(requestedUrls.map((url) => normalizeProjectUrl(url, context.manifest)))], implementedAt: value.implementedAt || new Date().toISOString(), notes: String(value.notes || ""), opportunityId: value.opportunityId || null };
  const index = annotations.findIndex((item) => item.id === annotation.id);
  if (index >= 0) annotations[index] = annotation; else annotations.push(annotation);
  await writeJson(seoFile(context, "annotations"), annotations);
  return annotation;
}

export async function generateReport(context, { startDate, endDate } = {}) {
  const [observations, runs, opportunities, annotations] = await Promise.all([
    readJson(seoFile(context, "search-observations"), []), readJson(seoFile(context, "crawl-runs"), []),
    readJson(seoFile(context, "opportunities"), []), readJson(seoFile(context, "annotations"), []),
  ]);
  const selected = observations.filter((row) => (!startDate || !row.date || row.date >= startDate) && (!endDate || !row.date || row.date <= endDate));
  const totals = selected.reduce((sum, row) => ({ clicks: sum.clicks + (row.clicks || 0), impressions: sum.impressions + (row.impressions || 0), weightedPosition: sum.weightedPosition + ((row.position || 0) * (row.impressions || 0)) }), { clicks: 0, impressions: 0, weightedPosition: 0 });
  const report = { schemaVersion, id: crypto.randomUUID(), projectId: context.id, projectName: context.manifest.name, generatedAt: new Date().toISOString(), period: { startDate: startDate || null, endDate: endDate || null }, totals: { clicks: totals.clicks, impressions: totals.impressions, ctr: totals.impressions ? totals.clicks / totals.impressions : 0, position: totals.impressions ? totals.weightedPosition / totals.impressions : null }, leadingPages: aggregatePages(selected).sort((a, b) => b.clicks - a.clicks).slice(0, 10), technical: { latestRunAt: runs.at(-1)?.completedAt || null, openFindings: (runs.at(-1)?.findings || []).length }, opportunities: { total: opportunities.length, approved: opportunities.filter((item) => item.status === "approved").length, completed: opportunities.filter((item) => item.status === "completed").length }, annotations: annotations.filter((item) => (!startDate || item.implementedAt >= startDate) && (!endDate || item.implementedAt <= `${endDate}T23:59:59.999Z`)), limitations: ["Search performance is observational and does not establish that a recorded change caused movement.", "Search Console exports and API results may not contain every query row."] };
  const reports = await readJson(seoFile(context, "reports"), []);
  reports.push(report);
  await writeJson(seoFile(context, "reports"), reports);
  const exportDirectory = path.join(context.files.seo, "report-exports");
  await mkdir(exportDirectory, { recursive: true });
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${report.projectName} SEO report</title><style>body{font:16px/1.55 system-ui;max-width:980px;margin:48px auto;padding:0 24px;color:#1f1f1f}h1{font-size:42px}table{width:100%;border-collapse:collapse}th,td{text-align:left;border-bottom:1px solid #ccc;padding:10px}small{color:#666}</style></head><body><h1>${report.projectName} SEO report</h1><p>Generated ${report.generatedAt}</p><h2>Visibility</h2><table><tr><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Average position</th></tr><tr><td>${report.totals.clicks}</td><td>${report.totals.impressions}</td><td>${(report.totals.ctr * 100).toFixed(1)}%</td><td>${report.totals.position?.toFixed(1) || "—"}</td></tr></table><h2>Leading pages</h2><table><tr><th>Page</th><th>Clicks</th><th>Impressions</th></tr>${report.leadingPages.map((page) => `<tr><td>${page.page.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</td><td>${page.clicks}</td><td>${page.impressions}</td></tr>`).join("")}</table><h2>Technical and opportunities</h2><p>${report.technical.openFindings} open findings; ${report.opportunities.approved} approved and ${report.opportunities.completed} completed opportunities.</p><h2>Limitations</h2><ul>${report.limitations.map((item) => `<li>${item}</li>`).join("")}</ul></body></html>`;
  const csv = ["page,clicks,impressions,ctr,position", ...report.leadingPages.map((page) => [page.page, page.clicks, page.impressions, page.ctr, page.position ?? ""].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))].join("\n");
  const files = { json: path.join(exportDirectory, `${report.id}.json`), html: path.join(exportDirectory, `${report.id}.html`), csv: path.join(exportDirectory, `${report.id}.csv`) };
  await Promise.all([writeFile(files.json, `${JSON.stringify(report, null, 2)}\n`), writeFile(files.html, html), writeFile(files.csv, `${csv}\n`)]);
  report.exports = files;
  reports[reports.length - 1] = report;
  await writeJson(seoFile(context, "reports"), reports);
  return report;
}

export async function seoState(context) {
  const [observations, imports, crawlRuns, opportunities, annotations, reports, integration] = await Promise.all([
    readJson(seoFile(context, "search-observations"), []), readJson(seoFile(context, "imports"), []),
    readJson(seoFile(context, "crawl-runs"), []), readJson(seoFile(context, "opportunities"), []),
    readJson(seoFile(context, "annotations"), []), readJson(seoFile(context, "reports"), []),
    readJson(seoFile(context, "integration"), { searchConsole: { status: "not-configured", property: null }, ga4: { status: "not-configured", property: null, collectionEnabled: false } }),
  ]);
  return { observations: observations.slice(-100), views: searchViews(observations, context), imports, crawlRuns, opportunities, annotations, reports, integration, summary: { observationCount: observations.length, lastImportAt: imports.at(-1)?.importedAt || null, lastCrawlAt: crawlRuns.at(-1)?.completedAt || null, openOpportunities: opportunities.filter((item) => !["completed", "rejected", "dismissed"].includes(item.status)).length } };
}

export async function saveIntegration(context, value) {
  const current = (await seoState(context)).integration;
  const next = { ...current, ...value, searchConsole: { ...current.searchConsole, ...(value.searchConsole || {}) }, ga4: { ...current.ga4, ...(value.ga4 || {}), collectionEnabled: false } };
  await writeJson(seoFile(context, "integration"), next);
  return next;
}
