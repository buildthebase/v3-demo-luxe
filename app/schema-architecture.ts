import { experiences, siteConfig } from "./site-config";

export type SchemaPlan = {
  path: string;
  primaryTypes: string[];
  entities: string[];
  requirements: string[];
  exclusions: string[];
};

export const schemaEntityArchitecture = {
  organization: {
    id: `${siteConfig.url}/#organization`,
    type: "Organization",
    name: siteConfig.organization.publicName,
    relationship: "Parent organization for all three Luxe divisions.",
    sameAs: [],
  },
  divisions: experiences.map((experience) => ({
    id: `${siteConfig.url}/#${experience.slug}-division`,
    type: "Organization",
    name: experience.name,
    parent: `${siteConfig.url}/#organization`,
    sameAs: [experience.instagram],
  })),
  services: experiences.map((experience) => ({
    id: `${siteConfig.url}/#${experience.slug}-service`,
    type: "Service",
    name: experience.name,
    provider: `${siteConfig.url}/#organization`,
    brand: `${siteConfig.url}/#${experience.slug}-division`,
  })),
  canonicalHost: siteConfig.url,
  language: siteConfig.language,
};

const sharedRequirements = [
  "Use stable @id values connected to the parent organization.",
  `Use canonical URLs from ${siteConfig.domain.primary} only.`,
  "Ensure structured data matches visible page content.",
  "Keep important claims in visible text as well as structured data.",
  "Validate rendered HTML before production release.",
];

const noEventSchema = "Do not use Event schema for service pages or event-application pages describing types of events rather than one specific public event with a date and location.";

export const schemaPlans: SchemaPlan[] = [
  { path: "/", primaryTypes: ["Organization", "WebSite", "WebPage", "ImageObject"], entities: ["organization", "all divisions"], requirements: [...sharedRequirements, "Add LocalBusiness only when the business/profile/address model is accurate."], exclusions: ["No unsupported physical address", "No Event schema"] },
  { path: "/experiences", primaryTypes: ["CollectionPage", "ItemList", "BreadcrumbList", "WebPage"], entities: ["organization", "all divisions"], requirements: [...sharedRequirements, "ItemList entries must be visibly represented as experiences."], exclusions: ["No generic Product catalogue schema"] },
  { path: "/experiences/coffee-bar", primaryTypes: ["Service", "BreadcrumbList", "WebPage"], entities: ["organization", "Luxe Coffee Bar"], requirements: [...sharedRequirements, "Service provider must be the Luxe organization."], exclusions: [noEventSchema] },
  { path: "/experiences/sweet-cart", primaryTypes: ["Service", "BreadcrumbList", "WebPage"], entities: ["organization", "Luxe Sweet Cart"], requirements: [...sharedRequirements, "Service provider must be the Luxe organization."], exclusions: [noEventSchema] },
  { path: "/experiences/seating-rentals", primaryTypes: ["Service", "BreadcrumbList", "WebPage"], entities: ["organization", "Luxe Event Rentals"], requirements: [...sharedRequirements, "Service provider must be the Luxe organization."], exclusions: [noEventSchema] },
  { path: "/events", primaryTypes: ["CollectionPage", "ItemList", "BreadcrumbList", "WebPage"], entities: ["organization", "event application entities"], requirements: [...sharedRequirements], exclusions: [noEventSchema] },
  ...["weddings", "corporate-events", "brand-activations", "baby-showers", "bridal-showers", "birthdays", "private-events"].map((slug) => ({ path: `/events/${slug}`, primaryTypes: ["Service", "BreadcrumbList", "WebPage"], entities: ["organization", "relevant divisions", slug], requirements: [...sharedRequirements, "Link visible service relationships to the relevant division entities."], exclusions: [noEventSchema] })),
  { path: "/gallery", primaryTypes: ["CollectionPage", "ImageObject", "BreadcrumbList", "WebPage"], entities: ["organization", "approved image groups"], requirements: [...sharedRequirements, "Image metadata must identify the associated experience or event context when approved."], exclusions: ["No image claims without permission"] },
  { path: "/faq", primaryTypes: ["FAQPage when accurately implemented", "BreadcrumbList", "WebPage"], entities: ["organization", "relevant division and event entities"], requirements: [...sharedRequirements, "FAQ markup must match visible questions and answers."], exclusions: ["Do not promise a Google FAQ rich result", "Do not mark up hidden or incomplete answers"] },
  { path: "/contact", primaryTypes: ["ContactPage", "BreadcrumbList", "WebPage"], entities: ["organization"], requirements: [...sharedRequirements, "Contact details must match the approved public contact information."], exclusions: ["No third-party inquiry platform as a primary site entity", "No invented offer or transaction schema"] },
];

export const schemaRules = [
  "Schema is a representation of visible, accurate content, not a place to add unsupported claims.",
  "The parent organization remains the primary entity across the graph.",
  "Division Service entities are connected through provider and parent relationships.",
  "LocalBusiness is conditional on accurate business-profile and address/service-area facts.",
  "FAQPage is conditional on visible approved answers and is not a promise of a Google rich result.",
  "Do not use Event schema for Weddings, Corporate Events, Brand Activations, or other service pages unless the page is for one specific public event with a date and location.",
  "Do not add schema solely to target AI Overviews or AI Mode; follow foundational SEO and structured-data requirements.",
  "Do not add AggregateRating or Review markup for self-serving reviews of Luxe Event Co. or its divisions.",
] as const;

export const structuredDataDecisions = {
  localBusiness:
    "Omitted until Luxe confirms a legitimate public business address and a matching public local-business profile. Service-area names do not substitute for a physical LocalBusiness address.",
  organizationSameAs:
    "The parent Organization does not claim the three division Instagram profiles as sameAs identities. Each division Organization owns its corresponding profile instead.",
  serviceImages:
    "Service image properties remain omitted until approved, representative service photography is published on the corresponding page. Social cards and decorative CSS compositions are not treated as event proof.",
  serviceMarkup:
    "Service entities provide machine-readable context and are not presented as Google rich-result features.",
  faqMarkup:
    "FAQPage is retained only where the visible questions and answers come from the same content records. It is not presented as a Google rich-result feature.",
  pageSubtypes:
    "CollectionPage, FAQPage, and ContactPage are represented as WebPage subtypes on one page entity instead of duplicate page nodes.",
  globalGraph:
    "The complete Organization, WebSite, division, logo, and stable division-service graph is emitted on Home. Other pages reference those stable IDs and emit only page-relevant entities.",
} as const;

export const schemaArchitectureSummary = {
  coveredRoutes: schemaPlans.map((plan) => plan.path),
  entityIds: [
    schemaEntityArchitecture.organization.id,
    ...schemaEntityArchitecture.divisions.map((division) => division.id),
    ...schemaEntityArchitecture.services.map((service) => service.id),
  ],
};

export function getSchemaPlan(path: string) {
  return schemaPlans.find((plan) => plan.path === path);
}
