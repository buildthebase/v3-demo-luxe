import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";
import { validateArticle } from "../cms/core.mjs";

const articles = JSON.parse(readFileSync(new URL("../content/blog/published/articles.json", import.meta.url), "utf8"));
const article = articles.find(({ slug }) => slug === "baby-shower-custom-coffee-bar");

test("homepage case study links to the Café Bébé article and its film", () => {
  assert.ok(article);
  assert.equal(article.status, "published");
  const component = readFileSync(new URL("../app/components/home-case-study.tsx", import.meta.url), "utf8");
  assert.ok(component.includes(`href="/blog/${article.slug}"`));
  assert.doesNotMatch(component, /Nicholas|\[placeholder\]|insert quote/i);
  assert.doesNotMatch(component, /aria-hidden="true">0[123]</);
  assert.doesNotMatch(JSON.stringify(article), /Nicholas/i);
  assert.equal(article.editorialApproval.shortForm, true);
  assert.equal(article.title, "Inside the Café Bébé Coffee Bar");
  assert.equal(article.content[0].type, "callout");
  assert.deepEqual(article.content.filter(({ type }) => type === "heading").map(({ text }) => text), [
    "A little something made just for the occasion", "The finishing touches", "Let's make it yours",
  ]);
  const imageIndex = article.content.findIndex(block => block.type === "image");
  assert.deepEqual(article.content[imageIndex - 1].content, [
    { text: "Take a closer look at how it all came together.", emphasis: "strong" },
  ]);
  assert.equal(article.showPlanningLinks, false);
  const articleLinks = article.content
    .filter(block => block.type === "paragraph")
    .flatMap(block => block.content.filter(part => part.href));
  const filmLink = articleLinks.find(link => link.text === "short film on our homepage");
  assert.equal(filmLink?.href, "/#review-coffee-dessert");
  assert.ok(component.includes('id="review-coffee-dessert"'));
  assert.ok(articleLinks.some(link => link.text === "get in touch" && link.href === "/contact"));
  const errors = validateArticle(article, articles, {
    knownPaths: ["/", "/experiences/coffee-bar", "/contact"],
  }).filter(({ severity }) => severity === "error");
  assert.deepEqual(errors, []);
});

test("case-study video formats and article poster exist", () => {
  for (const path of [
    "videos/case-studies/baby-shower-coffee-bar-v1.mp4",
    "videos/case-studies/baby-shower-coffee-bar-v1.webm",
    "images/case-studies/baby-shower-coffee-bar.webp",
    article.heroImage.src.slice(1),
  ]) {
    assert.ok(statSync(new URL(`../public/${path}`, import.meta.url)).size > 0);
  }
  assert.equal(article.heroImage.src, "/images/experiences/custom-branding/cafe-bebe-bow-cart-clear.avif");
  assert.ok(statSync(new URL(`../public${article.heroImage.src}`, import.meta.url)).size < 500_000);
  assert.equal(article.heroDesktopImage, undefined);
});

test("shared editorial voice preserves conversational direction and factual guardrails", () => {
  const voice = JSON.parse(readFileSync(new URL("../content/blog/voice.json", import.meta.url), "utf8"));
  assert.equal(voice.version, "1.3.1");
  assert.ok(voice.excludedWords.includes("\u2014"));
  assert.doesNotMatch(JSON.stringify(article), /\u2014/);
  assert.match(voice.sentenceOpeningGuidance, /Vary the structure naturally/);
  assert.doesNotMatch(JSON.stringify(article.content), /The family/);
  assert.ok(voice.approvedTerms.includes("the Luxe Coffee Bar"));
  assert.match(voice.terminologyGuidance, /Always include the definite article/);
  assert.ok(voice.tone.includes("conversational"));
  assert.match(voice.sentenceGuidance, /Do not invent/);
  assert.match(voice.paragraphGuidance, /read it aloud/);
  assert.match(voice.paragraphGuidance, /do not pad/);
  assert.ok(voice.approvedExamples.length >= 3);
  assert.ok(voice.rejectedExamples.length >= 3);
  assert.doesNotMatch(JSON.stringify(article.content), /in keeping|cart gave the coffee setup|always been part of the plan|brought a little of that same character/i);
});

test("short articles require explicit approval with a note; empty articles remain blocked", () => {
  const options = { knownPaths: ["/experiences/coffee-bar", "/contact"] };
  for (const editorialApproval of [undefined, { shortForm: true, note: "" }, { shortForm: false, note: "Reviewed" }]) {
    const unapproved = { ...article, content: article.content.slice(0, 3), editorialApproval };
    assert.ok(validateArticle(unapproved, [unapproved], options).some(({ code, severity }) => code === "thin-body" && severity === "error"));
  }
  const empty = { ...article, content: [] };
  assert.ok(validateArticle(empty, [empty], options).some(({ code, severity }) => code === "empty-body" && severity === "error"));
});
