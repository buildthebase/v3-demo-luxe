export type AudienceGroup = "weddings" | "corporate" | "brand-activations" | "private-events";

export type AudienceSegment = {
  slug: string;
  group: AudienceGroup;
  label: string;
  people: string[];
  concerns: string[];
  contentRequirements: string[];
  proofRequirements: string[];
  relevantExperiences: string[];
  relevantEvents: string[];
  primaryCta: string;
  secondaryCta: string;
  inquiryContext: string[];
};

export const audienceSegments: AudienceSegment[] = [
  {
    slug: "wedding-clients",
    group: "weddings",
    label: "Wedding clients",
    people: ["Couples", "Wedding planners", "Venues", "Coordinators", "Family members assisting with planning"],
    concerns: ["A cohesive guest experience", "Reliable timing and presentation", "How services fit the wedding flow", "A clear path from inspiration to inquiry"],
    contentRequirements: ["Show how coffee, desserts, and seating can work together", "Explain wedding-specific applications and planning considerations", "Make the experience feel personal without requiring decisions too early"],
    proofRequirements: ["Wedding photography and galleries", "Service combinations in real event contexts", "Planning guidance and operational clarity"],
    relevantExperiences: ["coffee-bar", "sweet-cart", "seating-rentals"],
    relevantEvents: ["weddings", "bridal-showers"],
    primaryCta: "Plan Your Event",
    secondaryCta: "Explore wedding experiences",
    inquiryContext: ["wedding date", "venue or location", "guest count", "services being requested", "planner or coordinator involvement"],
  },
  {
    slug: "corporate-clients",
    group: "corporate",
    label: "Corporate clients",
    people: ["Office managers", "Executive assistants", "Human resources teams", "Event coordinators", "Conference organizers", "Procurement teams", "Real estate developers", "Institutions", "Universities", "Client-experience teams"],
    concerns: ["Professional reliability", "Scale and logistics", "Budget and procurement clarity", "Brand appropriateness", "Operational communication and setup"],
    contentRequirements: ["Separate corporate event and brand activation pathways", "Explain capabilities without making unsupported scale claims", "Provide an efficient route to availability and operational questions"],
    proofRequirements: ["Corporate and institutional event examples", "Logistics, setup, service-flow, and capacity information", "Brand-safe presentation and repeatability"],
    relevantExperiences: ["coffee-bar", "sweet-cart"],
    relevantEvents: ["corporate-events", "brand-activations"],
    primaryCta: "Plan Your Event",
    secondaryCta: "Review corporate capabilities",
    inquiryContext: ["organization", "event type", "date and location", "estimated attendance", "procurement or approval requirements", "branding needs"],
  },
  {
    slug: "brand-activation-clients",
    group: "brand-activations",
    label: "Brand activation clients",
    people: ["Marketing agencies", "Experiential marketing teams", "Retail brands", "Luxury brands", "Product-launch teams", "Public relations agencies", "Content and campaign teams"],
    concerns: ["Making the brand experience tangible", "Custom presentation and brand alignment", "Guest engagement and content potential", "Campaign timing and Luxe service coordination"],
    contentRequirements: ["Show the difference between a standard service and a branded experience", "Explain customization as a discovery conversation", "Support marketing, PR, and production stakeholders with clear handoff information"],
    proofRequirements: ["Activation and launch photography", "Custom branding examples", "Guest interaction and content-making moments", "Luxe service coordination context"],
    relevantExperiences: ["coffee-bar", "sweet-cart"],
    relevantEvents: ["brand-activations", "corporate-events"],
    primaryCta: "Plan Your Event",
    secondaryCta: "Explore branded experiences",
    inquiryContext: ["brand or agency", "campaign objective", "activation date and location", "attendance or traffic expectations", "branding requirements", "production contacts"],
  },
  {
    slug: "premium-private-event-clients",
    group: "private-events",
    label: "Premium private-event clients",
    people: ["Baby shower hosts", "Bridal shower hosts", "Birthday hosts", "Engagement and anniversary hosts", "Families planning milestone events", "Event planners and decorators"],
    concerns: ["Personal and memorable details", "Ease of planning", "A polished guest experience", "Fit for the home or chosen venue", "Knowing what to expect"],
    contentRequirements: ["Use occasion-specific inspiration", "Explain service combinations in approachable language", "Provide practical planning clarity without overwhelming hosts"],
    proofRequirements: ["Private celebration photography", "Intimate setups and room transformations", "Dessert, coffee, and seating combinations", "Planning guidance for hosts and decorators"],
    relevantExperiences: ["sweet-cart", "coffee-bar", "seating-rentals"],
    relevantEvents: ["baby-showers", "bridal-showers", "birthdays", "private-events"],
    primaryCta: "Plan Your Event",
    secondaryCta: "Find an experience for your occasion",
    inquiryContext: ["occasion", "date and location", "guest count", "desired atmosphere", "planner or decorator involvement", "services being requested"],
  },
];

export function getAudienceSegment(slug: string) {
  return audienceSegments.find((segment) => segment.slug === slug);
}
