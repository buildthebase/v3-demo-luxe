import Link from "next/link";
import { CategoryArrow } from "./category-arrow";
import { EventInquiryAction } from "./event-inquiry-action";
import { imageAssets, type ResponsiveImageAsset } from "../image-system";
import { eventHubEntries } from "../events/content";
import { ResponsiveImage } from "./responsive-image";

export function EventsHero({
  titleLines,
}: {
  titleLines: readonly string[];
}) {
  return (
    <header id="page-overview" className="events-hero">
      <div className="events-hero-copy">
        <h1 aria-label={titleLines.join(" ")}>
          {titleLines.map((line) => (
            <span aria-hidden="true" key={line}>
              {line}
            </span>
          ))}
        </h1>
        <p>
          From weddings and corporate functions to brand activations and private
          celebrations, Luxe offers premium mobile Coffee Bars and live dessert carts,
          plus event rentals for weddings, showers, birthdays, backyard
          events, and private gatherings.
        </p>
        <div className="events-hero-actions">
          <a href="#event-pathways" data-event-name="event_type_select">
            Find Your Event Experience <span aria-hidden="true">↓︎</span>
          </a>
          <Link href="/experiences">
            Explore Experiences <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </div>
      <div className="events-hero-composition">
        <ResponsiveImage asset={imageAssets.experiences.eventsHubHero} fill />
      </div>
    </header>
  );
}
export function EventsDirectory() {
  return (
    <section
      className="events-directory events-occasion-cards"
      id="event-pathways"
      aria-labelledby="events-directory-title"
    >
      <header>
        <p className="foundation-label">Explore by occasion</p>
        <h2 id="events-directory-title">Explore event services by occasion.</h2>
        <p>
          Explore how Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Event Rentals
          can be planned for weddings, corporate events, brand activations,
          showers, birthdays, and private celebrations across Toronto and the
          GTA.
        </p>
      </header>
      <div className="events-directory-list">
        {eventHubEntries.map((event) => (
          <article className={`events-directory-${event.slug}`} key={event.slug}>
            <Link
              className="events-occasion-card"
              href={`/events/${event.slug}`}
              aria-labelledby={`occasion-${event.slug}-title`}
              data-event-name="event_type_select"
              data-event-type={event.slug}
            >
              <div className="events-occasion-photo">
                <ResponsiveImage asset={{
                  ...eventPhotos[event.slug],
                  priority: false,
                  sizes: "(max-width: 560px) calc(100vw - 40px), (max-width: 1000px) 44vw, (max-width: 1600px) 30vw, 440px",
                }} fill />
              </div>
              <div className="events-occasion-body">
                <span className="events-occasion-number" aria-hidden="true">{event.number}</span>
                <h3 id={`occasion-${event.slug}-title`}>{event.name}</h3>
                <strong>{event.statement}</strong>
                <p>{event.summary}</p>
                <span className="events-occasion-action" aria-hidden="true">
                  <span className="events-occasion-explore-label">Explore {event.name}</span>
                  <CategoryArrow />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <EventInquiryAction />
    </section>
  );
}

const eventPhotos: Record<(typeof eventHubEntries)[number]["slug"], ResponsiveImageAsset> = {
  weddings: imageAssets.experiences.weddingHero,
  "corporate-events": imageAssets.experiences.corporateHero,
  "brand-activations": imageAssets.experiences.corporateBranding,
  "baby-showers": imageAssets.experiences.babyHero,
  "bridal-showers": imageAssets.experiences.bridalHero,
  birthdays: imageAssets.experiences.birthdayHero,
  "private-events": imageAssets.experiences.privateHero,
};
