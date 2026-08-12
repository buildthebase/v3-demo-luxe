import crypto from "node:crypto";
import path from "node:path";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".cms-migration", "luxe-integrity.json");
const included = ["content/blog", "public/images/blog", "cms/settings.json", "cms-project.json"];

async function filesAt(target, results = []) {
  const info = await stat(target).catch(() => null);
  if (!info) return results;
  if (info.isFile()) { results.push(target); return results; }
  for (const entry of await readdir(target, { withFileTypes: true })) {
    await filesAt(path.join(target, entry.name), results);
  }
  return results;
}

const files = (await Promise.all(included.map((entry) => filesAt(path.join(root, entry))))).flat().sort();
const records = [];
for (const file of files) {
  const bytes = await readFile(file);
  records.push({ path: path.relative(root, file), bytes: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex") });
}
const snapshot = { schemaVersion: 1, projectId: "e798c1f3-0e31-4965-a529-83d50770286f", generatedAt: new Date().toISOString(), fileCount: records.length, totalBytes: records.reduce((sum, record) => sum + record.bytes, 0), records };
if (process.argv.includes("--verify")) {
  const baseline = JSON.parse(await readFile(output, "utf8"));
  const prior = new Map(baseline.records.map((record) => [record.path, record]));
  const current = new Map(records.map((record) => [record.path, record]));
  const added = records.filter((record) => !prior.has(record.path));
  const removed = baseline.records.filter((record) => !current.has(record.path));
  const changed = records.filter((record) => prior.has(record.path) && prior.get(record.path).sha256 !== record.sha256);
  if (added.length || removed.length || changed.length) {
    process.stderr.write(`${JSON.stringify({ added: added.map((item) => item.path), removed: removed.map((item) => item.path), changed: changed.map((item) => item.path) }, null, 2)}\n`);
    process.exitCode = 1;
  } else process.stdout.write(`CMS integrity verified: ${snapshot.fileCount} files and ${snapshot.totalBytes} bytes unchanged\n`);
} else {
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, { mode: 0o600 });
  process.stdout.write(`CMS integrity snapshot: ${snapshot.fileCount} files, ${snapshot.totalBytes} bytes\n`);
}
