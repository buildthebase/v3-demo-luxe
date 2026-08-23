import assert from "node:assert/strict";
import test from "node:test";
import { createEmptyArticle } from "../cms/core.mjs";
import { prepareBulkLifecycle } from "../cms/article-lifecycle.mjs";

function article(slug, status = "draft", overrides = {}) {
  return {
    ...createEmptyArticle(), slug, status, title: `Article ${slug}`, seoTitle: `Article ${slug} | Luxe Event Co.`,
    description: "A complete description for this test article.", excerpt: "A complete excerpt.",
    content: [{ type: "paragraph", content: [{ text: "Useful editorial content." }] }],
    ...overrides,
  };
}

test("bulk lifecycle changes every selected article in one prepared collection", () => {
  const source = [article("first"), article("second"), article("untouched")];
  const result = prepareBulkLifecycle(source, ["first", "second"], "archive", { archiveDisposition: "retain-noindex", knownPaths: ["/blog"] });
  assert.deepEqual(result.updated.map((item) => item.status), ["archived", "archived"]);
  assert.equal(result.articles.find((item) => item.slug === "untouched").status, "draft");
  assert.ok(result.updated.every((item) => item.archiveDisposition === "retain-noindex"));
});

test("bulk publishing rejects the entire preparation when one selected article has blockers", () => {
  const valid = article("valid");
  const invalid = article("invalid", "draft", { description: "", claims: [{ id: "claim-1", text: "Unsupported", status: "unverified", sourceIds: [] }] });
  assert.throws(() => prepareBulkLifecycle([valid, invalid], ["valid", "invalid"], "publish", { knownPaths: ["/blog"] }), (error) => {
    assert.equal(error.status, 422);
    assert.match(error.message, /Article invalid/);
    assert.ok(error.details.some((issue) => issue.slug === "invalid"));
    return true;
  });
  assert.equal(valid.status, "draft");
});

test("bulk trash protects published and retained archived URLs", () => {
  assert.throws(() => prepareBulkLifecycle([article("live", "published")], ["live"], "trash"), /Archive/);
  assert.throws(() => prepareBulkLifecycle([article("retained", "archived", { archiveDisposition: "retain-noindex" })], ["retained"], "trash"), /Assign a redirect/);
});

test("bulk draft restoration cannot silently remove a published URL", () => {
  assert.throws(() => prepareBulkLifecycle([article("live", "published")], ["live"], "restore"), /Archive/);
});
