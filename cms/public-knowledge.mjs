import crypto from "node:crypto";
import projectManifest from "../cms-project.json" with { type: "json" };

const BLOCK_BREAK = /<\/?(?:address|article|aside|blockquote|br|dd|div|dl|dt|figcaption|figure|footer|h[1-6]|header|hr|li|main|nav|ol|p|section|table|tbody|td|tfoot|th|thead|tr|ul)\b[^>]*>/gi;

function decodeHtml(value) {
  const named = {
    amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
    ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘",
    rdquo: "”", ldquo: "“",
  };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code[0] === "#") {
      const numeric = code[1].toLowerCase() === "x" ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(numeric) ? String.fromCodePoint(numeric) : entity;
    }
    return named[code.toLowerCase()] ?? entity;
  });
}

export function publicPathsFromMetadata(source) {
  const section = source.match(/export\s+const\s+pageMetadata\s*=\s*\{([\s\S]*?)\n\};/)?.[1] || source;
  return [...section.matchAll(/^\s*["'](\/[^"']*)["']\s*:\s*\{/gm)].map((match) => match[1]);
}

export function collectPublicPaths({ metadataSource = "", staticPaths = [], publishedSlugs = [] } = {}) {
  const paths = [
    ...publicPathsFromMetadata(metadataSource),
    ...staticPaths.filter((route) => route && !route.startsWith("/preview")),
    ...publishedSlugs.map((slug) => `/blog/${slug}`),
  ];
  return [...new Set(paths.map((route) => route === "/" ? route : route.replace(/\/$/, "")))].sort();
}

export function extractPublicPageRecords(html, route, canonicalOrigin = projectManifest.canonicalBaseUrl) {
  const withoutPrivateMarkup = String(html)
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const main = withoutPrivateMarkup.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    || withoutPrivateMarkup.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    || withoutPrivateMarkup;
  const chunks = decodeHtml(main.replace(BLOCK_BREAK, "\n").replace(/<[^>]+>/g, " "))
    .split(/\n+/)
    .map((text) => text.replace(/\s+/g, " ").trim())
    .filter((text) => text.length >= 3 && text.length <= 1200)
    .filter((text) => !/^(menu|home|contact|instagram|on this page)$/i.test(text));
  const unique = [...new Set(chunks.map((text) => text.toLowerCase()))]
    .map((lower) => chunks.find((text) => text.toLowerCase() === lower));
  const topic = route === "/" ? "Experiences by Luxe" : route.split("/").filter(Boolean).at(-1).replaceAll("-", " ");
  const category = route.startsWith("/blog/") ? "Published blog article" : "Public page content";
  const sourceUrl = `${canonicalOrigin.replace(/\/$/, "")}${route}`;
  return unique.map((text) => {
    const digest = crypto.createHash("sha256").update(`${route}:${text}`).digest("hex").slice(0, 16);
    return {
      id: `public-${digest}`,
      origin: "public-page",
      topic,
      category,
      text,
      applicablePages: [route],
      applicableServices: [],
      applicableEvents: [],
      source: route,
      sourceUrl,
      verificationStatus: "verified",
      effectiveDate: null,
      reviewDate: null,
      usage: "publishable",
      supersedes: [],
      conflictsWith: [],
    };
  });
}

export function isPublicSnapshot(snapshot) {
  return snapshot?.sourcePolicy === "public-rendered-content-only";
}

export function publicSnapshotRecords(snapshot) {
  if (!isPublicSnapshot(snapshot)) return [];
  return (snapshot.records || []).filter((record) => record.origin === "public-page");
}
