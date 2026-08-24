import Link from "next/link";
import { FaqAccordion } from "../components/faq-accordion";
import { JsonLd } from "../components/json-ld";
import { PageSectionNavigation } from "../components/page-section-navigation";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import {
  createBreadcrumbSchema,
  organizationId,
  pageEntityId,
  websiteId,
} from "../schema-builders";
import { siteConfig } from "../site-config";
import { allFaqItems, faqCategories } from "./faq-content";

const faqUrl = `${siteConfig.url}/faq`;

const faqSectionNavigation = [
  { id: "faq-page-overview", label: "Back to top" },
  ...faqCategories.map((category) => ({
    id: category.id,
    label: category.title,
  })),
] as const;

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
    <header className="faq-hub-hero" id="faq-page-overview">
      <div className="faq-hub-hero-copy">
        <p className="foundation-eyebrow">FAQ / Before You Inquire</p>
        <h1 aria-label="Event planning and booking answers, before the proposal begins.">
          <span>Event planning</span>
          <span>and booking answers,</span>
          <span>before the proposal begins.</span>
        </h1>
        <p>
          Booking terms, travel, operating requirements, and cross-service
          customization explained clearly before you request a proposal.
        </p>
        <div className="faq-hub-hero-actions">
          <Link href="/contact" data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </Link>
          <a href="#faq-categories">
            Find an Answer <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="faq-hub-hero-art" aria-hidden="true">
        <span>Q</span>
        <i />
        <span>A</span>
        <strong>Useful before<br />the quote.</strong>
      </div>
    </header>
  );
}

function FaqCategoryNav() {
  return (
    <nav className="faq-hub-nav" aria-label="FAQ categories" id="faq-categories">
      <ol>
        {faqCategories.map((category) => (
          <li key={category.id}>
            <a href={`#${category.id}`}>
              <span>{category.number}</span>
              {category.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function FaqCategory({
  category,
}: {
  category: (typeof faqCategories)[number];
}) {
  return (
    <section
      className="faq-hub-category"
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      data-evidence-source="client-intake-and-approved-policy"
      {...(category.id === "setup-logistics"
        ? {
            "data-measurement-section": "logistics",
            "data-section-id": "shared-setup-logistics",
          }
        : {})}
    >
      <header>
        <span>{category.number}</span>
        <h2 id={`${category.id}-title`}>{category.title}</h2>
        <p>{category.description}</p>
      </header>
      <FaqAccordion items={category.items} indicatorElement="i" />
    </section>
  );
}

function FaqInquiry() {
  return (
    <section className="faq-hub-inquiry" aria-labelledby="faq-inquiry-title">
      <div>
        <h2 id="faq-inquiry-title">Have a question specific to your event? Ask us directly.</h2>
        <p>
          Share the date, venue, guest count, experiences under consideration,
          and the operating detail you need clarified. For complete service
          mechanics, review the <Link href="/experiences/coffee-bar">Coffee Bar</Link>,
          {" "}<Link href="/experiences/sweet-cart">Sweet Cart</Link>, or{" "}
          <Link href="/experiences/seating-rentals">Seating Rentals</Link>.
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
      <main className="faq-hub-page">
        <PageSectionNavigation
          items={faqSectionNavigation}
          revealAfterId="faq-categories"
        />
        <FaqHero />
        <FaqCategoryNav />
        <div className="faq-hub-categories">
          {faqCategories.map((category) => (
            <FaqCategory category={category} key={category.id} />
          ))}
        </div>
        <FaqInquiry />
      </main>
      <JsonLd data={faqSchema} />
    </SiteShell>
  );
}
