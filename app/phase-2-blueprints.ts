import { pageContracts } from "./page-contract";

export type Phase2PageBlueprint = {
  path: string;
  archetype: "home" | "hub" | "experience" | "event" | "gallery" | "faq" | "contact";
  hierarchy: string[];
  surfaceSequence: string[];
  desktopComposition: string;
  mobileComposition: string;
  differentiator: string;
  dependencies: string[];
};

const blueprintDesigns: Phase2PageBlueprint[] = [
  {
    path: "/",
    archetype: "home",
    hierarchy: ["Cinematic hero", "Parent positioning", "Experience selector", "Unified experience", "Event pathways", "Combined experiences", "Real-event media", "Operational proof", "Working principles", "Planning pathway", "Testimonials", "Service area", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "narrative", "canvas", "soft", "visual", "emphasis", "canvas"],
    desktopComposition: "Four-stage cinematic hero, connected three-expression selector, editorial event links, full-width proof, and contextual conversion close.",
    mobileComposition: "Single media frame, complete copy parity, touch-led selector sequence, stacked proof, and continuously visible conversion paths.",
    differentiator: "The parent-brand story and three divisions are introduced as one coordinated event world rather than a service catalogue.",
    dependencies: ["Four approved hero films and posters", "Permission-cleared real-event imagery", "Approved testimonial wording and attribution", "Production inquiry destination"],
  },
  {
    path: "/experiences",
    archetype: "hub",
    hierarchy: ["Hero", "Independent or combined explanation", "Coffee feature", "Dessert feature", "Seating feature", "Event-need comparison", "Combined experiences", "Event paths", "Gallery preview", "Planning pathway", "Inquiry"],
    surfaceSequence: ["canvas", "narrative", "visual", "canvas", "soft", "canvas", "emphasis"],
    desktopComposition: "A connected selector and three distinct editorial feature studies lead into comparison and combination systems.",
    mobileComposition: "The three experiences become an ordered decision sequence while preserving descriptions, links, and combined-booking clarity.",
    differentiator: "Coffee is atmospheric, Dessert is tactile, and Seating is architectural, all held within one parent composition.",
    dependencies: ["Division identity assets", "One approved media set per division", "Cross-division real-event examples"],
  },
  {
    path: "/experiences/coffee-bar",
    archetype: "experience",
    hierarchy: ["Coffee hero", "Experience overview", "Café Cart", "Signature Coffee Bar", "Format comparison", "Every-booking inclusions", "Beverage menu", "Seasonal service", "Customization and branding", "Capacity and operations", "Event applications", "Gallery", "Related experiences", "Coffee FAQs", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "narrative", "canvas", "emphasis", "visual", "canvas"],
    desktopComposition: "Warm close-detail editorial fields compare the two service formats before menu, customization, and operational proof.",
    mobileComposition: "Format comparison becomes a sequential reading flow; menus and FAQs remain complete and immediately accessible.",
    differentiator: "Positions a complete café and beverage experience, not a basic mobile cart.",
    dependencies: ["Coffee photography and film", "Approved menu and seasonal availability", "Power, water, staffing, service-rate, setup, and teardown specification"],
  },
  {
    path: "/experiences/sweet-cart",
    archetype: "experience",
    hierarchy: ["Sweet Cart hero", "Positioning", "Classic and Signature collections", "Live dessert formats", "Soft-serve enhancement", "Every-booking inclusions", "Sauces and toppings", "Customization and branding", "Capacity and setup", "Event applications", "Gallery", "Coffee and seating combinations", "Sweet Cart FAQs", "Inquiry"],
    surfaceSequence: ["visual", "soft", "canvas", "narrative", "visual", "canvas", "emphasis"],
    desktopComposition: "Soft contours and live-preparation storytelling separate collections, desserts, pantry details, and combination possibilities.",
    mobileComposition: "Dessert formats and included-versus-enhancement information remain explicit in a compact, ordered flow.",
    differentiator: "Treats dessert as a live guest interaction and visual event moment rather than a static food display.",
    dependencies: ["Sweet Cart photography and film", "Approved sauces, toppings, premium additions, and soft-serve availability", "Service-rate and setup specification"],
  },
  {
    path: "/experiences/seating-rentals",
    archetype: "experience",
    hierarchy: ["Seating hero", "Service overview", "Confirmed categories", "Additional inventory", "Layout inspiration", "Delivery, setup, teardown", "Indoor and outdoor applications", "Quote requirements", "Event recommendations", "Gallery", "Coffee and dessert combinations", "Service area", "Rental FAQs", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "narrative", "emphasis", "canvas", "visual", "soft", "canvas"],
    desktopComposition: "Architectural grids and wider room studies organize inventory by spatial role instead of catalogue SKU.",
    mobileComposition: "Inventory, quote inputs, and logistics become prioritized lists without hiding quantities or policy dependencies.",
    differentiator: "Frames rentals through room design, comfort, flow, and guest experience.",
    dependencies: ["Confirmed inventory and quantities", "Professional room and inventory photography", "Delivery, setup, teardown, damage, outdoor, and travel policies"],
  },
  {
    path: "/events",
    archetype: "hub",
    hierarchy: ["Events hero", "Event-led approach", "Seven occasion pathways", "Combined examples", "Gallery preview", "Planning pathway", "Inquiry"],
    surfaceSequence: ["canvas", "narrative", "canvas", "visual", "soft", "emphasis"],
    desktopComposition: "An occasion-led directory connects seven event contexts to the relevant Luxe experiences.",
    mobileComposition: "The occasion directory becomes a clear full-width sequence with the same summaries and destinations.",
    differentiator: "Begins with what the visitor is planning rather than asking them to choose a service first.",
    dependencies: ["Representative approved media across event types", "Permission-cleared event context"],
  },
  {
    path: "/events/weddings",
    archetype: "event",
    hierarchy: ["Wedding hero", "Wedding applications", "Across-the-day service moments", "Coffee, dessert, and rental roles", "Suggested combinations", "Customization", "Planner and venue coordination", "Logistics", "Gallery", "Testimonials", "Wedding FAQs", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "narrative", "soft", "emphasis", "visual", "canvas"],
    desktopComposition: "A day-in-sequence editorial structure connects service moments, combinations, and coordination proof.",
    mobileComposition: "Wedding stages, logistics, and FAQs remain complete in chronological reading order.",
    differentiator: "Shows where each Luxe experience supports the wedding day and encourages cohesive multi-service planning.",
    dependencies: ["Approved wedding photography", "Approved wedding testimonials", "Booking lead-time, retainer, venue, and planner coordination details"],
  },
  {
    path: "/events/corporate-events",
    archetype: "event",
    hierarchy: ["Corporate hero", "Capabilities", "Corporate applications", "Coffee and matcha", "Dessert", "Branding", "Scale and repeatability", "Trusted By", "Gallery or case studies", "Operational process", "Corporate FAQs", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "emphasis", "narrative", "visual", "canvas"],
    desktopComposition: "Operational proof, approved organization credibility, and capability groupings support professional evaluation.",
    mobileComposition: "Capability, scale, proof, and logistics remain explicit without compressing into tiny comparison cards.",
    differentiator: "Leads with reliability, scalability, repeatability, and brand execution for professional buyers.",
    dependencies: ["Corporate photography", "Approved case-study facts or testimonials", "Confirmed multi-day, recurring, simultaneous-setup, and volume parameters"],
  },
  {
    path: "/events/brand-activations",
    archetype: "event",
    hierarchy: ["Activation hero", "Branded experience overview", "Brand surfaces", "Campaign applications", "Content opportunities", "Multi-day and multi-location capability", "Coffee, matcha, dessert, and styling", "Client proof", "Gallery", "Planning requirements", "Inquiry"],
    surfaceSequence: ["visual", "emphasis", "canvas", "narrative", "visual", "canvas"],
    desktopComposition: "Campaign assets and branded touchpoints are treated as a connected visual system rather than a list of add-ons.",
    mobileComposition: "Brand requirements, asset handoff, capability, and proof retain their full decision order.",
    differentiator: "Speaks directly to agency and campaign workflows, branded touchpoints, and content-ready guest moments.",
    dependencies: ["Approved branded-event photography", "Brand and campaign usage permissions", "Asset-production lead times and multi-location operating parameters"],
  },
  {
    path: "/events/baby-showers",
    archetype: "event",
    hierarchy: ["Baby shower hero", "Coffee and matcha", "Dessert cart", "Seating and rentals", "Signage and styling", "Indoor and outdoor options", "Suggested combinations", "Gallery", "Planning considerations", "FAQs", "Inquiry"],
    surfaceSequence: ["visual", "soft", "canvas", "narrative", "visual", "canvas"],
    desktopComposition: "Soft editorial moments connect hospitality, live dessert, and setting without becoming overly feminine or childish.",
    mobileComposition: "Experience choices and indoor/outdoor considerations become a compact planning sequence.",
    differentiator: "Balances a gentle atmosphere with clear, practical event coordination.",
    dependencies: ["Approved baby-shower imagery", "Styling and signage examples", "Indoor and outdoor operating requirements"],
  },
  {
    path: "/events/bridal-showers",
    archetype: "event",
    hierarchy: ["Bridal shower hero", "Café-style service", "Matcha and specialty drinks", "Dessert options", "Seating and rentals", "Menus, signage, florals, and styling", "Suggested combinations", "Gallery", "Host and planner FAQs", "Inquiry"],
    surfaceSequence: ["visual", "narrative", "canvas", "soft", "visual", "canvas"],
    desktopComposition: "Café, dessert, and styling details form a polished social setting with planner-aware decision points.",
    mobileComposition: "The visual service story and host questions remain complete in an intentional vertical sequence.",
    differentiator: "Emphasizes cohesive, highly visual service combinations for hosts and planners.",
    dependencies: ["Approved bridal-shower imagery", "Floral/styling partner boundaries", "Approved custom-menu and signage examples"],
  },
  {
    path: "/events/birthdays",
    archetype: "event",
    hierarchy: ["Birthday hero", "Milestone and adult celebrations", "Family and appropriate children's events", "Coffee and non-coffee menus", "Dessert options", "Rental combinations", "Custom signage", "Suggested combinations", "Gallery", "Birthday FAQs", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "emphasis", "soft", "visual", "canvas"],
    desktopComposition: "Milestone-led editorial groupings prevent the page from reading as a children's-party template.",
    mobileComposition: "Celebration types and service choices remain clearly differentiated before combinations and inquiry.",
    differentiator: "Positions birthdays as premium milestone hospitality across adult, family, and suitable children's contexts.",
    dependencies: ["Approved birthday imagery across age contexts", "Custom signage examples", "Age-appropriate service and menu guidance"],
  },
  {
    path: "/events/private-events",
    archetype: "event",
    hierarchy: ["Private events hero", "Engagements", "Anniversaries", "Graduations", "Religious and cultural celebrations", "Holiday and family gatherings", "Other milestones", "Coffee, dessert, and rental possibilities", "Suggested combinations", "Gallery", "Planning requirements", "FAQs", "Inquiry"],
    surfaceSequence: ["visual", "canvas", "narrative", "soft", "visual", "canvas"],
    desktopComposition: "A flexible occasion matrix preserves specificity without forcing unrelated gatherings into a generic package.",
    mobileComposition: "Event contexts remain scannable and lead naturally into relevant experience possibilities.",
    differentiator: "Captures meaningful gatherings not served by a dedicated page while preserving event-specific language.",
    dependencies: ["Approved private-event imagery", "Cultural and religious context review where used", "Relevant planning and venue requirements"],
  },
  {
    path: "/gallery",
    archetype: "gallery",
    hierarchy: ["Gallery hero", "Accessible filters", "Grouped event stories", "Descriptive captions", "Related page links", "Inquiry"],
    surfaceSequence: ["canvas", "visual", "soft", "visual", "canvas"],
    desktopComposition: "Filtered, captioned image groups use varying editorial rhythms rather than one masonry wall.",
    mobileComposition: "A touch-sized filter rail and full-width image groups preserve captions, links, and crawlable image URLs.",
    differentiator: "Every visual belongs to a service and event context and functions as evidence, not decoration.",
    dependencies: ["Permission-cleared original media", "Stable filenames and URLs", "Alt text, captions, event/division associations, and usage permissions"],
  },
  {
    path: "/faq",
    archetype: "faq",
    hierarchy: ["FAQ hero", "Category navigation", "General booking", "Travel and service area", "Setup and logistics", "Coffee Bar", "Sweet Cart", "Seating Rentals", "Customization", "Inquiry"],
    surfaceSequence: ["canvas", "narrative", "canvas", "emphasis"],
    desktopComposition: "Category navigation and native disclosure groups support fast factual review.",
    mobileComposition: "Touch-sized native disclosures retain every answer, link, and heading without hover dependence.",
    differentiator: "Answers are direct, policy-aware, and linked to deeper service or event context.",
    dependencies: ["Final pricing basis and minimums", "Final power, water, weather, outdoor, staffing, travel, delivery, retainer, and payment policies"],
  },
  {
    path: "/contact",
    archetype: "contact",
    hierarchy: ["Contact hero", "What visitors can request", "Information to prepare", "Service-area and minimum guidance", "What happens next", "Contact handoff", "Phone and email", "FAQ and privacy context"],
    surfaceSequence: ["canvas", "narrative", "emphasis", "canvas"],
    desktopComposition: "A preparation-led editorial flow keeps the third-party handoff distinct from the website's responsibilities.",
    mobileComposition: "Preparation details, fallback contacts, and the handoff remain visible in one logical focus order.",
    differentiator: "Qualifies and prepares the visitor without rebuilding the operational inquiry platform.",
    dependencies: ["Production inquiry-platform URL", "Minimum-booking guidance", "Privacy and consent language", "Confirmed response-time wording and return behavior"],
  },
];

export const phase2PageBlueprints = pageContracts.map((contract) => {
  const design = blueprintDesigns.find((blueprint) => blueprint.path === contract.path);

  if (!design) {
    throw new Error(`Missing Phase 2 blueprint for ${contract.path}`);
  }

  return { ...contract, ...design };
});

export const criticalTemplateDesigns = [
  { template: "Home", routes: ["/"], desktop: "cinematic and multi-system", mobile: "single-frame cinematic and priority-led" },
  { template: "Hub", routes: ["/experiences", "/events"], desktop: "connected directory and comparison", mobile: "ordered decision pathway" },
  { template: "Experience detail", routes: ["/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals"], desktop: "division-specific editorial study", mobile: "complete service planning sequence" },
  { template: "Event detail", routes: ["/events/weddings", "/events/corporate-events", "/events/brand-activations", "/events/baby-showers", "/events/bridal-showers", "/events/birthdays", "/events/private-events"], desktop: "occasion-specific application story", mobile: "occasion-led planning sequence" },
  { template: "Gallery", routes: ["/gallery"], desktop: "filtered visual evidence groups", mobile: "touch filter rail and full-width stories" },
  { template: "FAQ", routes: ["/faq"], desktop: "category-led disclosures", mobile: "full-width native disclosures" },
  { template: "Contact", routes: ["/contact"], desktop: "qualification and handoff", mobile: "single logical preparation flow" },
] as const;
