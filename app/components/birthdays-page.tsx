import Link from "next/link";
import {
  birthdayCombinations,
  birthdayContexts,
  birthdayExperiences,
  birthdayFaqs,
  birthdayGallery,
  birthdayPersonalization,
  birthdayPlanning,
} from "../events/birthdays-content";
import { pageMetadata } from "../metadata-config";
import { birthdaysSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
import { SiteShell } from "./site-shell";

const birthdaysPath = "/events/birthdays";
const birthdaysSchema = createServicePageSchema({
  path: birthdaysPath,
  serviceName: "Birthday dessert catering, coffee bar, and rental experiences",
  serviceType: "Birthday dessert catering, mobile coffee bar, and event rental services",
  serviceDescription:
    "Live dessert catering, staffed coffee and matcha service, seating, and event rentals for birthdays in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[birthdaysPath].title,
  pageDescription: pageMetadata[birthdaysPath].description,
  faqs: birthdayFaqs,
});

function BirthdayHero() {
  return (
    <header className="birthday-hero" id="page-overview">
      <div className="birthday-hero-copy">
        <p className="foundation-eyebrow">Birthdays / Toronto &amp; the GTA</p>
        <h1 aria-label="Birthday dessert catering, coffee bars, and rentals in Toronto">
          <span>Birthday dessert catering,</span>
          <span>coffee bars, and rentals</span>
          <span>in Toronto</span>
        </h1>
        <p>
          Interactive live dessert carts, mobile espresso bars, matcha, and boutique
          seating rentals designed for adult milestones, family gatherings, and
          private birthday celebrations across Toronto and the GTA.
        </p>
        <div className="birthday-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#birthday-contexts">EXPLORE THE OCCASION <span aria-hidden="true">↓︎</span></a>
        </div>
      </div>
      <div className="birthday-hero-art" aria-hidden="true">
        <i /><i /><i />
        <span>One person.<br />Their point of view.</span>
      </div>
      <dl className="birthday-hero-proof">
        <div><dt>One inquiry</dt><dd>COFFEE, DESSERT, AND RENTALS</dd></div>
        <div><dt>Milestone-led</dt><dd>PLANNED AROUND THE GUEST OF HONOUR</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BirthdayOverview() {
  return (
    <section className="birthday-overview" aria-labelledby="birthday-overview-title">
      <h2 id="birthday-overview-title">
        Birthday catering planned around the person, not a{" "}
        <span className="birthday-overview-title-tail">standard format.</span>
      </h2>

      <div className="birthday-overview-notes">
        <article>
          <h3>Built around the person</h3>
          <p>
            We tailor the entire service to reflect the guest of honour&apos;s tastes,
            age milestone, guest list, and preferred party aesthetic.
          </p>
        </article>

        <article>
          <h3>One experience or several</h3>
          <p>
            Choose the Luxe Coffee Bar, Luxe Sweet Cart, or Luxe Seating Rentals
            individually, or bundle them into a single coordinated booking.
          </p>
        </article>

        <article>
          <h3>Shaped by the occasion</h3>
          <p>
            We align setup schedules, venue dimensions, guest flow, and power
            requirements to ensure smooth execution on event day.
          </p>
        </article>
      </div>
    </section>
  );
}

function BirthdayContexts() {
  return (
    <section
      className="birthday-contexts luxe-grid-section luxe-grid-section-dark"
      id="birthday-contexts"
      aria-labelledby="birthday-contexts-title"
    >
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 className="foundation-wide-heading" id="birthday-contexts-title">
          Birthday catering for different ages and occasions
        </h2>
      </header>
      <ol>
        {birthdayContexts.map((context) => (
          <li key={context.number}>
            <h3>{context.title}</h3>
            <p>{context.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BirthdayExperiences() {
  return (
    <ExperienceSelector
      id="birthday-experiences"
      experiences={birthdayExperiences}
      heading="Birthday coffee bars, live dessert carts, and event rental options."
      headingClassName="foundation-wide-heading"
      showDescription={false}
      useItemHeadings
      variant="birthday"
    />
  );
}

function BirthdayPersonalization() {
  return (
    <section
      className="birthday-personalization luxe-grid-section"
      aria-labelledby="birthday-personalization-title"
    >
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="birthday-personalization-title">Personalized birthday menus, signage, and room details</h2>
        <p>
          Tailor drink menus, custom cart signage, and event styling elements to
          reflect the guest of honour.
        </p>
      </header>
      <div>
        {birthdayPersonalization.map((item) => (
          <article key={item.number}><h3>{item.title}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthdayCombinations() {
  return (
    <section className="birthday-combinations" aria-labelledby="birthday-combinations-title">
      <header>
        <h2 className="foundation-wide-heading" id="birthday-combinations-title">Birthday service combinations built around the milestone</h2>
        <p>Flexible service pairings designed around your event layout, guest flow, and milestone timing.</p>
      </header>
      <div>
        {birthdayCombinations.map((item) => (
          <article key={item.number}><h3>{item.title}: {item.experiences}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthdayGallery() {
  return (
    <section
      className="birthday-gallery luxe-grid-section luxe-grid-section-dark"
      aria-labelledby="birthday-gallery-title"
    >
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="birthday-gallery-title">Birthday experiences, seen in context.</h2>
        <p>Coffee, live dessert, signage, seating, and room details shown within the celebrations they were planned for.</p>
      </header>
      <div data-asset-status="awaiting-approved-birthday-assets">
        {birthdayGallery.map((item) => (
          <figure className={`birthday-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function BirthdayPlanning() {
  return (
    <section className="birthday-planning" aria-labelledby="birthday-planning-title">
      <header>
        <h2 id="birthday-planning-title">What to share when planning a birthday with Luxe.</h2>
        <p>
          A few clear details help shape the service, setting, and experience
          around the person being celebrated.
        </p>
      </header>
      <ol>
        {birthdayPlanning.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BirthdayFaq() {
  return (
    <section className="birthday-faq" aria-labelledby="birthday-faq-title">
      <header><h2 id="birthday-faq-title">Birthday planning questions.</h2></header>
      <FaqAccordion items={birthdayFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function BirthdaysPage() {
  return (
    <SiteShell breadcrumbPath="/events/birthdays">
      <main className="birthday-page">
        <PageSectionNavigation items={birthdaysSectionNavigation} />
        <BirthdayHero />
        <BirthdayOverview />
        <BirthdayContexts />
        <BirthdayExperiences />
        <BirthdayPersonalization />
        <BirthdayCombinations />
        <BirthdayGallery />
        <BirthdayPlanning />
        <BirthdayFaq />
        <ContextualInquiryPanel contextKey="birthdays" showEyebrow={false} />
      </main>
      <JsonLd data={birthdaysSchema} />
    </SiteShell>
  );
}
