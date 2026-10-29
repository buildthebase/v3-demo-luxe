import type { ResponsiveImageAsset } from "../image-system";
import publishedArticlesJson from "../../content/blog/published/articles.json";
import archivedArticlesJson from "../../content/blog/archived/articles.json";

export type BlogArticleStatus = "draft" | "published" | "archived" | "trash";
export type BlogArchiveDisposition = "retain-noindex" | "redirect";
export type BlogClaimStatus = "grounded" | "editorial" | "inferred" | "unverified";

export type BlogArticleAuthor = {
  name: string;
  type: "Organization" | "Person";
  url?: string;
};

export type BlogArticleText = {
  text: string;
  href?: string;
  action?: "quote";
  emphasis?: "strong" | "emphasis";
};

export type BlogArticleContentBlock =
  | { type: "paragraph"; content: readonly BlogArticleText[] }
  | { type: "heading"; id: string; level: 2 | 3; text: string }
  | { type: "list"; style: "ordered" | "unordered"; items: readonly (readonly BlogArticleText[])[] }
  | { type: "quote"; quote: string; attribution?: string }
  | { type: "image"; image: ResponsiveImageAsset; alt: string; caption?: string }
  | { type: "callout"; title?: string; content: readonly BlogArticleText[] }
  | { type: "quick-answer"; title?: string; content: readonly BlogArticleText[] }
  | { type: "key-takeaways"; title?: string; items: readonly (readonly BlogArticleText[])[] }
  | { type: "table"; caption?: string; headers: readonly string[]; rows: readonly (readonly string[])[] };

export type BlogArticleClaim = {
  id: string;
  text: string;
  status: BlogClaimStatus;
  sourceIds: readonly string[];
  note?: string;
};

export type BlogArticleGeneration = {
  threadId: string;
  stage: "brief" | "outline" | "draft" | "review";
  model: string;
  createdAt: string;
  updatedAt: string;
  knowledgeSnapshot: string;
  voiceVersion: string;
  usage: {
    inputTokens: number;
    cachedInputTokens: number;
    outputTokens: number;
    reasoningOutputTokens: number;
  };
  briefApprovedAt?: string;
  outlineApprovedAt?: string;
};

export type BlogArticle = {
  schemaVersion: number;
  slug: string;
  title: string;
  titleLines?: readonly string[];
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  publishDate: string;
  modifiedDate: string;
  author: BlogArticleAuthor;
  heroImage: ResponsiveImageAsset | null;
  heroDesktopImage?: ResponsiveImageAsset | null;
  heroImageSources?: readonly {
    media: string;
    type: string;
    srcSet: string;
    sizes: string;
    width: number;
    height: number;
  }[];
  heroAlt: string;
  showPlanningLinks?: boolean;
  editorialApproval?: { shortForm: boolean; note: string };
  socialImage?: ResponsiveImageAsset | null;
  content: readonly BlogArticleContentBlock[];
  relatedArticleSlugs: readonly string[];
  status: BlogArticleStatus;
  archiveDisposition?: BlogArchiveDisposition;
  redirectTo?: string;
  claims?: readonly BlogArticleClaim[];
  generation?: BlogArticleGeneration | null;
};

export type BlogArticleValidationIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

const publishedArticles = publishedArticlesJson as unknown as readonly BlogArticle[];
const archivedArticles = archivedArticlesJson as unknown as readonly BlogArticle[];

export const blogArticles: readonly BlogArticle[] = publishedArticles;

const cleanBlogSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("en-CA");
}

export function validateBlogArticles(articles: readonly BlogArticle[]) {
  const issues = new Map<string, BlogArticleValidationIssue[]>();
  const seenByField = new Map<string, Map<string, string>>();

  for (const field of ["slug", "seoTitle", "description"] as const) {
    seenByField.set(field, new Map());
  }

  for (const article of articles) {
    const articleIssues: BlogArticleValidationIssue[] = [];
    if (!cleanBlogSlugPattern.test(article.slug)) {
      articleIssues.push({ severity: "error", code: "slug", message: "Slug must contain lowercase words separated by hyphens." });
    }
    if (!article.title.trim() || !article.seoTitle.trim() || !article.description.trim() || !article.excerpt.trim()) {
      articleIssues.push({ severity: "error", code: "metadata", message: "Title, SEO title, description, and excerpt are required." });
    }
    if (!Number.isFinite(Date.parse(article.publishDate)) || !Number.isFinite(Date.parse(article.modifiedDate))) {
      articleIssues.push({ severity: "error", code: "date", message: "Publish and modified dates must be valid ISO dates." });
    }
    if (article.status === "archived" && !article.archiveDisposition) {
      articleIssues.push({ severity: "error", code: "archive", message: "Archived articles require a URL disposition." });
    }
    if (article.archiveDisposition === "redirect" && (!article.redirectTo || !article.redirectTo.startsWith("/"))) {
      articleIssues.push({ severity: "error", code: "redirect", message: "Archived redirects require a clean same-site destination." });
    }
    if (article.heroImage && !article.heroAlt && article.heroImage.alt !== "") {
      articleIssues.push({ severity: "error", code: "alt", message: "Informative hero images require alt text." });
    }
    if (article.claims?.some((claim) => claim.status === "unverified" || claim.status === "inferred")) {
      articleIssues.push({ severity: "error", code: "claims", message: "Inferred or unverified factual claims must be resolved before publishing." });
    }
    if (!article.content.some((block) => block.type === "quick-answer")) {
      articleIssues.push({ severity: "warning", code: "quick-answer", message: "Consider adding a concise Quick Answer block." });
    }
    if (!article.content.some((block) => block.type === "key-takeaways")) {
      articleIssues.push({ severity: "warning", code: "takeaways", message: "Consider adding Key Takeaways." });
    }

    for (const field of ["slug", "seoTitle", "description"] as const) {
      const value = normalize(article[field]);
      const fieldValues = seenByField.get(field)!;
      const existing = fieldValues.get(value);
      if (existing) {
        articleIssues.push({ severity: "error", code: `duplicate-${field}`, message: `Duplicates ${field} used by “${existing}”.` });
      } else {
        fieldValues.set(value, article.slug);
      }
    }

    issues.set(article.slug, articleIssues);
  }

  return issues;
}

const buildIssues = validateBlogArticles([...publishedArticles, ...archivedArticles]);
for (const [slug, issues] of buildIssues) {
  const errors = issues.filter((issue) => issue.severity === "error");
  if (errors.length) throw new Error(`Invalid Blog article “${slug}”: ${errors.map((issue) => issue.message).join(" ")}`);
}

export function isPublicBlogArticle(article: BlogArticle, now = new Date()): boolean {
  const publishTime = Date.parse(article.publishDate);
  return article.status === "published" && cleanBlogSlugPattern.test(article.slug) && Number.isFinite(publishTime) && publishTime <= now.getTime();
}

export function getPublishedBlogArticles(now = new Date()) {
  return publishedArticles
    .filter((article) => isPublicBlogArticle(article, now))
    .sort((left, right) => Date.parse(right.publishDate) - Date.parse(left.publishDate));
}

export function getPublishedBlogArticle(slug: string, now = new Date()) {
  return getPublishedBlogArticles(now).find((article) => article.slug === slug);
}

export function getArchivedBlogArticle(slug: string) {
  return archivedArticles.find((article) => article.slug === slug && article.status === "archived");
}

export function getRetainedArchivedBlogArticles() {
  return archivedArticles.filter((article) => article.status === "archived" && article.archiveDisposition === "retain-noindex");
}

export function getRelatedPublishedBlogArticles(article: BlogArticle) {
  const publishedBySlug = new Map(getPublishedBlogArticles().map((candidate) => [candidate.slug, candidate]));
  return article.relatedArticleSlugs.flatMap((slug) => {
    const related = publishedBySlug.get(slug);
    return related ? [related] : [];
  });
}
