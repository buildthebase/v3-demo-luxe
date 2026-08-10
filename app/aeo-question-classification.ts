import type { AeoAudienceSlug } from "./aeo-audience-research";
import {
  aeoContentDependencies,
  aeoAudienceProfiles,
} from "./aeo-audience-research";
import { questionClusters } from "./aeo-query-research";
import { primaryRoutes } from "./site-config";

export type FunnelStage =
  | "Discovery"
  | "Understanding"
  | "Planning"
  | "Comparison"
  | "Cost investigation"
  | "Vendor evaluation"
  | "Booking preparation";

export type SearchIntentType =
  | "Informational"
  | "Commercial investigation"
  | "Transactional"
  | "Local"
  | "Comparison"
  | "Logistical"
  | "Troubleshooting"
  | "Inspirational";

export type ServiceScope =
  | "Luxe Event Co."
  | "Luxe Coffee Bar"
  | "Luxe Sweet Cart"
  | "Luxe Seating Rentals";

export type EventTypeScope =
  | "All event types"
  | "Weddings"
  | "Corporate events"
  | "Brand activations"
  | "Baby showers"
  | "Bridal showers"
  | "Birthdays"
  | "Private events";

export type Importance = "moderate" | "high" | "critical";

export type FirstPartyEvidenceStatus =
  | "confirmed"
  | "partial"
  | "unavailable"
  | "revalidation-required";

export type AnswerStatus =
  | "answered"
  | "partially answered"
  | "dependency blocked";

export type RecommendedContentFormat =
  | "concise contextual answer"
  | "decision guide"
  | "planning checklist"
  | "comparison"
  | "requirements summary"
  | "process summary"
  | "responsibility summary"
  | "proof module";

export type PlacementDecision = "conversion page" | "future resource";

export type QuestionClassification = {
  questionId: string;
  icps: AeoAudienceSlug[];
  services: ServiceScope[];
  eventTypes: EventTypeScope[];
  searchIntents: SearchIntentType[];
  funnelStages: FunnelStage[];
  geographicIntent: {
    level: "none" | "implicit local" | "explicit local";
    markets: string[];
    note: string;
  };
  commercialImportance: Importance;
  operationalImportance: Importance;
  firstPartyEvidence: {
    status: FirstPartyEvidenceStatus;
    available: string[];
    limitation: string;
  };
  destination: {
    primaryPath: string;
    supportingPaths: string[];
  };
  recommendedFormat: RecommendedContentFormat;
  answerStatus: AnswerStatus;
  placement: PlacementDecision;
  futureResourcePotential: string | null;
};

export const questionClassifications: QuestionClassification[] = [
  {
    questionId: "experience-fit",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    services: [
      "Luxe Event Co.",
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["All event types"],
    searchIntents: ["Informational", "Comparison", "Inspirational"],
    funnelStages: ["Discovery", "Understanding", "Comparison"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA"],
      note: "The format decision is universal, but the available provider and service mix are local.",
    },
    commercialImportance: "high",
    operationalImportance: "moderate",
    firstPartyEvidence: {
      status: "confirmed",
      available: [
        "Approved division responsibilities",
        "Approved event applications",
        "Independent and combined booking model",
      ],
      limitation: "Do not imply that every experience suits every event.",
    },
    destination: {
      primaryPath: "/events",
      supportingPaths: [
        "/events/weddings",
        "/events/corporate-events",
        "/events/brand-activations",
      ],
    },
    recommendedFormat: "decision guide",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "wedding-service-timing",
    icps: ["wedding-clients", "industry-partners"],
    services: ["Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["Weddings"],
    searchIntents: ["Informational", "Logistical", "Comparison"],
    funnelStages: ["Understanding", "Planning", "Comparison"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Timeline fit is driven by the event schedule rather than a city modifier.",
    },
    commercialImportance: "high",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved wedding-day applications", "Event-specific service-duration guidance"],
      limitation: "No universal service duration or setup timeline is approved.",
    },
    destination: {
      primaryPath: "/events/weddings",
      supportingPaths: ["/experiences/coffee-bar", "/experiences/sweet-cart"],
    },
    recommendedFormat: "concise contextual answer",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A wedding-timeline example may be useful only after real, permissioned schedules are available.",
  },
  {
    questionId: "guest-use-and-value",
    icps: ["wedding-clients", "private-event-clients"],
    services: ["Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["Weddings", "Private events"],
    searchIntents: ["Commercial investigation", "Comparison", "Inspirational"],
    funnelStages: ["Comparison", "Cost investigation", "Vendor evaluation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Perceived value is event-specific and should not be localized artificially.",
    },
    commercialImportance: "critical",
    operationalImportance: "moderate",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved service roles", "Guest-capacity planning limits"],
      limitation: "No utilization, satisfaction, return-on-investment, or guest-demand study is available.",
    },
    destination: {
      primaryPath: "/events",
      supportingPaths: ["/events/weddings", "/events/private-events"],
    },
    recommendedFormat: "decision guide",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A value guide requires permissioned event examples and must not manufacture return-on-investment claims.",
  },
  {
    questionId: "capacity-throughput-lines",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["All event types"],
    searchIntents: ["Informational", "Commercial investigation", "Logistical"],
    funnelStages: ["Planning", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Capacity depends on the operating scope, not geographic phrasing.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Qualified Coffee Bar guest limit", "Qualified Sweet Cart guest limit"],
      limitation: "Drinks per hour, universal line times, and staffing formulas remain unverified.",
    },
    destination: {
      primaryPath: "/experiences",
      supportingPaths: ["/experiences/coffee-bar", "/experiences/sweet-cart"],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "staffing-and-inclusions",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["All event types"],
    searchIntents: ["Informational", "Logistical", "Transactional"],
    funnelStages: ["Understanding", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "The inclusion question does not change by market.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved Coffee Bar inclusions", "Approved Sweet Cart inclusions", "Staffed-service model"],
      limitation: "No universal number of baristas or attendants is approved.",
    },
    destination: {
      primaryPath: "/experiences",
      supportingPaths: ["/experiences/coffee-bar", "/experiences/sweet-cart"],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "menu-and-dietary-fit",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    services: ["Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["All event types"],
    searchIntents: ["Informational", "Comparison", "Inspirational"],
    funnelStages: ["Discovery", "Understanding", "Planning"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Menu suitability is not inherently geographic.",
    },
    commercialImportance: "high",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "confirmed",
      available: [
        "Approved beverage framework",
        "Approved dessert framework",
        "Milk-alternative and customization guidance",
      ],
      limitation: "Allergy and cross-contact requirements still need event-specific confirmation.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: ["/experiences/coffee-bar", "/experiences/sweet-cart"],
    },
    recommendedFormat: "comparison",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential:
      "Seasonal menu resources are appropriate only when current menus can be maintained reliably.",
  },
  {
    questionId: "branding-and-creative-approval",
    icps: ["corporate-clients", "brand-agency-clients"],
    services: ["Luxe Event Co.", "Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["Corporate events", "Brand activations"],
    searchIntents: ["Informational", "Commercial investigation", "Logistical"],
    funnelStages: ["Understanding", "Planning", "Vendor evaluation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Brand-production needs are driven by the campaign rather than the market.",
    },
    commercialImportance: "critical",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved brand surfaces", "Artwork and scope qualification"],
      limitation: "Creative approvals, file specifications, and production lead times remain unverified.",
    },
    destination: {
      primaryPath: "/events/brand-activations",
      supportingPaths: ["/events/corporate-events", "/experiences/coffee-bar"],
    },
    recommendedFormat: "process summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A production guide or campaign case study becomes useful after the workflow and examples are approved.",
  },
  {
    questionId: "space-power-water",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: [
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["All event types"],
    searchIntents: ["Logistical", "Troubleshooting", "Transactional"],
    funnelStages: ["Planning", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Requirements vary by service and venue, not by target city.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "unavailable",
      available: ["Event-specific confirmation process"],
      limitation: "No universal footprint, power specification, or water specification is approved.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: [
        "/experiences/coffee-bar",
        "/experiences/sweet-cart",
        "/experiences/seating-rentals",
      ],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "dependency blocked",
    placement: "conversion page",
    futureResourcePotential:
      "A venue requirements sheet can follow only after service-specific technical facts are approved.",
  },
  {
    questionId: "venue-access-and-timing",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: [
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["All event types"],
    searchIntents: ["Logistical", "Troubleshooting"],
    funnelStages: ["Planning", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA"],
      note: "Venue access is locally executed, but the answer should remain venue-specific rather than list cities.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved access factors", "Event-specific setup and takedown confirmation"],
      limitation: "Exact setup times and a universal venue-coordination workflow are not approved.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: [
        "/experiences/coffee-bar",
        "/experiences/sweet-cart",
        "/experiences/seating-rentals",
      ],
    },
    recommendedFormat: "planning checklist",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential:
      "A venue-preparation checklist is viable after the coordination process is confirmed.",
  },
  {
    questionId: "outdoor-and-weather",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: [
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["Weddings", "Corporate events", "Private events"],
    searchIntents: ["Logistical", "Troubleshooting", "Comparison"],
    funnelStages: ["Planning", "Comparison", "Vendor evaluation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA", "Southern Ontario"],
      note: "Weather context is local, but no city-specific page or promise is justified.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved event-specific outdoor qualification", "Unsafe-condition limitation"],
      limitation: "Service-specific temperature, wind, surface, tenting, and utility limits remain unverified.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: [
        "/experiences/coffee-bar",
        "/experiences/sweet-cart",
        "/experiences/seating-rentals",
      ],
    },
    recommendedFormat: "planning checklist",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential:
      "A seasonal outdoor-planning guide requires approved operating limits and first-hand examples.",
  },
  {
    questionId: "pricing-minimums-and-scope",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: [
      "Luxe Event Co.",
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["All event types"],
    searchIntents: ["Commercial investigation", "Transactional", "Comparison", "Local"],
    funnelStages: ["Cost investigation", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA", "Southern Ontario"],
      note: "Travel and operating scope make the quote location-sensitive.",
    },
    commercialImportance: "critical",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved pricing variables", "Confirmed Coffee Bar minimum", "Personalized-proposal model"],
      limitation: "No public rates, universal totals, or inferred minimums for other divisions are approved.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: [
        "/experiences/coffee-bar",
        "/experiences/sweet-cart",
        "/experiences/seating-rentals",
        "/contact",
      ],
    },
    recommendedFormat: "concise contextual answer",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "booking-lead-time-and-availability",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Event Co."],
    eventTypes: ["All event types"],
    searchIntents: ["Transactional", "Commercial investigation", "Logistical"],
    funnelStages: ["Planning", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Availability is date- and scope-dependent, not a geographic content opportunity.",
    },
    commercialImportance: "critical",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "partial",
      available: ["Early-booking guidance", "Signed-contract and 30% retainer policy"],
      limitation: "No universal booking or branding lead time is approved.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: ["/contact"],
    },
    recommendedFormat: "concise contextual answer",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "travel-and-service-area",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Event Co."],
    eventTypes: ["All event types"],
    searchIntents: ["Local", "Transactional", "Commercial investigation"],
    funnelStages: ["Discovery", "Cost investigation", "Vendor evaluation"],
    geographicIntent: {
      level: "explicit local",
      markets: ["Toronto", "GTA", "Southern Ontario"],
      note: "This is the primary local-intent cluster and should use the approved service-area hierarchy.",
    },
    commercialImportance: "high",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved Toronto and GTA primary market", "Qualified Southern Ontario travel"],
      limitation:
        "Travel thresholds, fee calculations, distance-based minimums, and a universal rental-delivery boundary remain unpublished.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: ["/", "/contact"],
    },
    recommendedFormat: "concise contextual answer",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential:
      "No city pages should be created until Luxe has unique local proof sufficient for a genuinely useful page.",
  },
  {
    questionId: "dessert-quantity-and-flow",
    icps: ["wedding-clients", "private-event-clients", "corporate-clients"],
    services: ["Luxe Sweet Cart"],
    eventTypes: ["Weddings", "Corporate events", "Private events"],
    searchIntents: ["Informational", "Logistical", "Comparison"],
    funnelStages: ["Planning", "Comparison", "Vendor evaluation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Quantity and flow depend on selections and attendance rather than location.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Qualified Sweet Cart guest limit", "Approved dessert formats"],
      limitation: "Portion planning, preparation rate, line time, and staffing formula remain unverified.",
    },
    destination: {
      primaryPath: "/experiences/sweet-cart",
      supportingPaths: ["/faq"],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "rental-inventory-layout",
    icps: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Seating Rentals"],
    eventTypes: ["Weddings", "Baby showers", "Bridal showers", "Birthdays", "Backyard and outdoor events", "Engagements", "Private celebrations"],
    searchIntents: ["Informational", "Comparison", "Local"],
    funnelStages: ["Discovery", "Understanding", "Planning", "Vendor evaluation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA"],
      note: "Inventory availability is tied to the local delivery market.",
    },
    commercialImportance: "critical",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "confirmed",
      available: ["Approved item-level rental inventory", "Confirmed quantities, dimensions, tent-top types, and linen colours"],
      limitation: "Date-specific availability, substitutions, and operational policies remain subject to confirmation.",
    },
    destination: {
      primaryPath: "/experiences/seating-rentals",
      supportingPaths: [],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A browsable focused-inventory guide is appropriate when date-specific availability and maintenance ownership are defined.",
  },
  {
    questionId: "rental-delivery-setup-responsibility",
    icps: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Seating Rentals"],
    eventTypes: ["Weddings", "Showers", "Birthdays", "Backyard and outdoor events", "Engagements", "Private celebrations"],
    searchIntents: ["Logistical", "Transactional", "Troubleshooting"],
    funnelStages: ["Planning", "Cost investigation", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA"],
      note: "Delivery scope is location-sensitive but remains booking-specific.",
    },
    commercialImportance: "critical",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Event-specific delivery, setup, takedown, and pickup qualification"],
      limitation: "No universal responsibility matrix, fee model, or timing promise is approved.",
    },
    destination: {
      primaryPath: "/experiences/seating-rentals",
      supportingPaths: ["/faq"],
    },
    recommendedFormat: "responsibility summary",
    answerStatus: "answered",
    placement: "conversion page",
    futureResourcePotential: null,
  },
  {
    questionId: "rental-risk-and-changes",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: ["Luxe Seating Rentals"],
    eventTypes: ["All event types"],
    searchIntents: ["Commercial investigation", "Transactional", "Troubleshooting"],
    funnelStages: ["Cost investigation", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "Risk and change terms are contractual rather than geographic.",
    },
    commercialImportance: "high",
    operationalImportance: "high",
    firstPartyEvidence: {
      status: "unavailable",
      available: ["Booking-specific contract and proposal"],
      limitation: "Public damage, shortage, cancellation, substitution, and change-window policies are not approved.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: ["/experiences/seating-rentals"],
    },
    recommendedFormat: "concise contextual answer",
    answerStatus: "dependency blocked",
    placement: "conversion page",
    futureResourcePotential:
      "A public policy summary belongs here only after the contractual terms are approved and reconciled.",
  },
  {
    questionId: "corporate-scale-and-repetition",
    icps: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    services: ["Luxe Event Co.", "Luxe Coffee Bar", "Luxe Sweet Cart"],
    eventTypes: ["Corporate events", "Brand activations"],
    searchIntents: ["Commercial investigation", "Logistical", "Transactional"],
    funnelStages: ["Understanding", "Planning", "Vendor evaluation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA", "Southern Ontario"],
      note: "Feasibility includes travel and site access, but the decision is primarily operational.",
    },
    commercialImportance: "critical",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: [
        "Confirmed upper limit of three simultaneous Coffee Bar and Sweet Cart setups",
        "Public content now withholds multi-day and recurring capability",
      ],
      limitation:
        "Multi-day and recurring operating models remain unverified and must not be promised.",
    },
    destination: {
      primaryPath: "/events/corporate-events",
      supportingPaths: ["/events/brand-activations"],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A scale or recurring-program case study requires approved examples, operating parameters, and outcomes.",
  },
  {
    questionId: "procurement-insurance-and-compliance",
    icps: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    services: ["Luxe Event Co."],
    eventTypes: ["Corporate events", "Brand activations"],
    searchIntents: ["Commercial investigation", "Transactional", "Logistical"],
    funnelStages: ["Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA", "Southern Ontario"],
      note: "Venue and institutional requirements may vary by jurisdiction and property.",
    },
    commercialImportance: "critical",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Confirmed $5 million liability insurance", "Willingness to coordinate with procurement and venues"],
      limitation: "Certificate wording, endorsements, permits, onboarding documents, and turnaround times are not approved.",
    },
    destination: {
      primaryPath: "/events/corporate-events",
      supportingPaths: ["/events/brand-activations", "/faq", "/contact"],
    },
    recommendedFormat: "requirements summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A procurement pack may be useful as a controlled sales asset after its documents and ownership are confirmed.",
  },
  {
    questionId: "coordination-and-role-boundaries",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: [
      "Luxe Event Co.",
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["All event types"],
    searchIntents: ["Logistical", "Troubleshooting", "Commercial investigation"],
    funnelStages: ["Planning", "Vendor evaluation", "Booking preparation"],
    geographicIntent: {
      level: "none",
      markets: [],
      note: "The ownership question is workflow-specific rather than geographic.",
    },
    commercialImportance: "high",
    operationalImportance: "critical",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved willingness to work with planners, venues, agencies, and internal teams"],
      limitation: "A universal step-by-step workflow, response-time promise, and responsibility matrix are not approved.",
    },
    destination: {
      primaryPath: "/faq",
      supportingPaths: [
        "/events/weddings",
        "/events/corporate-events",
        "/events/brand-activations",
        "/contact",
      ],
    },
    recommendedFormat: "responsibility summary",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "A planner or venue guide should wait for an approved coordination process.",
  },
  {
    questionId: "comparable-proof",
    icps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    services: [
      "Luxe Event Co.",
      "Luxe Coffee Bar",
      "Luxe Sweet Cart",
      "Luxe Seating Rentals",
    ],
    eventTypes: ["All event types"],
    searchIntents: ["Commercial investigation", "Comparison", "Inspirational"],
    funnelStages: ["Discovery", "Comparison", "Vendor evaluation"],
    geographicIntent: {
      level: "implicit local",
      markets: ["Toronto", "GTA"],
      note: "Local venues and event examples can increase relevance when permissioned.",
    },
    commercialImportance: "critical",
    operationalImportance: "moderate",
    firstPartyEvidence: {
      status: "partial",
      available: ["Approved organization names", "Existing first-party photography"],
      limitation: "Comparable case facts, outcomes, quotations, and testimonials require separate permission.",
    },
    destination: {
      primaryPath: "/gallery",
      supportingPaths: [
        "/events/weddings",
        "/events/corporate-events",
        "/events/brand-activations",
      ],
    },
    recommendedFormat: "proof module",
    answerStatus: "partially answered",
    placement: "conversion page",
    futureResourcePotential:
      "Permissioned case studies are the strongest future-resource opportunity in this matrix.",
  },
];

export const questionClassificationRules = [
  "Each natural-language variant inherits the classification of its canonical question cluster.",
  "An answered status means a responsible answer exists; it does not authorize a universal number, policy, or claim beyond the recorded evidence.",
  "A dependency-blocked question may retain a qualified planning answer, but the missing fact must not be estimated.",
  "Use one primary destination and contextual links instead of repeating the full answer across pages.",
  "Keep conversion-page answers concise and proportional to the decision they unblock.",
  "Future-resource potential is a conditional evidence threshold, not approval to create a route.",
  "Do not create city pages from geographic-intent labels.",
  "No classification adds FAQPage markup unless the exact question and answer are visibly published on the FAQ page.",
] as const;

const clusterIds = new Set(questionClusters.map((cluster) => cluster.id));
const classificationIds = new Set(
  questionClassifications.map((classification) => classification.questionId),
);
const classificationRoutes = new Set(
  questionClassifications.flatMap((classification) => [
    classification.destination.primaryPath,
    ...classification.destination.supportingPaths,
  ]),
);
const dependencySlugs = new Set(
  questionClusters.flatMap((cluster) => cluster.dependencySlugs),
);

export const questionClassificationSummary = {
  questionClusterCount: questionClusters.length,
  classifiedClusterCount: questionClassifications.length,
  inheritedNaturalVariantCount: questionClusters.reduce(
    (count, cluster) => count + cluster.naturalVariants.length,
    0,
  ),
  newRoutes: [] as string[],
  unclassifiedQuestionIds: [...clusterIds].filter(
    (id) => !classificationIds.has(id),
  ),
  unknownClassificationIds: [...classificationIds].filter(
    (id) => !clusterIds.has(id),
  ),
  invalidRouteReferences: [...classificationRoutes].filter(
    (path) => !primaryRoutes.includes(path as (typeof primaryRoutes)[number]),
  ),
  unknownAudienceReferences: [
    ...new Set(questionClassifications.flatMap((item) => item.icps)),
  ].filter(
    (slug) => !aeoAudienceProfiles.some((profile) => profile.slug === slug),
  ),
  missingDependencyRecords: [...dependencySlugs].filter(
    (slug) =>
      !aeoContentDependencies.some((dependency) => dependency.slug === slug),
  ),
  futureResourceRecommendations: [] as string[],
  revalidationRequired: questionClassifications
    .filter(
      (classification) =>
        classification.firstPartyEvidence.status === "revalidation-required",
    )
    .map((classification) => classification.questionId),
};

export function getQuestionClassification(questionId: string) {
  return questionClassifications.find(
    (classification) => classification.questionId === questionId,
  );
}
