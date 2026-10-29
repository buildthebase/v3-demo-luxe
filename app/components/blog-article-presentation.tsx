import Link from "next/link";
import {
  getRelatedPublishedBlogArticles,
  type BlogArticle,
} from "../blog/content";
import { BlogArticleBody } from "./blog-article-body";
import { BlogJournalInquiry } from "./blog-journal-inquiry";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { ResponsiveImage } from "./responsive-image";
import { SiteShell } from "./site-shell";

const contextualLinksByCategory: Record<
  string,
  readonly { href: string; label: string }[]
> = {
  "Coffee Catering": [{ href: "/experiences/coffee-bar", label: "Explore the Luxe Coffee Bar" }],
  "Dessert Catering": [{ href: "/experiences/sweet-cart", label: "Explore Luxe Sweet Cart" }],
  "Event Rentals": [{ href: "/experiences/seating-rentals", label: "Explore Luxe Seating Rentals" }],
  Weddings: [{ href: "/events/weddings", label: "Explore Luxe wedding experiences" }],
  "Corporate Events": [{ href: "/events/corporate-events", label: "Explore corporate event services" }],
  "Brand Activations": [{ href: "/events/brand-activations", label: "Explore brand activation services" }],
  "Private Events": [{ href: "/events/private-events", label: "Explore private event services" }],
  "Event Planning": [
    { href: "/events/baby-showers", label: "Plan a baby shower" },
    { href: "/events/bridal-showers", label: "Plan a bridal shower" },
    { href: "/events/birthdays", label: "Plan a birthday celebration" },
  ],
};

function calculateReadingTime(content: BlogArticle["content"]) {
  const text = content.flatMap((block) => {
    if (block.type === "paragraph" || block.type === "callout" || block.type === "quick-answer") {
      return block.content.map((item) => item.text);
    }
    if (block.type === "key-takeaways") return block.items.flatMap((item) => item.map((part) => part.text));
    if (block.type === "heading") return [block.text];
    if (block.type === "list") return block.items.flatMap((item) => item.map((part) => part.text));
    if (block.type === "quote") return [block.quote, block.attribution ?? ""];
    if (block.type === "image") return [block.caption ?? ""];
    return [block.caption ?? "", ...block.headers, ...block.rows.flat()];
  }).join(" ");
  const wordCount = text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function BlogArticlePresentation({
  article,
  showPublishedDetails = true,
  showPlanningLinks = true,
  showRelatedArticles = true,
}: {
  article: BlogArticle;
  showPublishedDetails?: boolean;
  showPlanningLinks?: boolean;
  showRelatedArticles?: boolean;
}) {
  const path = `/blog/${article.slug}`;
  const relatedArticles = showRelatedArticles ? getRelatedPublishedBlogArticles(article) : [];
  const contextualLinks = showPlanningLinks && article.showPlanningLinks !== false
    ? contextualLinksByCategory[article.category] ?? []
    : [];
  const readingTime = calculateReadingTime(article.content);
  const heroImage = article.heroImage ? { ...article.heroImage, alt: article.heroAlt, priority: true } : null;
  const dateFormatter = new Intl.DateTimeFormat("en-CA", { day: "numeric", month: "long", year: "numeric" });
  const formattedDate = dateFormatter.format(new Date(article.publishDate));
  const formattedModifiedDate = dateFormatter.format(new Date(article.modifiedDate));
  const showModifiedDate = article.modifiedDate !== article.publishDate;

  return (
    <SiteShell>
      <BreadcrumbNavigation
        items={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { href: path, label: article.title },
        ]}
      />
      <main className="blog-article-page">
        <article>
          <header className="blog-article-hero">
            <div>
              <p>{article.category}</p>
              <h1 aria-label={article.title} className={article.titleLines?.length ? "blog-article-title-multiline" : undefined}>
                {article.titleLines?.length
                  ? article.titleLines.map((line) => <span className="blog-article-title-line" key={line}>{line}</span>)
                  : article.title}
              </h1>
              <p>{article.description}</p>
              {showPublishedDetails ? (
                <div>
                  <span>By {article.author.name}</span>
                  <span>{readingTime} min read</span>
                  <span>Published <time dateTime={article.publishDate}>{formattedDate}</time></span>
                  {showModifiedDate ? <span>Updated <time dateTime={article.modifiedDate}>{formattedModifiedDate}</time></span> : null}
                </div>
              ) : null}
            </div>
            {heroImage ? (
              <figure
                data-orientation={heroImage.width < heroImage.height ? "portrait" : "landscape"}
                data-desktop-landscape={article.heroDesktopImage?.src ? "true" : undefined}
              >
                {article.heroDesktopImage?.src ? (
                  <picture style={{ aspectRatio: `${heroImage.width} / ${heroImage.height}` }}>
                    {article.heroImageSources?.map((source) => (
                      <source key={source.srcSet} {...source} />
                    ))}
                    <source
                      media="(min-width: 1024px)"
                      srcSet={article.heroDesktopImage.src}
                      type="image/webp"
                      width={article.heroDesktopImage.width}
                      height={article.heroDesktopImage.height}
                    />
                    <ResponsiveImage asset={heroImage} />
                  </picture>
                ) : <ResponsiveImage asset={heroImage} />}
              </figure>
            ) : null}
          </header>
          <BlogArticleBody content={article.content} />
          {contextualLinks.length ? (
            <aside className="blog-context-links" aria-labelledby="blog-context-links-title">
              <p id="blog-context-links-title">Continue planning with Luxe</p>
              <div>
                {contextualLinks.map((contextLink) => (
                  <Link href={contextLink.href} key={contextLink.href}>
                    {contextLink.label} <span aria-hidden="true">↗︎</span>
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </article>
        {relatedArticles.length ? (
          <aside className="blog-related" aria-labelledby="blog-related-title">
            <h2 id="blog-related-title">Continue reading</h2>
            <div>
              {relatedArticles.map((related) => (
                <Link href={`/blog/${related.slug}`} key={related.slug}>
                  <small>{related.category}</small>
                  <strong>{related.title}</strong>
                  <p>{related.excerpt}</p>
                  <span aria-hidden="true">↗︎</span>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
        <BlogJournalInquiry />
      </main>
    </SiteShell>
  );
}
