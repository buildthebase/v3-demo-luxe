import { approvedAeoAnswers, withheldAeoAnswers } from "./aeo-implementation";
import { aeoQuestionMap } from "./aeo-question-map";

export const contentValidationDimensions = [
  "Accuracy",
  "Usefulness",
  "Directness",
  "Industry relevance",
  "ICP relevance",
  "Search intent",
  "First-hand evidence",
  "Operational confirmation",
  "Appropriate level of detail",
  "Consistency across pages",
  "Unsupported-claim review",
  "Keyword-stuffing review",
  "Invented-statistic review",
  "Natural-language review",
] as const;

const approvedIds = new Set(approvedAeoAnswers.map((answer) => answer.id));

export const approvedAnswerValidation = aeoQuestionMap
  .filter((answer) => approvedIds.has(answer.id))
  .map((answer) => ({
    id: answer.id,
    definitivePage: answer.primaryPage,
    publishingStatus: answer.publishingStatus,
    sourceValidationStatus: answer.validationStatus,
    reviewResult:
      answer.validationStatus === "pending first-party validation"
        ? ("validated as a factual boundary; operational values remain unpublished" as const)
        : answer.validationStatus === "pending permission validation"
          ? ("validated as a permission boundary; unapproved proof remains unpublished" as const)
          : answer.validationStatus === "validated with dependency limits"
            ? ("validated within confirmed limits" as const)
            : ("validated" as const),
    outstandingEvidence: answer.requiredEvidence.outstanding,
  }));

export const confirmedOperationalFacts = [
  {
    topic: "Coffee Bar capacity",
    fact: "Up to 500 guests, subject to the event scope.",
    source: "approved business configuration",
  },
  {
    topic: "Sweet Cart capacity",
    fact: "Up to 400 guests, subject to the event scope.",
    source: "approved business configuration",
  },
  {
    topic: "Simultaneous setups",
    fact: "Up to three Coffee Bar setups and up to three Sweet Cart setups, subject to scope and availability.",
    source: "approved business configuration",
  },
  {
    topic: "Coffee and dessert setup",
    fact: "Setup and takedown are included for Coffee Bar and Sweet Cart service.",
    source: "approved business configuration",
  },
  {
    topic: "Booking",
    fact: "A signed contract and 30% non-refundable retainer reserve the date; the remaining balance is due seven days before the event.",
    source: "approved booking policy",
  },
  {
    topic: "Service area",
    fact: "Toronto and the GTA are the primary service area; select larger Southern Ontario events may be available and travel fees may apply.",
    source: "approved service-area policy",
  },
  {
    topic: "Insurance",
    fact: "$5 million in liability insurance is available as a business trust signal.",
    source: "approved business configuration",
  },
  {
    topic: "Menus and focused rental inventory",
    fact: "Named menu selections and the client-confirmed item-level rental inventory are presented as available; date-specific availability and operational scope remain proposal-dependent.",
    source: "approved service configuration",
  },
] as const;

export const clientConfirmationRequirements = [
  {
    topic: "Coffee throughput",
    confirmationNeeded:
      "Measured drinks served per hour by service format, menu, equipment, and staffing model.",
    affectedPages: ["/experiences", "/experiences/coffee-bar"],
    currentPublicTreatment:
      "No universal drinks-per-hour or wait-time figure is published.",
  },
  {
    topic: "Staffing",
    confirmationNeeded:
      "Approved barista and attendant ranges or a public staffing formula by service type.",
    affectedPages: [
      "/experiences",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
    ],
    currentPublicTreatment:
      "Team size is described as event-specific and confirmed in the proposal.",
  },
  {
    topic: "Footprint and utilities",
    confirmationNeeded:
      "Exact floor-space, outlet, circuit, electrical-load, potable-water, and drainage requirements by format.",
    affectedPages: [
      "/faq",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
    ],
    currentPublicTreatment:
      "The site tells clients not to assume self-contained operation and defers exact requirements to planning.",
  },
  {
    topic: "Setup, teardown, and service duration",
    confirmationNeeded:
      "Approved setup, takedown, and service-duration ranges by experience and format.",
    affectedPages: [
      "/faq",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/events/weddings",
    ],
    currentPublicTreatment:
      "Inclusion is confirmed, but no unverified timing range is stated.",
  },
  {
    topic: "Outdoor operating limits",
    confirmationNeeded:
      "Approved weather, wind, temperature, surface, shelter, generator, and cancellation limits.",
    affectedPages: ["/faq", "/events/private-events"],
    currentPublicTreatment:
      "Outdoor feasibility is qualified by site conditions and venue planning.",
  },
  {
    topic: "Venue coordination",
    confirmationNeeded:
      "Approved coordination workflow, responsibility ownership, escalation path, and venue handoff process.",
    affectedPages: ["/faq", "/contact", "/events/weddings"],
    currentPublicTreatment:
      "The planning inputs are described without promising an unconfirmed workflow.",
  },
  {
    topic: "Rental operations",
    confirmationNeeded:
      "Delivery, setup, teardown, pickup, damage, substitution, change, weather, and outdoor policies for the confirmed inventory.",
    affectedPages: ["/experiences/seating-rentals", "/faq"],
    currentPublicTreatment:
      "Confirmed items, quantities, dimensions, and tent types are visible; operational responsibilities, timing, fees, and policy terms remain proposal- or contract-defined.",
  },
  {
    topic: "Multi-day and recurring service",
    confirmationNeeded:
      "Approved operating model for reset, storage, replenishment, staffing, travel, and recurring bookings.",
    affectedPages: ["/events/corporate-events", "/events/brand-activations"],
    currentPublicTreatment:
      "Requests may be reviewed, but capability is not promised.",
  },
  {
    topic: "Branding production",
    confirmationNeeded:
      "Lead times, artwork deadlines, accepted file types, colour specifications, proof approvals, and revision limits.",
    affectedPages: ["/events/brand-activations", "/events/corporate-events"],
    currentPublicTreatment:
      "Branding options are described while timelines and asset requirements remain proposal-dependent.",
  },
  {
    topic: "Travel and destination events",
    confirmationNeeded:
      "Distance thresholds, fee method, service minimums, accommodation rules, and destination-event limits.",
    affectedPages: ["/faq", "/contact"],
    currentPublicTreatment:
      "Southern Ontario availability is qualified and no fee formula is invented.",
  },
  {
    topic: "Dietary and cross-contact policy",
    confirmationNeeded:
      "Approved allergen, ingredient, dairy-free handling, and cross-contact language.",
    affectedPages: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/faq",
    ],
    currentPublicTreatment:
      "Options may be discussed, but the site does not make an unverified allergen-safety promise.",
  },
] as const;

export const contentAccuracyAudit = {
  approvedAnswersReviewed: approvedAnswerValidation.length,
  withheldAnswersReviewed: withheldAeoAnswers.length,
  unsupportedClaims: [] as string[],
  inventedStatistics: [] as string[],
  keywordStuffing: [] as string[],
  unnaturalAeoPhrasing: [] as string[],
  crossPageContradictions: [] as string[],
  unnecessaryContentAdditions: [] as string[],
  clientConfirmationsRequired: clientConfirmationRequirements.length,
} as const;

export const contentValidationRules = [
  "A useful limitation is publishable when it prevents an unsafe assumption; it is not treated as confirmation of the missing operational value.",
  "No estimate becomes a public fact without client confirmation and a reconciled source of truth.",
  "Permission-gated photography, testimonials, organizations, venues, campaigns, and outcomes remain unpublished.",
  "The definitive page owns the complete answer; supporting pages use concise context and a link.",
  "Client confirmation expands an answer only when the added detail materially helps planning or booking.",
] as const;
