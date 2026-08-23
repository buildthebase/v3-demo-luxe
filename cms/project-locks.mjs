import crypto from "node:crypto";
import path from "node:path";
import { mkdir, open, readFile, unlink } from "node:fs/promises";

function processIsAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try { process.kill(pid, 0); return true; }
  catch (error) { return error?.code === "EPERM"; }
}

export class ProjectLockManager {
  constructor() {
    this.instanceId = crypto.randomUUID();
    this.held = new Map();
  }

  lockFile(context) { return path.join(context.files.runtime, "cms-writer-lock.json"); }

  async status(context) {
    const value = await readFile(this.lockFile(context), "utf8").then(JSON.parse).catch((error) => error?.code === "ENOENT" ? null : Promise.reject(error));
    if (!value) return { writable: true, owner: null };
    const ours = value.instanceId === this.instanceId && value.pid === process.pid;
    const stale = !ours && !processIsAlive(Number(value.pid));
    return { writable: ours || stale, ours, stale, owner: value };
  }

  async acquire(context) {
    if (this.held.has(context.id)) return this.held.get(context.id);
    const file = this.lockFile(context);
    await mkdir(path.dirname(file), { recursive: true });
    const record = { schemaVersion: 1, projectId: context.id, pid: process.pid, instanceId: this.instanceId, startedAt: new Date().toISOString() };
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const handle = await open(file, "wx", 0o600);
        await handle.writeFile(`${JSON.stringify(record, null, 2)}\n`);
        await handle.close();
        this.held.set(context.id, record);
        return record;
      } catch (error) {
        if (error?.code !== "EEXIST") throw error;
        const status = await this.status(context);
        if (!status.stale) throw Object.assign(new Error("This project is currently owned by another live CMS writer. It remains available read-only."), { status: 423, details: status.owner });
        await unlink(file).catch((unlinkError) => { if (unlinkError?.code !== "ENOENT") throw unlinkError; });
      }
    }
    throw Object.assign(new Error("The project writer lock could not be acquired safely."), { status: 423 });
  }

  async release(context) {
    if (!this.held.has(context.id)) return;
    const current = await readFile(this.lockFile(context), "utf8").then(JSON.parse).catch(() => null);
    if (current?.instanceId === this.instanceId && current?.pid === process.pid) await unlink(this.lockFile(context)).catch(() => null);
    this.held.delete(context.id);
  }

  async releaseAll(contexts) { await Promise.all(contexts.map((context) => this.release(context))); }
}
