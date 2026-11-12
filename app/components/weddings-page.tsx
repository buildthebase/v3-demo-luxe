import Link from "next/link";
import { EventInquiryAction } from "./event-inquiry-action";
import {
  weddingCustomization,
  weddingExperiences,
  weddingFaqs,
  weddingGalleryPreview,
  weddingLogistics,
  weddingMoments,
} from "../events/weddings-content";
import { pageMetadata } from "../metadata-config";
import { imageAssets } from "../image-system";
import { weddingsSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { WeddingBrandingGallery } from "./wedding-branding-gallery";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ResponsiveImage } from "./responsive-image";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
import { SiteShell } from "./site-shell";

const weddingsPath = "/events/weddings";
const weddingsSchema = createServicePageSchema({
  path: weddingsPath,
  serviceName: "Luxe wedding coffee, dessert, and rental experiences",
  serviceType: "Wedding coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Wedding coffee, live dessert, and refined rental experiences from Luxe Event Co. for celebrations in Toronto, the GTA, and select Southern Ontario destinations.",
  pageName: pageMetadata[weddingsPath].title,
  pageDescription:
    "Plan coffee service, live dessert, and refined wedding rentals with Luxe Event Co. across Toronto and the GTA.",
  faqs: weddingFaqs,
});

function WeddingHero() {
  return (
    <header className="wedding-hero" id="page-overview">
      <div className="wedding-hero-copy">
        <p className="foundation-eyebrow">Weddings / Toronto &amp; the GTA</p>
        <h1>
          Wedding Coffee Bars, Live Dessert Experiences, and Event Rentals in Toronto &amp; the GTA.
        </h1>
        <p>
          From handcrafted specialty coffee and matcha to freshly prepared desserts
          and refined event rentals, Luxe brings personalized hospitality to every
          part of your wedding celebration.
        </p>
        <div className="wedding-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#wedding-day">
            Explore the Wedding Day <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="wedding-hero-art">
        <ResponsiveImage asset={imageAssets.experiences.weddingHero} fill />
      </div>
      <dl className="wedding-hero-proof">
        <div>
          <dt>One inquiry</dt>
          <dd>Coffee, dessert, and rentals</dd>
        </div>
        <div>
          <dt>Three experiences</dt>
          <dd>COFFEE · DESSERT · EVENT RENTALS</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Liability insurance</dd>
        </div>
      </dl>
    </header>
  );
}

function WeddingDay() {
  return (
    <section className="wedding-day" id="wedding-day" aria-labelledby="wedding-day-title">
      <header>
        <p className="foundation-label">Wedding-day possibilities</p>
        <h2 id="wedding-day-title">
          Where Luxe fits into your wedding schedule
        </h2>
        <p>
          Every wedding follows a unique timeline. Discover how our experiences
          seamlessly integrate into each moment of your celebration.
        </p>
      </header>
      <ol>
        {weddingMoments.map((moment) => (
          <li key={moment.number}>
            <div
              className={`wedding-day-symbol wedding-day-symbol-${moment.number}`}
              aria-hidden="true"
            >
              <span />
            </div>
            <div className="wedding-day-copy">
              <div className="wedding-day-kicker">
                <span>{moment.number}</span>
                <p className="wedding-day-phase">{moment.phase}</p>
              </div>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
            <aside className="wedding-day-fit">
              <small>{moment.fitLabel}</small>
              <strong>{moment.fit}</strong>
            </aside>
          </li>
        ))}
      </ol>
      <p className="wedding-day-note">
        * Final placement, timing, staffing, and service duration are confirmed
        around the wedding schedule and venue requirements.
      </p>
    </section>
  );
}

function WeddingCustomization() {
  return (
    <section className="wedding-customization" aria-labelledby="wedding-customization-title">
      <header>
        <p className="foundation-label">Made specific to the celebration</p>
        <h2 id="wedding-customization-title">
          Personalized Details, Thoughtfully Styled.
        </h2>
        <p>
          From custom coffee cart signage and branded cups to signature drink menus
          and coordinated dessert presentation, the finishing touches should feel uniquely yours.
        </p>
        <div className="wedding-customization-image">
          <p className="wedding-branding-label">Examples of Luxe Custom Branding</p>
          <WeddingBrandingGallery />
        </div>
      </header>
      <div>
        {weddingCustomization.map((item) => (
          <article key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <EventInquiryAction />
    </section>
  );
}

function WeddingCoordination() {
  return (
    <section
      className="wedding-coordination"
      aria-labelledby="wedding-coordination-title"
      data-measurement-section="logistics"
      data-section-id="wedding-coordination"
    >
      <header>
        <p className="foundation-label">Planning and logistics</p>
        <h2 id="wedding-coordination-title">
          The Details We Plan With You.
        </h2>
      </header>
      <ol>
        {weddingLogistics.map((item) => (
          <li key={item.number}>
            <svg className="wedding-coordination-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={item.iconPath} />
            </svg>
            <div className="wedding-coordination-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WeddingGallery() {
  return (
    <section className="wedding-gallery" aria-labelledby="wedding-gallery-title">
      <header>
        <p className="foundation-label">Wedding gallery</p>
        <h2 id="wedding-gallery-title">Real Moments. Thoughtful Hospitality.</h2>
        <p>Explore how Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals complement wedding celebrations through personalized service and presentation.</p>
      </header>
      <div className="wedding-gallery-grid">
        {[[weddingGalleryPreview[0], weddingGalleryPreview[2]], [weddingGalleryPreview[1]]].map((column) => (
          <div className="wedding-gallery-column" key={column[0].number}>
            {column.map((item) => (
              <figure className={`wedding-gallery-${item.tone}`} key={item.number}>
                <div>
                  {item.image ? (
                    <ResponsiveImage asset={item.image} />
                  ) : (
                    <span aria-hidden="true"><i /><i /><i /></span>
                  )}
                </div>
                <figcaption>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
      <Link href="/gallery">
        Explore the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

function WeddingFaq() {
  return (
    <section className="wedding-faq" aria-labelledby="wedding-faq-title">
      <header>
        <p className="foundation-label">Wedding planning questions</p>
        <h2 id="wedding-faq-title">Wedding planning questions, answered.</h2>
      </header>
      <FaqAccordion items={weddingFaqs} showNumbers={false} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function WeddingsPage() {
  return (
    <SiteShell breadcrumbPath="/events/weddings">
      <main className="wedding-page">
        <JsonLd data={weddingsSchema} />
        <PageSectionNavigation items={weddingsSectionNavigation} />
        <WeddingHero />
        <WeddingDay />
        <WeddingGallery />
        <ExperienceSelector
          id="wedding-experiences"
          experiences={weddingExperiences}
          footer={
            <Link href="/contact">
              Book one experience independently or coordinate several through
              one Luxe Event Co. wedding plan.
            </Link>
          }
          heading="Three experiences, each with a clear role."
          showDescription={false}
          useItemHeadings
          variant="taupe"
        />
        <WeddingCustomization />
        <WeddingCoordination />
        <WeddingFaq />
        <ContextualInquiryPanel id="wedding-inquiry" contextKey="weddings" />
      </main>
    </SiteShell>
  );
}
