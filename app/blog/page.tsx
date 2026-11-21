import { BlogEditorialIndex } from "../components/blog-editorial-index";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import { createCollectionPageSchema } from "../schema-builders";
import { getPublishedBlogArticles } from "./content";

export const metadata = createPageMetadata("/blog");

export default function BlogPage() {
  const articles = getPublishedBlogArticles();
  const schema = createCollectionPageSchema({
    path: "/blog",
    pageName: pageMetadata["/blog"].title,
    pageDescription: pageMetadata["/blog"].description,
    collectionName: "Experiences by Luxe planning journal",
    collectionType: "Blog",
    items: articles.map((article) => ({
      name: article.title,
      path: `/blog/${article.slug}`,
    })),
  });

  return (
    <SiteShell breadcrumbPath="/blog">
      <main className="blog-index-page foundation-page">
        <BlogEditorialIndex articles={articles} />
      </main>
      <JsonLd data={schema} />
    </SiteShell>
  );
}
