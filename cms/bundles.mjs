import crypto from "node:crypto";
import path from "node:path";
import { copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";

const BUNDLE_SCHEMA = 1;

async function walk(root, directory, { includeOriginals }, output = []) {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => error?.code === "ENOENT" ? [] : Promise.reject(error));
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    if (entry.isDirectory()) {
      if (["node_modules", ".git", ".next", ".vinext", "dist", ".wrangler", "runtime", "exports"].includes(entry.name)) continue;
      if (!includeOriginals && /(^|\/)media\/originals$/.test(relative)) continue;
      await walk(root, absolute, { includeOriginals }, output);
    } else output.push({ absolute, relative });
  }
  return output;
}

function checksum(buffer) { return crypto.createHash("sha256").update(buffer).digest("hex"); }

function safeTarget(root, relative) {
  const target = path.resolve(root, relative);
  const resolvedRoot = path.resolve(root);
  if (target !== resolvedRoot && !target.startsWith(`${resolvedRoot}${path.sep}`)) throw Object.assign(new Error("Bundle entry escapes the destination project root."), { status: 422 });
  return target;
}

export async function exportProjectBundle(context, { includeOriginals = false, exportDirectory } = {}) {
  const roots = [
    context.files.manifest,
    path.join(context.root, context.manifest.contentDirectory),
    path.join(context.root, context.manifest.publicMediaDirectory),
    context.files.seo,
    context.files.settings,
  ];
  const files = [];
  for (const source of roots) {
    const info = await stat(source).catch(() => null);
    if (!info) continue;
    if (info.isDirectory()) await walk(context.root, source, { includeOriginals }, files);
    else files.push({ absolute: source, relative: path.relative(context.root, source).split(path.sep).join("/") });
  }
  const unique = [...new Map(files.map((file) => [file.relative, file])).values()].sort((a, b) => a.relative.localeCompare(b.relative));
  const entries = [];
  for (const file of unique) {
    const data = await readFile(file.absolute);
    entries.push({ path: file.relative, size: data.length, sha256: checksum(data), encoding: "base64", data: data.toString("base64") });
  }
  const bundle = {
    schemaVersion: BUNDLE_SCHEMA,
    exportedAt: new Date().toISOString(),
    projectId: context.id,
    manifest: context.manifest,
    includeOriginals,
    credentialsIncluded: false,
    entries,
    checksum: checksum(Buffer.from(entries.map((entry) => `${entry.path}:${entry.sha256}`).join("\n"))),
  };
  const destination = exportDirectory || path.join(context.root, ".cms-local", "exports");
  await mkdir(destination, { recursive: true });
  const stamp = bundle.exportedAt.replaceAll(":", "-");
  const file = path.join(destination, `${context.manifest.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${stamp}.cms-bundle.json`);
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(bundle)}\n`, { mode: 0o600 });
  await rename(temporary, file);
  return { file, projectId: context.id, entries: entries.length, bytes: entries.reduce((sum, entry) => sum + entry.size, 0), checksum: bundle.checksum, includeOriginals };
}

export async function inspectProjectBundle(file) {
  const bundle = JSON.parse(await readFile(path.resolve(String(file || "")), "utf8"));
  if (bundle.schemaVersion !== BUNDLE_SCHEMA || !bundle.projectId || !Array.isArray(bundle.entries)) throw Object.assign(new Error("Unsupported or malformed CMS project bundle."), { status: 422 });
  const paths = new Set();
  for (const entry of bundle.entries) {
    if (!entry.path || paths.has(entry.path)) throw Object.assign(new Error("Bundle contains a missing or duplicate path."), { status: 422 });
    paths.add(entry.path);
    const data = Buffer.from(entry.data || "", "base64");
    if (data.length !== entry.size || checksum(data) !== entry.sha256) throw Object.assign(new Error(`Bundle checksum failed for ${entry.path}.`), { status: 422 });
  }
  const aggregate = checksum(Buffer.from(bundle.entries.map((entry) => `${entry.path}:${entry.sha256}`).join("\n")));
  if (aggregate !== bundle.checksum) throw Object.assign(new Error("Bundle aggregate checksum failed."), { status: 422 });
  return bundle;
}

export async function importProjectBundle(file, targetRoot, { clone = false } = {}) {
  const bundle = await inspectProjectBundle(file);
  const root = path.resolve(String(targetRoot || ""));
  const manifestEntry = bundle.entries.find((entry) => entry.path === "cms-project.json");
  if (!manifestEntry) throw Object.assign(new Error("Bundle is missing its project manifest."), { status: 422 });
  const manifest = JSON.parse(Buffer.from(manifestEntry.data, "base64").toString("utf8"));
  if (manifest.projectId !== bundle.projectId) throw Object.assign(new Error("Bundle project UUID does not match its manifest."), { status: 409 });
  if (clone) {
    manifest.projectId = crypto.randomUUID();
    const data = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
    manifestEntry.data = data.toString("base64"); manifestEntry.size = data.length; manifestEntry.sha256 = checksum(data);
  }
  await mkdir(root, { recursive: true });
  const existingManifest = await readFile(path.join(root, "cms-project.json"), "utf8").then(JSON.parse).catch((error) => error?.code === "ENOENT" ? null : Promise.reject(error));
  if (existingManifest && existingManifest.projectId !== manifest.projectId) throw Object.assign(new Error("The destination belongs to a different CMS project UUID."), { status: 409 });
  const staging = path.join(root, `.cms-import-${crypto.randomUUID()}`);
  const importId = crypto.randomUUID();
  const backupRoot = path.join(root, ".cms-local", "import-backups", importId);
  await mkdir(staging, { recursive: true });
  for (const entry of bundle.entries) {
    const destination = safeTarget(staging, entry.path);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(entry.data, "base64"));
  }
  // Import is additive and refuses identity conflicts. Existing project files are
  // deliberately not erased; each staged file is atomically replaced.
  for (const entry of bundle.entries) {
    const staged = safeTarget(staging, entry.path);
    const destination = safeTarget(root, entry.path);
    await mkdir(path.dirname(destination), { recursive: true });
    if (await stat(destination).catch(() => null)) {
      const backup = safeTarget(backupRoot, entry.path);
      await mkdir(path.dirname(backup), { recursive: true });
      await copyFile(destination, backup);
    }
    await rename(staged, destination);
  }
  const result = { importId, importedAt: new Date().toISOString(), projectId: manifest.projectId, originalProjectId: bundle.projectId, cloned: clone, root, entries: bundle.entries.length, backupRoot };
  await mkdir(path.join(root, ".cms-local", "import-logs"), { recursive: true });
  await writeFile(path.join(root, ".cms-local", "import-logs", `${importId}.json`), `${JSON.stringify(result, null, 2)}\n`, { mode: 0o600 });
  return result;
}
