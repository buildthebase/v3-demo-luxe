import crypto from "node:crypto";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { mkdir, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const MIGRATIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "migrations");

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function assertProjectId(value) {
  const projectId = String(value || "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(projectId)) {
    throw Object.assign(new Error("A valid CMS project UUID is required for local storage."), { status: 422 });
  }
  return projectId;
}

export function inTransaction(database, callback) {
  database.exec("BEGIN IMMEDIATE");
  try {
    const result = callback();
    database.exec("COMMIT");
    return result;
  } catch (error) {
    try { database.exec("ROLLBACK"); } catch {}
    throw error;
  }
}

async function migrationFiles() {
  return (await readdir(MIGRATIONS_DIR))
    .filter((name) => /^\d{3}[-_].+\.sql$/.test(name))
    .sort();
}

async function applyMigrations(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      sha256 TEXT NOT NULL,
      applied_at TEXT NOT NULL
    )
  `);
  const applied = new Map(database.prepare("SELECT version, sha256 FROM schema_migrations").all().map((row) => [Number(row.version), row.sha256]));
  for (const name of await migrationFiles()) {
    const version = Number(name.slice(0, 3));
    const sql = await readFile(path.join(MIGRATIONS_DIR, name), "utf8");
    const checksum = sha256(sql);
    if (applied.has(version)) {
      if (applied.get(version) !== checksum) throw new Error(`Applied CMS migration ${name} no longer matches its recorded checksum.`);
      continue;
    }
    inTransaction(database, () => {
      database.exec(sql);
      database.prepare("INSERT INTO schema_migrations (version, name, sha256, applied_at) VALUES (?, ?, ?, ?)")
        .run(version, name, checksum, new Date().toISOString());
    });
  }
  database.exec("PRAGMA optimize");
}

export async function openProjectDatabase(context) {
  const projectId = assertProjectId(context?.id);
  const file = path.resolve(String(context?.files?.database || ""));
  const localRoot = path.resolve(context?.root || ".", ".cms-local");
  if (file !== localRoot && !file.startsWith(`${localRoot}${path.sep}`)) {
    throw Object.assign(new Error("CMS database must remain inside the active project's local storage directory."), { status: 403 });
  }
  await mkdir(path.dirname(file), { recursive: true });
  const database = new DatabaseSync(file, { timeout: 5000 });
  database.exec("PRAGMA foreign_keys = ON");
  database.exec("PRAGMA journal_mode = WAL");
  database.exec("PRAGMA synchronous = FULL");
  database.exec("PRAGMA busy_timeout = 5000");
  await applyMigrations(database);
  return { database, file, projectId };
}

export function storageHealth(storage) {
  const quickCheck = storage.database.prepare("PRAGMA quick_check").all().map((row) => Object.values(row)[0]);
  const foreignKeyIssues = storage.database.prepare("PRAGMA foreign_key_check").all();
  const schemaVersion = Number(storage.database.prepare("SELECT COALESCE(MAX(version), 0) AS version FROM schema_migrations").get().version);
  return {
    status: quickCheck.length === 1 && quickCheck[0] === "ok" && foreignKeyIssues.length === 0 ? "healthy" : "error",
    projectId: storage.projectId,
    schemaVersion,
    quickCheck,
    foreignKeyIssueCount: foreignKeyIssues.length,
  };
}

export function closeProjectDatabase(storage) {
  storage?.database?.close();
}
