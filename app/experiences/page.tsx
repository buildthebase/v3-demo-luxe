import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
} from "../components/signature-elements";
import {
  ExperienceFeatures,
  ExperienceNeedComparison,
  ExperiencesBookingClarity,
  ExperiencesEventTypes,
  ExperiencesGalleryPreview,
  ExperiencesHero,
} from "../components/experiences-hub";
import { JsonLd } from "../components/json-ld";
import { PageSectionNavigation } from "../components/page-section-navigation";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import { experiencesSectionNavigation } from "../page-section-navigation";
import { createCollectionPageSchema } from "../schema-builders";
import { experiences } from "../site-config";
import { experienceHubCombinations } from "./content";

export const metadata = createPageMetadata("/experiences");

const experiencesSchema = createCollectionPageSchema({
  path: "/experiences",
  pageName: pageMetadata["/experiences"].title,
  pageDescription: pageMetadata["/experiences"].description,
  collectionName: "Luxe Event Co. experiences",
  items: experiences.map((experience) => ({
    name: experience.name,
    path: experience.landingPath,
  })),
});

export default function ExperiencesPage() {
  return (
    <SiteShell breadcrumbPath="/experiences">
      <main className="experiences-page">
        <JsonLd data={experiencesSchema} />
        <PageSectionNavigation items={experiencesSectionNavigation} />
        <ExperiencesHero
          titleLines={["Coffee, dessert &", "event rentals in Toronto."]}
        />
        <ExperiencesBookingClarity />
        <ExperienceFeatures />
        <ExperienceNeedComparison />
        <CombinedExperienceFeature
          id="combinations"
          heading="Popular Combinations"
          description="The right combination of mobile coffee, live dessert, and seating rentals is tailored around your event, setting, and guest experience across Toronto and the GTA."
          combinations={experienceHubCombinations}
          cardTitlesAsHeadings
          useLineIcons
        />
        <ExperiencesEventTypes />
        <ExperiencesGalleryPreview />
        <EventPlanningPathway id="planning-journey" showDescription={false} />
        <ContextualInquiryPanel id="event-planning" contextKey="experiences" />
      </main>
    </SiteShell>
  );
}
