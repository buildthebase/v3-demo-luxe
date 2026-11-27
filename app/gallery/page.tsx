import { ContextualInquiryPanel } from "../components/signature-elements";
import { GalleryCollection } from "../components/gallery-collection";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { approvedGalleryImages } from "./gallery-content";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import {
  createBreadcrumbSchema,
  organizationId,
  pageEntityId,
  websiteId,
} from "../schema-builders";
import { siteConfig } from "../site-config";

const galleryUrl = `${siteConfig.url}/gallery`;

export const metadata = createPageMetadata("/gallery");

const gallerySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["CollectionPage", "WebPage"],
      "@id": pageEntityId("/gallery", "webpage"),
      url: galleryUrl,
      name: pageMetadata["/gallery"].title,
      description: pageMetadata["/gallery"].description,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": pageEntityId("/gallery", "breadcrumb") },
      inLanguage: siteConfig.language,
      ...(approvedGalleryImages.length > 0
        ? {
            associatedMedia: approvedGalleryImages.map((item) => ({
              "@id": pageEntityId("/gallery", `image-${item.id}`),
            })),
          }
        : {}),
    },
    createBreadcrumbSchema("/gallery"),
    ...approvedGalleryImages.map((item) => ({
      "@type": "ImageObject",
      "@id": pageEntityId("/gallery", `image-${item.id}`),
      contentUrl: `${siteConfig.url}${item.src}`,
      caption: item.caption,
      description: item.alt,
      width: item.width,
      height: item.height,
      representativeOfPage: Boolean(item.priority),
      isPartOf: { "@id": pageEntityId("/gallery", "webpage") },
    })),
  ],
};

function GalleryHero() {
  return (
    <header className="gallery-hero">
      <div className="gallery-hero-copy">
        <h1>A Little Inspiration for Your Next Celebration</h1>
        <p>
          From beautifully styled coffee bars to sweet little details, explore some of our favourite
          moments and creations from celebrations across Toronto and the GTA.
        </p>
        <div className="gallery-hero-actions">
          <a href="#gallery-collections" className="gallery-hero-scroll" aria-label="Explore the gallery">
            <svg width="28" height="32" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M12 3v21M5 17l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

function GalleryInquiry() {
  return (
    <ContextualInquiryPanel
      contextKey="gallery"
      showEyebrow={false}
      context={{
        eyebrow: "",
        heading: "Have something in mind for your event?",
        description: "Tell us what you’re planning, where it’ll be, and how many guests you’re expecting. If something in the gallery caught your eye, let us know. We can talk through what would work for your event.",
        cta: "Plan Your Event",
        href: "/contact",
      }}
    />
  );
}

export default function GalleryPage() {
  return (
    <SiteShell breadcrumbPath="/gallery">
      <main className="gallery-page">
        <GalleryHero />
        <GalleryCollection />
        <GalleryInquiry />
      </main>
      <JsonLd data={gallerySchema} />
    </SiteShell>
  );
}
