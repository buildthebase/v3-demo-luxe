import { ResponsiveHeroText } from "./responsive-hero-text";
import Link from "next/link";
import styles from "./birthday-refresh.module.css";
import { ExperienceLineIcon } from "./experience-line-icon";
import { imageAssets } from "../image-system";
import { ResponsiveImage } from "./responsive-image";
import { EventInquiryAction } from "./event-inquiry-action";
import {
  birthdayCombinations,
  birthdayContexts,
  birthdayExperiences,
  birthdayFaqs,
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
        <h1 aria-label="Birthday coffee bars, live dessert carts, and event rentals in Toronto and the GTA.">
          <ResponsiveHeroText mobile="Coffee, desserts &amp; rentals for birthdays.">
            <span>Birthday coffee bars,</span>{" "}
            <span>live dessert carts, and event rentals</span>{" "}
            <span>in Toronto and the GTA.</span>

          </ResponsiveHeroText>
        </h1>
        <p>
          Celebrate birthdays of all ages with handcrafted coffee and matcha,
          freshly prepared desserts, and curated event rentals tailored to your celebration.
        </p>
        <div className="birthday-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event
          </QuoteModalTrigger>
          <a href="#birthday-contexts">Explore Birthday Experiences</a>
        </div>
      </div>
      <div className="birthday-hero-photo">
        <ResponsiveImage asset={imageAssets.experiences.birthdayHero} fill />
      </div>
      <dl className="birthday-hero-proof">
        <div><dt>One inquiry</dt><dd>COFFEE, DESSERT, AND RENTALS</dd></div>
        <div><dt>Every celebration</dt><dd>PERSONALIZED TO THE GUEST OF HONOUR</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BirthdayOverview() {
  return (
    <section className={`birthday-overview ${styles.chapter} ${styles.overview}`} aria-labelledby="birthday-overview-title">
      <h2 className="foundation-wide-heading" id="birthday-overview-title">
        Birthday experiences designed around the guest of honour.
      </h2>

      <div className="birthday-overview-notes">
        <article>
          <ExperienceLineIcon type="presentation" />
          <h3>Personal to every celebration</h3>
          <p>
            We tailor our coffee, dessert, and rental experiences to reflect the
            guest of honour&apos;s tastes, milestone, and celebration style.
          </p>
        </article>

        <article>
          <ExperienceLineIcon type="coffee" />
          <h3>One experience or several</h3>
          <p>
            Book Luxe Coffee Bar, Luxe Sweet Cart, or Luxe Seating Rentals
            individually, or combine multiple services through one coordinated booking.
          </p>
        </article>

        <article>
          <ExperienceLineIcon type="seating" />
          <h3>Designed for your venue</h3>
          <p>
            We coordinate service timing, setup requirements, and guest flow
            around your venue to create a seamless experience.
          </p>
        </article>
      </div>
    </section>
  );
}

function BirthdayContexts() {
  return (
    <section
      className={`birthday-contexts ${styles.chapter} ${styles.contexts}`}
      id="birthday-contexts"
      aria-labelledby="birthday-contexts-title"
    >
      <header>
        <h2 className="foundation-wide-heading" id="birthday-contexts-title">
          <span className={styles.experienceHeadingLine}>Birthday experiences</span>{" "}
          <span className={styles.experienceHeadingLine}>for every kind of celebration.</span>
        </h2>
      </header>
      <ol>
        {birthdayContexts.map((context) => (
          <li key={context.number}>
            <span className={styles.contextNumber} aria-hidden="true">{context.number}</span>
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
      heading={<><span className={styles.experienceHeadingLine}>Birthday coffee bars, live dessert carts,</span>{" "}<span className={styles.experienceHeadingLine}>and event rental options.</span></>}
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
      className={`birthday-personalization ${styles.chapter} ${styles.personalization}`}
      aria-labelledby="birthday-personalization-title"
    >
      <header>
        <h2 className="foundation-wide-heading" id="birthday-personalization-title">Personalized birthday menus, signage, and room details</h2>
        <p>
          Tailor drink menus, custom signage, service presentation and select rental
          enhancements to reflect the guest of honour.
        </p>
      </header>
      <div>
        {birthdayPersonalization.map((item) => (
          <article key={item.number}><span className={styles.articleNumber} aria-hidden="true">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
      <EventInquiryAction />
    </section>
  );
}

function BirthdayCombinations() {
  return (
    <section className={`birthday-combinations ${styles.chapter} ${styles.combinations}`} aria-labelledby="birthday-combinations-title">
      <header>
        <h2 className="foundation-wide-heading" id="birthday-combinations-title">Popular birthday service combinations</h2>
        <p>Choose one Luxe experience or combine multiple services to create a celebration tailored to your guests, venue, and event style.</p>
      </header>
      <div>
        {birthdayCombinations.map((item) => (
          <article key={item.number}><span className={styles.articleNumber} aria-hidden="true">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthdayPlanning() {
  return (
    <section className={`birthday-planning ${styles.chapter} ${styles.planning}`} aria-labelledby="birthday-planning-title">
      <header>
        <h2 className="foundation-wide-heading" id="birthday-planning-title">What to share when planning a birthday with Luxe.</h2>
        <p>
          A few clear details help shape the service, setting, and experience
          around the person being celebrated.
        </p>
      </header>
      <div className={styles.planningList}>
        {birthdayPlanning.map((item, index) => (
          <details key={item.title} name="birthday-planning-notes" open={index === 0}>
            <summary><span className={styles.articleNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3></summary>
            <p>{item.description}</p>
          </details>
        ))}
      </div>
      <EventInquiryAction />
    </section>
  );
}

function BirthdayFaq() {
  return (
    <section className="birthday-faq page-faq-section" aria-labelledby="birthday-faq-title">
      <header><h2 className="foundation-wide-heading" id="birthday-faq-title">Birthday planning questions.</h2></header>
      <FaqAccordion items={birthdayFaqs} showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs</Link>
    </section>
  );
}

export function BirthdaysPage() {
  return (
    <SiteShell breadcrumbPath="/events/birthdays">
      <main className={`birthday-page ${styles.page}`}>
        <PageSectionNavigation items={birthdaysSectionNavigation} />
        <BirthdayHero />
        <BirthdayOverview />
        <BirthdayContexts />
        <BirthdayExperiences />
        <BirthdayPersonalization />
        <BirthdayCombinations />
        <BirthdayPlanning />
        <BirthdayFaq />
        <ContextualInquiryPanel contextKey="birthdays" showEyebrow={false} />
      </main>
      <JsonLd data={birthdaysSchema} />
    </SiteShell>
  );
}
