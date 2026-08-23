const workspace = document.querySelector("#workspace");
const toast = document.querySelector("#toast");
let token = "";
let state = null;
let selectedSlug = null;
let mediaTargetSlug = null;
let mediaLibraryPage = 1;
let mediaLibrarySearch = "";
let mediaSearchTimer = null;
let knowledgeSearch = "";
let knowledgeUsageFilter = "all";
let knowledgeSearchTimer = null;
let activeView = "articles";
let statusFilter = "all";
let articleSearchQuery = "";
let selectedArticleSlugs = new Set();
let activeJobId = null;
let studioBusy = false;
let studioBusyStartedAt = 0;
let studioBusyTimer = null;
let activeRequestId = null;
let activeRequestProjectId = null;
let selectedCalendarId = null;
let calendarMonth = new Date().toISOString().slice(0, 7);
let calendarMode = "month";
let helpSessionId = null;
let helpSeed = "";
let studioSeed = null;
let helpContextView = "articles";
let serverFeaturesReady = true;
let helpDrawerOpen = false;
let registry = null;
let activeProjectId = null;

const fallbackCalendarConfig = {
  cadencePerMonth: 2,
  preferredWeekdays: ["Tuesday", "Thursday"],
  planningLeadDays: 21,
  defaultCategory: "Event Planning",
  statuses: ["idea", "planned", "brief", "draft", "review", "scheduled", "published", "paused"],
  categoryTargets: {},
  blackoutDates: [],
  campaignPeriods: [],
};

const studioActions = new Set(["preview", "studio-brief", "approve-brief", "studio-outline", "approve-outline", "studio-draft", "help-ask", "help-ask-drawer", "help-repair", "help-repair-feedback", "help-repair-accept", "calendar-propose", "seo-google-sync", "seo-crawl", "seo-opportunities", "seo-report"]);
const cancellableActions = new Set(["help-ask", "help-ask-drawer", "help-repair", "help-repair-feedback"]);
const studioActivity = {
  "preview": ["Exact preview", "Preparing the Luxe article template", "Starting the local site renderer when needed, then opening this draft in its real published layout."],
  "studio-brief": ["Grounding", "Building the grounded brief", "Reviewing approved knowledge, voice rules, source evidence, and proposed links."],
  "approve-brief": ["Checkpoint", "Approving the brief", "Saving your approval before the outline can begin."],
  "studio-outline": ["Structuring", "Developing the article outline", "Turning the approved brief into a clear search-focused editorial structure."],
  "approve-outline": ["Checkpoint", "Approving the outline", "Saving the approved structure before drafting begins."],
  "studio-draft": ["Drafting", "Writing the grounded article draft", "Creating the article, metadata, summary blocks, links, and claim provenance."],
  "help-ask": ["CMS Help", "Finding a precise answer", "Reviewing the current screen, article state, validation issues, and local CMS rules."],
  "help-ask-drawer": ["CMS Help", "Finding a precise answer", "Reviewing the screen you are working on without taking you away from it."],
  "help-repair": ["Repair proposal", "Preparing a safe fix for review", "Building an exact, reversible proposal. No changes are being applied; this attempt stops automatically within 55 seconds."],
  "help-repair-feedback": ["Repair proposal", "Revising the proposed fix", "Applying your feedback to a new proposal revision. Your files remain unchanged; this attempt stops automatically within 55 seconds."],
  "help-repair-accept": ["Approved repair", "Applying and validating your change", "The CMS is creating a recoverable revision and checking the accepted fix."],
  "calendar-propose": ["Calendar planning", "Building an editorial proposal", "Checking existing articles, approved knowledge, cadence, blackout dates, and content balance."],
  "seo-google-sync": ["Search Console", "Importing current search evidence", "Reading the selected property and storing normalized observations inside this project only."],
  "seo-crawl": ["Technical audit", "Crawling this project", "Checking same-origin public routes, metadata, indexability, links, images, and schema expectations."],
  "seo-opportunities": ["SEO opportunities", "Evaluating the evidence", "Creating deterministic opportunities from this project's measurements and technical findings."],
  "seo-report": ["SEO report", "Preparing the project report", "Summarizing measurements, completed changes, findings, priorities, and data limitations."],
};

const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const formatDate = (value) => value ? new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value)) : "—";

function showToast(message, error = false) {
  toast.textContent = message;
  toast.className = `show${error ? " error" : ""}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = ""; }, 3800);
}

function formatElapsed(milliseconds) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function startStudioActivity(action) {
  const [eyebrow, title, detail] = studioActivity[action];
  const activity = document.querySelector("#studio-activity");
  studioBusy = true;
  document.querySelector("#project-task-state").textContent = `Task · ${state?.project?.manifest?.name || "project"}`;
  studioBusyStartedAt = Date.now();
  document.body.classList.add("studio-is-busy");
  workspace.setAttribute("aria-busy", "true");
  document.querySelectorAll("[data-action]").forEach((button) => {
    if (studioActions.has(button.dataset.action)) button.disabled = true;
  });
  document.querySelector("#studio-activity-eyebrow").textContent = eyebrow;
  document.querySelector("#studio-activity-title").textContent = title;
  document.querySelector("#studio-activity-detail").textContent = detail;
  document.querySelector("#studio-activity-time").textContent = "0:00";
  document.querySelector("#studio-activity-cancel").disabled = false;
  document.querySelector("#studio-activity-cancel").textContent = "Cancel";
  document.querySelector("#studio-activity-cancel").hidden = !cancellableActions.has(action);
  activity.hidden = false;
  clearInterval(studioBusyTimer);
  studioBusyTimer = setInterval(() => {
    document.querySelector("#studio-activity-time").textContent = formatElapsed(Date.now() - studioBusyStartedAt);
  }, 1000);
}

function stopStudioActivity() {
  clearInterval(studioBusyTimer);
  studioBusyTimer = null;
  studioBusy = false;
  document.querySelector("#project-task-state").textContent = "Idle";
  document.body.classList.remove("studio-is-busy");
  workspace.setAttribute("aria-busy", "false");
  document.querySelectorAll("[data-action]").forEach((button) => {
    if (studioActions.has(button.dataset.action)) button.disabled = false;
  });
  document.querySelector("#studio-activity").hidden = true;
}

async function runStudioAction(action, task) {
  if (studioBusy) {
    showToast("Article Studio is already working on the current step.");
    return;
  }
  activeRequestId = crypto.randomUUID();
  activeRequestProjectId = activeProjectId;
  startStudioActivity(action);
  const minimumVisibleTime = new Promise((resolve) => setTimeout(resolve, 500));
  try {
    const result = await task(activeRequestId);
    await minimumVisibleTime;
    return result;
  } finally {
    stopStudioActivity();
    activeRequestId = null;
    activeRequestProjectId = null;
  }
}

function scopedApiPath(path) {
  if (!activeProjectId || !path.startsWith("/api/") || path.startsWith("/api/projects") || path === "/api/session" || path.startsWith("/api/google/")) return path;
  return `/api/projects/${encodeURIComponent(activeProjectId)}${path.slice(4)}`;
}

async function api(path, options = {}, { global = false } = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof ArrayBuffer)) headers["content-type"] = "application/json";
  if (options.method && options.method !== "GET") headers["x-cms-token"] = token;
  const response = await fetch(global ? path : scopedApiPath(path), { ...options, headers });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || `Request failed (${response.status})`);
    error.details = result.details;
    throw error;
  }
  return result;
}

async function refresh() {
  const next = await api("/api/state");
  serverFeaturesReady = Array.isArray(next.calendar) && Array.isArray(next.helpSessions) && next.calendarConfig;
  state = {
    ...next,
    calendar: Array.isArray(next.calendar) ? next.calendar : [],
    calendarConfig: next.calendarConfig || fallbackCalendarConfig,
    calendarProposals: Array.isArray(next.calendarProposals) ? next.calendarProposals : [],
    helpSessions: Array.isArray(next.helpSessions) ? next.helpSessions : [],
  };
  activeProjectId = next.project.id;
  updateProjectChrome();
}

function activeProject() {
  return registry?.projects?.find((project) => project.projectId === activeProjectId) || null;
}

function updateProjectChrome() {
  const project = activeProject();
  const manifest = state?.project?.manifest || project?.manifest;
  const name = manifest?.name || "Local CMS";
  const domain = manifest?.canonicalBaseUrl ? new URL(manifest.canonicalBaseUrl).hostname : "No canonical domain";
  document.querySelector("#cms-project-name").textContent = name;
  document.querySelector("#cms-project-domain").textContent = `${domain} · ${state?.project?.adapter?.label || project?.adapter?.label || "Disconnected"}`;
  const select = document.querySelector("#project-switcher");
  if (select && registry) {
    select.innerHTML = registry.projects.map((entry) => `<option value="${escapeHtml(entry.projectId)}"${entry.projectId === activeProjectId ? " selected" : ""}>${escapeHtml(entry.manifest?.name || entry.projectId)}${entry.connectionStatus === "connected" ? "" : " · disconnected"}</option>`).join("");
  }
  const capabilities = new Set(state?.project?.adapter?.capabilities || []);
  const viewCapabilities = { articles: "articles", editor: "articles", links: "articles", media: "media", knowledge: "knowledge", voice: "voice", studio: "studio", calendar: "calendar" };
  document.querySelectorAll("[data-view]").forEach((button) => {
    const capability = viewCapabilities[button.dataset.view];
    button.hidden = Boolean(capability && !capabilities.has(capability));
  });
}

function resetProjectUiState() {
  selectedSlug = null;
  mediaTargetSlug = null;
  activeJobId = null;
  selectedCalendarId = null;
  helpSessionId = null;
  mediaLibraryPage = 1;
  statusFilter = "all";
  articleSearchQuery = "";
  selectedArticleSlugs.clear();
}

async function switchProject(projectId) {
  if (!projectId || projectId === activeProjectId) return;
  await api("/api/projects/activate", { method: "POST", body: JSON.stringify({ projectId }) }, { global: true });
  activeProjectId = projectId;
  registry = await api("/api/projects", {}, { global: true });
  resetProjectUiState();
  await refresh();
  selectedSlug = state.drafts[0]?.slug || state.published[0]?.slug || null;
  const supported = state.project.adapter.capabilities.includes("articles");
  setView(supported ? "articles" : "seo");
  showToast(`Switched to ${state.project.manifest.name}.`);
}

function restartNotice() {
  return serverFeaturesReady ? "" : `<div class="restart-notice" role="alert"><strong>Restart required</strong><p>The CMS interface has updated, but the local server is still running its earlier version. In the terminal running the CMS, press <kbd>Control</kbd> + <kbd>C</kbd>, then run <code>npm run cms</code>. Refresh this page once the server restarts.</p></div>`;
}

function requireCurrentServer() {
  if (!serverFeaturesReady) throw new Error("Restart the CMS server to activate Content Calendar and CMS Help.");
}

function allArticles() {
  return [...state.published, ...state.drafts, ...state.archived, ...state.trash];
}

function selectedArticle() {
  return allArticles().find((article) => article.slug === selectedSlug) || null;
}

function mediaArticles() {
  return [...state.drafts, ...state.published, ...state.archived];
}

function selectedMediaArticle() {
  return mediaArticles().find((article) => article.slug === mediaTargetSlug) || null;
}

function mediaArticleOptions() {
  const groups = [
    ["Drafts", state.drafts],
    ["Published", state.published],
    ["Archived", state.archived],
  ];
  return groups.filter(([, articles]) => articles.length).map(([label, articles]) => `<optgroup label="${label}">${articles.map((article) => `<option value="${escapeHtml(article.slug)}"${article.slug === mediaTargetSlug ? " selected" : ""}>${escapeHtml(article.title)}</option>`).join("")}</optgroup>`).join("");
}

function renderMediaAsset(asset, article) {
  const isHero = article?.heroImage?.id === asset.hero.id;
  const isSocial = article?.socialImage?.id === asset.social.id;
  const assignmentBadges = [isHero ? '<span class="status assigned">Current hero</span>' : "", isSocial ? '<span class="status assigned">Current social</span>' : ""].filter(Boolean).join("");
  return `<article class="media-asset"><div class="media-asset-image"><img class="media-preview" src="${escapeHtml(asset.hero.src)}" alt="${escapeHtml(asset.alt)}">${assignmentBadges ? `<div class="media-asset-badges">${assignmentBadges}</div>` : ""}</div><div class="media-asset-copy"><h3>${escapeHtml(asset.originalFilename)}</h3><p class="subtle">${asset.sourceWidth} × ${asset.sourceHeight} original</p><p class="media-asset-detail">${asset.derivatives.length} responsive WebP sizes · ${asset.social.width} × ${asset.social.height} social crop</p>${asset.alt ? `<p class="media-alt"><strong>Alt:</strong> ${escapeHtml(asset.alt)}</p>` : '<p class="media-alt"><strong>Alt:</strong> Decorative image</p>'}</div>${article ? `<details class="media-card-actions"><summary>Assign to selected article</summary><div class="media-assignment"><div><strong>Article hero</strong><p class="subtle">Visible at the top of the article and exact preview.</p></div><div class="toolbar">${isHero ? `<button class="button" data-use-media="remove-hero" data-media-id="${asset.id}">Remove hero</button>` : `<button class="button" data-use-media="hero" data-media-id="${asset.id}">Use as article hero</button>`}</div></div><div class="media-assignment"><div><strong>Social preview</strong><p class="subtle">Used for social and Open Graph link previews.</p></div><div class="toolbar">${isSocial ? `<button class="button" data-use-media="remove-social" data-media-id="${asset.id}">Remove social</button>` : `<button class="button" data-use-media="social" data-media-id="${asset.id}">Use as social preview</button>`}</div></div></details>` : ""}</article>`;
}

function setView(view) {
  const required = { articles: "articles", editor: "articles", links: "articles", media: "media", knowledge: "knowledge", voice: "voice", studio: "studio", calendar: "calendar" }[view];
  if (required && !state?.project?.adapter?.capabilities?.includes(required)) {
    showToast(`${state.project.adapter.label} does not support this workspace.`, true);
    view = "seo";
  }
  if (view === "help" && activeView !== "help") helpContextView = activeView;
  else if (view !== "help") helpContextView = view;
  activeView = view;
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  render();
  workspace.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function renderHeader(eyebrow, title, actions = "") {
  return `<header class="view-header"><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1></div>${actions ? `<div class="toolbar">${actions}</div>` : ""}</header>`;
}

function issueSummary(slug) {
  const issues = state.issues[slug] || [];
  const errors = issues.filter((entry) => entry.severity === "error").length;
  const warnings = issues.filter((entry) => entry.severity === "warning").length;
  if (errors) return `<span class="issue-count error">${errors} error${errors === 1 ? "" : "s"}</span>`;
  if (warnings) return `<span class="issue-count warning">${warnings} warning${warnings === 1 ? "" : "s"}</span>`;
  return `<span class="issue-count">Ready</span>`;
}

function renderArticles() {
  const articles = allArticles();
  workspace.innerHTML = `${renderHeader(state.project.manifest.name, "Articles", '<button class="button primary" data-action="new-article">New article</button>')}
    <input class="search" id="article-search" type="search" value="${escapeHtml(articleSearchQuery)}" placeholder="Search title, slug, category, excerpt, or body" aria-label="Search articles">
    <div class="filters">${["all", "draft", "published", "archived", "trash"].map((status) => `<button class="filter${statusFilter === status ? " active" : ""}" data-status-filter="${status}">${status[0].toUpperCase() + status.slice(1)}</button>`).join("")}</div>
    ${renderArticleBulkBar(articles)}
    <div class="article-list" id="article-list">${renderArticleRows(articles)}</div>`;
  document.querySelector("#article-search").addEventListener("input", (event) => {
    articleSearchQuery = event.target.value;
    document.querySelector("#article-list").innerHTML = renderArticleRows(articles);
    document.querySelector("#article-bulk-bar").outerHTML = renderArticleBulkBar(articles);
  });
}

function filteredArticles(articles) {
  const terms = articleSearchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return articles.filter((article) => {
    if (statusFilter !== "all" && article.status !== statusFilter) return false;
    if (!terms.length) return true;
    const body = JSON.stringify(article).toLowerCase();
    return terms.every((term) => body.includes(term));
  });
}

function renderArticleBulkBar(articles) {
  const visible = filteredArticles(articles);
  const selectedVisible = visible.filter((article) => selectedArticleSlugs.has(article.slug)).length;
  const allVisibleSelected = visible.length > 0 && selectedVisible === visible.length;
  return `<section class="article-bulk-bar" id="article-bulk-bar" aria-label="Bulk article actions">
    <label class="article-select-all"><input type="checkbox" data-select-visible${allVisibleSelected ? " checked" : ""}${visible.length ? "" : " disabled"}> <span>Select visible</span></label>
    <strong>${selectedArticleSlugs.size} selected</strong>
    <div class="article-bulk-actions">
      <label for="article-bulk-action">Change status</label>
      <select id="article-bulk-action"${selectedArticleSlugs.size ? "" : " disabled"}>
        <option value="">Choose status…</option>
        <option value="publish">Published</option>
        <option value="restore">Draft</option>
        <option value="archive">Archived · retain URL, noindex</option>
        <option value="trash">Trash</option>
      </select>
      <button class="button primary" data-action="article-bulk-apply"${selectedArticleSlugs.size ? "" : " disabled"}>Apply</button>
      <button class="text-action" data-action="article-bulk-clear"${selectedArticleSlugs.size ? "" : " disabled"}>Clear</button>
    </div>
  </section>`;
}

function renderArticleRows(articles) {
  const filtered = filteredArticles(articles);
  if (!filtered.length) return `<p class="empty">No articles match this view.</p>`;
  return filtered.map((article) => `<div class="article-row${selectedArticleSlugs.has(article.slug) ? " selected" : ""}">
    <label class="article-row-select" aria-label="Select ${escapeHtml(article.title)}"><input type="checkbox" data-select-article="${escapeHtml(article.slug)}"${selectedArticleSlugs.has(article.slug) ? " checked" : ""}></label>
    <button class="article-row-open" data-open-article="${escapeHtml(article.slug)}">
      <strong>${escapeHtml(article.title)}</strong><span class="secondary">${escapeHtml(article.category)}</span><time>${formatDate(article.modifiedDate)}</time><span class="status">${escapeHtml(article.status)}</span>${issueSummary(article.slug)}
    </button>
  </div>`).join("");
}

function field(label, name, value, { type = "text", full = false, maxlength, rows, readonly = false } = {}) {
  const attrs = `${maxlength ? ` maxlength="${maxlength}"` : ""}${readonly ? " readonly" : ""}`;
  const control = type === "textarea"
    ? `<textarea id="${name}" name="${name}" rows="${rows || 4}"${attrs}>${escapeHtml(value)}</textarea>`
    : `<input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}"${attrs}>`;
  return `<div class="field${full ? " full" : ""}"><label for="${name}">${escapeHtml(label)}</label>${control}${maxlength ? `<span class="counter">${String(value || "").length}/${maxlength}</span>` : ""}</div>`;
}

function renderIssues(article) {
  const issues = state.issues[article.slug] || [];
  if (!issues.length) return `<p class="subtle">No validation issues.</p>`;
  return `<ul class="issue-list">${issues.map((entry) => `<li class="${entry.severity}"><strong>${entry.severity === "error" ? "Blocker" : "Guidance"}</strong><br>${escapeHtml(entry.message)}<button class="text-action" data-help-error="${escapeHtml(entry.message)}">Get help with this</button></li>`).join("")}</ul>`;
}

function partsText(parts = []) {
  return parts.map((part) => part.text || "").join("");
}

function partsEditorText(parts = []) {
  return parts.map((part) => part.href ? `[${part.text || part.href}](${part.href})` : (part.text || "")).join("");
}

function parseEditorText(value = "") {
  const text = String(value);
  const parts = [];
  const pattern = /\[([^\]\n]+)\]\((\/(?!\/)[^)\s]+)\)/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) parts.push({ text: text.slice(cursor, match.index) });
    parts.push({ text: match[1], href: match[2] });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts.length ? parts : [{ text }];
}

function lineEditor(label, name, values = [], placeholder = "One item per line") {
  return field(label, name, values.join("\n"), { type: "textarea", full: true, rows: 4, placeholder });
}

function renderContentBlock(block, index) {
  const typeOptions = ["paragraph", "heading", "quick-answer", "callout", "list", "key-takeaways"];
  const text = partsEditorText(block.content || []);
  const items = (block.items || []).map((item) => partsEditorText(item)).join("\n");
  const control = block.type === "heading"
    ? `<div class="field-grid"><div class="field"><label>Heading level</label><select data-block-level><option value="2"${block.level === 2 ? " selected" : ""}>H2</option><option value="3"${block.level === 3 ? " selected" : ""}>H3</option></select></div>${field("Heading", `block-heading-${index}`, block.text || "", { full: true })}</div>`
    : ["list", "key-takeaways"].includes(block.type)
      ? `${block.type === "list" ? `<div class="field"><label>List style</label><select data-block-style><option value="unordered"${block.style !== "ordered" ? " selected" : ""}>Bulleted</option><option value="ordered"${block.style === "ordered" ? " selected" : ""}>Numbered</option></select></div>` : field("Section title", `block-title-${index}`, block.title || "Key takeaways", { full: true })}<div class="field"><label>Items · one per line</label><textarea data-block-items rows="5">${escapeHtml(items)}</textarea></div>`
      : `${["quick-answer", "callout"].includes(block.type) ? field("Section title", `block-title-${index}`, block.title || (block.type === "quick-answer" ? "Quick answer" : ""), { full: true }) : ""}<div class="field"><label>Text</label><textarea data-block-text rows="6">${escapeHtml(text)}</textarea></div>`;
  return `<article class="content-block-card" data-content-block data-block-id="${escapeHtml(block.id || "")}"><header><span>${String(index + 1).padStart(2, "0")}</span><div class="field"><label>Block type</label><select data-block-type>${typeOptions.map((type) => `<option value="${type}"${type === block.type ? " selected" : ""}>${type.replaceAll("-", " ")}</option>`).join("")}</select></div><div class="block-actions"><button type="button" data-action="editor-block-up" aria-label="Move block up">↑</button><button type="button" data-action="editor-block-down" aria-label="Move block down">↓</button><button type="button" data-action="editor-block-remove">Remove</button></div></header>${control}</article>`;
}

function renderClaimCard(claim, index) {
  return `<article class="claim-card" data-claim data-claim-id="${escapeHtml(claim.id || `claim-${String(index + 1).padStart(2, "0")}`)}"><header><span>Claim ${String(index + 1).padStart(2, "0")}</span><div class="field"><label>Status</label><select data-claim-status>${["grounded", "editorial", "inferred", "unverified"].map((status) => `<option value="${status}"${claim.status === status ? " selected" : ""}>${status}</option>`).join("")}</select></div><button type="button" class="text-action danger-text" data-action="editor-claim-remove">Remove</button></header><div class="field"><label>Material claim</label><textarea data-claim-text rows="3">${escapeHtml(claim.text || "")}</textarea></div><div class="field-grid"><div class="field"><label>Approved source IDs · one per line</label><textarea data-claim-sources rows="3">${escapeHtml((claim.sourceIds || []).join("\n"))}</textarea></div><div class="field"><label>Editorial note</label><textarea data-claim-note rows="3">${escapeHtml(claim.note || "")}</textarea></div></div></article>`;
}

function renderEditor() {
  const article = selectedArticle();
  if (!article) {
    workspace.innerHTML = `${renderHeader("Luxe Journal", "Editor")}<div class="panel empty">Choose an article from Articles or create a new draft.</div>`;
    return;
  }
  workspace.innerHTML = `${renderHeader("Article editor", article.title, '<button class="button" data-action="preview">Preview</button><button class="button primary" data-action="save-article">Save</button>')}
    <div class="editor-layout"><form id="article-form">
      <section class="panel"><h2>Core content</h2><div class="field-grid">
        ${field("Title", "title", article.title, { full: true })}
        ${field("Slug", "slug", article.slug)}${field("Category", "category", article.category)}
        ${field("SEO title", "seoTitle", article.seoTitle, { full: true, maxlength: 70 })}
        ${field("Meta description", "description", article.description, { type: "textarea", full: true, maxlength: 170 })}
        ${field("Excerpt", "excerpt", article.excerpt, { type: "textarea", full: true })}
        ${field("Publish date", "publishDate", article.publishDate)}${field("Modified date", "modifiedDate", article.modifiedDate, { readonly: true })}
      </div></section>
      <section class="panel structured-editor"><div class="section-heading"><div><h2>Article body</h2><p class="subtle">Write and arrange the article as readable content blocks. The CMS preserves the structured data underneath.</p></div><button class="button" type="button" data-action="editor-block-add">Add block</button></div>
        <div class="content-block-list">${(article.content || []).map(renderContentBlock).join("") || '<p class="empty">No article blocks yet.</p>'}</div>
      </section>
      <section class="panel"><h2>Relationships and grounding</h2>
        ${field("Related article slugs (one per line)", "related", (article.relatedArticleSlugs || []).join("\n"), { type: "textarea", full: true })}
        <div class="section-heading"><div><h3>Claims and evidence</h3><p class="subtle">Ground factual statements with approved source IDs. Editorial connective copy does not require a source.</p></div><button class="button" type="button" data-action="editor-claim-add">Add claim</button></div>
        <div class="claim-list">${(article.claims || []).map(renderClaimCard).join("") || '<p class="empty">No material claims recorded.</p>'}</div>
      </section>
      <input type="hidden" name="originalSlug" value="${escapeHtml(article.slug)}">
    </form><aside>
      <section class="panel"><p class="eyebrow">Publication</p><span class="status">${escapeHtml(article.status)}</span><div class="toolbar" style="margin-top:18px">
        ${article.status !== "published" ? '<button class="button gold" data-action="publish">Publish</button>' : '<button class="button" data-action="archive">Archive</button>'}
        ${article.status !== "trash" ? '<button class="button danger" data-action="trash">Trash</button>' : '<button class="button" data-action="restore">Restore draft</button>'}
      </div></section>
      <section class="panel"><p class="eyebrow">SEO preview</p><div class="snippet"><a>luxeeventco.ca › blog › ${escapeHtml(article.slug)}</a><strong>${escapeHtml(article.seoTitle)}</strong><span>${escapeHtml(article.description)}</span></div></section>
      <section class="panel"><p class="eyebrow">Validation</p>${renderIssues(article)}</section>
    </aside></div>`;
}

function collectEditorArticle() {
  const form = new FormData(document.querySelector("#article-form"));
  const current = selectedArticle();
  const content = [...document.querySelectorAll("[data-content-block]")].map((element, index) => {
    const type = element.querySelector("[data-block-type]").value;
    const original = current.content?.[index] || {};
    const id = element.dataset.blockId || `section-${index + 1}`;
    if (type === "heading") {
      const headingControl = element.querySelector(`[name="block-heading-${index}"]`);
      const text = headingControl ? headingControl.value.trim() : original.text || partsText(original.content || []);
      return { type, id: id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), level: Number(element.querySelector("[data-block-level]")?.value || 2), text };
    }
    if (["list", "key-takeaways"].includes(type)) {
      const itemControl = element.querySelector("[data-block-items]");
      const fallbackItems = (original.items || []).map((item) => partsEditorText(item)).join("\n") || original.text || partsEditorText(original.content || []);
      const itemLines = (itemControl ? itemControl.value : fallbackItems).split("\n").map((value) => value.trim()).filter(Boolean);
      const items = itemLines.map((text, itemIndex) => text === partsEditorText(original.items?.[itemIndex] || []) ? original.items[itemIndex] : parseEditorText(text));
      return type === "list" ? { type, style: element.querySelector("[data-block-style]")?.value || "unordered", items } : { type, title: element.querySelector(`[name="block-title-${index}"]`)?.value.trim() || "Key takeaways", items };
    }
    const textControl = element.querySelector("[data-block-text]");
    const text = textControl ? textControl.value.trim() : original.text || partsEditorText(original.content || []) || (original.items || []).map((item) => partsEditorText(item)).join(" ");
    const content = text === partsEditorText(original.content || []) ? original.content : parseEditorText(text);
    const next = { type, content };
    if (["quick-answer", "callout"].includes(type)) next.title = element.querySelector(`[name="block-title-${index}"]`)?.value.trim() || (type === "quick-answer" ? "Quick answer" : "");
    return next;
  });
  const claims = [...document.querySelectorAll("[data-claim]")].map((element) => ({
    id: element.dataset.claimId,
    text: element.querySelector("[data-claim-text]").value.trim(),
    status: element.querySelector("[data-claim-status]").value,
    sourceIds: element.querySelector("[data-claim-sources]").value.split("\n").map((value) => value.trim()).filter(Boolean),
    note: element.querySelector("[data-claim-note]").value.trim(),
  }));
  return {
    ...current,
    originalSlug: form.get("originalSlug"),
    title: form.get("title").trim(), slug: form.get("slug").trim(), category: form.get("category").trim(),
    seoTitle: form.get("seoTitle").trim(), description: form.get("description").trim(), excerpt: form.get("excerpt").trim(),
    publishDate: form.get("publishDate"), content, claims,
    relatedArticleSlugs: form.get("related").split("\n").map((value) => value.trim()).filter(Boolean),
  };
}

function replaceSelectedArticleLocally(article) {
  for (const collection of [state.drafts, state.published, state.archived, state.trash]) {
    const index = collection.findIndex((candidate) => candidate.slug === selectedSlug);
    if (index >= 0) collection[index] = article;
  }
}

function collectKnowledgeRecords() {
  return [...document.querySelectorAll("[data-knowledge-record]")].map((element, index) => {
    const serviceLines = element.querySelector(`[name="knowledge-services-${index}"]`).value.split("\n").map((value) => value.trim()).filter(Boolean);
    const source = element.querySelector(`[name="knowledge-source-${index}"]`).value.trim();
    return {
      id: element.dataset.recordId || `manual-${crypto.randomUUID()}`,
      topic: element.querySelector(`[name="knowledge-topic-${index}"]`).value.trim(),
      category: element.querySelector(`[name="knowledge-category-${index}"]`).value.trim(),
      text: element.querySelector("[data-knowledge-text]").value.trim(),
      applicablePages: element.querySelector(`[name="knowledge-pages-${index}"]`).value.split("\n").map((value) => value.trim()).filter(Boolean),
      applicableServices: serviceLines,
      applicableEvents: [],
      source,
      sourceUrl: /^https?:\/\//.test(source) ? source : null,
      verificationStatus: element.querySelector("[data-knowledge-verification]").value,
      effectiveDate: null,
      reviewDate: element.querySelector(`[name="knowledge-review-${index}"]`).value || null,
      usage: element.querySelector("[data-knowledge-usage]").value,
      supersedes: [],
      conflictsWith: element.querySelector(`[name="knowledge-conflicts-${index}"]`).value.split("\n").map((value) => value.trim()).filter(Boolean),
    };
  });
}

function collectVoiceRules() {
  const form = new FormData(document.querySelector("#voice-form"));
  const lines = (name) => String(form.get(name) || "").split("\n").map((value) => value.trim()).filter(Boolean);
  return {
    ...state.voice,
    schemaVersion: 1,
    version: String(form.get("voice-version") || "1.0.0").trim(),
    tone: lines("voice-tone"),
    approvedTerms: lines("voice-approved"),
    requiredPhrases: lines("voice-required"),
    excludedWords: lines("voice-excluded"),
    prohibitedClaims: lines("voice-prohibited"),
    canadianSpelling: document.querySelector("#voice-canadian").checked,
    headingGuidance: String(form.get("voice-headings") || "").trim(),
    sentenceGuidance: String(form.get("voice-sentences") || "").trim(),
    paragraphGuidance: String(form.get("voice-paragraphs") || "").trim(),
    approvedExamples: lines("voice-good-examples"),
    rejectedExamples: lines("voice-bad-examples"),
  };
}

function collectBriefReview() {
  const value = (name) => document.querySelector(`[name="${name}"]`)?.value.trim() || "";
  const lines = (name) => value(name).split("\n").map((item) => item.trim()).filter(Boolean);
  return { workingTitle: value("brief-title"), angle: value("brief-angle"), audience: value("brief-audience"), searchIntent: value("brief-intent"), category: value("brief-category"), proposedInternalLinks: lines("brief-links"), conflicts: lines("brief-conflicts"), qualifications: lines("brief-qualifications"), missingInformation: lines("brief-missing"), sourceIds: lines("brief-sources") };
}

function collectOutlineReview() {
  const value = (name) => document.querySelector(`[name="${name}"]`)?.value.trim() || "";
  return {
    title: value("outline-title"), quickAnswerPurpose: value("outline-quick"), takeawaysPurpose: value("outline-takeaways"),
    sections: [...document.querySelectorAll("[data-outline-section]")].map((element, index) => ({ heading: element.querySelector(`[name="outline-heading-${index}"]`).value.trim(), purpose: element.querySelector(`[name="outline-purpose-${index}"]`).value.trim(), sourceIds: element.querySelector(`[name="outline-sources-${index}"]`).value.split("\n").map((item) => item.trim()).filter(Boolean) })),
  };
}

function renderLinks() {
  const article = selectedArticle();
  if (!article) {
    workspace.innerHTML = `${renderHeader("SEO architecture", "Internal links")}<div class="panel empty">Choose an article to inspect its link graph.</div>`;
    return;
  }
  const graph = state.graph[article.slug] || { outgoing: [], incoming: { published: [], drafts: [] }, related: [], orphan: false };
  workspace.innerHTML = `${renderHeader("SEO architecture", "Internal links")}
    <div class="metric-grid"><div class="metric"><strong>${graph.outgoing.length}</strong><span>Links from article</span></div><div class="metric"><strong>${graph.incoming.published.length}</strong><span>Published inbound</span></div><div class="metric"><strong>${graph.incoming.drafts.length}</strong><span>Planned inbound</span></div><div class="metric"><strong class="${graph.orphan ? "orphan" : ""}">${graph.orphan ? "Yes" : "No"}</strong><span>Orphan status</span></div></div>
    <div class="two-column"><div>
      <section class="panel"><h2>From this article</h2>${listLinks(graph.outgoing.map((link) => `${link.valid ? "✓" : "×"} ${link.label} — ${link.href} · ${link.location}`))}</section>
      <section class="panel"><h2>Published articles linking here</h2>${listLinks(graph.incoming.published.map((link) => `${link.title} · ${link.location}`))}</section>
    </div><aside>
      <section class="panel"><h2>Draft links</h2><p class="subtle">Draft links are visible but do not clear orphan status.</p>${listLinks(graph.incoming.drafts.map((link) => `${link.title} · ${link.location}`))}</section>
      <section class="panel"><h2>Related articles</h2>${listLinks(graph.related.map((link) => `${link.exists ? "✓" : "×"} ${link.slug}`))}</section>
    </aside></div>`;
}

function listLinks(items) {
  return items.length ? `<ul class="link-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p class="subtle">None recorded.</p>`;
}

function renderMedia() {
  const availableArticles = mediaArticles();
  if (!availableArticles.some((article) => article.slug === mediaTargetSlug)) {
    mediaTargetSlug = availableArticles.some((article) => article.slug === selectedSlug) ? selectedSlug : availableArticles[0]?.slug || null;
  }
  const article = selectedMediaArticle();
  const articleContext = article
    ? `<div class="media-context"><div class="field"><label for="media-target-article">Apply media to</label><select id="media-target-article"><option value="">Choose an article</option>${mediaArticleOptions()}</select></div><span class="eyebrow">Selected article</span><strong>${escapeHtml(article.title)}</strong><div class="toolbar"><span class="status">${escapeHtml(article.status)}</span>${article.heroImage ? '<span class="status assigned">Hero assigned</span>' : ""}${article.socialImage ? '<span class="status assigned">Social assigned</span>' : ""}</div><p class="subtle">Assignment controls in the library apply only to this article. They never publish it.</p></div>`
    : `<div class="media-context"><div class="field"><label for="media-target-article">Apply media to</label><select id="media-target-article"><option value="">No eligible articles available</option></select></div><p class="subtle">Create a draft article before assigning media.</p></div>`;
  const query = mediaLibrarySearch.trim().toLowerCase();
  const filteredAssets = state.media.filter((asset) => !query || [asset.originalFilename, asset.alt, asset.id].some((value) => String(value || "").toLowerCase().includes(query))).reverse();
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / pageSize));
  mediaLibraryPage = Math.min(mediaLibraryPage, totalPages);
  const visibleAssets = filteredAssets.slice((mediaLibraryPage - 1) * pageSize, mediaLibraryPage * pageSize);
  workspace.innerHTML = `${renderHeader("Asset library", "Media")}
    <div class="media-control-grid"><form id="media-form" class="panel"><h2>Upload and optimize</h2>
      <p class="subtle">Create responsive WebP derivatives from a JPEG, PNG, WebP, or AVIF original. This prepares the image for use; it does not add it to an article or publish anything.</p>
      <div class="field"><label for="media-file">Original image</label><input id="media-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required></div>
      ${field("Article slug", "media-article", article?.slug || "library")}${field("Alt text", "media-alt", "", { full: true })}
      <label class="checkbox"><input id="media-decorative" type="checkbox"> This image is decorative and should use empty alt text.</label>
      <div class="field-grid" style="margin-top:18px">${field("Focal X (0–1)", "focal-x", "0.5")}${field("Focal Y (0–1)", "focal-y", "0.5")}</div>
      <button class="button primary" data-action="upload-media">Create derivatives</button>
    </form><section class="panel media-target-panel"><h2>Article target</h2>${articleContext}</section></div>
    <section class="panel media-library"><div class="media-library-heading"><div><p class="eyebrow">Optimized library</p><h2>Media assets</h2></div><span class="status">${filteredAssets.length} ${filteredAssets.length === 1 ? "asset" : "assets"}</span></div><div class="media-library-tools"><label for="media-library-search">Search filename or alt text</label><input id="media-library-search" class="search" type="search" value="${escapeHtml(mediaLibrarySearch)}" placeholder="Search media…"></div>${visibleAssets.length ? `<div class="media-grid">${visibleAssets.map((asset) => renderMediaAsset(asset, article)).join("")}</div>` : `<p class="empty">${state.media.length ? "No assets match this search." : "No media uploaded yet."}</p>`}${totalPages > 1 ? `<nav class="media-pagination" aria-label="Media library pages"><button class="button" data-media-page="prev"${mediaLibraryPage === 1 ? " disabled" : ""}>Previous</button><span>Page ${mediaLibraryPage} of ${totalPages}</span><button class="button" data-media-page="next"${mediaLibraryPage === totalPages ? " disabled" : ""}>Next</button></nav>` : ""}</section>`;
}

function renderKnowledge() {
  const query = knowledgeSearch.trim().toLowerCase();
  const isPublicSnapshot = state.snapshot.sourcePolicy === "public-rendered-content-only";
  const approvedWebsiteRecords = isPublicSnapshot ? (state.snapshot.records || []).filter((record) => record.origin === "public-page") : [];
  const snapshotRecords = approvedWebsiteRecords.filter((record) => {
    if (knowledgeUsageFilter !== "all" && record.usage !== knowledgeUsageFilter) return false;
    return !query || [record.topic, record.category, record.text, record.source, record.id].some((value) => String(value || "").toLowerCase().includes(query));
  });
  workspace.innerHTML = `${renderHeader("Grounded source library", "Knowledge", '<button class="button" data-action="scan-knowledge">Scan website</button><button class="button primary" data-action="approve-knowledge">Approve scan</button>')}
    <div class="metric-grid"><div class="metric"><strong>${approvedWebsiteRecords.length}</strong><span>Public-page records</span></div><div class="metric"><strong>${state.knowledge.length}</strong><span>Supplemental records</span></div><div class="metric"><strong>${state.knowledge.filter((record) => record.usage === "prohibited").length}</strong><span>Prohibited sources</span></div><div class="metric"><strong>${state.knowledge.filter((record) => (record.conflictsWith || []).length).length}</strong><span>Conflicts</span></div></div>
    ${!isPublicSnapshot ? '<section class="panel notice"><strong>Public knowledge boundary active</strong><p>The prior code-derived snapshot is no longer accessible to Article Studio. Scan the live site and approve the new public-content snapshot to repopulate automated knowledge.</p></section>' : ""}
    <section class="panel knowledge-library"><div class="section-heading"><div><h2>Approved public knowledge</h2><p class="subtle">Only text rendered on live public pages and published blog posts is indexed automatically. Source code, drafts, previews, and internal project files are excluded.</p></div><span class="status">${snapshotRecords.length} shown</span></div><div class="knowledge-tools"><input class="search" id="knowledge-search" type="search" value="${escapeHtml(knowledgeSearch)}" placeholder="Search topics, copy, public route, or ID"><select id="knowledge-usage-filter"><option value="all">All usage types</option>${["publishable", "paraphrase-only", "internal-background", "prohibited"].map((usage) => `<option value="${usage}"${knowledgeUsageFilter === usage ? " selected" : ""}>${usage}</option>`).join("")}</select></div><div class="knowledge-record-list">${snapshotRecords.slice(0, 40).map((record) => `<details class="knowledge-record"><summary><span><strong>${escapeHtml(record.topic)}</strong><small>${escapeHtml(record.category)} · ${escapeHtml(record.usage)}</small></span><code>${escapeHtml(record.id)}</code></summary><p>${escapeHtml(record.text)}</p><footer><span>${escapeHtml(record.source || "Manual source")}</span><span>${escapeHtml(record.verificationStatus)}</span></footer></details>`).join("") || '<p class="empty">No approved public records match this search.</p>'}</div>${snapshotRecords.length > 40 ? `<p class="subtle">Showing the first 40 matches. Refine the search to find a specific record.</p>` : ""}</section>
    <section class="panel"><div class="section-heading"><div><h2>Supplemental knowledge</h2><p class="subtle">Add facts that are not currently on the website and control how Article Studio may use them.</p></div><button class="button" data-action="knowledge-add">Add record</button></div><div class="supplemental-records">${state.knowledge.map((record, index) => `<article class="knowledge-editor-card" data-knowledge-record data-record-id="${escapeHtml(record.id || `manual-${index + 1}`)}"><header><span>Record ${String(index + 1).padStart(2, "0")}</span><button class="text-action danger-text" data-action="knowledge-remove">Remove</button></header><div class="field-grid">${field("Topic", `knowledge-topic-${index}`, record.topic || "")}${field("Category", `knowledge-category-${index}`, record.category || "")}</div><div class="field"><label>Approved information</label><textarea data-knowledge-text rows="5">${escapeHtml(record.text || "")}</textarea></div><div class="field-grid"><div class="field"><label>Usage</label><select data-knowledge-usage>${["publishable", "paraphrase-only", "internal-background", "prohibited"].map((usage) => `<option value="${usage}"${record.usage === usage ? " selected" : ""}>${usage}</option>`).join("")}</select></div><div class="field"><label>Verification</label><select data-knowledge-verification>${["verified", "pending", "stale"].map((status) => `<option value="${status}"${record.verificationStatus === status ? " selected" : ""}>${status}</option>`).join("")}</select></div>${field("Source file or URL", `knowledge-source-${index}`, record.source || record.sourceUrl || "", { full: true })}${field("Review date", `knowledge-review-${index}`, record.reviewDate || "", { type: "date" })}${field("Applicable pages · one per line", `knowledge-pages-${index}`, (record.applicablePages || []).join("\n"), { type: "textarea" })}${field("Applicable services/events · one per line", `knowledge-services-${index}`, [...(record.applicableServices || []), ...(record.applicableEvents || [])].join("\n"), { type: "textarea" })}${field("Conflicts with IDs · one per line", `knowledge-conflicts-${index}`, (record.conflictsWith || []).join("\n"), { type: "textarea", full: true })}</div></article>`).join("") || '<p class="empty">No supplemental records yet. Add one when approved information is not available on the public website.</p>'}</div><div class="toolbar"><button class="button primary" data-action="save-knowledge">Save supplemental records</button></div></section>
    <section class="panel" id="knowledge-diff"><h2>Synchronization review</h2><p class="subtle">Run a scan to compare the current website with the approved knowledge snapshot. Nothing is replaced until you approve it.</p></section>`;
}

function renderVoice() {
  workspace.innerHTML = `${renderHeader("Editorial governance", "Brand voice")}
    <form id="voice-form"><div class="voice-layout"><div><section class="panel"><h2>Voice foundation</h2><p class="subtle">Describe how Luxe should sound. These rules guide every generated brief, outline, and article.</p><div class="field-grid">${field("Voice version", "voice-version", state.voice.version || "1.0.0")}${lineEditor("Tone characteristics · one per line", "voice-tone", state.voice.tone || [])}${lineEditor("Approved terminology · one per line", "voice-approved", state.voice.approvedTerms || [])}${lineEditor("Required language · one per line", "voice-required", state.voice.requiredPhrases || [])}</div><label class="checkbox"><input id="voice-canadian" type="checkbox"${state.voice.canadianSpelling ? " checked" : ""}> Use Canadian spelling throughout editorial content.</label></section><section class="panel"><h2>Writing patterns</h2>${field("Heading guidance", "voice-headings", state.voice.headingGuidance || "", { type: "textarea", full: true })}${field("Sentence guidance", "voice-sentences", state.voice.sentenceGuidance || "", { type: "textarea", full: true })}${field("Paragraph guidance", "voice-paragraphs", state.voice.paragraphGuidance || "", { type: "textarea", full: true })}</section></div><aside><section class="panel voice-guardrails"><h2>Publication guardrails</h2><p class="subtle">These are blocking rules, not suggestions.</p>${lineEditor("Excluded words and clichés", "voice-excluded", state.voice.excludedWords || [])}${lineEditor("Prohibited claims", "voice-prohibited", state.voice.prohibitedClaims || [])}</section><section class="panel"><h2>Examples</h2>${lineEditor("Approved examples", "voice-good-examples", state.voice.approvedExamples || [])}${lineEditor("Rejected examples", "voice-bad-examples", state.voice.rejectedExamples || [])}</section></aside></div><div class="sticky-save"><span>Changes remain local until saved.</span><button class="button primary" data-action="save-voice">Save voice rules</button></div></form>`;
}

function renderSourceBadges(sourceIds = [], job) {
  const byId = new Map((job?.sources || []).map((source) => [source.id, source]));
  return sourceIds.length ? `<div class="source-badges">${sourceIds.map((id) => `<details><summary>${escapeHtml(id)}</summary><p>${escapeHtml(byId.get(id)?.text || "Source is referenced but not present in this job's context pack.")}</p></details>`).join("")}</div>` : '<p class="subtle">No sources assigned.</p>';
}

function renderBriefReview(job) {
  const brief = job.brief;
  if (!brief) return "";
  const editable = !job.briefApprovedAt;
  return `<section class="panel studio-review"><div class="section-heading"><div><p class="eyebrow">Checkpoint 1</p><h2>Editorial brief</h2></div><span class="status">${editable ? "Needs approval" : "Approved"}</span></div><div class="field-grid">${field("Working title", "brief-title", brief.workingTitle, { full: true, readonly: !editable })}${field("Article angle", "brief-angle", brief.angle, { type: "textarea", full: true, readonly: !editable })}${field("Audience", "brief-audience", brief.audience, { readonly: !editable })}${field("Search intent", "brief-intent", brief.searchIntent, { readonly: !editable })}${field("Category", "brief-category", brief.category, { readonly: !editable })}${field("Proposed internal links · one per line", "brief-links", (brief.proposedInternalLinks || []).join("\n"), { type: "textarea", readonly: !editable })}</div><h3>Sources selected</h3>${renderSourceBadges(brief.sourceIds, job)}<div class="review-alerts"><div class="${brief.conflicts?.length ? "has-risk" : ""}"><strong>Conflicts</strong>${brief.conflicts?.length ? `<ul>${brief.conflicts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : '<p>None identified.</p>'}</div><div class="${brief.qualifications?.length ? "has-context" : ""}"><strong>Qualifications</strong>${brief.qualifications?.length ? `<ul>${brief.qualifications.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : '<p>None identified.</p>'}</div><div class="${brief.missingInformation?.length ? "has-warning" : ""}"><strong>Necessary missing information</strong>${brief.missingInformation?.length ? `<ul>${brief.missingInformation.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : '<p>None identified.</p>'}</div></div>${editable ? `<div class="field-grid">${field("Edit conflicts · one per line", "brief-conflicts", (brief.conflicts || []).join("\n"), { type: "textarea" })}${field("Edit qualifications · one per line", "brief-qualifications", (brief.qualifications || []).join("\n"), { type: "textarea" })}${field("Edit necessary missing information · one per line", "brief-missing", (brief.missingInformation || []).join("\n"), { type: "textarea" })}${field("Source IDs · one per line", "brief-sources", (brief.sourceIds || []).join("\n"), { type: "textarea", full: true })}</div><button class="button gold" data-action="approve-brief">Approve brief and continue</button>` : '<button class="button primary" data-action="studio-outline">Generate outline</button>'}</section>`;
}

function renderOutlineReview(job) {
  const outline = job.outline;
  if (!outline) return "";
  const editable = !job.outlineApprovedAt;
  return `<section class="panel studio-review"><div class="section-heading"><div><p class="eyebrow">Checkpoint 2</p><h2>Article outline</h2></div><span class="status">${editable ? "Needs approval" : "Approved"}</span></div>${field("Article title", "outline-title", outline.title, { full: true, readonly: !editable })}<div class="outline-purpose-grid">${field("Quick Answer purpose", "outline-quick", outline.quickAnswerPurpose || "", { type: "textarea", readonly: !editable })}${field("Key Takeaways purpose", "outline-takeaways", outline.takeawaysPurpose || "", { type: "textarea", readonly: !editable })}</div><div class="outline-list">${outline.sections.map((section, index) => `<article data-outline-section><header><span>${String(index + 1).padStart(2, "0")}</span>${editable ? `<div class="block-actions"><button data-action="outline-up" aria-label="Move section up">↑</button><button data-action="outline-down" aria-label="Move section down">↓</button><button data-action="outline-remove">Remove</button></div>` : ""}</header>${field("Heading", `outline-heading-${index}`, section.heading, { readonly: !editable })}${field("Purpose", `outline-purpose-${index}`, section.purpose, { type: "textarea", readonly: !editable })}${field("Supporting source IDs · one per line", `outline-sources-${index}`, (section.sourceIds || []).join("\n"), { type: "textarea", readonly: !editable })}</article>`).join("")}</div>${editable ? '<div class="toolbar"><button class="button" data-action="outline-add">Add section</button><button class="button gold" data-action="approve-outline">Approve outline and write draft</button></div>' : '<button class="button primary" data-action="studio-draft">Generate article draft</button>'}</section>`;
}

function renderStudio() {
  const job = state.jobs.find((candidate) => candidate.id === activeJobId) || state.jobs.at(-1) || null;
  if (job) activeJobId = job.id;
  workspace.innerHTML = `${renderHeader("Codex-powered, human-approved", "Article Studio")}
    <div class="studio-steps"><div class="studio-step ${job?.briefApprovedAt ? "done" : ""}"><strong>1 · Brief</strong><p class="subtle">Ground sources and define the angle.</p></div><div class="studio-step ${job?.outlineApprovedAt ? "done" : ""}"><strong>2 · Outline</strong><p class="subtle">Approve the article structure.</p></div><div class="studio-step ${job?.articleSlug ? "done" : ""}"><strong>3 · Draft</strong><p class="subtle">Create a review-only CMS draft.</p></div></div>
    <div class="two-column"><div>
      <section class="panel"><h2>Article request</h2><div class="field"><label for="studio-prompt">What article should Luxe create?</label><textarea id="studio-prompt" rows="7" placeholder="Create a grounded planning article about…">${escapeHtml(studioSeed?.prompt || job?.prompt || "")}</textarea></div>
        <div class="field-grid">${field("Audience", "studio-audience", studioSeed?.audience || job?.inputs?.audience || "")}${field("Search intent", "studio-intent", studioSeed?.searchIntent || job?.inputs?.searchIntent || "")}${field("Category", "studio-category", studioSeed?.category || job?.inputs?.category || "")}${field("Geography", "studio-geography", job?.inputs?.geography || "Toronto and the GTA")}</div>
        <button class="button primary" data-action="studio-brief">Generate grounded brief</button>
      </section>
      ${job ? `<section class="job-strip"><div><span>Current job</span><strong>${escapeHtml(job.brief?.workingTitle || job.prompt)}</strong></div><span class="status">${escapeHtml(job.status)}</span><small>Thread ${escapeHtml(job.threadId || "starting")} · ${escapeHtml(job.model)} · ${job.usage?.inputTokens || 0} input / ${job.usage?.outputTokens || 0} output tokens</small></section>${renderBriefReview(job)}${renderOutlineReview(job)}${job.articleSlug ? `<section class="panel draft-ready"><p class="eyebrow">Checkpoint 3</p><h2>Draft ready for editorial review</h2><p>The structured article has been saved as a draft. Review it in the visual editor, resolve validation items, and open the exact Luxe preview before publishing.</p><button class="button primary" data-open-article="${escapeHtml(job.articleSlug)}">Review article draft</button></section>` : ""}` : ""}
    </div><aside><section class="panel"><p class="eyebrow">Grounding policy</p><p>Codex runs read-only, without web access or API-key fallback. It receives only relevant approved sources and cannot publish.</p></section><section class="panel"><p class="eyebrow">Usage policy</p><p>${state.settings.paidCreditsDisabledAcknowledged ? "Account-level paid credits are confirmed disabled." : "Article Studio is locked until paid credits and auto top-up are confirmed disabled in Settings."}</p></section></aside></div>`;
}

function calendarItemForm(item = {}) {
  const statuses = state.calendarConfig.statuses || [];
  return `<form id="calendar-item-form" class="panel calendar-editor">
    <div class="toolbar calendar-editor-heading"><h2>${item.id ? "Edit calendar item" : "New calendar item"}</h2>${item.id ? '<button class="text-action danger-text" data-action="calendar-delete">Delete</button>' : ""}</div>
    <input type="hidden" name="calendar-id" value="${escapeHtml(item.id || "")}">
    ${field("Working title", "calendar-title", item.title || "", { full: true })}
    <div class="field-grid">
      <div class="field"><label for="calendar-status">Status</label><select name="calendar-status">${statuses.map((status) => `<option value="${escapeHtml(status)}"${status === (item.status || "idea") ? " selected" : ""}>${escapeHtml(status)}</option>`).join("")}</select></div>
      ${field("Target date", "calendar-date", item.targetDate || "", { type: "date" })}
      ${field("Category", "calendar-category", item.category || state.calendarConfig.defaultCategory || "Event Planning")}
      ${field("Content pillar", "calendar-pillar", item.contentPillar || "")}
      ${field("Audience", "calendar-audience", item.audience || "")}
      ${field("Search intent", "calendar-intent", item.searchIntent || "")}
      ${field("Campaign", "calendar-campaign", item.campaign || "")}
      ${field("Article slug", "calendar-slug", item.articleSlug || "")}
    </div>
    ${field("Notes", "calendar-notes", item.notes || "", { type: "textarea", full: true })}
    ${field("Proposed internal links (one path per line)", "calendar-links", (item.proposedInternalLinks || []).join("\n"), { type: "textarea", full: true })}
    <div class="toolbar"><button class="button primary" data-action="calendar-save">Save item</button>${item.id ? '<button class="button" data-action="calendar-to-studio">Open in Article Studio</button>' : ""}</div>
  </form>`;
}

function monthLabel(month) {
  const [year, index] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, index - 1, 1)));
}

function moveCalendarMonth(offset) {
  const [year, index] = calendarMonth.split("-").map(Number);
  const date = new Date(Date.UTC(year, index - 1 + offset, 1));
  calendarMonth = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function renderMonthCalendar() {
  const [year, index] = calendarMonth.split("-").map(Number);
  const firstDay = new Date(Date.UTC(year, index - 1, 1));
  const days = new Date(Date.UTC(year, index, 0)).getUTCDate();
  const leading = firstDay.getUTCDay();
  const cells = [];
  for (let blank = 0; blank < leading; blank += 1) cells.push('<div class="calendar-day is-empty" aria-hidden="true"></div>');
  for (let day = 1; day <= days; day += 1) {
    const date = `${calendarMonth}-${String(day).padStart(2, "0")}`;
    const items = state.calendar.filter((item) => item.targetDate === date);
    cells.push(`<div class="calendar-day"><time datetime="${date}">${day}</time>${items.map((item) => `<button class="calendar-entry status-${escapeHtml(item.status)}" data-calendar-item="${item.id}"><span>${escapeHtml(item.category)}</span><strong>${escapeHtml(item.title)}</strong></button>`).join("")}</div>`);
  }
  return `<div class="calendar-weekdays">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span>${day}</span>`).join("")}</div><div class="calendar-grid">${cells.join("")}</div>`;
}

function renderCalendarList() {
  const items = [...state.calendar].sort((a, b) => (a.targetDate || "9999").localeCompare(b.targetDate || "9999"));
  if (!items.length) return '<p class="empty">No calendar items yet. Add an idea or request a proposed plan.</p>';
  return `<div class="calendar-list">${items.map((item) => `<button data-calendar-item="${item.id}"><time>${item.targetDate ? formatDate(`${item.targetDate}T12:00:00Z`) : "Backlog"}</time><span class="status">${escapeHtml(item.status)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.category)}${item.contentPillar ? ` · ${escapeHtml(item.contentPillar)}` : ""}</small></button>`).join("")}</div>`;
}

function renderCalendarConfig() {
  const config = state.calendarConfig;
  return `<details class="panel calendar-settings"><summary>Calendar preferences</summary><form id="calendar-config-form">
    <p class="subtle">Customize cadence, lead time, publishing days, blackout dates, workflow labels, category mix, and campaign periods.</p>
    <div class="field-grid">${field("Articles per month", "cadence", config.cadencePerMonth, { type: "number" })}${field("Planning lead time (days)", "lead-days", config.planningLeadDays, { type: "number" })}${field("Default category", "default-category", config.defaultCategory)}${field("Workflow statuses (comma separated)", "calendar-statuses", (config.statuses || []).join(", "))}</div>
    <div class="field"><label>Preferred publishing weekdays</label><div class="weekday-options">${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => `<label class="checkbox"><input type="checkbox" name="weekday" value="${day}"${(config.preferredWeekdays || []).includes(day) ? " checked" : ""}> ${day}</label>`).join("")}</div></div>
    <div class="field-grid">${field("Blackout dates (one YYYY-MM-DD per line)", "blackout-dates", (config.blackoutDates || []).join("\n"), { type: "textarea" })}${field("Category targets (JSON)", "category-targets", JSON.stringify(config.categoryTargets || {}, null, 2), { type: "textarea" })}${field("Campaign periods (JSON)", "campaign-periods", JSON.stringify(config.campaignPeriods || [], null, 2), { type: "textarea", full: true })}</div>
    <button class="button primary" data-action="calendar-config-save">Save preferences</button>
  </form></details>`;
}

function renderCalendarProposal() {
  const proposals = [...state.calendarProposals].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  if (!proposals.length) return "";
  const currentArticles = allArticles();
  const proposalItemState = (proposal, item) => {
    const article = currentArticles.find((candidate) => candidate.slug === item.articleSlug || candidate.title === item.title);
    const calendarItem = state.calendar.find((candidate) => (candidate.sourceProposalId === proposal.id && candidate.sourceProposalItemId === item.id) || (!candidate.sourceProposalId && candidate.title === item.title && candidate.targetDate === item.targetDate));
    const calendarStatus = calendarItem ? calendarItem.status : proposal.status === "approved" ? "removed" : (item.calendarStatus || "proposed");
    return { articleStatus: article?.status || item.articleStatus || null, calendarStatus };
  };
  return `<section class="panel proposal proposal-history"><div class="proposal-history-heading"><div><p class="eyebrow">Codex planning history</p><h2>Calendar proposals</h2></div><span class="status">${proposals.length}</span></div><p class="subtle">Open a dated proposal to review its ideas. Calendar and article status stays synchronized when planned work or approved articles are removed.</p><div class="proposal-list">${proposals.map((proposal, proposalIndex) => `<details class="proposal-entry"${proposalIndex === 0 ? " open" : ""}><summary><span><strong>${escapeHtml(formatDate(proposal.createdAt))}</strong><small>${escapeHtml(proposal.prompt || "Editorial calendar proposal")}</small></span><span class="status">${escapeHtml(proposal.status)}</span></summary><div class="proposal-body"><p class="proposal-summary">${escapeHtml(proposal.summary)}</p><div class="proposal-items">${(proposal.items || []).map((item) => { const itemState = proposalItemState(proposal, item); return `<article><div class="proposal-item-meta"><time>${escapeHtml(item.targetDate)}</time><span>${escapeHtml(item.category)}</span></div><h3>${escapeHtml(item.title)}</h3><div class="proposal-state"><span>Calendar · ${escapeHtml(itemState.calendarStatus)}</span>${itemState.articleStatus ? `<span>Article · ${escapeHtml(itemState.articleStatus)}</span>` : ""}</div><details class="proposal-notes"><summary>Planning notes</summary><p>${escapeHtml(item.rationale)}</p>${item.risks?.length ? `<small>Review: ${escapeHtml(item.risks.join(" · "))}</small>` : ""}</details></article>`; }).join("")}</div><div class="toolbar">${proposal.status === "pending" ? `<button class="button gold" data-action="calendar-approve-proposal" data-proposal-id="${proposal.id}">Approve and add all to calendar</button>` : '<p class="subtle">Approved items remain individually removable from the calendar.</p>'}<button class="text-action danger-text" data-action="calendar-delete-proposal" data-proposal-id="${proposal.id}">Remove proposal history</button></div></div></details>`).join("")}</div></section>`;
}

function renderCalendar() {
  const selected = state.calendar.find((item) => item.id === selectedCalendarId) || null;
  const scheduledThisMonth = state.calendar.filter((item) => item.targetDate?.startsWith(calendarMonth)).length;
  workspace.innerHTML = `${renderHeader("Editorial planning", "Content calendar", `<button class="button" data-action="calendar-new"${serverFeaturesReady ? "" : " disabled"}>New idea</button>`)}${restartNotice()}
    <div class="metric-grid"><div class="metric"><strong>${state.calendar.length}</strong><span>Total ideas</span></div><div class="metric"><strong>${scheduledThisMonth}</strong><span>${escapeHtml(monthLabel(calendarMonth))}</span></div><div class="metric"><strong>${state.calendar.filter((item) => item.status === "draft").length}</strong><span>Draft stage</span></div><div class="metric"><strong>${state.calendarConfig.cadencePerMonth}</strong><span>Monthly target</span></div></div>
    <section class="calendar-toolbar"><div class="toolbar"><button class="button" data-action="calendar-prev" aria-label="Previous month">←</button><strong>${escapeHtml(monthLabel(calendarMonth))}</strong><button class="button" data-action="calendar-next" aria-label="Next month">→</button></div><div class="filters"><button class="filter${calendarMode === "month" ? " active" : ""}" data-calendar-mode="month">Month</button><button class="filter${calendarMode === "list" ? " active" : ""}" data-calendar-mode="list">Pipeline</button></div></section>
    <div class="calendar-layout"><div><section class="panel calendar-surface">${calendarMode === "month" ? renderMonthCalendar() : renderCalendarList()}</section>${renderCalendarProposal()}</div><aside>${calendarItemForm(selected || {})}<section class="panel"><p class="eyebrow">Codex planning</p><h2>Propose a calendar</h2><p class="subtle">Codex checks current articles, approved knowledge, cadence, category balance, internal-link opportunities, and conflicts. Nothing is added until you approve the proposal.</p><div class="field"><label for="calendar-prompt">Planning request</label><textarea id="calendar-prompt" rows="5" placeholder="Plan the next three months around wedding and corporate planning searches…"></textarea></div><button class="button gold" data-action="calendar-propose">Create proposal</button></section></aside></div>
    ${renderCalendarConfig()}`;
}

function currentHelpSession() {
  if (helpSessionId === "new") return null;
  return state.helpSessions.find((candidate) => candidate.id === helpSessionId) || state.helpSessions.at(-1) || null;
}

function helpSessionTitle(session) {
  const firstQuestion = session.messages?.find((message) => message.role === "user")?.text || "Untitled conversation";
  return firstQuestion.length > 76 ? `${firstQuestion.slice(0, 73)}…` : firstQuestion;
}

function renderHelpHistory() {
  const sessions = [...state.helpSessions].sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
  return `<section class="panel help-history" id="help-history"><div class="help-history-heading"><div><p class="eyebrow">Saved locally</p><h2>Chat history</h2></div><span class="status">${sessions.length}</span></div>${sessions.length ? `<div class="help-history-list">${sessions.map((session) => `<button class="${session.id === currentHelpSession()?.id ? "active" : ""}" data-help-session="${escapeHtml(session.id)}"><strong>${escapeHtml(helpSessionTitle(session))}</strong><span>${escapeHtml(formatDate(session.updatedAt || session.createdAt))} · ${session.messages?.length || 0} messages · ${session.proposals?.length || 0} proposals</span></button>`).join("")}</div>` : '<p class="subtle">No saved conversations yet.</p>'}</section>`;
}

function renderHelpMessage(message, index = 0) {
  if (message.role === "user") return `<article class="help-message user"><span>You</span><p>${escapeHtml(message.text)}</p></article>`;
  const proposal = message.proposalId ? currentHelpSession()?.proposals?.find((candidate) => candidate.id === message.proposalId) : null;
  const proposalReference = proposal ? `<div class="help-proposal-reference"><span class="status">${escapeHtml(proposal.status)}</span><button class="text-action" data-action="help-open-proposals">Review in Repair Proposals</button></div>` : "";
  return `<article class="help-message assistant"><span>CMS Help</span><p>${escapeHtml(message.answer)}</p>${message.steps?.length ? `<ol>${message.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : ""}${message.references?.length ? `<details><summary>Context used</summary><ul>${message.references.map((reference) => `<li>${escapeHtml(reference)}</li>`).join("")}</ul></details>` : ""}${message.caution ? `<small>${escapeHtml(message.caution)}</small>` : ""}${proposalReference}${!message.proposalId && currentHelpSession() ? `<button class="text-action help-fix-action" data-action="help-repair" data-message-index="${index}">Fix this for me</button>` : ""}</article>`;
}

function renderRepairProposal(proposal) {
  if (!proposal) return "";
  const evidence = proposal.evidence || [];
  const changeDetails = proposal.kind === "article-update"
    ? `<ul>${proposal.operations.map((operation) => `<li><strong>${escapeHtml(operation.field)}</strong><span>${escapeHtml(operation.reason)}</span></li>`).join("")}</ul>`
    : proposal.kind === "file-patch"
      ? `<p><strong>Files:</strong> ${escapeHtml(proposal.files.join(", ") || "No files listed")}</p><details><summary>Review exact code changes</summary><pre>${escapeHtml(proposal.unifiedDiff)}</pre></details>`
      : `<p>This proposal requires manual work and cannot be applied automatically.</p>`;
  return `<article class="repair-card risk-${escapeHtml(proposal.risk)}">
    <header><div><span>Repair proposal · Revision ${proposal.revision}</span><h3>${escapeHtml(proposal.title)}</h3></div><strong class="status">${escapeHtml(proposal.status)}</strong></header>
    <p>${escapeHtml(proposal.summary)}</p>${changeDetails}
    ${evidence.length ? `<details class="repair-evidence"><summary>Approved evidence used (${evidence.length})</summary><ul>${evidence.map((item) => `<li><code>${escapeHtml(item.sourceId)}</code><span>${escapeHtml(item.support)}</span></li>`).join("")}</ul></details>` : ""}
    ${proposal.limitations?.length ? `<details><summary>Limitations</summary><ul>${proposal.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></details>` : ""}
    ${proposal.status === "pending" ? `<div class="repair-actions">${proposal.kind !== "manual-only" ? `<button class="button gold" data-action="help-repair-accept" data-proposal-id="${proposal.id}">Accept changes</button>` : ""}<button class="button" data-action="help-repair-decline" data-proposal-id="${proposal.id}">Decline</button></div><form class="repair-feedback" data-proposal-feedback="${proposal.id}"><label for="repair-feedback-${proposal.id}">Want something changed?</label><textarea id="repair-feedback-${proposal.id}" rows="2" placeholder="Keep the current title, but revise the metadata…"></textarea><button class="text-action" data-action="help-repair-feedback" data-proposal-id="${proposal.id}">Revise proposal</button></form>` : `<p class="repair-decision">Proposal ${escapeHtml(proposal.status)}${proposal.decidedAt ? ` on ${escapeHtml(formatDate(proposal.decidedAt))}` : ""}.</p>`}
  </article>`;
}

function renderRepairProposalSection(session) {
  const proposals = session?.proposals || [];
  return `<section class="panel help-proposals" id="help-repair-proposals"><div class="help-proposals-heading"><div><p class="eyebrow">Change review</p><h2>Repair Proposals</h2></div><span class="status">${proposals.length} ${proposals.length === 1 ? "proposal" : "proposals"}</span></div><p class="subtle">Repair proposals are kept outside the conversation so questions and answers remain chronological. Review every proposed change here before accepting it.</p><div class="help-proposal-list">${proposals.length ? [...proposals].reverse().map(renderRepairProposal).join("") : '<p class="empty">No repair proposals in this conversation.</p>'}</div></section>`;
}

function renderHelpDrawer() {
  const drawer = document.querySelector("#help-drawer");
  const launcher = document.querySelector(".help-launcher");
  if (!drawer || !launcher) return;
  drawer.hidden = !helpDrawerOpen;
  launcher.setAttribute("aria-expanded", String(helpDrawerOpen));
  if (!helpDrawerOpen) return;
  const session = currentHelpSession();
  if (session) helpSessionId = session.id;
  const context = selectedArticle() ? selectedArticle().title : `${helpContextView[0].toUpperCase()}${helpContextView.slice(1)} workspace`;
  document.querySelector("#help-drawer-context").innerHTML = `<span>Current context</span><strong>${escapeHtml(context)}</strong>`;
  const messages = document.querySelector("#help-drawer-messages");
  messages.innerHTML = session?.messages?.length ? session.messages.map(renderHelpMessage).join("") : `<div class="help-drawer-empty"><strong>How can I help?</strong><p>Ask about the screen you are on, an error, SEO/AEO, Article Studio, links, media, or the content calendar.</p><div class="help-prompts"><button data-drawer-prompt="Explain the errors or warnings on my selected article.">Explain current issues</button><button data-drawer-prompt="What should I do next on this screen?">What should I do next?</button></div></div>`;
  const input = document.querySelector("#help-drawer-question");
  if (helpSeed) input.value = helpSeed;
  helpSeed = "";
  requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });
}

function renderHelp() {
  const session = currentHelpSession();
  if (session) helpSessionId = session.id;
  workspace.innerHTML = `${renderHeader("Local guidance", "CMS Help", `<button class="button" data-action="help-new"${serverFeaturesReady ? "" : " disabled"}>New conversation</button>`)}${restartNotice()}
    <div class="help-layout"><div class="help-main"><section class="help-conversation panel"><div class="help-intro"><h2>Ask about anything in the CMS</h2><p class="subtle">Get plain-language help with errors, publishing rules, SEO/AEO, content structure, previews, links, media, Article Studio, or the calendar. Help is read-only and cannot change your work.</p><div class="help-prompts"><button data-help-prompt="Explain the validation issues on my current article and what I should fix first.">Explain current validation</button><button data-help-prompt="How do Draft, Published, Archived, and Trash affect indexing and the sitemap?">Explain publishing states</button><button data-help-prompt="How should I use Quick Answer and Key Takeaways for AEO without keyword stuffing?">Improve SEO and AEO</button><button data-help-prompt="Why might the exact article preview be unavailable, and how do I fix it?">Troubleshoot preview</button></div></div>
      <div class="help-messages" id="help-messages">${session?.messages?.length ? session.messages.map(renderHelpMessage).join("") : '<p class="empty">Start with a question or choose a prompt above.</p>'}</div>
      <form id="help-form" class="help-composer"><label for="help-question">Your question</label><textarea id="help-question" rows="4" placeholder="What does this error mean, and what should I do next?">${escapeHtml(helpSeed)}</textarea><div class="toolbar"><button class="button primary" data-action="help-ask">Ask CMS Help</button>${selectedArticle() ? `<span class="context-chip">Using ${escapeHtml(selectedArticle().title)}</span>` : `<span class="context-chip">Using ${escapeHtml(helpContextView)} context</span>`}</div></form>
    </section>${renderRepairProposalSection(session)}</div><aside>${renderHelpHistory()}<section class="panel"><p class="eyebrow">What Help can see</p><ul class="link-list"><li>The current CMS section</li><li>The selected article and validation issues</li><li>Internal-link and orphan status</li><li>Calendar configuration and upcoming items</li><li>Local CMS rules and safeguards</li></ul></section><section class="panel"><p class="eyebrow">What Help cannot do</p><p>It cannot edit content, publish, deploy, enable paid usage, or access the public web. Any recommended change remains yours to review and apply.</p></section>${session ? `<section class="panel"><p class="eyebrow">Conversation</p><p class="subtle">Thread ${escapeHtml(session.threadId || "starting")}<br>${session.usage?.inputTokens || 0} input / ${session.usage?.outputTokens || 0} output tokens</p></section>` : ""}</aside></div>`;
  helpSeed = "";
  requestAnimationFrame(() => { const messages = document.querySelector("#help-messages"); if (messages) messages.scrollTop = messages.scrollHeight; });
}

function renderProjects() {
  const projects = registry?.projects || [];
  workspace.innerHTML = `${renderHeader("Local workspace", "Projects", '<button class="button primary" data-action="project-add-reveal">Connect website</button>')}
    <section class="project-overview panel"><div><p class="eyebrow">Strict isolation</p><h2>One workspace, separate project histories.</h2></div><p class="subtle">Articles, media, Studio threads, Help, calendars, SEO evidence, crawls, opportunities, and reports remain attached to each immutable project UUID. Disconnecting never deletes files.</p></section>
    <section class="project-list">${projects.map((project) => {
      const manifest = project.manifest;
      const active = project.projectId === activeProjectId;
      return `<article class="project-card${active ? " active" : ""}"><div class="project-card-heading"><div><p class="eyebrow">${active ? "Active project" : escapeHtml(project.connectionStatus)}</p><h2>${escapeHtml(manifest?.name || "Unavailable project")}</h2></div><span class="connection ${escapeHtml(project.connectionStatus)}">${escapeHtml(project.connectionStatus)}</span></div><dl><div><dt>Domain</dt><dd>${escapeHtml(manifest?.canonicalBaseUrl || "—")}</dd></div><div><dt>Adapter</dt><dd>${escapeHtml(project.adapter?.label || "—")}</dd></div><div><dt>Project UUID</dt><dd><code>${escapeHtml(project.projectId)}</code></dd></div><div><dt>Repository</dt><dd><code>${escapeHtml(project.root)}</code></dd></div></dl><div class="toolbar">${active ? "" : `<button class="button primary" data-action="project-activate" data-project-id="${escapeHtml(project.projectId)}">Open project</button>`}<button class="button" data-action="project-open-folder" data-project-id="${escapeHtml(project.projectId)}">Open folder</button><button class="button" data-action="project-validate" data-project-id="${escapeHtml(project.projectId)}">Validate connection</button><button class="button" data-action="project-export" data-project-id="${escapeHtml(project.projectId)}">Export bundle</button><button class="text-action" data-action="project-reconnect-reveal" data-project-id="${escapeHtml(project.projectId)}">Reconnect moved folder</button>${active ? "" : `<button class="text-action danger" data-action="project-disconnect" data-project-id="${escapeHtml(project.projectId)}">Disconnect</button>`}</div></article>`;
    }).join("")}</section>
    <section class="panel project-connect" id="project-connect" hidden><p class="eyebrow">Connect website</p><h2>Add a local project</h2><p class="subtle">A generic project begins with SEO auditing and measurement. Its immutable manifest allows a publishing adapter to be added later without losing history.</p><form id="project-add-form" class="field-grid">${field("Display name", "project-name", "")}${field("Canonical URL", "project-canonical", "https://")}${field("Absolute repository path", "project-root", "", { full: true })}<div class="field full"><label for="project-adapter">Adapter</label><select id="project-adapter" name="project-adapter"><option value="generic-seo-v1">Generic website SEO</option><option value="luxe-json-v1">Luxe JSON / Vinext</option></select></div><div class="toolbar full"><button class="button primary" data-action="project-add">Connect project</button><button class="button" data-action="project-add-cancel">Cancel</button></div></form></section>
    <section class="panel project-reconnect" id="project-reconnect" hidden><p class="eyebrow">Reconnect</p><h2>Locate the moved repository</h2><form id="project-reconnect-form" class="field-grid"><input type="hidden" name="reconnect-project-id">${field("New absolute repository path", "reconnect-root", "", { full: true })}<div class="toolbar full"><button class="button primary" data-action="project-reconnect">Confirm UUID and reconnect</button><button class="button" data-action="project-reconnect-cancel">Cancel</button></div></form></section>
    <section class="panel"><p class="eyebrow">Recovery</p><h2>Import a project bundle</h2><p class="subtle">The bundle is checksum-validated before writing. Restore the original UUID, or explicitly create an isolated clone with a new UUID.</p><form id="project-import-form" class="field-grid">${field("Absolute bundle file", "project-bundle-file", "", { full: true })}${field("Destination repository path", "project-import-root", "", { full: true })}<label class="checkbox full"><input id="project-import-clone" type="checkbox"> Create an explicit clone with a new project UUID.</label><div class="toolbar full"><button class="button" data-action="project-import-inspect">Validate bundle</button><button class="button primary" data-action="project-import">Import bundle</button></div></form><div id="project-import-result"></div></section>`;
}

function percent(value) { return `${((Number(value) || 0) * 100).toFixed(1)}%`; }

function renderSeo() {
  const seo = state.seo || { observations: [], crawlRuns: [], opportunities: [], annotations: [], reports: [], integration: {}, summary: {} };
  const latestRun = seo.crawlRuns.at(-1);
  const latestReport = seo.reports.at(-1);
  const totals = seo.views?.totals || { clicks: 0, impressions: 0, ctr: 0, position: null };
  workspace.innerHTML = `${renderHeader("Project evidence", "SEO intelligence", '<button class="button primary" data-action="seo-crawl">Run technical audit</button>')}
    <div class="metric-grid seo-metrics"><div class="metric"><strong>${totals.clicks.toLocaleString()}</strong><span>Search clicks</span></div><div class="metric"><strong>${totals.impressions.toLocaleString()}</strong><span>Impressions</span></div><div class="metric"><strong>${percent(totals.ctr)}</strong><span>Observed CTR</span></div><div class="metric"><strong>${seo.summary.openOpportunities || 0}</strong><span>Open opportunities</span></div></div>
    <div class="seo-layout"><div class="seo-main"><section class="panel"><div class="section-heading"><div><p class="eyebrow">Search Console</p><h2>Read-only search evidence</h2></div><span class="connection ${escapeHtml(seo.integration?.searchConsole?.status || "not-configured")}">${escapeHtml(seo.integration?.searchConsole?.status || "not configured")}</span></div><p class="subtle">Each property is bound only to this project. CSV imports use the same normalized observation model as OAuth synchronization.</p><p><strong>Property:</strong> ${escapeHtml(seo.integration?.searchConsole?.property || "Not bound")}</p><div class="toolbar"><button class="button" data-action="seo-google-connect">Connect Google</button><button class="button" data-action="seo-google-sites">Choose property</button>${seo.integration?.searchConsole?.property ? '<button class="button primary" data-action="seo-google-sync">Sync 90 days</button><button class="text-action" data-action="seo-google-unbind">Unbind from project</button>' : ""}</div><div id="seo-google-properties"></div><form id="seo-csv-form" class="seo-import"><label for="seo-csv">Or import Search Console CSV</label><input id="seo-csv" type="file" accept=".csv,text/csv"><div class="toolbar"><button class="button" data-action="seo-csv-preview">Preview import</button><button class="button primary" data-action="seo-csv-commit">Import atomically</button></div></form><div id="seo-import-result"></div></section>
      ${seo.summary.observationCount ? `<section class="panel"><p class="eyebrow">Search views</p><h2>Comparable evidence</h2><div class="comparison-grid"><article><span>Current 28 days</span><strong>${seo.views.currentPeriod.clicks} clicks</strong><small>${escapeHtml(seo.views.currentPeriod.startDate || "—")} to ${escapeHtml(seo.views.currentPeriod.endDate || "—")}</small></article><article><span>Previous 28 days</span><strong>${seo.views.previousPeriod.clicks} clicks</strong><small>${escapeHtml(seo.views.previousPeriod.startDate || "—")} to ${escapeHtml(seo.views.previousPeriod.endDate || "—")}</small></article>${seo.views.yearOverYear.available ? `<article><span>Prior-year period</span><strong>${seo.views.yearOverYear.clicks} clicks</strong><small>${escapeHtml(seo.views.yearOverYear.startDate)} to ${escapeHtml(seo.views.yearOverYear.endDate)}</small></article>` : ""}<article><span>Branded</span><strong>${seo.views.branded.clicks} clicks</strong><small>${seo.views.branded.impressions} impressions</small></article><article><span>Non-branded</span><strong>${seo.views.nonBranded.clicks} clicks</strong><small>${seo.views.nonBranded.impressions} impressions</small></article></div><h3>Route groups</h3><div class="seo-table">${seo.views.byRouteGroup.map((row) => `<div><strong>${escapeHtml(row.label)}</strong><span>${row.clicks} clicks</span><span>${row.impressions} impressions</span><span>${percent(row.ctr)} CTR</span></div>`).join("")}</div><div class="search-segment-grid">${[["Device", seo.views.byDevice], ["Country", seo.views.byCountry], ["Search type", seo.views.bySearchType]].map(([label, rows]) => `<section><h3>${label}</h3><div class="seo-table compact">${rows.slice(0, 8).map((row) => `<div><strong>${escapeHtml(row.label)}</strong><span>${row.clicks} clicks</span><span>${row.impressions} impressions</span></div>`).join("") || '<p class="empty">No data</p>'}</div></section>`).join("")}</div>${seo.views.limitations.map((item) => `<p class="subtle">${escapeHtml(item)}</p>`).join("")}</section>` : ""}
      <section class="panel"><div class="section-heading"><div><p class="eyebrow">Opportunity queue</p><h2>Evidence before recommendations</h2></div><button class="button" data-action="seo-opportunities">Refresh opportunities</button></div>${seo.opportunities.length ? `<div class="opportunity-list">${seo.opportunities.map((item) => `<article><div><span class="status">${escapeHtml(item.status)}</span><span class="confidence">${escapeHtml(item.confidence)} confidence</span></div><h3>${escapeHtml(item.type.replaceAll("-", " "))}</h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.url)}</a><p>${escapeHtml(item.observation)}</p><p class="subtle"><strong>Proposed:</strong> ${escapeHtml(item.proposedAction)}</p><div class="toolbar"><select data-opportunity-status="${escapeHtml(item.id)}">${["new", "reviewing", "approved", "scheduled", "in-progress", "completed", "monitoring", "rejected", "dismissed"].map((status) => `<option${item.status === status ? " selected" : ""}>${status}</option>`).join("")}</select><button class="button" data-action="seo-opportunity-save" data-opportunity-id="${escapeHtml(item.id)}">Save status</button>${item.status === "approved" && state.project.adapter.capabilities.includes("calendar") ? `<button class="button" data-action="seo-opportunity-calendar" data-opportunity-id="${escapeHtml(item.id)}">Add to calendar</button>` : ""}${item.status === "approved" && state.project.adapter.capabilities.includes("studio") ? `<button class="button" data-action="seo-opportunity-studio" data-opportunity-id="${escapeHtml(item.id)}">Start Studio brief</button>` : ""}</div></article>`).join("")}</div>` : '<p class="empty">Run a crawl or import search evidence, then generate opportunities.</p>'}</section>
      <section class="panel"><p class="eyebrow">Change annotations</p><h2>Record what changed</h2><form id="seo-annotation-form" class="field-grid">${field("Change title", "annotation-title", "")}${field("Affected URL", "annotation-url", state.project.manifest.canonicalBaseUrl)}${field("Implemented date", "annotation-date", new Date().toISOString().slice(0, 10), { type: "date" })}${field("Notes", "annotation-notes", "", { type: "textarea", full: true })}<div class="toolbar full"><button class="button primary" data-action="seo-annotation-save">Save annotation</button></div></form></section></div>
      <aside><section class="panel"><p class="eyebrow">Technical audit</p><h2>${latestRun ? `${latestRun.pageCount} pages checked` : "No crawl yet"}</h2><p class="subtle">${latestRun ? `${latestRun.findingCount} findings · ${formatDate(latestRun.completedAt)}` : "Begin with the configured sitemap and homepage."}</p>${latestRun?.findings?.length ? `<ul class="finding-list">${latestRun.findings.slice(0, 12).map((item) => `<li class="${escapeHtml(item.severity)}"><strong>${escapeHtml(item.ruleId)}</strong><span>${escapeHtml(item.evidence)}</span><small>${escapeHtml(item.url)}</small></li>`).join("")}</ul>` : ""}</section><section class="panel"><p class="eyebrow">Reporting</p><h2>Project-only report</h2>${field("Start date (optional)", "report-start", "", { type: "date", full: true })}${field("End date (optional)", "report-end", "", { type: "date", full: true })}<button class="button primary" data-action="seo-report">Generate report</button>${latestReport ? `<dl class="report-summary"><div><dt>Generated</dt><dd>${formatDate(latestReport.generatedAt)}</dd></div><div><dt>Clicks</dt><dd>${latestReport.totals.clicks}</dd></div><div><dt>Impressions</dt><dd>${latestReport.totals.impressions}</dd></div><div><dt>Open findings</dt><dd>${latestReport.technical.openFindings}</dd></div></dl><div class="toolbar report-exports">${["html", "csv", "json"].map((format) => `<a class="button" href="${scopedApiPath(`/api/seo/reports/export?reportId=${encodeURIComponent(latestReport.id)}&format=${format}`)}">${format}</a>`).join("")}</div>` : '<p class="subtle">Reports state limitations and never claim causation.</p>'}</section><section class="panel"><p class="eyebrow">GA4 readiness</p><h2>Prepared, not activated</h2><p class="subtle">Tracking remains disabled until consent, events, inquiry handoff, privacy, and attribution are approved.</p></section></aside></div>`;
}

function renderSettings() {
  workspace.innerHTML = `${renderHeader("Local controls", "Settings")}
    <div class="two-column"><section class="panel"><h2>Codex usage safeguard</h2><p class="subtle">The SDK uses your saved local Codex sign-in. The CMS strips API-key variables and never configures paid fallback. Codex does not expose an API for this CMS to inspect your account’s credit balance, so generation remains locked until you confirm account-level auto top-up is off.</p>
      <label class="checkbox"><input id="credits-confirmed" type="checkbox" ${state.settings.paidCreditsDisabledAcknowledged ? "checked" : ""}> I confirmed in Codex Settings → Usage that paid credits and auto top-up are disabled.</label>
      <div class="toolbar" style="margin-top:22px"><button class="button primary" data-action="save-settings">Save safeguard</button></div>
    </section><aside><section class="panel"><h2>Project configuration</h2><p><strong>Host:</strong> 127.0.0.1</p><p><strong>Port:</strong> ${state.settings.port}</p><p><strong>Persistence:</strong> project-owned files</p><p><strong>Deployment:</strong> disabled</p>${field("Public site URL", "public-site-url", state.settings.publicSiteUrl || state.project.manifest.publicSiteUrl, { full: true })}${field("Maximum pages per crawl", "crawl-max-pages", state.settings.crawlMaxPages || 250, { type: "number", full: true })}${field("Minimum impressions for opportunities", "opportunity-min-impressions", state.settings.opportunityThresholds?.minimumImpressions || 100, { type: "number", full: true })}${field("Low CTR threshold (%)", "opportunity-ctr", (state.settings.opportunityThresholds?.lowCtr || 0.02) * 100, { type: "number", full: true })}${field("Default reporting period (days)", "reporting-days", state.settings.reportingPeriodDays || 30, { type: "number", full: true })}<p class="subtle">Preview, build, crawl, and validation behaviour comes from the active project's registered adapter.</p></section><section class="panel"><p class="eyebrow">Global local setting</p><h2>Google OAuth</h2>${field("OAuth client ID", "google-client-id", state.settings.googleOAuthClientId || "", { full: true })}${field("OAuth client secret", "google-client-secret", state.settings.googleOAuthClientSecret || "", { type: "password", full: true })}<p class="subtle">Credentials stay in the gitignored local registry and are never exported with project data.</p></section></aside></div>`;
}

function render() {
  if (!state) return;
  if (activeView === "projects") renderProjects();
  else if (activeView === "articles") renderArticles();
  else if (activeView === "editor") renderEditor();
  else if (activeView === "links") renderLinks();
  else if (activeView === "media") renderMedia();
  else if (activeView === "knowledge") renderKnowledge();
  else if (activeView === "voice") renderVoice();
  else if (activeView === "studio") renderStudio();
  else if (activeView === "calendar") renderCalendar();
  else if (activeView === "seo") renderSeo();
  else if (activeView === "help") renderHelp();
  else renderSettings();
  renderHelpDrawer();
}

async function withAction(action) {
  try {
    await action();
  } catch (error) {
    showToast(error.message, true);
    if (error.details) console.error(error.details);
  }
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) return setView(nav.dataset.view);
  const helpError = event.target.closest("[data-help-error]");
  if (helpError) {
    helpSeed = `Explain this validation issue and tell me exactly how to resolve it: ${helpError.dataset.helpError}`;
    helpContextView = activeView;
    helpDrawerOpen = true;
    renderHelpDrawer();
    document.querySelector("#help-drawer-question")?.focus();
    return;
  }
  const helpPrompt = event.target.closest("[data-help-prompt]");
  if (helpPrompt) {
    const input = document.querySelector("#help-question");
    if (input) { input.value = helpPrompt.dataset.helpPrompt; input.focus(); }
    return;
  }
  const drawerPrompt = event.target.closest("[data-drawer-prompt]");
  if (drawerPrompt) {
    const input = document.querySelector("#help-drawer-question");
    if (input) { input.value = drawerPrompt.dataset.drawerPrompt; input.focus(); }
    return;
  }
  const helpHistoryItem = event.target.closest("[data-help-session]");
  if (helpHistoryItem) {
    helpSessionId = helpHistoryItem.dataset.helpSession;
    helpSeed = "";
    renderHelp();
    document.querySelector("#help-messages")?.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const calendarItem = event.target.closest("[data-calendar-item]");
  if (calendarItem) { selectedCalendarId = calendarItem.dataset.calendarItem; return renderCalendar(); }
  const calendarView = event.target.closest("[data-calendar-mode]");
  if (calendarView) { calendarMode = calendarView.dataset.calendarMode; return renderCalendar(); }
  const mediaPageButton = event.target.closest("[data-media-page]");
  if (mediaPageButton) {
    mediaLibraryPage += mediaPageButton.dataset.mediaPage === "next" ? 1 : -1;
    renderMedia();
    document.querySelector(".media-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const filter = event.target.closest("[data-status-filter]");
  if (filter) { statusFilter = filter.dataset.statusFilter; return renderArticles(); }
  const articleSelection = event.target.closest("[data-select-article]");
  if (articleSelection) {
    articleSelection.checked ? selectedArticleSlugs.add(articleSelection.dataset.selectArticle) : selectedArticleSlugs.delete(articleSelection.dataset.selectArticle);
    return renderArticles();
  }
  const selectVisible = event.target.closest("[data-select-visible]");
  if (selectVisible) {
    for (const article of filteredArticles(allArticles())) selectVisible.checked ? selectedArticleSlugs.add(article.slug) : selectedArticleSlugs.delete(article.slug);
    return renderArticles();
  }
  const open = event.target.closest("[data-open-article]");
  if (open) { selectedSlug = open.dataset.openArticle; return setView("editor"); }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  event.preventDefault();
  if (action === "cancel-current") {
    if (!studioBusy || !activeRequestId) return;
    const cancelButton = document.querySelector("#studio-activity-cancel");
    cancelButton.disabled = true;
    cancelButton.textContent = "Cancelling…";
    withAction(async () => {
      const result = await api(`/api/projects/${encodeURIComponent(activeRequestProjectId)}/codex/cancel`, { method: "POST", body: JSON.stringify({ requestId: activeRequestId }) }, { global: true });
      showToast(result.cancelled ? "Codex work cancelled. Nothing was changed." : "This step had already finished.");
    });
    return;
  }
  if (studioActions.has(action) && studioBusy) {
    showToast("Article Studio is already working on the current step.");
    return;
  }
  withAction(async () => {
    if (action === "project-add-reveal" || action === "project-add-cancel") { document.querySelector("#project-connect").hidden = action.endsWith("cancel"); return; }
    if (action === "project-reconnect-cancel") { document.querySelector("#project-reconnect").hidden = true; return; }
    if (action === "project-reconnect-reveal") {
      const form = document.querySelector("#project-reconnect-form");
      form.elements["reconnect-project-id"].value = event.target.dataset.projectId;
      document.querySelector("#project-reconnect").hidden = false;
      document.querySelector("#project-reconnect").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (action === "project-add") {
      const form = new FormData(document.querySelector("#project-add-form"));
      const result = await api("/api/projects/add", { method: "POST", body: JSON.stringify({ root: form.get("project-root"), name: form.get("project-name"), canonicalBaseUrl: form.get("project-canonical"), adapter: form.get("project-adapter") }) }, { global: true });
      activeProjectId = result.id;
      registry = await api("/api/projects", {}, { global: true });
      resetProjectUiState(); await refresh(); renderProjects(); showToast("Project connected without changing its existing files."); return;
    }
    if (action === "project-activate") { await switchProject(event.target.dataset.projectId); return; }
    if (action === "project-reconnect") {
      const form = new FormData(document.querySelector("#project-reconnect-form"));
      await api("/api/projects/reconnect", { method: "POST", body: JSON.stringify({ projectId: form.get("reconnect-project-id"), root: form.get("reconnect-root") }) }, { global: true });
      registry = await api("/api/projects", {}, { global: true }); await refresh(); renderProjects(); showToast("Repository reconnected by immutable project UUID."); return;
    }
    if (action === "project-disconnect") {
      if (!window.confirm("Disconnect this project from the local registry? No project files will be deleted.")) return;
      await api("/api/projects/disconnect", { method: "POST", body: JSON.stringify({ projectId: event.target.dataset.projectId }) }, { global: true });
      registry = await api("/api/projects", {}, { global: true }); renderProjects(); updateProjectChrome(); showToast("Project disconnected. No files were deleted."); return;
    }
    if (action === "project-open-folder") { await api(`/api/projects/${encodeURIComponent(event.target.dataset.projectId)}/open-folder`, { method: "POST", body: "{}" }, { global: true }); showToast("Project folder opened."); return; }
    if (action === "project-validate") { const result = await api(`/api/projects/${encodeURIComponent(event.target.dataset.projectId)}/validate`, {}, { global: true }); showToast(result.valid ? "Project connection and manifest are valid." : "Project validation failed.", !result.valid); return; }
    if (action === "project-export") { const result = await api(`/api/projects/${encodeURIComponent(event.target.dataset.projectId)}/export`, { method: "POST", body: JSON.stringify({ includeOriginals: false }) }, { global: true }); showToast(`Project bundle saved to ${result.file}`); return; }
    if (action === "project-import-inspect" || action === "project-import") {
      const form = new FormData(document.querySelector("#project-import-form"));
      const file = form.get("project-bundle-file");
      if (!file) throw new Error("Enter the absolute project bundle path.");
      if (action === "project-import-inspect") {
        const result = await api("/api/projects/import/inspect", { method: "POST", body: JSON.stringify({ file }) }, { global: true });
        document.querySelector("#project-import-result").innerHTML = `<p><strong>Valid bundle</strong> · ${result.entries.length} files · project ${escapeHtml(result.projectId)} · exported ${formatDate(result.exportedAt)}</p>`;
      } else {
        const root = form.get("project-import-root");
        if (!root) throw new Error("Enter a destination repository path.");
        const result = await api("/api/projects/import", { method: "POST", body: JSON.stringify({ file, root, clone: document.querySelector("#project-import-clone").checked }) }, { global: true });
        activeProjectId = result.projectId; registry = await api("/api/projects", {}, { global: true }); resetProjectUiState(); await refresh(); renderProjects(); showToast(result.cloned ? "Project imported as an isolated clone." : "Project restored with its original UUID.");
      }
      return;
    }
    if (action === "seo-google-connect") { const result = await api("/api/seo/google/start", { method: "POST", body: "{}" }); window.open(result.url, "_blank", "noopener,noreferrer"); return; }
    if (action === "seo-google-sites") { const sites = await api("/api/seo/google/sites"); const target = document.querySelector("#seo-google-properties"); target.innerHTML = `<div class="property-list">${sites.map((site) => `<button class="button" data-action="seo-google-bind" data-property="${escapeHtml(site.siteUrl)}">${escapeHtml(site.siteUrl)} · ${escapeHtml(site.permissionLevel)}</button>`).join("") || "No verified properties returned."}</div>`; return; }
    if (action === "seo-google-bind") { await api("/api/seo/google/bind", { method: "POST", body: JSON.stringify({ property: event.target.dataset.property }) }); await refresh(); renderSeo(); showToast("Search Console property bound to this project."); return; }
    if (action === "seo-google-unbind") { if (!window.confirm("Unbind this Search Console property from the active project? Imported evidence will remain.")) return; await api("/api/seo/google/unbind", { method: "POST", body: "{}" }); await refresh(); renderSeo(); showToast("Search Console property unbound. Existing project evidence was retained."); return; }
    if (action === "seo-google-sync") { await runStudioAction(action, () => api("/api/seo/google/sync", { method: "POST", body: "{}" })); await refresh(); renderSeo(); showToast("Search Console evidence synchronized."); return; }
    if (action === "seo-csv-preview" || action === "seo-csv-commit") { const file = document.querySelector("#seo-csv").files[0]; if (!file) throw new Error("Choose a Search Console CSV first."); const result = await api("/api/seo/search-console/import", { method: "POST", body: JSON.stringify({ csv: await file.text(), commit: action.endsWith("commit") }) }); document.querySelector("#seo-import-result").innerHTML = `<p><strong>${result.added}</strong> new rows · <strong>${result.duplicates}</strong> duplicates${result.committed ? " · imported" : " · preview only"}</p>`; if (result.committed) { await refresh(); renderSeo(); } return; }
    if (action === "seo-crawl") { await runStudioAction(action, () => api("/api/seo/crawl", { method: "POST", body: JSON.stringify({ maxPages: state.settings.crawlMaxPages || 250 }) })); await refresh(); renderSeo(); showToast("Technical audit completed."); return; }
    if (action === "seo-opportunities") { await runStudioAction(action, () => api("/api/seo/opportunities/generate", { method: "POST", body: "{}" })); await refresh(); renderSeo(); showToast("Opportunity queue refreshed from project evidence."); return; }
    if (action === "seo-opportunity-save") { const id = event.target.dataset.opportunityId; const status = document.querySelector(`[data-opportunity-status="${id}"]`).value; await api("/api/seo/opportunities/save", { method: "POST", body: JSON.stringify({ id, status }) }); await refresh(); renderSeo(); showToast("Opportunity status saved."); return; }
    if (action === "seo-opportunity-calendar" || action === "seo-opportunity-studio") {
      const opportunity = state.seo.opportunities.find((item) => item.id === event.target.dataset.opportunityId);
      if (!opportunity || opportunity.status !== "approved") throw new Error("Approve this opportunity before creating project work.");
      if (action === "seo-opportunity-calendar") {
        const item = await api("/api/calendar/item", { method: "POST", body: JSON.stringify({ item: { title: opportunity.proposedAction, status: "planned", targetDate: "", category: "SEO", contentPillar: opportunity.type, articleSlug: "", notes: `${opportunity.observation}\n\nEvidence: ${opportunity.evidenceSource || opportunity.url}\nMetric to monitor: ${opportunity.metricToMonitor || "Review the originating evidence after implementation."}`, proposedInternalLinks: opportunity.url ? [opportunity.url] : [] } }) });
        await api("/api/seo/opportunities/save", { method: "POST", body: JSON.stringify({ id: opportunity.id, status: "scheduled", notes: `Calendar item ${item.id}` }) });
        selectedCalendarId = item.id; await refresh(); setView("calendar"); showToast("Approved opportunity added to this project's calendar."); return;
      }
      studioSeed = { prompt: `Create a grounded article brief for this approved SEO opportunity: ${opportunity.proposedAction}. Evidence: ${opportunity.observation}. Affected URL: ${opportunity.url}. Do not convert measurement evidence into publishable factual claims.`, searchIntent: opportunity.type, category: "SEO" };
      activeJobId = null; setView("studio"); showToast("Approved opportunity transferred into Article Studio for brief review."); return;
    }
    if (action === "seo-annotation-save") { const form = new FormData(document.querySelector("#seo-annotation-form")); await api("/api/seo/annotations/save", { method: "POST", body: JSON.stringify({ title: form.get("annotation-title"), url: form.get("annotation-url"), implementedAt: form.get("annotation-date"), notes: form.get("annotation-notes") }) }); await refresh(); renderSeo(); showToast("Change annotation saved."); return; }
    if (action === "seo-report") { const startDate = document.querySelector('[name="report-start"]')?.value || undefined; const endDate = document.querySelector('[name="report-end"]')?.value || undefined; await runStudioAction(action, () => api("/api/seo/reports/generate", { method: "POST", body: JSON.stringify({ startDate, endDate }) })); await refresh(); renderSeo(); showToast("Project report generated."); return; }
    if (action === "new-article") {
      const article = await api("/api/articles/new", { method: "POST", body: "{}" });
      selectedSlug = article.slug;
      state.drafts.push(article);
      setView("editor");
      return;
    }
    if (action === "article-bulk-clear") {
      selectedArticleSlugs.clear(); renderArticles(); return;
    }
    if (action === "article-bulk-apply") {
      const lifecycleAction = document.querySelector("#article-bulk-action")?.value;
      if (!lifecycleAction) throw new Error("Choose the status to apply.");
      const slugs = [...selectedArticleSlugs];
      const labels = { publish: "published", restore: "draft", archive: "archived", trash: "Trash" };
      if (!window.confirm(`Move ${slugs.length} selected article${slugs.length === 1 ? "" : "s"} to ${labels[lifecycleAction]}? The entire change will stop if any article is blocked.`)) return;
      const result = await api("/api/articles/lifecycle/bulk", { method: "POST", body: JSON.stringify({ slugs, action: lifecycleAction, ...(lifecycleAction === "archive" ? { archiveDisposition: "retain-noindex" } : {}) }) });
      selectedArticleSlugs.clear();
      await refresh(); renderArticles(); showToast(`${result.updated.length} article${result.updated.length === 1 ? "" : "s"} moved to ${labels[lifecycleAction]}.`); return;
    }
    if (["editor-block-add", "editor-block-remove", "editor-block-up", "editor-block-down", "editor-claim-add", "editor-claim-remove"].includes(action)) {
      const article = collectEditorArticle();
      if (action === "editor-block-add") article.content.push({ type: "paragraph", content: [{ text: "" }] });
      if (action.startsWith("editor-block-") && action !== "editor-block-add") {
        const index = [...document.querySelectorAll("[data-content-block]")].indexOf(event.target.closest("[data-content-block]"));
        if (action === "editor-block-remove") article.content.splice(index, 1);
        if (action === "editor-block-up" && index > 0) [article.content[index - 1], article.content[index]] = [article.content[index], article.content[index - 1]];
        if (action === "editor-block-down" && index < article.content.length - 1) [article.content[index + 1], article.content[index]] = [article.content[index], article.content[index + 1]];
      }
      if (action === "editor-claim-add") article.claims.push({ id: `claim-${crypto.randomUUID().slice(0, 8)}`, text: "", status: "editorial", sourceIds: [], note: "" });
      if (action === "editor-claim-remove") {
        const index = [...document.querySelectorAll("[data-claim]")].indexOf(event.target.closest("[data-claim]"));
        article.claims.splice(index, 1);
      }
      replaceSelectedArticleLocally(article); renderEditor(); return;
    }
    if (action === "save-article") {
      const article = collectEditorArticle();
      const result = await api("/api/articles/save", { method: "POST", body: JSON.stringify({ article }) });
      selectedSlug = result.article.slug;
      await refresh(); renderEditor(); showToast("Draft saved with a recoverable revision."); return;
    }
    if (action === "preview") {
      const article = collectEditorArticle();
      const result = await runStudioAction(action, () => api("/api/preview", { method: "POST", body: JSON.stringify({ article }) }));
      window.open(result.url, "_blank", "noopener,noreferrer"); return;
    }
    if (["publish", "trash", "restore"].includes(action)) {
      const result = await api("/api/articles/lifecycle", { method: "POST", body: JSON.stringify({ slug: selectedSlug, action }) });
      selectedSlug = result.article.slug; await refresh(); renderEditor(); showToast(`Article moved to ${result.article.status}.`); return;
    }
    if (action === "archive") {
      const disposition = window.prompt("Type retain-noindex to preserve this URL, or redirect to choose a permanent destination.", "retain-noindex");
      if (!disposition) return;
      const redirectTo = disposition === "redirect" ? window.prompt("Enter a same-site redirect path beginning with /.", "/blog") : undefined;
      const result = await api("/api/articles/lifecycle", { method: "POST", body: JSON.stringify({ slug: selectedSlug, action, archiveDisposition: disposition, redirectTo }) });
      selectedSlug = result.article.slug; await refresh(); renderEditor(); showToast("Article archived safely."); return;
    }
    if (action === "upload-media") {
      const file = document.querySelector("#media-file").files[0];
      if (!file) throw new Error("Choose an image first.");
      const params = new URLSearchParams({ filename: file.name, article: document.querySelector('[name="media-article"]').value, alt: document.querySelector('[name="media-alt"]').value, decorative: String(document.querySelector("#media-decorative").checked), focalX: document.querySelector('[name="focal-x"]').value, focalY: document.querySelector('[name="focal-y"]').value });
      const result = await api(`/api/media?${params}`, { method: "POST", body: await file.arrayBuffer(), headers: { "content-type": file.type } });
      mediaLibraryPage = 1;
      mediaLibrarySearch = "";
      await refresh(); renderMedia(); showToast(`Created ${result.derivatives.length} responsive derivatives and a social crop.`); return;
    }
    if (action === "scan-knowledge") {
      const result = await api("/api/knowledge/scan", { method: "POST", body: "{}" });
      document.querySelector("#knowledge-diff").innerHTML = `<h2>Synchronization review</h2><p><strong>${result.added.length}</strong> added · <strong>${result.removed.length}</strong> removed · <strong>${result.unchanged}</strong> unchanged · <strong>${result.stale.length}</strong> stale · <strong>${result.conflicts.length}</strong> conflicts</p><details><summary>Review additions</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.added.slice(0, 100), null, 2))}</pre></details><details><summary>Review removals</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.removed.slice(0, 100), null, 2))}</pre></details>${result.stale.length ? `<details><summary>Review stale records</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.stale, null, 2))}</pre></details>` : ""}${result.conflicts.length ? `<details><summary>Resolve conflicts</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.conflicts, null, 2))}</pre></details>` : ""}`;
      showToast("Website scan ready for review."); return;
    }
    if (action === "approve-knowledge") { await api("/api/knowledge/approve", { method: "POST", body: "{}" }); await refresh(); renderKnowledge(); showToast("Website knowledge snapshot approved."); return; }
    if (action === "knowledge-add" || action === "knowledge-remove") {
      const records = collectKnowledgeRecords();
      if (action === "knowledge-add") records.push({ id: `manual-${crypto.randomUUID()}`, topic: "", category: "Editorial knowledge", text: "", applicablePages: [], applicableServices: [], applicableEvents: [], source: "", sourceUrl: null, verificationStatus: "pending", effectiveDate: null, reviewDate: null, usage: "internal-background", supersedes: [], conflictsWith: [] });
      else records.splice([...document.querySelectorAll("[data-knowledge-record]")].indexOf(event.target.closest("[data-knowledge-record]")), 1);
      state.knowledge = records; renderKnowledge(); return;
    }
    if (action === "save-knowledge") { const records = collectKnowledgeRecords(); await api("/api/knowledge/save", { method: "POST", body: JSON.stringify({ records }) }); await refresh(); renderKnowledge(); showToast("Supplemental knowledge saved."); return; }
    if (action === "save-voice") { const voice = collectVoiceRules(); await api("/api/voice/save", { method: "POST", body: JSON.stringify({ voice }) }); await refresh(); renderVoice(); showToast("Brand voice rules saved."); return; }
    if (action === "save-settings") { await api("/api/settings/save", { method: "POST", body: JSON.stringify({ settings: { paidCreditsDisabledAcknowledged: document.querySelector("#credits-confirmed").checked, publicSiteUrl: document.querySelector('[name="public-site-url"]').value.trim(), crawlMaxPages: Number(document.querySelector('[name="crawl-max-pages"]').value), opportunityThresholds: { minimumImpressions: Number(document.querySelector('[name="opportunity-min-impressions"]').value), lowCtr: Number(document.querySelector('[name="opportunity-ctr"]').value) / 100 }, reportingPeriodDays: Number(document.querySelector('[name="reporting-days"]').value), googleOAuthClientId: document.querySelector('[name="google-client-id"]').value.trim(), googleOAuthClientSecret: document.querySelector('[name="google-client-secret"]').value } }) }); await refresh(); renderSettings(); showToast("Local settings saved."); return; }
    if (action === "help-drawer-open") { helpContextView = activeView; helpDrawerOpen = true; renderHelpDrawer(); document.querySelector("#help-drawer-question")?.focus(); return; }
    if (action === "help-drawer-close") { helpDrawerOpen = false; renderHelpDrawer(); return; }
    if (action === "help-open-history") {
      helpDrawerOpen = false;
      setView("help");
      requestAnimationFrame(() => document.querySelector("#help-history")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    if (action === "help-open-proposals") {
      helpDrawerOpen = false;
      setView("help");
      requestAnimationFrame(() => document.querySelector("#help-repair-proposals")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    if (action === "help-new") { helpSessionId = "new"; helpSeed = ""; if (helpDrawerOpen) renderHelpDrawer(); else renderHelp(); return; }
    if (action === "help-ask") {
      requireCurrentServer();
      const question = document.querySelector("#help-question").value.trim();
      await runStudioAction(action, async (requestId) => {
        const result = await api("/api/help/ask", { method: "POST", body: JSON.stringify({ question, sessionId: helpSessionId, currentView: helpContextView, articleSlug: selectedSlug, requestId }) });
        helpSessionId = result.sessionId;
        await refresh();
        renderHelp();
      });
      showToast("CMS Help answered your question."); return;
    }
    if (action === "help-ask-drawer") {
      requireCurrentServer();
      const question = document.querySelector("#help-drawer-question").value.trim();
      await runStudioAction(action, async (requestId) => {
        const result = await api("/api/help/ask", { method: "POST", body: JSON.stringify({ question, sessionId: helpSessionId, currentView: helpContextView, articleSlug: selectedSlug, requestId }) });
        helpSessionId = result.sessionId;
        await refresh();
        document.querySelector("#help-drawer-question").value = "";
        renderHelpDrawer();
      });
      showToast("CMS Help answered your question."); return;
    }
    if (action === "help-repair" || action === "help-repair-feedback") {
      requireCurrentServer();
      if (!currentHelpSession()) throw new Error("Ask CMS Help to diagnose the issue first.");
      const proposalId = event.target.closest("[data-proposal-id]")?.dataset.proposalId;
      const feedback = proposalId ? document.querySelector(`[data-proposal-feedback="${proposalId}"] textarea`)?.value.trim() : "";
      await runStudioAction(action, async (requestId) => {
        await api("/api/help/repair", { method: "POST", body: JSON.stringify({ sessionId: helpSessionId, proposalId, feedback, articleSlug: selectedSlug, currentView: helpContextView, requestId }) });
        await refresh();
        if (helpDrawerOpen) renderHelpDrawer(); else renderHelp();
      });
      showToast(proposalId ? "Repair proposal revised for review." : "Repair proposal ready for review."); return;
    }
    if (action === "help-repair-accept" || action === "help-repair-decline") {
      requireCurrentServer();
      const proposalId = event.target.closest("[data-proposal-id]").dataset.proposalId;
      const decision = action === "help-repair-accept" ? "accept" : "decline";
      const execute = async () => {
        const result = await api("/api/help/repair/decision", { method: "POST", body: JSON.stringify({ sessionId: helpSessionId, proposalId, decision }) });
        if (result.result?.article?.slug) selectedSlug = result.result.article.slug;
        await refresh();
        render();
        showToast(decision === "accept" ? "Approved repair applied and validated." : "Repair proposal declined.");
      };
      if (decision === "accept") await runStudioAction(action, execute); else await execute();
      return;
    }
    if (action === "calendar-new") { selectedCalendarId = null; renderCalendar(); document.querySelector('[name="calendar-title"]')?.focus(); return; }
    if (action === "calendar-prev" || action === "calendar-next") { moveCalendarMonth(action === "calendar-prev" ? -1 : 1); renderCalendar(); return; }
    if (action === "calendar-save") {
      requireCurrentServer();
      const form = new FormData(document.querySelector("#calendar-item-form"));
      const item = {
        id: form.get("calendar-id") || undefined,
        title: form.get("calendar-title"), status: form.get("calendar-status"), targetDate: form.get("calendar-date"),
        category: form.get("calendar-category"), contentPillar: form.get("calendar-pillar"), audience: form.get("calendar-audience"),
        searchIntent: form.get("calendar-intent"), campaign: form.get("calendar-campaign"), articleSlug: form.get("calendar-slug"), notes: form.get("calendar-notes"),
        proposedInternalLinks: form.get("calendar-links").split("\n").map((value) => value.trim()).filter(Boolean),
      };
      const result = await api("/api/calendar/item", { method: "POST", body: JSON.stringify({ item }) });
      selectedCalendarId = result.id; await refresh(); renderCalendar(); showToast("Calendar item saved."); return;
    }
    if (action === "calendar-delete") {
      requireCurrentServer();
      if (!window.confirm("Delete this calendar item? This does not delete any article.")) return;
      await api("/api/calendar/delete", { method: "POST", body: JSON.stringify({ id: selectedCalendarId }) });
      selectedCalendarId = null; await refresh(); renderCalendar(); showToast("Calendar item deleted."); return;
    }
    if (action === "calendar-delete-proposal") {
      const id = event.target.dataset.proposalId;
      const proposal = state.calendarProposals.find((candidate) => candidate.id === id);
      if (!proposal) throw new Error("Calendar proposal not found.");
      const message = proposal.status === "approved" ? "Remove this proposal from planning history? Existing calendar items remain and can be removed individually." : "Remove this unapproved proposal from planning history?";
      if (!window.confirm(message)) return;
      await api("/api/calendar/proposal/delete", { method: "POST", body: JSON.stringify({ id }) });
      await refresh(); renderCalendar(); showToast("Calendar proposal removed from history."); return;
    }
    if (action === "calendar-config-save") {
      requireCurrentServer();
      const form = new FormData(document.querySelector("#calendar-config-form"));
      let categoryTargets, campaignPeriods;
      try { categoryTargets = JSON.parse(form.get("category-targets")); } catch { throw new Error("Category targets must be valid JSON."); }
      try { campaignPeriods = JSON.parse(form.get("campaign-periods")); } catch { throw new Error("Campaign periods must be valid JSON."); }
      const config = {
        cadencePerMonth: Math.max(1, Number(form.get("cadence")) || 1), planningLeadDays: Math.max(0, Number(form.get("lead-days")) || 0), defaultCategory: form.get("default-category").trim(),
        statuses: form.get("calendar-statuses").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean), preferredWeekdays: form.getAll("weekday"),
        blackoutDates: form.get("blackout-dates").split("\n").map((value) => value.trim()).filter(Boolean), categoryTargets, campaignPeriods,
      };
      await api("/api/calendar/config", { method: "POST", body: JSON.stringify({ config }) }); await refresh(); renderCalendar(); showToast("Calendar preferences saved."); return;
    }
    if (action === "calendar-propose") {
      requireCurrentServer();
      const prompt = document.querySelector("#calendar-prompt").value.trim();
      await runStudioAction(action, async () => { await api("/api/calendar/propose", { method: "POST", body: JSON.stringify({ prompt, startDate: `${calendarMonth}-01` }) }); await refresh(); renderCalendar(); });
      showToast("Calendar proposal is ready for review."); return;
    }
    if (action === "calendar-approve-proposal") {
      requireCurrentServer();
      await api("/api/calendar/approve", { method: "POST", body: JSON.stringify({ id: event.target.closest("[data-proposal-id]").dataset.proposalId }) });
      await refresh(); renderCalendar(); showToast("Approved ideas were added as planned work."); return;
    }
    if (action === "calendar-to-studio") {
      const item = state.calendar.find((candidate) => candidate.id === selectedCalendarId);
      if (!item) throw new Error("Choose a calendar item first.");
      studioSeed = { prompt: `Create a grounded Luxe Journal article titled “${item.title}”. ${item.notes}`.trim(), audience: item.audience, searchIntent: item.searchIntent, category: item.category };
      activeJobId = null; setView("studio"); return;
    }
    if (action === "studio-brief") {
      const prompt = document.querySelector("#studio-prompt").value.trim();
      if (!prompt) throw new Error("Describe the article you want to create.");
      const inputs = { audience: document.querySelector('[name="studio-audience"]').value, searchIntent: document.querySelector('[name="studio-intent"]').value, category: document.querySelector('[name="studio-category"]').value, geography: document.querySelector('[name="studio-geography"]').value };
      await runStudioAction(action, async () => { const job = await api("/api/studio/brief", { method: "POST", body: JSON.stringify({ prompt, inputs }) }); activeJobId = job.id; studioSeed = null; await refresh(); renderStudio(); }); showToast("Grounded brief is ready for review."); return;
    }
    if (["outline-add", "outline-remove", "outline-up", "outline-down"].includes(action)) {
      const job = state.jobs.find((candidate) => candidate.id === activeJobId);
      const outline = collectOutlineReview();
      if (action === "outline-add") outline.sections.push({ heading: "New section", purpose: "", sourceIds: [] });
      else {
        const index = [...document.querySelectorAll("[data-outline-section]")].indexOf(event.target.closest("[data-outline-section]"));
        if (action === "outline-remove") outline.sections.splice(index, 1);
        if (action === "outline-up" && index > 0) [outline.sections[index - 1], outline.sections[index]] = [outline.sections[index], outline.sections[index - 1]];
        if (action === "outline-down" && index < outline.sections.length - 1) [outline.sections[index + 1], outline.sections[index]] = [outline.sections[index], outline.sections[index + 1]];
      }
      job.outline = outline; renderStudio(); return;
    }
    if (action === "approve-brief" || action === "approve-outline") { const stage = action === "approve-brief" ? "brief" : "outline"; const value = stage === "brief" ? collectBriefReview() : collectOutlineReview(); await runStudioAction(action, async () => { await api("/api/studio/approve", { method: "POST", body: JSON.stringify({ jobId: activeJobId, stage, value }) }); await refresh(); renderStudio(); }); showToast(`${stage} approved.`); return; }
    if (action === "studio-outline" || action === "studio-draft") { const stage = action === "studio-outline" ? "outline" : "draft"; await runStudioAction(action, async () => { await api(`/api/studio/${stage}`, { method: "POST", body: JSON.stringify({ jobId: activeJobId }) }); await refresh(); renderStudio(); }); showToast(stage === "outline" ? "Outline is ready for approval." : "Review-only draft created."); return; }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && helpDrawerOpen) {
    helpDrawerOpen = false;
    renderHelpDrawer();
    document.querySelector(".help-launcher")?.focus();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "help-drawer-form") event.preventDefault();
});

document.addEventListener("change", (event) => {
  if (event.target.id === "project-switcher") {
    withAction(() => switchProject(event.target.value));
    return;
  }
  if (event.target.id === "media-target-article") {
    mediaTargetSlug = event.target.value || null;
    renderMedia();
    const article = selectedMediaArticle();
    if (article) showToast(`Media target changed to “${article.title}”.`);
    return;
  }
  if (event.target.id === "knowledge-usage-filter") {
    knowledgeUsageFilter = event.target.value;
    renderKnowledge();
    return;
  }
  if (event.target.matches("[data-block-type]")) {
    const article = collectEditorArticle();
    replaceSelectedArticleLocally(article);
    renderEditor();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "media-library-search") {
    const value = event.target.value;
    clearTimeout(mediaSearchTimer);
    mediaSearchTimer = setTimeout(() => {
      mediaLibrarySearch = value;
      mediaLibraryPage = 1;
      renderMedia();
      const search = document.querySelector("#media-library-search");
      search?.focus();
      search?.setSelectionRange(search.value.length, search.value.length);
    }, 180);
    return;
  }
  if (event.target.id === "knowledge-search") {
    const value = event.target.value;
    clearTimeout(knowledgeSearchTimer);
    knowledgeSearchTimer = setTimeout(() => {
      knowledgeSearch = value;
      renderKnowledge();
      const search = document.querySelector("#knowledge-search");
      search?.focus();
      search?.setSelectionRange(search.value.length, search.value.length);
    }, 180);
  }
});

document.addEventListener("click", (event) => {
  const mediaButton = event.target.closest("[data-use-media]");
  if (!mediaButton) return;
  withAction(async () => {
    const article = selectedMediaArticle();
    const asset = state.media.find((candidate) => candidate.id === mediaButton.dataset.mediaId);
    if (!article || !asset) throw new Error("Select an article and media asset.");
    const next = { ...article };
    const action = mediaButton.dataset.useMedia;
    if (action === "hero") { next.heroImage = asset.hero; next.heroAlt = asset.alt; }
    else if (action === "social") next.socialImage = asset.social;
    else if (action === "remove-hero") { next.heroImage = null; next.heroAlt = ""; }
    else if (action === "remove-social") next.socialImage = null;
    else throw new Error("Unknown media assignment action.");
    await api("/api/articles/save", { method: "POST", body: JSON.stringify({ article: next }) });
    await refresh();
    renderMedia();
    const messages = {
      hero: `Hero assigned to “${article.title}”.`,
      social: `Social preview assigned to “${article.title}”.`,
      "remove-hero": `Hero removed from “${article.title}”.`,
      "remove-social": `Social preview removed from “${article.title}”.`,
    };
    showToast(messages[action]);
  });
});

async function initialize() {
  try {
    const session = await api("/api/session", {}, { global: true });
    token = session.token;
    registry = session.registry;
    const requestedProject = new URLSearchParams(location.search).get("project");
    activeProjectId = registry.projects.some((project) => project.projectId === requestedProject) ? requestedProject : registry.activeProjectId;
    if (activeProjectId !== registry.activeProjectId) await api("/api/projects/activate", { method: "POST", body: JSON.stringify({ projectId: activeProjectId }) }, { global: true });
    await refresh();
    selectedSlug = state.drafts[0]?.slug || state.published[0]?.slug || null;
    if (!state.project.adapter.capabilities.includes("articles")) activeView = "seo";
    render();
  } catch (error) {
    workspace.innerHTML = `<section class="panel"><h1>CMS unavailable</h1><p>${escapeHtml(error.message)}</p></section>`;
  }
}

initialize();
