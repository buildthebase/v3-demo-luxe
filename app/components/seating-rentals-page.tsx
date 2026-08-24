import Link from "next/link";
import {
  layoutStudies,
  rentalCategories,
  rentalEventLinks,
  rentalGalleryPreview,
  rentalOperations,
  rentalServiceAreas,
  seatingRentalFaqs,
  tentConfigurationOptions,
} from "../experiences/seating-rentals-content";
import { imageAssets, type ResponsiveImageAsset } from "../image-system";
import { pageMetadata } from "../metadata-config";
import { seatingRentalsSectionNavigation } from "../page-section-navigation";
import {
  createAreaServed,
  createServicePageSchema,
  divisionServiceIds,
} from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { ExperienceContextSection } from "./experience-context-section";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ResponsiveImage } from "./responsive-image";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const seatingRentalsPath = "/experiences/seating-rentals";
const [rentalPricingAnswer, ...rentalContextualFaqs] = seatingRentalFaqs;
const rentalCategoryImages: Record<string, ResponsiveImageAsset | undefined> = {
  chairs: imageAssets.experiences.whiteResinChairs,
  tables: imageAssets.experiences.sixFootRectangularTables,
  "cocktail-tables": imageAssets.experiences.cocktailTables,
  tents: imageAssets.experiences.eventTents,
  "dance-floor": imageAssets.experiences.danceFloor,
  finishing: imageAssets.experiences.rentalFinishingPieces,
};
const seatingRentalsSchema = createServicePageSchema({
  path: seatingRentalsPath,
  serviceId: divisionServiceIds.seating,
  serviceName: "Luxe Seating Rentals",
  serviceType: "Event seating and rental service",
  serviceDescription:
    "A focused collection of premium seating and event rentals for weddings, showers, backyard and outdoor events, birthdays, engagements, and private celebrations across Toronto and the GTA.",
  pageName: pageMetadata[seatingRentalsPath].title,
  pageDescription:
    "Explore 300 White Resin Chairs, 25 6-ft rectangular tables, 10 Cocktail Tables, 3 × 20' × 20' tents, 2 × 10' × 10' tents, 1 × 15' × 15' tent, linens and tent walls. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
  areaServed: createAreaServed(rentalServiceAreas),
});

function TentFootprintDiagram({
  diagramGroups,
  moduleSize,
}: {
  diagramGroups: readonly number[];
  moduleSize: 10 | 15 | 20;
}) {
  return (
    <div className="seating-tent-diagram" aria-hidden="true">
      {diagramGroups.map((moduleCount, groupIndex) => (
        <span className="seating-tent-diagram-choice" key={`${moduleCount}-${groupIndex}`}>
          {groupIndex > 0 ? <span className="seating-tent-diagram-or">or</span> : null}
          <span
            className={`seating-tent-diagram-group seating-tent-diagram-${moduleSize}`}
          >
            {Array.from({ length: moduleCount }, (_, moduleIndex) => (
              <i key={moduleIndex} />
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

function SeatingHero() {
  return (
    <header className="seating-hero" id="page-overview">
      <div className="seating-hero-copy">
        <p className="foundation-eyebrow">EVENT RENTALS IN TORONTO &amp; THE GTA</p>
        <h1 aria-label="Event rentals for intimate celebrations, outdoor weddings and beautifully planned gatherings across Toronto & the GTA.">
          <span>Event rentals for intimate celebrations,</span>
          <span>outdoor weddings and beautifully planned gatherings across Toronto &amp; the GTA.</span>
        </h1>
        <p>
          A focused collection of chairs, tables, tents, linens and cocktail tables for
          weddings, showers, birthdays and private events. Tent Lighting is available
          with Luxe tent rentals and is not offered as a standalone service. Dance-floor
          configurations available up to 18&apos; × 18&apos;.
        </p>
        <div className="seating-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#rental-categories">
            EXPLORE RENTAL OPTIONS <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="seating-hero-plan seating-hero-photo">
        <ResponsiveImage asset={imageAssets.experiences.seatingRentalsHero} fill />
        <b>Gather / dine / celebrate</b>
      </div>
      <div className="coffee-hero-proof-heading">
        <h2 id="seating-hero-proof-title">
          <span>Seating rentals.</span>
          <span>Mobile coffee bar.</span>
          <span>Dessert cart.</span>
          <span>All in one place.</span>
        </h2>
      </div>
      <dl
        className="sweet-hero-proof seating-hero-proof"
        aria-labelledby="seating-hero-proof-title"
      >
        <div><dt>300</dt><dd><strong>White resin chairs</strong></dd></div>
        <div><dt>25</dt><dd><strong>6-ft tables</strong></dd></div>
        <div><dt>6</dt><dd><strong>Event tents</strong></dd></div>
        <div><dt>18&apos; × 18&apos;</dt><dd><strong>Dance floor</strong></dd></div>
        <div><dt>One inquiry</dt><dd><strong>Rentals, coffee &amp; dessert</strong></dd></div>
      </dl>
    </header>
  );
}

function SeatingOverview() {
  return (
    <ExperienceContextSection
      id="seating-overview"
      ariaLabelledBy="seating-overview-title"
      artAriaHidden={false}
      legacyClassName="seating-overview"
      artClassName="seating-overview-media"
      title={<>Essential Rentals for Celebrations &amp; Outdoor Events</>}
      lead={<>A focused collection of the core pieces most intimate and mid-sized events actually need.</>}
      copy={
        <>
          <p>
            Luxe Seating Rentals provides chairs, tables, cocktail tables, tents,
            linens and tent walls for{" "}
            <Link href="/events/weddings">weddings</Link>,{" "}
            <Link href="/events/baby-showers">baby showers</Link>,{" "}
            <Link href="/events/bridal-showers">bridal showers</Link>, birthdays,
            backyard gatherings, and{" "}
            <Link href="/events/private-events">private celebrations</Link> across
            Toronto and the GTA.
          </p>
          <p>
            Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations
            available up to 18&apos; × 18&apos;.
          </p>
          <p>
            Luxe offers a focused rental collection rather than a broad
            conference-furniture catalogue. Our rentals are best suited to events
            requiring classic white seating, rectangular tables, cocktail tables,
            tenting and related essentials.
          </p>
          <p>
            With Luxe Seating Rentals, Luxe Coffee Bar, and Luxe Sweet Cart under one
            roof, you can coordinate the rentals, coffee, and dessert through one team
            and one inquiry, making the event easier to plan from the start.
          </p>
          <p className="seating-overview-handoff">
            Luxe Seating Rentals can be booked independently or coordinated with{" "}
            <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
            <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> through one{" "}
            <Link href="/contact">Luxe Event Co. inquiry</Link>.
          </p>
        </>
      }
    >
      <ResponsiveImage asset={imageAssets.experiences.seatingRentalsOverview} fill />
    </ExperienceContextSection>
  );
}

function RentalCategories() {
  return (
    <section
      className="seating-inventory"
      id="rental-categories"
      aria-labelledby="seating-inventory-title"
      data-evidence-status="confirmed-categories"
    >
      <header>
        <p className="foundation-label">Confirmed rental categories</p>
        <h2 className="foundation-wide-heading" id="seating-inventory-title">
          Event Seating &amp; Rental Options
        </h2>
        <p className="seating-inventory-subtitle">
          Premium chair, table, and tent rentals for celebrations across Toronto and
          the GTA.
        </p>
        <p>
          Browse the core inventory available for ceremonies, showers, birthdays,
          backyard events, outdoor celebrations, and intimate weddings. Quantities
          remain subject to availability for your date.
        </p>
      </header>
      <div className="seating-inventory-grid">
        {rentalCategories.map((category) => {
          const categoryImage = rentalCategoryImages[category.id];

          return (
            <article className={`seating-item-${category.id}`} key={category.id}>
              {categoryImage ? (
                <div className="seating-item-plan seating-item-photo">
                  <ResponsiveImage asset={categoryImage} fill />
                </div>
              ) : (
                <div className="seating-item-plan" aria-hidden="true"><i /><i /><i /></div>
              )}
              <h3>{category.name}</h3>
              <strong>{category.role}</strong>
              {"items" in category ? (
                <ul>
                  {category.items.map((item) => (
                    <li key={item.label}>
                      {item.label}
                      {"subitems" in item ? (
                        <ul>
                          {item.subitems.map((subitem) => <li key={subitem}>{subitem}</li>)}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p>{category.description}</p>
            </article>
          );
        })}
      </div>
      <section
        className="seating-tent-specifications"
        aria-labelledby="seating-tent-specifications-title"
        data-evidence-status="pending-luxe-confirmation"
      >
        <header>
          <p className="foundation-label">Tent coordination</p>
          <h3 id="seating-tent-specifications-title">Available Tent Configurations</h3>
        </header>
        <div
          className="seating-tent-specification-table"
          role="table"
          aria-label="Tent configurations and available setups"
        >
          <div className="seating-tent-specification-head" role="row">
            <span role="columnheader">Configuration</span>
            <span role="columnheader">Available setup</span>
            <span role="columnheader">Footprint</span>
          </div>
          {tentConfigurationOptions.map((option) => (
            <article className="seating-tent-specification-row" key={option.id} role="row">
              <div role="cell">
                <small aria-hidden="true">Configuration</small>
                <strong>{option.configuration}</strong>
              </div>
              <div role="cell">
                <small aria-hidden="true">Available setup</small>
                <span>{option.setup}</span>
              </div>
              <div role="cell" aria-label={`${option.configuration} footprint diagram`}>
                <small aria-hidden="true">Footprint</small>
                <TentFootprintDiagram
                  diagramGroups={option.diagramGroups}
                  moduleSize={option.moduleSize}
                />
              </div>
            </article>
          ))}
        </div>
        <p className="seating-tent-specification-note">
          Tent configurations are subject to inventory availability, site conditions
          and event requirements.
        </p>
      </section>
    </section>
  );
}

function LayoutInspiration() {
  return (
    <section className="seating-studies" aria-labelledby="seating-studies-title">
      <header>
        <p className="foundation-label">Rental coordination</p>
        <h2 className="foundation-wide-heading" id="seating-studies-title">
          Coordinating How the Rentals Fit
        </h2>
      </header>
      <div>
        {layoutStudies.map((study) => (
          <article className={`seating-study-${study.tone}`} key={study.number}>
            <div aria-hidden="true"><i /><i /><i /><i /></div>
            <h3>{study.title}</h3>
            <p>
              <strong>{study.lead}</strong> {study.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RentalOperations() {
  return (
    <section
      className="seating-operations"
      aria-labelledby="seating-operations-title"
      data-evidence-status="confirmed-boundary-policy-pending"
    >
      <header>
        <p className="foundation-label">Delivery, setup, and teardown</p>
        <h2 id="seating-operations-title">Rental Delivery, Setup &amp; Pickup</h2>
        <p className="seating-operations-subtitle">
          Delivery, setup and pickup options are quoted based on the rental order, venue location, access requirements and requested service. Setup is not automatically included with delivery unless specified in your proposal.
        </p>
      </header>
      <div className="seating-operation-grid">
        {rentalOperations.map((operation) => (
          <article data-step={operation.number} key={operation.number}>
            <span className="seating-operation-number" aria-hidden="true">
              {operation.number}
            </span>
            <h3>{operation.title}</h3>
            <p>{operation.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function IndoorOutdoorApplications() {
  return (
    <section className="seating-applications" aria-labelledby="seating-applications-title">
      <header>
        <p className="foundation-label">Indoor and outdoor applications</p>
        <h2 id="seating-applications-title">Indoor &amp; Outdoor Rental Coordination.</h2>
        <p className="seating-applications-subtitle">
          Every setting calls for a different approach.
        </p>
      </header>
      <div>
        <article className="seating-application-indoor">
          <span>Interior</span>
          <div className="seating-application-photo">
            <ResponsiveImage asset={imageAssets.experiences.seatingIndoorApplication} fill />
          </div>
          <h3>Indoor rental coordination and site logistics</h3>
          <p>
            For indoor events, room dimensions, access, delivery timing, and the areas
            available for guest seating, dining, displays, and service help determine
            the right quantities and placement of our rentals.
          </p>
        </article>
        <article className="seating-application-outdoor">
          <span>Exterior</span>
          <div className="seating-application-photo">
            <ResponsiveImage asset={imageAssets.experiences.seatingOutdoorApplication} fill />
          </div>
          <h3>Outdoor rental coordination and weather contingency</h3>
          <p>
            For backyard and outdoor events, we review the available footprint, ground
            surface, access, tent size, wind and weather considerations, and space needed
            for tables, chairs and service. Dance-floor configurations available up to
            18&apos; × 18&apos;. Suitability and any contingency requirements must be confirmed
            for the specific site and event.
          </p>
        </article>
      </div>
    </section>
  );
}

function RentalEvents() {
  return (
    <section className="seating-events" aria-labelledby="seating-events-title">
      <header>
        <p className="foundation-label">Ideal events</p>
        <h2 className="foundation-wide-heading" id="seating-events-title">
          <span>Rentals made for the celebrations</span>
          <span>we know how to support.</span>
        </h2>
      </header>
      <div>
        {rentalEventLinks.map((event, index) => (
          <Link href={event.href} key={`${event.href}-${event.label}`}>
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

function RentalGallery() {
  return (
    <section className="seating-gallery" aria-labelledby="seating-gallery-title">
      <header>
        <p className="foundation-label">Rental gallery</p>
        <h2 id="seating-gallery-title">The rental setup, seen as part of the celebration.</h2>
        <p>
          Full-setting views will show how chairs, tables, tents and linens come together
          in real indoor and outdoor celebrations. Tent Lighting is available with Luxe
          tent rentals and is not offered as a standalone service. Dance-floor configurations
          available up to 18&apos; × 18&apos;.
        </p>
      </header>
      <div className="seating-gallery-grid" data-asset-status="awaiting-luxe-photography">
        {rentalGalleryPreview.map((item) => (
          <figure className={`seating-gallery-${item.tone}`} key={item.number}>
            <div className="seating-gallery-hold" aria-hidden="true">
              <span>Image placement reserved</span>
            </div>
            <figcaption>
              <span>{item.number}</span>
              <h3>{item.label}</h3>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe event gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function RentalPricing() {
  return (
    <section className="seating-pricing" aria-labelledby="seating-pricing-title">
      <header>
        <p className="foundation-label">Pricing and service area</p>
        <h2 id="seating-pricing-title">How are event seating and table rentals priced?</h2>
      </header>
      <PriorityAnswer
        label="Cost factors"
        question={rentalPricingAnswer.question}
        answer={rentalPricingAnswer.answer}
        href="/contact"
        linkLabel="Plan Your Event"
      />
    </section>
  );
}

function RentalCombinations() {
  return (
    <section
      className="seating-combinations related-experiences"
      aria-labelledby="seating-combinations-title"
    >
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="seating-combinations-title">One Team for Rentals, Coffee &amp; Dessert</h2>
        <p>
          Bring the core pieces of your event together through one inquiry. Pair Luxe
          rentals with our mobile Coffee Bar or live Sweet Cart experience without
          coordinating multiple vendors.
        </p>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <h3>Luxe Coffee Bar</h3>
          <p>
            Add a staffed mobile coffee experience to your rental plan through the same
            Luxe inquiry, with placement coordinated around tables, tents, and guests.
          </p>
          <b aria-hidden="true">Explore Coffee Bar ↗︎</b>
        </Link>
        <Link href="/experiences/sweet-cart">
          <h3>Luxe Sweet Cart</h3>
          <p>
            Add a live dessert cart to a shower, birthday, backyard event, or intimate
            wedding without coordinating a separate company.
          </p>
          <b aria-hidden="true">Explore Sweet Cart ↗︎</b>
        </Link>
      </div>
    </section>
  );
}

function RentalFaq() {
  return (
    <section className="seating-faq" aria-labelledby="seating-faq-title">
      <header>
        <p className="foundation-label">Rental questions</p>
        <h2 id="seating-faq-title">What to know before planning your rentals.</h2>
      </header>
      <FaqAccordion items={rentalContextualFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function SeatingRentalsPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/seating-rentals">
      <main className="seating-page">
        <JsonLd data={seatingRentalsSchema} />
        <PageSectionNavigation items={seatingRentalsSectionNavigation} />
        <SeatingHero />
        <SeatingOverview />
        <RentalCategories />
        <LayoutInspiration />
        <IndoorOutdoorApplications />
        <RentalOperations />
        <RentalEvents />
        <RentalPricing />
        <RentalGallery />
        <RentalCombinations />
        <RentalFaq />
        <ContextualInquiryPanel contextKey="seating-rentals" />
      </main>
    </SiteShell>
  );
}
