import type {
  AnswerStatus,
  FunnelStage,
  RecommendedContentFormat,
  SearchIntentType,
} from "./aeo-question-classification";
import {
  getQuestionClassification,
} from "./aeo-question-classification";
import type { AeoAudienceSlug } from "./aeo-audience-research";
import { getQuestionCluster, questionClusters } from "./aeo-query-research";
import { primaryRoutes } from "./site-config";

export type PublishingStatus =
  | "live"
  | "live with dependency limits"
  | "planned"
  | "blocked"
  | "revalidation required";

export type ValidationStatus =
  | "validated"
  | "validated with dependency limits"
  | "pending first-party validation"
  | "pending permission validation"
  | "source conflict";

export type InternalLinkInstruction = {
  fromPage: string;
  toDefinitivePage: string;
  linkPurpose: string;
};

export type AeoQuestionMapRecord = {
  id: string;
  question: string;
  normalizedQueryTopic: string;
  primaryPage: string;
  secondarySupportingPage: string | null;
  icp: AeoAudienceSlug[];
  funnelStage: FunnelStage[];
  searchIntent: SearchIntentType[];
  proposedAnswer: string;
  requiredEvidence: {
    available: string[];
    outstanding: string[];
  };
  internalLinks: InternalLinkInstruction[];
  contentFormat: RecommendedContentFormat;
  publishingStatus: PublishingStatus;
  validationStatus: ValidationStatus;
  existingAnswerStatus: AnswerStatus;
};

type QuestionMapPlan = Pick<
  AeoQuestionMapRecord,
  | "id"
  | "normalizedQueryTopic"
  | "primaryPage"
  | "secondarySupportingPage"
  | "proposedAnswer"
  | "internalLinks"
  | "publishingStatus"
  | "validationStatus"
> & {
  outstandingEvidence: string[];
};

const questionMapPlans: QuestionMapPlan[] = [
  {
    id: "experience-fit",
    normalizedQueryTopic: "choosing an event coffee, dessert, or rental experience",
    primaryPage: "/events",
    secondarySupportingPage: "/experiences",
    proposedAnswer:
      "Choose the experience by the job it needs to do in the event. Coffee supports arrival, conversation, breaks, dessert, and later service; live dessert adds an interactive food moment; rentals shape seating, gathering, and flow. Luxe can coordinate one division or a combination after the schedule, guests, venue, and desired role are clear.",
    outstandingEvidence: [],
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/events",
        linkPurpose: "Direct visitors from service comparison to event-role guidance.",
      },
      {
        fromPage: "/",
        toDefinitivePage: "/events",
        linkPurpose: "Link the Home overview to the complete event-fit answer.",
      },
    ],
    publishingStatus: "live",
    validationStatus: "validated",
  },
  {
    id: "wedding-service-timing",
    normalizedQueryTopic: "when to schedule coffee or dessert at a wedding",
    primaryPage: "/events/weddings",
    secondarySupportingPage: "/experiences/coffee-bar",
    proposedAnswer:
      "The strongest service window depends on the role coffee or dessert should play. Coffee may suit guest arrival, cocktail hour, dessert, or a later reception window, while live dessert works best where preparation and guest flow can become part of the experience. Luxe confirms the operating window against the wedding timeline and venue schedule rather than applying one universal time.",
    outstandingEvidence: [
      "Approved service-duration ranges",
      "Approved setup and takedown timing by format",
      "Permissioned wedding timeline examples",
    ],
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/weddings",
        linkPurpose: "Link service mechanics to the definitive wedding-timing guidance.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/events/weddings",
        linkPurpose: "Link dessert timing mentions to the wedding schedule answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "guest-use-and-value",
    normalizedQueryTopic: "whether an event coffee or dessert experience is worth it",
    primaryPage: "/events",
    secondarySupportingPage: "/events/weddings",
    proposedAnswer:
      "The experience is most useful when it solves a clear event need: welcoming guests, supporting a transition, creating a programmed break, complementing dessert, or giving people a natural place to gather. Value should be judged against timing, expected participation, available space, and the wider hospitality plan—not appearance alone. Luxe should not promise a utilization rate or financial return without event-specific evidence.",
    outstandingEvidence: [
      "Permissioned examples showing the experience's intended role",
      "First-party participation or guest-feedback evidence",
      "Approved outcomes; no return-on-investment estimate",
    ],
    internalLinks: [
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/events",
        linkPurpose: "Link the wedding mention to the shared event-value framework.",
      },
      {
        fromPage: "/events/private-events",
        toDefinitivePage: "/events",
        linkPurpose: "Link the private-event mention to the shared decision framework.",
      },
    ],
    publishingStatus: "planned",
    validationStatus: "pending first-party validation",
  },
  {
    id: "capacity-throughput-lines",
    normalizedQueryTopic: "event service capacity, throughput, and guest lines",
    primaryPage: "/experiences",
    secondarySupportingPage: "/experiences/coffee-bar",
    proposedAnswer:
      "Luxe Coffee Bar serves intimate gatherings through large-scale events, with service plans tailored to guest count, menu, venue requirements and event flow. Larger-format events can be accommodated through a customized service plan. Service capacity varies based on guest count, selected menu, hot-to-iced drink mix, and guest arrival patterns.",
    outstandingEvidence: [
      "Measured drinks served per hour by menu and setup",
      "Approved staffing model",
      "Observed line and arrival-pattern data",
    ],
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/experiences",
        linkPurpose: "Point capacity mentions to the cross-service capacity comparison.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/experiences",
        linkPurpose: "Point dessert-capacity mentions to the cross-service capacity comparison.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "staffing-and-inclusions",
    normalizedQueryTopic: "what staffed coffee and dessert service includes",
    primaryPage: "/experiences",
    secondarySupportingPage: "/experiences/coffee-bar",
    proposedAnswer:
      "Coffee and dessert experiences are staffed services with the inclusions confirmed in the selected proposal. Team size is planned from the menu, guest count, duration, equipment, venue, and expected flow, so Luxe does not publish one universal barista or attendant count.",
    outstandingEvidence: ["Approved staffing ranges or assignment formula, if Luxe chooses to publish them"],
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/experiences",
        linkPurpose: "Keep detailed package mechanics on the service page and link the cross-service staffing context.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/experiences",
        linkPurpose: "Keep dessert mechanics on the service page and link the cross-service staffing context.",
      },
    ],
    publishingStatus: "live",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "menu-and-dietary-fit",
    normalizedQueryTopic: "event menu customization and dietary suitability",
    primaryPage: "/faq",
    secondarySupportingPage: "/experiences/coffee-bar",
    proposedAnswer:
      "Luxe can shape beverage and dessert selections around the event, season, presentation, and confirmed dietary needs. Coffee options include hot and iced service, milk alternatives, signature drinks, and non-coffee selections; Sweet Cart options are selected from the approved dessert framework. Allergies and cross-contact concerns must be reviewed before the menu is finalized.",
    outstandingEvidence: ["Event-specific allergy and cross-contact requirements"],
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/faq",
        linkPurpose: "Link menu detail to the shared dietary-planning answer.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/faq",
        linkPurpose: "Link dessert selections to the shared dietary answer.",
      },
    ],
    publishingStatus: "live",
    validationStatus: "validated",
  },
  {
    id: "branding-and-creative-approval",
    normalizedQueryTopic: "event branding options, approvals, and production timing",
    primaryPage: "/events/brand-activations",
    secondarySupportingPage: "/events/corporate-events",
    proposedAnswer:
      "Branding may extend to approved cups, menus, signage, cart presentation, event language, and selected service details. The final scope depends on artwork, production requirements, event timing, venue rules, and the confirmed experience. Luxe should recommend early planning without publishing an unverified universal production lead time.",
    outstandingEvidence: [
      "Approved creative-approval workflow",
      "Artwork and file requirements",
      "Production lead times by branding surface",
    ],
    internalLinks: [
      {
        fromPage: "/events/corporate-events",
        toDefinitivePage: "/events/brand-activations",
        linkPurpose: "Link general corporate branding to the definitive activation workflow.",
      },
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/brand-activations",
        linkPurpose: "Link branded-cup mentions to the complete branding answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "space-power-water",
    normalizedQueryTopic: "space, electrical, and water requirements for event service",
    primaryPage: "/faq",
    secondarySupportingPage: "/experiences/coffee-bar",
    proposedAnswer:
      "Space, power, and water requirements vary by the selected cart, equipment, menu, staffing, guest flow, rentals, and venue conditions. Clients should not assume that a setup is self-contained or can operate without power or water access. Luxe confirms the exact footprint, circuits, placement, and water arrangement for the proposed service.",
    outstandingEvidence: [
      "Approved footprint by service format",
      "Approved outlet, circuit, and load requirements",
      "Approved potable-water and drainage requirements",
    ],
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/faq",
        linkPurpose: "Link utility mentions to the definitive requirements answer.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/faq",
        linkPurpose: "Link dessert utility mentions to the definitive requirements answer.",
      },
      {
        fromPage: "/experiences/seating-rentals",
        toDefinitivePage: "/faq",
        linkPurpose: "Link layout mentions to the shared requirements answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "pending first-party validation",
  },
  {
    id: "venue-access-and-timing",
    normalizedQueryTopic: "venue access, loading, setup, and teardown planning",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    proposedAnswer:
      "Luxe reviews the venue's access window, parking and loading route, elevators, placement, utilities, weather protection, service schedule, teardown rules, and contact handoff before event day. Setup and takedown times are confirmed for the booking because they change with the experience, branding, rentals, travel distance inside the property, and venue restrictions.",
    outstandingEvidence: [
      "Approved coordination workflow",
      "Format-specific setup and takedown ranges, if publishable",
    ],
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Let prospects review venue inputs before completing an inquiry.",
      },
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/faq",
        linkPurpose: "Link wedding coordination mentions to the shared access answer.",
      },
      {
        fromPage: "/events/corporate-events",
        toDefinitivePage: "/faq",
        linkPurpose: "Link corporate logistics mentions to the shared access answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "outdoor-and-weather",
    normalizedQueryTopic: "outdoor event service requirements and rain planning",
    primaryPage: "/faq",
    secondarySupportingPage: "/events/weddings",
    proposedAnswer:
      "Outdoor service can be planned when the venue and host provide a safe operating plan. Luxe reviews the surface, access, tenting or weather protection, temperature, wind, power or water, equipment placement, and a practical indoor or protected backup. Equipment is not operated in unsafe conditions.",
    outstandingEvidence: [
      "Approved format-specific weather limits",
      "Approved surface and tenting requirements",
      "Approved contingency decision process",
    ],
    internalLinks: [
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/faq",
        linkPurpose: "Link outdoor wedding mentions to the definitive weather answer.",
      },
      {
        fromPage: "/events/private-events",
        toDefinitivePage: "/faq",
        linkPurpose: "Link outdoor private-event mentions to the shared answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "pricing-minimums-and-scope",
    normalizedQueryTopic: "event service pricing factors, minimums, and quote scope",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    proposedAnswer:
      "Pricing depends on the selected experience, guest count, duration, travel, staffing and logistics, rental scope, and approved customization. Luxe prepares a personalized proposal because materially different events should not share one public total. Only confirmed minimums may be stated; other division minimums and fee formulas must not be inferred.",
    outstandingEvidence: [
      "Any additional approved division minimums",
      "Approved fee or overtime policies if Luxe chooses to publish them",
    ],
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Explain quote variables before the prospect submits details.",
      },
      {
        fromPage: "/experiences",
        toDefinitivePage: "/faq",
        linkPurpose: "Link service comparison to the shared pricing explanation.",
      },
    ],
    publishingStatus: "live",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "booking-lead-time-and-availability",
    normalizedQueryTopic: "when to book and how to reserve an event date",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    proposedAnswer:
      "Book as early as possible for weddings, peak spring-to-fall dates, holidays, and work involving branding or complex logistics. Availability depends on the date, division, guest count, staffing, travel, and production scope, so there is no universal lead time. A signed contract and the required 30% non-refundable retainer reserve a confirmed date.",
    outstandingEvidence: ["Approved branding lead times if a specific range will be published"],
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Link reservation preparation to the definitive booking policy.",
      },
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/faq",
        linkPurpose: "Link wedding booking guidance to the shared policy.",
      },
    ],
    publishingStatus: "live",
    validationStatus: "validated",
  },
  {
    id: "travel-and-service-area",
    normalizedQueryTopic: "Toronto, GTA, and Southern Ontario event service area",
    primaryPage: "/faq",
    secondarySupportingPage: "/",
    proposedAnswer:
      "Luxe is available in Toronto and throughout the approved GTA service area. Select larger events elsewhere in Southern Ontario may be available after the venue, scope, date, distance, travel time, staffing, equipment or inventory movement, access, utilities, schedule, setup, takedown, and return plan are reviewed. Location may affect feasibility, minimum review, logistics, and price; any applicable charge is identified in the proposal because no universal distance threshold, delivery boundary, or fee formula is published.",
    outstandingEvidence: [
      "Approved travel thresholds or fee calculations if Luxe later publishes them",
      "Approved distance-based minimum requirements, if any",
      "Approved universal rental-delivery area and policy, if Luxe establishes one",
    ],
    internalLinks: [
      {
        fromPage: "/",
        toDefinitivePage: "/faq",
        linkPurpose: "Keep the Home service-area summary short and link to complete coverage guidance.",
      },
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Link location qualification to the definitive service-area answer.",
      },
    ],
    publishingStatus: "live",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "dessert-quantity-and-flow",
    normalizedQueryTopic: "dessert quantity, preparation, and guest flow planning",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/faq",
    proposedAnswer:
      "Dessert quantities and service flow are planned from guest count, selected desserts, service duration, staffing, preparation requirements, and when guests are expected to arrive. Sweet Cart can typically support up to 400 guests with a confirmed plan, but Luxe should not publish a universal portion, preparation-rate, or wait-time formula.",
    outstandingEvidence: [
      "Approved portion-planning method",
      "Measured preparation throughput",
      "Approved staffing ranges",
    ],
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Keep the FAQ summary short and link to the complete dessert-planning answer.",
      },
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link wedding dessert-flow mentions to the service answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "rental-inventory-layout",
    normalizedQueryTopic: "available event rentals, quantities, and layout planning",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/events",
    proposedAnswer:
      "Luxe offers 300 white resin chairs, 25 six-foot rectangular tables, 10 cocktail tables, black and white cocktail-table linens, linens for the six-foot tables, three 20-foot by 20-foot tents with two vinyl tops and one clear top, one 15-foot by 15-foot tent, two 10-foot by 10-foot tents, an 18-foot by 18-foot dance floor, tent walls, and tent lighting. Date-specific availability and suitability are confirmed for the request.",
    outstandingEvidence: [
      "Ownership and process for keeping availability current",
      "Approved substitution and inventory-change policy",
    ],
    internalLinks: [
      {
        fromPage: "/events",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link event-layout mentions to the definitive rental scope.",
      },
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link inventory questions to the rental experience page.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "rental-delivery-setup-responsibility",
    normalizedQueryTopic: "rental delivery, setup, teardown, and pickup responsibility",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/faq",
    proposedAnswer:
      "Delivery, setup, takedown, pickup, timing, and related fees are confirmed for the event rather than assumed to be included universally. The final responsibility depends on the selected inventory, quantities, venue access, layout, event schedule, distance, and agreed rental scope.",
    outstandingEvidence: [
      "Approved responsibility rules by rental category",
      "Approved delivery, setup, and pickup fee policy",
      "Approved timing ranges",
    ],
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link the shared logistics summary to the definitive rental answer.",
      },
      {
        fromPage: "/contact",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Let prospects review rental responsibilities before inquiry.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "rental-risk-and-changes",
    normalizedQueryTopic: "rental damage, shortages, substitutions, and booking changes",
    primaryPage: "/faq",
    secondarySupportingPage: "/experiences/seating-rentals",
    proposedAnswer:
      "Damage, loss, shortages, substitutions, quantity changes, cancellation, and change deadlines must follow the approved proposal and contract for the booking. Luxe should not publish a general policy until those terms are confirmed and reconciled across its rental documents.",
    outstandingEvidence: [
      "Approved damage and loss terms",
      "Approved shortage and substitution process",
      "Approved cancellation and quantity-change deadlines",
    ],
    internalLinks: [
      {
        fromPage: "/experiences/seating-rentals",
        toDefinitivePage: "/faq",
        linkPurpose: "Link policy mentions to one future approved public answer.",
      },
    ],
    publishingStatus: "blocked",
    validationStatus: "pending first-party validation",
  },
  {
    id: "corporate-scale-and-repetition",
    normalizedQueryTopic: "simultaneous, multi-day, and recurring corporate event service",
    primaryPage: "/events/corporate-events",
    secondarySupportingPage: "/events/brand-activations",
    proposedAnswer:
      "Multiple Coffee Bar service setups are available for select events. For larger events, conferences and multi-space venues, additional Coffee Bar setups can be incorporated based on event scope, staffing, venue requirements and availability.",
    outstandingEvidence: [
      "Owner reconciliation of multi-day and recurring capability",
      "Approved staffing, reset, storage, replenishment, and travel parameters",
      "Permissioned examples of repeat or multi-day delivery",
    ],
    internalLinks: [
      {
        fromPage: "/events/brand-activations",
        toDefinitivePage: "/events/corporate-events",
        linkPurpose: "Link scale mentions to the definitive corporate capability answer.",
      },
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/corporate-events",
        linkPurpose: "Link simultaneous-setup mentions to the corporate planning context.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "procurement-insurance-and-compliance",
    normalizedQueryTopic: "corporate vendor insurance, procurement, and venue compliance",
    primaryPage: "/events/corporate-events",
    secondarySupportingPage: "/faq",
    proposedAnswer:
      "Luxe carries $5 million in liability insurance and can coordinate with corporate, procurement, agency, venue, and institutional contacts. The exact certificate, endorsement, permit, onboarding, food-service, security, and documentation requirements must be supplied for the event so availability and responsibility can be confirmed.",
    outstandingEvidence: [
      "Approved certificate and endorsement process",
      "Approved onboarding-document inventory",
      "Venue- or institution-specific compliance requirements",
    ],
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/events/corporate-events",
        linkPurpose: "Link the insurance fact to the complete corporate approval context.",
      },
      {
        fromPage: "/events/brand-activations",
        toDefinitivePage: "/events/corporate-events",
        linkPurpose: "Link agency compliance mentions to the definitive procurement answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "coordination-and-role-boundaries",
    normalizedQueryTopic: "who coordinates event service, venue, and vendor responsibilities",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    proposedAnswer:
      "Luxe can work with the client, planner, venue, agency, office team, procurement contact, and other event partners. The booking should identify who owns access, utilities, weather protection, approvals, schedule changes, placement, rentals, and the event-day contact. A universal responsibility matrix should not be published until Luxe approves its coordination process.",
    outstandingEvidence: [
      "Approved venue-coordination workflow",
      "Approved responsibility matrix",
      "Approved communication and escalation ownership",
    ],
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Link inquiry preparation to the shared coordination answer.",
      },
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/faq",
        linkPurpose: "Link planner coordination mentions to the definitive answer.",
      },
      {
        fromPage: "/events/corporate-events",
        toDefinitivePage: "/faq",
        linkPurpose: "Link corporate stakeholder mentions to the definitive answer.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  },
  {
    id: "comparable-proof",
    normalizedQueryTopic: "examples and proof from similar events or venues",
    primaryPage: "/gallery",
    secondarySupportingPage: "/events/corporate-events",
    proposedAnswer:
      "Use approved photography and facts to show the service, presentation, guest context, and event type most relevant to the prospect. Luxe may identify only organizations, quotations, outcomes, venues, and campaign details that have permission for publication. A visual placeholder or unsupported testimonial is not comparable proof.",
    outstandingEvidence: [
      "Permissioned event photography with accurate context",
      "Approved case facts and outcomes",
      "Approved quotations, organization names, and venue references",
    ],
    internalLinks: [
      {
        fromPage: "/events/corporate-events",
        toDefinitivePage: "/gallery",
        linkPurpose: "Link approved corporate proof mentions to the definitive visual source.",
      },
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/gallery",
        linkPurpose: "Link wedding proof mentions to permissioned gallery evidence.",
      },
      {
        fromPage: "/events/brand-activations",
        toDefinitivePage: "/gallery",
        linkPurpose: "Link activation proof mentions to permissioned campaign media.",
      },
    ],
    publishingStatus: "live with dependency limits",
    validationStatus: "pending permission validation",
  },
];

const canonicalQuestionMap: AeoQuestionMapRecord[] = questionMapPlans.map(
  (plan) => {
    const cluster = getQuestionCluster(plan.id);
    const classification = getQuestionClassification(plan.id);

    if (!cluster || !classification) {
      throw new Error(`Missing AEO research record for ${plan.id}`);
    }

    return {
      id: plan.id,
      question: cluster.canonicalQuestion,
      normalizedQueryTopic: plan.normalizedQueryTopic,
      primaryPage: plan.primaryPage,
      secondarySupportingPage: plan.secondarySupportingPage,
      icp: classification.icps,
      funnelStage: classification.funnelStages,
      searchIntent: classification.searchIntents,
      proposedAnswer: plan.proposedAnswer,
      requiredEvidence: {
        available: classification.firstPartyEvidence.available,
        outstanding: plan.outstandingEvidence,
      },
      internalLinks: plan.internalLinks,
      contentFormat: classification.recommendedFormat,
      publishingStatus: plan.publishingStatus,
      validationStatus: plan.validationStatus,
      existingAnswerStatus: classification.answerStatus,
    };
  },
);

const serviceDiscoveryQuestionMap: AeoQuestionMapRecord[] = [
  {
    id: "service-discovery-mobile-coffee-bar",
    question: "What is a mobile coffee bar?",
    normalizedQueryTopic: "mobile coffee bar definition",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/experiences",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    funnelStage: ["Discovery", "Understanding"],
    searchIntent: ["Informational"],
    proposedAnswer:
      "A mobile coffee bar brings café equipment, professional baristas, and a made-to-order beverage menu into the event venue.",
    requiredEvidence: {
      available: [
        "Professional barista service",
        "Premium espresso equipment",
        "Approved beverage-menu framework",
      ],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link the Coffee Bar summary to the complete definition.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live",
    validationStatus: "validated",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-mobile-espresso-catering",
    question: "How does mobile espresso catering work?",
    normalizedQueryTopic: "mobile espresso catering process",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Planning"],
    searchIntent: ["Informational", "Logistical"],
    proposedAnswer:
      "The event brief establishes the coffee format, menu, guest count, operating window, staffing, equipment, setup, and venue requirements. Baristas then prepare drinks on-site during the agreed service period.",
    requiredEvidence: {
      available: [
        "Approved inclusions",
        "Staffed on-site service model",
        "Event-specific planning process",
      ],
      outstanding: [
        "Exact staffing, utility, and timing values remain booking-specific.",
      ],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link operational coffee questions to the complete service explanation.",
      },
    ],
    contentFormat: "process summary",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-dessert-cart-catering",
    question: "What is dessert-cart catering?",
    normalizedQueryTopic: "dessert cart catering definition",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/experiences",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    funnelStage: ["Discovery", "Understanding"],
    searchIntent: ["Informational", "Inspirational"],
    proposedAnswer:
      "Dessert-cart catering is a staffed, mobile dessert service in which selected sweets are prepared and finished for guests at the event.",
    requiredEvidence: {
      available: [
        "Professional attendants",
        "Approved dessert formats",
        "On-site preparation",
      ],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link the Sweet Cart summary to the complete definition.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live",
    validationStatus: "validated",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-dessert-cart-vs-table",
    question: "What is the difference between a dessert cart and a dessert table?",
    normalizedQueryTopic: "dessert cart versus dessert table",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/faq",
    icp: ["wedding-clients", "corporate-clients", "private-event-clients"],
    funnelStage: ["Understanding", "Comparison"],
    searchIntent: ["Informational", "Comparison"],
    proposedAnswer:
      "A dessert table usually presents pre-arranged sweets for guests to select themselves. Luxe Sweet Cart is an attendant-led service where the selected desserts are prepared and finished on-site, making preparation and guest interaction part of the event.",
    requiredEvidence: {
      available: [
        "Attendant-led service",
        "On-site preparation",
        "Guest-facing finishing",
      ],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link dessert-format comparisons to the definitive explanation.",
      },
    ],
    contentFormat: "comparison",
    publishingStatus: "live",
    validationStatus: "validated",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-event-rental-inclusions",
    question: "What is included with an event-rental service?",
    normalizedQueryTopic: "event rental service inclusions",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/experiences",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Planning", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Logistical"],
    proposedAnswer:
      "Luxe begins with its confirmed rental categories. The proposal then identifies the selected inventory and any agreed delivery, placement, setup, takedown, or pickup responsibilities; these services are not assumed to be universally included.",
    requiredEvidence: {
      available: [
        "Six approved rental categories",
        "Proposal-led scope confirmation",
      ],
      outstanding: [
        "Universal delivery, setup, takedown, and pickup policies remain unapproved.",
      ],
    },
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link the rental summary to the complete inclusion boundary.",
      },
    ],
    contentFormat: "requirements summary",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-branded-coffee-activation",
    question: "What is a branded coffee-cart activation?",
    normalizedQueryTopic: "branded coffee cart activation definition",
    primaryPage: "/events/brand-activations",
    secondarySupportingPage: "/experiences/coffee-bar",
    icp: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    funnelStage: ["Discovery", "Understanding", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Inspirational"],
    proposedAnswer:
      "A branded coffee-cart activation is a staffed mobile beverage experience shaped around a campaign or organization through the menu, cups, signage, cart presentation, and guest interaction.",
    requiredEvidence: {
      available: [
        "Approved branding surfaces",
        "Staffed mobile beverage service",
        "Agency and campaign applications",
      ],
      outstanding: [
        "Final creative treatment remains subject to assets, approvals, production, and event scope.",
      ],
    },
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/brand-activations",
        linkPurpose: "Link branding mentions to the full activation definition.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-one-provider",
    question: "Can coffee, dessert, and rentals be coordinated through one provider?",
    normalizedQueryTopic: "coordinated coffee dessert and rental provider",
    primaryPage: "/experiences",
    secondarySupportingPage: "/experiences/coffee-bar",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Comparison", "Vendor evaluation"],
    searchIntent: ["Commercial investigation", "Comparison", "Transactional"],
    proposedAnswer:
      "Yes. Luxe Event Co. is the parent company for Coffee Bar, Sweet Cart, and Seating Rentals, so the three services can be planned through one inquiry and proposal journey while each keeps its specialist scope.",
    requiredEvidence: {
      available: [
        "Confirmed parent-and-division model",
        "Independent and combined booking model",
        "One inquiry and proposal journey",
      ],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/experiences",
        linkPurpose: "Link combination mentions to the definitive parent-company answer.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/experiences",
        linkPurpose: "Link combination mentions to the definitive parent-company answer.",
      },
      {
        fromPage: "/experiences/seating-rentals",
        toDefinitivePage: "/experiences",
        linkPurpose: "Link combination mentions to the definitive parent-company answer.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live",
    validationStatus: "validated",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-coffee-event-fit",
    question: "Which events are suitable for mobile coffee catering?",
    normalizedQueryTopic: "events suitable for mobile coffee catering",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/events",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Discovery", "Understanding"],
    searchIntent: ["Informational", "Inspirational"],
    proposedAnswer:
      "Mobile coffee catering can suit weddings, office and corporate events, conferences, brand activations, showers, birthdays, and private celebrations when a staffed beverage experience supports the schedule and guest flow.",
    requiredEvidence: {
      available: [
        "Approved event applications",
        "Coffee event-role guidance",
      ],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/events",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link coffee event-fit mentions to the full service page.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live",
    validationStatus: "validated",
    existingAnswerStatus: "answered",
  },
  {
    id: "service-discovery-onsite-dessert-preparation",
    question: "How does on-site dessert preparation work?",
    normalizedQueryTopic: "on-site dessert preparation process",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Planning"],
    searchIntent: ["Informational", "Logistical"],
    proposedAnswer:
      "Luxe prepares the selected dessert at the cart, finishes each serving with the confirmed sauces and toppings, and serves it during the agreed window. Equipment, staffing, quantities, placement, and guest flow are confirmed for the event.",
    requiredEvidence: {
      available: [
        "Approved on-site preparation model",
        "Approved sauces and topping framework",
      ],
      outstanding: [
        "Preparation rate, staffing, and exact requirements remain event-specific.",
      ],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link preparation questions to the complete Sweet Cart explanation.",
      },
    ],
    contentFormat: "process summary",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
];

type EventPlanningQuestionRecord = Omit<
  AeoQuestionMapRecord,
  "publishingStatus" | "validationStatus" | "existingAnswerStatus"
> & {
  publishingStatus?: PublishingStatus;
  validationStatus?: ValidationStatus;
};

function createEventPlanningQuestionRecord(
  record: EventPlanningQuestionRecord,
): AeoQuestionMapRecord {
  return {
    ...record,
    publishingStatus:
      record.publishingStatus ?? "live with dependency limits",
    validationStatus:
      record.validationStatus ?? "validated with dependency limits",
    existingAnswerStatus: "answered",
  };
}

const eventPlanningQuestionMap: AeoQuestionMapRecord[] = [
  createEventPlanningQuestionRecord({
    id: "event-planning-wedding-coffee-timing",
    question: "When should coffee be served at a wedding?",
    normalizedQueryTopic: "wedding coffee service timing",
    primaryPage: "/events/weddings",
    secondarySupportingPage: "/experiences/coffee-bar",
    icp: ["wedding-clients", "industry-partners"],
    funnelStage: ["Understanding", "Planning"],
    searchIntent: ["Informational", "Logistical"],
    proposedAnswer:
      "Coffee can be served before the ceremony, during guest arrival or cocktail hour, with dessert, during the reception, or as a late-night moment. The best window depends on guest demand, the food and bar plan, venue access, and whether service can operate without interrupting another transition.",
    requiredEvidence: {
      available: ["Approved wedding-day applications", "Event-specific timing model"],
      outstanding: ["Universal service and setup durations remain unapproved."],
    },
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/weddings",
        linkPurpose: "Link general coffee timing to the wedding-specific answer.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-cocktail-hour-coffee",
    question: "Is a coffee bar appropriate for cocktail hour?",
    normalizedQueryTopic: "coffee bar during wedding cocktail hour",
    primaryPage: "/events/weddings",
    secondarySupportingPage: "/experiences/coffee-bar",
    icp: ["wedding-clients", "industry-partners"],
    funnelStage: ["Understanding", "Planning", "Comparison"],
    searchIntent: ["Informational", "Comparison", "Logistical"],
    proposedAnswer:
      "Yes, when it supports the transition between ceremony and reception. Placement, menu breadth, service duration, guest count, and coordination with the venue, planner, caterer, and beverage program determine whether cocktail hour is the right window.",
    requiredEvidence: {
      available: ["Approved cocktail-hour application", "Planner and venue coordination"],
      outstanding: ["The final service window remains event-specific."],
    },
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/weddings",
        linkPurpose: "Link cocktail-hour mentions to the wedding planning answer.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-bridal-shower-desserts",
    question: "Which desserts work well for bridal showers?",
    normalizedQueryTopic: "desserts for bridal shower catering",
    primaryPage: "/events/bridal-showers",
    secondarySupportingPage: "/experiences/sweet-cart",
    icp: ["wedding-clients", "private-event-clients", "industry-partners"],
    funnelStage: ["Discovery", "Understanding", "Planning"],
    searchIntent: ["Informational", "Inspirational", "Comparison"],
    proposedAnswer:
      "Mini Dutch pancakes, Belgian waffles on a stick, and mini donuts all work well when the host wants a freshly prepared, guest-facing dessert moment. The best choice depends on the schedule, guest count, presentation, surrounding menu, and confirmed service flow.",
    requiredEvidence: {
      available: ["Approved dessert formats", "Bridal-shower event application"],
      outstanding: ["Quantities and service format remain proposal-specific."],
    },
    internalLinks: [
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/events/bridal-showers",
        linkPurpose: "Link dessert choices to their bridal-shower planning context.",
      },
    ],
    contentFormat: "comparison",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-corporate-coffee",
    question: "How should coffee catering be planned for a corporate event?",
    normalizedQueryTopic: "corporate coffee catering planning",
    primaryPage: "/events/corporate-events",
    secondarySupportingPage: "/experiences/coffee-bar",
    icp: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    funnelStage: ["Understanding", "Planning", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Logistical"],
    proposedAnswer:
      "Begin with the event purpose, schedule, location, attendance, and the role coffee should play. Then confirm the menu, service window, guest-arrival pattern, placement, access, utilities, staffing, branding, setup, teardown, and stakeholder handoffs.",
    requiredEvidence: {
      available: ["Approved corporate planning inputs", "Coffee service framework"],
      outstanding: ["Exact staffing, utilities, and service timing remain event-specific."],
    },
    internalLinks: [
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events/corporate-events",
        linkPurpose: "Link general service mechanics to the corporate planning answer.",
      },
    ],
    contentFormat: "planning checklist",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-employee-appreciation",
    question: "What works well for employee appreciation?",
    normalizedQueryTopic: "employee appreciation event services",
    primaryPage: "/events/corporate-events",
    secondarySupportingPage: "/experiences",
    icp: ["corporate-clients", "industry-partners"],
    funnelStage: ["Discovery", "Understanding", "Planning"],
    searchIntent: ["Informational", "Inspirational", "Commercial investigation"],
    proposedAnswer:
      "A coffee or matcha bar works well for arrivals, breaks, or an office pop-up, while live dessert can create a more interactive scheduled moment. The right choice follows the workday, team size, available space, and time people can step away.",
    requiredEvidence: {
      available: ["Approved employee-appreciation application", "Coffee and dessert roles"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/events/corporate-events",
        linkPurpose: "Link service comparison to the employee-appreciation context.",
      },
    ],
    contentFormat: "decision guide",
    publishingStatus: "live",
    validationStatus: "validated",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-baby-shower-services",
    question: "What services work well for baby showers?",
    normalizedQueryTopic: "baby shower coffee dessert and rental services",
    primaryPage: "/events/baby-showers",
    secondarySupportingPage: "/events",
    icp: ["private-event-clients", "industry-partners"],
    funnelStage: ["Discovery", "Understanding", "Planning"],
    searchIntent: ["Informational", "Inspirational", "Comparison"],
    proposedAnswer:
      "Coffee and matcha can support arrivals or conversation, live dessert creates an interactive sweet moment, and selected rentals shape the setting. The right single service or combination depends on the venue, guest count, conditions, schedule, and desired atmosphere.",
    requiredEvidence: {
      available: ["Approved baby-shower applications", "Independent and combined booking model"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/events",
        toDefinitivePage: "/events/baby-showers",
        linkPurpose: "Link the event-directory summary to the complete baby-shower answer.",
      },
    ],
    contentFormat: "decision guide",
    publishingStatus: "live",
    validationStatus: "validated",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-outdoor-rentals",
    question: "Which event rentals are required for outdoor events?",
    normalizedQueryTopic: "outdoor event rental requirements",
    primaryPage: "/events/private-events",
    secondarySupportingPage: "/experiences/seating-rentals",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Planning", "Vendor evaluation"],
    searchIntent: ["Informational", "Logistical", "Troubleshooting"],
    proposedAnswer:
      "There is no universal outdoor-rental list. The site and event may require tents, chairs, tables, cocktail tables, linens, or lighting, but ground conditions, guest count, layout, accessibility, installation, utilities, venue rules, weather protection, and backup planning must be reviewed first.",
    requiredEvidence: {
      available: ["Approved rental categories", "Event-specific outdoor qualification"],
      outstanding: [
        "Exact inventory and outdoor operating limits remain confirmation-dependent.",
      ],
    },
    internalLinks: [
      {
        fromPage: "/experiences/seating-rentals",
        toDefinitivePage: "/events/private-events",
        linkPurpose: "Link rental categories to the definitive outdoor planning context.",
      },
    ],
    contentFormat: "requirements summary",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-station-flow",
    question: "How should guest flow around a coffee or dessert station be managed?",
    normalizedQueryTopic: "coffee and dessert station guest flow",
    primaryPage: "/events",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Planning", "Vendor evaluation"],
    searchIntent: ["Informational", "Logistical", "Troubleshooting"],
    proposedAnswer:
      "Leave a clear approach, ordering point, waiting area, and exit without blocking doors, aisles, dining, or programmed activity. Placement should be reviewed against expected arrival patterns, menu, service duration, staffing, utilities, and the venue floor plan.",
    requiredEvidence: {
      available: ["Approved event-flow factors", "Event-specific placement review"],
      outstanding: ["No universal footprint or queue measurement is approved."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/events",
        linkPurpose: "Link logistics guidance to the complete cross-event flow answer.",
      },
      {
        fromPage: "/experiences/coffee-bar",
        toDefinitivePage: "/events",
        linkPurpose: "Link coffee placement mentions to the cross-event flow answer.",
      },
      {
        fromPage: "/experiences/sweet-cart",
        toDefinitivePage: "/events",
        linkPurpose: "Link dessert placement mentions to the cross-event flow answer.",
      },
    ],
    contentFormat: "planning checklist",
  }),
  createEventPlanningQuestionRecord({
    id: "event-planning-complete-setup",
    question: "Which Luxe services can be coordinated for a core celebration setup?",
    normalizedQueryTopic: "combined coffee dessert and rental event setup",
    primaryPage: "/events",
    secondarySupportingPage: "/experiences",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Discovery", "Understanding", "Comparison", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Comparison"],
    proposedAnswer:
      "For weddings and private celebrations, Coffee Bar can shape hospitality, Sweet Cart can create a live guest moment, and the focused Seating Rentals inventory can supply core chairs, tables, cocktail tables, tents, linens, tent walls, lighting, and a dance floor. One, two, or all three divisions may be coordinated through one Luxe inquiry when the confirmed inventory and event scope fit.",
    requiredEvidence: {
      available: ["Confirmed division roles", "Independent and combined booking model"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/events",
        linkPurpose: "Link service selection to the complete event-combination answer.",
      },
    ],
    contentFormat: "decision guide",
    publishingStatus: "live",
    validationStatus: "validated",
  }),
];

type ComparisonQuestionRecord = Omit<
  AeoQuestionMapRecord,
  "publishingStatus" | "validationStatus" | "existingAnswerStatus"
> & {
  publishingStatus?: PublishingStatus;
  validationStatus?: ValidationStatus;
};

function createComparisonQuestionRecord(
  record: ComparisonQuestionRecord,
): AeoQuestionMapRecord {
  return {
    ...record,
    publishingStatus: record.publishingStatus ?? "live",
    validationStatus: record.validationStatus ?? "validated",
    existingAnswerStatus: "answered",
  };
}

const comparisonQuestionMap: AeoQuestionMapRecord[] = [
  createComparisonQuestionRecord({
    id: "comparison-cafe-cart-full-service-bar",
    question: "Café cart or full-service coffee bar: which is right for the event?",
    normalizedQueryTopic: "cafe cart versus full-service coffee bar",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/experiences",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Comparison", "Vendor evaluation"],
    searchIntent: ["Commercial investigation", "Comparison", "Logistical"],
    proposedAnswer:
      "The Café Cart suits an intimate, focused café point, while the Signature Coffee Bar suits a larger footprint and more prominent hospitality role. Both are complete staffed experiences; guest count, duration, venue, menu, space, and desired visibility determine fit.",
    requiredEvidence: {
      available: ["Approved coffee formats", "Approved format positioning"],
      outstanding: ["Exact footprint and staffing remain event-specific."],
    },
    internalLinks: [
      {
        fromPage: "/experiences",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link format selection to the complete Coffee Bar comparison.",
      },
    ],
    contentFormat: "comparison",
  }),
  createComparisonQuestionRecord({
    id: "comparison-coffee-cart-traditional-catering",
    question: "How does a coffee cart compare with traditional coffee catering?",
    normalizedQueryTopic: "coffee cart versus traditional coffee catering",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/events/corporate-events",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Comparison", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Comparison"],
    proposedAnswer:
      "Traditional coffee catering can prioritize simple batch or self-serve access. A staffed coffee cart prepares selected drinks to order and makes service part of the guest experience. Menu, service style, arrivals, timing, space, and budget should guide the choice.",
    requiredEvidence: {
      available: ["Approved staffed service model", "Approved made-to-order menu"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/events/corporate-events",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link corporate coffee selection to the neutral service comparison.",
      },
    ],
    contentFormat: "comparison",
  }),
  createComparisonQuestionRecord({
    id: "comparison-mobile-bar-venue-service",
    question: "How does a mobile coffee bar compare with venue coffee service?",
    normalizedQueryTopic: "mobile coffee bar versus venue coffee service",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/events/weddings",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Comparison", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Commercial investigation", "Comparison", "Logistical"],
    proposedAnswer:
      "Venue service can be practical when it is already integrated with catering and banquet operations. A mobile bar is useful for specialty drinks, dedicated baristas, a distinct service point, or branded presentation. Compare inclusions, outside-vendor rules, timing, placement, utilities, and flow.",
    requiredEvidence: {
      available: ["Approved mobile coffee service model"],
      outstanding: ["Venue-specific catering inclusions and outside-vendor rules."],
    },
    internalLinks: [
      {
        fromPage: "/events/weddings",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link wedding beverage planning to the complete provider comparison.",
      },
    ],
    contentFormat: "comparison",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  }),
  createComparisonQuestionRecord({
    id: "comparison-dessert-cart-table",
    question: "What is the difference between a dessert cart and a dessert table?",
    normalizedQueryTopic: "dessert cart versus dessert table",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/events/bridal-showers",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Comparison"],
    searchIntent: ["Informational", "Comparison", "Inspirational"],
    proposedAnswer:
      "A dessert table can provide a broad pre-arranged selection with flexible self-service. A hosted cart suits events where live preparation, attendant-led service, and interaction should be part of the experience. Selection, timing, staffing, space, presentation, and flow determine fit.",
    requiredEvidence: {
      available: ["Approved hosted Sweet Cart model", "Approved on-site preparation"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/events/bridal-showers",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link shower dessert selection to the complete format comparison.",
      },
    ],
    contentFormat: "comparison",
  }),
  createComparisonQuestionRecord({
    id: "comparison-hosted-self-serve-dessert",
    question: "Hosted dessert station or self-serve station: which is appropriate?",
    normalizedQueryTopic: "hosted versus self-serve dessert station",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/events",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Comparison", "Planning"],
    searchIntent: ["Informational", "Comparison", "Logistical"],
    proposedAnswer:
      "Self-service can suit quick, flexible access to pre-arranged desserts. Hosted service suits live preparation, controlled finishing, and guest interaction. The desired selection, service window, staffing, space, and guest-arrival pattern should guide the choice.",
    requiredEvidence: {
      available: ["Approved attendant-led service", "Approved guest-facing finishing"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/events",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link event-format planning to the complete service-model comparison.",
      },
    ],
    contentFormat: "comparison",
  }),
  createComparisonQuestionRecord({
    id: "comparison-dessert-formats",
    question: "Mini pancakes, waffles, or mini donuts: which fits the event?",
    normalizedQueryTopic: "mini pancakes versus waffles versus mini donuts",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/events/bridal-showers",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Comparison", "Planning"],
    searchIntent: ["Informational", "Comparison", "Inspirational"],
    proposedAnswer:
      "Mini pancakes suit a plated or bowl-style topping moment, waffles on a stick support handheld mingling, and mini donuts provide a compact familiar format. The wider menu, eating style, timing, presentation, and guest flow determine fit.",
    requiredEvidence: {
      available: ["Three approved dessert formats", "Approved preparation model"],
      outstanding: ["Quantities and preparation throughput remain event-specific."],
    },
    internalLinks: [
      {
        fromPage: "/events/bridal-showers",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link dessert-choice guidance to the complete format comparison.",
      },
    ],
    contentFormat: "comparison",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  }),
  createComparisonQuestionRecord({
    id: "comparison-individual-coordinated-provider",
    question: "Should an event use individual vendors or one coordinated provider?",
    normalizedQueryTopic: "individual vendors versus coordinated event provider",
    primaryPage: "/experiences",
    secondarySupportingPage: "/events",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Comparison", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Commercial investigation", "Comparison", "Logistical"],
    proposedAnswer:
      "Separate specialists can suit clients with an established coordination plan who want to select every category independently. One provider can help when timing, placement, presentation, access, and responsibilities overlap. Required services, handoff ownership, and operational overlap determine the better model.",
    requiredEvidence: {
      available: ["Confirmed parent-and-division model", "Independent and combined bookings"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/events",
        toDefinitivePage: "/experiences",
        linkPurpose: "Link combination planning to the neutral coordination comparison.",
      },
    ],
    contentFormat: "decision guide",
  }),
  createComparisonQuestionRecord({
    id: "comparison-rental-delivery-setup",
    question: "What is the difference between rental delivery and delivery with setup?",
    normalizedQueryTopic: "rental delivery versus delivery with setup",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Comparison", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Informational", "Comparison", "Logistical"],
    proposedAnswer:
      "No universal rental delivery or setup model is approved. The proposal states whether delivery, placement, or installation is available and identifies the agreed inventory, responsibilities, labour, access, timing, and fees.",
    requiredEvidence: {
      available: ["Proposal-led rental scope"],
      outstanding: ["Approved universal delivery and setup policy."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link shared logistics questions to the complete rental comparison.",
      },
    ],
    contentFormat: "requirements summary",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  }),
  createComparisonQuestionRecord({
    id: "comparison-standard-branded-corporate",
    question:
      "How does standard corporate catering compare with branded experiential service?",
    normalizedQueryTopic: "standard corporate catering versus branded experiential service",
    primaryPage: "/events/brand-activations",
    secondarySupportingPage: "/events/corporate-events",
    icp: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    funnelStage: ["Understanding", "Comparison", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Comparison"],
    proposedAnswer:
      "Standard catering suits dependable provision with minimal creative production. Experiential service suits briefs where the menu, vessels, signage, service point, and interaction should express a campaign. Objective, audience, desired action, brand requirements, venue, approvals, production, and budget determine fit.",
    requiredEvidence: {
      available: ["Approved branding surfaces", "Approved activation planning inputs"],
      outstanding: ["Brief-specific creative and production feasibility."],
    },
    internalLinks: [
      {
        fromPage: "/events/corporate-events",
        toDefinitivePage: "/events/brand-activations",
        linkPurpose: "Link corporate service selection to the complete activation comparison.",
      },
    ],
    contentFormat: "comparison",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
  }),
];

type PricingQuestionRecord = Omit<
  AeoQuestionMapRecord,
  "publishingStatus" | "validationStatus" | "existingAnswerStatus"
> & {
  publishingStatus?: PublishingStatus;
  validationStatus?: ValidationStatus;
};

function createPricingQuestionRecord(
  record: PricingQuestionRecord,
): AeoQuestionMapRecord {
  return {
    ...record,
    publishingStatus:
      record.publishingStatus ?? "live with dependency limits",
    validationStatus:
      record.validationStatus ?? "validated with dependency limits",
    existingAnswerStatus: "answered",
  };
}

const pricingQuestionMap: AeoQuestionMapRecord[] = [
  createPricingQuestionRecord({
    id: "pricing-coffee-cost-method",
    question: "How much does mobile coffee catering cost, and how is it priced?",
    normalizedQueryTopic: "mobile coffee catering cost and pricing factors",
    primaryPage: "/experiences/coffee-bar",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Vendor evaluation"],
    searchIntent: ["Commercial investigation", "Transactional", "Local"],
    proposedAnswer:
      "No fixed total is published. Coffee pricing follows format, guest count, duration, location and travel, staffing, menu, equipment, setup, conditions, branding, multi-day needs, and station count. Guest count and duration both matter but neither sets the quote alone.",
    requiredEvidence: {
      available: ["Approved coffee formats", "Approved pricing variables"],
      outstanding: ["Approved public rates or starting prices."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/coffee-bar",
        linkPurpose: "Link shared pricing guidance to the Coffee Bar cost answer.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createPricingQuestionRecord({
    id: "pricing-guest-count-duration",
    question: "Is pricing based on guest count or service duration?",
    normalizedQueryTopic: "guest count versus service duration pricing",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Booking preparation"],
    searchIntent: ["Informational", "Commercial investigation", "Comparison"],
    proposedAnswer:
      "Both affect the quote. Guest count changes quantities, equipment, staffing, and minimums; duration changes operating time, coverage, replenishment, and scheduling. Menu, travel, access, branding, rentals, setup, and station count may also apply.",
    requiredEvidence: {
      available: ["Approved pricing variables"],
      outstanding: ["Approved calculation weights or formulas."],
    },
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Explain how the two inquiry inputs influence the quote.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createPricingQuestionRecord({
    id: "pricing-dessert-cost-factors",
    question: "How much does a dessert cart cost, and what affects the price?",
    normalizedQueryTopic: "dessert cart cost and pricing factors",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Vendor evaluation"],
    searchIntent: ["Commercial investigation", "Transactional", "Local"],
    proposedAnswer:
      "No fixed total is published. Dessert pricing follows guest count, dessert, cart collection, duration, staffing, toppings and enhancements, equipment, setup, venue access, conditions, travel, branding, multi-day needs, and station count.",
    requiredEvidence: {
      available: ["Approved dessert formats", "Approved pricing variables"],
      outstanding: ["Approved public rates or starting prices."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link shared pricing guidance to the Sweet Cart cost answer.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createPricingQuestionRecord({
    id: "pricing-rental-items",
    question: "How are chairs and tables priced?",
    normalizedQueryTopic: "chair and table rental pricing factors",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Commercial investigation", "Transactional", "Local"],
    proposedAnswer:
      "Pricing follows the confirmed item, quantity, date, location, rental period, availability, delivery access, setup, teardown, pickup, labour, and outdoor or installation conditions. A current inventory and logistics policy is required before publishing per-item rates.",
    requiredEvidence: {
      available: ["Approved item-level rental inventory and quantities", "Proposal-led scope"],
      outstanding: ["Per-item rates and approved logistics policy."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link general cost questions to the rental pricing answer.",
      },
    ],
    contentFormat: "requirements summary",
  }),
  createPricingQuestionRecord({
    id: "pricing-delivery-setup",
    question: "Are delivery and setup included?",
    normalizedQueryTopic: "delivery and setup price inclusion",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Commercial investigation", "Transactional", "Logistical"],
    proposedAnswer:
      "Coffee Bar and Sweet Cart include setup and takedown. Rental delivery, placement, setup, teardown, pickup, labour, access, and fees are event-specific and must be stated in the proposal.",
    requiredEvidence: {
      available: ["Approved coffee and dessert inclusions", "Proposal-led rental scope"],
      outstanding: ["Approved universal rental logistics policy."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link the cross-service summary to rental-specific responsibilities.",
      },
    ],
    contentFormat: "requirements summary",
  }),
  createPricingQuestionRecord({
    id: "pricing-travel-fees",
    question: "Do travel fees apply?",
    normalizedQueryTopic: "event service travel fees",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    icp: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Vendor evaluation"],
    searchIntent: ["Commercial investigation", "Transactional", "Local"],
    proposedAnswer:
      "Travel fees may apply outside Luxe's standard service area. The proposal identifies any charge after the venue, services, timing, and required team movement are confirmed.",
    requiredEvidence: {
      available: ["Approved travel-fee applicability"],
      outstanding: ["Approved distance thresholds and fee calculations."],
    },
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Link location preparation to the complete travel-fee answer.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createPricingQuestionRecord({
    id: "pricing-branding",
    question: "Does branding increase the price?",
    normalizedQueryTopic: "custom event branding price effect",
    primaryPage: "/events/brand-activations",
    secondarySupportingPage: "/faq",
    icp: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    funnelStage: ["Cost investigation", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Commercial investigation", "Transactional"],
    proposedAnswer:
      "Branding can increase the quote when it adds artwork, custom cups, signage, cart treatment, menu development, production, shipping, installation, approvals, or lead time. Luxe prices the confirmed surfaces and production scope rather than one universal fee.",
    requiredEvidence: {
      available: ["Approved branding surfaces", "Approved production variables"],
      outstanding: ["Approved production pricing and branding fee schedule."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/events/brand-activations",
        linkPurpose: "Link customization pricing to the activation-specific answer.",
      },
    ],
    contentFormat: "concise contextual answer",
  }),
  createPricingQuestionRecord({
    id: "pricing-combined-services",
    question: "Can combining services affect the overall quote?",
    normalizedQueryTopic: "combined event services quote effect",
    primaryPage: "/experiences",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Comparison", "Vendor evaluation"],
    searchIntent: ["Commercial investigation", "Comparison", "Transactional"],
    proposedAnswer:
      "Yes. Combining services can change staffing, equipment, delivery, setup, travel, timing, and shared logistics. The combined scope is priced together, but there is no automatic discount or surcharge.",
    requiredEvidence: {
      available: ["Combined booking model", "Approved pricing variables"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences",
        linkPurpose: "Link general pricing to the definitive combined-service answer.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live",
    validationStatus: "validated",
  }),
  createPricingQuestionRecord({
    id: "pricing-retainer",
    question: "What retainer is normally required?",
    normalizedQueryTopic: "event booking retainer requirement",
    primaryPage: "/faq",
    secondarySupportingPage: "/contact",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Cost investigation", "Booking preparation"],
    searchIntent: ["Informational", "Transactional"],
    proposedAnswer:
      "A signed contract and 30% non-refundable retainer are required to secure a confirmed booking. The remaining balance is due seven days before the event.",
    requiredEvidence: {
      available: ["Approved booking and payment policy"],
      outstanding: [],
    },
    internalLinks: [
      {
        fromPage: "/contact",
        toDefinitivePage: "/faq",
        linkPurpose: "Link the inquiry handoff to the complete payment-term answer.",
      },
    ],
    contentFormat: "concise contextual answer",
    publishingStatus: "live",
    validationStatus: "validated",
  }),
];

const logisticsQuestionMap: AeoQuestionMapRecord[] = [
  {
    id: "logistics-dessert-attendants",
    question: "How many attendants are included with dessert service?",
    normalizedQueryTopic: "dessert service attendant count",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Planning", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Informational", "Commercial investigation", "Logistical"],
    proposedAnswer:
      "Professional attendants are included, but no public or universal headcount is approved. The assigned team follows guest count, dessert, duration, equipment, quantities, arrival pattern, placement, and venue conditions and is stated in the proposal.",
    requiredEvidence: {
      available: ["Professional attendants are included"],
      outstanding: ["Approved attendant ranges or staffing formula."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link shared staffing guidance to the dessert-specific answer.",
      },
    ],
    contentFormat: "requirements summary",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
  {
    id: "logistics-dessert-service-duration",
    question: "How long does dessert service last?",
    normalizedQueryTopic: "dessert service duration",
    primaryPage: "/experiences/sweet-cart",
    secondarySupportingPage: "/faq",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Planning", "Vendor evaluation", "Booking preparation"],
    searchIntent: ["Informational", "Commercial investigation", "Logistical"],
    proposedAnswer:
      "No standard public duration is approved. The operating window follows guest count, dessert, quantities, staffing, equipment, guest-arrival timing, the event schedule, and venue access.",
    requiredEvidence: {
      available: ["Event-specific service-window planning"],
      outstanding: ["Approved standard or minimum dessert-service durations."],
    },
    internalLinks: [
      {
        fromPage: "/faq",
        toDefinitivePage: "/experiences/sweet-cart",
        linkPurpose: "Link shared timing guidance to the dessert-specific answer.",
      },
    ],
    contentFormat: "requirements summary",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
];

const customizationQuestionMap: AeoQuestionMapRecord[] = [
  {
    id: "customization-rental-styling",
    question: "Can rentals be styled to match the event?",
    normalizedQueryTopic: "event rental styling and practical layout",
    primaryPage: "/experiences/seating-rentals",
    secondarySupportingPage: "/events",
    icp: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    funnelStage: ["Understanding", "Planning", "Vendor evaluation"],
    searchIntent: ["Informational", "Commercial investigation", "Inspirational", "Logistical"],
    proposedAnswer:
      "The confirmed white resin chairs, 6-ft tables, cocktail tables, black or white cocktail-table linens, table linens, tents, tent walls, tent lighting, and dance floor can be considered with the venue, palette, and other Luxe experiences. Luxe does not offer custom furniture or a broad range of styles and finishes. Availability, site suitability, venue rules, and any setup scope remain event-specific.",
    requiredEvidence: {
      available: [
        "Confirmed item-level rental inventory, quantities, dimensions, tent types, and linen colours",
        "Rental-specific quantity and placement guidance",
        "Independent and combined booking model",
      ],
      outstanding: ["Approved date-specific availability and substitution policy."],
    },
    internalLinks: [
      {
        fromPage: "/events",
        toDefinitivePage: "/experiences/seating-rentals",
        linkPurpose: "Link event-setting guidance to the definitive rental-styling answer.",
      },
    ],
    contentFormat: "decision guide",
    publishingStatus: "live with dependency limits",
    validationStatus: "validated with dependency limits",
    existingAnswerStatus: "answered",
  },
];

export const aeoQuestionMap: AeoQuestionMapRecord[] = [
  ...canonicalQuestionMap,
  ...serviceDiscoveryQuestionMap,
  ...eventPlanningQuestionMap,
  ...comparisonQuestionMap,
  ...pricingQuestionMap,
  ...logisticsQuestionMap,
  ...customizationQuestionMap,
];

export const aeoQuestionMapRules = [
  "The primary page is the only page that may contain the complete answer for a mapped question.",
  "A secondary or other supporting page may include only the context needed to make a useful link to the definitive answer.",
  "Natural-language variants inherit the canonical question's definitive page unless a later content step promotes a materially distinct question into this map.",
  "A proposed answer is a controlled answer brief; publishing status determines whether it may be implemented.",
  "Outstanding evidence must be verified before adding the corresponding number, policy, workflow, outcome, or promise.",
  "A live-with-dependency-limits answer may explain what Luxe reviews but must not estimate the missing fact.",
  "Internal-link instructions describe content ownership; they do not assert that every link is already implemented.",
  "No question-map record creates a new route, FAQ entry, or structured-data entitlement.",
] as const;

const planIds = new Set(questionMapPlans.map((plan) => plan.id));
const clusterIds = new Set(questionClusters.map((cluster) => cluster.id));
const mapRoutes = new Set(
  aeoQuestionMap.flatMap((record) => [
    record.primaryPage,
    ...(record.secondarySupportingPage
      ? [record.secondarySupportingPage]
      : []),
    ...record.internalLinks.flatMap((link) => [
      link.fromPage,
      link.toDefinitivePage,
    ]),
  ]),
);

export const aeoQuestionMapSummary = {
  questionCount: aeoQuestionMap.length,
  canonicalQuestionCount: canonicalQuestionMap.length,
  serviceDiscoveryQuestionCount: serviceDiscoveryQuestionMap.length,
  eventPlanningQuestionCount: eventPlanningQuestionMap.length,
  comparisonQuestionCount: comparisonQuestionMap.length,
  pricingQuestionCount: pricingQuestionMap.length,
  logisticsQuestionCount: logisticsQuestionMap.length,
  customizationQuestionCount: customizationQuestionMap.length,
  newRoutes: [] as string[],
  missingQuestionPlans: [...clusterIds].filter((id) => !planIds.has(id)),
  unknownQuestionPlans: [...planIds].filter((id) => !clusterIds.has(id)),
  duplicateQuestionPlans: questionMapPlans
    .map((plan) => plan.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index),
  invalidRouteReferences: [...mapRoutes].filter(
    (path) => !primaryRoutes.includes(path as (typeof primaryRoutes)[number]),
  ),
  primaryPageClassificationMismatches: questionMapPlans
    .filter(
      (plan) =>
        getQuestionClassification(plan.id)?.destination.primaryPath !==
        plan.primaryPage,
    )
    .map((plan) => plan.id),
  invalidInternalLinkTargets: aeoQuestionMap
    .filter((record) =>
      record.internalLinks.some(
        (link) => link.toDefinitivePage !== record.primaryPage,
      ),
    )
    .map((record) => record.id),
  duplicateCompleteAnswers: [] as string[],
  publishingStatusCounts: {
    live: aeoQuestionMap.filter((item) => item.publishingStatus === "live")
      .length,
    dependencyLimited: aeoQuestionMap.filter(
      (item) => item.publishingStatus === "live with dependency limits",
    ).length,
    planned: aeoQuestionMap.filter(
      (item) => item.publishingStatus === "planned",
    ).length,
    blocked: aeoQuestionMap.filter(
      (item) => item.publishingStatus === "blocked",
    ).length,
    revalidationRequired: aeoQuestionMap.filter(
      (item) => item.publishingStatus === "revalidation required",
    ).length,
  },
};

export function getAeoQuestionMapRecord(id: string) {
  return aeoQuestionMap.find((record) => record.id === id);
}
