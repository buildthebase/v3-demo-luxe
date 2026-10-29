import path from "node:path";

export const ARTICLE_STATUSES = ["draft", "published", "archived", "trash"];
export const CLEAN_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const CLIENT_ARTICLE_WORD_RANGE = { minimum: 700, maximum: 1200 };
export const MINIMUM_SUBSTANTIVE_ARTICLE_WORDS = 250;

const PLACEHOLDER_CONTENT_PATTERNS = [
  { label: "Lorem Ipsum", pattern: /\blorem\s+ipsum\b/i },
  { label: "placeholder copy", pattern: /\bplaceholder\s+(?:copy|content|text)\b/i },
  { label: "dummy text", pattern: /\bdummy\s+text\b/i },
  { label: "sample copy", pattern: /\bsample\s+copy\b/i },
  { label: "coming soon", pattern: /\bcoming\s+soon\b/i },
  { label: "TODO/TBD marker", pattern: /(?:^|\s)(?:TODO|TBD)(?=\s|:|$)/ },
];

export function flattenTextParts(parts = []) {
  return parts.map((part) => part?.text || "").join(" ").trim();
}

export function parseInlineInternalLinks(value = "") {
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

export function flattenArticle(article) {
  const blocks = Array.isArray(article?.content) ? article.content : [];
  const body = blocks.flatMap((block) => {
    if (["paragraph", "callout", "quick-answer"].includes(block.type)) return [flattenTextParts(block.content)];
    if (block.type === "heading") return [block.text || ""];
    if (block.type === "list" || block.type === "key-takeaways") return (block.items || []).map(flattenTextParts);
    if (block.type === "quote") return [block.quote || "", block.attribution || ""];
    if (block.type === "image") return [block.alt || "", block.caption || ""];
    if (block.type === "table") return [block.caption || "", ...(block.headers || []), ...(block.rows || []).flat()];
    return [];
  });
  return [article?.title, article?.slug, article?.category, article?.excerpt, article?.description, ...body]
    .filter(Boolean)
    .join(" ");
}

export function articleBodyWordCount(article) {
  const bodyOnly = { ...article, title: "", slug: "", category: "", excerpt: "", description: "" };
  return flattenArticle(bodyOnly).match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function extractInternalLinks(article) {
  const links = [];
  const visitParts = (parts, location) => {
    for (const part of parts || []) {
      if (typeof part?.href === "string" && part.href.startsWith("/")) {
        links.push({ href: part.href.split("#")[0], label: part.text || part.href, location });
      }
    }
  };
  for (const [index, block] of (article?.content || []).entries()) {
    if (["paragraph", "callout", "quick-answer"].includes(block.type)) visitParts(block.content, `block ${index + 1}`);
    if (block.type === "list" || block.type === "key-takeaways") {
      for (const item of block.items || []) visitParts(item, `block ${index + 1}`);
    }
  }
  for (const slug of article?.relatedArticleSlugs || []) {
    links.push({ href: `/blog/${slug}`, label: slug, location: "related articles", relationship: "related" });
  }
  return links;
}

export function buildLinkGraph(articles, knownPaths = []) {
  const known = new Set(knownPaths);
  for (const article of articles) known.add(`/blog/${article.slug}`);
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const outgoingBySlug = {};
  const incomingBySlug = {};
  for (const article of articles) incomingBySlug[article.slug] = { published: [], drafts: [] };

  for (const article of articles) {
    const outgoing = extractInternalLinks(article).map((link) => ({ ...link, valid: known.has(link.href) }));
    outgoingBySlug[article.slug] = outgoing;
    for (const link of outgoing) {
      const match = link.href.match(/^\/blog\/([^/]+)$/);
      if (!match || !bySlug.has(match[1]) || match[1] === article.slug) continue;
      const bucket = article.status === "published" ? "published" : "drafts";
      incomingBySlug[match[1]][bucket].push({ slug: article.slug, title: article.title, location: link.location });
    }
  }

  const graph = {};
  for (const article of articles) {
    const incoming = incomingBySlug[article.slug] || { published: [], drafts: [] };
    graph[article.slug] = {
      outgoing: outgoingBySlug[article.slug] || [],
      incoming,
      related: (article.relatedArticleSlugs || []).map((slug) => ({ slug, exists: bySlug.has(slug) })),
      orphan: article.status === "published" && incoming.published.length === 0,
    };
  }
  return graph;
}

function issue(severity, code, message, field) {
  return { severity, code, message, ...(field ? { field } : {}) };
}

export function validateArticle(article, allArticles, { voice = {}, knownPaths = [], graph } = {}) {
  const issues = [];
  const required = ["slug", "title", "seoTitle", "description", "excerpt", "category", "publishDate", "modifiedDate"];
  for (const field of required) {
    if (!String(article?.[field] || "").trim()) issues.push(issue("error", "required", `${field} is required.`, field));
  }
  if (article?.slug && !CLEAN_SLUG.test(article.slug)) issues.push(issue("error", "slug", "Use lowercase words separated by single hyphens.", "slug"));
  for (const field of ["slug", "seoTitle", "description"]) {
    const duplicate = allArticles.find((candidate) => candidate.slug !== article.slug && String(candidate[field] || "").trim().toLowerCase() === String(article[field] || "").trim().toLowerCase());
    if (duplicate) issues.push(issue("error", `duplicate-${field}`, `${field} duplicates “${duplicate.title}”.`, field));
  }
  if (!Number.isFinite(Date.parse(article?.publishDate))) issues.push(issue("error", "publish-date", "Publish date must be a valid ISO date.", "publishDate"));
  if (!Number.isFinite(Date.parse(article?.modifiedDate))) issues.push(issue("error", "modified-date", "Modified date must be a valid ISO date.", "modifiedDate"));
  if (article?.status === "archived" && !article.archiveDisposition) issues.push(issue("error", "archive-disposition", "Choose retain-noindex or redirect before archiving."));
  if (article?.archiveDisposition === "redirect" && (!article.redirectTo || !article.redirectTo.startsWith("/") || article.redirectTo.startsWith("//"))) issues.push(issue("error", "redirect", "Choose a clean same-site redirect destination."));
  if (article?.archiveDisposition === "redirect" && article.redirectTo === `/blog/${article.slug}`) issues.push(issue("error", "redirect-self", "An archived article cannot redirect to itself."));

  const bodyWordCount = articleBodyWordCount(article);
  const bodyText = flattenArticle({ ...article, title: "", slug: "", category: "", excerpt: "", description: "" });
  const placeholder = PLACEHOLDER_CONTENT_PATTERNS.find(({ pattern }) => pattern.test(bodyText));
  if (placeholder) issues.push(issue("error", "placeholder-content", `Remove ${placeholder.label} before publishing.`, "content"));
  if (bodyWordCount === 0) {
    issues.push(issue("error", "empty-body", "Add a complete customer-facing article body before publishing.", "content"));
  } else if (bodyWordCount < MINIMUM_SUBSTANTIVE_ARTICLE_WORDS) {
    const approvedShortForm = article.editorialApproval?.shortForm === true
      && typeof article.editorialApproval.note === "string"
      && article.editorialApproval.note.trim().length > 0;
    issues.push(approvedShortForm
      ? issue("warning", "approved-short-form", `This ${bodyWordCount}-word article has explicit editorial approval for its short format.`, "content")
      : issue("error", "thin-body", `Article body has ${bodyWordCount} words; at least ${MINIMUM_SUBSTANTIVE_ARTICLE_WORDS} substantive words are required before publishing.`, "content"));
  }
  if (!article?.heroImage?.src) issues.push(issue("error", "missing-hero-image", "Assign approved article photography as the hero image before publishing.", "heroImage"));
  if (bodyWordCount >= MINIMUM_SUBSTANTIVE_ARTICLE_WORDS && bodyWordCount < CLIENT_ARTICLE_WORD_RANGE.minimum) {
    issues.push(issue("warning", "article-length", `Article body has ${bodyWordCount} words; the client-requested direction is approximately ${CLIENT_ARTICLE_WORD_RANGE.minimum}–${CLIENT_ARTICLE_WORD_RANGE.maximum} useful words when the topic supports it.`, "content"));
  } else if (bodyWordCount > CLIENT_ARTICLE_WORD_RANGE.maximum) {
    issues.push(issue("warning", "article-length", `Article body has ${bodyWordCount} words, above the client-requested ${CLIENT_ARTICLE_WORD_RANGE.minimum}–${CLIENT_ARTICLE_WORD_RANGE.maximum} word direction. Keep the additional length only when it remains useful.`, "content"));
  }

  let hasH2 = false;
  for (const [index, block] of (article?.content || []).entries()) {
    if (block.type === "heading" && block.level === 2) hasH2 = true;
    if (block.type === "heading" && block.level === 3 && !hasH2) issues.push(issue("error", "heading-order", `H3 at block ${index + 1} appears before an H2.`));
    if (block.type === "image") {
      if (!block.image?.width || !block.image?.height) issues.push(issue("error", "image-dimensions", `Image at block ${index + 1} requires dimensions.`));
      if (!block.alt && block.image?.alt !== "") issues.push(issue("error", "image-alt", `Image at block ${index + 1} requires alt text or an explicit decorative designation.`));
    }
    if (block.type === "heading") {
      const next = article.content[index + 1];
      if (next?.type === "paragraph" && flattenTextParts(next.content).split(/\s+/).length > 95) {
        issues.push(issue("warning", "concise-answer", `The answer after “${block.text}” could be more concise.`));
      }
    }
    const textParts = [
      ...(["paragraph", "callout", "quick-answer"].includes(block.type) ? (block.content || []) : []),
      ...(["list", "key-takeaways"].includes(block.type) ? (block.items || []).flat() : []),
    ];
    if (textParts.some((part) => /\[[^\]\n]+\]\(\/(?!\/)[^)\s]+\)/.test(part?.text || ""))) {
      issues.push(issue("error", "inline-link-syntax", `Block ${index + 1} contains a raw Markdown internal link. Convert it to a structured article link before publishing.`));
    }
  }
  if (!(article?.content || []).some((block) => block.type === "quick-answer")) issues.push(issue("warning", "quick-answer", "Consider adding a Quick Answer block."));
  if (!(article?.content || []).some((block) => block.type === "key-takeaways")) issues.push(issue("warning", "key-takeaways", "Consider adding Key Takeaways."));

  const articleText = flattenArticle(article).toLowerCase();
  for (const excluded of voice.excludedWords || []) {
    if (excluded && articleText.includes(excluded.toLowerCase())) issues.push(issue("error", "excluded-language", `Remove excluded language: “${excluded}”.`));
  }
  for (const claim of voice.prohibitedClaims || []) {
    if (claim && articleText.includes(claim.toLowerCase())) issues.push(issue("error", "prohibited-claim", `Remove prohibited claim: “${claim}”.`));
  }
  for (const claim of article?.claims || []) {
    if (["inferred", "unverified"].includes(claim.status)) issues.push(issue("error", "claim-status", `Resolve claim “${claim.text}” before publishing.`));
    if (claim.status === "grounded" && !(claim.sourceIds || []).length) issues.push(issue("error", "claim-source", `Grounded claim “${claim.text}” needs a source.`));
  }

  const localGraph = graph || buildLinkGraph(allArticles, knownPaths);
  for (const link of localGraph[article?.slug]?.outgoing || []) {
    if (!link.valid) issues.push(issue("error", "broken-link", `Internal link ${link.href} does not resolve.`));
  }
  if (localGraph[article?.slug]?.orphan) issues.push(issue("warning", "orphan", "No other published article links to this article."));
  return issues;
}

export function searchArticles(articles, query) {
  const terms = String(query || "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return articles;
  return articles.filter((article) => {
    const haystack = flattenArticle(article).toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function createEmptyArticle() {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    slug: "new-article",
    title: "New article",
    seoTitle: "New article | Luxe Event Co.",
    description: "",
    excerpt: "",
    category: "Event Planning",
    publishDate: now,
    modifiedDate: now,
    author: { name: "Luxe Event Co.", type: "Organization", url: "https://luxeeventco.ca" },
    heroImage: null,
    heroAlt: "",
    socialImage: null,
    content: [],
    relatedArticleSlugs: [],
    status: "draft",
    claims: [],
    generation: null,
  };
}

export function routeFromPageFile(root, file) {
  let relative = path.relative(path.join(root, "app"), file).replaceAll(path.sep, "/");
  if (/^page\.(tsx|ts|jsx|js)$/.test(relative)) return "/";
  relative = relative.replace(/\/page\.(tsx|ts|jsx|js)$/, "");
  if (relative.includes("[") || relative.startsWith("components/")) return null;
  return `/${relative}`;
}
