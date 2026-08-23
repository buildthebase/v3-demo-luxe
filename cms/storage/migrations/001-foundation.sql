CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  summary TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_events_project_created
ON audit_events(project_id, created_at DESC);

CREATE TABLE IF NOT EXISTS operation_runs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  operation_type TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  details_json TEXT NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_operation_runs_project_status
ON operation_runs(project_id, status, started_at DESC);

CREATE TABLE IF NOT EXISTS sync_runs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  provenance_json TEXT NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_sync_runs_project_source
ON sync_runs(project_id, source, started_at DESC);

CREATE TABLE IF NOT EXISTS revision_snapshots (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  file_path TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK(byte_size >= 0),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_revision_snapshots_project_entity
ON revision_snapshots(project_id, entity_type, entity_id, created_at DESC);

CREATE TABLE IF NOT EXISTS storage_imports (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source_kind TEXT NOT NULL,
  source_path TEXT,
  source_sha256 TEXT NOT NULL,
  record_count INTEGER NOT NULL CHECK(record_count >= 0),
  imported_at TEXT NOT NULL,
  UNIQUE(project_id, source_kind, source_sha256)
);

CREATE INDEX IF NOT EXISTS idx_storage_imports_project_kind
ON storage_imports(project_id, source_kind, imported_at DESC);

CREATE TABLE IF NOT EXISTS backup_records (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  file_path TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK(byte_size >= 0),
  schema_version INTEGER NOT NULL,
  integrity_status TEXT NOT NULL,
  pinned INTEGER NOT NULL DEFAULT 0 CHECK(pinned IN (0, 1)),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_backup_records_project_created
ON backup_records(project_id, created_at DESC);
