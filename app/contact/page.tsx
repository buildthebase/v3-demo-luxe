import Link from "next/link";
import { QuoteModalTrigger } from "../components/quote-modal-trigger";
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

const contactUrl = `${siteConfig.url}/contact`;
const hasThirdPartyInquiry = Boolean(siteConfig.inquiry.url);

export const metadata = createPageMetadata("/contact");

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ContactPage", "WebPage"],
      "@id": pageEntityId("/contact", "webpage"),
      url: contactUrl,
      name: pageMetadata["/contact"].title,
      description: pageMetadata["/contact"].description,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": pageEntityId("/contact", "breadcrumb") },
      inLanguage: siteConfig.language,
    },
    createBreadcrumbSchema("/contact"),
  ],
};

function InquiryAction({
  className,
}: {
  className?: string;
}) {
  return (
    <QuoteModalTrigger className={className}>
      Start Your Event Inquiry <span aria-hidden="true">↗︎</span>
    </QuoteModalTrigger>
  );
}

function ContactHero() {
  return (
    <header className="inquire-hero">
      <div className="inquire-hero-copy">
        <p className="foundation-eyebrow">Contact Luxe Event Co. / Plan Your Event</p>
        <h1 aria-label="Let’s plan something memorable.">
          <span>Let’s plan</span>
          <span>something memorable.</span>
        </h1>
        <p>
          Planning a wedding, corporate event, brand activation, or private
          celebration? Share your date, venue, guest count, and interest in our
          mobile coffee bar, live dessert cart, or event rentals.
        </p>
        <div className="inquire-hero-actions">
          <InquiryAction />
          <a href="#prepare-your-brief">
            See What to Include <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="inquire-hero-brief" aria-hidden="true">
        <div>
          <span>Event</span>
          <i />
        </div>
        <div>
          <span>Place</span>
          <i />
        </div>
        <div>
          <span>People</span>
          <i />
        </div>
        <strong>Begin with context.</strong>
      </div>
    </header>
  );
}

function InquiryPlanning() {
  return (
    <section
      className="inquire-planning"
      id="prepare-your-brief"
      aria-labelledby="inquire-planning-title"
    >
      <header>
        <p className="foundation-label">Preparing your event inquiry</p>
        <h2 id="inquire-planning-title">
          What to include when contacting Luxe Event Co.
        </h2>
        <p>
          Early estimates are welcome. Send what you know now, and our team will
          clarify availability, service requirements, and the details needed for a
          personalized proposal.
        </p>
        <p>
          Not sure where to begin? <Link href="/experiences">Compare our event experiences</Link>{" "}
          or <Link href="/events">browse the occasions we serve</Link>.
        </p>
      </header>
      <div className="inquire-planning-grid">
        <article>
          <span>What to share</span>
          <h3>Share your event details.</h3>
          <ul>
            <li>Date, venue, and estimated guest count</li>
            <li>Event type, service window, and indoor or outdoor setting</li>
            <li>Services, branding, dietary needs, and special requests</li>
          </ul>
        </article>
        <article>
          <span>What to expect</span>
          <h3>What happens after you contact us.</h3>
          <p>
            Luxe normally responds within 24 hours after reviewing fit and
            availability. Toronto and the GTA are the primary service area, with
            select Southern Ontario events available where scope permits.
          </p>
          <p>
            Most coffee bookings begin around 30 guests. Sweet Cart and Seating
            Rentals minimums depend on the selected experience and operating plan.
          </p>
        </article>
        <article>
          <span>What happens next</span>
          <h3>From proposal to confirmed date.</h3>
          <ul>
            <li>Luxe clarifies timing, venue, selections, and quantities</li>
            <li>A personalized proposal outlines the confirmed scope</li>
            <li>A signed contract and 30% retainer secure the date</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function ContactHandoff() {
  return (
    <section
      className="inquire-handoff"
      id="begin-inquiry"
      aria-labelledby="inquire-handoff-title"
    >
      <div className="inquire-handoff-copy">
        <h2 id="inquire-handoff-title">
          Contact Luxe Event Co. about your event.
        </h2>
        <p>
          {hasThirdPartyInquiry
            ? "Complete our guided event inquiry to share your date, venue, guest count, and service preferences."
            : "Email or call us with your event details. We will review the date, location, guest count, and services you are considering, then recommend the appropriate next step."}
        </p>
        <InquiryAction className="inquire-handoff-primary" />
      </div>
      <div className="inquire-contact">
        <h3>Call or email Luxe Event Co.</h3>
        <a
          href={`tel:${siteConfig.contact.phone}`}
          data-event-name="phone_click"
        >
          <span>Phone</span>
          {siteConfig.contact.phoneDisplay}
        </a>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          data-event-name="email_click"
        >
          <span>Email</span>
          {siteConfig.contact.email}
        </a>
        <Link href="/faq">
          <span>Before you contact us</span>
          Review frequently asked questions
        </Link>
      </div>
      <p className="inquire-privacy">
        This page does not collect or store event details. The inquiry action
        opens the approved contact destination currently configured for Luxe.
        Share only the information needed to assess the event. Any future
        third-party form will be subject to its disclosed privacy and consent
        terms.
      </p>
    </section>
  );
}

export default function ContactPage() {
  return (
    <SiteShell breadcrumbPath="/contact">
      <main className="inquire-page">
        <ContactHero />
        <InquiryPlanning />
        <ContactHandoff />
      </main>
      <JsonLd data={contactSchema} />
    </SiteShell>
  );
}
