import Link from "next/link";
import { activationFaqs } from "../events/brand-activations-content";
import { imageAssets } from "../image-system";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { ExperienceLineIcon } from "./experience-line-icon";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ResponsiveImage } from "./responsive-image";
import { CredibilityStrip } from "./signature-elements";
import { SiteShell } from "./site-shell";
import styles from "./brand-activations-concept.module.css";

const sections = [
  { id: "activation-concept-hero", label: "Back to top" },
  { id: "activation-trust", label: "Trusted by teams" },
  { id: "activation-experiences", label: "Experiences" },
  { id: "activation-branding", label: "Brand details" },
  { id: "activation-plan", label: "Planning" },
  { id: "activation-questions", label: "Questions" },
] as const;

const brandDetails = [
  {
    title: "Cart & signage",
    description: "Branded panels, vinyl decals and signage featuring your campaign.",
  },
  {
    title: "Cups & menus",
    description: "Custom cups or stickers, menu displays and drink names.",
  },
  {
    title: "Backdrops & presentation",
    description: "Coordinate backdrops and visual details with your wider event.",
  },
] as const;

const activationOccasions = [
  {
    title: "Product launches",
    icon: "M16 54V10m0 2c10-6 20 6 30 0v22c-10 6-20-6-30 0M8 54h16",
  },
  {
    title: "Retail & grand openings",
    icon: "M12 30v25h40V30M8 28l6-16h36l6 16M8 28h48M10 28a7 7 0 0 0 14 0 8 8 0 0 0 16 0 7 7 0 0 0 14 0M25 55V39h14v16",
  },
  {
    title: "Trade shows & conferences",
    icon: "M23 17V9h18v8M16 17h32v38H16V17Zm8 12h16M24 37h16M24 45h9",
  },
  {
    title: "Campaign events",
    icon: "M11 27h12l27-11v30L23 35H11v-8Zm12 8 5 18H18l-5-18M56 22l4-4m-4 24 4 4",
  },
] as const;

const planningSteps = [
  {
    title: "Share your brief",
    description: "Send your dates, venues, guest count and preferred services.",
  },
  {
    title: "Shape the details",
    description: "We confirm menus, branding and artwork with you before production.",
  },
  {
    title: "Plan service day",
    description: "Our team coordinates staffing, setup and venue requirements.",
  },
] as const;

const questions = [
  {
    question: "How is custom branding priced?",
    answer: "Your proposal separates coffee bar or dessert service from custom branding and production. Pricing depends on the materials, quantities and details you choose.",
  },
  activationFaqs[1],
  activationFaqs[2],
  activationFaqs[3],
  activationFaqs[4],
  {
    question: "Can you work with our agency or brand team?",
    answer: "Yes. We work directly with brand, marketing and creative teams, event producers and venues. Share your approved logos, colours and campaign messaging, along with the person who will approve the artwork.",
  },
  {
    question: "What about multiple days, locations or setups?",
    answer: "We review these together with your schedule, expected attendance, staffing and venue needs. Additional setups and multi-location service depend on the event scope and availability.",
  },
  activationFaqs[7],
  {
    question: "How early should we get in touch?",
    answer: "As soon as you have dates in mind. Custom print, artwork approvals and larger campaigns need extra production time. We will confirm what is possible for your timeline before you book.",
  },
] as const;

const activationPath = "/events/brand-activations";
const activationSchema = createServicePageSchema({
  path: activationPath,
  serviceName: "Branded coffee cart and event activation experiences",
  serviceType: "Branded coffee, matcha, dessert, and event activation services",
  serviceDescription: "Custom-branded coffee, matcha, live dessert, signage, menus, cups, and event support for activations across Toronto and the GTA.",
  pageName: pageMetadata[activationPath].title,
  pageDescription: "Plan branded coffee bar and dessert experiences, custom signage and cups, and service for your campaign.",
  faqs: questions,
});

export function BrandActivationsPage({ comparison = false }: { comparison?: boolean }) {
  return (
    <SiteShell breadcrumbPath={comparison ? undefined : activationPath}>
      <main className={styles.page}>
        {!comparison ? <JsonLd data={activationSchema} /> : null}
        {comparison ? (
          <div className={styles.comparisonBar}>
            <span>Brand Activations / Updated design</span>
            <Link href="/preview/brand-activations-archive">View archived version</Link>
          </div>
        ) : null}
        <PageSectionNavigation items={sections} />

        <header className={styles.hero} id="activation-concept-hero">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Brand Activations / Toronto &amp; the GTA</p>
              <h1><span>Your brand.</span><span>Served by Luxe.</span></h1>
              <p className={styles.lead}>
                Coffee bar and live dessert experiences for launches, pop-ups and
                campaign events. We bring your colours and messaging to the cart,
                cups and more.
              </p>
              <QuoteModalTrigger className={styles.button}>Plan Your Event</QuoteModalTrigger>
            </div>
            <figure className={styles.heroPhoto}>
              <ResponsiveImage asset={{
                ...imageAssets.experiences.coffeeBarHero,
                sizes: "(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1100px) 44vw, 580px",
              }} />
            </figure>
          </div>
          <div className={styles.trust} id="activation-trust">
            <h2>Selected organizations Luxe has served</h2>
            <CredibilityStrip variant="hero" label="Selected organizations Luxe has served" showLabel={false} />
          </div>
        </header>

        <section className={`${styles.section} ${styles.dark}`} id="activation-experiences" aria-labelledby="activation-experiences-title">
          <div className={styles.container}>
            <header className={styles.centerHeading}>
              <h2 id="activation-experiences-title">Choose your guest experience.</h2>
              <p>Book either service or bring both together through one inquiry.</p>
            </header>
            <div className={styles.services}>
              <article>
                <ExperienceLineIcon type="coffee" />
                <h3>The Luxe Coffee Bar</h3>
                <p>Barista-served specialty coffee, matcha and iced drinks, with a menu tailored to your event.</p>
                <Link className={styles.textLink} href="/experiences/coffee-bar">Explore Coffee Bar</Link>
              </article>
              <article>
                <ExperienceLineIcon type="dessert" />
                <h3>The Luxe Sweet Cart</h3>
                <p>Mini Dutch pancakes, waffles on a stick, mini donuts or the Luxe Churro Bar, prepared live.</p>
                <Link className={styles.textLink} href="/experiences/sweet-cart">Explore Sweet Cart</Link>
              </article>
            </div>
            <div className={styles.occasions}>
              <h3 className={styles.occasionsHeading}>Made for</h3>
              <ul>
                {activationOccasions.map((occasion) => (
                  <li key={occasion.title}>
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={occasion.icon} />
                    </svg>
                    <span>{occasion.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section} id="activation-branding" aria-labelledby="activation-branding-title">
          <div className={`${styles.container} ${styles.brandingGrid}`}>
            <figure className={styles.brandingPhoto}>
              <ResponsiveImage asset={{
                ...imageAssets.experiences.coffeeBarDecor,
                sizes: "(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1100px) 40vw, 480px",
              }} />
            </figure>
            <div className={styles.brandingCopy}>
              <header>
                <p className={styles.eyebrow}>Brand details</p>
                <h2 id="activation-branding-title">Make it yours.</h2>
                <p>Custom signage, branded cups, backdrops and more, coordinated around your brand.</p>
              </header>
              <dl className={styles.brandDetails}>
                {brandDetails.map((detail) => (
                  <div key={detail.title}>
                    <dt>{detail.title}</dt>
                    <dd>{detail.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.taupe}`} id="activation-plan" aria-labelledby="activation-plan-title">
          <div className={styles.container}>
            <header className={styles.centerHeading}>
              <h2 id="activation-plan-title">From brief to service day.</h2>
              <p>A plan for your venue, guest flow and campaign schedule.</p>
            </header>
            <ol className={styles.steps}>
              {planningSteps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <div className={styles.planningFooter}>
              <div className={styles.insuranceBadge}>
                <svg viewBox="0 0 32 38" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 2 29 7v11c0 8-6 13-13 17C9 31 3 26 3 18V7L16 2Z" />
                  <path d="m10 18 4 4 8-9" />
                </svg>
                <div>
                  <strong>$5 million liability insurance</strong>
                  <span>Venue documentation available on request.</span>
                </div>
              </div>
              <QuoteModalTrigger className={`${styles.button} ${styles.goldButton}`}>Start Here</QuoteModalTrigger>
            </div>
          </div>
        </section>

        <section className={styles.section} id="activation-questions" aria-labelledby="activation-questions-title">
          <div className={`${styles.container} ${styles.questionsGrid}`}>
            <header>
              <h2 id="activation-questions-title">Before we get started.</h2>
              <p>Have a brief ready? Still exploring ideas? We can help you work through the options.</p>
            </header>
            <FaqAccordion items={questions} showNumbers={false} />
            <div className={styles.questionsAction}>
              <QuoteModalTrigger className={styles.button}>Plan Your Event</QuoteModalTrigger>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
