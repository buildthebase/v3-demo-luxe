import {
  HomeEventCategories,
  HomePositioning,
  HomeSelectedImagery,
  HomeServiceArea,
  HomeTrust,
} from "./home-sections";
import { HomeHero } from "./home-hero";
import { HomeCaseStudy } from "./home-case-study";
import {
  ContextualInquiryPanel,
  EventPlanningPathway,
  ExperienceSelector,
} from "./signature-elements";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { SiteShell } from "./site-shell";
import { homeSectionNavigation } from "../page-section-navigation";
import { pageMetadata } from "../metadata-config";
import { createHomePageSchema } from "../schema-builders";
import {
  signatureExperiences,
  type SignatureExperience,
  type EventPlanningStep,
} from "../signature-elements";

const homePlanningSteps: readonly EventPlanningStep[] = [
  {
    number: "01",
    title: "Tell Us About Your Event",
    description: "Share your event date, location, guest count, and the occasion you're celebrating.",
    href: "/events",
  },
  {
    number: "02",
    title: "Choose Your Experiences",
    description: "Explore our Coffee Bar, Sweet Cart, and Event Rentals. Book one service or combine multiple Luxe experiences.",
    href: "/experiences",
  },
  {
    number: "03",
    title: "Personalize the Details",
    description: "Select your menu preferences, custom signage, branding, and any additional enhancements.",
    href: "/faq",
  },
  {
    number: "04",
    title: "Receive Your Proposal",
    description: "We'll prepare a tailored proposal outlining your selected services, pricing, and next steps to secure your date.",
    href: "/contact",
  },
];

const homeSignatureExperiences: readonly SignatureExperience[] = [
  {
    ...signatureExperiences[0],
    name: "Luxe Coffee Bar: Specialty Coffee & Matcha Catering",
    headingLead: "Luxe Coffee Bar:",
    headingDetail: "Specialty Coffee & Matcha Catering",
    supportingNote: "Proudly partnering with Ontario coffee roasters to bring quality specialty coffee to every event.",
    description:
      "Bring a premium café experience to your event with professional baristas serving specialty coffees, signature lattes, iced beverages, matcha, and personalized drink menus.",
  },
  {
    ...signatureExperiences[1],
    name: "Luxe Sweet Cart: Live Dessert Experiences",
    headingLead: "Luxe Sweet Cart:",
    headingDetail: "Live Dessert Experiences",
    description:
      "Treat your guests to freshly prepared mini Dutch pancakes, Belgian waffles on a stick, mini donuts, or live churros, complete with sauces, toppings, and interactive service.",
  },
  {
    ...signatureExperiences[2],
    name: "Luxe Event Rentals: Seating, Tables & Tents",
    headingLead: "Luxe Event Rentals:",
    headingDetail: "Seating, Tables & Tents",
    description:
      "Complete your event with white resin chairs, tables, cocktail tables, linens, tent rentals, and dance floors up to 18' × 18'. Tent lighting is available exclusively with our tent rentals.",
  },
];

const homePageSchema = createHomePageSchema({
  pageName: pageMetadata["/"].title,
  pageDescription: pageMetadata["/"].description,
});

export function HomePage() {
  return (
    <SiteShell>
      <main className="home-page">
        <JsonLd data={homePageSchema} />
        <PageSectionNavigation items={homeSectionNavigation} />
        <HomeHero />
        <dl
          className="home-hero-proof-points"
          aria-label="Luxe Event Co. experience and liability coverage"
          data-evidence-status="client-supplied"
        >
          <div>
            <dt>$5M</dt>
            <dd>Commercial Liability Coverage</dd>
          </div>
          <div>
            <dt>Three Luxe Experiences</dt>
            <dd>Coffee • Desserts • Event Rentals</dd>
          </div>
        </dl>
        <HomePositioning />
        <ExperienceSelector
          id="experience-selector"
          experiences={homeSignatureExperiences}
          heading="Our Core Event Experiences"
          showDescription={false}
        />
        <HomeCaseStudy />
        <EventPlanningPathway id="planning-journey" steps={homePlanningSteps} actionLabel="PLAN YOUR EVENT" showDescription={false} />
        <HomeEventCategories />
        <HomeSelectedImagery />
        <HomeTrust />
        <HomeServiceArea />
        <ContextualInquiryPanel id="event-planning" contextKey="home" />
      </main>
    </SiteShell>
  );
}
