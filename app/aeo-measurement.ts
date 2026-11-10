import { eventTypes, primaryRoutes, siteConfig } from "./site-config";

export type AeoMeasurementSource =
  | "Google Search Console"
  | "Bing Webmaster Tools"
  | "approved web analytics"
  | "approved inquiry platform"
  | "sales question log"
  | "Google Business Profile";

export type AeoMetric = {
  metric: string;
  sources: AeoMeasurementSource[];
  dimensions: string[];
  method: string;
  decisionUse: string;
  availability: "available after verification" | "available after integration" | "manual process required";
};

const searchDimensions = [
  "query",
  "landing_page",
  "country",
  "device",
  "search_type",
  "date_range",
] as const;

export const aeoMetrics: AeoMetric[] = [
  {
    metric: "Non-branded search impressions",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: [...searchDimensions, "branded_or_non_branded"],
    method:
      "Exclude approved Luxe Event Co. and division-name variants from query exports; retain an auditable brand-term list.",
    decisionUse:
      "Find service, event, local, and planning topics earning visibility independently of existing brand awareness.",
    availability: "available after verification",
  },
  {
    metric: "Question-form queries",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: [...searchDimensions, "question_theme"],
    method:
      "Classify natural interrogative queries and question-intent phrases; do not rely only on punctuation.",
    decisionUse:
      "Improve the direct answer, heading, evidence, or internal link on the existing definitive page.",
    availability: "available after verification",
  },
  {
    metric: "Commercial investigation queries",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: [...searchDimensions, "service", "event_type", "commercial_theme"],
    method:
      "Group pricing, inclusion, availability, vendor-evaluation, customization, capacity, and booking-preparation language.",
    decisionUse:
      "Strengthen commercial clarity before the inquiry CTA without publishing unsupported rates.",
    availability: "available after verification",
  },
  {
    metric: "Local-intent queries",
    sources: [
      "Google Search Console",
      "Bing Webmaster Tools",
      "Google Business Profile",
    ],
    dimensions: [...searchDimensions, "location", "service"],
    method:
      "Group Toronto, GTA, approved service-area place names, near-me intent, venue-area language, and qualified Southern Ontario intent.",
    decisionUse:
      "Improve local context on the relevant existing page without creating city variants.",
    availability: "available after verification",
  },
  {
    metric: "Comparison queries",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: [...searchDimensions, "comparison_topic", "service"],
    method:
      "Group versus, difference, alternative, better-for, included-versus-add-on, and coordinated-provider decision language.",
    decisionUse:
      "Refine neutral decision factors on the page that owns the comparison.",
    availability: "available after verification",
  },
  {
    metric: "Long-tail query growth",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: [...searchDimensions, "topic_cluster", "first_seen_or_returning"],
    method:
      "Measure growth in specific multi-concept queries and newly observed planning questions by topic cluster, not by an arbitrary word-count rule alone.",
    decisionUse:
      "Expand an existing answer when several related queries expose the same useful missing detail.",
    availability: "available after verification",
  },
  {
    metric: "Landing-page clicks",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: ["landing_page", "query_cluster", "search_type", "device", "date_range"],
    method: "Use canonical landing pages and segment search type where supported.",
    decisionUse:
      "Identify which definitive pages attract qualified discovery and which need clearer search presentation.",
    availability: "available after verification",
  },
  {
    metric: "Search click-through rate",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: ["landing_page", "query_cluster", "device", "search_type", "average_position", "date_range"],
    method:
      "Evaluate clicks divided by impressions within comparable query, position, device, and search-type contexts.",
    decisionUse:
      "Review title, description, answer alignment, and intent fit before changing page scope.",
    availability: "available after verification",
  },
  {
    metric: "Search visibility by service",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: ["service", "landing_page", "query_cluster", "impressions", "clicks", "average_position"],
    method:
      "Map queries and canonical pages to Coffee Bar, Sweet Cart, Event Rentals, or coordinated experiences.",
    decisionUse:
      "Compare demand and content gaps across divisions without treating raw impressions as bookings.",
    availability: "available after verification",
  },
  {
    metric: "Search visibility by event type",
    sources: ["Google Search Console", "Bing Webmaster Tools"],
    dimensions: ["event_type", "landing_page", "query_cluster", "impressions", "clicks", "average_position"],
    method:
      "Map event-intent queries and canonical pages to the approved event taxonomy.",
    decisionUse:
      "Improve occasion-specific planning answers on the existing event page.",
    availability: "available after verification",
  },
  {
    metric: "Image-search performance",
    sources: ["Google Search Console"],
    dimensions: ["landing_page", "query_cluster", "device", "impressions", "clicks", "date_range"],
    method:
      "Segment the Search Console performance report by image search and review the landing page and permissioned asset context.",
    decisionUse:
      "Improve approved filenames, alt text, captions, surrounding context, and image-page relevance.",
    availability: "available after verification",
  },
  {
    metric: "Engagement with comparison sections",
    sources: ["approved web analytics"],
    dimensions: ["landing_page", "source_path", "section_id", "interaction_type", "destination_path"],
    method:
      "Use comparison_section_engagement for the approved engaged-view threshold, disclosure action, or comparison-link activation.",
    decisionUse:
      "Clarify decision factors and next steps on comparison sections that attract attention but do not support progression.",
    availability: "available after integration",
  },
  {
    metric: "Engagement with logistics sections",
    sources: ["approved web analytics"],
    dimensions: ["landing_page", "source_path", "section_id", "interaction_type", "destination_path"],
    method:
      "Use logistics_section_engagement for the approved engaged-view threshold, FAQ disclosure action, or planning-link activation.",
    decisionUse:
      "Prioritize operational confirmation and improve unclear planning guidance on its existing owner page.",
    availability: "available after integration",
  },
  {
    metric: "Inquiry starts by landing page",
    sources: ["approved web analytics"],
    dimensions: ["landing_page", "source_path", "service", "event_type", "journey_type"],
    method:
      "Attribute inquiry_start to the first canonical landing page in the approved attribution window and retain the CTA source path.",
    decisionUse:
      "Compare which search entrances begin inquiry journeys without claiming completion.",
    availability: "available after integration",
  },
  {
    metric: "Inquiry handoffs by landing page",
    sources: ["approved web analytics", "approved inquiry platform"],
    dimensions: ["landing_page", "source_path", "service", "event_type", "handoff_method"],
    method:
      "Attribute inquiry_handoff separately from inquiry_start and from any reliable confirmation return.",
    decisionUse:
      "Find landing pages that begin interest but lose continuity before the external inquiry handoff.",
    availability: "available after integration",
  },
  {
    metric: "New questions appearing in sales inquiries",
    sources: ["sales question log", "approved inquiry platform"],
    dimensions: ["question_theme", "service", "event_type", "funnel_stage", "first_seen_date", "frequency"],
    method:
      "Record an anonymized normalized question theme; never copy personal details or free-text inquiry content into analytics.",
    decisionUse:
      "Update the definitive existing answer when a recurring, material question is not answered clearly.",
    availability: "manual process required",
  },
  {
    metric: "AI-search referrals where identifiable",
    sources: ["approved web analytics"],
    dimensions: ["referrer_category", "landing_page", "source_path", "service", "event_type"],
    method:
      "Report only identifiable referrers or approved campaign parameters; classify direct or stripped-referrer traffic as unknown rather than AI.",
    decisionUse:
      "Evaluate the landing pages and answers receiving attributable AI-assisted discovery without overstating total AI visibility.",
    availability: "available after integration",
  },
  {
    metric: "Changes in branded search demand",
    sources: [
      "Google Search Console",
      "Bing Webmaster Tools",
      "Google Business Profile",
    ],
    dimensions: ["brand_term_group", "impressions", "clicks", "location", "date_range"],
    method:
      "Track parent-brand and division-name groups separately, preserving the same brand-term definitions across periods.",
    decisionUse:
      "Distinguish awareness changes from non-branded topic visibility and monitor division-to-parent-brand relationships.",
    availability: "available after verification",
  },
];

export const brandQueryGroups = {
  parentBrand: [siteConfig.name, "Luxe Event Co", "Luxe Event Company"],
  coffeeDivision: ["Luxe Coffee Bar", "Luxe Coffee Cart"],
  sweetDivision: ["Luxe Sweet Cart"],
  seatingDivision: ["Luxe Event Rentals"],
} as const;

export const serviceVisibilityGroups = [
  { id: "coffee-bar", paths: ["/experiences/coffee-bar"] },
  { id: "sweet-cart", paths: ["/experiences/sweet-cart"] },
  { id: "seating-rentals", paths: ["/experiences/seating-rentals"] },
  { id: "coordinated-experiences", paths: ["/", "/experiences"] },
] as const;

export const eventVisibilityGroups = eventTypes.map((event) => ({
  id: event.slug,
  path: `/events/${event.slug}`,
}));

export const measurementCadence = [
  {
    cadence: "monthly",
    work:
      "Export search performance, refresh query classifications, review canonical landing pages, and reconcile new sales-question themes.",
  },
  {
    cadence: "quarterly",
    work:
      "Review service and event visibility, image search, section engagement, inquiry progression, branded demand, and evidence dependencies together.",
  },
  {
    cadence: "after a material page change",
    work:
      "Annotate the change date and compare equivalent periods only after enough new data exists to avoid reacting to noise.",
  },
] as const;

export const existingPageImprovementWorkflow = [
  "Assign the finding to the definitive existing page and confirm that the observed query or question matches that page's responsibility.",
  "Diagnose the gap as presentation, directness, missing evidence, operational uncertainty, internal linking, or conversion continuity.",
  "Improve the smallest useful element: title or description, direct answer, decision factors, proof, caption, internal link, or inquiry handoff.",
  "Annotate the change and monitor the same metric and query cluster before expanding page scope.",
  "Create a new page only when the intent is materially distinct, repeatedly evidenced, cannot be satisfied without diluting the existing page, and has enough original evidence to support a useful standalone resource.",
] as const;

export const aeoMeasurementDependencies = [
  "Verify the canonical domain in Google Search Console and Bing Webmaster Tools.",
  "Select the analytics provider, property, consent behavior, retention settings, and reporting access.",
  "Approve one engaged-view threshold and attribution window before enabling section or landing-page conversion reporting.",
  "Confirm the production inquiry platform, handoff URL, permitted context, and reliable completion signal if one exists.",
  "Create an anonymized sales-question logging owner and cadence.",
  "Keep query exports and reporting aggregate; do not join search queries to identifiable inquiry records.",
] as const;

export const aeoMeasurementAudit = {
  requestedMetricCount: 18,
  configuredMetricCount: aeoMetrics.length,
  canonicalRoutesCovered: primaryRoutes.length,
  analyticsStatus: siteConfig.analytics.status,
  searchConsoleStatus: siteConfig.searchConsole.status,
  speculativeTrackersInstalled: [] as string[],
  newContentRoutes: [] as string[],
} as const;
