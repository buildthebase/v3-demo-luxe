import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import test from "node:test";
import { closeProjectDatabase, openProjectDatabase, storageHealth } from "../cms/storage/database.mjs";
import { importLegacyHelpSessions, loadHelpSessions, saveHelpSessions } from "../cms/storage/repositories/help.mjs";

const projectId = "e798c1f3-0e31-4965-a529-83d50770286f";

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "luxe-cms-storage-"));
  const local = path.join(root, ".cms-local");
  await mkdir(local, { recursive: true });
  const context = { id: projectId, root, files: { database: path.join(local, "cms.sqlite") } };
  const storage = await openProjectDatabase(context);
  return { root, context, storage };
}

function helpSession(overrides = {}) {
  return {
    id: "session-1",
    threadId: "thread-1",
    title: "Preview help",
    articleSlug: "example-article",
    createdAt: "2026-08-01T10:00:00.000Z",
    updatedAt: "2026-08-01T10:05:00.000Z",
    usage: { inputTokens: 100 },
    messages: [
      { role: "user", text: "Why is preview blocked?", createdAt: "2026-08-01T10:00:00.000Z" },
      { role: "assistant", text: "Start the local site.", createdAt: "2026-08-01T10:01:00.000Z" },
    ],
    proposals: [{
      id: "proposal-1", revision: 2, status: "accepted", title: "Start preview safely", summary: "Use the configured development command.",
      articleSlug: "example-article", createdAt: "2026-08-01T10:02:00.000Z", updatedAt: "2026-08-01T10:04:00.000Z",
      operations: [], feedbackHistory: [],
    }],
    ...overrides,
  };
}

test("project SQLite applies migrations and passes integrity checks", async (t) => {
  const data = await fixture();
  t.after(() => { closeProjectDatabase(data.storage); return rm(data.root, { recursive: true, force: true }); });
  const health = storageHealth(data.storage);
  assert.equal(health.status, "healthy");
  assert.equal(health.schemaVersion, 3);
  assert.equal(health.projectId, projectId);
});

test("CMS Help sessions and repair proposals round-trip without changing their public shape", async (t) => {
  const data = await fixture();
  t.after(() => { closeProjectDatabase(data.storage); return rm(data.root, { recursive: true, force: true }); });
  const expected = helpSession();
  saveHelpSessions(data.storage, [expected]);
  assert.deepEqual(loadHelpSessions(data.storage), [expected]);
  const replacement = helpSession({ title: "Updated help", messages: expected.messages.slice(0, 1), proposals: [] });
  saveHelpSessions(data.storage, [replacement]);
  assert.deepEqual(loadHelpSessions(data.storage), [replacement]);
});

test("legacy CMS Help import is idempotent and preserves source provenance", async (t) => {
  const data = await fixture();
  t.after(() => { closeProjectDatabase(data.storage); return rm(data.root, { recursive: true, force: true }); });
  const source = path.join(data.root, "help-sessions.json");
  await writeFile(source, `${JSON.stringify([helpSession()], null, 2)}\n`);
  const first = await importLegacyHelpSessions(data.storage, source);
  const second = await importLegacyHelpSessions(data.storage, source);
  assert.equal(first.imported, true);
  assert.equal(second.imported, false);
  assert.equal(loadHelpSessions(data.storage).length, 1);
  assert.equal(data.storage.database.prepare("SELECT COUNT(*) AS count FROM storage_imports WHERE project_id = ?").get(projectId).count, 1);
});

test("a failed help write rolls back instead of deleting existing history", async (t) => {
  const data = await fixture();
  t.after(() => { closeProjectDatabase(data.storage); return rm(data.root, { recursive: true, force: true }); });
  const expected = helpSession();
  saveHelpSessions(data.storage, [expected]);
  assert.throws(() => saveHelpSessions(data.storage, [{ ...expected, proposals: [expected.proposals[0], expected.proposals[0]] }]), /UNIQUE/);
  assert.deepEqual(loadHelpSessions(data.storage), [expected]);
});
