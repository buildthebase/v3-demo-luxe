import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePresentation } from "../../../../components/blog-article-presentation";
import type { BlogArticle } from "../../../../blog/content";

type PreviewPageProps = { params: Promise<{ cmsPort: string; token: string; slug: string }>; searchParams: Promise<{ project?: string }> };
type PreviewRecord = { token: string; expiresAt: number; article: BlogArticle };

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Local article preview",
  robots: { index: false, follow: false, noarchive: true },
};

async function readPreview(token: string, requestedPort: string, projectId?: string) {
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  if (projectId && !/^[0-9a-f-]{36}$/i.test(projectId)) return null;
  try {
    const parsedPort = Number(requestedPort);
    const port = Number.isInteger(parsedPort) && parsedPort >= 1024 && parsedPort <= 65535 ? parsedPort : 4317;
    const endpoint = projectId
      ? `http://127.0.0.1:${port}/api/projects/${projectId}/preview/${token}`
      : `http://127.0.0.1:${port}/api/preview/${token}`;
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return null;
    const preview = await response.json() as PreviewRecord;
    if (preview.token !== token || preview.expiresAt < Date.now()) return null;
    return preview;
  } catch {
    return null;
  }
}

export default async function ArticlePreviewPage({ params, searchParams }: PreviewPageProps) {
  const { cmsPort, token, slug } = await params;
  const { project } = await searchParams;
  const preview = await readPreview(token, cmsPort, project);
  if (!preview || preview.article.slug !== slug) notFound();
  return <BlogArticlePresentation article={preview.article} />;
}
