import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import test from "node:test";
import { ProjectRegistry, ensureProjectScaffold } from "../cms/projects.mjs";
import { exportProjectBundle, importProjectBundle, inspectProjectBundle } from "../cms/bundles.mjs";
import { parseSearchConsoleCsv, runTechnicalCrawl } from "../cms/seo.mjs";

const luxeId = "e798c1f3-0e31-4965-a529-83d50770286f";

function manifest(projectId, name, canonicalBaseUrl, adapter = "generic-seo-v1") {
  return { schemaVersion: 1, projectId, name, canonicalBaseUrl, publicSiteUrl: canonicalBaseUrl, localSiteUrl: canonicalBaseUrl, adapter, adapterVersion: 1, contentDirectory: ".cms/content", publicMediaDirectory: "public/images/blog", applicationDirectory: "app", metadataFile: "app/metadata-config.ts", sitemapPath: "/sitemap.xml", robotsPath: "/robots.txt", previewPortRange: [3000], developmentCommand: ["npm", "run", "dev"], buildCommand: ["npm", "run", "build"] };
}

async function fixture() {
  const base = await mkdtemp(path.join(os.tmpdir(), "luxe-cms-projects-"));
  const cmsDir = path.join(base, "cms");
  const first = path.join(base, "first");
  await mkdir(cmsDir, { recursive: true }); await mkdir(first, { recursive: true });
  await writeFile(path.join(first, "cms-project.json"), JSON.stringify(manifest(luxeId, "First", "https://first.example")));
  const registry = new ProjectRegistry({ cmsDir, defaultRoot: first, legacySettingsFile: path.join(cmsDir, "settings.json") });
  await registry.bootstrap();
  return { base, cmsDir, first, registry };
}

test("project UUIDs isolate overlapping content and survive reconnect", async (t) => {
  const data = await fixture(); t.after(() => rm(data.base, { recursive: true, force: true }));
  const second = path.join(data.base, "second"); await mkdir(second);
  const secondId = "4ca36e43-6b98-4dc4-bd3f-77e5272d669a";
  await writeFile(path.join(second, "cms-project.json"), JSON.stringify(manifest(secondId, "Second", "https://second.example")));
  await data.registry.add({ root: second });
  const firstContext = await data.registry.context(luxeId);
  const secondContext = await data.registry.context(secondId);
  assert.notEqual(firstContext.files.seo, secondContext.files.seo);
  await ensureProjectScaffold(firstContext); await ensureProjectScaffold(secondContext);
  await writeFile(path.join(firstContext.files.seo, "same-slug.json"), JSON.stringify({ projectId: luxeId, slug: "shared" }));
  await writeFile(path.join(secondContext.files.seo, "same-slug.json"), JSON.stringify({ projectId: secondId, slug: "shared" }));
  assert.notEqual(await readFile(path.join(firstContext.files.seo, "same-slug.json"), "utf8"), await readFile(path.join(secondContext.files.seo, "same-slug.json"), "utf8"));
  await data.registry.activate(luxeId);
  await data.registry.disconnect(secondId);
  await assert.rejects(() => data.registry.context(secondId), /not connected/);
  const moved = path.join(data.base, "second-moved"); await mkdir(moved); await writeFile(path.join(moved, "cms-project.json"), JSON.stringify(manifest(secondId, "Second", "https://second.example")));
  const reconnected = await data.registry.reconnect({ projectId: secondId, root: moved });
  assert.equal(reconnected.id, secondId);
});

test("Search Console CSV records are normalized and project-scoped", async () => {
  const context = { id: luxeId, manifest: manifest(luxeId, "First", "https://first.example") };
  const parsed = parseSearchConsoleCsv("Date,Query,Page,Clicks,Impressions,CTR,Position\n2026-08-01,coffee,https://www.first.example/blog/post?utm_source=x,3,120,2.5%,8.2\n", context);
  assert.equal(parsed.observations[0].projectId, luxeId);
  assert.equal(parsed.observations[0].page, "https://first.example/blog/post");
  assert.equal(parsed.observations[0].ctr, 0.025);
});

test("technical crawler records project evidence without field-CWV guesses", async (t) => {
  const origin = "https://crawl.example";
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (value) => {
    const url = String(value);
    if (url.endsWith("/sitemap.xml")) return new Response(`<urlset><url><loc>${origin}/about</loc></url></urlset>`, { status: 200, headers: { "content-type": "application/xml" } });
    const pathname = new URL(url).pathname;
    return new Response(`<html><head><title>${pathname === "/" ? "Home" : "About"}</title><meta name="description" content="Description"><link rel="canonical" href="${origin}${pathname}"></head><body><h1>Page</h1><a href="/about">About</a></body></html>`, { status: 200, headers: { "content-type": "text/html" } });
  };
  t.after(() => { globalThis.fetch = originalFetch; });
  const root = await mkdtemp(path.join(os.tmpdir(), "luxe-crawl-")); t.after(() => rm(root, { recursive: true, force: true }));
  const context = { id: luxeId, root, manifest: manifest(luxeId, "First", origin), files: { seo: path.join(root, ".cms-local", "seo") } };
  const run = await runTechnicalCrawl(context, { maxPages: 5 });
  assert.equal(run.projectId, luxeId); assert.equal(run.pageCount, 2);
  assert.equal(JSON.stringify(run).includes("coreWebVitals"), false);
});

test("project bundles validate checksums and preserve the immutable UUID", async (t) => {
  const data = await fixture(); t.after(() => rm(data.base, { recursive: true, force: true }));
  const context = await data.registry.context(luxeId); await ensureProjectScaffold(context);
  await mkdir(path.join(data.first, ".cms", "content"), { recursive: true });
  await writeFile(path.join(data.first, ".cms", "content", "record.json"), JSON.stringify({ title: "Preserved" }));
  const exported = await exportProjectBundle(context, { exportDirectory: path.join(data.base, "exports") });
  const bundle = await inspectProjectBundle(exported.file); assert.equal(bundle.projectId, luxeId);
  const restored = path.join(data.base, "restored");
  const result = await importProjectBundle(exported.file, restored);
  assert.equal(result.projectId, luxeId);
  assert.equal(JSON.parse(await readFile(path.join(restored, "cms-project.json"), "utf8")).projectId, luxeId);
});
