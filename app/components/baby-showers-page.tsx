import Link from "next/link";
import { ProcessStartAction } from "./process-start-action";
import {
  babyShowerCombinations,
  babyShowerFaqs,
  babyShowerPlanning,
  babyShowerSettings,
} from "../events/baby-showers-content";
import { pageMetadata } from "../metadata-config";
import { imageAssets } from "../image-system";
import { ResponsiveImage } from "./responsive-image";
import { babyShowersSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
} from "./signature-elements";
import { SiteShell } from "./site-shell";
import { ExperienceLineIcon } from "./experience-line-icon";

const babyShowersPath = "/events/baby-showers";
const babyShowersSchema = createServicePageSchema({
  path: babyShowersPath,
  serviceName: "Baby shower coffee, dessert, and rental experiences",
  serviceType: "Baby shower coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Baby shower dessert carts, coffee bars and event rentals in Toronto and the Greater Toronto Area, available individually or coordinated together.",
  pageName: pageMetadata[babyShowersPath].title,
  pageDescription: pageMetadata[babyShowersPath].description,
});

function BabyShowerHero() {
  return (
    <header className="baby-hero" id="page-overview">
      <div className="baby-hero-copy">
        <p className="foundation-eyebrow">Baby Showers / Toronto &amp; the GTA</p>
        <h1 aria-label="Baby shower dessert carts, coffee bars and event rentals in Toronto.">
          <span>Baby shower dessert carts,</span>
          <span>coffee bars and event rentals</span>
          <span>in Toronto.</span>
        </h1>
        <p>
          Create a welcoming baby shower with premium coffee and matcha service,
          interactive live desserts and select event rentals, available individually
          or coordinated together.
        </p>
        <div className="baby-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#baby-overview">
            Explore the Experience <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="baby-hero-art">
        <ResponsiveImage asset={imageAssets.experiences.babyHero} fill />
      </div>
      <dl className="baby-hero-proof">
        <div><dt>One inquiry</dt><dd>Three distinct experiences</dd></div>
        <div><dt>Indoor or outdoor</dt><dd>Planned around the setting</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BabyShowerOverview() {
  return (
    <section className="baby-overview luxe-grid-section" id="baby-overview" aria-labelledby="baby-overview-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header className="baby-overview-header">
        <h2 id="baby-overview-title">A baby shower shaped in three thoughtful parts</h2>
        <p>
          Welcome guests with coffee and matcha, treat them to freshly made
          desserts, and create a comfortable space to celebrate together.
        </p>
      </header>
      <div className="baby-overview-parts">
        <article className="baby-overview-welcome">
          <div className="baby-overview-image"><ResponsiveImage asset={imageAssets.experiences.babyWelcome} fill /></div>
          <p>WELCOME</p>
          <h3>A warm beginning.</h3>
          <p>
            Greet family and friends with Luxe Coffee Bar specialty coffee,
            custom lattes and Premium Matcha for a relaxed, welcoming arrival.
          </p>
        </article>
        <article className="baby-overview-dessert">
          <div className="baby-overview-image"><ResponsiveImage asset={imageAssets.experiences.babyDessert} fill /></div>
          <p>Dessert moment</p>
          <h3>Something guests can gather around.</h3>
          <p>
            Gather around Luxe Sweet Cart for freshly prepared Mini Dutch
            Pancakes, Belgian Waffles on a Stick, Mini Donuts or the Luxe Churro Bar.
            Your selected menu is confirmed in your proposal.
          </p>
        </article>
        <article className="baby-overview-setting">
          <div className="baby-overview-image"><ResponsiveImage asset={imageAssets.experiences.babySetting} fill /></div>
          <p>THE SETTING</p>
          <h3>Room for the celebration to unfold.</h3>
          <p>
            Select Luxe chairs, tables, linens and optional tent rentals can support
            the confirmed needs of an indoor or outdoor baby shower.
          </p>
        </article>
      </div>
      <div className="baby-overview-quote">
        <QuoteModalTrigger>
          Get a baby shower quote <span aria-hidden="true">↗︎</span>
        </QuoteModalTrigger>
      </div>
    </section>
  );
}

function BabyShowerSettings() {
  return (
    <section className="baby-settings luxe-grid-section" aria-labelledby="baby-settings-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="baby-settings-title">Indoor or outdoor, the setting shapes the plan.</h2>
      </header>
      <div>
        {babyShowerSettings.map((setting) => (
          <article key={setting.number}>
            <div>
              {setting.number === "02" ? (
                <ResponsiveImage asset={imageAssets.experiences.babyOutdoor} fill />
              ) : (
                <ResponsiveImage asset={imageAssets.experiences.babyIndoor} fill />
              )}
            </div>
            <h3>{setting.title}</h3>
            <p>{setting.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerCombinations() {
  return (
    <CombinedExperienceFeature
      combinations={babyShowerCombinations}
      cardTitlesAsHeadings
      description="Flexible service combinations tailored around your venue, guest count, event schedule, and desired atmosphere."
      heading="Ways the experiences can come together"
      id="baby-combinations"
      showGridSurface
      useLineIcons={false}
      variant="original"
    />
  );
}

function BabyShowerPlanning() {
  return (
    <section className="baby-planning baby-planning-merged luxe-grid-section" aria-labelledby="baby-planning-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="baby-planning-title">Plan the details of your baby shower.</h2>
        <p>
          Share what you have in mind. We’ll help with menus, personal touches and the setup.
        </p>
      </header>
      <ol>
        {babyShowerPlanning.map((item) => (
          <li key={item.number}>
            <ExperienceLineIcon type={item.icon} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <ProcessStartAction />
    </section>
  );
}

function BabyShowerFaq() {
  return (
    <section className="baby-faq luxe-grid-section" aria-labelledby="baby-faq-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header><h2 id="baby-faq-title">Baby shower planning questions, answered.</h2></header>
      <FaqAccordion items={babyShowerFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function BabyShowersPage() {
  return (
    <SiteShell breadcrumbPath="/events/baby-showers">
      <main className="baby-page">
        <PageSectionNavigation items={babyShowersSectionNavigation} />
        <BabyShowerHero />
        <BabyShowerOverview />
        <BabyShowerSettings />
        <BabyShowerCombinations />
        <BabyShowerPlanning />
        <BabyShowerFaq />
        <ContextualInquiryPanel contextKey="baby-showers" showEyebrow={false} />
      </main>
      <JsonLd data={babyShowersSchema} />
    </SiteShell>
  );
}
