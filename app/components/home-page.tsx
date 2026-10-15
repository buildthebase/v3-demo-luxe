import Link from "next/link";
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
          id="review-coffee"
          context="Luxe Coffee Bar"
          quote="The coffee bar became a natural gathering point—thoughtful drinks, warm service, and a polished experience guests returned to throughout the evening."
          links={[
            { href: "/experiences/coffee-bar", label: "Discover the experience" },
          ]}
        />
        <section id="combinations" className="home-experience-cta" aria-labelledby="home-experience-cta-title">
          <div className="home-experience-cta-copy">
            <h2 id="home-experience-cta-title">Your event. Your way.</h2>
            <p>Explore our coffee, live dessert and rental experiences, or start planning yours with our team.</p>
            <div className="home-experience-cta-actions">
              <QuoteModalTrigger className="home-experience-cta-primary">PLAN YOUR EVENT <span aria-hidden="true">↗︎</span></QuoteModalTrigger>
              <Link href="/experiences">EXPLORE EXPERIENCES <span aria-hidden="true">↗︎</span></Link>
            </div>
          </div>
          <div className="home-experience-cta-media" aria-label="Reserved event imagery">
            {[1, 2].map(number => (
              <div className="home-experience-cta-placeholder" key={number}>
                <span aria-hidden="true">0{number}</span>
                <p>Image / video placeholder</p>
              </div>
            ))}
          </div>
        </section>
        <HomeEditorialReview
          id="review-coffee-dessert"
          context="Coffee Bar + Sweet Cart"
          quote="The coffee and live dessert service felt like one complete experience, carrying guests naturally from the first sip to the final indulgence."
          links={[
            { href: "/experiences", label: "Explore the possibilities" },
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
            { href: "/experiences", label: "Find your Luxe" },
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
