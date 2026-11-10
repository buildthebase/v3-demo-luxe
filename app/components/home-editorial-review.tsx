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
      aria-label={`Client quote about ${context}`}
    >
      <header>
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
