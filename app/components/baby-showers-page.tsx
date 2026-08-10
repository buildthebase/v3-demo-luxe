import Link from "next/link";
import {
  babyShowerCombinations,
  babyShowerExperiences,
  babyShowerFaqs,
  babyShowerGallery,
  babyShowerPlanning,
  babyShowerSettings,
  babyShowerStyling,
} from "../events/baby-showers-content";
import { pageMetadata } from "../metadata-config";
import { babyShowersSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  ExperienceSelector,
} from "./signature-elements";
import { SiteShell } from "./site-shell";

const babyShowersPath = "/events/baby-showers";
const babyShowersSchema = createServicePageSchema({
  path: babyShowersPath,
  serviceName: "Baby shower coffee, dessert, and rental experiences",
  serviceType: "Baby shower coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Mobile coffee bars, live dessert carts, and refined event rentals for baby showers in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[babyShowersPath].title,
  pageDescription: pageMetadata[babyShowersPath].description,
});

function BabyShowerHero() {
  return (
    <header className="baby-hero" id="page-overview">
      <div className="baby-hero-copy">
        <p className="foundation-eyebrow">Baby Showers / Toronto &amp; the GTA</p>
        <h1 aria-label="Baby shower dessert carts, coffee bars, and event rentals in Toronto.">
          <span>Baby shower dessert carts,</span>
          <span>coffee bars, and event rentals</span>
          <span>in Toronto.</span>
        </h1>
        <p>
          Specialty espresso bars, iced matcha, live dessert carts, and boutique
          seating rentals designed to create a warm, memorable celebration for
          parents-to-be across Toronto and the GTA.
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
      <div className="baby-hero-art" aria-hidden="true">
        <i />
        <i />
        <i />
        <div><span>Welcome</span><span>Sweetness</span><span>Setting</span></div>
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
          Welcoming drinks set the tone, live dessert creates an interactive focal
          point, and boutique rentals organize the space for photos, gifts, and
          conversation.
        </p>
      </header>
      <div className="baby-overview-parts">
        <article className="baby-overview-welcome">
          <p>WELCOME</p>
          <h3>A warm beginning.</h3>
          <p>
            Greet arriving family and friends with handcrafted specialty espresso,
            lavender lattes, and iced matcha for a relaxed, welcoming arrival.
          </p>
        </article>
        <article className="baby-overview-dessert">
          <p>Dessert moment</p>
          <h3>Something guests can gather around.</h3>
          <p>
            Freshly prepared dessert creates an interactive centre for the
            celebration and a memorable moment for family and friends.
          </p>
        </article>
        <article className="baby-overview-setting">
          <p>THE SETTING</p>
          <h3>Room for the celebration to unfold.</h3>
          <p>
            Boutique lounge seating, accent tables, and crisp linens arranged to
            anchor photo backdrops, gift areas, and comfortable conversation circles.
          </p>
        </article>
      </div>
    </section>
  );
}

function BabyShowerStyling() {
  return (
    <section className="baby-styling" aria-labelledby="baby-styling-title">
      <header>
        <h2 id="baby-styling-title">
          <span>Carry your baby shower theme</span>
          <span>through every detail</span>
        </h2>
        <p>
          Personalize menus, custom wording, cart styling, and room layouts to match
          your color palette and event theme.
        </p>
      </header>
      <div>
        {[babyShowerStyling[1], babyShowerStyling[0], babyShowerStyling[2]].map((item) => (
          <article className={`baby-styling-item-${item.number}`} key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerExperiences() {
  return (
    <ExperienceSelector
      description="Choose an individual service or coordinate all three to create a complete hospitality experience tailored to your shower's schedule."
      experiences={babyShowerExperiences}
      heading={
        <>
          <span>Three Luxe experiences for a</span>
          <span>thoughtfully hosted baby shower</span>
        </>
      }
      id="baby-experiences"
      useItemHeadings
      variant="taupe"
    />
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
            <div aria-hidden="true"><i /><i /></div>
            <h3>{setting.title}</h3>
            <p>{setting.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerGallery() {
  return (
    <section className="baby-gallery luxe-grid-section" aria-labelledby="baby-gallery-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="baby-gallery-title">Baby shower experiences, seen in context.</h2>
        <p>
          See how mobile coffee, live dessert, signage, seating, and room details come
          together within the celebration.
        </p>
      </header>
      <div className="baby-gallery-grid" data-asset-status="awaiting-approved-baby-shower-assets">
        {babyShowerGallery.map((item) => (
          <figure className={`baby-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
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
    />
  );
}

function BabyShowerPlanning() {
  return (
    <section className="baby-planning luxe-grid-section" aria-labelledby="baby-planning-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="baby-planning-title">What to share when planning your baby shower</h2>
        <p>
          Sharing key event details helps us tailor the ideal menu, service footprint,
          and setup schedule for your celebration.
        </p>
      </header>
      <ol>
        {babyShowerPlanning.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
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
        <BabyShowerExperiences />
        <BabyShowerStyling />
        <BabyShowerSettings />
        <BabyShowerCombinations />
        <BabyShowerGallery />
        <BabyShowerPlanning />
        <BabyShowerFaq />
        <ContextualInquiryPanel contextKey="baby-showers" showEyebrow={false} />
      </main>
      <JsonLd data={babyShowersSchema} />
    </SiteShell>
  );
}
