export type ContentOwnershipRecord = {
  path: string;
  primaryIntent: string;
  owns: readonly string[];
  supports: readonly string[];
  mustNotOwn: readonly string[];
  competingIntentReview: "clear";
};

export const contentOwnershipRules = [
  "Assign each complete answer to one definitive page.",
  "Use a concise contextual mention and link when another page needs the subject.",
  "Keep service mechanics on the applicable service page.",
  "Keep occasion-specific planning on the applicable event page.",
  "Keep shared booking, travel, venue, and operating policies on the FAQ page.",
  "Keep broad service and provider comparisons on a hub unless one service owns the decision.",
  "Require a distinct user need and first-party evidence before creating a future resource.",
] as const;

export const priorityPageIntentReview: readonly ContentOwnershipRecord[] = [
  {
    path: "/",
    primaryIntent: "Understand Luxe Event Co. and choose the next journey.",
    owns: ["Parent-brand identity", "High-level service and event routing"],
    supports: ["Toronto and GTA relevance", "Coordinated-service discovery"],
    mustNotOwn: ["Complete service mechanics", "Complete event-planning answers", "Shared policies"],
    competingIntentReview: "clear",
  },
  {
    path: "/experiences",
    primaryIntent: "Compare service categories and choose an experience.",
    owns: ["Broad service comparison", "Single-provider versus coordinated-service decision"],
    supports: ["Cross-service capacity context", "Combination discovery"],
    mustNotOwn: ["Detailed service menus", "Occasion-specific planning", "Shared booking policy"],
    competingIntentReview: "clear",
  },
  {
    path: "/experiences/coffee-bar",
    primaryIntent: "Understand and evaluate Luxe Coffee Bar service.",
    owns: ["Coffee formats", "Beverage menu", "Coffee capacity and staffing mechanics", "Coffee customization"],
    supports: ["Event-fit examples", "Shared venue requirements"],
    mustNotOwn: ["Complete wedding planning", "Shared booking terms", "Dessert mechanics"],
    competingIntentReview: "clear",
  },
  {
    path: "/experiences/sweet-cart",
    primaryIntent: "Understand and evaluate Luxe Sweet Cart service.",
    owns: ["Dessert formats", "Toppings and enhancements", "Dessert capacity and staffing mechanics", "Dessert customization"],
    supports: ["Event-fit examples", "Shared venue requirements"],
    mustNotOwn: ["Complete shower planning", "Shared booking terms", "Coffee mechanics"],
    competingIntentReview: "clear",
  },
  {
    path: "/experiences/seating-rentals",
    primaryIntent: "Evaluate Luxe's focused rental inventory for weddings and private celebrations.",
    owns: ["Confirmed rental inventory", "Rental pricing factors", "Proposal-defined delivery and setup mechanics"],
    supports: ["Outdoor rental suitability", "Coffee Bar and Sweet Cart coordination"],
    mustNotOwn: ["Broad furniture catalogues", "Corporate conference furniture", "Complete occasion planning", "Shared booking terms", "Coffee or dessert mechanics"],
    competingIntentReview: "clear",
  },
  {
    path: "/events",
    primaryIntent: "Choose an event context and understand broad guest-flow planning.",
    owns: ["Event-type comparison", "Broad guest-flow framework"],
    supports: ["Experience selection", "Multi-service event planning"],
    mustNotOwn: ["Detailed service mechanics", "Complete event-type answers", "Shared policies"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/weddings",
    primaryIntent: "Plan coffee, dessert, and rental roles within a wedding.",
    owns: ["Wedding timing", "Cocktail-hour fit", "Wedding coordination"],
    supports: ["Wedding customization", "Southern Ontario wedding availability"],
    mustNotOwn: ["Complete booking and payment policy", "Generic service mechanics"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/corporate-events",
    primaryIntent: "Plan workplace, institutional, and corporate event service.",
    owns: ["Corporate scheduling", "Employee-appreciation fit", "Recurring and multi-day corporate context"],
    supports: ["Corporate customization", "Multi-station planning"],
    mustNotOwn: ["Complete brand-activation comparison", "Shared booking policy"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/brand-activations",
    primaryIntent: "Plan a branded experiential service.",
    owns: ["Activation strategy", "Brand-production inputs", "Experiential versus standard catering comparison"],
    supports: ["Coffee and dessert branding", "Multi-station activation planning"],
    mustNotOwn: ["General corporate-event planning", "Shared booking policy"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/baby-showers",
    primaryIntent: "Plan services around a baby shower.",
    owns: ["Baby-shower service selection", "Baby-shower guest flow and outdoor context"],
    supports: ["Personalization", "Combined-service discovery"],
    mustNotOwn: ["Generic setup policy", "Complete service menus", "Shared booking terms"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/bridal-showers",
    primaryIntent: "Plan services around a bridal shower.",
    owns: ["Bridal-shower dessert fit", "Bridal-shower timing and presentation"],
    supports: ["Personalization", "Combined-service discovery"],
    mustNotOwn: ["Generic setup policy", "Complete service menus", "Shared booking terms"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/birthdays",
    primaryIntent: "Plan services around a birthday or milestone.",
    owns: ["Birthday format", "Milestone and age-context planning"],
    supports: ["Personalization", "Combined-service discovery"],
    mustNotOwn: ["Generic setup policy", "Complete service menus", "Shared booking terms"],
    competingIntentReview: "clear",
  },
  {
    path: "/events/private-events",
    primaryIntent: "Plan services around a private occasion without a dedicated page.",
    owns: ["Private-event fit", "Cultural and outdoor private-event context"],
    supports: ["Personalization", "Combined-service discovery"],
    mustNotOwn: ["Dedicated occasion answers", "Generic setup policy", "Shared booking terms"],
    competingIntentReview: "clear",
  },
  {
    path: "/gallery",
    primaryIntent: "Evaluate permissioned visual proof.",
    owns: ["First-party visual evidence", "Accurate proof captions"],
    supports: ["Service confidence", "Event confidence"],
    mustNotOwn: ["Complete service explanations", "Complete event-planning answers"],
    competingIntentReview: "clear",
  },
  {
    path: "/faq",
    primaryIntent: "Resolve shared policy and operating questions before inquiry.",
    owns: ["Booking and payment policy", "Travel policy", "Shared venue and operating requirements", "Cross-service customization policy"],
    supports: ["Links to definitive service mechanics", "Links to event planning"],
    mustNotOwn: ["Complete coffee mechanics", "Complete dessert mechanics", "Complete rental mechanics", "Occasion-specific planning"],
    competingIntentReview: "clear",
  },
  {
    path: "/contact",
    primaryIntent: "Prepare and submit a qualified event inquiry.",
    owns: ["Inquiry inputs", "Proposal handoff", "Public contact paths"],
    supports: ["Links to unresolved policies", "Links to service and event selection"],
    mustNotOwn: ["Educational comparisons", "Complete service mechanics", "Complete shared policies"],
    competingIntentReview: "clear",
  },
] as const;

export const futureResourceGate = {
  requiredBeforeCreation: [
    "A distinct information need that cannot be answered clearly on an existing priority page",
    "Enough first-party evidence for a useful and differentiated answer",
    "A defined internal-link role and a non-competing search intent",
  ],
  deferredSubjects: [
    "Measured throughput and queue-planning studies",
    "Permissioned event case studies",
    "Venue-specific planning guides",
    "Detailed rental policy guide",
  ],
  prohibitedPatterns: [
    "One route per long-tail query",
    "City pages that change only the place name",
    "Event pages that change only the occasion name",
  ],
} as const;

export const contentCannibalizationAudit = {
  exactDuplicatePublishedAnswers: [] as string[],
  unresolvedCompetingIntents: [] as string[],
  thinLongTailRoutes: [] as string[],
  cityNameVariants: [] as string[],
  eventNameVariants: [] as string[],
  newRoutes: [] as string[],
} as const;
