import Link from "next/link";
import { ProcessStartAction } from "./process-start-action";
import {
  bridalShowerCombinations,
  bridalShowerDetails,
  bridalShowerFaqs,
  bridalShowerGallery,
  bridalShowerPlanning,
} from "../events/bridal-showers-content";
import { pageMetadata } from "../metadata-config";
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
        <p className="foundation-eyebrow">Bridal Showers / Toronto &amp; the GTA</p>
        <h1 aria-label="Bridal shower coffee cart, dessert, and event rentals in Toronto and the GTA.">
          <span>Bridal shower coffee cart,</span>{" "}
          <span>dessert, and event rentals</span>{" "}
          <span>in Toronto and the GTA.</span>
        </h1>
        <p>
          Elevated coffee and matcha service, interactive live desserts and curated
          event rentals for a polished, welcoming bridal shower.
        </p>
        <div className="bridal-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#bridal-experiences">
            EXPLORE THE EXPERIENCE <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="bridal-hero-art" aria-hidden="true">
        <div><b>Café</b></div>
        <div><b>Sweet</b></div>
        <div><b>Setting</b></div>
        <i /><i />
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
    <section className="bridal-host-overview" aria-labelledby="bridal-overview-title">
      <h2 id="bridal-overview-title">
        Curated beverage service, interactive live desserts, and boutique event
        rentals designed to match the flow of your celebration.
      </h2>
      <div className="bridal-host-overview-notes">
        <article>
          <h3>Booked independently or together</h3>
          <p>
            Book the Luxe Coffee Bar, Luxe Sweet Cart, or Luxe Seating Rentals
            as standalone services, or combine them into a single, seamless
            booking.
          </p>
        </article>
        <article>
          <h3>Planned around the gathering</h3>
          <p>
            Welcome arriving guests with signature lattes and iced matcha,
            highlight the afternoon with a live dessert station, and arrange
            stylish seating for gift openings and photos.
          </p>
        </article>
        <article>
          <h3>Shaped by the setting</h3>
          <p>
            We adapt every detail to your venue layout, guest count, and event
            schedule to ensure effortless setup and guest flow.
          </p>
        </article>
      </div>
    </section>
  );
}

function BridalMoments() {
  return (
    <section className="bridal-moments luxe-grid-section" aria-labelledby="bridal-moments-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <p className="foundation-label">Where Luxe can fit into the bridal shower</p>
        <h2 id="bridal-moments-title">
          <span>Coffee, dessert, and room details</span>
          <span>for each bridal shower moment</span>
        </h2>
        <p>
          From the initial welcome drink to the live dessert presentation,
          every detail works together to create an unforgettable experience for
          the bride-to-be.
        </p>
      </header>
      <div className="bridal-moment-band">
        <article>
          <p>Guest arrival</p>
          <h3>A café-style welcome.</h3>
          <p>
            Greet arriving guests with barista-served specialty coffee, iced matchas, and
            signature lattes for a warm, interactive start to the
            celebration.
          </p>
        </article>
        <article>
          <p>Around the table</p>
          <h3>Space for conversation and connection.</h3>
          <p>
            Arrange stylish seating, dining tables, and crisp linens to anchor
            gift openings, photo moments, and comfortable guest conversation.
          </p>
        </article>
      </div>
      <div className="bridal-moment-band bridal-moment-band-feature">
        <article className="bridal-moment-feature">
          <p>The sweet moment</p>
          <h3>Dessert becomes part of the celebration.</h3>
          <p>
            Treat guests to interactive live dessert service with options including warm
            Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station and
            the Luxe Churro Bar. Your selected option or combination of options is
            confirmed during planning. Soft Serve Add-On is available as an enhancement.
          </p>
        </article>
        <article>
          <p>Presentation throughout</p>
          <h3>The details carry through the room.</h3>
          <p>
            Customized menu signs, branded drink cups, cart styling, and
            color-matched accents that coordinate perfectly with your bridal
            palette.
          </p>
        </article>
      </div>
    </section>
  );
}

function BridalDetails() {
  return (
    <section
      className="bridal-details bridal-personalization"
      aria-labelledby="bridal-details-title"
    >
      <header>
        <h2 id="bridal-details-title">
          Bridal shower menus, signage, and styling details
        </h2>
        <p>
          Customized menus, branded signage, dessert styling, and venue accents
          tailored to match your event theme and colour palette.
        </p>
      </header>
      <ol>
        {bridalShowerDetails.map((detail) => (
          <li key={detail.number}>
            <h3>{detail.title}</h3>
            <p>{detail.description}</p>
          </li>
        ))}
      </ol>
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
      useItemHeadings
      variant="bridal"
    />
  );
}

function BridalServiceCombinations() {
  return (
    <section
      className="bridal-details bridal-personalization"
      aria-labelledby="bridal-combinations-title"
    >
      <header>
        <h2 id="bridal-combinations-title">
          Example bridal shower service combinations
        </h2>
        <p>
          Build the experience around your celebration. Book one Luxe service on
          its own or combine Coffee Bar, Sweet Cart and select rentals based on
          what your bridal shower needs.
        </p>
      </header>
      <ol>
        {bridalShowerCombinations.map((combination) => (
          <li key={combination.number}>
            <span>{combination.experiences}</span>
            <h3>{combination.title}</h3>
            <p>{combination.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BridalGallery() {
  return (
    <section
      className="bridal-gallery luxe-grid-section luxe-grid-section-dark"
      aria-labelledby="bridal-gallery-title"
    >
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <h2 id="bridal-gallery-title">Bridal shower service moments to plan for.</h2>
        <p>
          Consider how coffee, live dessert, signage, seating, and room details
          can support arrivals, guest interaction, and time around the table.
        </p>
      </header>
      <div data-asset-status="awaiting-approved-bridal-shower-assets">
        {bridalShowerGallery.map((item) => (
          <figure className={`bridal-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function BridalPlanning() {
  return (
    <section
      className="bridal-details bridal-planning"
      aria-labelledby="bridal-planning-title"
    >
      <header>
        <h2 id="bridal-planning-title">
          <span>Planning a bridal shower</span>{" "}
          <span>in Toronto and the GTA</span>
        </h2>
        <p>
          Venue logistics, indoor or outdoor settings, guest counts, and setup
          schedules help us tailor the perfect experience for your Toronto or
          GTA celebration.
        </p>
      </header>
      <ol>
        {bridalShowerPlanning.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <ProcessStartAction />
    </section>
  );
}

function BridalFaq() {
  return (
    <section className="bridal-faq" aria-labelledby="bridal-faq-title">
      <header>
        <h2 id="bridal-faq-title">
          Bridal shower coffee, dessert, and rental FAQs.
        </h2>
      </header>
      <FaqAccordion items={bridalShowerFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
      <Link href="/contact">Plan Your Event <span aria-hidden="true">↗︎</span></Link>
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
        <BridalGallery />
        <BridalPlanning />
        <BridalFaq />
        <ContextualInquiryPanel contextKey="bridal-showers" showEyebrow={false} />
      </main>
      <JsonLd data={bridalShowersSchema} />
    </SiteShell>
  );
}
