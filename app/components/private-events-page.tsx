import Link from "next/link";
import {
  privateEventContexts,
  privateEventExperiences,
  privateEventFaqs,
  privateEventGallery,
  privateEventPersonalization,
  privateEventPlanningRequirements,
} from "../events/private-events-content";
import { pageMetadata } from "../metadata-config";
import { privateEventsSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
import { SiteShell } from "./site-shell";

const privateEventsPath = "/events/private-events";
const privateEventsSchema = createServicePageSchema({
  path: privateEventsPath,
  serviceName: "Private event coffee, dessert, and rental experiences",
  serviceType: "Private event coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Staffed coffee service, non-coffee beverages, live dessert, signage, and event rentals for private celebrations in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[privateEventsPath].title,
  pageDescription: pageMetadata[privateEventsPath].description,
  faqs: privateEventFaqs,
});

function PrivateEventsHero() {
  return (
    <header className="private-hero" id="page-overview">
      <div className="private-hero-copy">
        <p className="foundation-eyebrow">Private Events / Toronto &amp; the GTA</p>
        <h1 aria-label="Private Event Coffee, Dessert & Rentals in Toronto">
          <span>Private Event Coffee,</span>
          <span>Dessert &amp; Rentals in Toronto</span>
        </h1>
        <p>
          Bring Luxe Coffee Bar, Sweet Cart and select event rentals to engagements,
          anniversaries, graduations, cultural celebrations, holiday gatherings and
          meaningful family occasions.
        </p>
        <div className="private-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#private-occasions">
            Explore the Occasions <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="private-hero-art" aria-hidden="true">
        <div><i /><i /><i /></div>
        <strong>Yours,<br />by design.</strong>
        <span>One occasion.<br />Its own composition.</span>
      </div>
      <dl className="private-hero-proof">
        <div>
          <dt>One or several</dt>
          <dd>Book Coffee Bar, Sweet Cart or event rentals individually, or combine multiple Luxe services through one coordinated inquiry.</dd>
        </div>
        <div>
          <dt>Personalized</dt>
          <dd>Tailor custom drink menus, branded cart decals, signage, and seating layouts to your theme.</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Full commercial liability coverage for complete peace of mind at any venue.</dd>
        </div>
      </dl>
    </header>
  );
}

function PrivateEventsOverview() {
  return (
    <section className="private-overview" aria-labelledby="private-overview-title">
      <h2 id="private-overview-title">Private event experiences for every kind of gathering</h2>
      <div>
        <p>
          Every private celebration carries its own unique energy, guest flow,
          and timing. We tailor the Luxe experience around your celebration, venue
          and the way you want guests to enjoy the event.
        </p>
        <p>
          From morning engagement brunches to late-night anniversary dessert
          bars, we align our mobile specialty coffee service, live sweets, and seating rentals
          to perfectly match your event format.
        </p>
      </div>
    </section>
  );
}

function PrivateEventContexts() {
  return (
    <section className="private-contexts" id="private-occasions" aria-labelledby="private-contexts-title">
      <header>
        <h2 id="private-contexts-title">
          <span>Private events for engagements,</span>
          <span>graduations, holidays,</span>
          <span>and milestones</span>
        </h2>
        <p>
          From intimate family celebrations to major cultural gatherings, we
          customize our service flow to match your occasion.
        </p>
      </header>
      <ol>
        {privateEventContexts.map((context) => (
          <li key={context.number}>
            <h3 className="private-context-title">{context.title}</h3>
            <p className="private-context-description">{context.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PrivateEventExperiences() {
  return (
    <ExperienceSelector
      description="Explore our core service pillars tailored for private celebrations across Toronto and the GTA."
      experiences={privateEventExperiences}
      heading={
        <>
          <span>Coffee bars, live desserts,</span>
          <span>and rentals for private events</span>
        </>
      }
      headingClassName="foundation-wide-heading"
      id="private-experiences"
      useItemHeadings
      variant="taupe"
    />
  );
}

function PrivateEventPersonalization() {
  return (
    <section className="private-personalization" aria-labelledby="private-personalization-title">
      <header>
        <h2 id="private-personalization-title">Make the occasion distinctly its own.</h2>
      </header>
      <div>
        {privateEventPersonalization.map((item) => (
          <article key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PrivateEventGallery() {
  return (
    <section className="private-gallery" aria-labelledby="private-gallery-title">
      <header>
        <h2 id="private-gallery-title">Private event experiences, seen in context.</h2>
        <p>Coffee, live dessert, signage, seating, and room details shown within the gatherings they were planned for.</p>
      </header>
      <div data-asset-status="awaiting-approved-private-event-assets">
        {privateEventGallery.map((item) => (
          <figure className={`private-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function PrivateEventPlanning() {
  return (
    <section className="private-planning" aria-labelledby="private-planning-title">
      <header>
        <h2 id="private-planning-title">What to share when planning a private event.</h2>
        <p>
          Sharing a few preliminary event details helps us design a personalized
          proposal tailored to your vision and venue setup.
        </p>
      </header>
      <ol>
        {privateEventPlanningRequirements.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <p>
        <strong>Booking Policy:</strong> Your date is secured once the agreement is
        signed and the 30% non-refundable retainer is received.
      </p>
    </section>
  );
}

function PrivateEventFaq() {
  return (
    <section className="private-faq" aria-labelledby="private-faq-title">
      <header><h2 id="private-faq-title">Private event FAQs.</h2></header>
      <FaqAccordion items={privateEventFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function PrivateEventsPage() {
  return (
    <SiteShell breadcrumbPath="/events/private-events">
      <main className="private-page">
        <PageSectionNavigation items={privateEventsSectionNavigation} />
        <PrivateEventsHero />
        <PrivateEventsOverview />
        <PrivateEventContexts />
        <PrivateEventExperiences />
        <PrivateEventPersonalization />
        <PrivateEventGallery />
        <PrivateEventPlanning />
        <PrivateEventFaq />
        <ContextualInquiryPanel contextKey="private-events" showEyebrow={false} />
      </main>
      <JsonLd data={privateEventsSchema} />
    </SiteShell>
  );
}
