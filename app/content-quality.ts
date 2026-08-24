import { pageContentBriefs } from "./content-differentiation";
import { pageContracts } from "./page-contract";
import { primaryRoutes } from "./site-config";

export type FirstHandEvidenceStatus =
  | "supported-by-client-intake"
  | "partial-first-party-proof"
  | "awaiting-approved-first-party-media";

export type PageQualityEvidence = {
  path: string;
  concreteValue: string;
  firstHandStatus: FirstHandEvidenceStatus;
  evidenceGate: string;
};

export const pageQualityEvidence: PageQualityEvidence[] = [
  {
    path: "/",
    concreteValue:
      "Explains the three-division operating model, independent and combined booking, confirmed capacities, insurance, planning pathway, and service area.",
    firstHandStatus: "partial-first-party-proof",
    evidenceGate:
      "Publish approved event photography and permissioned client quotations before presenting them as first-hand Home proof.",
  },
  {
    path: "/experiences",
    concreteValue:
      "Compares Coffee Bar, Sweet Cart, and Seating Rentals by format, role, capacity, event fit, and combination logic.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved division photography and final operating specifications without flattening the divisions into interchangeable cards.",
  },
  {
    path: "/experiences/coffee-bar",
    concreteValue:
      "Details two service formats, booking inclusions, beverage categories, customization, capacity, setup, travel, and venue questions.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved service photography and confirmed power, water, footprint, staffing, and standard-duration guidance.",
  },
  {
    path: "/experiences/sweet-cart",
    concreteValue:
      "Details two cart collections, four desserts prepared on-site, sauces, topping categories, optional soft serve, capacity, and setup.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved preparation photography plus confirmed utility, allergen, outdoor-operation, and service-window guidance.",
  },
  {
    path: "/experiences/seating-rentals",
    concreteValue:
      "Defines six confirmed rental categories, layout considerations, quote inputs, and qualified delivery, setup, teardown, and outdoor boundaries.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add the approved inventory schedule, quantities, dimensions, delivery policy, and first-party room transformations.",
  },
  {
    path: "/events",
    concreteValue:
      "Organizes seven occasion-led paths and shows how the three divisions can serve different moments without inventing fixed packages.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved event-type photography and concrete combination examples from completed Luxe events.",
  },
  {
    path: "/events/weddings",
    concreteValue:
      "Maps coffee, dessert, and rentals to wedding-day moments and states booking, insurance, travel, and coordination considerations.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add permissioned wedding photography, testimonials, venue context, and a confirmed coordination example.",
  },
  {
    path: "/events/corporate-events",
    concreteValue:
      "Covers office events, conferences, appreciation programs, confirmed simultaneous scale, branding, procurement confidence, and the dependency boundary for multi-day or recurring work.",
    firstHandStatus: "partial-first-party-proof",
    evidenceGate:
      "Add approved case-study details, outcomes, photographs, and quotations for the named organizations.",
  },
  {
    path: "/events/brand-activations",
    concreteValue:
      "Explains cups, signage, menus, cart styling, service formats, retail and launch contexts, multiple setups, and campaign constraints.",
    firstHandStatus: "partial-first-party-proof",
    evidenceGate:
      "Add permissioned activation examples and the confirmed agency-to-production workflow before making outcome claims.",
  },
  {
    path: "/events/baby-showers",
    concreteValue:
      "Connects coffee, matcha, dessert prepared on-site, rentals, signage, indoor and outdoor planning, and host questions.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved shower photography and confirmed outdoor operating requirements.",
  },
  {
    path: "/events/bridal-showers",
    concreteValue:
      "Explains café-style drinks, live dessert, rentals, signage, floral coordination, host needs, and proposal boundaries.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved shower photography and a permissioned planner or decorator coordination example.",
  },
  {
    path: "/events/birthdays",
    concreteValue:
      "Separates milestone, adult, family, and suitable children's contexts while detailing drinks, dessert, signage, rentals, and combinations.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add approved birthday photography and concrete menu or styling examples from completed events.",
  },
  {
    path: "/events/private-events",
    concreteValue:
      "Covers engagements, anniversaries, graduations, religious and cultural celebrations, holidays, experience combinations, and inquiry requirements.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Add permissioned private-event photography and examples without exposing private client details.",
  },
  {
    path: "/gallery",
    concreteValue:
      "Groups the intended visual record by service and occasion and withholds image claims while publication permission is pending.",
    firstHandStatus: "awaiting-approved-first-party-media",
    evidenceGate:
      "Do not present the Gallery as first-hand proof until approved Luxe images, captions, event context, and permissions are published.",
  },
  {
    path: "/faq",
    concreteValue:
      "Consolidates shared-policy, service, and event-planning questions from the same records used by the visible detail pages and FAQ schema.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Replace qualified deferrals only after Luxe approves the corresponding operational policy.",
  },
  {
    path: "/contact",
    concreteValue:
      "Explains the information Luxe needs, response expectation, service area, minimum context, contact methods, and third-party handoff boundary.",
    firstHandStatus: "supported-by-client-intake",
    evidenceGate:
      "Connect the inquiry platform only after its URL, privacy treatment, fields, tracking, and confirmation flow are approved.",
  },
];

export const helpfulContentStandards = {
  originality:
    "Every route must solve a distinct visitor decision rather than repeat a generic service or event template.",
  accuracy:
    "Claims must trace to the master specification, client intake, or approved first-party evidence.",
  usefulness:
    "Concrete formats, inclusions, menus, capacities, planning inputs, constraints, or next steps must replace positioning-only copy.",
  completeness:
    "A page must answer its core decision questions and qualify unresolved operations instead of hiding them.",
  ownership:
    "The shared shell identifies Luxe Event Co. and publishes its approved phone and email; article-style bylines are not invented for service pages.",
  firstHandExperience:
    "Client-confirmed operating knowledge may be explained, but photographs, testimonials, venues, outcomes, and case details remain gated until approved.",
  depth:
    "Depth is determined by the visitor task, not a target word count.",
  filler:
    "Remove passages that do not add a service fact, decision aid, evidence point, meaningful distinction, or next step.",
  unsupportedClaims:
    "Do not invent ratings, superlatives, availability, pricing, inventory, logistics, partnerships, or outcomes.",
  keywordUse:
    "Use natural service and location terminology; do not repeat exact query phrases to manipulate rankings.",
  positioningLanguage:
    "Premium, luxury, elevated, exceptional, memorable, unforgettable, and one-of-a-kind may appear only when they are a real category or selective positioning line supported by nearby concrete detail.",
  differentiation:
    "Each page must retain a distinct purpose, audience, evidence set, and conversion path.",
  nextStep:
    "Every route must provide a relevant inquiry or onward-planning action.",
  operations:
    "Public copy, structured data, metadata, FAQs, and inquiry expectations must agree with current approved operations.",
} as const;

export const contentQualityReviews = pageContracts.map((contract) => {
  const contentBrief = pageContentBriefs.find(
    (brief) => brief.path === contract.path,
  );
  const evidence = pageQualityEvidence.find(
    (item) => item.path === contract.path,
  );

  return {
    path: contract.path,
    status: "reviewed-with-evidence-gates" as const,
    purpose: contract.purpose,
    primaryCta: contract.primaryCta,
    sourceControls: contentBrief?.doNotInvent ?? [],
    concreteValue: evidence?.concreteValue,
    firstHandStatus: evidence?.firstHandStatus,
    evidenceGate: evidence?.evidenceGate,
    ownerReviewRequired: true,
  };
});

export const contentQualitySummary = {
  reviewedRoutes: contentQualityReviews.map((review) => review.path),
  missingRoutes: primaryRoutes.filter(
    (path) => !contentQualityReviews.some((review) => review.path === path),
  ),
  routesAwaitingFirstPartyMedia: pageQualityEvidence
    .filter(
      (evidence) =>
        evidence.firstHandStatus === "awaiting-approved-first-party-media",
    )
    .map((evidence) => evidence.path),
  ownerReviewRequired:
    "Luxe must complete a final owner review because AI-assisted implementation cannot independently verify first-hand operations or create evidence.",
} as const;
