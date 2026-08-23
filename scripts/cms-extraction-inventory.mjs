import crypto from "node:crypto";
import path from "node:path";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".cms-migration", "extraction-baseline.json");
const included = [
  "cms-project.json",
  "content/blog",
  "public/images/blog",
  ".cms-local",
  "cms/settings.json",
  "cms/.local/projects.json",
  "cms/.local/settings.json",
];

async function filesAt(target, records = []) {
  const info = await stat(target).catch(() => null);
  if (!info) return records;
  if (info.isFile()) { records.push(target); return records; }
  for (const entry of await readdir(target, { withFileTypes: true })) await filesAt(path.join(target, entry.name), records);
  return records;
}

const files = (await Promise.all(included.map((entry) => filesAt(path.join(root, entry))))).flat().sort();
const records = [];
for (const file of files) {
  const bytes = await readFile(file);
  records.push({ path: path.relative(root, file), bytes: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex") });
}

const manifest = JSON.parse(await readFile(path.join(root, "cms-project.json"), "utf8"));
const collectionFiles = {
  published: "content/blog/published/articles.json",
  drafts: "content/blog/drafts/articles.json",
  archived: "content/blog/archived/articles.json",
  trash: "content/blog/.trash/articles.json",
};
const articles = {};
for (const [status, relative] of Object.entries(collectionFiles)) {
  const values = JSON.parse(await readFile(path.join(root, relative), "utf8"));
  articles[status] = values.map((article) => ({ slug: article.slug, title: article.title, publishDate: article.publishDate, modifiedDate: article.modifiedDate }));
}

const snapshot = {
  schemaVersion: 1,
  projectId: manifest.projectId,
  generatedAt: new Date().toISOString(),
  included,
  fileCount: records.length,
  totalBytes: records.reduce((sum, record) => sum + record.bytes, 0),
  aggregateSha256: crypto.createHash("sha256").update(records.map((record) => `${record.path}:${record.sha256}`).join("\n")).digest("hex"),
  articleCounts: Object.fromEntries(Object.entries(articles).map(([status, values]) => [status, values.length])),
  articles,
  records,
};

if (process.argv.includes("--verify")) {
  const baseline = JSON.parse(await readFile(output, "utf8"));
  if (baseline.aggregateSha256 !== snapshot.aggregateSha256) {
    const prior = new Map(baseline.records.map((record) => [record.path, record.sha256]));
    const current = new Map(records.map((record) => [record.path, record.sha256]));
    const changes = {
      added: [...current.keys()].filter((item) => !prior.has(item)),
      removed: [...prior.keys()].filter((item) => !current.has(item)),
      changed: [...current.keys()].filter((item) => prior.has(item) && prior.get(item) !== current.get(item)),
    };
    process.stderr.write(`${JSON.stringify(changes, null, 2)}\n`);
    process.exit(1);
  }
  process.stdout.write(`Extraction baseline verified: ${snapshot.fileCount} files unchanged.\n`);
} else {
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, { mode: 0o600 });
  process.stdout.write(`Extraction baseline recorded: ${snapshot.fileCount} files, ${snapshot.totalBytes} bytes, ${snapshot.aggregateSha256}.\n`);
}
