import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import { inTransaction } from "../database.mjs";

function json(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

function checksum(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function messageId(sessionId, message, ordinal) {
  return checksum(JSON.stringify([sessionId, ordinal, message.role, message.createdAt, message.text])).slice(0, 32);
}

function cleanSessionPayload(session) {
  const { messages: _messages, proposals: _proposals, ...payload } = session;
  return payload;
}

function upsertSession(database, projectId, session) {
  const createdAt = session.createdAt || new Date().toISOString();
  const updatedAt = session.updatedAt || createdAt;
  database.prepare(`
    INSERT INTO help_sessions (id, project_id, thread_id, title, article_slug, payload_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      thread_id = excluded.thread_id,
      title = excluded.title,
      article_slug = excluded.article_slug,
      payload_json = excluded.payload_json,
      created_at = excluded.created_at,
      updated_at = excluded.updated_at
  `).run(session.id, projectId, session.threadId || null, session.title || "CMS Help", session.articleSlug || null, JSON.stringify(cleanSessionPayload(session)), createdAt, updatedAt);

  database.prepare("DELETE FROM help_messages WHERE project_id = ? AND session_id = ?").run(projectId, session.id);
  const insertMessage = database.prepare("INSERT INTO help_messages (id, project_id, session_id, ordinal, role, body, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
  for (const [ordinal, message] of (session.messages || []).entries()) {
    insertMessage.run(message.id || messageId(session.id, message, ordinal), projectId, session.id, ordinal, message.role || "assistant", message.text || "", message.createdAt || updatedAt);
  }

  database.prepare("DELETE FROM repair_proposals WHERE project_id = ? AND session_id = ?").run(projectId, session.id);
  const insertProposal = database.prepare(`
    INSERT INTO repair_proposals (id, project_id, session_id, article_slug, revision, status, title, summary, payload_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const proposal of session.proposals || []) {
    const proposalCreated = proposal.createdAt || updatedAt;
    insertProposal.run(proposal.id, projectId, session.id, proposal.articleSlug || session.articleSlug || null, Number(proposal.revision || 1), proposal.status || "proposed", proposal.title || "Repair proposal", proposal.summary || "", JSON.stringify(proposal), proposalCreated, proposal.updatedAt || proposalCreated);
  }
}

export function saveHelpSessions(storage, sessions) {
  const { database, projectId } = storage;
  inTransaction(database, () => {
    const incomingIds = new Set((sessions || []).map((session) => session.id));
    for (const session of sessions || []) upsertSession(database, projectId, session);
    const existing = database.prepare("SELECT id FROM help_sessions WHERE project_id = ?").all(projectId);
    const remove = database.prepare("DELETE FROM help_sessions WHERE project_id = ? AND id = ?");
    for (const row of existing) if (!incomingIds.has(row.id)) remove.run(projectId, row.id);
  });
}

export function loadHelpSessions(storage) {
  const { database, projectId } = storage;
  const sessions = database.prepare("SELECT * FROM help_sessions WHERE project_id = ? ORDER BY updated_at ASC, id ASC").all(projectId);
  const messages = database.prepare("SELECT * FROM help_messages WHERE project_id = ? ORDER BY session_id, ordinal").all(projectId);
  const proposals = database.prepare("SELECT * FROM repair_proposals WHERE project_id = ? ORDER BY session_id, created_at, id").all(projectId);
  const messagesBySession = Map.groupBy(messages, (message) => message.session_id);
  const proposalsBySession = Map.groupBy(proposals, (proposal) => proposal.session_id);
  return sessions.map((row) => ({
    ...json(row.payload_json, {}),
    id: row.id,
    threadId: row.thread_id || undefined,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(row.article_slug ? { articleSlug: row.article_slug } : {}),
    messages: (messagesBySession.get(row.id) || []).map((message) => ({ role: message.role, text: message.body, createdAt: message.created_at })),
    proposals: (proposalsBySession.get(row.id) || []).map((proposal) => json(proposal.payload_json, {})),
  }));
}

export async function importLegacyHelpSessions(storage, file) {
  const source = await readFile(file, "utf8").catch((error) => error?.code === "ENOENT" ? "[]" : Promise.reject(error));
  const sessions = json(source, null);
  if (!Array.isArray(sessions)) throw new Error("Legacy CMS Help history is not a valid array.");
  const sourceSha256 = checksum(source);
  const existing = storage.database.prepare("SELECT id FROM storage_imports WHERE project_id = ? AND source_kind = ? AND source_sha256 = ?")
    .get(storage.projectId, "help-sessions-json", sourceSha256);
  if (existing) return { imported: false, reason: "already-imported", recordCount: sessions.length, sourceSha256 };
  inTransaction(storage.database, () => {
    for (const session of sessions) upsertSession(storage.database, storage.projectId, session);
    storage.database.prepare("INSERT INTO storage_imports (id, project_id, source_kind, source_path, source_sha256, record_count, imported_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(crypto.randomUUID(), storage.projectId, "help-sessions-json", file, sourceSha256, sessions.length, new Date().toISOString());
  });
  return { imported: true, recordCount: sessions.length, sourceSha256 };
}
