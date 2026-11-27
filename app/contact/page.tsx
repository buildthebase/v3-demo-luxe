import Link from "next/link";
import styles from "./contact-layout.module.css";
import { FlashquotesEmbed } from "../components/flashquotes-form";
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

function ContactHero() {
  return (
    <header className={`inquire-hero ${styles.hero}`}>
      <div className="inquire-hero-copy">
        <h1>Let’s plan something memorable.</h1>
        <p>
          Complete the form below to request a personalized quote. Share your
          event date, venue, estimated guest count, and the experiences you have
          in mind, and we’ll work through the details with you.
        </p>
      </div>
      <div className={styles.form} id="begin-inquiry" role="region" aria-label="Plan your event">
        <FlashquotesEmbed inline />
      </div>
    </header>
  );
}

function ContactHandoff() {
  return (
    <section className={styles.directContact} aria-label="Contact Experiences by Luxe">
      <div className={styles.contactBar}>
        <div className={styles.contactLinks}>
          <a href={`tel:${siteConfig.contact.phone}`} data-event-name="phone_click">
            <span className={styles.contactLabel}>Phone</span>
            <span className={styles.contactValue}>{siteConfig.contact.phoneDisplay}</span>
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} data-event-name="email_click">
            <span className={styles.contactLabel}>Email</span>
            <span className={styles.contactValue}>{siteConfig.contact.email}</span>
          </a>
        </div>
        <Link className={styles.faq} href="/faq" data-luxe-cta="true">Review FAQ</Link>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <SiteShell breadcrumbPath="/contact">
      <main className={`inquire-page ${styles.page}`}>
        <ContactHero />
        <ContactHandoff />
      </main>
      <JsonLd data={contactSchema} />
    </SiteShell>
  );
}
