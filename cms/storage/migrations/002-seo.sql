CREATE TABLE IF NOT EXISTS seo_search_observations (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source TEXT NOT NULL,
  observation_date TEXT,
  query TEXT,
  page_url TEXT NOT NULL,
  device TEXT,
  country TEXT,
  search_type TEXT NOT NULL DEFAULT 'web',
  clicks REAL NOT NULL DEFAULT 0,
  impressions REAL NOT NULL DEFAULT 0,
  ctr REAL NOT NULL DEFAULT 0,
  position REAL,
  provenance_json TEXT NOT NULL DEFAULT '{}',
  imported_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_seo_observations_project_identity
ON seo_search_observations(project_id, source, observation_date, query, page_url, device, country, search_type);

CREATE INDEX IF NOT EXISTS idx_seo_observations_project_date
ON seo_search_observations(project_id, observation_date DESC);

CREATE INDEX IF NOT EXISTS idx_seo_observations_project_page
ON seo_search_observations(project_id, page_url, observation_date DESC);

CREATE TABLE IF NOT EXISTS seo_crawl_runs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  base_url TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  page_count INTEGER NOT NULL DEFAULT 0,
  finding_count INTEGER NOT NULL DEFAULT 0,
  limitations_json TEXT NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_seo_crawl_runs_project_completed
ON seo_crawl_runs(project_id, completed_at DESC);

CREATE TABLE IF NOT EXISTS seo_crawl_pages (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  crawl_run_id TEXT NOT NULL REFERENCES seo_crawl_runs(id) ON DELETE CASCADE,
  requested_url TEXT NOT NULL,
  final_url TEXT,
  status_code INTEGER,
  title TEXT,
  canonical_url TEXT,
  payload_json TEXT NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_seo_crawl_pages_run
ON seo_crawl_pages(project_id, crawl_run_id);

CREATE TABLE IF NOT EXISTS seo_findings (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  crawl_run_id TEXT REFERENCES seo_crawl_runs(id) ON DELETE SET NULL,
  rule_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  evidence TEXT NOT NULL,
  resolution TEXT NOT NULL,
  verification_method TEXT NOT NULL,
  first_detected_at TEXT NOT NULL,
  last_detected_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_seo_findings_project_status
ON seo_findings(project_id, status, severity, last_detected_at DESC);

CREATE TABLE IF NOT EXISTS seo_opportunities (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  opportunity_type TEXT NOT NULL,
  status TEXT NOT NULL,
  affected_url TEXT,
  evidence_source TEXT NOT NULL,
  observation TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  confidence TEXT NOT NULL,
  proposed_action TEXT NOT NULL,
  metric_to_monitor TEXT,
  limitations_json TEXT NOT NULL DEFAULT '[]',
  payload_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_seo_opportunities_project_status
ON seo_opportunities(project_id, status, updated_at DESC);

CREATE TABLE IF NOT EXISTS seo_annotations (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  opportunity_id TEXT REFERENCES seo_opportunities(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  affected_url TEXT,
  implemented_at TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_seo_annotations_project_date
ON seo_annotations(project_id, implemented_at DESC);

CREATE TABLE IF NOT EXISTS seo_reports (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  period_start TEXT,
  period_end TEXT,
  payload_json TEXT NOT NULL,
  generated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_seo_reports_project_generated
ON seo_reports(project_id, generated_at DESC);
