import Link from "next/link";
import { FaqExplorer } from "../components/faq-explorer";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import {
  createBreadcrumbSchema,
  organizationId,
  pageEntityId,
  websiteId,
} from "../schema-builders";
import { siteConfig } from "../site-config";
import { allFaqItems } from "./faq-content";

const faqUrl = `${siteConfig.url}/faq`;

export const metadata = createPageMetadata("/faq");

const faqSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FAQPage", "WebPage"],
      "@id": pageEntityId("/faq", "webpage"),
      url: faqUrl,
      name: pageMetadata["/faq"].title,
      description: pageMetadata["/faq"].description,
      mainEntity: allFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": pageEntityId("/faq", "breadcrumb") },
      inLanguage: siteConfig.language,
    },
    createBreadcrumbSchema("/faq"),
  ],
};

function FaqHero() {
  return (
    <header className="faq-editorial-hero" id="faq-page-overview">
      <h1>A Few Things You Might Be Wondering</h1>
      <p>Everything you need to know about booking, planning, and personalising your Luxe experience.</p>
    </header>
  );
}

function FaqInquiry() {
  return (
    <section className="faq-hub-inquiry" aria-labelledby="faq-inquiry-title">
      <div>
        <h2 id="faq-inquiry-title">Still have a question?</h2>
        <p>
          Tell us a little about your event and what you’d like to know.
          We’re happy to help you work through the details.
        </p>
      </div>
      <Link href="/contact" data-event-name="inquiry_start">
        Plan Your Event <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export default function FAQPage() {
  return (
    <SiteShell breadcrumbPath="/faq">
      <main className="faq-editorial-page">
        <FaqHero />
        <FaqExplorer />
        <FaqInquiry />
      </main>
      <JsonLd data={faqSchema} />
    </SiteShell>
  );
}
