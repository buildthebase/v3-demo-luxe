export type FirstPartyEvidenceStatus =
  | "published-confirmed"
  | "published-qualified"
  | "approved-for-display"
  | "asset-required"
  | "permission-required";

export const firstPartyEvidenceInventory = [
  {
    evidence: "Original event photography",
    status: "asset-required",
    publishedOn: [] as string[],
    boundary:
      "No original Luxe event photography is available in the approved public asset inventory.",
  },
  {
    evidence: "Confirmed service inclusions",
    status: "published-confirmed",
    publishedOn: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
    ],
    boundary:
      "Coffee and dessert inclusions are confirmed. Rental items, quantities, dimensions, tent types, and linen colours are confirmed, while operational responsibilities remain proposal-defined.",
  },
  {
    evidence: "Actual menus",
    status: "published-qualified",
    publishedOn: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
    ],
    boundary:
      "Confirmed drink, dessert, sauce, and topping selections are visible. Final availability, dietary notes, and version ownership remain content dependencies.",
  },
  {
    evidence: "Confirmed capacities",
    status: "published-confirmed",
    publishedOn: [
      "/",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/events/corporate-events",
    ],
    boundary:
      "Luxe Coffee Bar serves intimate gatherings through large-scale events, with service plans tailored to guest count, menu, venue requirements and event flow. Larger-format events can be accommodated through a customized service plan. Multiple service setups are available for select events.",
  },
  {
    evidence: "Confirmed setup information",
    status: "published-qualified",
    publishedOn: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
      "/faq",
    ],
    boundary:
      "Coffee and Sweet Cart setup and takedown are included. Exact timing, utility, footprint, staffing, and rental responsibilities remain event-specific.",
  },
  {
    evidence: "Actual event examples",
    status: "asset-required",
    publishedOn: [] as string[],
    boundary:
      "Planning examples and suggested combinations are not represented as completed Luxe events.",
  },
  {
    evidence: "Customization photography",
    status: "asset-required",
    publishedOn: [] as string[],
    boundary:
      "No customization image is publishable without an approved file, event context, and usage permission.",
  },
  {
    evidence: "Branded cup or signage examples",
    status: "permission-required",
    publishedOn: [] as string[],
    boundary:
      "Customization capabilities are described factually, but no branded client asset is presented as proof.",
  },
  {
    evidence: "Approved corporate names",
    status: "approved-for-display",
    publishedOn: [
      "/",
      "/events/corporate-events",
      "/events/brand-activations",
    ],
    boundary:
      "OPTrust, CST Savings, Convergint, ICNA Canada, and Waste Connections of Canada may be displayed without implying endorsement, testimonial, or case-study approval.",
  },
  {
    evidence: "Genuine testimonials",
    status: "permission-required",
    publishedOn: [] as string[],
    boundary:
      "No quotation is published until wording, attribution, event context, and publication permission are approved.",
  },
  {
    evidence: "Wedding gallery evidence",
    status: "permission-required",
    publishedOn: [] as string[],
    boundary:
      "The wedding gallery remains reserved until approved photography and accurate event metadata are available.",
  },
  {
    evidence: "Corporate gallery evidence",
    status: "permission-required",
    publishedOn: [] as string[],
    boundary:
      "Approved organization names do not create permission to publish event photographs, campaign details, or outcomes.",
  },
  {
    evidence: "Multi-service event examples",
    status: "asset-required",
    publishedOn: [] as string[],
    boundary:
      "Current multi-service combinations are planning possibilities, not case studies or proof of a completed event.",
  },
  {
    evidence: "Actual booking policies",
    status: "published-confirmed",
    publishedOn: ["/faq", "/contact"],
    boundary:
      "The public policy includes the signed-contract requirement, 30% non-refundable retainer, and remaining balance due seven days before the event.",
  },
  {
    evidence: "Actual service-area policies",
    status: "published-confirmed",
    publishedOn: ["/", "/faq", "/experiences/seating-rentals"],
    boundary:
      "Toronto and the approved GTA cities form the primary service area; select larger Southern Ontario events may be available and travel fees may apply.",
  },
] as const satisfies readonly {
  evidence: string;
  status: FirstPartyEvidenceStatus;
  publishedOn: readonly string[];
  boundary: string;
}[];

export const evidenceAnswerPairings = [
  {
    route: "/experiences/coffee-bar",
    answerSurface: "Inclusions, menu, capacity, setup, and service planning",
    proofSurface:
      "Confirmed inclusion list, named beverage menu, 500-guest capacity, three-setup limit, and setup/takedown statement",
  },
  {
    route: "/experiences/sweet-cart",
    answerSurface: "Dessert formats, inclusions, pantry, capacity, and setup",
    proofSurface:
      "Named desserts, sauces and toppings, inclusion list, 400-guest capacity, three-setup limit, and setup/takedown statement",
  },
  {
    route: "/experiences/seating-rentals",
    answerSurface: "Focused rental inventory, quote inputs, delivery, setup, and outdoor suitability",
    proofSurface:
      "Confirmed item-level inventory and quantities plus explicit proposal and policy boundaries",
  },
  {
    route: "/events/corporate-events",
    answerSurface: "Corporate scale, customization, and professional trust",
    proofSurface:
      "Confirmed capacities, insurance, and five permission-approved organization names",
  },
  {
    route: "/faq",
    answerSurface: "Booking, payment, service area, travel, and setup answers",
    proofSurface:
      "Approved retainer, payment timing, city coverage, travel qualification, and setup-policy language",
  },
] as const;

export const firstPartyEvidenceRules = [
  "Use client-provided facts and approved assets; do not turn planning examples into case studies.",
  "Do not use stock or generated imagery as evidence of Luxe work.",
  "Approved organization-name use does not imply testimonial, endorsement, event-detail, or case-study permission.",
  "A photo becomes proof only after its file, ownership, permission, event context, caption, and alt text are approved together.",
  "Keep variable operational facts qualified and identify the proposal or planning process that confirms them.",
] as const;

export const firstPartyEvidenceAudit = {
  inventedEvents: [] as string[],
  inventedTestimonials: [] as string[],
  unapprovedClientClaims: [] as string[],
  stockOrGeneratedProof: [] as string[],
  newRoutes: [] as string[],
} as const;
