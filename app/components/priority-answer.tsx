import Link from "next/link";
import type { ReactNode } from "react";

export function PriorityAnswer({
  label,
  question,
  answer,
  answerContent,
  href,
  linkLabel,
  headingLevel = "h3",
  headingId,
}: {
  label: string;
  question: string;
  answer: string;
  answerContent?: ReactNode;
  href: string;
  linkLabel: string;
  headingLevel?: "h2" | "h3";
  headingId?: string;
}) {
  const Heading = headingLevel;

  return (
    <article className="priority-answer" data-aeo-format="visible-cost-factors">
      <header>
        <p className="foundation-label">{label}</p>
        <Heading id={headingId}>{question}</Heading>
      </header>
      <div>
        {answerContent ?? <p>{answer}</p>}
        <Link href={href} data-event-name="inquiry_start">
          {linkLabel}
        </Link>
      </div>
    </article>
  );
}
