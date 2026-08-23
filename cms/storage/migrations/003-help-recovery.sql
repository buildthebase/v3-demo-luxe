CREATE TABLE IF NOT EXISTS help_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  thread_id TEXT,
  title TEXT NOT NULL,
  article_slug TEXT,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_help_sessions_project_updated
ON help_sessions(project_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS help_messages (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  session_id TEXT NOT NULL REFERENCES help_sessions(id) ON DELETE CASCADE,
  ordinal INTEGER NOT NULL CHECK(ordinal >= 0),
  role TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE(session_id, ordinal)
);

CREATE INDEX IF NOT EXISTS idx_help_messages_project_session
ON help_messages(project_id, session_id, ordinal);

CREATE TABLE IF NOT EXISTS repair_proposals (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  session_id TEXT NOT NULL REFERENCES help_sessions(id) ON DELETE CASCADE,
  article_slug TEXT,
  revision INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_repair_proposals_project_status
ON repair_proposals(project_id, status, updated_at DESC);

CREATE TABLE IF NOT EXISTS repair_decisions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  proposal_id TEXT NOT NULL REFERENCES repair_proposals(id) ON DELETE CASCADE,
  decision TEXT NOT NULL,
  feedback TEXT,
  result_json TEXT NOT NULL DEFAULT '{}',
  decided_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_repair_decisions_project_proposal
ON repair_decisions(project_id, proposal_id, decided_at DESC);
