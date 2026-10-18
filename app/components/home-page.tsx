import {
  HomeEventCategories,
  HomePositioning,
  HomeSelectedImagery,
  HomeServiceArea,
  HomeTrust,
} from "./home-sections";
import { HomeHero } from "./home-hero";
import { HomeCaseStudy } from "./home-case-study";
import { HomeEditorialReview } from "./home-editorial-review";
import { ResponsiveImage } from "./responsive-image";
import { imageAssets } from "../image-system";
import { HomeReviewLauncher } from "./home-review-launcher";
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
} from "../signature-elements";

const homeSignatureExperiences: readonly SignatureExperience[] = [
  {
    ...signatureExperiences[0],
    name: "Luxe Coffee Bar: Specialty Coffee & Matcha Service",
    headingLead: "Luxe Coffee Bar:",
    headingDetail: "Specialty Coffee & Matcha Service",
    description:
      "Barista-served specialty coffee and matcha service for weddings, corporate arrivals, cocktail hours, and late-night hospitality across Toronto.",
  },
  {
    ...signatureExperiences[1],
    name: "Luxe Sweet Cart: Live Interactive Dessert Station",
    headingLead: "Luxe Sweet Cart:",
    headingDetail: "Live Interactive Dessert Station",
    description:
      "Live dessert preparation and interactive sweet cart experiences designed to create memorable moments for your guests.",
  },
  {
    ...signatureExperiences[2],
    name: "Luxe Seating Rentals: Chair, Table & Tent Rentals",
    headingLead: "Luxe Seating Rentals:",
    headingDetail: "Chair, Table & Tent Rentals",
    description:
      "White resin chairs, 6-ft tables, cocktail tables, event tents and linens for weddings and private celebrations. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
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
          id="review-coffee-seating"
          context="Coffee Bar + Seating Rentals"
          quote="Coffee service and intentional seating worked beautifully together, giving guests a comfortable place to connect, settle in, and stay awhile."
          links={[
            { href: "/experiences", label: "Find your Luxe" },
          ]}
        />
        <HomeCaseStudy />
        <EventPlanningPathway id="planning-journey" showDescription={false} />
        <HomeEventCategories />
        <HomeSelectedImagery />
        <HomeTrust />
        <section className="home-coffee-quote-film" id="coffee-quote-film" aria-label="Luxe Coffee Bar in service">
          <div className="home-coffee-quote-film-frame">
            <ResponsiveImage asset={imageAssets.home.coffeeQuotePreparation} fill />
          </div>
        </section>
        <HomeEditorialReview
          id="review-coffee"
          context="Luxe Coffee Bar"
          headerMedia={
            <div className="home-coffee-quote-film-desktop">
              <div className="home-coffee-quote-film-frame">
                <ResponsiveImage asset={imageAssets.home.coffeeQuotePreparation} fill />
              </div>
            </div>
          }
          quote="The coffee bar became a natural gathering point—thoughtful drinks, warm service, and a polished experience guests returned to throughout the evening."
          links={[
            { href: "/experiences/coffee-bar", label: "Discover the experience" },
          ]}
        />
        <HomeServiceArea />
        <ContextualInquiryPanel id="event-planning" contextKey="home" />
      </main>
    </SiteShell>
  );
}
