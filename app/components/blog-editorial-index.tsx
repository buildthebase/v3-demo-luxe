import Link from "next/link";
import type { BlogArticle } from "../blog/content";
import { BlogJournalInquiry } from "./blog-journal-inquiry";
import { ResponsiveImage } from "./responsive-image";
import { isPublishableImage } from "../image-system";

const articleDateFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const journalTopics = [
  "Coffee Catering",
  "Dessert Catering",
  "Event Rentals",
  "Weddings",
  "Corporate Events",
  "Brand Activations",
  "Private Events",
  "Event Planning",
] as const;

function topicAnchor(topic: string) {
  return `topic-${topic.toLowerCase().replaceAll(" ", "-")}`;
}

function formatArticleDate(date: string) {
  return articleDateFormatter.format(new Date(date));
}

function StoryMeta({ article }: { article: BlogArticle }) {
  return (
    <div className="blog-story-meta">
      <span>{article.category}</span>
      <time dateTime={article.publishDate}>
        {formatArticleDate(article.publishDate)}
      </time>
    </div>
  );
}

function StoryImage() {
  return (
    <figure className="blog-image-placeholder" aria-hidden="true">
      <span>Image placeholder</span>
    </figure>
  );
}

function FeaturedStory({ article }: { article: BlogArticle }) {
  return (
    <section className="blog-featured" aria-labelledby="blog-featured-title">
      <div className="blog-editorial-section-heading">
        <p>Featured story</p>
        <span>01</span>
      </div>
      <article>
        <Link href={`/blog/${article.slug}`}>
          {article.heroImage && isPublishableImage(article.heroImage) ? (
            <figure className="blog-featured-photo">
              <ResponsiveImage asset={{ ...article.heroImage, alt: article.heroAlt || article.heroImage.alt }} />
            </figure>
          ) : <StoryImage />}
          <div>
            <StoryMeta article={article} />
            <h2 id="blog-featured-title">{article.title}</h2>
            <p>{article.excerpt}</p>
            <strong>Read the story <span aria-hidden="true">↗︎</span></strong>
          </div>
        </Link>
      </article>
    </section>
  );
}

function LatestArticles({ articles }: { articles: readonly BlogArticle[] }) {
  if (!articles.length) return null;

  const [primary, ...feed] = articles;

  return (
    <section className="blog-latest" aria-labelledby="blog-latest-title">
      <div className="blog-editorial-section-heading">
        <h2 id="blog-latest-title">Latest articles</h2>
        <span>New perspectives, in order</span>
      </div>
      <div className="blog-latest-layout">
        <article className="blog-latest-primary">
          <Link href={`/blog/${primary.slug}`}>
            <StoryImage />
            <StoryMeta article={primary} />
            <h3>{primary.title}</h3>
            <p>{primary.excerpt}</p>
          </Link>
        </article>
        {feed.length ? (
          <div className="blog-latest-feed">
            {feed.map((article, index) => (
              <article key={article.slug}>
                <Link href={`/blog/${article.slug}`}>
                  <span className="blog-latest-number">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div>
                    <StoryMeta article={article} />
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                  </div>
                  <StoryImage />
                </Link>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function TopicSections({ articles }: { articles: readonly BlogArticle[] }) {
  const grouped = new Map<string, BlogArticle[]>();

  articles.forEach((article) => {
    const current = grouped.get(article.category) ?? [];
    current.push(article);
    grouped.set(article.category, current);
  });

  const topics = [...grouped.entries()]
    .filter(([, topicArticles]) => topicArticles.length >= 2)
    .slice(0, 3);

  if (!topics.length) return null;

  return (
    <div className="blog-topics" aria-label="Journal topics">
      {topics.map(([topic, topicArticles], topicIndex) => (
        <section key={topic} aria-labelledby={`blog-topic-${topicIndex}`}>
          <div className="blog-topic-heading">
            <p>Journal department</p>
            <h2 id={`blog-topic-${topicIndex}`}>{topic}</h2>
          </div>
          <div>
            {topicArticles.slice(0, 3).map((article, articleIndex) => (
              <article key={article.slug}>
                <Link href={`/blog/${article.slug}`}>
                  {articleIndex === 0 ? (
                    <StoryImage />
                  ) : null}
                  <StoryMeta article={article} />
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ArticleArchive({ articles }: { articles: readonly BlogArticle[] }) {
  if (!articles.length) return null;

  const firstArticleByTopic = new Map<string, string>();

  articles.forEach((article) => {
    if (!firstArticleByTopic.has(article.category)) {
      firstArticleByTopic.set(article.category, article.slug);
    }
  });

  return (
    <section className="blog-archive" aria-labelledby="blog-archive-title">
      <details className="blog-archive-disclosure" open>
        <summary>
          <h2 id="blog-archive-title">Archive</h2>
          <span>{articles.length} {articles.length === 1 ? "article" : "articles"}</span>
          <i aria-hidden="true" />
        </summary>
        <ol>
          {articles.map((article, index) => (
            <li
              key={article.slug}
              id={
                firstArticleByTopic.get(article.category) === article.slug
                  ? topicAnchor(article.category)
                  : undefined
              }
            >
              <Link href={`/blog/${article.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time dateTime={article.publishDate}>
                  {formatArticleDate(article.publishDate)}
                </time>
                <strong>{article.title}</strong>
                <small>{article.category}</small>
                <i aria-hidden="true">↗︎</i>
              </Link>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}

function JournalEmptyState() {
  return (
    <section className="blog-journal-empty" aria-labelledby="blog-journal-empty-title">
      <span aria-hidden="true">Issue 001</span>
      <div>
        <p>From the editors</p>
        <h2 id="blog-journal-empty-title">The first stories are being prepared.</h2>
        <p>
          The Luxe Journal will publish considered guidance on hosting, service,
          atmosphere, and the practical details behind memorable gatherings.
        </p>
      </div>
    </section>
  );
}

export function BlogEditorialIndex({
  articles,
}: {
  articles: readonly BlogArticle[];
}) {
  const [featuredArticle, ...remainingArticles] = articles;
  const availableTopics = new Set(articles.map((article) => article.category));
  const topics = journalTopics.filter((topic) => availableTopics.has(topic));

  return (
    <>
      <header className="blog-masthead">
        <div className="blog-masthead-meta">
          <p>Luxe Event Journal</p>
        </div>
        <h1>
          <span>Event ideas, planning guidance,</span>{" "}<span>and hospitality insights.</span>
        </h1>
        {topics.length ? (
          <nav aria-label="Journal topics">
            <span>Topics</span>
            <ul>
              {topics.map((topic) => (
                <li key={topic}>
                  <a href={`#${topicAnchor(topic)}`}>{topic}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
      {featuredArticle ? (
        <>
          <FeaturedStory article={featuredArticle} />
          <LatestArticles articles={remainingArticles} />
          <TopicSections articles={remainingArticles} />
          <ArticleArchive articles={articles} />
        </>
      ) : (
        <JournalEmptyState />
      )}
      <BlogJournalInquiry />
    </>
  );
}
