import Link from "next/link";
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
        <h1 aria-label="Luxe event gallery: coffee, dessert, and rental experiences.">
          <span>Luxe event gallery:</span>
          <span>coffee, dessert, and</span>
          <span>rental experiences.</span>
        </h1>
        <p>
          See how Luxe mobile coffee bars, live dessert carts, seating rentals,
          and coordinated service support weddings, corporate events, brand
          activations, showers, and private celebrations across Toronto and the GTA.
        </p>
        <div className="gallery-hero-actions">
          <Link href="/contact" data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </div>
      <div className="gallery-hero-media" aria-label="Luxe experience composition">
        <div aria-hidden="true"><i /><i /><i /></div>
        <strong>Service direction.<br />Event context.</strong>
        <span>COFFEE · DESSERT · EVENT RENTALS<br />Planned for the room.</span>
      </div>
    </header>
  );
}

function GalleryInquiry() {
  return (
    <section className="gallery-inquiry" aria-labelledby="gallery-inquiry-title">
      <div>
        <h2 id="gallery-inquiry-title">Plan Your Toronto Event Experience</h2>
        <p>
          Share the occasion, setting, guest count, and the Luxe experiences you
          are considering. Luxe serves Toronto and the Greater Toronto Area, and
          will begin with the event rather than a fixed package.
        </p>
      </div>
      <Link href="/contact" data-event-name="inquiry_start">
        Plan Your Event <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
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
