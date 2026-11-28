import { ResponsiveHeroText } from "./responsive-hero-text";
import Link from "next/link";
import { Fragment } from "react";
import styles from "./bridal-editorial.module.css";
import { ExperienceLineIcon } from "./experience-line-icon";
import { BridalBrandingGallery } from "./bridal-branding-gallery";
import { ProcessStartAction } from "./process-start-action";
import {
  bridalShowerCombinations,
  bridalShowerFaqs,
} from "../events/bridal-showers-content";
import { pageMetadata } from "../metadata-config";
import { imageAssets } from "../image-system";
import { ResponsiveImage } from "./responsive-image";
import { bridalShowersSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { signatureExperiences, type SignatureExperience } from "../signature-elements";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
import { SiteShell } from "./site-shell";

const bridalShowersPath = "/events/bridal-showers";
const bridalShowersSchema = createServicePageSchema({
  path: bridalShowersPath,
  serviceName: "Bridal shower coffee, dessert, and rental experiences",
  serviceType: "Bridal shower coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Coffee cart, matcha, live dessert, rentals, signage, and styling for bridal showers in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[bridalShowersPath].title,
  pageDescription: pageMetadata[bridalShowersPath].description,
  faqs: bridalShowerFaqs,
});

const bridalShowerServices: readonly SignatureExperience[] = signatureExperiences.map(
  (experience) => {
    if (experience.id === "coffee") {
      return {
        ...experience,
        tagline: "A café-style welcome",
        description:
          "Choose from café favourites, signature beverages, premium matcha and milk alternatives to create a menu suited to your bridal shower.",
      };
    }

    if (experience.id === "dessert") {
      return {
        ...experience,
        tagline: "A live sweet moment",
        description:
          "Luxe Sweet Cart options include Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. Your selected option or combination of options is confirmed in your proposal. Soft Serve Add-On is available with select dessert options as an optional enhancement and is not offered as a standalone service.",
      };
    }

    return {
      ...experience,
      name: "Luxe Seating Rentals",
      tagline: "A composed setting",
      description:
        "White resin chairs, 6-ft tables, cocktail tables, linens and optional tenting are available based on event requirements. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
    };
  },
);

function BridalHero() {
  return (
    <header className="bridal-hero" id="page-overview">
      <div className="bridal-hero-copy">
        <h1 aria-label="Bridal shower coffee, dessert, and event rentals in Toronto and the GTA.">
          <ResponsiveHeroText mobile="Coffee &amp; desserts for bridal showers.">
            <span>Bridal shower coffee,</span>{" "}
            <span>dessert, and event rentals</span>{" "}
            <span>in Toronto and the GTA.</span>

          </ResponsiveHeroText>
        </h1>
        <p>
          Elevated coffee and matcha service, interactive live desserts, and curated
          event rentals for a polished, welcoming bridal shower.
        </p>
        <div className="bridal-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event
          </QuoteModalTrigger>
          <a href="#bridal-experiences">
            EXPLORE THE EXPERIENCE
          </a>
        </div>
      </div>
      <div className="bridal-hero-photo">
        <ResponsiveImage asset={imageAssets.experiences.bridalHero} fill />
      </div>
      <dl className="bridal-hero-proof">
        <div><dt>One inquiry</dt><dd>COFFEE, DESSERT, AND RENTALS</dd></div>
        <div><dt>Indoor or outdoor</dt><dd>PLANNED AROUND THE SETTING</dd></div>
        <div><dt>$5 million</dt><dd>LIABILITY INSURANCE</dd></div>
      </dl>
    </header>
  );
}

function BridalOverview() {
  return (
    <section className={`${styles.section} ${styles.overview}`} aria-labelledby="bridal-overview-title">
      <div className={styles.overviewLayout}>
        <figure className={styles.overviewPhoto}>
          <ResponsiveImage asset={{ ...imageAssets.experiences.experiencesGalleryCompletedSetting, sizes: "(max-width: 700px) 90vw, 42vw" }} fill />
        </figure>
        <div className={styles.overviewCopy}>
          <p className={styles.eyebrow}>The bridal shower experience</p>
          <h2 className="foundation-wide-heading" id="bridal-overview-title"><span>Thoughtful hospitality.</span><span>A celebration that feels like you.</span></h2>
          <p className={styles.intro}>Curated beverage service, interactive live desserts, and boutique event rentals designed to match the flow of your celebration.</p>
          <ul className={styles.benefits}>
            <li><h3>One service or a latte of everything</h3><p>Book the Luxe Coffee Bar, Luxe Sweet Cart, or Luxe Seating Rentals as standalone services, or combine them into a single, seamless booking.</p></li>
            <li><h3>Planned around your gathering</h3><p>Welcome arriving guests with signature lattes and iced matcha, highlight the afternoon with a live dessert station, and arrange stylish seating for gift openings and photos.</p></li>
            <li><h3>Shaped by the setting</h3><p>We adapt every detail to your venue layout, guest count, and event schedule to ensure effortless setup and guest flow.</p></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const showerMoments = [
  { number: "01", label: "Guest arrival", title: "A café-style welcome.", copy: "Greet arriving guests with barista-served specialty coffee, iced matchas, and signature lattes for a warm, interactive start to the celebration." },
  { number: "02", label: "Around the table", title: "Space for conversation and connection.", copy: "Arrange stylish seating, dining tables, and crisp linens to anchor gift openings, photo moments, and comfortable guest conversation." },
  { number: "03", label: "The sweet moment", title: "Dessert becomes part of the celebration.", copy: "Treat guests to interactive live dessert service with options including warm Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station and the Luxe Churro Bar. Your selected option or combination of options is confirmed during planning. Soft Serve Add-On is available as an enhancement." },
] as const;

function BridalMoments() {
  return (
    <section className={styles.section} aria-labelledby="bridal-moments-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>The flow of the celebration</p>
        <h2 className="foundation-wide-heading" id="bridal-moments-title">A warm welcome.<br />A sweet afternoon.</h2>
        <p>Coffee, dessert, and room details for each bridal shower moment, from the first drink to the finishing touches.</p>
      </header>
      <ol className={styles.moments}>
        {showerMoments.map((moment) => <li key={moment.number}>
          <div className={styles.momentMarker}><span>{moment.number}</span><ExperienceLineIcon type={moment.number === "01" ? "coffee" : moment.number === "02" ? "seating" : "dessert"} /></div>
          <p className={styles.eyebrow}>{moment.label}</p>
          <h3>{moment.title}</h3><p>{moment.copy}</p>
        </li>)}
      </ol>
      <div className={styles.momentsNote}>
        <ExperienceLineIcon type="presentation" />
        <div><h3>The details carry through.</h3><p>Customized menu signs, branded cups, cart styling, and colour-matched accents can coordinate with your bridal palette. Soft Serve Add-On is available with select dessert options as an enhancement, rather than a standalone service.</p></div>
      </div>
    </section>
  );
}

function BridalDetails() {
  return (
    <section className={`${styles.section} ${styles.personalization}`} aria-labelledby="bridal-details-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Make it personal</p>
        <h2 className="foundation-wide-heading" id="bridal-details-title">Your palette.<br />Your finishing touches.</h2>
        <p>Bridal shower menus, signage, and styling details, tailored to your theme and colour palette.</p>
      </header>
      <div className={styles.personalizationLayout}>
        <BridalBrandingGallery images={[
          { ...imageAssets.experiences.weddingPersonalizedCup, sizes: "(max-width: 700px) 90vw, 23vw" },
          { ...imageAssets.experiences.weddingPersonalizedMenu, sizes: "(max-width: 700px) 90vw, 23vw" },
        ]} />
        <div className={styles.stylingGroups}>
          <article><h3>Menus &amp; drinks</h3><ul className={styles.bullets}><li>Custom signature lattes, Premium Matcha, and seasonal specials</li><li>Alternative milks and personalized menu displays</li></ul></article>
          <article><h3>Signage &amp; presentation</h3><ul className={styles.bullets}><li>Custom cups, arch signage, and available cart branding</li><li>The bride-to-be’s name, event date, or custom wording</li><li>Presentation coordinated with floral accents supplied by your florist or creative team</li></ul><p className={styles.finePrint}>Cart branding depends on project scope, lead time, and production requirements.</p></article>
          <article><h3>The room around the service</h3><ul className={styles.bullets}><li>Rental selections suited to your celebration</li><li>Service placement considered around the venue layout</li></ul></article>
        </div>
      </div>
    </section>
  );
}

function BridalCombinations() {
  return (
    <ExperienceSelector
      id="bridal-experiences"
      experiences={bridalShowerServices}
      heading={
        <>
          <span>Bridal shower coffee, dessert,</span>{" "}
          <span>and rental options.</span>
        </>
      }
      showDescription={false}
      headingClassName="foundation-wide-heading"
      useItemHeadings
      variant="bridal"
    />
  );
}

const combinationServices = [
  [{ type: "coffee", label: "Coffee + matcha", href: "/experiences/coffee-bar" }],
  [{ type: "coffee", label: "Coffee Bar", href: "/experiences/coffee-bar" }, { type: "dessert", label: "Sweet Cart", href: "/experiences/sweet-cart" }],
  [{ type: "dessert", label: "Sweet Cart", href: "/experiences/sweet-cart" }, { type: "seating", label: "Event Rentals", href: "/experiences/seating-rentals" }],
  [{ type: "coffee", label: "Coffee Bar", href: "/experiences/coffee-bar" }, { type: "dessert", label: "Sweet Cart", href: "/experiences/sweet-cart" }, { type: "seating", label: "Event Rentals", href: "/experiences/seating-rentals" }],
] as const;

function BridalServiceCombinations() {
  return (
    <section className={`${styles.section} ${styles.combinations}`} aria-labelledby="bridal-combinations-title">
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Example service combinations</p>
        <h2 className="foundation-wide-heading" id="bridal-combinations-title">Choose the mix for your celebration.</h2>
        <p>These example combinations offer a little inspiration. Book one Luxe service on its own or combine Coffee Bar, Sweet Cart, and Event Rentals to suit your celebration. Your final combination and service details are tailored to your event and confirmed in your proposal.</p>
      </header>
      <div className={styles.combinationGrid}>
        {bridalShowerCombinations.map((combination, index) => <article key={combination.number}>
          <div className={styles.serviceIcons} aria-hidden="true">{combinationServices[index].map(service => <ExperienceLineIcon key={service.type} type={service.type} />)}</div>
          <h3>
            {combination.title.split(" + ").map((service, serviceIndex) => (
              <Fragment key={service}>
                {serviceIndex > 0 && " "}
                <span>{serviceIndex > 0 && "+ "}{service}</span>
              </Fragment>
            ))}
          </h3>
          <p>{combination.description}</p>
        </article>)}
      </div>
      <div className={styles.combinationAction}><ProcessStartAction /></div>
    </section>
  );
}

const planningChecklist = [
  { number: "01", icon: "event", title: "Your event", items: ["Event date and venue location", "Estimated guest count and overall timeline", "Indoor or outdoor setting"] },
  { number: "02", icon: "coffee", title: "Your experiences", items: ["Coffee Bar, Sweet Cart, Event Rentals, or a combination", "Whether you would like matcha with your coffee service"] },
  { number: "03", icon: "seating", title: "Your venue", items: ["Load-in timing and service footprint", "Power supply and water access", "Venue vendor guidelines"] },
  { number: "04", icon: "presentation", title: "Your finishing touches", items: ["Preferred colours and dessert themes", "Custom drink names and signage wording", "Rental styles you have in mind"] },
] as const;

function BridalPlanning() {
  return (
    <section className={`${styles.section} ${styles.planning}`} aria-labelledby="bridal-planning-title">
      <div className={styles.planningLayout}>
        <header className={styles.planningIntro}>
          <p className={styles.eyebrow}>Planning your bridal shower</p>
          <h2 className="foundation-wide-heading" id="bridal-planning-title">Start with what you know.</h2>
          <p>An estimated guest count, a date, and a general location in Toronto or the GTA are enough to start the conversation. Share what you have in mind and we’ll work through the details with you.</p>
        </header>
        <div className={styles.checklist}>
          <p className={styles.checklistLabel}>What to share with us</p>
          {planningChecklist.map(group => <article key={group.title}>
            <div className={styles.checklistMarker} aria-hidden="true">
              <span>{group.number}</span>
              {group.icon === "event" ? <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="15" width="40" height="39" rx="2" /><path d="M12 26h40M22 9v12M42 9v12M22 35h5m10 0h5M22 44h5m10 0h5" /></svg> : <ExperienceLineIcon type={group.icon} />}
            </div>
            <h3>{group.title}</h3>
            <ul className={styles.bullets}>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
          </article>)}
        </div>
        <div className={styles.planningAction}><ProcessStartAction /></div>
      </div>
    </section>
  );
}

function BridalFaq() {
  return (
    <section className="bridal-faq page-faq-section" aria-labelledby="bridal-faq-title">
      <header>
        <h2 id="bridal-faq-title">
          Bridal shower coffee, dessert, and rental FAQs.
        </h2>
      </header>
      <FaqAccordion items={bridalShowerFaqs} showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs</Link>
    </section>
  );
}

export function BridalShowersPage() {
  return (
    <SiteShell breadcrumbPath="/events/bridal-showers">
      <main className="bridal-page">
        <PageSectionNavigation items={bridalShowersSectionNavigation} />
        <BridalHero />
        <BridalOverview />
        <BridalMoments />
        <BridalCombinations />
        <BridalServiceCombinations />
        <BridalDetails />
        <BridalPlanning />
        <BridalFaq />
        <ContextualInquiryPanel contextKey="bridal-showers" showEyebrow={false} />
      </main>
      <JsonLd data={bridalShowersSchema} />
    </SiteShell>
  );
}
