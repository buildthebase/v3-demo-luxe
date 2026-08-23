import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import test from "node:test";
import { ProjectLockManager } from "../cms/project-locks.mjs";

test("CMS instances cannot concurrently own the same project writer lock", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "luxe-cms-lock-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const runtime = path.join(root, ".cms-local", "runtime");
  await mkdir(runtime, { recursive: true });
  const context = { id: "e798c1f3-0e31-4965-a529-83d50770286f", files: { runtime } };
  const first = new ProjectLockManager();
  const second = new ProjectLockManager();
  await first.acquire(context);
  await assert.rejects(() => second.acquire(context), /another live CMS writer/);
  await first.release(context);
  await second.acquire(context);
  await second.release(context);
});
