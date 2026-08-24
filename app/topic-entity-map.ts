import { entityNames } from "./entity-names";
import { experiences, eventTypes, primaryRoutes, siteConfig } from "./site-config";

export type TopicEntityKind =
  | "parent"
  | "division"
  | "service"
  | "event"
  | "geography";

export type TopicEntity = {
  slug: string;
  name: string;
  kind: TopicEntityKind;
  canonicalPath?: string;
  parentSlug?: string;
  notes?: string;
};

export type TopicRelationship = {
  from: string;
  relation: "contains" | "offers" | "serves" | "available-in" | "supports";
  to: string;
};

export const parentEntity: TopicEntity = {
  slug: entityNames.parentBrand.stableKey,
  name: siteConfig.name,
  kind: "parent",
  canonicalPath: "/",
  notes: "Primary organization and coordinating event platform.",
};

export const divisionEntities: TopicEntity[] = experiences.map((experience) => ({
  slug: experience.slug,
  name: experience.name,
  kind: "division",
  canonicalPath: experience.landingPath,
  parentSlug: parentEntity.slug,
}));

export const serviceEntities: TopicEntity[] = [
  ["cafe-cart-experience", entityNames.coffeeExperiences.cafeCart.shortName, "coffee-bar"],
  ["signature-coffee-bar-experience", entityNames.coffeeExperiences.signatureCoffeeBar.shortName, "coffee-bar"],
  ["espresso-service", "Specialty coffee service", "coffee-bar"],
  ["matcha-service", "Matcha service", "coffee-bar"],
  ["seasonal-beverages", "Seasonal beverages", "coffee-bar"],
  ["mini-dutch-pancakes", "Mini Dutch pancakes", "sweet-cart"],
  ["belgian-waffles-on-a-stick", "Belgian waffles on a stick", "sweet-cart"],
  ["mini-donuts", "Mini donuts", "sweet-cart"],
  ["soft-serve", "Soft serve", "sweet-cart"],
  ["white-resin-chairs", "White resin chairs", "seating-rentals"],
  ["six-foot-rectangular-tables", "6-ft rectangular tables", "seating-rentals"],
  ["cocktail-tables", "Cocktail tables", "seating-rentals"],
  ["event-tents", "20-ft, 15-ft, and 10-ft event tents", "seating-rentals"],
  ["linens", "Linens", "seating-rentals"],
  ["tent-walls", "Tent walls", "seating-rentals"],
  ["tent-lighting", "Tent lighting", "seating-rentals"],
  ["dance-floor", "18-ft by 18-ft dance floor", "seating-rentals"],
  ["event-setup-and-teardown", "Event setup and teardown", "luxe-event-co"],
  ["custom-branding", "Custom branding", "luxe-event-co"],
  ["signage", "Signage", "luxe-event-co"],
  ["coordinated-multi-service-experiences", "Coordinated multi-service experiences", "luxe-event-co"],
].map(([slug, name, parentSlug]) => ({
  slug,
  name,
  kind: "service",
  parentSlug,
}));

const eventDefinitions: [string, string, string | undefined][] = [
  ["weddings", "Weddings", "/events/weddings"],
  ["corporate-events", "Corporate events", "/events/corporate-events"],
  ["brand-activations", "Brand activations", "/events/brand-activations"],
  ["baby-showers", "Baby showers", "/events/baby-showers"],
  ["bridal-showers", "Bridal showers", "/events/bridal-showers"],
  ["birthdays", "Birthdays", "/events/birthdays"],
  ["private-events", "Private events", "/events/private-events"],
  ["grand-openings", "Grand openings", undefined],
  ["conferences", "Conferences", undefined],
  ["product-launches", "Product launches", undefined],
  ["employee-appreciation", "Employee appreciation events", undefined],
  ["client-appreciation", "Client appreciation events", undefined],
  ["trade-shows", "Trade shows", undefined],
  ["holiday-parties", "Holiday parties", undefined],
  ["engagements", "Engagements", undefined],
  ["anniversaries", "Anniversaries", undefined],
  ["graduations", "Graduations", undefined],
];

export const eventEntities: TopicEntity[] = eventDefinitions.map(([slug, name, canonicalPath]) => ({
  slug,
  name,
  kind: "event",
  canonicalPath,
  parentSlug: parentEntity.slug,
  notes: canonicalPath ? "Approved indexable event route." : "Contextual event application; not a standalone indexable route yet.",
}));

const geographyDefinitions: [string, string, string | undefined][] = [
  ["toronto", entityNames.geography.toronto, "greater-toronto-area"],
  ["greater-toronto-area", entityNames.geography.greaterTorontoArea, "southern-ontario"],
  ["scarborough", "Scarborough", "greater-toronto-area"],
  ["markham", "Markham", "greater-toronto-area"],
  ["vaughan", "Vaughan", "greater-toronto-area"],
  ["richmond-hill", "Richmond Hill", "greater-toronto-area"],
  ["aurora", "Aurora", "greater-toronto-area"],
  ["newmarket", "Newmarket", "greater-toronto-area"],
  ["king-city", "King City", "greater-toronto-area"],
  ["thornhill", "Thornhill", "greater-toronto-area"],
  ["north-york", "North York", "greater-toronto-area"],
  ["mississauga", "Mississauga", "greater-toronto-area"],
  ["brampton", "Brampton", "greater-toronto-area"],
  ["oakville", "Oakville", "greater-toronto-area"],
  ["burlington", "Burlington", "greater-toronto-area"],
  ["milton", "Milton", "greater-toronto-area"],
  ["pickering", "Pickering", "greater-toronto-area"],
  ["ajax", "Ajax", "greater-toronto-area"],
  ["whitby", "Whitby", "greater-toronto-area"],
  ["oshawa", "Oshawa", "greater-toronto-area"],
  ["southern-ontario", entityNames.geography.southernOntario, undefined],
];

export const geographyEntities: TopicEntity[] = geographyDefinitions.map(([slug, name, parentSlug]) => ({
  slug,
  name,
  kind: "geography",
  parentSlug,
  notes: slug === "southern-ontario" ? "Select destination-event context with applicable travel fees." : undefined,
}));

export const topicEntities: TopicEntity[] = [
  parentEntity,
  ...divisionEntities,
  ...serviceEntities,
  ...eventEntities,
  ...geographyEntities,
];

const serviceSlugsByDivision = new Map<string, string[]>([
  ["coffee-bar", serviceEntities.filter((service) => service.parentSlug === "coffee-bar").map((service) => service.slug)],
  ["sweet-cart", serviceEntities.filter((service) => service.parentSlug === "sweet-cart").map((service) => service.slug)],
  ["seating-rentals", serviceEntities.filter((service) => service.parentSlug === "seating-rentals").map((service) => service.slug)],
  ["luxe-event-co", serviceEntities.filter((service) => service.parentSlug === "luxe-event-co").map((service) => service.slug)],
]);

const eventSlugsByDivision = new Map<string, string[]>([
  ["coffee-bar", ["weddings", "corporate-events", "brand-activations", "baby-showers", "bridal-showers", "birthdays", "private-events", "grand-openings", "conferences", "product-launches", "employee-appreciation", "client-appreciation", "trade-shows", "holiday-parties"]],
  ["sweet-cart", ["weddings", "corporate-events", "brand-activations", "baby-showers", "bridal-showers", "birthdays", "private-events", "grand-openings", "conferences", "product-launches", "employee-appreciation", "client-appreciation", "trade-shows", "holiday-parties", "engagements", "anniversaries", "graduations"]],
  ["seating-rentals", ["weddings", "baby-showers", "bridal-showers", "birthdays", "private-events", "engagements", "anniversaries", "graduations"]],
]);

export const topicRelationships: TopicRelationship[] = [
  ...divisionEntities.map((division) => ({ from: parentEntity.slug, relation: "contains" as const, to: division.slug })),
  ...serviceEntities.map((service) => ({ from: service.parentSlug ?? parentEntity.slug, relation: "offers" as const, to: service.slug })),
  ...[...eventSlugsByDivision.entries()].flatMap(([divisionSlug, eventSlugs]) => eventSlugs.map((eventSlug) => ({ from: divisionSlug, relation: "serves" as const, to: eventSlug }))),
  ...geographyEntities.filter((geography) => geography.parentSlug).map((geography) => ({ from: geography.parentSlug!, relation: "contains" as const, to: geography.slug })),
  ...divisionEntities.flatMap((division) => geographyEntities.filter((geography) => geography.slug !== "southern-ontario").map((geography) => ({ from: division.slug, relation: "available-in" as const, to: geography.slug }))),
  { from: parentEntity.slug, relation: "available-in", to: "southern-ontario" },
  { from: "coordinated-multi-service-experiences", relation: "supports", to: "coffee-bar" },
  { from: "coordinated-multi-service-experiences", relation: "supports", to: "sweet-cart" },
  { from: "coordinated-multi-service-experiences", relation: "supports", to: "seating-rentals" },
];

export const topicMapContentUses = [
  "page-copy",
  "internal-linking",
  "structured-data",
  "faq-content",
  "image-captions",
  "metadata",
  "future-resource-content",
  "local-search-expansion",
] as const;

export const topicMapSummary = {
  parent: parentEntity.slug,
  divisions: divisionEntities.map((entity) => entity.slug),
  coreServices: serviceEntities.map((entity) => entity.slug),
  eventTypes: eventEntities.map((entity) => entity.slug),
  geographicContext: geographyEntities.map((entity) => entity.slug),
  indexableRoutes: primaryRoutes,
  contentUses: topicMapContentUses,
  serviceSlugsByDivision,
};

export function getTopicEntity(slug: string) {
  return topicEntities.find((entity) => entity.slug === slug);
}

export function getTopicRelationships(slug: string) {
  return topicRelationships.filter((relationship) => relationship.from === slug || relationship.to === slug);
}

export function getEventRoute(slug: string) {
  return eventTypes.find((event) => event.slug === slug)?.slug
    ? `/events/${slug}`
    : undefined;
}
