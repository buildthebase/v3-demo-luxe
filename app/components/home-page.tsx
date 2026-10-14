import {
  HomeEventCategories,
  HomePositioning,
  HomeSelectedImagery,
  HomeServiceArea,
  HomeTrust,
  HomeWorkingExperience,
} from "./home-sections";
import { HomeHero } from "./home-hero";
import { HomeEditorialReview } from "./home-editorial-review";
import { HomeReviewLauncher } from "./home-review-launcher";
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
  ExperienceSelector,
} from "./signature-elements";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { SiteShell } from "./site-shell";
import { homeSectionNavigation } from "../page-section-navigation";
import { pageMetadata } from "../metadata-config";
import { createHomePageSchema } from "../schema-builders";
import {
  signatureExperiences,
  type SignatureExperience,
} from "../signature-elements";

const homeSignatureExperiences: readonly SignatureExperience[] = [
  {
    ...signatureExperiences[0],
    name: "Luxe Coffee Bar: Specialty Coffee & Matcha Service",
    headingLead: "Luxe Coffee Bar:",
    headingDetail: "Specialty Coffee & Matcha Service",
    carouselImages: [
      { id: "home-coffee-core-1-wide", src: "/images/home/coffee-core-1-wide.webp", alt: "Personalized Luxe Coffee Bar with a gold Leandro Mercado do Café front panel in an ivory indoor event setting", width: 1254, height: 1254, sizes: "(max-width: 700px) 100vw, 33vw", unoptimized: true, status: "approved", format: "webp" },
      { id: "home-coffee-core-2-wide", src: "/images/home/coffee-core-2-wide.webp", alt: "White Luxe Coffee Bar with Love is brewing signage beneath a fringed umbrella in an outdoor garden setting", width: 1254, height: 1254, sizes: "(max-width: 700px) 100vw, 33vw", unoptimized: true, status: "approved", format: "webp" },
    ],
    description:
      "Barista-served specialty coffee and matcha service for weddings, corporate arrivals, cocktail hours, and late-night hospitality across Toronto.",
    image: {
      ...signatureExperiences[0].image,
      alt: "Luxe premium mobile Coffee Bar serving specialty coffee, matcha, and custom iced drinks at a Toronto event",
    },
  },
  {
    ...signatureExperiences[1],
    name: "Luxe Sweet Cart: Live Interactive Dessert Station",
    headingLead: "Luxe Sweet Cart:",
    headingDetail: "Live Interactive Dessert Station",
    description:
      "Live dessert preparation and interactive sweet cart experiences designed to create memorable moments for your guests.",
    image: {
      ...signatureExperiences[1].image,
      id: "home-sweet-cart-core-wide",
      src: "/images/home/sweet-cart-core-wide.webp",
      alt: "Centered Luxe Sweet Cart with three globe lights in an evening event venue",
      width: 1254,
      height: 1254,
      sizes: "(max-width: 700px) 100vw, 33vw",
      unoptimized: true,
      format: "webp",
    },
  },
  {
    ...signatureExperiences[2],
    name: "Luxe Seating Rentals: Chair, Table & Tent Rentals",
    headingLead: "Luxe Seating Rentals:",
    headingDetail: "Chair, Table & Tent Rentals",
    description:
      "White resin chairs, 6-ft tables, cocktail tables, event tents and linens for weddings and private celebrations. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
    image: {
      ...signatureExperiences[2].image,
      id: "home-rentals-core-garden",
      src: "/images/home/rentals-core-garden.webp",
      alt: "Overhead view of a garden celebration with white and clear-top tents, banquet tables, chairs and warm tent lighting",
      width: 1254,
      height: 1254,
      sizes: "(max-width: 700px) 100vw, 33vw",
      unoptimized: true,
      format: "webp",
    },
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
            <dd>Liability coverage</dd>
          </div>
          <div>
            <dt>500+</dt>
            <dd>Events served</dd>
          </div>
        </dl>
        <HomePositioning />
        <HomeReviewLauncher />
        <ExperienceSelector
          id="experience-selector"
          experiences={homeSignatureExperiences}
          heading="Our Core Event Experiences"
          showDescription={false}
        />
        <HomeEditorialReview
          id="review-coffee"
          context="Luxe Coffee Bar"
          quote="The coffee bar became a natural gathering point—thoughtful drinks, warm service, and a polished experience guests returned to throughout the evening."
          links={[
            { href: "/experiences/coffee-bar", label: "Explore Coffee Bar" },
          ]}
        />
        <CombinedExperienceFeature
          id="combinations"
          description="Start with the occasion and choose only the services that support it."
          footer={(
            <>
              <strong>Every proposal is shaped around the event.</strong>
              <QuoteModalTrigger><span>PLAN YOUR EVENT ↗︎</span></QuoteModalTrigger>
            </>
          )}
        />
        <HomeEditorialReview
          id="review-coffee-dessert"
          context="Coffee Bar + Sweet Cart"
          quote="The coffee and live dessert service felt like one complete experience, carrying guests naturally from the first sip to the final indulgence."
          links={[
            { href: "/experiences/coffee-bar", label: "Explore Coffee Bar" },
            { href: "/experiences/sweet-cart", label: "Explore Sweet Cart" },
          ]}
        />
        <HomeEventCategories />
        <HomeSelectedImagery />
        <HomeTrust />
        <HomeEditorialReview
          id="review-coffee-seating"
          context="Coffee Bar + Seating Rentals"
          quote="Coffee service and intentional seating worked beautifully together, giving guests a comfortable place to connect, settle in, and stay awhile."
          links={[
            { href: "/experiences/coffee-bar", label: "Explore Coffee Bar" },
            { href: "/experiences/seating-rentals", label: "Explore Seating Rentals" },
          ]}
        />
        <HomeWorkingExperience />
        <EventPlanningPathway id="planning-journey" showDescription={false} />
        <HomeServiceArea />
        <ContextualInquiryPanel id="event-planning" contextKey="home" />
      </main>
    </SiteShell>
  );
}
