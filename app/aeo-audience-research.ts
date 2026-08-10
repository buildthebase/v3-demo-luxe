import { primaryRoutes } from "./site-config";

export type AeoAudienceSlug =
  | "wedding-clients"
  | "corporate-clients"
  | "brand-agency-clients"
  | "private-event-clients"
  | "industry-partners";

export type ConcernCategory =
  | "informational"
  | "operational"
  | "commercial"
  | "trust";

export type ResearchConcern = {
  question: string;
  dependencySlugs?: string[];
};

export type AeoAudienceProfile = {
  slug: AeoAudienceSlug;
  label: string;
  people: string[];
  decisionJob: string;
  concerns: Record<ConcernCategory, ResearchConcern[]>;
  primaryRoutes: string[];
  supportingRoutes: string[];
  placementRule: string;
  status: "research-only";
};

export const aeoAudienceProfiles: AeoAudienceProfile[] = [
  {
    slug: "wedding-clients",
    label: "Wedding Clients",
    people: [
      "Couples",
      "Wedding planners",
      "Coordinators",
      "Venues",
      "Family members supporting the planning process",
    ],
    decisionJob:
      "Understand where coffee, live dessert, and rentals fit within the wedding day and whether Luxe can coordinate reliably with the existing vendor team.",
    concerns: {
      informational: [
        {
          question:
            "Which experience suits cocktail hour, reception, late-night service, brunch, or another wedding-day moment?",
        },
        {
          question:
            "How can coffee, dessert, and rentals be combined without making the event feel over-programmed?",
        },
        {
          question:
            "What menu, presentation, dietary, and customization choices are available?",
        },
      ],
      operational: [
        {
          question:
            "What guest count, service timing, staffing, footprint, utilities, and access does each experience require?",
          dependencySlugs: [
            "guest-capacities",
            "drinks-served-per-hour",
            "staffing-levels",
            "space-requirements",
            "power-requirements",
            "water-requirements",
          ],
        },
        {
          question:
            "How do setup, teardown, weather planning, venue rules, and vendor schedules affect the plan?",
          dependencySlugs: [
            "setup-teardown-times",
            "outdoor-event-limitations",
            "venue-coordination-process",
          ],
        },
      ],
      commercial: [
        {
          question:
            "What affects pricing, minimums, travel fees, service duration, and the value of combining experiences?",
          dependencySlugs: [
            "pricing-variables",
            "service-minimums",
            "travel-policies",
          ],
        },
        {
          question:
            "How early should the couple book, and what is required to reserve the date?",
        },
      ],
      trust: [
        {
          question:
            "Has Luxe delivered comparable weddings, and is approved photography or testimonial evidence available?",
        },
        {
          question:
            "Will Luxe communicate clearly with the planner, coordinator, venue, caterer, florist, photographer, and production team?",
          dependencySlugs: ["venue-coordination-process"],
        },
        {
          question:
            "Does Luxe carry insurance appropriate for venue and planner requirements?",
          dependencySlugs: ["insurance-availability"],
        },
      ],
    },
    primaryRoutes: ["/events/weddings"],
    supportingRoutes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
      "/gallery",
      "/faq",
      "/contact",
    ],
    placementRule:
      "Answer wedding-flow questions on Weddings, service mechanics on the relevant experience page, shared policies in FAQ, and qualification requirements on Inquire.",
    status: "research-only",
  },
  {
    slug: "corporate-clients",
    label: "Corporate Clients",
    people: [
      "Executive assistants",
      "Office managers",
      "HR teams",
      "Corporate event planners",
      "Procurement teams",
      "Conference organizers",
      "Institutions",
      "Universities",
      "Real estate developers",
    ],
    decisionJob:
      "Confirm that Luxe can satisfy the event brief, operational requirements, internal approvals, and procurement expectations with minimal coordination risk.",
    concerns: {
      informational: [
        {
          question:
            "Which formats suit office hospitality, employee appreciation, conferences, openings, recurring programs, or client events?",
        },
        {
          question:
            "Can coffee, matcha, dessert, rentals, and light branding be combined for one professional guest experience?",
        },
      ],
      operational: [
        {
          question:
            "What capacity, throughput, staffing, setup window, footprint, power, water, and venue access are required?",
          dependencySlugs: [
            "guest-capacities",
            "drinks-served-per-hour",
            "staffing-levels",
            "setup-teardown-times",
            "space-requirements",
            "power-requirements",
            "water-requirements",
          ],
        },
        {
          question:
            "Can Luxe support simultaneous locations, multiple days, recurring dates, security procedures, loading rules, and venue contacts?",
          dependencySlugs: [
            "simultaneous-setup-capability",
            "multi-day-capability",
            "venue-coordination-process",
          ],
        },
      ],
      commercial: [
        {
          question:
            "Which variables shape the quote, minimum commitment, travel charges, overtime, additions, invoicing, and approval process?",
          dependencySlugs: [
            "pricing-variables",
            "service-minimums",
            "travel-policies",
          ],
        },
        {
          question:
            "What information does procurement need before Luxe can be approved or onboarded?",
        },
      ],
      trust: [
        {
          question:
            "Can Luxe provide approved corporate examples, references, insurance evidence, and a clear operating contact?",
          dependencySlugs: ["insurance-availability"],
        },
        {
          question:
            "How does Luxe manage timing, presentation, guest flow, contingency planning, and communication in a professional environment?",
          dependencySlugs: ["venue-coordination-process"],
        },
      ],
    },
    primaryRoutes: ["/events/corporate-events"],
    supportingRoutes: [
      "/events/brand-activations",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
      "/gallery",
      "/faq",
      "/contact",
    ],
    placementRule:
      "Keep corporate use cases and buyer confidence on Corporate Events; place reusable service specifications on experience pages and shared policy answers in FAQ.",
    status: "research-only",
  },
  {
    slug: "brand-agency-clients",
    label: "Brand and Agency Clients",
    people: [
      "Marketing agencies",
      "Experiential agencies",
      "Public relations agencies",
      "Campaign teams",
      "Retail brands",
      "Product-launch teams",
      "Luxury brands",
    ],
    decisionJob:
      "Determine whether Luxe can translate a campaign brief into a feasible, brand-accurate guest interaction while coordinating with agency and production stakeholders.",
    concerns: {
      informational: [
        {
          question:
            "Which parts of the cart, cups, menu, signage, drinks, desserts, uniforms, or surrounding setting can reflect the campaign?",
        },
        {
          question:
            "How can the experience support a launch, retail activation, media moment, sampling program, or creator event?",
        },
      ],
      operational: [
        {
          question:
            "What throughput, staffing, footprint, utility, access, production, and multi-location constraints shape feasibility?",
          dependencySlugs: [
            "drinks-served-per-hour",
            "staffing-levels",
            "space-requirements",
            "power-requirements",
            "water-requirements",
            "simultaneous-setup-capability",
          ],
        },
        {
          question:
            "What are the artwork, approval, fabrication, menu-testing, installation, and venue-coordination stages?",
          dependencySlugs: [
            "branding-lead-times",
            "venue-coordination-process",
          ],
        },
      ],
      commercial: [
        {
          question:
            "How do customization depth, production quantities, locations, dates, service hours, attendance, and approvals affect the quote?",
          dependencySlugs: ["pricing-variables", "multi-day-capability"],
        },
        {
          question:
            "Which parts of the brief should be confirmed before requesting availability and pricing?",
        },
      ],
      trust: [
        {
          question:
            "Can Luxe show approved examples of brand-accurate execution without overstating a client relationship or campaign result?",
        },
        {
          question:
            "Can Luxe work within agency approvals, production schedules, venue rules, confidentiality, and insurance requirements?",
          dependencySlugs: [
            "branding-lead-times",
            "insurance-availability",
            "venue-coordination-process",
          ],
        },
      ],
    },
    primaryRoutes: ["/events/brand-activations"],
    supportingRoutes: [
      "/events/corporate-events",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
      "/gallery",
      "/faq",
      "/contact",
    ],
    placementRule:
      "Keep campaign translation and branding workflow on Brand Activations; avoid repeating full service specifications or generic agency language on every division page.",
    status: "research-only",
  },
  {
    slug: "private-event-clients",
    label: "Private-Event Clients",
    people: [
      "Baby shower hosts",
      "Bridal shower hosts",
      "Birthday hosts",
      "Engagement and anniversary hosts",
      "Families planning milestone occasions",
    ],
    decisionJob:
      "Choose an experience that feels appropriate for the occasion, venue, guest list, and budget without needing professional event knowledge.",
    concerns: {
      informational: [
        {
          question:
            "Which experience or combination best fits the occasion, atmosphere, guest mix, and schedule?",
        },
        {
          question:
            "What can be personalized through menus, signage, colours, florals, dessert presentation, or rentals?",
        },
      ],
      operational: [
        {
          question:
            "Will the experience fit the home or venue, guest count, indoor or outdoor setting, utilities, access, and available setup time?",
          dependencySlugs: [
            "guest-capacities",
            "setup-teardown-times",
            "space-requirements",
            "power-requirements",
            "water-requirements",
            "outdoor-event-limitations",
          ],
        },
        {
          question:
            "What does the host, venue, planner, or decorator need to prepare before event day?",
          dependencySlugs: ["venue-coordination-process"],
        },
      ],
      commercial: [
        {
          question:
            "What is included, which choices affect price, whether minimums or travel fees apply, and when payment is due?",
          dependencySlugs: [
            "pricing-variables",
            "service-minimums",
            "travel-policies",
          ],
        },
        {
          question:
            "When does combining services add practical value rather than unnecessary scope?",
        },
      ],
      trust: [
        {
          question:
            "Can the host see approved examples from comparable celebrations and understand what the real event setup involved?",
        },
        {
          question:
            "Will Luxe guide a first-time host clearly, arrive prepared, protect the venue, and handle the confirmed setup and teardown responsibilities?",
          dependencySlugs: [
            "setup-teardown-times",
            "venue-coordination-process",
          ],
        },
      ],
    },
    primaryRoutes: [
      "/events/baby-showers",
      "/events/bridal-showers",
      "/events/birthdays",
      "/events/private-events",
    ],
    supportingRoutes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
      "/gallery",
      "/faq",
      "/contact",
    ],
    placementRule:
      "Answer occasion selection on the matching event page, mechanics on experience pages, and shared booking policy in FAQ; do not paste one private-event answer block onto four pages.",
    status: "research-only",
  },
  {
    slug: "industry-partners",
    label: "Industry Partners",
    people: [
      "Event planners",
      "Wedding planners",
      "Venues",
      "Decorators",
      "Florists",
      "Caterers",
      "Production companies",
      "Photographers",
    ],
    decisionJob:
      "Confirm that Luxe will integrate cleanly into the wider event plan, respect role boundaries, and provide the information required for coordination and client confidence.",
    concerns: {
      informational: [
        {
          question:
            "Where does each Luxe experience belong in the event flow, room plan, vendor schedule, and guest journey?",
        },
        {
          question:
            "Which decisions should remain with Luxe, the client, the planner, the venue, or another vendor?",
        },
      ],
      operational: [
        {
          question:
            "What footprint, utilities, access, loading, setup, teardown, service, waste, weather, and strike requirements must enter the production plan?",
          dependencySlugs: [
            "setup-teardown-times",
            "space-requirements",
            "power-requirements",
            "water-requirements",
            "outdoor-event-limitations",
            "venue-coordination-process",
          ],
        },
        {
          question:
            "Who is the event-day contact, what information is exchanged, and how are timing changes or conflicts resolved?",
          dependencySlugs: ["venue-coordination-process"],
        },
      ],
      commercial: [
        {
          question:
            "Which scope, revision, travel, delivery, rental, overtime, cancellation, and approval details affect the client proposal?",
          dependencySlugs: [
            "pricing-variables",
            "travel-policies",
            "rental-inventory",
          ],
        },
        {
          question:
            "How should partners introduce Luxe without promising availability, inventory, pricing, or capabilities that are not confirmed?",
        },
      ],
      trust: [
        {
          question:
            "Can Luxe provide insurance evidence, professional contact details, approved references, and accurate technical information?",
          dependencySlugs: ["insurance-availability"],
        },
        {
          question:
            "Will Luxe protect partner relationships, credit work accurately, respect venue rules, and avoid overstating collaborations?",
          dependencySlugs: ["venue-coordination-process"],
        },
      ],
    },
    primaryRoutes: ["/events", "/experiences"],
    supportingRoutes: [
      "/events/weddings",
      "/events/corporate-events",
      "/events/brand-activations",
      "/faq",
      "/contact",
    ],
    placementRule:
      "Industry Partners are a decision lens across existing pages, not a new partner landing page. Publish only the coordination detail relevant to the page and link to one shared policy answer where appropriate.",
    status: "research-only",
  },
];

export type AeoDependencyStatus =
  | "confirmed"
  | "partially-confirmed"
  | "unverified";

export type AeoContentDependency = {
  slug: string;
  label: string;
  status: AeoDependencyStatus;
  publicationRule: string;
};

export const aeoContentDependencies: AeoContentDependency[] = [
  {
    slug: "guest-capacities",
    label: "Guest capacities",
    status: "partially-confirmed",
    publicationRule:
      "Coffee Bar and Sweet Cart limits may be used with event-specific qualification; Seating Rentals capacity remains unpublished.",
  },
  {
    slug: "drinks-served-per-hour",
    label: "Drinks served per hour",
    status: "unverified",
    publicationRule: "Do not publish a throughput figure until operating data is approved.",
  },
  {
    slug: "staffing-levels",
    label: "Number of baristas or attendants",
    status: "unverified",
    publicationRule: "Do not publish a universal staffing formula or included headcount.",
  },
  {
    slug: "setup-teardown-times",
    label: "Setup and teardown times",
    status: "unverified",
    publicationRule:
      "The inclusion of setup and takedown may be stated where confirmed; exact durations remain unpublished.",
  },
  {
    slug: "space-requirements",
    label: "Space requirements",
    status: "unverified",
    publicationRule: "Do not publish a universal footprint for any format.",
  },
  {
    slug: "power-requirements",
    label: "Power requirements",
    status: "unverified",
    publicationRule: "Do not publish amperage, outlet, circuit, or generator claims.",
  },
  {
    slug: "water-requirements",
    label: "Water requirements",
    status: "unverified",
    publicationRule: "Do not publish supply, drainage, or self-contained operation claims.",
  },
  {
    slug: "outdoor-event-limitations",
    label: "Outdoor-event limitations",
    status: "unverified",
    publicationRule:
      "Outdoor service may be discussed only as event-specific and subject to weather, surface, access, utility, venue, and contingency review.",
  },
  {
    slug: "travel-policies",
    label: "Travel policies",
    status: "partially-confirmed",
    publicationRule:
      "Approved service areas and the possibility of travel fees may be stated; thresholds and fee calculations remain unpublished.",
  },
  {
    slug: "service-minimums",
    label: "Service minimums",
    status: "partially-confirmed",
    publicationRule:
      "Use only the confirmed Coffee Bar minimum; do not infer Sweet Cart or Seating Rentals minimums.",
  },
  {
    slug: "pricing-variables",
    label: "Pricing variables",
    status: "partially-confirmed",
    publicationRule:
      "Explain approved variables qualitatively; do not invent packages, rates, fee formulas, or universal totals.",
  },
  {
    slug: "rental-inventory",
    label: "Rental inventory",
    status: "confirmed",
    publicationRule:
      "Publish the client-confirmed item types, quantities, dimensions, tent-top types, and linen colours; keep date-specific availability and substitutions qualified.",
  },
  {
    slug: "simultaneous-setup-capability",
    label: "Simultaneous setup capability",
    status: "confirmed",
    publicationRule:
      "The approved upper limit may be used only with staffing, availability, date, and scope qualification.",
  },
  {
    slug: "multi-day-capability",
    label: "Multi-day capability",
    status: "unverified",
    publicationRule:
      "Do not promise multi-day or recurring delivery until the relevant operating model is confirmed.",
  },
  {
    slug: "branding-lead-times",
    label: "Branding lead times",
    status: "unverified",
    publicationRule:
      "Recommend early planning without publishing a universal production lead time.",
  },
  {
    slug: "insurance-availability",
    label: "Insurance availability",
    status: "confirmed",
    publicationRule:
      "Use the approved liability-insurance fact; do not infer certificate wording, endorsements, or turnaround times.",
  },
  {
    slug: "venue-coordination-process",
    label: "Venue coordination process",
    status: "unverified",
    publicationRule:
      "State willingness to coordinate; do not publish a step-by-step workflow, responsibility matrix, or response-time promise until approved.",
  },
];

const allProfileRoutes = new Set(
  aeoAudienceProfiles.flatMap((profile) => [
    ...profile.primaryRoutes,
    ...profile.supportingRoutes,
  ]),
);

const referencedDependencySlugs = new Set(
  aeoAudienceProfiles.flatMap((profile) =>
    Object.values(profile.concerns).flatMap((concerns) =>
      concerns.flatMap((concern) => concern.dependencySlugs ?? []),
    ),
  ),
);

export const aeoAudienceResearchRules = [
  "These profiles guide research and answer placement; they are not public page sections.",
  "Do not create one page per audience or one answer block per profile.",
  "A question belongs on the narrowest existing page that can answer it completely.",
  "Prefer a concise answer, comparison, checklist, or contextual link over another long-form section.",
  "Do not repeat a shared operational answer across event pages; keep it on the relevant experience page or FAQ and link contextually.",
  "Do not publish a dependency until its status and wording support the exact claim.",
  "Industry Partners remain a cross-page decision lens, not a new indexable audience page.",
] as const;

export const aeoAudienceResearchSummary = {
  profileCount: aeoAudienceProfiles.length,
  concernCategories: [
    "informational",
    "operational",
    "commercial",
    "trust",
  ] as ConcernCategory[],
  newRoutes: [] as string[],
  invalidRouteReferences: [...allProfileRoutes].filter(
    (path) => !primaryRoutes.includes(path as (typeof primaryRoutes)[number]),
  ),
  missingDependencyRecords: [...referencedDependencySlugs].filter(
    (slug) =>
      !aeoContentDependencies.some((dependency) => dependency.slug === slug),
  ),
  unverifiedDependencies: aeoContentDependencies
    .filter((dependency) => dependency.status !== "confirmed")
    .map((dependency) => dependency.slug),
};

export function getAeoAudienceProfile(slug: AeoAudienceSlug) {
  return aeoAudienceProfiles.find((profile) => profile.slug === slug);
}

export function getAeoContentDependency(slug: string) {
  return aeoContentDependencies.find((dependency) => dependency.slug === slug);
}
