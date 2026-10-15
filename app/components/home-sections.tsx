import Link from "next/link";
import { Fragment } from "react";
import { HomeEditorialVideo } from "./home-editorial-video";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ResponsiveImage } from "./responsive-image";
import {
  featuredHomeEvents,
  homeEventImageGroups,
  homeImageSlots,
  homeProofPoints,
  homeServiceAreaGroups,
  homeWorkingImage,
  homeWorkingPrinciples,
} from "../home-content";

function HomeEditorialImage({
  slot,
  compact = false,
  showCaption = true,
}: {
  slot: {
    id: string;
    label: string;
    context: string;
    tone: string;
    image: Parameters<typeof ResponsiveImage>[0]["asset"];
    video?: {
      mp4: string;
      webm: string;
      poster: string;
    };
  };
  compact?: boolean;
  showCaption?: boolean;
}) {
  const fallback = (
    <div className="home-editorial-art" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );

  return (
    <figure
      className={`home-editorial-image home-image-slot-${slot.tone}${slot.video ? " home-editorial-image-video" : ""}${compact ? " home-editorial-image-compact" : ""}`}
      data-asset-status={slot.image.status}
    >
      <div className="home-editorial-frame">
        {slot.video ? (
          <HomeEditorialVideo
            fadeIn={slot.id === "personal-gatherings" || slot.id === "professional-gatherings"}
            label={slot.label}
            mp4={slot.video.mp4}
            poster={slot.video.poster}
            webm={slot.video.webm}
          />
        ) : (
          <ResponsiveImage asset={slot.image} fallback={fallback} fill />
        )}
      </div>
      {showCaption ? (
        <figcaption>
          <strong>{slot.label}</strong>
          <small>{slot.context}</small>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function HomePositioning() {
  return (
    <section id="luxe-family" className="home-positioning" aria-labelledby="home-positioning-title">
      <h2 id="home-positioning-title">
        <span>One Luxe vision.</span>
        <span>Infinite ways to celebrate.</span>
      </h2>
      <div>
        <p className="home-positioning-intro">
          Book one Luxe experience on its own, or bring coffee, dessert and event
          rentals together through one coordinated inquiry. Work with one team and
          one point of contact instead of coordinating several vendors.
        </p>
        <ul className="home-positioning-services">
          <li>
            <Link href="#experience-selector-coffee">
              <strong>Luxe Coffee Bar</strong>
              <span>Hot and iced café favourites &amp; signature beverages</span>
            </Link>
          </li>
          <li>
            <Link href="#experience-selector-dessert">
              <strong>Luxe Sweet Cart</strong>
              <span>Live desserts &amp; personalized indulgences</span>
            </Link>
          </li>
          <li>
            <Link href="#experience-selector-seating">
              <strong>Luxe Seating Rentals</strong>
              <span>Refined seating &amp; event rentals</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function HomeEventCategories() {
  return (
    <section id="event-types" className="home-events" aria-labelledby="home-events-title">
      <header className="home-section-intro home-section-intro-single">
        <h2 id="home-events-title">
          Event Catering &amp; Rental Services for Every Occasion
        </h2>
      </header>
      <div className="home-event-groups">
        {homeEventImageGroups.map((group, groupIndex) => (
          <Fragment key={group.id}>
            <div className={`home-event-group home-event-group-${group.id}`}>
              <HomeEditorialImage showCaption={false} slot={group} />
              <div className="home-event-copy">
                <div className="home-event-caption">
                  <strong>{group.label}</strong>
                  <small>{group.context}</small>
                </div>
                <div className="home-event-list">
                  {group.eventSlugs.map((slug) => {
                    const event = featuredHomeEvents.find((item) => item.slug === slug)!;

                    return (
                      <Link href={`/events/${event.slug}`} key={event.slug}>
                        <strong>{event.name}</strong>
                        <small>{event.summary}</small>
                        <b aria-hidden="true">↗︎</b>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            {groupIndex === 0 ? (
              <div className="home-event-breaker" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
      <Link href="/events" className="home-text-link">
        Explore every event pathway
      </Link>
      <div className="home-events-planning-cta">
        <strong>Personalize your celebration.</strong>
        <QuoteModalTrigger><span>PLAN YOUR EVENT ↗︎</span></QuoteModalTrigger>
      </div>
    </section>
  );
}

export function HomeSelectedImagery() {
  return (
    <section id="contextual-imagery" className="home-imagery" aria-labelledby="home-imagery-title">
      <header className="home-section-intro">
        <div>
          <h2 id="home-imagery-title">See the Experience Come Together</h2>
        </div>
      </header>
      <div className="home-imagery-grid">
        {homeImageSlots.map((slot) => (
          <HomeEditorialImage compact slot={slot} key={slot.id} />
        ))}
      </div>
      <Link href="/gallery" className="home-text-link home-gallery-link">
        Visit the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function HomeTrust() {
  return (
    <section
      id="operational-proof"
      className="home-trust"
      aria-labelledby="home-trust-title"
      data-evidence-status="confirmed-first-party"
    >
      <header>
        <p className="foundation-label">Confirmed operating facts</p>
        <h2 id="home-trust-title">Prepared for rooms where details matter.</h2>
        <p>
          Luxe supports private hosts, wedding professionals, venues, corporate
          teams, and brand partners across a wide range of event formats.
        </p>
      </header>
      <div className="home-proof-grid">
        {homeProofPoints.map((proof) => (
          <article key={proof.label}>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
            <p>{proof.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeWorkingExperience() {
  return (
    <section id="working-with-luxe" className="home-working" aria-labelledby="home-working-title">
      <header className="home-section-intro home-section-intro-single">
        <div>
          <h2 id="home-working-title">What working with Luxe feels like</h2>
        </div>
      </header>
      <div className="home-working-layout">
        <div className="home-working-media">
          <HomeEditorialImage slot={homeWorkingImage} />
        </div>
        <div className="home-working-grid">
          {homeWorkingPrinciples.map((principle) => (
            <article key={principle.title}>
              <span aria-label={principle.markerLabel} role="img">
                {principle.marker}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeServiceArea() {
  return (
    <section
      id="service-area"
      className="home-service-area"
      aria-labelledby="home-service-area-title"
      data-evidence-status="confirmed-first-party"
    >
      <div>
        <p className="foundation-label">Service area</p>
        <h2
          id="home-service-area-title"
          aria-label="Toronto, GTA, Southern Ontario."
        >
          <span className="home-service-area-title-desktop">
            Toronto at the centre. The GTA and Southern Ontario within reach.
          </span>
          <span className="home-service-area-title-mobile" aria-hidden="true">
            <span>Toronto,</span>
            <span>GTA,</span>
            <span>Southern Ontario.</span>
          </span>
        </h2>
        <p>
          Luxe Event Co. serves weddings, corporate events, brand activations, and
          private celebrations across Toronto and the Greater Toronto Area, with
          select destination events available throughout Southern Ontario.
        </p>
      </div>
      <dl>
        {homeServiceAreaGroups.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.places.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
