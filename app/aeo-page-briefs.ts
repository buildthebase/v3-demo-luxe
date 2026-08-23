import type { AeoAudienceSlug } from "./aeo-audience-research";
import type { SearchIntentType } from "./aeo-question-classification";
import { primaryRoutes } from "./site-config";

export type AeoContentFormat =
  | "concise answer"
  | "decision guide"
  | "comparison"
  | "planning checklist"
  | "requirements summary"
  | "process summary"
  | "proof module"
  | "FAQ";

export type AeoInternalLinkRequirement = {
  href: string;
  purpose: string;
};

export type AeoQuestionBoundary = {
  question: string;
  definitivePage: string;
};

export type AeoFutureResource = {
  topic: string;
  evidenceGate: string;
};

export type PageAeoBrief = {
  path: string;
  pageName: string;
  pageRole: string;
  primaryIcps: AeoAudienceSlug[];
  primaryQuestionThemes: string[];
  secondaryQuestionThemes: string[];
  searchIntents: SearchIntentType[];
  requiredAnswers: string[];
  requiredFirstPartyEvidence: string[];
  requiredInternalLinks: AeoInternalLinkRequirement[];
  recommendedContentFormats: AeoContentFormat[];
  questionsNotToDuplicate: AeoQuestionBoundary[];
  questionsToMoveToFaq: string[];
  futureResources: AeoFutureResource[];
};

export const pageAeoBriefs: PageAeoBrief[] = [
  {
    path: "/",
    pageName: "Home",
    pageRole: "Establish Luxe Event Co., the three divisions, the primary market, and the shortest credible path into service or event research.",
    primaryIcps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    primaryQuestionThemes: [
      "What is Luxe Event Co.?",
      "Which services can be booked independently or together?",
      "Which events and markets does Luxe serve?",
    ],
    secondaryQuestionThemes: ["Why trust Luxe?", "Where should a visitor begin?"],
    searchIntents: ["Informational", "Commercial investigation", "Local"],
    requiredAnswers: [
      "Define the parent company and the distinct Coffee Bar, Sweet Cart, and Seating Rentals roles.",
      "State Toronto and the GTA as the primary market and qualify Southern Ontario travel.",
      "Show the supported event categories and one clear next step.",
    ],
    requiredFirstPartyEvidence: [
      "Approved parent and division identities",
      "Approved service-area hierarchy",
      "Permissioned organization proof",
      "Approved original service photography",
    ],
    requiredInternalLinks: [
      { href: "/experiences", purpose: "Compare the three divisions." },
      { href: "/events", purpose: "Choose by occasion." },
      { href: "/gallery", purpose: "Review first-party visual proof." },
      { href: "/faq", purpose: "Move shared operating questions to their owner." },
      { href: "/contact", purpose: "Begin a qualified inquiry." },
    ],
    recommendedContentFormats: ["concise answer", "decision guide", "proof module"],
    questionsNotToDuplicate: [
      { question: "What does each service include?", definitivePage: "/experiences" },
      { question: "What are the detailed booking, travel, and setup policies?", definitivePage: "/faq" },
      { question: "Which service suits a specific event?", definitivePage: "/events" },
    ],
    questionsToMoveToFaq: [
      "How is pricing calculated?",
      "Which areas are served?",
      "What space, power, water, setup, and weather conditions apply?",
    ],
    futureResources: [
      {
        topic: "Luxe Event Co. overview case study",
        evidenceGate: "A permissioned cross-division event with approved imagery, facts, and client commentary.",
      },
    ],
  },
  {
    path: "/experiences",
    pageName: "Experiences",
    pageRole: "Help prospects compare the three divisions and decide between independent vendors and one coordinated Luxe scope.",
    primaryIcps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    primaryQuestionThemes: [
      "What does each Luxe division provide?",
      "Can coffee, dessert, and rentals be coordinated through one provider?",
      "When is a coordinated provider more useful than separate vendors?",
    ],
    secondaryQuestionThemes: ["Which event types suit each service?", "How can combining services affect the quote?"],
    searchIntents: ["Informational", "Comparison", "Commercial investigation"],
    requiredAnswers: [
      "Differentiate Coffee Bar, Sweet Cart, and Seating Rentals by role and operating scope.",
      "Explain independent and combined booking without claiming an automatic discount.",
      "Direct visitors to the service page that owns detailed inclusions and constraints.",
    ],
    requiredFirstPartyEvidence: [
      "Approved division responsibilities",
      "Confirmed independent and combined booking model",
      "Approved service categories and event applications",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Open the complete Coffee Bar answer." },
      { href: "/experiences/sweet-cart", purpose: "Open the complete Sweet Cart answer." },
      { href: "/experiences/seating-rentals", purpose: "Open the complete rental answer." },
      { href: "/events", purpose: "Continue by event type." },
      { href: "/contact", purpose: "Request one or more experiences." },
    ],
    recommendedContentFormats: ["decision guide", "comparison", "concise answer"],
    questionsNotToDuplicate: [
      { question: "What is a mobile coffee bar and how does it work?", definitivePage: "/experiences/coffee-bar" },
      { question: "How does live dessert preparation work?", definitivePage: "/experiences/sweet-cart" },
      { question: "What inventory and rental responsibilities are available?", definitivePage: "/experiences/seating-rentals" },
    ],
    questionsToMoveToFaq: [
      "What are the shared pricing factors?",
      "Which service areas and travel fees apply?",
      "What are the shared setup and venue requirements?",
    ],
    futureResources: [
      {
        topic: "Coordinated-provider case study",
        evidenceGate: "A permissioned event using multiple Luxe divisions with documented handoffs, timing, and outcomes.",
      },
    ],
  },
  {
    path: "/experiences/coffee-bar",
    pageName: "Coffee Bar",
    pageRole: "Own mobile coffee discovery, format comparison, menu capability, inclusions, capacity, and coffee-specific pricing factors.",
    primaryIcps: ["wedding-clients", "corporate-clients", "brand-agency-clients", "industry-partners"],
    primaryQuestionThemes: [
      "What is a mobile coffee bar and how does espresso catering work?",
      "Which coffee format, menu, and event applications are available?",
      "How is Coffee Bar service priced and planned?",
    ],
    secondaryQuestionThemes: ["How does it compare with venue or traditional coffee service?", "What can be customized?"],
    searchIntents: ["Informational", "Commercial investigation", "Comparison", "Logistical"],
    requiredAnswers: [
      "Define mobile espresso service and distinguish Café Cart from Signature Coffee Bar.",
      "State the 250+ guest capacity, flexible event-specific service planning, and multiple service setups for select events.",
      "Explain coffee-specific quote factors before presenting inquiry.",
    ],
    requiredFirstPartyEvidence: [
      "Approved formats and beverage framework",
      "Confirmed Coffee Bar inclusions",
      "Qualified guest and simultaneous-setup limits",
      "Approved event photography and menu ownership",
    ],
    requiredInternalLinks: [
      { href: "/experiences", purpose: "Return to the division comparison." },
      { href: "/events/weddings", purpose: "Apply Coffee Bar to weddings." },
      { href: "/events/corporate-events", purpose: "Apply Coffee Bar to corporate events." },
      { href: "/events/brand-activations", purpose: "Move complete branding workflow to its owner." },
      { href: "/faq", purpose: "Move shared operational requirements to FAQ." },
      { href: "/contact", purpose: "Request Coffee Bar." },
    ],
    recommendedContentFormats: ["concise answer", "comparison", "requirements summary", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What is the complete branding and production workflow?", definitivePage: "/events/brand-activations" },
      { question: "How do shared travel, utilities, staffing, and setup policies work?", definitivePage: "/faq" },
      { question: "When should coffee appear in a wedding timeline?", definitivePage: "/events/weddings" },
    ],
    questionsToMoveToFaq: [
      "How many drinks can be served per hour?",
      "How many baristas are included?",
      "What exact space, power, and water requirements apply?",
      "Which travel and weather conditions apply?",
    ],
    futureResources: [
      {
        topic: "Coffee service capacity and venue specification guide",
        evidenceGate: "Approved throughput, staffing, footprint, power, water, setup, and outdoor specifications.",
      },
    ],
  },
  {
    path: "/experiences/sweet-cart",
    pageName: "Sweet Cart",
    pageRole: "Own dessert-cart discovery, live preparation, format selection, customization, capacity, staffing, duration, and dessert pricing factors.",
    primaryIcps: ["wedding-clients", "private-event-clients", "corporate-clients", "brand-agency-clients"],
    primaryQuestionThemes: [
      "What is dessert-cart catering and how is dessert prepared on-site?",
      "Which desserts, sauces, toppings, and cart collections are available?",
      "How is Sweet Cart service priced and operated?",
    ],
    secondaryQuestionThemes: ["How does hosted service compare with a dessert table?", "How can dessert be customized?"],
    searchIntents: ["Informational", "Commercial investigation", "Comparison", "Inspirational", "Logistical"],
    requiredAnswers: [
      "Define live dessert-cart service and compare hosted and self-serve formats neutrally.",
      "State confirmed desserts, toppings, optional soft serve, 400-guest limit, and up to three simultaneous setups.",
      "Explain dessert-specific cost, attendant, duration, and preparation dependencies without estimating.",
    ],
    requiredFirstPartyEvidence: [
      "Approved dessert, sauce, and topping framework",
      "Confirmed staffed on-site preparation",
      "Qualified capacity and simultaneous-setup limits",
      "Approved dessert and event photography",
    ],
    requiredInternalLinks: [
      { href: "/experiences", purpose: "Return to the division comparison." },
      { href: "/events/weddings", purpose: "Apply Sweet Cart to weddings." },
      { href: "/events/bridal-showers", purpose: "Apply Sweet Cart to bridal showers." },
      { href: "/events/baby-showers", purpose: "Apply Sweet Cart to baby showers." },
      { href: "/faq", purpose: "Move shared policies to FAQ." },
      { href: "/contact", purpose: "Request Sweet Cart." },
    ],
    recommendedContentFormats: ["concise answer", "comparison", "requirements summary", "FAQ"],
    questionsNotToDuplicate: [
      { question: "Which desserts work specifically for a bridal shower?", definitivePage: "/events/bridal-showers" },
      { question: "What is the complete campaign-branding workflow?", definitivePage: "/events/brand-activations" },
      { question: "What are the shared travel, utility, and weather policies?", definitivePage: "/faq" },
    ],
    questionsToMoveToFaq: [
      "Which areas are served and do travel fees apply?",
      "What exact utilities and outdoor requirements apply?",
      "What are the shared booking and payment terms?",
    ],
    futureResources: [
      {
        topic: "Dessert quantity and service-flow guide",
        evidenceGate: "Approved portion method, preparation throughput, staffing ranges, and real event examples.",
      },
    ],
  },
  {
    path: "/experiences/seating-rentals",
    pageName: "Seating Rentals",
    pageRole: "Own the confirmed focused inventory, rental-specific quantity and placement guidance, proposal-defined operational responsibilities, quote factors, and delivery feasibility.",
    primaryIcps: ["wedding-clients", "private-event-clients", "industry-partners"],
    primaryQuestionThemes: [
      "What is included with event-rental service?",
      "How do delivery, setup, teardown, and pricing responsibilities differ?",
      "Can rentals be styled and combined with Coffee Bar or Sweet Cart?",
    ],
    secondaryQuestionThemes: ["Which rentals support outdoor events?", "Where may rental delivery be available?"],
    searchIntents: ["Informational", "Commercial investigation", "Comparison", "Logistical", "Local"],
    requiredAnswers: [
      "Publish the confirmed item-level inventory, quantities, dimensions, tent-top types, and linen colours while qualifying date-specific availability.",
      "Keep delivery, setup, teardown, pickup, weather, timing, responsibilities, labour, and fees proposal-defined.",
      "Explain rental-specific quantities and placement without claiming full event planning, a broad furniture catalogue, or a universal delivery radius.",
    ],
    requiredFirstPartyEvidence: [
      "Approved rental categories",
      "Current inventory schedule",
      "Approved delivery, setup, teardown, pickup, damage, and weather policies",
      "Permissioned inventory and room photography",
    ],
    requiredInternalLinks: [
      { href: "/experiences", purpose: "Return to the division comparison." },
      { href: "/events/weddings", purpose: "Apply rentals to weddings." },
      { href: "/events/baby-showers", purpose: "Apply rentals to baby showers." },
      { href: "/events/bridal-showers", purpose: "Apply rentals to bridal showers." },
      { href: "/events/birthdays", purpose: "Apply rentals to birthdays." },
      { href: "/events/private-events", purpose: "Apply rentals to private and outdoor events." },
      { href: "/faq", purpose: "Move shared travel and venue requirements to FAQ." },
      { href: "/contact", purpose: "Request a rental quote." },
    ],
    recommendedContentFormats: ["decision guide", "comparison", "requirements summary", "FAQ"],
    questionsNotToDuplicate: [
      { question: "Which rentals are required for a specific outdoor private event?", definitivePage: "/events/private-events" },
      { question: "What are the shared service-area and venue-access rules?", definitivePage: "/faq" },
      { question: "How do all three divisions combine?", definitivePage: "/experiences" },
    ],
    questionsToMoveToFaq: [
      "What shared travel fees or destination rules apply?",
      "What shared venue access and weather questions apply?",
      "What are the booking, payment, and insurance policies?",
    ],
    futureResources: [
      {
        topic: "Focused rental inventory and placement guide",
        evidenceGate: "Confirmed inventory, date-specific availability rules, photography, and maintained ownership.",
      },
      {
        topic: "Rental delivery and responsibility guide",
        evidenceGate: "Approved delivery, setup, pickup, damage, cancellation, and weather policies.",
      },
    ],
  },
  {
    path: "/events",
    pageName: "Events",
    pageRole: "Help visitors choose an event pathway and understand service combinations and station-flow principles across occasions.",
    primaryIcps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    primaryQuestionThemes: [
      "Which Luxe experiences fit this type of event?",
      "How can Coffee Bar, Sweet Cart, and rentals form a complete setup?",
      "How should guest flow around service stations be planned?",
    ],
    secondaryQuestionThemes: ["Which event page owns the planning answer?", "When is one coordinated provider useful?"],
    searchIntents: ["Informational", "Inspirational", "Comparison", "Logistical"],
    requiredAnswers: [
      "Present all seven event pathways without turning the hub into seven complete event pages.",
      "Explain combination and guest-flow principles that apply across occasions.",
      "Direct visitors to the event page with the definitive planning answer.",
    ],
    requiredFirstPartyEvidence: [
      "Approved event applications by division",
      "Confirmed combined booking model",
      "Approved guest-flow planning principles",
    ],
    requiredInternalLinks: [
      { href: "/events/weddings", purpose: "Open wedding planning." },
      { href: "/events/corporate-events", purpose: "Open corporate planning." },
      { href: "/events/brand-activations", purpose: "Open activation planning." },
      { href: "/events/private-events", purpose: "Open private-event planning." },
      { href: "/experiences", purpose: "Compare divisions." },
      { href: "/contact", purpose: "Start from the event context." },
    ],
    recommendedContentFormats: ["decision guide", "concise answer", "comparison"],
    questionsNotToDuplicate: [
      { question: "When should coffee be served at a wedding?", definitivePage: "/events/weddings" },
      { question: "How should corporate coffee catering be planned?", definitivePage: "/events/corporate-events" },
      { question: "Which operational requirements apply to every event?", definitivePage: "/faq" },
    ],
    questionsToMoveToFaq: [
      "What do services cost?",
      "Which areas are served?",
      "What staffing, setup, utility, travel, and weather policies apply?",
    ],
    futureResources: [
      {
        topic: "Event-format selection guide",
        evidenceGate: "Sufficient permissioned examples showing materially different event decisions and outcomes.",
      },
    ],
  },
  {
    path: "/events/weddings",
    pageName: "Weddings",
    pageRole: "Own wedding-specific service timing, cocktail-hour fit, guest hospitality, combination, venue coordination, and day-flow decisions.",
    primaryIcps: ["wedding-clients", "industry-partners"],
    primaryQuestionThemes: [
      "When should coffee be served at a wedding?",
      "Is Coffee Bar appropriate for cocktail hour?",
      "How can coffee, dessert, and rentals fit the wedding timeline?",
    ],
    secondaryQuestionThemes: ["How should planners and venues coordinate the setup?", "Which format suits the guest experience?"],
    searchIntents: ["Informational", "Commercial investigation", "Inspirational", "Logistical"],
    requiredAnswers: [
      "Explain useful wedding moments for coffee, dessert, and rentals without prescribing one timeline.",
      "Connect service choices to guest movement, venue rules, and the wider schedule.",
      "Show permissioned wedding proof or preserve the proof dependency.",
    ],
    requiredFirstPartyEvidence: [
      "Approved wedding applications",
      "Permissioned wedding photography and testimonials",
      "Real timeline and venue-coordination examples",
      "Approved service operating details",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review Coffee Bar formats." },
      { href: "/experiences/sweet-cart", purpose: "Review dessert formats." },
      { href: "/experiences/seating-rentals", purpose: "Review rental planning." },
      { href: "/gallery", purpose: "Review wedding proof." },
      { href: "/faq", purpose: "Move shared booking and logistics answers." },
      { href: "/contact", purpose: "Plan the wedding scope." },
    ],
    recommendedContentFormats: ["planning checklist", "concise answer", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What is included in each service?", definitivePage: "/experiences" },
      { question: "What are the universal booking, travel, setup, and weather rules?", definitivePage: "/faq" },
      { question: "What is the complete Coffee Bar menu?", definitivePage: "/experiences/coffee-bar" },
    ],
    questionsToMoveToFaq: [
      "How much will the service cost?",
      "What retainer and payment schedule apply?",
      "What exact staffing, footprint, utilities, setup, teardown, and travel requirements apply?",
    ],
    futureResources: [
      {
        topic: "Wedding coffee and dessert timeline guide",
        evidenceGate: "Permissioned real schedules, venues, photography, planner input, and event-specific operating facts.",
      },
    ],
  },
  {
    path: "/events/corporate-events",
    pageName: "Corporate Events",
    pageRole: "Own corporate use cases, planning process, employee appreciation, scale, procurement, insurance, and operational confidence.",
    primaryIcps: ["corporate-clients", "brand-agency-clients", "industry-partners"],
    primaryQuestionThemes: [
      "How should coffee catering be planned for a corporate event?",
      "What works for employee appreciation, conferences, and client hospitality?",
      "Can Luxe meet scale, procurement, insurance, and coordination requirements?",
    ],
    secondaryQuestionThemes: ["Can services be branded?", "Can multi-day or recurring programs be planned?"],
    searchIntents: ["Commercial investigation", "Transactional", "Logistical", "Comparison"],
    requiredAnswers: [
      "Explain corporate applications and planning inputs around Coffee Bar and Sweet Cart, with rentals treated only as request-specific support when confirmed inventory fits.",
      "State confirmed simultaneous scale and qualify multi-day and recurring requests.",
      "Provide accurate insurance and procurement guidance without inventing documentation workflows.",
    ],
    requiredFirstPartyEvidence: [
      "Approved corporate organizations and permission boundaries",
      "Confirmed simultaneous-setup limits",
      "Approved insurance fact",
      "Confirmed procurement and coordination workflow",
      "Permissioned corporate case studies",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review corporate Coffee Bar capability." },
      { href: "/experiences/sweet-cart", purpose: "Review corporate dessert capability." },
      { href: "/events/brand-activations", purpose: "Move the full branding workflow." },
      { href: "/faq", purpose: "Move shared booking and logistics answers." },
      { href: "/contact", purpose: "Submit the corporate brief." },
    ],
    recommendedContentFormats: ["process summary", "requirements summary", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What is the complete branding-production workflow?", definitivePage: "/events/brand-activations" },
      { question: "What are shared service-area and setup policies?", definitivePage: "/faq" },
      { question: "What are each division's complete menus and inclusions?", definitivePage: "/experiences" },
    ],
    questionsToMoveToFaq: [
      "What general payment and booking terms apply?",
      "What exact utilities, staffing, access, travel, and weather requirements apply?",
      "Which service areas and travel fees apply?",
    ],
    futureResources: [
      {
        topic: "Corporate program and procurement guide",
        evidenceGate: "Approved recurring or multi-day operating model, procurement workflow, and permissioned examples.",
      },
    ],
  },
  {
    path: "/events/brand-activations",
    pageName: "Brand Activations",
    pageRole: "Own branded experience discovery, creative surfaces, campaign menu decisions, asset handoff, production timing, and experiential comparison.",
    primaryIcps: ["brand-agency-clients", "corporate-clients", "industry-partners"],
    primaryQuestionThemes: [
      "What is a branded coffee-cart activation?",
      "Which cups, menus, carts, signs, colours, and drink names can be branded?",
      "What assets, approvals, timing, and production factors are required?",
    ],
    secondaryQuestionThemes: ["How does experiential service compare with standard catering?", "How does branding affect price?"],
    searchIntents: ["Informational", "Commercial investigation", "Comparison", "Logistical", "Transactional"],
    requiredAnswers: [
      "Define the activation and its role in guest interaction.",
      "Explain branding surfaces and connect them to menu clarity, service speed, access, and guest flow.",
      "State required client assets and recommend early planning without inventing file specifications or lead times.",
    ],
    requiredFirstPartyEvidence: [
      "Approved branding surfaces",
      "Approved logos and organization proof",
      "Confirmed creative-approval and production workflow",
      "Approved file specifications and production lead times",
      "Permissioned activation photography and case studies",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review beverage capability." },
      { href: "/experiences/sweet-cart", purpose: "Review dessert capability." },
      { href: "/events/corporate-events", purpose: "Review broader corporate applications." },
      { href: "/faq", purpose: "Move shared operations and travel answers." },
      { href: "/contact", purpose: "Submit the campaign brief." },
    ],
    recommendedContentFormats: ["process summary", "comparison", "requirements summary", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What is each service's complete menu or inventory?", definitivePage: "/experiences" },
      { question: "What are the shared travel, setup, utility, and weather rules?", definitivePage: "/faq" },
      { question: "How should a general corporate event be planned?", definitivePage: "/events/corporate-events" },
    ],
    questionsToMoveToFaq: [
      "Which service areas and travel fees apply?",
      "What exact utility, setup, staffing, and venue-access requirements apply?",
      "What general booking and payment policies apply?",
    ],
    futureResources: [
      {
        topic: "Brand activation production guide",
        evidenceGate: "Approved workflow, file requirements, lead-time ranges, production partners, and responsibility matrix.",
      },
      {
        topic: "Branded activation case study",
        evidenceGate: "Client permission, campaign context, approved visuals, production facts, and substantiated outcomes.",
      },
    ],
  },
  {
    path: "/events/baby-showers",
    pageName: "Baby Showers",
    pageRole: "Own baby-shower service fit, welcoming menu and dessert choices, setting, indoor-outdoor planning, and practical host guidance.",
    primaryIcps: ["private-event-clients", "industry-partners"],
    primaryQuestionThemes: [
      "Which Luxe services work well for a baby shower?",
      "How can coffee, matcha, dessert, signage, and rentals form a coherent setting?",
      "What should the host consider for indoor or outdoor service?",
    ],
    secondaryQuestionThemes: ["How can the event be personalized?", "How should guest flow be planned?"],
    searchIntents: ["Informational", "Inspirational", "Commercial investigation", "Logistical"],
    requiredAnswers: [
      "Explain useful baby-shower combinations without presenting a mandatory package.",
      "Connect menu, dessert, styling, and rentals to the guest experience.",
      "Qualify outdoor and venue requirements and link to shared policies.",
    ],
    requiredFirstPartyEvidence: [
      "Approved baby-shower applications",
      "Permissioned baby-shower photography and testimonials",
      "Real indoor and outdoor examples",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review coffee and matcha." },
      { href: "/experiences/sweet-cart", purpose: "Review live dessert." },
      { href: "/experiences/seating-rentals", purpose: "Review setting and rentals." },
      { href: "/faq", purpose: "Move shared operating answers." },
      { href: "/contact", purpose: "Plan the shower." },
    ],
    recommendedContentFormats: ["decision guide", "planning checklist", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What is the complete Coffee Bar or Sweet Cart menu?", definitivePage: "/experiences" },
      { question: "What are shared outdoor, utility, and travel rules?", definitivePage: "/faq" },
      { question: "How do services combine across all event types?", definitivePage: "/events" },
    ],
    questionsToMoveToFaq: [
      "How is pricing calculated?",
      "What venue, utility, weather, setup, and travel requirements apply?",
      "What booking and payment terms apply?",
    ],
    futureResources: [
      {
        topic: "Baby shower planning guide",
        evidenceGate: "Several permissioned events with distinct menus, layouts, venue contexts, photography, and host insight.",
      },
    ],
  },
  {
    path: "/events/bridal-showers",
    pageName: "Bridal Showers",
    pageRole: "Own bridal-shower dessert selection, café-style hospitality, signage, styling, rentals, and cohesive setting decisions.",
    primaryIcps: ["wedding-clients", "private-event-clients", "industry-partners"],
    primaryQuestionThemes: [
      "Which desserts work well for bridal showers?",
      "How can coffee, matcha, dessert, signage, florals, and rentals work together?",
      "How should the service fit the shower schedule and room?",
    ],
    secondaryQuestionThemes: ["Which dessert format suits the gathering?", "How can the presentation be personalized?"],
    searchIntents: ["Informational", "Inspirational", "Commercial investigation", "Comparison"],
    requiredAnswers: [
      "Compare mini pancakes, waffles, and donuts for bridal-shower use without declaring one universally best.",
      "Explain cohesive service and setting possibilities without inventing packages.",
      "Connect to definitive menus, rental scope, and shared operating answers.",
    ],
    requiredFirstPartyEvidence: [
      "Approved bridal-shower applications",
      "Approved dessert framework",
      "Permissioned shower photography, styling examples, and testimonials",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review café-style drinks." },
      { href: "/experiences/sweet-cart", purpose: "Review dessert formats." },
      { href: "/experiences/seating-rentals", purpose: "Review room and rental planning." },
      { href: "/faq", purpose: "Move shared operating answers." },
      { href: "/contact", purpose: "Plan the bridal shower." },
    ],
    recommendedContentFormats: ["comparison", "decision guide", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What is the complete topping and dessert menu?", definitivePage: "/experiences/sweet-cart" },
      { question: "What are shared booking, travel, and setup policies?", definitivePage: "/faq" },
      { question: "Which services work for weddings more broadly?", definitivePage: "/events/weddings" },
    ],
    questionsToMoveToFaq: [
      "How much does each service cost?",
      "What venue, utility, staffing, setup, and travel requirements apply?",
      "What payment terms apply?",
    ],
    futureResources: [
      {
        topic: "Bridal shower dessert and setting guide",
        evidenceGate: "Permissioned examples with distinct formats, menus, layouts, venues, and first-hand planning insight.",
      },
    ],
  },
  {
    path: "/events/birthdays",
    pageName: "Birthdays",
    pageRole: "Own milestone birthday service fit, personalized menu and signage decisions, dessert interaction, and flexible setting combinations.",
    primaryIcps: ["private-event-clients", "industry-partners"],
    primaryQuestionThemes: [
      "Which coffee, non-coffee, dessert, signage, and rental options suit a birthday?",
      "How can the experience be personalized for the milestone?",
      "Which combinations suit adults, families, or mixed guest groups?",
    ],
    secondaryQuestionThemes: ["How does live dessert support the celebration?", "How should the layout support guest movement?"],
    searchIntents: ["Informational", "Inspirational", "Commercial investigation"],
    requiredAnswers: [
      "Explain birthday applications without implying one age group or fixed package.",
      "Show how menu, signage, dessert, and setting decisions work together.",
      "Link complete menus and operating policies to their owners.",
    ],
    requiredFirstPartyEvidence: [
      "Approved birthday applications",
      "Permissioned milestone and family-event photography",
      "Approved personalization examples and testimonials",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review coffee and non-coffee options." },
      { href: "/experiences/sweet-cart", purpose: "Review dessert options." },
      { href: "/experiences/seating-rentals", purpose: "Review setting options." },
      { href: "/faq", purpose: "Move shared operating answers." },
      { href: "/contact", purpose: "Plan the birthday." },
    ],
    recommendedContentFormats: ["decision guide", "concise answer", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What are the complete service menus and inclusions?", definitivePage: "/experiences" },
      { question: "What are shared travel, setup, and booking policies?", definitivePage: "/faq" },
      { question: "How do services fit other private occasions?", definitivePage: "/events/private-events" },
    ],
    questionsToMoveToFaq: [
      "How is pricing calculated?",
      "Which locations and travel fees apply?",
      "What staffing, utilities, setup, weather, and payment policies apply?",
    ],
    futureResources: [
      {
        topic: "Milestone birthday experience guide",
        evidenceGate: "A varied set of permissioned adult and family events with menus, layouts, imagery, and host insight.",
      },
    ],
  },
  {
    path: "/events/private-events",
    pageName: "Private Events",
    pageRole: "Own flexible private-event fit, outdoor rental planning, occasion combinations, and host-friendly decision support beyond named event categories.",
    primaryIcps: ["private-event-clients", "industry-partners"],
    primaryQuestionThemes: [
      "Which services suit engagements, anniversaries, graduations, holidays, and family gatherings?",
      "Which rentals may be needed for an outdoor event?",
      "How can services combine without forcing a standard format?",
    ],
    secondaryQuestionThemes: ["How should the host plan access and weather?", "How can the setting be personalized?"],
    searchIntents: ["Informational", "Inspirational", "Commercial investigation", "Logistical"],
    requiredAnswers: [
      "Explain flexible service fit across private occasions without creating a thin page for each one.",
      "Provide event-specific outdoor rental decision factors without calling any inventory universally required.",
      "Direct shared weather, utility, travel, and booking questions to FAQ.",
    ],
    requiredFirstPartyEvidence: [
      "Approved private-event applications",
      "Confirmed rental categories",
      "Permissioned private-event and outdoor photography",
      "Approved outdoor operating and rental policies",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Review beverage service." },
      { href: "/experiences/sweet-cart", purpose: "Review dessert service." },
      { href: "/experiences/seating-rentals", purpose: "Review outdoor and setting decisions." },
      { href: "/faq", purpose: "Move shared operating answers." },
      { href: "/contact", purpose: "Describe the private occasion." },
    ],
    recommendedContentFormats: ["decision guide", "planning checklist", "proof module", "FAQ"],
    questionsNotToDuplicate: [
      { question: "What exact rental inventory is available?", definitivePage: "/experiences/seating-rentals" },
      { question: "What are shared outdoor, travel, and setup policies?", definitivePage: "/faq" },
      { question: "What are complete menus and service inclusions?", definitivePage: "/experiences" },
    ],
    questionsToMoveToFaq: [
      "What happens in rain or unsafe weather?",
      "What exact utilities, setup, teardown, travel, and fee rules apply?",
      "What booking and payment policies apply?",
    ],
    futureResources: [
      {
        topic: "Outdoor private-event planning guide",
        evidenceGate: "Approved weather, tenting, surface, utility, rental, contingency, and responsibility policies plus real examples.",
      },
    ],
  },
  {
    path: "/gallery",
    pageName: "Gallery",
    pageRole: "Own permissioned visual proof and connect each image group to the service, event, location, and result it genuinely demonstrates.",
    primaryIcps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    primaryQuestionThemes: [
      "Has Luxe delivered work comparable to this event?",
      "What did the service, setting, branding, and guest interaction look like?",
      "Which page explains the service shown?",
    ],
    secondaryQuestionThemes: ["Is the proof permissioned and accurately captioned?", "What first-hand context supports each image?"],
    searchIntents: ["Inspirational", "Commercial investigation"],
    requiredAnswers: [
      "Group approved imagery by useful event or service context.",
      "Use accurate captions, alt text, permissions, and related-page links.",
      "Do not turn placeholders, organization names, or unapproved claims into case studies.",
    ],
    requiredFirstPartyEvidence: [
      "Permission-cleared original photography",
      "Accurate service, event, venue or location, and date context",
      "Approved captions, alt text, and usage permissions",
      "Permissioned outcomes or client commentary where claimed",
    ],
    requiredInternalLinks: [
      { href: "/experiences", purpose: "Explain the services shown." },
      { href: "/events", purpose: "Explain the event context shown." },
      { href: "/events/weddings", purpose: "Connect wedding proof." },
      { href: "/events/corporate-events", purpose: "Connect corporate proof." },
      { href: "/events/brand-activations", purpose: "Connect activation proof." },
      { href: "/contact", purpose: "Request a related experience." },
    ],
    recommendedContentFormats: ["proof module", "concise answer"],
    questionsNotToDuplicate: [
      { question: "What is included and how does each service work?", definitivePage: "/experiences" },
      { question: "How should a specific event be planned?", definitivePage: "/events" },
      { question: "What are the booking and operating policies?", definitivePage: "/faq" },
    ],
    questionsToMoveToFaq: [
      "What are the price, booking, travel, setup, and utility policies behind the work?",
      "What operational limits apply to a similar event?",
    ],
    futureResources: [
      {
        topic: "Event case studies",
        evidenceGate: "Permissioned narrative, client attribution, event facts, images, operating context, and substantiated outcomes.",
      },
    ],
  },
  {
    path: "/faq",
    pageName: "FAQ",
    pageRole: "Own shared booking, pricing, service-area, setup, logistics, policy, and cross-service customization answers that should not be repeated across conversion pages.",
    primaryIcps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    primaryQuestionThemes: [
      "How do booking, pricing, payment, service area, and travel work?",
      "What shared setup, utility, access, weather, and venue constraints apply?",
      "Which cross-service customization and booking answers are confirmed?",
    ],
    secondaryQuestionThemes: ["Which service or event page provides deeper context?", "Which facts remain dependencies?"],
    searchIntents: ["Informational", "Commercial investigation", "Transactional", "Local", "Logistical", "Troubleshooting"],
    requiredAnswers: [
      "Answer every visible FAQ directly and match FAQPage schema exactly.",
      "Use confirmed facts and explicit dependency boundaries rather than estimates.",
      "Link service- or event-specific questions to their definitive page.",
    ],
    requiredFirstPartyEvidence: [
      "Approved booking and payment policies",
      "Approved service areas and travel language",
      "Confirmed insurance and cross-service customization facts",
      "Approved shared operational and venue requirements where available",
    ],
    requiredInternalLinks: [
      { href: "/experiences/coffee-bar", purpose: "Move coffee-specific depth." },
      { href: "/experiences/sweet-cart", purpose: "Move dessert-specific depth." },
      { href: "/experiences/seating-rentals", purpose: "Move rental-specific depth." },
      { href: "/events", purpose: "Move occasion-specific planning." },
      { href: "/contact", purpose: "Continue after questions are answered." },
    ],
    recommendedContentFormats: ["FAQ", "concise answer", "requirements summary"],
    questionsNotToDuplicate: [
      { question: "What is the complete Coffee Bar experience and menu?", definitivePage: "/experiences/coffee-bar" },
      { question: "What is the complete Sweet Cart experience and menu?", definitivePage: "/experiences/sweet-cart" },
      { question: "How should a specific event type be planned?", definitivePage: "/events" },
    ],
    questionsToMoveToFaq: [],
    futureResources: [
      {
        topic: "Technical service specification",
        evidenceGate: "Approved division-specific footprint, power, water, staffing, throughput, setup, teardown, and outdoor limits.",
      },
      {
        topic: "Rental policies guide",
        evidenceGate: "Approved delivery, setup, pickup, damage, cancellation, weather, and change policies.",
      },
    ],
  },
  {
    path: "/contact",
    pageName: "Contact",
    pageRole: "Prepare a qualified prospect to provide the event, venue, service, operational, and branding details needed for a useful proposal.",
    primaryIcps: [
      "wedding-clients",
      "corporate-clients",
      "brand-agency-clients",
      "private-event-clients",
      "industry-partners",
    ],
    primaryQuestionThemes: [
      "What information should be prepared before inquiring?",
      "Which services and event context should be selected?",
      "What happens at the handoff to the booking platform?",
    ],
    secondaryQuestionThemes: ["Which unanswered policy should be reviewed first?", "Which contact method is available?"],
    searchIntents: ["Transactional", "Commercial investigation", "Logistical"],
    requiredAnswers: [
      "List the date, location, event, guest count, selected services, schedule, access, utilities, outdoor, rental, and branding inputs needed.",
      "Explain the third-party handoff accurately without inventing platform behavior.",
      "Provide direct contact options and links back to service, event, and FAQ context.",
    ],
    requiredFirstPartyEvidence: [
      "Approved inquiry fields",
      "Confirmed contact information",
      "Approved third-party platform URL, privacy treatment, tracking boundary, and return behavior",
    ],
    requiredInternalLinks: [
      { href: "/experiences", purpose: "Choose a service before inquiry." },
      { href: "/events", purpose: "Choose an event context." },
      { href: "/faq", purpose: "Resolve shared booking and logistics questions." },
    ],
    recommendedContentFormats: ["planning checklist", "process summary", "requirements summary"],
    questionsNotToDuplicate: [
      { question: "What does each service include?", definitivePage: "/experiences" },
      { question: "How should a specific event be planned?", definitivePage: "/events" },
      { question: "What are the complete booking, pricing, travel, and setup policies?", definitivePage: "/faq" },
    ],
    questionsToMoveToFaq: [
      "How is pricing calculated?",
      "What payment, service-area, travel, setup, weather, and utility policies apply?",
      "Which operational facts remain event-specific?",
    ],
    futureResources: [],
  },
];

const pageAeoBriefPaths = pageAeoBriefs.map((brief) => brief.path);

export const pageAeoBriefRules = [
  "A priority page answers only the questions assigned to its role.",
  "Shared booking, pricing, service-area, travel, utility, access, weather, and policy answers belong on FAQ.",
  "A page may summarize another page's definitive answer only far enough to support a useful internal link.",
  "A future resource is not authorized until its evidence gate is satisfied.",
  "No brief creates a new public route, schema type, testimonial, case study, or operating claim.",
] as const;

export const pageAeoBriefSummary = {
  briefCount: pageAeoBriefs.length,
  coveredPaths: pageAeoBriefPaths,
  missingPaths: primaryRoutes.filter((path) => !pageAeoBriefPaths.includes(path)),
  unknownPaths: pageAeoBriefPaths.filter(
    (path) => !primaryRoutes.includes(path as (typeof primaryRoutes)[number]),
  ),
  duplicatePaths: pageAeoBriefPaths.filter(
    (path, index, paths) => paths.indexOf(path) !== index,
  ),
  publicPageChanges: [] as string[],
  newRoutes: [] as string[],
};

export function getPageAeoBrief(path: string) {
  return pageAeoBriefs.find((brief) => brief.path === path);
}
