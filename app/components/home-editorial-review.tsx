import Link from "next/link";
import type { ReactNode } from "react";

type EditorialReviewLink = {
  href: string;
  label: string;
};

export function HomeEditorialReview({
  context,
  id,
  links,
  quote,
  headerMedia,
}: {
  context: string;
  id: string;
  links: readonly EditorialReviewLink[];
  quote: string;
  headerMedia?: ReactNode;
}) {
  return (
    <section
      className="home-editorial-review"
      id={id}
      aria-label={`Sample client quote about ${context}`}
      data-content-status="placeholder"
    >
      <header>
        <span>Sample client quote</span>
        <strong>{context}</strong>
        {headerMedia}
      </header>
      <blockquote>
        <p>“{quote}”</p>
      </blockquote>
      <nav aria-label={`Explore services related to ${context}`}>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
