import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
} from "../components/signature-elements";
import {
  EventsDirectory,
  EventsHero,
} from "../components/events-hub";
import { JsonLd } from "../components/json-ld";
import { PageSectionNavigation } from "../components/page-section-navigation";
import { SiteShell } from "../components/site-shell";
import { eventHubEntries } from "./content";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import { eventsSectionNavigation } from "../page-section-navigation";
import { createCollectionPageSchema } from "../schema-builders";

export const metadata = createPageMetadata("/events");

const eventsSchema = createCollectionPageSchema({
  path: "/events",
  pageName: pageMetadata["/events"].title,
  pageDescription: pageMetadata["/events"].description,
  collectionName: "Luxe Event Co. event pathways",
  items: eventHubEntries.map((event) => ({
    name: event.name,
    path: `/events/${event.slug}`,
  })),
});

export default function EventsPage() {
  return (
    <SiteShell breadcrumbPath="/events">
      <main className="events-page">
        <JsonLd data={eventsSchema} />
        <PageSectionNavigation items={eventsSectionNavigation} />
        <EventsHero
          titleLines={["Toronto event experiences,", "tailored for every occasion."]}
        />
        <EventsDirectory />
        <CombinedExperienceFeature
          id="combinations"
          heading="Popular Combinations"
          description="Combine coffee bar service, live dessert carts, and event rentals to suit your venue, timeline, and guest flow."
          cardTitlesAsHeadings
        />
        <EventPlanningPathway
          id="planning-journey"
          heading="How planning your Luxe experience works"
          showDescription={false}
        />
        <ContextualInquiryPanel id="event-planning" contextKey="events" />
      </main>
    </SiteShell>
  );
}
