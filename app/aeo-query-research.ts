import type {
  AeoAudienceSlug,
  ConcernCategory,
} from "./aeo-audience-research";
import { primaryRoutes } from "./site-config";

export type ResearchAvailability =
  | "researched"
  | "partially-available"
  | "unavailable";

export type ResearchSourceRecord = {
  source:
    | "existing-luxe-inquiries"
    | "instagram-messages"
    | "email-questions"
    | "quote-conversations"
    | "client-interviews"
    | "planner-venue-questions"
    | "google-search-console"
    | "google-autocomplete"
    | "google-related-searches"
    | "people-also-ask"
    | "bing-suggestions"
    | "competitor-headings-faqs"
    | "wedding-corporate-discussions"
    | "industry-forums-communities"
    | "google-business-profile"
    | "sales-prospect-questions";
  availability: ResearchAvailability;
  note: string;
};

export const researchSourceAvailability: ResearchSourceRecord[] = [
  {
    source: "existing-luxe-inquiries",
    availability: "partially-available",
    note:
      "The intake and master specification summarize recurring inquiry needs, but no anonymized raw inquiry archive is present in the workspace.",
  },
  {
    source: "instagram-messages",
    availability: "unavailable",
    note: "No anonymized Instagram message export was supplied.",
  },
  {
    source: "email-questions",
    availability: "unavailable",
    note: "No anonymized Luxe email-question export was supplied.",
  },
  {
    source: "quote-conversations",
    availability: "unavailable",
    note: "No anonymized quote or proposal conversation archive was supplied.",
  },
  {
    source: "client-interviews",
    availability: "unavailable",
    note: "No interview transcripts or structured client-question notes were supplied.",
  },
  {
    source: "planner-venue-questions",
    availability: "partially-available",
    note:
      "Public planner, venue, and wedding-community questions were researched; first-party Luxe partner questions remain unavailable.",
  },
  {
    source: "google-search-console",
    availability: "unavailable",
    note: "Search Console is not yet verified and no query export is available.",
  },
  {
    source: "google-autocomplete",
    availability: "researched",
    note:
      "Live Canadian suggestions were sampled for wedding coffee bars, dessert carts, corporate coffee carts, and Toronto event rentals on July 26, 2026.",
  },
  {
    source: "google-related-searches",
    availability: "partially-available",
    note:
      "The live result surface was inspected, but a stable related-search block was not exposed for the sampled query. No terms were invented to fill the gap.",
  },
  {
    source: "people-also-ask",
    availability: "researched",
    note:
      "Live question blocks were sampled for wedding coffee, dessert-cart, and corporate coffee-cart queries on July 26, 2026.",
  },
  {
    source: "bing-suggestions",
    availability: "researched",
    note:
      "Live Canadian suggestions were sampled for the phrase “mobile coffee bar wedding” on July 26, 2026.",
  },
  {
    source: "competitor-headings-faqs",
    availability: "researched",
    note:
      "Representative Toronto/GTA coffee, live-dessert, activation, and rental pages were reviewed for headings and FAQ language.",
  },
  {
    source: "wedding-corporate-discussions",
    availability: "researched",
    note:
      "Public wedding-planning and event discussions were reviewed for timing, value, guest-use, staffing, line, and coordination concerns.",
  },
  {
    source: "industry-forums-communities",
    availability: "researched",
    note:
      "Public venue, vendor, rental, and event-production conversations were reviewed for access, utilities, insurance, scope, and responsibility questions.",
  },
  {
    source: "google-business-profile",
    availability: "unavailable",
    note: "No verified Google Business Profile search-term export or performance report is available.",
  },
  {
    source: "sales-prospect-questions",
    availability: "unavailable",
    note: "No separate anonymized sales-prospect question archive was supplied.",
  },
];

export type EvidenceSurface =
  | "first-party-summary"
  | "google-autocomplete"
  | "google-people-also-ask"
  | "bing-suggestions"
  | "competitor-heading"
  | "competitor-faq"
  | "wedding-community"
  | "industry-community";

export type QuestionEvidence = {
  surface: EvidenceSurface;
  observedLanguage: string;
  sourceUrl?: string;
};

export type QuestionCluster = {
  id: string;
  category: ConcernCategory;
  audiences: AeoAudienceSlug[];
  canonicalQuestion: string;
  naturalVariants: string[];
  vocabulary: string[];
  evidence: QuestionEvidence[];
  targetRoutes: string[];
  dependencySlugs: string[];
  priority: "high" | "medium";
  status: "research-candidate";
};

export const questionClusters: QuestionCluster[] = [
  {
    id: "experience-fit",
    category: "informational",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    canonicalQuestion:
      "Which coffee, dessert, or rental format fits this event and the role it should play?",
    naturalVariants: [
      "Do I need coffee at my wedding?",
      "Is a coffee cart a good fit for cocktail hour?",
      "What types of events use coffee cart activations?",
      "Which dessert setup works for a shower or reception?",
    ],
    vocabulary: [
      "mobile coffee bar",
      "coffee cart",
      "mobile espresso bar",
      "live dessert station",
      "dessert cart",
      "event rentals",
    ],
    evidence: [
      {
        surface: "wedding-community",
        observedLanguage: "Do I need coffee at my wedding?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1t0f0vz/do_i_need_coffee_at_my_wedding/",
      },
      {
        surface: "competitor-heading",
        observedLanguage: "What types of events use coffee cart activations?",
        sourceUrl:
          "https://brandedcoffeecart.com/blog/what-is-a-coffee-cart-brand-activation",
      },
    ],
    targetRoutes: ["/events/weddings", "/events/corporate-events", "/events/brand-activations", "/events"],
    dependencySlugs: [],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "wedding-service-timing",
    category: "informational",
    audiences: ["wedding-clients", "industry-partners"],
    canonicalQuestion:
      "When should a coffee or dessert experience operate within the wedding timeline?",
    naturalVariants: [
      "Coffee cart during cocktail hour or after reception?",
      "What is the best time to serve coffee at a wedding?",
      "Should coffee open with dessert or later in the evening?",
      "Can service be split between cocktail hour and dessert?",
    ],
    vocabulary: [
      "cocktail hour",
      "guest arrival",
      "with dessert",
      "late-night coffee",
      "reception",
      "wedding timeline",
    ],
    evidence: [
      {
        surface: "wedding-community",
        observedLanguage: "Coffee cart during cocktail hour or after reception?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1t8ycj4/coffee_cart_during_cocktail_hour_or_after/",
      },
      {
        surface: "wedding-community",
        observedLanguage: "Coffee cart timing suggestions",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1myv78u/coffee_cart_timing_suggestions/",
      },
    ],
    targetRoutes: ["/events/weddings"],
    dependencySlugs: ["service-duration", "setup-teardown-times"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "guest-use-and-value",
    category: "commercial",
    audiences: ["wedding-clients", "private-event-clients"],
    canonicalQuestion:
      "Will guests use the experience enough for it to be worth the cost and space?",
    naturalVariants: [
      "Are coffee bars worth the money?",
      "Will people use a coffee cart if there is already an open bar?",
      "Will guests want coffee late at night?",
      "Is this practical or just a nice-looking extra?",
    ],
    vocabulary: ["worth it", "will guests use it", "open bar", "guest experience", "value"],
    evidence: [
      {
        surface: "wedding-community",
        observedLanguage: "Coffee Bars? Worth the money?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1o2hvz8/coffee_bars_worth_the_money/",
      },
      {
        surface: "wedding-community",
        observedLanguage: "Did your guests actually use it and was it worth the cost?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1o2hvz8/coffee_bars_worth_the_money/",
      },
    ],
    targetRoutes: ["/events/weddings", "/events/private-events"],
    dependencySlugs: ["pricing-variables", "guest-capacities"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "capacity-throughput-lines",
    category: "operational",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "How many guests can be served within the available time without creating an unreasonable line?",
    naturalVariants: [
      "How much coffee do I need for 100 guests?",
      "How many drinks can be served per hour?",
      "How many guests can the cart handle?",
      "How will menu complexity affect service speed?",
    ],
    vocabulary: ["guest count", "drinks per hour", "throughput", "service speed", "line length"],
    evidence: [
      {
        surface: "google-people-also-ask",
        observedLanguage: "How much coffee do I need for 100 guests?",
        sourceUrl:
          "https://www.google.com/search?q=mobile+coffee+bar+wedding+questions",
      },
      {
        surface: "competitor-heading",
        observedLanguage: "How many drinks can they serve per hour?",
        sourceUrl:
          "https://www.cardinal-coffee.com/post/coffee-cart-catering-101-everything-you-need-to-know-for-your-next-event",
      },
      {
        surface: "wedding-community",
        observedLanguage: "Make sure they are staffed and equipped to support your guest list.",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1bs1zuy/coffee_cart_at_wedding/",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/faq"],
    dependencySlugs: ["guest-capacities", "drinks-served-per-hour", "staffing-levels"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "staffing-and-inclusions",
    category: "operational",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "What is included, who staffs the experience, and which responsibilities remain with the client or venue?",
    naturalVariants: [
      "How many baristas will staff the event?",
      "Do you provide staff?",
      "Does the setup include cups, syrups, milk alternatives, serving supplies, and cleanup?",
      "What does the host or venue need to provide?",
    ],
    vocabulary: ["what is included", "baristas", "attendants", "hosts", "serving supplies", "cleanup"],
    evidence: [
      {
        surface: "competitor-heading",
        observedLanguage: "How many baristas will staff the event?",
        sourceUrl:
          "https://edencoffeecocart.com/how-to-plan-a-wedding-coffee-cart/",
      },
      {
        surface: "competitor-heading",
        observedLanguage: "What’s included?",
        sourceUrl: "https://therollingpin.ca/pages/live-dessert-stations",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/faq"],
    dependencySlugs: ["staffing-levels"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "menu-and-dietary-fit",
    category: "informational",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    canonicalQuestion:
      "Which drinks, desserts, alternatives, and dietary accommodations can be included?",
    naturalVariants: [
      "Do you offer hot, iced, decaf, matcha, tea, or non-coffee drinks?",
      "Can we create signature drinks?",
      "Which toppings and dessert choices are available?",
      "How are allergies and dietary needs handled?",
    ],
    vocabulary: [
      "menu",
      "decaf",
      "iced drinks",
      "non-coffee",
      "milk alternatives",
      "dietary restrictions",
      "toppings",
    ],
    evidence: [
      {
        surface: "wedding-community",
        observedLanguage: "See if they offer decaf, too.",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1bs1zuy/coffee_cart_at_wedding/",
      },
      {
        surface: "competitor-faq",
        observedLanguage: "Do you offer personalized wedding coffee menus?",
        sourceUrl: "https://www.lattebooth.com/faq",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/faq"],
    dependencySlugs: [],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "branding-and-creative-approval",
    category: "informational",
    audiences: ["corporate-clients", "brand-agency-clients"],
    canonicalQuestion:
      "What can be branded, and how does the creative and production approval process work?",
    naturalVariants: [
      "Can the cart, cups, sleeves, menu, napkins, uniforms, or signage carry our brand?",
      "Can drinks be named around the campaign?",
      "What artwork files and approvals are required?",
      "How far ahead do custom branded elements need to be finalized?",
    ],
    vocabulary: [
      "branded coffee cart",
      "cart wrap",
      "branded cups",
      "custom menu",
      "campaign",
      "product launch",
    ],
    evidence: [
      {
        surface: "competitor-faq",
        observedLanguage: "What is included in a coffee cart activation?",
        sourceUrl:
          "https://brandedcoffeecart.com/blog/what-is-a-coffee-cart-brand-activation",
      },
      {
        surface: "bing-suggestions",
        observedLanguage: "mobile coffee bar wedding menu",
        sourceUrl: "https://www.bing.com/",
      },
    ],
    targetRoutes: ["/events/brand-activations", "/events/corporate-events", "/experiences/coffee-bar"],
    dependencySlugs: ["branding-lead-times", "venue-coordination-process"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "space-power-water",
    category: "operational",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "How much space, power, water, drainage, and back-of-house support does the setup require?",
    naturalVariants: [
      "How much space and power does the coffee cart need?",
      "Does the dessert station require a dedicated outlet?",
      "Is the setup self-contained?",
      "Where can waste water, packaging, or service waste be handled?",
    ],
    vocabulary: ["footprint", "power", "outlet", "circuit", "water", "drainage", "self-contained"],
    evidence: [
      {
        surface: "competitor-heading",
        observedLanguage: "How much space and power do you need?",
        sourceUrl:
          "https://www.iconcoffeecart.com/blog/questions-before-booking-coffee-cart",
      },
      {
        surface: "industry-community",
        observedLanguage: "Power needs, water access, booth size, and setup time",
        sourceUrl:
          "https://www.typeform.com/templates/event-vendor-registration-form-template",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals", "/faq"],
    dependencySlugs: ["space-requirements", "power-requirements", "water-requirements"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "venue-access-and-timing",
    category: "operational",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "What access, loading, delivery, setup, teardown, and pickup conditions must the venue confirm?",
    naturalVariants: [
      "When can vendors access the venue?",
      "How long does setup and teardown take?",
      "Are stairs, elevators, loading docks, timed windows, or after-hours pickup a problem?",
      "Who must be present for delivery or pickup?",
    ],
    vocabulary: [
      "load-in",
      "loading dock",
      "access window",
      "elevator",
      "stairs",
      "setup",
      "teardown",
      "pickup",
    ],
    evidence: [
      {
        surface: "competitor-faq",
        observedLanguage: "What about deliveries at specific times or difficult to reach areas?",
        sourceUrl: "https://www.affair-rentals.com/faq",
      },
      {
        surface: "industry-community",
        observedLanguage: "What time can vendors access the venue for setup and load-out?",
        sourceUrl:
          "https://www.reddit.com/r/WeddingsCanada/comments/1sn85bd/questions_to_ask_when_touring_a_venue/",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals", "/faq"],
    dependencySlugs: ["setup-teardown-times", "venue-coordination-process"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "outdoor-and-weather",
    category: "operational",
    audiences: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "Can the experience operate outdoors, and what weather, surface, shelter, and contingency requirements apply?",
    naturalVariants: [
      "What happens if it rains?",
      "Can the cart operate on grass or an uneven surface?",
      "Is a tent or weather protection required?",
      "When is an outdoor setup no longer safe or feasible?",
    ],
    vocabulary: ["outdoor event", "rain plan", "weather", "surface", "shelter", "wind", "backup plan"],
    evidence: [
      {
        surface: "industry-community",
        observedLanguage: "In the event of bad weather, what happens in outdoor spaces?",
        sourceUrl:
          "https://www.reddit.com/r/WeddingsCanada/comments/1sn85bd/questions_to_ask_when_touring_a_venue/",
      },
      {
        surface: "competitor-faq",
        observedLanguage: "Tent and outdoor-event safety and delivery questions",
        sourceUrl: "https://www.fableevents.ca/faq",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals", "/faq"],
    dependencySlugs: ["outdoor-event-limitations"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "pricing-minimums-and-scope",
    category: "commercial",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "What affects the quote, and which minimums, delivery charges, setup fees, or scope changes may apply?",
    naturalVariants: [
      "How much does a mobile coffee cart cost?",
      "How much does it cost to rent chairs for an event?",
      "Is delivery included?",
      "Does the quote include setup, teardown, pickup, staffing, travel, and overtime?",
    ],
    vocabulary: [
      "cost",
      "price",
      "minimum spend",
      "delivery fee",
      "setup fee",
      "travel fee",
      "overtime",
    ],
    evidence: [
      {
        surface: "google-autocomplete",
        observedLanguage: "How much does it cost to rent chairs for an event",
        sourceUrl: "https://www.google.com/",
      },
      {
        surface: "bing-suggestions",
        observedLanguage: "mobile coffee bar wedding cost",
        sourceUrl: "https://www.bing.com/",
      },
      {
        surface: "wedding-community",
        observedLanguage: "Delivery and coordination can cost more than the rental items.",
        sourceUrl:
          "https://www.reddit.com/r/Weddingsunder10k/comments/evdnul/wedding_venue_budget_tips/",
      },
    ],
    targetRoutes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals", "/faq"],
    dependencySlugs: ["pricing-variables", "service-minimums", "travel-policies"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "booking-lead-time-and-availability",
    category: "commercial",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
    ],
    canonicalQuestion:
      "How far ahead should the client inquire, and what confirms the date and selected scope?",
    naturalVariants: [
      "How far in advance should I book?",
      "Can you hold a date while details are still being finalized?",
      "When are final guest count and selections due?",
      "Do custom branding or larger rental orders require more lead time?",
    ],
    vocabulary: ["book ahead", "availability", "reserve the date", "retainer", "lead time", "final details"],
    evidence: [
      {
        surface: "competitor-faq",
        observedLanguage: "How far in advance should I book a coffee cart?",
        sourceUrl: "https://soracoffeegta.squarespace.com/faq",
      },
      {
        surface: "competitor-faq",
        observedLanguage: "How far in advance do I have to place an order?",
        sourceUrl: "https://www.affair-rentals.com/faq",
      },
    ],
    targetRoutes: ["/faq", "/contact"],
    dependencySlugs: ["branding-lead-times"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "travel-and-service-area",
    category: "commercial",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "Which locations does Luxe serve, and when do travel, delivery, or destination-event charges apply?",
    naturalVariants: [
      "Do you travel outside Toronto?",
      "Do you serve my venue in the GTA?",
      "Do you offer out-of-town delivery or pickup?",
      "How is travel priced for multiple locations?",
    ],
    vocabulary: ["near me", "Toronto", "GTA", "travel", "delivery area", "destination event"],
    evidence: [
      {
        surface: "google-autocomplete",
        observedLanguage: "mobile coffee bar Toronto",
        sourceUrl: "https://www.google.com/",
      },
      {
        surface: "competitor-faq",
        observedLanguage: "What areas do you serve?",
        sourceUrl: "https://soracoffeegta.squarespace.com/faq",
      },
    ],
    targetRoutes: ["/", "/faq", "/contact"],
    dependencySlugs: ["travel-policies"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "dessert-quantity-and-flow",
    category: "operational",
    audiences: ["wedding-clients", "private-event-clients", "corporate-clients"],
    canonicalQuestion:
      "How many desserts and service stations are appropriate for the guest count, duration, and event flow?",
    naturalVariants: [
      "How many desserts do I need for 25 guests?",
      "How many types of dessert should I offer?",
      "What if guests crowd the cart?",
      "Are desserts made to order, pre-plated, or both?",
    ],
    vocabulary: ["desserts per guest", "portion", "made to order", "pre-plated", "service line"],
    evidence: [
      {
        surface: "google-people-also-ask",
        observedLanguage: "How many desserts do I need for 25 guests?",
        sourceUrl:
          "https://www.google.com/search?q=dessert+cart+wedding+questions",
      },
      {
        surface: "competitor-heading",
        observedLanguage: "How does it work on the day?",
        sourceUrl:
          "https://www.google.com/search?q=dessert+cart+wedding+questions",
      },
    ],
    targetRoutes: ["/experiences/sweet-cart", "/faq"],
    dependencySlugs: ["guest-capacities", "staffing-levels"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "rental-inventory-layout",
    category: "informational",
    audiences: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "Which rental items, quantities, dimensions, and layout are appropriate for the event?",
    naturalVariants: [
      "Which chairs, tables, tents, linens, and lighting are available?",
      "What size tent do I need?",
      "How many chairs and tables should I order?",
      "Can you help review a floor plan?",
    ],
    vocabulary: ["inventory", "quantity", "dimensions", "tent size", "floor plan", "layout"],
    evidence: [
      {
        surface: "competitor-faq",
        observedLanguage: "What size tent rental do I need?",
        sourceUrl: "https://www.affair-rentals.com/faq",
      },
      {
        surface: "google-autocomplete",
        observedLanguage: "event chair rentals Toronto",
        sourceUrl: "https://www.google.com/",
      },
    ],
    targetRoutes: ["/experiences/seating-rentals"],
    dependencySlugs: ["rental-inventory", "space-requirements"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "rental-delivery-setup-responsibility",
    category: "operational",
    audiences: [
      "wedding-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "Who delivers, places, sets up, tears down, repacks, and returns each rental item?",
    naturalVariants: [
      "Do you deliver and pick up?",
      "Do you set up tables and chairs?",
      "Who does what between the rental company, venue, caterer, decorator, and coordinator?",
      "Must rentals be stacked or repacked before pickup?",
    ],
    vocabulary: ["delivery", "pickup", "placement", "setup", "teardown", "repacking", "who does what"],
    evidence: [
      {
        surface: "competitor-faq",
        observedLanguage: "Do you set up tables and chairs?",
        sourceUrl: "https://www.affair-rentals.com/faq",
      },
      {
        surface: "wedding-community",
        observedLanguage: "Who does what?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/12lkv7y/who_does_what/",
      },
    ],
    targetRoutes: ["/experiences/seating-rentals", "/faq"],
    dependencySlugs: ["rental-inventory", "setup-teardown-times", "venue-coordination-process"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "rental-risk-and-changes",
    category: "commercial",
    audiences: ["wedding-clients", "private-event-clients", "industry-partners"],
    canonicalQuestion:
      "What happens when quantities change, items are unused, damaged, lost, cancelled, or exposed to weather?",
    naturalVariants: [
      "Can I reduce quantities after booking?",
      "Will I be credited for unused rentals?",
      "What happens if something is damaged or missing?",
      "What is the cancellation or postponement policy?",
    ],
    vocabulary: ["changes", "unused items", "damage", "loss", "cancellation", "postponement"],
    evidence: [
      {
        surface: "competitor-faq",
        observedLanguage: "What about breakage or losses?",
        sourceUrl: "https://www.affair-rentals.com/faq",
      },
      {
        surface: "competitor-faq",
        observedLanguage: "Will I be credited for equipment returned unused?",
        sourceUrl: "https://www.affair-rentals.com/faq",
      },
    ],
    targetRoutes: ["/experiences/seating-rentals", "/faq"],
    dependencySlugs: ["rental-inventory", "pricing-variables"],
    priority: "medium",
    status: "research-candidate",
  },
  {
    id: "corporate-scale-and-repetition",
    category: "operational",
    audiences: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    canonicalQuestion:
      "Can Luxe support simultaneous locations, multiple days, recurring programs, or changing attendance patterns?",
    naturalVariants: [
      "Can you support more than one setup at the same time?",
      "Can the same experience run across multiple days?",
      "Can menus and branding remain consistent across locations?",
      "How are staffing and equipment confirmed for repeat dates?",
    ],
    vocabulary: ["simultaneous setups", "multi-day", "multi-location", "recurring program", "repeatable"],
    evidence: [
      {
        surface: "first-party-summary",
        observedLanguage: "Multiple setups, multi-day capability, and recurring-event capability",
      },
      {
        surface: "competitor-heading",
        observedLanguage: "Conferences, campus events, retail pop-ups, and product launches",
        sourceUrl:
          "https://brandedcoffeecart.com/blog/what-is-a-coffee-cart-brand-activation",
      },
    ],
    targetRoutes: ["/events/corporate-events", "/events/brand-activations"],
    dependencySlugs: ["simultaneous-setup-capability", "multi-day-capability"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "procurement-insurance-and-compliance",
    category: "trust",
    audiences: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    canonicalQuestion:
      "Can Luxe satisfy procurement, insurance, venue, food-service, and vendor-compliance requirements?",
    naturalVariants: [
      "Can you provide proof of insurance?",
      "Can the venue be named as an additional insured if required?",
      "Which permits, food-safety records, or vendor forms are available?",
      "Who completes onboarding and venue compliance documents?",
    ],
    vocabulary: ["procurement", "certificate of insurance", "vendor compliance", "permits", "onboarding"],
    evidence: [
      {
        surface: "industry-community",
        observedLanguage: "The venue requires proof of vendor insurance.",
        sourceUrl:
          "https://www.vendorjot.com/solutions/event-vendor-management-software",
      },
      {
        surface: "industry-community",
        observedLanguage: "Confirm policy dates include setup and teardown.",
        sourceUrl:
          "https://www.insurancecanopy.com/blog/event-planner-vendor-checklist",
      },
    ],
    targetRoutes: ["/events/corporate-events", "/events/brand-activations", "/faq", "/contact"],
    dependencySlugs: ["insurance-availability", "venue-coordination-process"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "coordination-and-role-boundaries",
    category: "trust",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "How does Luxe coordinate with the host, planner, venue, caterer, decorator, florist, photographer, bar, and production team?",
    naturalVariants: [
      "Who is responsible for each setup and service decision?",
      "Can Luxe coordinate directly with my venue or planner?",
      "Who is the event-day contact?",
      "How are timeline or floor-plan changes communicated?",
    ],
    vocabulary: ["vendor coordination", "venue contact", "event-day contact", "responsibility", "handoff"],
    evidence: [
      {
        surface: "wedding-community",
        observedLanguage: "Who does what?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/12lkv7y/who_does_what/",
      },
      {
        surface: "wedding-community",
        observedLanguage: "Did the coffee cart handle setup or did you coordinate with the bartender?",
        sourceUrl:
          "https://www.reddit.com/r/weddingplanning/comments/1o2hvz8/coffee_bars_worth_the_money/",
      },
    ],
    targetRoutes: ["/events/weddings", "/events/corporate-events", "/events/brand-activations", "/faq", "/contact"],
    dependencySlugs: ["venue-coordination-process"],
    priority: "high",
    status: "research-candidate",
  },
  {
    id: "comparable-proof",
    category: "trust",
    audiences: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    canonicalQuestion:
      "Can Luxe show approved evidence from a comparable event, setup, audience, or venue context?",
    naturalVariants: [
      "Can I see weddings with a similar guest count?",
      "Have you handled this kind of venue or event before?",
      "Can I see what the setup actually looks like?",
      "Are client names, photos, testimonials, or campaign examples approved for display?",
    ],
    vocabulary: ["examples", "similar event", "real setup", "gallery", "testimonial", "reference"],
    evidence: [
      {
        surface: "industry-community",
        observedLanguage: "Do you have photos of weddings with similar guest counts?",
        sourceUrl:
          "https://www.reddit.com/r/WeddingsCanada/comments/1sn85bd/questions_to_ask_when_touring_a_venue/",
      },
      {
        surface: "competitor-heading",
        observedLanguage: "What does the bar setup actually look like?",
        sourceUrl:
          "https://theroaringbean.com/blog/questions-before-hiring-coffee-caterer",
      },
    ],
    targetRoutes: ["/gallery", "/events/weddings", "/events/corporate-events", "/events/brand-activations"],
    dependencySlugs: [],
    priority: "high",
    status: "research-candidate",
  },
];

export const queryVocabulary = {
  coffee: [
    "mobile coffee bar",
    "coffee cart",
    "mobile espresso bar",
    "coffee catering",
    "coffee cart rental",
  ],
  dessert: [
    "dessert cart",
    "live dessert station",
    "dessert cart rental",
    "mini pancake catering",
    "dessert trolley",
  ],
  rentals: [
    "event rentals",
    "party rentals",
    "chair rentals",
    "table rentals",
    "tent rentals",
    "delivery and setup",
  ],
  events: [
    "wedding reception",
    "cocktail hour",
    "corporate event",
    "brand activation",
    "product launch",
    "bridal shower",
    "baby shower",
  ],
  decisionLanguage: [
    "worth it",
    "how much",
    "what is included",
    "who does what",
    "how far in advance",
    "how many guests",
    "what do you need from the venue",
  ],
} as const;

const targetRoutes = new Set(
  questionClusters.flatMap((cluster) => cluster.targetRoutes),
);

export const queryResearchRules = [
  "Question clusters are research inputs, not an instruction to publish an FAQ for every variant.",
  "Preserve natural decision language while rewriting source wording into Luxe-specific, original answers.",
  "Repeated themes receive priority over isolated phrasing; keyword volume is not the sole selection criterion.",
  "First-party summaries, public search features, competitors, and communities remain distinct evidence classes.",
  "Competitor specifications may reveal a question but may never be copied as a Luxe operating answer.",
  "A dependency-blocked cluster remains unpublished until the exact Luxe fact is verified.",
  "Prefer one complete answer on the narrowest responsible page and contextual links elsewhere.",
  "Do not add a new route, long section, or schema type merely because a question was discovered.",
] as const;

export const queryResearchSummary = {
  researchDate: "2026-07-26",
  clusterCount: questionClusters.length,
  highPriorityCount: questionClusters.filter(
    (cluster) => cluster.priority === "high",
  ).length,
  newRoutes: [] as string[],
  invalidRouteReferences: [...targetRoutes].filter(
    (path) => !primaryRoutes.includes(path as (typeof primaryRoutes)[number]),
  ),
  unavailableFirstPartySources: researchSourceAvailability
    .filter(
      (record) =>
        record.availability === "unavailable" &&
        [
          "instagram-messages",
          "email-questions",
          "quote-conversations",
          "client-interviews",
          "sales-prospect-questions",
        ].includes(record.source),
    )
    .map((record) => record.source),
};

export function getQuestionCluster(id: string) {
  return questionClusters.find((cluster) => cluster.id === id);
}
