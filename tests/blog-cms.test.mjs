import assert from "node:assert/strict";
import test from "node:test";
import { articleBodyWordCount, buildLinkGraph, createEmptyArticle, parseInlineInternalLinks, searchArticles, validateArticle } from "../cms/core.mjs";

const usefulBody = Array.from({ length: 700 }, (_, index) => `guidance${index}`).join(" ");
const heroImage = { id: "hero", src: "/images/blog/example/hero.webp", width: 1600, height: 1000, alt: "An event setup" };

function article(overrides = {}) {
  return {
    ...createEmptyArticle(),
    slug: "example-article",
    title: "Example article",
    seoTitle: "Example article | Luxe Event Co.",
    description: "A useful and unique description for this example article.",
    excerpt: "A useful excerpt.",
    heroImage,
    heroAlt: "An event setup",
    content: [
      { type: "quick-answer", title: "Quick answer", content: [{ text: "A concise answer." }] },
      { type: "heading", id: "planning", level: 2, text: "Planning guidance" },
      { type: "paragraph", content: [{ text: "Read the related guide.", href: "/blog/related-article" }, { text: usefulBody }] },
      { type: "key-takeaways", title: "Key takeaways", items: [[{ text: "One useful point." }]] },
    ],
    ...overrides,
  };
}

test("published-only inbound links clear orphan status", () => {
  const target = article({ slug: "related-article", status: "published", content: [] });
  const publishedSource = article({ slug: "published-source", status: "published" });
  const graph = buildLinkGraph([target, publishedSource], ["/blog"]);
  assert.equal(graph["related-article"].orphan, false);

  const draftSource = article({ slug: "draft-source", status: "draft" });
  const draftOnly = buildLinkGraph([target, draftSource], ["/blog"]);
  assert.equal(draftOnly["related-article"].orphan, true);
  assert.equal(draftOnly["related-article"].incoming.drafts.length, 1);
});

test("archive disposition prevents ambiguous archived URLs", () => {
  const archived = article({ status: "archived" });
  const issues = validateArticle(archived, [archived], { knownPaths: ["/blog"] });
  assert.ok(issues.some((entry) => entry.code === "archive-disposition" && entry.severity === "error"));
});

test("prohibited voice and unverified claims block publishing", () => {
  const candidate = article({
    status: "published",
    excerpt: "A game-changing article.",
    claims: [{ id: "claim-1", text: "Unsupported", status: "unverified", sourceIds: [] }],
  });
  const issues = validateArticle(candidate, [candidate], { voice: { excludedWords: ["game-changing"] }, knownPaths: ["/blog/related-article"] });
  assert.ok(issues.some((entry) => entry.code === "excluded-language"));
  assert.ok(issues.some((entry) => entry.code === "claim-status"));
});

test("CMS search includes body text", () => {
  const first = article({ slug: "coffee-guide", content: [{ type: "paragraph", content: [{ text: "Premium Matcha service" }] }] });
  const second = article({ slug: "seating-guide", content: [{ type: "paragraph", content: [{ text: "Lounge seating layouts" }] }] });
  assert.deepEqual(searchArticles([first, second], "matcha").map((entry) => entry.slug), ["coffee-guide"]);
});

test("generated Markdown-style internal links become structured article links", () => {
  assert.deepEqual(parseInlineInternalLinks("Explore [Luxe Coffee Bar](/experiences/coffee-bar) today."), [
    { text: "Explore " },
    { text: "Luxe Coffee Bar", href: "/experiences/coffee-bar" },
    { text: " today." },
  ]);
});

test("raw Markdown internal links block publication", () => {
  const candidate = article({
    content: [{ type: "paragraph", content: [{ text: "Explore [Luxe Coffee Bar](/experiences/coffee-bar)." }] }],
  });
  const issues = validateArticle(candidate, [candidate], { knownPaths: ["/experiences/coffee-bar"] });
  assert.ok(issues.some((entry) => entry.code === "inline-link-syntax" && entry.severity === "error"));
});

test("placeholder, thin copy, and missing photography block publication", () => {
  const candidate = article({
    heroImage: null,
    heroAlt: "",
    content: [{ type: "paragraph", content: [{ text: "Lorem ipsum dolor sit amet." }] }],
  });
  const issues = validateArticle(candidate, [candidate], { knownPaths: [] });
  assert.ok(issues.some((entry) => entry.code === "placeholder-content" && entry.severity === "error"));
  assert.ok(issues.some((entry) => entry.code === "thin-body" && entry.severity === "error"));
  assert.ok(issues.some((entry) => entry.code === "missing-hero-image" && entry.severity === "error"));

  const emptyIssues = validateArticle(article({ content: [] }), [], { knownPaths: [] });
  assert.ok(emptyIssues.some((entry) => entry.code === "empty-body" && entry.severity === "error"));
});

test("client-requested article length is guidance rather than a blocker", () => {
  const candidate = article({ content: [{ type: "paragraph", content: [{ text: Array.from({ length: 500 }, (_, index) => `word${index}`).join(" ") }] }] });
  assert.equal(articleBodyWordCount(candidate), 500);
  const issues = validateArticle(candidate, [candidate], { knownPaths: [] });
  assert.ok(issues.some((entry) => entry.code === "article-length" && entry.severity === "warning"));
  assert.ok(!issues.some((entry) => entry.code === "thin-body"));
});
