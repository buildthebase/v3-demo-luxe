import Link from "next/link";
import { imageAssets } from "../image-system";
import { ResponsiveImage } from "./responsive-image";
import { EventInquiryAction } from "./event-inquiry-action";
import { ProcessStartAction } from "./process-start-action";
import {
  privateEventContexts,
  privateEventExperiences,
  privateEventFaqs,
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
        <h1>
          Private Event Coffee Bars, Live Desserts &amp; Rentals in Toronto &amp; the GTA
        </h1>
        <p>
          From engagement parties and anniversaries to graduations, cultural
          celebrations, and intimate gatherings, Luxe brings specialty coffee,
          handcrafted desserts, and thoughtfully selected event rentals to your celebration.
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
      <div className="private-hero-photo">
        <ResponsiveImage asset={imageAssets.experiences.privateHero} />
      </div>
      <dl className="private-hero-proof">
        <div>
          <dt>One Inquiry</dt>
          <dd>COFFEE, DESSERT &amp; EVENT RENTALS</dd>
        </div>
        <div>
          <dt>Made Personal</dt>
          <dd>CUSTOM MENUS, BRANDING &amp; EVENT DETAILS</dd>
        </div>
        <div>
          <dt>$5 Million</dt>
          <dd>LIABILITY INSURANCE</dd>
        </div>
      </dl>
    </header>
  );
}

function PrivateEventsOverview() {
  return (
    <section className="private-overview" aria-labelledby="private-overview-title">
      <h2 id="private-overview-title">Your Celebration, Your Experience.</h2>
      <div>
        <p>
          Every gathering has its own atmosphere, and the details should reflect it.
          From the first handcrafted drink to the final sweet moment, we tailor our
          services to complement your occasion, venue, and guests.
        </p>
        <p>
          Whether you&apos;re hosting an intimate engagement party, a milestone anniversary,
          a graduation, or a cultural celebration, Luxe Coffee Bar, Luxe Sweet Cart,
          and event rentals can be booked individually or combined into one coordinated experience.
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
          Private Celebrations, Thoughtfully Served.
        </h2>
        <p>
          From intimate gatherings to meaningful milestones, explore how Luxe can complement your celebration.
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
      <EventInquiryAction />
    </section>
  );
}

function PrivateEventExperiences() {
  return (
    <ExperienceSelector
      description="Choose one Luxe experience or bring multiple services together for a beautifully coordinated celebration."
      experiences={privateEventExperiences}
      heading="Everything You Need for a Memorable Gathering."
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
        <h2 id="private-personalization-title">Personalized Details That Make It Yours.</h2>
        <p>From your favourite drinks to custom cart signage and coordinated presentation, every detail can reflect the occasion you&apos;re celebrating.</p>
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
      <ProcessStartAction label="PLAN YOUR EVENT" />
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
        <PrivateEventPlanning />
        <PrivateEventFaq />
        <ContextualInquiryPanel contextKey="private-events" showEyebrow={false} />
      </main>
      <JsonLd data={privateEventsSchema} />
    </SiteShell>
  );
}
