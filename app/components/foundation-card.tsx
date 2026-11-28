import Link from "next/link";
import type { EventSlug, ExperienceSlug } from "../site-config";

export function ExperienceRouteCard({ slug, number, name, summary, accent }: { slug: ExperienceSlug; number: string; name: string; summary: string; accent: string }) {
  return (
    <Link href={`/experiences/${slug}`} className={`foundation-card foundation-card-${accent}`}>
      <span className="foundation-card-number">{number}</span>
      <span className="foundation-card-art" aria-hidden="true"><i /><i /><i /></span>
      <span className="foundation-card-copy"><strong>{name}</strong><span>{summary}</span></span>
    </Link>
  );
}

export function EventRouteCard({ slug, name, summary }: { slug: EventSlug; name: string; summary: string }) {
  return (
    <Link href={`/events/${slug}`} className="foundation-event-card">
      <span>{name}</span>
      <small>{summary}</small>
      <b aria-hidden="true">↗︎</b>
    </Link>
  );
}
