import { primaryRoutes } from "./site-config";

export type ContentEvidenceStatus = "confirmed" | "deferred" | "needs-proof";
export type ContentRequirementType = "operational" | "proof" | "experience" | "conversion";

export type ContentRequirement = {
  slug: string;
  label: string;
  type: ContentRequirementType;
  status: ContentEvidenceStatus;
  source: "master-specification" | "client-intake" | "both";
  requirement: string;
  validationNote: string;
};

export const contentRequirements: ContentRequirement[] = [
  {
    slug: "booking-inclusions",
    label: "What every booking includes",
    type: "operational",
    status: "confirmed",
    source: "client-intake",
    requirement: "Show the confirmed Coffee Bar and Sweet Cart inclusions before enhancements; add rental inclusions when the inventory and package rules are finalized.",
    validationNote: "Do not imply that every rental booking has the same inclusions.",
  },
  {
    slug: "coffee-experience-difference",
    label: "Café Cart versus Signature Coffee Bar",
    type: "experience",
    status: "confirmed",
    source: "client-intake",
    requirement: "Explain the intimate Café Cart Experience and the full-service Signature Coffee Bar as different event-fit choices, not inferior and superior tiers.",
    validationNote: "Use event suitability and service expression; avoid basic/premium package language.",
  },
  {
    slug: "typical-capacities",
    label: "Typical capacities",
    type: "operational",
    status: "confirmed",
    source: "client-intake",
    requirement: "Record Coffee Bar capacity up to 500 guests and Sweet Cart capacity up to 400 guests; publish Seating Rentals capacity only after confirmation.",
    validationNote: "Capacity is not a promise of identical service speed or a substitute for event-specific planning.",
  },
  {
    slug: "simultaneous-setups",
    label: "Simultaneous setups",
    type: "operational",
    status: "confirmed",
    source: "client-intake",
    requirement: "Use the confirmed ability to support up to three simultaneous setups where relevant to corporate, multi-site, or multi-day planning.",
    validationNote: "Confirm staffing and date availability during inquiry.",
  },
  {
    slug: "service-duration",
    label: "Service-duration considerations",
    type: "operational",
    status: "deferred",
    source: "both",
    requirement: "Explain how guest count, service duration, staffing, early setup, extended service, and travel affect planning and pricing.",
    validationNote: "The intake confirms duration is customizable but does not yet provide standard service windows.",
  },
  {
    slug: "setup-teardown",
    label: "Setup and teardown requirements",
    type: "operational",
    status: "confirmed",
    source: "client-intake",
    requirement: "State that setup and takedown are part of the confirmed Coffee and Dessert booking experience; define rental rules when confirmed.",
    validationNote: "Exact time, access, and teardown requirements still need operational confirmation.",
  },
  {
    slug: "outdoor-events",
    label: "Outdoor-event considerations",
    type: "operational",
    status: "deferred",
    source: "master-specification",
    requirement: "Document outdoor suitability, weather contingencies, surface requirements, and event-day alternatives.",
    validationNote: "The intake identifies outdoor celebrations as important but does not answer the operating requirements.",
  },
  {
    slug: "power-water",
    label: "Power and water requirements",
    type: "operational",
    status: "deferred",
    source: "client-intake",
    requirement: "Answer whether each experience needs power, water, drainage, or other venue access, and what Luxe can provide independently.",
    validationNote: "Keep this out of public copy until confirmed.",
  },
  {
    slug: "branding-possibilities",
    label: "Branding possibilities",
    type: "experience",
    status: "confirmed",
    source: "client-intake",
    requirement: "Describe custom branded cups, signage, menu displays, cart branding, event themes, and tailored beverage menus as discovery-led options.",
    validationNote: "Show actual examples before making broad visual or production claims.",
  },
  {
    slug: "drink-menu-customization",
    label: "Drink-menu customization",
    type: "experience",
    status: "confirmed",
    source: "client-intake",
    requirement: "Present espresso classics, signature drinks, matcha, tea, chai, hot chocolate, milk alternatives, and seasonal collections as the confirmed menu framework.",
    validationNote: "Seasonal availability and final menu selections remain subject to event date and approval.",
  },
  {
    slug: "dessert-preparation",
    label: "Dessert preparation process",
    type: "experience",
    status: "confirmed",
    source: "client-intake",
    requirement: "Explain that mini Dutch pancakes, Belgian waffles on a stick, and mini donuts are freshly prepared on-site, with sauces, standard toppings, premium toppings, and optional soft serve.",
    validationNote: "Use menu and allergen details only after final operational review.",
  },
  {
    slug: "rental-delivery-setup",
    label: "Rental delivery and setup",
    type: "operational",
    status: "deferred",
    source: "both",
    requirement: "Define rental delivery, setup, pickup, teardown, access, timing, and travel rules for chairs, tables, cocktail tables, tents, linens, and lighting.",
    validationNote: "The intake confirms rental categories but not logistics policy.",
  },
  {
    slug: "multi-service-coordination",
    label: "Multi-service coordination",
    type: "conversion",
    status: "confirmed",
    source: "both",
    requirement: "Show how Coffee, Sweet Cart, and Seating Rentals can be selected independently or combined through one inquiry and proposal journey.",
    validationNote: "Do not describe the website as a full planning service; it coordinates experiences and hands off to the approved proposal workflow.",
  },
  {
    slug: "planner-venue-coordination",
    label: "Planner and venue coordination",
    type: "proof",
    status: "needs-proof",
    source: "client-intake",
    requirement: "Explain how Luxe works with planners, venues, photographers, florists, caterers, decorators, and production teams.",
    validationNote: "Add named partnerships, workflows, or examples only when permission and details are confirmed.",
  },
  {
    slug: "corporate-branding-workflow",
    label: "Corporate branding workflow",
    type: "conversion",
    status: "needs-proof",
    source: "client-intake",
    requirement: "Show how agencies and corporate teams move from campaign objective to branded cups, signage, menus, staffing, production coordination, and event-day delivery.",
    validationNote: "The capability is confirmed; the step-by-step workflow and examples still need client input.",
  },
  {
    slug: "seasonal-menu-availability",
    label: "Seasonal menu availability",
    type: "experience",
    status: "confirmed",
    source: "client-intake",
    requirement: "Use the confirmed spring, summer, autumn, and holiday drink collections to support seasonal pages, event planning, and future resource content.",
    validationNote: "Menus are subject to season, availability, and final approval.",
  },
  {
    slug: "travel-service-area",
    label: "Travel and service-area policies",
    type: "operational",
    status: "confirmed",
    source: "client-intake",
    requirement: "Reference Toronto, the full named GTA location set, and select Southern Ontario destination events with applicable travel fees.",
    validationNote: "Exact travel-fee thresholds and standard-area boundaries remain deferred.",
  },
  {
    slug: "booking-retainer-policy",
    label: "Booking and retainer policies",
    type: "conversion",
    status: "confirmed",
    source: "client-intake",
    requirement: "Explain the 30% non-refundable retainer, balance due seven days before the event, final-detail confirmation, and availability confirmation after contract and retainer.",
    validationNote: "Payment methods and contract platform remain unconfirmed.",
  },
  {
    slug: "liability-insurance",
    label: "$5 million liability insurance",
    type: "proof",
    status: "confirmed",
    source: "client-intake",
    requirement: "Highlight $5 million liability insurance as a major trust signal for corporate buyers, planners, venues, and wedding clients where relevant.",
    validationNote: "Use the client-confirmed wording; retain documentation for any venue or procurement verification request.",
  },
];

export type PageContentBrief = {
  path: string;
  purpose: string;
  requiredRequirements: string[];
  proofPriority: string[];
  doNotInvent: string[];
};

const sharedDoNotInvent = [
  "unconfirmed rental capacities or minimums",
  "power, water, footprint, or weather requirements",
  "named partnerships, testimonials, or photography permissions",
  "third-party inquiry or proposal platform details",
];

export const pageContentBriefs: PageContentBrief[] = [
  {
    path: "/",
    purpose: "Introduce the parent brand and route visitors into an experience-led or event-led journey.",
    requiredRequirements: ["multi-service-coordination", "travel-service-area", "liability-insurance"],
    proofPriority: ["confirmed division relationships", "original event photography", "parent-brand trust signals"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/experiences",
    purpose: "Explain the connected world of the three divisions without flattening them into catalogue categories.",
    requiredRequirements: ["multi-service-coordination", "travel-service-area"],
    proofPriority: ["division-specific photography", "clear complementary paths"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/experiences/coffee-bar",
    purpose: "Present the Coffee Bar through its two formats, staffed service, beverage menu, operating scope, and event fit.",
    requiredRequirements: ["booking-inclusions", "coffee-experience-difference", "typical-capacities", "simultaneous-setups", "service-duration", "setup-teardown", "power-water", "branding-possibilities", "drink-menu-customization", "seasonal-menu-availability", "travel-service-area", "liability-insurance"],
    proofPriority: ["real cart and service photography", "menu examples", "barista and hospitality process"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/experiences/sweet-cart",
    purpose: "Present the Sweet Cart as a freshly prepared, visually refined dessert experience.",
    requiredRequirements: ["booking-inclusions", "typical-capacities", "simultaneous-setups", "service-duration", "setup-teardown", "outdoor-events", "power-water", "dessert-preparation", "branding-possibilities", "seasonal-menu-availability", "travel-service-area", "liability-insurance"],
    proofPriority: ["on-site preparation photography", "cart collections", "menu and topping examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/experiences/seating-rentals",
    purpose: "Present Seating Rentals as a focused collection of practical, premium essentials for intimate celebrations and outdoor events.",
    requiredRequirements: ["booking-inclusions", "service-duration", "setup-teardown", "outdoor-events", "rental-delivery-setup", "multi-service-coordination", "travel-service-area", "liability-insurance"],
    proofPriority: ["real inventory photography", "room transformations", "delivery and setup examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events",
    purpose: "Organize event applications around the appropriate combination of Luxe experiences.",
    requiredRequirements: ["multi-service-coordination", "planner-venue-coordination", "travel-service-area"],
    proofPriority: ["event-type photography", "combination examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/weddings",
    purpose: "Help couples, planners, venues, and coordinators shape a cohesive wedding guest experience.",
    requiredRequirements: ["multi-service-coordination", "planner-venue-coordination", "service-duration", "setup-teardown", "outdoor-events", "travel-service-area", "liability-insurance", "booking-retainer-policy"],
    proofPriority: ["wedding photography", "timeline and vendor coordination", "coffee, dessert, and seating combinations"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/corporate-events",
    purpose: "Give corporate buyers operational confidence and a qualified path to inquiry.",
    requiredRequirements: ["corporate-branding-workflow", "simultaneous-setups", "service-duration", "setup-teardown", "planner-venue-coordination", "travel-service-area", "liability-insurance", "booking-retainer-policy"],
    proofPriority: ["approved corporate references", "scale and logistics", "multi-day or recurring-event examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/brand-activations",
    purpose: "Translate campaign objectives into branded, staffed, measurable physical experiences.",
    requiredRequirements: ["corporate-branding-workflow", "branding-possibilities", "simultaneous-setups", "service-duration", "planner-venue-coordination", "travel-service-area", "liability-insurance"],
    proofPriority: ["branded activation photography", "custom cups and menus", "production coordination examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/baby-showers",
    purpose: "Guide hosts toward an intimate, polished combination of coffee, desserts, and seating.",
    requiredRequirements: ["multi-service-coordination", "dessert-preparation", "setup-teardown", "outdoor-events", "travel-service-area", "booking-retainer-policy"],
    proofPriority: ["intimate event photography", "host-friendly planning details"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/bridal-showers",
    purpose: "Show how coffee, desserts, and intentional seating support a styled pre-wedding celebration.",
    requiredRequirements: ["multi-service-coordination", "dessert-preparation", "setup-teardown", "travel-service-area", "booking-retainer-policy"],
    proofPriority: ["bridal shower photography", "planner and decorator coordination"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/birthdays",
    purpose: "Present flexible coffee, dessert, signage, and rental combinations for milestone celebrations.",
    requiredRequirements: ["multi-service-coordination", "dessert-preparation", "branding-possibilities", "travel-service-area", "booking-retainer-policy"],
    proofPriority: ["birthday photography", "custom menu and styling examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/events/private-events",
    purpose: "Support hosts and decorators planning private celebrations that need a tailored mix of coffee, dessert, signage, and rentals.",
    requiredRequirements: ["multi-service-coordination", "dessert-preparation", "setup-teardown", "travel-service-area", "booking-retainer-policy"],
    proofPriority: ["private event photography", "room and guest-experience examples"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/gallery",
    purpose: "Provide first-party visual proof organized by experience and event context.",
    requiredRequirements: ["branding-possibilities", "multi-service-coordination", "planner-venue-coordination"],
    proofPriority: ["original images", "accurate captions", "associated event and division links"],
    doNotInvent: ["event details, client names, venue names, or image claims without permission"],
  },
  {
    path: "/faq",
    purpose: "Answer confirmed booking and operational questions while clearly deferring unresolved policies.",
    requiredRequirements: ["booking-inclusions", "service-duration", "setup-teardown", "outdoor-events", "power-water", "rental-delivery-setup", "travel-service-area", "booking-retainer-policy", "liability-insurance"],
    proofPriority: ["direct operational answers", "links to the relevant division or event page"],
    doNotInvent: sharedDoNotInvent,
  },
  {
    path: "/contact",
    purpose: "Collect enough event context for the approved handoff without recreating the future proposal platform.",
    requiredRequirements: ["multi-service-coordination", "travel-service-area", "booking-retainer-policy", "liability-insurance"],
    proofPriority: ["clear qualification expectations", "contact details", "24-hour response expectation"],
    doNotInvent: ["third-party form fields, quote behavior, contract flow, payment processor, or confirmation URL"],
  },
];

export const contentDifferentiationRules = [
  "Every factual claim must be traceable to the master specification, client intake, or approved first-party proof.",
  "Confirmed facts may inform content briefs but are not public claims until the relevant page content is approved.",
  "Deferred facts must remain visible as content dependencies and must not be filled with competitor assumptions.",
  "Structured data, metadata, image captions, and visible page copy must agree.",
  "Each page must answer its audience's decision questions before introducing search terminology.",
  "AI-assisted drafting may organize approved facts, but it must not create first-hand experience, testimonials, capacity, policies, or operational details.",
] as const;

export function getContentRequirement(slug: string) {
  return contentRequirements.find((requirement) => requirement.slug === slug);
}

export function getPageContentBrief(path: string) {
  return pageContentBriefs.find((brief) => brief.path === path);
}

export const contentDifferentiationSummary = {
  coveredRoutes: pageContentBriefs.map((brief) => brief.path),
  missingRoutes: primaryRoutes.filter((path) => !pageContentBriefs.some((brief) => brief.path === path)),
  confirmedRequirements: contentRequirements.filter((requirement) => requirement.status === "confirmed").map((requirement) => requirement.slug),
  deferredRequirements: contentRequirements.filter((requirement) => requirement.status !== "confirmed").map((requirement) => requirement.slug),
};
