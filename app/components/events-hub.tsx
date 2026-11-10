import Link from "next/link";
import { EventInquiryAction } from "./event-inquiry-action";
import { imageAssets } from "../image-system";
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
        <p className="foundation-eyebrow">Luxe Events / Toronto &amp; the GTA</p>
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
      className="events-directory"
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
            <div>
              <h3>{event.name}</h3>
            </div>
            <div>
              <strong>{event.statement}</strong>
              <p>{event.summary}</p>
            </div>
            <Link
              href={`/events/${event.slug}`}
              data-event-name="event_type_select"
              data-event-type={event.slug}
            >
              Explore {event.name} <span aria-hidden="true">↗︎</span>
            </Link>
          </article>
        ))}
      </div>
      <EventInquiryAction />
    </section>
  );
}
