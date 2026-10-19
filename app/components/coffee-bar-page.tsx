import Link from "next/link";
import {
  coffeeBookingIncludes,
  coffeeEventLinks,
  coffeeFaqs,
  coffeeFormats,
  coffeeGalleryPreview,
  cafeFavourites,
  nonCoffeeCollection,
  signatureCoffeeCollection,
} from "../experiences/coffee-bar-content";
import { pageMetadata } from "../metadata-config";
import { imageAssets } from "../image-system";
import { coffeeBarSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema, divisionServiceIds } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { ExperienceContextSection } from "./experience-context-section";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ResponsiveImage } from "./responsive-image";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";
import { CoffeeProofInfo } from "./coffee-proof-info";
import { CoffeeBrandingGallery } from "./coffee-branding-gallery";

const coffeePath = "/experiences/coffee-bar";
const [coffeePricingAnswer, ...coffeeContextualFaqs] = coffeeFaqs;
const coffeePricingParagraphs = coffeePricingAnswer.answer.split(/\n\n+/);
const coffeeInclusionGroups = [
  {
    id: "service",
    title: "Service & Logistics",
    items: [
      coffeeBookingIncludes[0],
      coffeeBookingIncludes[1],
      coffeeBookingIncludes[2],
    ],
  },
  {
    id: "menu",
    title: "Beverage Menu",
    items: [
      coffeeBookingIncludes[3],
      coffeeBookingIncludes[4],
    ],
  },
  {
    id: "presentation",
    title: "Bar Presentation",
    items: [
      coffeeBookingIncludes[5],
      coffeeBookingIncludes[6],
      coffeeBookingIncludes[7],
      coffeeBookingIncludes[8],
    ],
  },
];
const coffeeBarSchema = createServicePageSchema({
  path: coffeePath,
  serviceId: divisionServiceIds.coffee,
  serviceName: "Luxe Coffee Bar",
  serviceType: "Mobile coffee bar and espresso catering",
  serviceDescription:
    "A complete mobile caf\u00e9 and beverage experience for weddings, corporate events, brand activations, and private events in Toronto and the GTA.",
  pageName: pageMetadata[coffeePath].title,
  pageDescription:
    "Explore the Luxe Signature Coffee Bar, included drinks, customization, capacity, and event applications.",
  faqs: coffeeFaqs,
});

function CoffeeHero() {
  return (
    <header className="coffee-hero" id="page-overview">
      <div className="coffee-hero-copy">
        <p className="foundation-eyebrow">Luxe Coffee Bar / Toronto &amp; the GTA</p>
        <h1 aria-label="Mobile coffee bar catering in Toronto &amp; the GTA.">
          <span>Mobile coffee bar catering</span>
          <span>in Toronto &amp; the GTA.</span>
        </h1>
        <p>
          A complete mobile café experience shaped around the event, with professional
          baristas, premium coffee and matcha service, intentional presentation, and hospitality
          that becomes part of the room.
        </p>
        <div className="coffee-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#coffee-formats">
            Explore Signature Coffee Bar <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="coffee-hero-art">
        <ResponsiveImage
          asset={{ ...imageAssets.experiences.coffeeSignaturePreparation, priority: true, sizes: "(max-width: 700px) calc(100vw - 2rem), 42vw" }}
          className="coffee-hero-photo"
          fill
        />
      </div>
      <div className="sweet-hero-proof-heading">
        <p className="foundation-label">Confirmed capacity and service planning</p>
        <h2 id="coffee-hero-proof-title" className="foundation-wide-heading">
          The service plan follows the room, menu, and guest flow.
        </h2>
      </div>
      <dl className="sweet-hero-proof" aria-labelledby="coffee-hero-proof-title">
        <div>
          <dt>250+</dt>
          <dd className="coffee-proof-with-info">
            <strong>Guest capacity</strong>
            <CoffeeProofInfo
              id="coffee-capacity-info"
              label="More information about Coffee Bar guest capacity"
            >
              Luxe Coffee Bar serves intimate gatherings through large-scale events, with service plans tailored to guest count, menu, venue requirements and event flow. Larger-format events can be accommodated through a customized service plan.
            </CoffeeProofInfo>
          </dd>
        </div>
        <div>
          <dt>Multiple</dt>
          <dd className="coffee-proof-with-info">
            <strong>Service setups available for select events</strong>
            <CoffeeProofInfo
              id="coffee-setups-info"
              label="More information about multiple Coffee Bar service setups"
            >
              For larger events, conferences and multi-space venues, additional Coffee Bar setups can be incorporated based on event scope, staffing, venue requirements and availability.
            </CoffeeProofInfo>
          </dd>
        </div>
        <div>
          <dt>$5M</dt>
          <dd><strong>Liability insurance</strong></dd>
        </div>
        <div>
          <dt>Included</dt>
          <dd><strong>Setup and takedown</strong></dd>
        </div>
        <div>
          <dt>Planned</dt>
          <dd><strong>Space, power, &amp; water</strong></dd>
        </div>
      </dl>
    </header>
  );
}

function CoffeeOverview() {
  return (
    <ExperienceContextSection
      id="coffee-overview"
      ariaLabelledBy="coffee-overview-title"
      legacyClassName="coffee-overview"
      artClassName="coffee-overview-media"
      title={<>Specialty Coffee &amp; Matcha Service</>}
      lead={<>Coffee is woven into the event as hospitality, atmosphere, and an experience guests can gather around.</>}
      copy={
        <>
          <p>
            A mobile coffee bar brings commercial espresso equipment, skilled baristas,
            and barista-served specialty coffee directly to your venue. Luxe Coffee Bar
            provides elevated mobile café catering for{" "}
            <Link href="/events/weddings">weddings</Link>,{" "}
            <Link href="/events/corporate-events">corporate events</Link>,{" "}
            <Link href="/events/brand-activations">brand activations</Link>, showers,
            and{" "}
            <Link href="/events/private-events">private celebrations</Link> across
            Toronto and the GTA.
          </p>
          <p>
            Every setup is tailored to your occasion, guest count, venue schedule, and
            custom menu. Beverages are prepared fresh on-site throughout your service
            window, creating a seamless, interactive moment for your guests.
          </p>
          <p className="coffee-overview-handoff">
            Luxe Coffee Bar can be booked independently or coordinated with{" "}
            <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> and{" "}
            <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>{" "}
            through one coordinated inquiry. {" "}
            <QuoteModalTrigger className="coffee-overview-inquiry">
              Plan Your Event
            </QuoteModalTrigger>
          </p>
        </>
      }
    >
      <ResponsiveImage asset={imageAssets.experiences.coffeeBarOverview} fill />
    </ExperienceContextSection>
  );
}

function CoffeeFormats() {
  return (
    <section className="coffee-formats" id="coffee-formats" aria-labelledby="coffee-formats-title">
      <header>
        <p className="foundation-label">The Signature experience</p>
        <h2 id="coffee-formats-title">Luxe Signature Coffee Bar</h2>
      </header>
      <div className="coffee-format-pair">
        {coffeeFormats.filter((format) => format.id === "signature-bar").map((format) => (
          <article className={`coffee-format-${format.id}`} key={format.id}>
            <div className="coffee-format-art coffee-format-photo">
              <ResponsiveImage asset={{ ...imageAssets.experiences.coffeeBarHero, priority: false, sizes: "(max-width: 700px) calc(100vw - 2rem), 34vw" }} fill />
            </div>
            <div className="coffee-format-copy">
              <p className="coffee-format-label">{format.formatLabel}</p>
              <h3>{format.displayName}</h3>
              <p className="coffee-format-description">
                <strong>{format.statement}</strong>
              </p>
              <dl>
                <div>
                  <dt>Event fit</dt>
                  <dd>{format.eventFit}</dd>
                </div>
                <div>
                  <dt>Presence</dt>
                  <dd>{format.presence}</dd>
                </div>
                <div>
                  <dt>Confirmed during inquiry</dt>
                  <dd>Service window, spatial footprint, staffing, menu selection, and venue logistics.</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
      <div className="coffee-format-cta">
        <p>Bring the Signature Coffee Bar experience to your event.</p>
        <QuoteModalTrigger data-event-name="inquiry_start">
          Plan Your Event <span aria-hidden="true">↗︎</span>
        </QuoteModalTrigger>
      </div>
    </section>
  );
}

function CoffeeBranding() {
  return (
    <section className="coffee-branding" id="coffee-branding" aria-labelledby="coffee-branding-title">
      <CoffeeBrandingGallery />
      <div className="coffee-branding-copy">
        <p className="foundation-label">Made personal</p>
        <h2 id="coffee-branding-title">Your occasion. Your signature.</h2>
        <p>Carry your event aesthetic or campaign identity through the details guests see, hold and remember.</p>
        <ul>
          <li>Personalized menus and custom drink names</li>
          <li>Custom branded cups or cup stickers</li>
          <li>Event signage and menu displays</li>
          <li>Cart signage and branding aligned with your colours and messaging</li>
        </ul>
        <QuoteModalTrigger className="coffee-branding-link">Personalize Your Coffee Bar</QuoteModalTrigger>
      </div>
    </section>
  );
}

function CoffeeInclusions() {
  return (
    <section
      className="coffee-inclusions"
      aria-labelledby="coffee-inclusions-title"
      data-evidence-status="confirmed-first-party"
    >
      <header>
        <p className="foundation-label">Coffee Bar experience</p>
        <h2 id="coffee-inclusions-title">Complete Mobile Coffee Catering Inclusions</h2>
        <div className="coffee-inclusions-intro">
          <p>
            Everything needed for a complete coffee service.
          </p>
          <p>
            Full barista service, hot and iced beverages, specialty syrups, milk
            alternatives and premium non-coffee options are thoughtfully included in
            your experience.
          </p>
        </div>
      </header>
      <div className="coffee-inclusions-folio">
        <p className="coffee-inclusions-list-label">Included with your booking:</p>
        <div className="coffee-inclusions-groups">
          {coffeeInclusionGroups.map((group) => (
            <article key={group.id} tabIndex={0}>
              <span className={`coffee-inclusion-icon coffee-inclusion-icon-${group.id}`} aria-hidden="true"><i /></span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((inclusion) => (
                  <li key={inclusion}>
                    <strong>{inclusion}</strong>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoffeeMenu() {
  return (
    <section
      className="coffee-menu"
      aria-labelledby="coffee-menu-title"
      data-evidence-status="confirmed-menu-selections"
    >
      <header>
        <p className="foundation-label">The beverage language</p>
        <h2 id="coffee-menu-title">Specialty Coffee, Matcha &amp; Signature Beverages</h2>
        <p className="coffee-menu-tagline">
          <span>Classic at the foundation.</span>{" "}
          <span>Personal in expression.</span>
        </p>
      </header>
      <div className="coffee-menu-core">
        <article data-category="espresso" tabIndex={0}>
          <span className="coffee-menu-icon coffee-menu-icon-bean" aria-hidden="true"><i /></span>
          <h3>Café Favourites</h3>
          <ul>
            {cafeFavourites.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
        <article data-category="signature" tabIndex={0}>
          <span className="coffee-menu-icon coffee-menu-icon-signature" aria-hidden="true"><i /></span>
          <h3>Signature Specialty Lattes</h3>
          <ul>
            {signatureCoffeeCollection.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
        <article data-category="matcha" tabIndex={0}>
          <span className="coffee-menu-icon coffee-menu-icon-leaf" aria-hidden="true"><i /></span>
          <h3>Premium Matcha &amp; Non-Coffee</h3>
          <ul>
            {nonCoffeeCollection.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
      </div>
      <div className="coffee-seasonal">
        <div>
          <p className="foundation-label">Seasonal menu direction</p>
          <h3>Seasonal &amp; Custom Specialty Drinks</h3>
          <p className="coffee-seasonal-subtitle">Select seasonal and custom beverages may be incorporated into your event menu based on availability, event theme and selected Coffee Bar experience.</p>
        </div>
      </div>
    </section>
  );
}

function CoffeeOperations() {
  return (
    <section
      id="coffee-pricing"
      className="coffee-operations coffee-operations-compact"
      aria-labelledby="coffee-pricing-section-title"
      data-evidence-status="confirmed-with-event-specific-dependencies"
      data-measurement-section="logistics"
      data-section-id="coffee-service-planning"
    >
      <header>
        <h2 id="coffee-pricing-section-title">
          Mobile Coffee Bar Pricing &amp; Event Logistics
        </h2>
      </header>
      <PriorityAnswer
        label="Cost factors"
        question={coffeePricingAnswer.question}
        answer={coffeePricingAnswer.answer}
        answerContent={
          <>
            {coffeePricingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph.trim()}</p>
            ))}
          </>
        }
        href="/contact"
        linkLabel="Plan Your Event"
        headingId="coffee-pricing-question"
      />
      <aside>
        <div>
          <strong>
            Serving Toronto, the Greater Toronto Area &amp; Destination Events Across
            Southern Ontario.
          </strong>
          <p>
            Based in Toronto, Luxe Event Co. provides mobile coffee bar catering across
            York Region, Peel, Halton, Durham, and select destination venues throughout
            Southern Ontario.
          </p>
        </div>
        <Link href="/faq">Review booking and logistics questions <span aria-hidden="true">↗︎</span></Link>
      </aside>
    </section>
  );
}

function CoffeeEvents() {
  return (
    <section className="coffee-events" aria-labelledby="coffee-events-title">
      <header>
        <h2 id="coffee-events-title">
          <span>Mobile coffee catering for</span>
          <span>weddings, corporate events, and celebrations.</span>
        </h2>
        <p>
          Mobile coffee catering can suit weddings, office and corporate events,
          conferences, brand activations, showers, birthdays, and private
          celebrations when a staffed beverage experience supports the schedule and
          guest flow.
        </p>
      </header>
      <div>
        {coffeeEventLinks.map((event, index) => (
          <Link href={event.href} key={event.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{event.label}</h3>
            <small>{event.context}</small>
            <b aria-hidden="true">↗︎</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CoffeeGallery() {
  return (
    <section className="coffee-gallery" aria-labelledby="coffee-gallery-title">
<header>
  <h2 id="coffee-gallery-title">
    Mobile coffee bar service, crafted live at your event.
  </h2>
</header>

      <div
        className="coffee-gallery-grid"
        data-asset-status="approved-partial-photography"
      >
        {coffeeGalleryPreview.map((item) => (
          <figure className={`coffee-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden={item.tone !== "cart"}>
              {item.tone === "cart" ? (
                <ResponsiveImage asset={imageAssets.experiences.coffeeBarDecor} fill />
              ) : item.tone === "service" ? (
                <ResponsiveImage asset={imageAssets.experiences.coffeeBarCraftInService} fill />
              ) : item.tone === "drink" ? (
                <ResponsiveImage asset={imageAssets.experiences.coffeeBarFinishedDrink} fill />
              ) : (
                <><i /><i /></>
              )}
            </div>

            <figcaption>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>

      <Link href="/gallery">
        Explore the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

function CoffeeRelated() {
  return (
    <section className="coffee-related" aria-labelledby="coffee-related-title">
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="coffee-related-title">Coffee can stand alone or meet the rest of the room.</h2>
      </header>
      <div>
        <Link href="/experiences/sweet-cart">
          <h3>Luxe Sweet Cart</h3>
          <p>Pair crafted drinks with a live, made-to-order dessert experience.</p>
          <b aria-hidden="true">Explore Sweet Cart ↗︎</b>
        </Link>
        <Link href="/experiences/seating-rentals">
          <h3>Luxe Seating Rentals</h3>
          <p>Connect café hospitality with the structure and setting around it.</p>
          <b aria-hidden="true">Explore Seating Rentals ↗︎</b>
        </Link>
      </div>
    </section>
  );
}

function CoffeeFaq() {
  return (
    <section className="coffee-faq" aria-labelledby="coffee-faq-title">
      <header>
        <p className="foundation-label">Coffee Bar questions</p>
        <h2 id="coffee-faq-title">The practical details, answered directly.</h2>
      </header>
      <FaqAccordion items={coffeeContextualFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function CoffeeBarPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/coffee-bar">
      <main className="coffee-page">
        <JsonLd data={coffeeBarSchema} />
        <PageSectionNavigation items={coffeeBarSectionNavigation} />
        <CoffeeHero />
        <CoffeeOverview />
        <CoffeeFormats />
        <CoffeeBranding />
        <CoffeeInclusions />
        <CoffeeMenu />
        <CoffeeOperations />
        <CoffeeEvents />
        <CoffeeGallery />
        <CoffeeRelated />
        <CoffeeFaq />
        <ContextualInquiryPanel contextKey="coffee-bar" />
      </main>
    </SiteShell>
  );
}
