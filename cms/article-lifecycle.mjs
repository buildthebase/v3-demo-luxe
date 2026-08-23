import { buildLinkGraph, validateArticle } from "./core.mjs";

export function transitionArticleStatus(article, action, options = {}) {
  if (!article) throw Object.assign(new Error("Article not found."), { status: 404 });
  if (action === "publish") return { ...article, status: "published", archiveDisposition: undefined, redirectTo: undefined };
  if (action === "archive") {
    const disposition = options.archiveDisposition;
    if (!["retain-noindex", "redirect"].includes(disposition)) throw Object.assign(new Error("Choose an archive URL disposition."), { status: 422 });
    if (disposition === "redirect" && options.redirectTo === `/blog/${article.slug}`) throw Object.assign(new Error(`“${article.title}” cannot redirect to itself.`), { status: 422 });
    if (disposition === "redirect" && !String(options.redirectTo || "").startsWith("/")) throw Object.assign(new Error(`“${article.title}” requires a same-site redirect path beginning with /.`), { status: 422 });
    return { ...article, status: "archived", archiveDisposition: disposition, redirectTo: disposition === "redirect" ? options.redirectTo : undefined };
  }
  if (action === "trash") {
    if (article.status === "published") throw Object.assign(new Error(`Archive “${article.title}” before moving it to Trash.`), { status: 409 });
    if (article.status === "archived" && article.archiveDisposition === "retain-noindex") throw Object.assign(new Error(`Assign a redirect to “${article.title}” before moving its retained URL to Trash.`), { status: 409 });
    return { ...article, status: "trash" };
  }
  if (action === "restore") {
    if (article.status === "published") throw Object.assign(new Error(`Archive “${article.title}” before returning it to Draft.`), { status: 409 });
    return { ...article, status: "draft", archiveDisposition: undefined, redirectTo: undefined };
  }
  throw Object.assign(new Error("Unknown lifecycle action."), { status: 400 });
}

export function prepareBulkLifecycle(articles, slugs, action, options = {}) {
  const uniqueSlugs = [...new Set((slugs || []).map(String).filter(Boolean))];
  if (!uniqueSlugs.length) throw Object.assign(new Error("Select at least one article."), { status: 422 });
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const missing = uniqueSlugs.filter((slug) => !bySlug.has(slug));
  if (missing.length) throw Object.assign(new Error(`Selected article not found: ${missing.join(", ")}`), { status: 404 });
  const selected = new Set(uniqueSlugs);
  const changedAt = options.modifiedDate || new Date().toISOString();
  const next = articles.map((article) => selected.has(article.slug)
    ? { ...transitionArticleStatus(article, action, options), modifiedDate: changedAt }
    : article);
  const graph = buildLinkGraph(next, options.knownPaths || []);
  const issues = Object.fromEntries(uniqueSlugs.map((slug) => {
    const article = next.find((candidate) => candidate.slug === slug);
    return [slug, validateArticle(article, next, { voice: options.voice || {}, knownPaths: options.knownPaths || [], graph })];
  }));
  const blocked = uniqueSlugs.flatMap((slug) => issues[slug].filter((issue) => issue.severity === "error").map((issue) => ({ slug, title: bySlug.get(slug).title, ...issue })));
  if (action === "publish" && blocked.length) {
    const titles = [...new Set(blocked.map((issue) => issue.title))];
    throw Object.assign(new Error(`Bulk publishing blocked by ${titles.length} article${titles.length === 1 ? "" : "s"}: ${titles.join("; ")}.`), { status: 422, details: blocked });
  }
  return { articles: next, updated: uniqueSlugs.map((slug) => next.find((article) => article.slug === slug)), issues };
}
