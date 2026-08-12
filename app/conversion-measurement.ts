import { primaryRoutes } from "./site-config";

export type MeasurementEvent = {
  name: string;
  category: "navigation" | "discovery" | "engagement" | "conversion" | "outcome";
  required: boolean;
  trigger: string;
  pages: string[];
  parameters: string[];
  interpretation: string;
  source: "master-specification" | "client-intake" | "both";
};

const allPages = [...primaryRoutes];
const experiencePages = [
  "/experiences/coffee-bar",
  "/experiences/sweet-cart",
  "/experiences/seating-rentals",
];
const eventPages = [
  "/events/weddings",
  "/events/corporate-events",
  "/events/brand-activations",
  "/events/baby-showers",
  "/events/bridal-showers",
  "/events/birthdays",
  "/events/private-events",
];

export const measurementEvents: MeasurementEvent[] = [
  {
    name: "primary_navigation_click",
    category: "navigation",
    required: true,
    trigger: "A visitor activates a primary site navigation link.",
    pages: allPages,
    parameters: ["link_label", "destination_path", "source_path", "viewport_class"],
    interpretation: "Shows which top-level journeys visitors choose and whether navigation is distributing attention across the platform.",
    source: "master-specification",
  },
  {
    name: "experience_select",
    category: "discovery",
    required: true,
    trigger: "A visitor selects a division or experience from an experience selector or related-experience module.",
    pages: ["/", "/experiences", ...experiencePages, ...eventPages],
    parameters: ["experience_slug", "source_path", "selector_location", "selection_mode"],
    interpretation: "Measures demand for Coffee Bar, Sweet Cart, and Seating Rentals and the contexts that introduce them.",
    source: "master-specification",
  },
  {
    name: "event_type_select",
    category: "discovery",
    required: true,
    trigger: "A visitor selects an event type from an event selector or event-context module.",
    pages: ["/", "/events", "/experiences", ...experiencePages],
    parameters: ["event_type", "source_path", "selector_location"],
    interpretation: "Shows which event applications create the strongest entry and progression signals.",
    source: "master-specification",
  },
  {
    name: "service_page_view",
    category: "discovery",
    required: true,
    trigger: "A service division page becomes visible after the page has loaded.",
    pages: experiencePages,
    parameters: ["service_slug", "page_path", "referrer_path", "entry_type"],
    interpretation: "Measures qualified interest in each division rather than relying only on raw pageviews.",
    source: "master-specification",
  },
  {
    name: "event_page_view",
    category: "discovery",
    required: true,
    trigger: "An event application page becomes visible after the page has loaded.",
    pages: eventPages,
    parameters: ["event_type", "page_path", "referrer_path", "entry_type"],
    interpretation: "Measures demand by event context and supports audience-specific conversion analysis.",
    source: "master-specification",
  },
  {
    name: "combined_experience_select",
    category: "discovery",
    required: true,
    trigger: "A visitor selects or expresses interest in two or more Luxe divisions in the same journey.",
    pages: ["/", "/experiences", "/events", ...experiencePages, ...eventPages, "/contact"],
    parameters: ["experience_slugs", "source_path", "selection_location", "event_type"],
    interpretation: "Measures the parent-brand cross-sell and multi-service journey described in the intake.",
    source: "both",
  },
  {
    name: "gallery_filter",
    category: "engagement",
    required: true,
    trigger: "A visitor filters the gallery by division, event type, or other approved taxonomy.",
    pages: ["/gallery"],
    parameters: ["filter_type", "filter_value", "result_count"],
    interpretation: "Shows which proof categories visitors use to evaluate Luxe experiences.",
    source: "master-specification",
  },
  {
    name: "gallery_item_open",
    category: "engagement",
    required: true,
    trigger: "A visitor opens a gallery item or case-study detail.",
    pages: ["/gallery"],
    parameters: ["gallery_item_id", "experience_slug", "event_type", "filter_state"],
    interpretation: "Measures which first-party proof assets attract deeper attention.",
    source: "master-specification",
  },
  {
    name: "comparison_section_engagement",
    category: "engagement",
    required: true,
    trigger:
      "A visitor reaches the approved engagement threshold for a comparison section or activates a comparison link.",
    pages: ["/experiences", ...experiencePages, ...eventPages],
    parameters: [
      "section_id",
      "source_path",
      "interaction_type",
      "destination_path",
      "service_slug",
      "event_type",
    ],
    interpretation:
      "Shows whether comparison guidance helps visitors evaluate options and continue to a relevant service, event, or inquiry path.",
    source: "master-specification",
  },
  {
    name: "logistics_section_engagement",
    category: "engagement",
    required: true,
    trigger:
      "A visitor reaches the approved engagement threshold for a logistics section or opens or activates its planning detail.",
    pages: ["/faq", ...experiencePages, ...eventPages],
    parameters: [
      "section_id",
      "source_path",
      "interaction_type",
      "destination_path",
      "service_slug",
      "event_type",
    ],
    interpretation:
      "Shows which operating questions support evaluation, expose uncertainty, or lead visitors toward an inquiry.",
    source: "master-specification",
  },
  {
    name: "testimonial_interaction",
    category: "engagement",
    required: true,
    trigger: "A visitor expands, scrolls to, or otherwise interacts with a testimonial block where interaction exists.",
    pages: allPages,
    parameters: ["testimonial_id", "associated_experience", "associated_event", "interaction_type"],
    interpretation: "Measures engagement with trust proof without treating passive visibility as intent.",
    source: "master-specification",
  },
  {
    name: "inquiry_start",
    category: "conversion",
    required: true,
    trigger: "A visitor activates an inquiry CTA or begins the approved inquiry flow.",
    pages: allPages,
    parameters: ["source_path", "cta_label", "experience_slug", "event_type", "journey_type"],
    interpretation: "Primary on-site conversion signal for qualified interest.",
    source: "both",
  },
  {
    name: "inquiry_handoff",
    category: "conversion",
    required: true,
    trigger: "The visitor is handed from the Luxe website to the approved third-party inquiry or proposal platform.",
    pages: ["/contact"],
    parameters: ["source_path", "destination_host", "experience_slug", "event_type", "handoff_method"],
    interpretation: "Measures successful transfer from owned website experience to the booking workflow.",
    source: "both",
  },
  {
    name: "phone_click",
    category: "conversion",
    required: true,
    trigger: "A visitor activates a telephone link.",
    pages: allPages,
    parameters: ["source_path", "link_location", "page_context"],
    interpretation: "Measures direct-contact intent from visitors who prefer a phone conversation.",
    source: "master-specification",
  },
  {
    name: "email_click",
    category: "conversion",
    required: true,
    trigger: "A visitor activates a mailto link.",
    pages: allPages,
    parameters: ["source_path", "link_location", "page_context"],
    interpretation: "Measures direct-contact intent through email.",
    source: "master-specification",
  },
  {
    name: "social_click",
    category: "engagement",
    required: true,
    trigger: "A visitor activates a Luxe division social link.",
    pages: allPages,
    parameters: ["platform", "division_slug", "source_path", "link_location"],
    interpretation: "Measures social proof and division-level discovery outside the website.",
    source: "master-specification",
  },
  {
    name: "menu_download",
    category: "conversion",
    required: false,
    trigger: "A visitor downloads an approved menu, package, or planning PDF if one is introduced.",
    pages: allPages,
    parameters: ["asset_name", "asset_type", "source_path", "experience_slug", "event_type"],
    interpretation: "Measures high-intent engagement with downloadable planning information.",
    source: "master-specification",
  },
  {
    name: "confirmation_return",
    category: "outcome",
    required: false,
    trigger: "A visitor returns to an approved confirmation page after completing the third-party inquiry flow, if supported.",
    pages: ["/contact"],
    parameters: ["confirmation_source", "experience_slug", "event_type", "return_method"],
    interpretation: "Measures confirmed completion only when the external platform provides a reliable return signal.",
    source: "both",
  },
];

export const measurementRules = [
  "Use the event names in this contract exactly unless a later analytics-platform constraint is approved.",
  "Do not send names, email addresses, phone numbers, event dates, free-text inquiry content, or other direct personal information as analytics parameters.",
  "Use stable slugs for experiences and event types rather than display text that may change.",
  "Track page views through service_page_view and event_page_view rather than inventing a separate event for every URL.",
  "Keep inquiry_handoff and confirmation_return distinct; a handoff is not proof that an inquiry was submitted.",
  "Attribute inquiry starts and handoffs to the landing page and current source path without attaching personal inquiry details.",
  "Use the same approved section-engagement threshold for comparisons and logistics; record link or disclosure actions separately from passive visibility.",
  "Only enable PDF/menu tracking after the asset and event purpose are approved.",
  "Choose the analytics provider, consent mechanism, retention settings, and reporting destination before production tracking is installed.",
  "Measure conversion quality with inquiry context and eventual booking data when the approved platform makes that data available lawfully.",
] as const;

export const measurementDependencies = [
  "Production GA4 and Meta Pixel identifiers must be configured in the hosting environment.",
  "Consent and privacy configuration must be approved before non-essential analytics are enabled.",
  "The production inquiry-platform URL and handoff method are not yet confirmed.",
  "A reliable confirmation return is dependent on the third-party platform.",
  "Future CRM, quote, deposit, and booking outcomes require an approved integration and data-governance decision.",
] as const;

export const measurementSummary = {
  eventNames: measurementEvents.map((event) => event.name),
  requiredEvents: measurementEvents.filter((event) => event.required).map((event) => event.name),
  optionalEvents: measurementEvents.filter((event) => !event.required).map((event) => event.name),
  trackedRoutes: allPages,
};

export function getMeasurementEvent(name: string) {
  return measurementEvents.find((event) => event.name === name);
}
