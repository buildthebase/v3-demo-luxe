import { ResponsiveHeroText } from "./responsive-hero-text";
import Link from "next/link";
import styles from "./private-events-refresh.module.css";
import { ExperienceLineIcon } from "./experience-line-icon";
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
        <h1>
          <ResponsiveHeroText mobile="Coffee &amp; desserts for private events.">
            Private Event Coffee Bars, Live Desserts &amp; Rentals in Toronto &amp; the GTA

          </ResponsiveHeroText>
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
    <section className={`private-overview ${styles.chapter} ${styles.overview}`} aria-labelledby="private-overview-title">
      <header>
        <h2 className="foundation-wide-heading" id="private-overview-title"><span className={styles.headingLine}>Your Celebration,</span>{" "}<span className={styles.headingLine}>Your Experience.</span></h2>
        <div className={styles.experienceMarks} aria-hidden="true"><ExperienceLineIcon type="coffee" /><ExperienceLineIcon type="dessert" /><ExperienceLineIcon type="seating" /></div>
      </header>
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
    <section className={`private-contexts ${styles.chapter} ${styles.contexts}`} id="private-occasions" aria-labelledby="private-contexts-title">
      <header>
        <h2 className="foundation-wide-heading" id="private-contexts-title">
          <span className={styles.headingLine}>Private Celebrations,</span>{" "}<span className={styles.headingLine}>Thoughtfully Served.</span>
        </h2>
        <p>
          From intimate gatherings to meaningful milestones, explore how Luxe can complement your celebration.
        </p>
      </header>
      <ol>
        {privateEventContexts.map((context) => (
          <li key={context.number}>
            <span className={styles.number} aria-hidden="true">{context.number}</span>
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
      heading={<><span className={styles.headingLine}>Everything you need</span>{" "}<span className={styles.headingLine}>for a memorable gathering.</span></>}
      headingClassName="foundation-wide-heading"
      id="private-experiences"
      useItemHeadings
      variant="taupe"
    />
  );
}

function PrivateEventPersonalization() {
  return (
    <section className={`private-personalization ${styles.chapter} ${styles.personalization}`} aria-labelledby="private-personalization-title">
      <header>
        <h2 className="foundation-wide-heading" id="private-personalization-title"><span className={styles.headingLine}>Personalized Details</span>{" "}<span className={styles.headingLine}>That Make It Yours.</span></h2>
        <p>From your favourite drinks to custom cart signage and coordinated presentation, every detail can reflect the occasion you&apos;re celebrating.</p>
      </header>
      <div className={styles.personalizationLayout}>
        <div className={styles.personalizationNotes}>
          {privateEventPersonalization.map((item) => (
            <article key={item.number}>
              <div className={styles.detailMark}><ExperienceLineIcon type={item.number === "01" ? "coffee" : item.number === "03" ? "seating" : "details"} /></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivateEventPlanning() {
  return (
    <section className={`private-planning ${styles.chapter} ${styles.planning}`} aria-labelledby="private-planning-title">
      <header>
        <h2 className="foundation-wide-heading" id="private-planning-title"><span className={styles.headingLine}>What to share when planning</span>{" "}<span className={styles.headingLine}>a private event.</span></h2>
        <p>
          Sharing a few preliminary event details helps us design a personalized
          proposal tailored to your vision and venue setup.
        </p>
      </header>
      <ul>
        {privateEventPlanningRequirements.map((item) => (
          <li key={item.number}>
            <svg className={styles.briefIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={item.number === "01"
                ? "M24 6l4 12 12 6-12 5-4 13-5-13-13-5 13-6 5-12Zm14 0v8m-4-4h8"
                : item.number === "02"
                  ? "M10 10h28v30H10V10Zm0 9h28M17 6v9m14-9v9M17 26h3m8 0h3m-14 7h3m8 0h3"
                  : item.number === "03"
                    ? "M10 21h24v9a11 11 0 0 1-22 0v-9Zm24 2h3a5 5 0 0 1 0 10h-4M8 41h31M17 16c-4-4 4-6 0-10m9 10c-4-4 4-6 0-10"
                    : "M12 40V8h24v32M8 40h32M24 8v32m6-18v6M17 13h3m-3 22h3"} />
            </svg>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
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
    <section className={`private-faq ${styles.chapter} ${styles.faq} page-faq-section`} aria-labelledby="private-faq-title">
      <header><h2 className="foundation-wide-heading" id="private-faq-title">Private event FAQs.</h2></header>
      <FaqAccordion items={privateEventFaqs} showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function PrivateEventsPage() {
  return (
    <SiteShell breadcrumbPath="/events/private-events">
      <main className={`private-page ${styles.page}`}>
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
