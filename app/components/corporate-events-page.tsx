import Link from "next/link";
import { EventInquiryAction } from "./event-inquiry-action";
import { ProcessStartAction } from "./process-start-action";
import {
  corporateBrandingOptions,
  corporateEventApplications,
  corporateExperienceRoles,
  corporateFaqs,
  corporatePlanningSteps,
} from "../events/corporate-events-content";
import { pageMetadata } from "../metadata-config";
import { imageAssets } from "../image-system";
import { corporateEventsSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { signatureExperiences } from "../signature-elements";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ResponsiveImage } from "./responsive-image";
import {
  ContextualInquiryPanel,
  CredibilityStrip,
  ExperienceSelector,
} from "./signature-elements";
import { SiteShell } from "./site-shell";

const corporatePath = "/events/corporate-events";
const corporateSchema = createServicePageSchema({
  path: corporatePath,
  serviceName: "Corporate coffee and dessert experiences",
  serviceType: "Corporate coffee catering and event experiences",
  serviceDescription:
    "Coffee, matcha, and live dessert experiences for corporate events across Toronto, the GTA, and select Southern Ontario destinations.",
  pageName: pageMetadata[corporatePath].title,
  pageDescription:
    "Plan coffee, matcha, and live dessert service for corporate events across Toronto and the GTA.",
  faqs: corporateFaqs,
});

const corporateExperiences = corporateExperienceRoles.map((role, index) => ({
  ...signatureExperiences[index],
  label: role.label,
  name: role.name,
  tagline: role.statement,
  description: role.description,
}));

function CorporateHero() {
  return (
    <header className="corporate-hero" id="page-overview">
      <div className="corporate-hero-copy">
        <p className="foundation-eyebrow">Corporate Events / Toronto &amp; the GTA</p>
        <h1 aria-label="Corporate coffee catering and event experiences, ready for business.">
          <span>Corporate coffee catering</span>
          <span>and event experiences,</span>
          <span>ready for business.</span>
        </h1>
        <p>
          Polished mobile coffee bars, matcha stations, and live desserts tailored for
          corporate conferences, workplace activations, client appreciation events,
          and trade shows.
        </p>
        <div className="corporate-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#corporate-capabilities">
            Explore Corporate Capabilities <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="corporate-hero-system">
        <ResponsiveImage asset={imageAssets.experiences.corporateHero} fill />
      </div>
      <dl className="corporate-hero-proof">
        <div>
          <dt>Flexible capacity</dt>
          <dd>Service planned around attendance</dd>
        </div>
        <div>
          <dt>Multiple setups</dt>
          <dd>Available for select events</dd>
        </div>
        <div>
          <dt>Coffee + dessert</dt>
          <dd>Book together or separately</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Liability insurance</dd>
        </div>
      </dl>
    </header>
  );
}

function CorporateOverview() {
  return (
    <section className="corporate-overview" aria-labelledby="corporate-overview-title">
      <div>
        <h2 id="corporate-overview-title" className="foundation-wide-heading">
          Corporate hospitality across Toronto and the GTA, planned around the event.
        </h2>
      </div>
      <div>
        <p>
          Luxe Event Co. provides premium mobile Coffee Bar and Sweet Cart experiences
          for corporate functions where efficient service, brand presentation and guest
          experience matter.
        </p>
        <p>
          Each service plan can be tailored around attendance, event schedule, venue
          access requirements and custom branding needs.
        </p>
      </div>
    </section>
  );
}

function CorporateCapabilities() {
  const [
    employeeEvents,
    clientEvents,
    conferenceEvents,
    officePopUps,
    networkingEvents,
    brandLaunches,
    businessAndCommunityEvents,
  ] = corporateEventApplications;

  const panel = (
    event: (typeof corporateEventApplications)[number],
    feature = false,
  ) => (
    <article
      className={feature ? "corporate-capability-panel-feature" : undefined}
      key={event.number}
    >
      {feature && (
        <div className="corporate-capability-feature-image">
          <ResponsiveImage asset={imageAssets.experiences.corporateEmployeeEvents} fill />
        </div>
      )}
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </article>
  );

  return (
    <section
      className="corporate-capabilities"
      id="corporate-capabilities"
      aria-labelledby="corporate-capabilities-title"
    >
      <header>
        <p className="foundation-label">Corporate event types</p>
        <h2 id="corporate-capabilities-title">
          Corporate event services for every business setting
        </h2>
      </header>
      <div className="corporate-capability-groups">
        <div className="corporate-capability-group">
          {panel(employeeEvents, true)}
          <div className="corporate-capability-stack">
            {panel(conferenceEvents)}
            {panel(clientEvents)}
          </div>
        </div>

        <div className="corporate-capability-group corporate-capability-group-balanced">
          <div className="corporate-capability-stack">
            {panel(officePopUps)}
            {panel(networkingEvents)}
          </div>
          <div className="corporate-capability-stack">
            {panel(brandLaunches)}
            {panel(businessAndCommunityEvents)}
          </div>
        </div>
      </div>
      <EventInquiryAction />
    </section>
  );
}

function CorporateExperiences() {
  return (
    <ExperienceSelector
      experiences={corporateExperiences}
      id="corporate-experiences"
      heading="Choose one corporate event service or coordinate all three."
      headingClassName="foundation-wide-heading"
      showDescription={false}
      useItemHeadings
    />
  );
}

function CorporateBranding() {
  const customMenus = corporateBrandingOptions.find(
    (option) => option.title === "Custom menus",
  )!;
  const brandedCups = corporateBrandingOptions.find(
    (option) => option.title === "Branded cups and signage",
  )!;
  const cartStyling = corporateBrandingOptions.find(
    (option) => option.title === "Cart and service styling",
  )!;

  const brandingPanel = (
    option: (typeof corporateBrandingOptions)[number],
    feature = false,
  ) => (
    <article
      key={option.number}
      className={feature ? "corporate-branding-feature" : undefined}
    >
      {feature ? <div className="corporate-branding-image"><ResponsiveImage asset={imageAssets.experiences.corporateBranding} fill /></div> : null}
      <div>
        <h3>{option.title}</h3>
        <p>{option.description}</p>
      </div>
    </article>
  );

  return (
    <section className="corporate-branding" aria-labelledby="corporate-branding-title">
      <header>
        <div>
          <p className="foundation-label">Branding and customization</p>
          <h2 id="corporate-branding-title">
            <span>Seamless custom branding</span>
            <span>for corporate activations</span>
          </h2>
          <p className="corporate-branding-intro">
            Incorporate corporate logos, campaign messaging, custom cup prints,
            signage, and brand colors across every touchpoint.
          </p>
        </div>
      </header>
      <div className="corporate-branding-composition">
        {brandingPanel(brandedCups, true)}
        <div className="corporate-branding-stack">
          {brandingPanel(customMenus)}
          {brandingPanel(cartStyling)}
        </div>
      </div>
      <Link href="/events/brand-activations">
        Explore Brand Activation Capabilities <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

function CorporateTrust() {
  return (
    <section className="corporate-trust" aria-labelledby="corporate-trust-title">
      <header>
        <p className="foundation-label">Client trust</p>
        <h2 id="corporate-trust-title">Organizations We’ve Had the Pleasure of Serving</h2>
        <p>Selected organizations Luxe has provided event service for.</p>
      </header>
      <CredibilityStrip
        variant="hero"
        label="Selected organizations Luxe has served"
        showLabel={false}
      />
      <p className="corporate-trust-insurance-note">
        <strong>
          Certificate of insurance documentation is available where required
          by venues and corporate event partners.
        </strong>
      </p>
      <p className="corporate-event-fit">
        <QuoteModalTrigger className="corporate-event-fit-link">
          Plan Your Event
        </QuoteModalTrigger>
      </p>
    </section>
  );
}

function CorporatePlanning() {
  return (
    <section className="corporate-planning corporate-planning-merged luxe-grid-section" aria-labelledby="corporate-planning-title">
      <span className="luxe-section-grid" aria-hidden="true" />
      <header>
        <div>
          <p className="foundation-label">Planning and logistics</p>
          <h2 id="corporate-planning-title">
            From event brief to service day
          </h2>
        </div>
        <p>
          A clear plan for single-day, large-scale, multi-day or recurring events.
        </p>
      </header>
      <ol className="corporate-planning-trail">
        {corporatePlanningSteps.map((step) => (
          <li key={step.number}>
            <span className="corporate-planning-marker" aria-hidden="true">{step.number}</span>
            <div className="corporate-planning-step-copy">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <ProcessStartAction />
    </section>
  );
}

function CorporateFaq() {
  return (
    <section className="corporate-faq" aria-labelledby="corporate-faq-title">
      <header>
        <h2 id="corporate-faq-title">Answers for teams preparing the brief.</h2>
      </header>
      <FaqAccordion items={corporateFaqs} showNumbers={false} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function CorporateEventsPage() {
  return (
    <SiteShell breadcrumbPath="/events/corporate-events">
      <main className="corporate-page">
        <JsonLd data={corporateSchema} />
        <PageSectionNavigation items={corporateEventsSectionNavigation} />
        <CorporateHero />
        <CorporateOverview />
        <CorporateCapabilities />
        <CorporateExperiences />
        <CorporateBranding />
        <CorporatePlanning />
        <CorporateTrust />
        <CorporateFaq />
        <ContextualInquiryPanel contextKey="corporate-events" showEyebrow={false} />
      </main>
    </SiteShell>
  );
}
