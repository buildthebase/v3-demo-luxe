import Link from "next/link";
import {
  layoutStudies,
  rentalCategories,
  rentalEventLinks,
  rentalGalleryPreview,
  rentalOperations,
  rentalServiceAreas,
  seatingRentalFaqs,
} from "../experiences/seating-rentals-content";
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
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const seatingRentalsPath = "/experiences/seating-rentals";
const [rentalPricingAnswer, ...rentalContextualFaqs] = seatingRentalFaqs;
const seatingRentalsSchema = createServicePageSchema({
  path: seatingRentalsPath,
  serviceId: divisionServiceIds.seating,
  serviceName: "Luxe Seating Rentals",
  serviceType: "Event seating and rental service",
  serviceDescription:
    "Practical, premium event rentals for intimate celebrations, outdoor weddings, showers, birthdays, and private events across Toronto and the GTA.",
  pageName: pageMetadata[seatingRentalsPath].title,
  pageDescription:
    "Explore white resin chairs, 6-ft tables, cocktail tables, event tents, linens, tent walls, lighting, and an 18-ft dance floor, plus coordinated setup and complementary Luxe experiences.",
  areaServed: createAreaServed(rentalServiceAreas),
});

function SeatingHero() {
  return (
    <header className="seating-hero" id="page-overview">
      <div className="seating-hero-copy">
        <p className="foundation-eyebrow">EVENT RENTALS IN TORONTO &amp; THE GTA</p>
        <h1 aria-label="Event rentals for intimate celebrations, outdoor weddings, and beautifully planned gatherings.">
          <span>Event rentals for intimate celebrations,</span>
          <span>outdoor weddings, and beautifully planned gatherings.</span>
        </h1>
        <p>
          From white resin chairs and tables to tents, linens, cocktail tables,
          lighting, and a dance floor, Luxe provides the essential pieces for intimate
          celebrations and outdoor weddings, with coordinated delivery, setup, and the
          option to add Luxe Coffee Bar and Luxe Sweet Cart.
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
      <div className="seating-hero-plan" aria-hidden="true">
        <span />
        <span />
        <i />
        <i />
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
        <div><dt>18' × 18'</dt><dd><strong>Dance floor</strong></dd></div>
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
      legacyClassName="seating-overview"
      title={<>Essential Rentals for Celebrations &amp; Outdoor Events</>}
      lead={<>A focused collection of the core pieces most intimate and mid-sized events actually need.</>}
      copy={
        <>
          <p>
            Luxe Seating Rentals provides chairs, tables, cocktail tables, tents,
            linens, lighting, tent walls, and a dance floor for{" "}
            <Link href="/events/weddings">weddings</Link>,{" "}
            <Link href="/events/baby-showers">baby showers</Link>,{" "}
            <Link href="/events/bridal-showers">bridal showers</Link>, birthdays,
            backyard gatherings, and{" "}
            <Link href="/events/private-events">private celebrations</Link> across
            Toronto and the GTA.
          </p>
          <p>
            Because Luxe Seating Rentals, Luxe Coffee Bar, and Luxe Sweet Cart are part
            of one company, you can coordinate tents, tables, chairs, linens, lighting,
            coffee, and dessert through one inquiry instead of managing several
            separate vendors.
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
      <i />
      <i />
      <i />
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
        {rentalCategories.map((category) => (
          <article className={`seating-item-${category.id}`} key={category.id}>
            <div className="seating-item-plan" aria-hidden="true"><i /><i /><i /></div>
            <h3>{category.name}</h3>
            <strong>{category.role}</strong>
            <p>{category.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LayoutInspiration() {
  return (
    <section className="seating-studies" aria-labelledby="seating-studies-title">
      <header>
        <p className="foundation-label">Rental layout guidance</p>
        <h2 className="foundation-wide-heading" id="seating-studies-title">
          Planning How the Rentals Fit
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
          Delivery, setup, and teardown are confirmed for each event.
        </p>
        <p>
          The rental proposal clearly outlines the services, timing, access
          requirements, responsibilities, and applicable fees included with the booking.
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
        <h2 id="seating-applications-title">Indoor &amp; Outdoor Rental Planning</h2>
        <p className="seating-applications-subtitle">
          Every setting calls for a different approach.
        </p>
      </header>
      <div>
        <article>
          <span>Interior</span>
          <h3>Indoor venue planning and site logistics</h3>
          <p>
            For indoor events, room dimensions, access, delivery timing, and the areas
            available for guest seating, dining, displays, and service help determine
            the right quantities and placement of our rentals.
          </p>
        </article>
        <article>
          <span>Exterior</span>
          <h3>Outdoor event planning and weather contingency</h3>
          <p>
            For backyard and outdoor events, we review the available footprint, ground
            surface, access, tent size, and space needed for tables, chairs, service,
            and the dance floor before confirming the rental setup.
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
        <p className="foundation-label">Recommended by occasion</p>
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
          Full-setting views will show how chairs, tables, tents, linens, lighting,
          and the dance floor come together in real indoor and outdoor celebrations.
        </p>
      </header>
      <div className="seating-gallery-grid" data-asset-status="awaiting-approved-photography">
        {rentalGalleryPreview.map((item) => (
          <figure className={`seating-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
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
        <h2 id="seating-combinations-title">One Team for the Core Rentals, Coffee &amp; Dessert</h2>
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
