import { entityNames } from "./entity-names";
import { eventTypes, experiences, siteConfig } from "./site-config";

export const canonicalEntityVocabulary = {
  parentBrand: {
    internalKey: entityNames.parentBrand.stableKey,
    currentName: entityNames.parentBrand.currentName,
    role: "Parent organization and coordinating inquiry point",
    canonicalPath: "/",
    schemaId: `${siteConfig.url}/#organization`,
    nameStatus: entityNames.parentBrand.nameStatus,
  },
  divisions: experiences.map((experience) => ({
    internalKey: experience.slug,
    name: experience.name,
    role:
      experience.slug === "coffee-bar"
        ? "Specialty coffee and matcha service division"
        : experience.slug === "sweet-cart"
          ? "Live dessert-cart service division"
          : "Event and seating-rental service division",
    canonicalPath: experience.landingPath,
    parentKey: entityNames.parentBrand.stableKey,
  })),
  coffeeExperiences: [
    {
      internalKey: "cafe-cart-experience",
      ...entityNames.coffeeExperiences.cafeCart,
      parentDivisionKey: "coffee-bar",
    },
    {
      internalKey: "signature-coffee-bar-experience",
      ...entityNames.coffeeExperiences.signatureCoffeeBar,
      parentDivisionKey: "coffee-bar",
    },
  ],
  geography: {
    primaryCity: entityNames.geography.toronto,
    primaryRegion: entityNames.geography.greaterTorontoArea,
    primaryRegionAbbreviation:
      entityNames.geography.greaterTorontoAreaAbbreviation,
    extendedRegion: entityNames.geography.southernOntario,
    approvedServiceAreas: siteConfig.serviceAreas,
  },
  publicContact: {
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    phoneDisplay: siteConfig.contact.phoneDisplay,
    website: siteConfig.url,
  },
  eventCategories: eventTypes.map(({ slug, name }) => ({
    internalKey: slug,
    name,
    canonicalPath: `/events/${slug}`,
  })),
} as const;

export const entityRelationshipStatements = {
  parentToDivisions:
    "Luxe Event Co. is the parent organization behind Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals.",
  independentBooking:
    "Each division can be requested independently through its own service pathway.",
  coordinatedBooking:
    "Two or more divisions can be coordinated through one Luxe Event Co. inquiry and proposal journey without becoming a fixed package.",
  coffeeExperienceOwnership:
    "The Café Cart Experience and Signature Coffee Bar Experience are service formats offered by Luxe Coffee Bar.",
  geographicScope:
    "Toronto and the Greater Toronto Area are the primary market; select larger events elsewhere in Southern Ontario may be available.",
} as const;

export const entityReferenceRules = [
  "Use the complete current parent name, Luxe Event Co., when explaining ownership, coordination, contact, or organization-level policy.",
  "Use Luxe Coffee Bar, Luxe Sweet Cart, or Luxe Seating Rentals on first division reference; use the shorter service label only after the division is established by the page or paragraph.",
  "Use Café Cart Experience and Signature Coffee Bar Experience as the service-format names; Café Cart and Signature Coffee Bar are permitted contextual short forms after the format is established.",
  "Use Greater Toronto Area before or alongside GTA when geographic scope needs to stand alone; do not imply that all of Southern Ontario is a standard service area.",
  "Use only the public email, phone, website, service areas, and event categories derived from the shared site configuration.",
  "Do not use Luxe alone where it could ambiguously mean the parent organization or one of the three divisions.",
] as const;

export const answerFirstEntityRule = {
  sequence: [
    "Answer the prospect's industry, planning, commercial, or logistical question.",
    "Name the factors that affect the answer.",
    "Establish the relevant Luxe division or parent-brand relationship naturally.",
    "Link to the definitive service, event, policy, or inquiry page.",
  ],
  prohibition:
    "Do not lead an industry-focused answer with a corporate relationship statement when the relationship is not itself the question.",
} as const;

export const parentBrandRenameFoundation = {
  status: "future-change-not-yet-approved",
  currentDisplayName: entityNames.parentBrand.currentName,
  stableInternalKey: entityNames.parentBrand.stableKey,
  stableByDefault: [
    "canonical route structure",
    "organization schema fragment identifiers",
    "division internal keys",
    "service internal keys",
    "analytics event names",
    "event-category slugs",
  ],
  renameControlledFields: [
    "public organization name",
    "site name and alternate names",
    "metadata title suffixes and descriptions",
    "visible parent-brand references",
    "organization and WebSite schema names",
    "logo, favicon, and social identity assets",
    "public contact identity if it changes",
    "Google Business Profile, social, directory, and corporate-material references",
  ],
  migrationRequirements: [
    "Approved replacement name and punctuation",
    "Effective date and legal-versus-public-name decision",
    "Approved identity assets",
    "Domain and redirect decision",
    "Updated public contact and external-profile details where applicable",
    "One coordinated crawl, metadata, schema, visible-copy, and external-consistency review",
  ],
  rule:
    "A future display-name change must not silently replace stable URLs or entity identifiers unless a separate migration decision requires it.",
} as const;

export const entityClarityAudit = {
  ambiguousParentReferences: [] as string[],
  unapprovedEntityNames: [] as string[],
  contradictoryRelationships: [] as string[],
  unsupportedServiceAreas: [] as string[],
  answerFirstViolations: [] as string[],
  newRoutes: [] as string[],
} as const;
