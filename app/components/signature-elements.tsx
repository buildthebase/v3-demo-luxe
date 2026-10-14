"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  combinedExperiences,
  credibilityOrganizations,
  eventPlanningPathway,
  inquiryContexts,
  signatureExperiences,
  type CombinedExperience,
  type CredibilityOrganization,
  type EventPlanningStep,
  type InquiryContext,
  type SignatureExperience,
} from "../signature-elements";
import { ResponsiveImage } from "./responsive-image";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ExperienceImageCarousel } from "./experience-image-carousel";

const experienceSelectorActions: Record<string, string> = {
  coffee: "Sip",
  dessert: "Indulge",
  seating: "Gather",
};

function SignatureSelectorVideo({
  video,
}: {
  video: NonNullable<SignatureExperience["video"]>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoadedRef.current) {
            element.load();
            hasLoadedRef.current = true;
          }

          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            void element.play().catch(() => undefined);
          }
        } else {
          element.pause();
          element.currentTime = 0;
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="signature-selector-image"
      loop
      muted
      playsInline
      poster={video.poster}
      preload="none"
      style={{
        height: "100%",
        inset: 0,
        objectFit: "cover",
        position: "absolute",
        width: "100%",
      }}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}

export function ExperienceSelector({
  experiences = signatureExperiences,
  footer,
  heading = "Choose where the experience begins.",
  headingClassName,
  description = "Each experience has its own atmosphere and purpose. Together, they create one cohesive event language.",
  id,
  showDescription = true,
  useItemHeadings = false,
  variant = "default",
}: {
  experiences?: readonly SignatureExperience[];
  footer?: ReactNode;
  heading?: ReactNode;
  headingClassName?: string;
  description?: string;
  id?: string;
  showDescription?: boolean;
  useItemHeadings?: boolean;
  variant?: "default" | "dark" | "taupe" | "bridal" | "birthday";
} = {}) {
  return (
    <section
      className={[
        "signature-selector",
        variant === "dark" ? "signature-selector-dark" : "",
        variant === "taupe" ? "signature-selector-taupe" : "",
        variant === "bridal" ? "signature-selector-bridal" : "",
        variant === "birthday" ? "signature-selector-birthday" : "",
      ].filter(Boolean).join(" ")}
      id={id}
      aria-labelledby="signature-selector-title"
    >
      <header
        className={[
          "signature-section-heading",
          showDescription ? "" : "signature-section-heading-standalone",
        ].filter(Boolean).join(" ")}
      >
        <h2 className={headingClassName} id="signature-selector-title">{heading}</h2>
        {showDescription ? (
          <p>{description}</p>
        ) : null}
      </header>
      <div className="signature-selector-world">
        <div className="signature-selector-line" aria-hidden="true" />
        {experiences.map((experience) => {
          const heading = experience.headingLead && experience.headingDetail ? (
            <>
              <span className="signature-selector-heading-lead">
                {experience.headingLead}
              </span>{" "}
              <span className="signature-selector-heading-detail">
                {experience.carouselImages && experience.headingDetail.endsWith("Matcha Service") ? <>{experience.headingDetail.slice(0, -14)}<span className="signature-selector-keep-together">Matcha Service</span></> : experience.headingDetail}
              </span>
            </>
          ) : experience.name;

          const copy = (
              <div className="signature-selector-copy">
                <span className="signature-selector-label">{experience.label}</span>
                {useItemHeadings ? (
                  <h3 className="signature-selector-heading">{heading}</h3>
                ) : (
                  <strong className="signature-selector-heading">{heading}</strong>
                )}
                {experience.tagline ? (
                  <em className="signature-selector-tagline">{experience.tagline}</em>
                ) : null}
                <span>{experience.description}</span>
                <b aria-hidden="true">
                  {experienceSelectorActions[experience.id] ?? "Explore"} ↗︎
                </b>
              </div>
          );
          if (experience.carouselImages) {
            return (
              <div className={`signature-selector-choice signature-selector-${experience.id}`} id={`experience-selector-${experience.id}`} key={experience.id}>
                <ExperienceImageCarousel images={experience.carouselImages} href={experience.href} />
                <Link href={experience.href} className="experience-selector-copy-link">{copy}</Link>
              </div>
            );
          }
          return (
            <Link
              className={`signature-selector-choice signature-selector-${experience.id}`}
              href={experience.href}
              id={`experience-selector-${experience.id}`}
              key={experience.id}
            >
              <span className="signature-selector-art">
                {experience.video ? (
                  <SignatureSelectorVideo video={experience.video} />
                ) : (
                  <ResponsiveImage
                    asset={experience.image}
                    className="signature-selector-image"
                    fill
                  />
                )}
              </span>
              {copy}
            </Link>
          );
        })}
      </div>
      {footer ? <div className="signature-selector-footer">{footer}</div> : null}
    </section>
  );
}

export function EventPlanningPathway({
  id,
  steps = eventPlanningPathway,
  heading = "How the planning journey takes shape",
  description = "This sequence explains the planning path. The operational inquiry remains a separate, focused handoff.",
  showDescription = true,
}: {
  id?: string;
  steps?: readonly EventPlanningStep[];
  heading?: string;
  description?: string;
  showDescription?: boolean;
} = {}) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const stepNodes = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - window.innerHeight * 0.44) -
              Math.abs(second.boundingClientRect.top - window.innerHeight * 0.44),
          )[0];

        if (visibleEntry) {
          setActiveStep(Number((visibleEntry.target as HTMLElement).dataset.stepIndex));
        }
      },
      {
        rootMargin: "-36% 0px -44% 0px",
        threshold: 0,
      },
    );

    stepNodes.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className="signature-pathway" aria-labelledby="signature-pathway-title">
      <header className="signature-section-heading signature-section-heading-compact">
        <h2 id="signature-pathway-title">{heading}</h2>
        {showDescription ? (
          <p>{description}</p>
        ) : null}
      </header>
      <ol className="signature-pathway-list">
        {steps.map((step, index) => (
          <li
            className={activeStep === index ? "is-scroll-active" : undefined}
            data-step-index={index}
            key={step.number}
            ref={(node) => {
              stepNodes.current[index] = node;
            }}
          >
            <Link href={step.href}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
              <b aria-hidden="true">↗︎</b>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CombinedExperienceFeature({
  id,
  combinations = combinedExperiences,
  heading = "More than one way to shape the room.",
  description = "The right combination of coffee, dessert, and seating is shaped around the occasion, the setting, and the way guests will experience it.",
  cardTitlesAsHeadings = false,
  footer,
  showGridSurface = false,
}: {
  id?: string;
  combinations?: readonly CombinedExperience[];
  heading?: string;
  description?: string;
  cardTitlesAsHeadings?: boolean;
  footer?: ReactNode;
  showGridSurface?: boolean;
} = {}) {
  return (
    <section
      id={id}
      className={`signature-combinations${showGridSurface ? " luxe-grid-section" : ""}`}
      aria-labelledby="signature-combinations-title"
    >
      {showGridSurface ? <span className="luxe-section-grid" aria-hidden="true" /> : null}
      <div className="signature-combinations-intro">
        <h2 id="signature-combinations-title">{heading}</h2>
        <p>{description}</p>
      </div>
      <div className="signature-combinations-list">
        {combinations.map((combination) => (
          <Link href={combination.href} key={combination.id}>
            <div className="signature-combination-main">
              <small>{combination.occasion}</small>
              {cardTitlesAsHeadings ? (
                <h3>
                  <strong>{combination.title}</strong>
                </h3>
              ) : (
                <strong>{combination.title}</strong>
              )}
              <span>{combination.description}</span>
            </div>
            <span className="signature-combination-orbit" aria-hidden="true">
              {combination.experienceIds.map((experienceId) => (
                <i className={`signature-node-${experienceId}`} key={experienceId} />
              ))}
            </span>
            <b aria-hidden="true">↗︎</b>
          </Link>
        ))}
      </div>
      {footer ? <div className="signature-combinations-footer">{footer}</div> : null}
    </section>
  );
}

export function CredibilityStrip({
  organizations = credibilityOrganizations,
  variant = "default",
  label,
  showLabel = true,
}: {
  organizations?: readonly CredibilityOrganization[];
  variant?: "default" | "hero";
  label?: string;
  showLabel?: boolean;
}) {
  const approvedOrganizations = organizations.filter(
    (organization) => organization.permission === "approved",
  );
  const resolvedLabel =
    label ??
    (variant === "hero"
      ? "Trusted by"
      : "Selected organizations Luxe has served");

  if (approvedOrganizations.length === 0) {
    return null;
  }

  return (
    <section
      className={`signature-credibility signature-credibility-${variant}`}
      aria-label={showLabel ? undefined : resolvedLabel}
      aria-labelledby={showLabel ? `signature-credibility-title-${variant}` : undefined}
      data-evidence-status="approved-organization-names"
      data-evidence-boundary="no-testimonial-endorsement-or-case-study-inference"
    >
      {showLabel ? (
        <p id={`signature-credibility-title-${variant}`}>{resolvedLabel}</p>
      ) : null}
      <ul>
        {approvedOrganizations.map((organization) => (
          <li
            className={`signature-organization-${organization.name
              .toLowerCase()
              .replaceAll(/[^a-z0-9]+/g, "-")
              .replaceAll(/(^-|-$)/g, "")}`}
            key={organization.name}
          >
            {variant === "hero" ? (
              <>
                <span className="signature-organization-logo" aria-hidden="true">
                  {organization.logo ? (
                    <ResponsiveImage asset={organization.logo} />
                  ) : null}
                </span>
                <span className="signature-organization-name">{organization.name}</span>
              </>
            ) : (
              organization.name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContextualInquiryPanel({
  id,
  context,
  contextKey = "default",
  showEyebrow = true,
}: {
  id?: string;
  context?: InquiryContext;
  contextKey?: string;
  showEyebrow?: boolean;
}) {
  const resolvedContext =
    context ?? inquiryContexts[contextKey] ?? inquiryContexts.default;

  return (
    <section id={id} className="signature-inquiry" aria-labelledby={`signature-inquiry-${contextKey}`}>
      <div className="signature-inquiry-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="signature-inquiry-copy">
        {showEyebrow ? (
          <p className="foundation-label">{resolvedContext.eyebrow}</p>
        ) : null}
        <h2 id={`signature-inquiry-${contextKey}`}>{resolvedContext.heading}</h2>
        <p>{resolvedContext.description}</p>
      </div>
      <QuoteModalTrigger>
        {resolvedContext.cta}
        <span aria-hidden="true">↗︎</span>
      </QuoteModalTrigger>
    </section>
  );
}
