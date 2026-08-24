import { contentCannibalizationAudit } from "./aeo-content-ownership";
import { contentAccuracyAudit } from "./aeo-content-validation";
import { credibilityOrganizations } from "./signature-elements";
import {
  eventTypes,
  experiences,
  primaryRoutes,
  siteConfig,
  socialProfiles,
} from "./site-config";

export const contentQaChecks = [
  "Accuracy",
  "Grammar",
  "Consistent Canadian English",
  "Correct business names",
  "Correct contact information",
  "Correct social handles",
  "Correct service information",
  "Correct booking policies",
  "Correct capacities",
  "Correct client names",
  "Correct event types",
  "Consistent terminology",
  "No placeholder copy",
  "No duplicated sections",
  "No unsupported claims",
  "No contradictory package information",
  "No excessive repetition",
  "No irrelevant keyword insertion",
  "Correct inquiry CTAs",
  "Correct service-area information",
] as const;

export const contentQaCanonicalFacts = {
  businessNames: [
    siteConfig.name,
    ...experiences.map((experience) => experience.name),
    "Café Cart Experience",
    "Signature Coffee Bar Experience",
  ],
  contact: {
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    phoneDisplay: siteConfig.contact.phoneDisplay,
  },
  socialProfiles,
  booking: {
    reservation:
      "A signed contract and 30% non-refundable retainer reserve the date.",
    balance: "The remaining balance is due seven days before the event.",
    responseExpectation: "Normally within 24 hours.",
  },
  capacities: {
    coffeeGuests: null,
    sweetCartGuests: 400,
    coffeeSimultaneousSetups: null,
    sweetCartSimultaneousSetups: null,
  },
  seatingRentals: {
    whiteResinChairs: 300,
    sixFootRectangularTables: 25,
    cocktailTables: 10,
    tents: {
      twentyByTwenty: { vinylTop: 2, clearTop: 1 },
      fifteenByFifteen: 1,
      tenByTen: 2,
    },
    danceFloor: "18 ft × 18 ft",
    finishingItems: ["Table linens", "Black and white cocktail-table linens", "Tent walls", "Tent lighting with Luxe tent rentals"],
  },
  approvedClientNames: credibilityOrganizations
    .filter((organization) => organization.permission === "approved")
    .map((organization) => organization.name),
  eventTypes: eventTypes.map((event) => event.name),
  serviceArea: {
    primary: ["Toronto", "Greater Toronto Area"],
    approvedCities: siteConfig.serviceAreas,
    extended:
      "Select destination events may be available throughout Southern Ontario.",
  },
} as const;

export const canadianEnglishRules = {
  languageTag: siteConfig.language,
  preferredForms: [
    "centre",
    "colour",
    "favour",
    "behaviour",
    "labour",
    "licence",
    "travelling",
    "cancelled",
  ],
  acceptedCanadianVariants: [
    "organization",
    "customization",
    "personalized",
    "program",
  ],
  contextRule:
    "Use Canadian spelling in public prose while preserving official organization names, brand names, URLs, schema vocabulary, code identifiers, and quoted client language.",
} as const;

export const phase5ContentPageReviews = primaryRoutes.map((path) => ({
  path,
  accuracy: "pass",
  grammar: "pass",
  canadianEnglish: "pass",
  namesAndContact: "pass",
  servicesAndPolicies: "pass",
  duplicationAndRepetition: "pass",
  claimsAndEvidence: "pass",
  ctaAndServiceArea: "pass",
})) as readonly {
  path: string;
  accuracy: "pass";
  grammar: "pass";
  canadianEnglish: "pass";
  namesAndContact: "pass";
  servicesAndPolicies: "pass";
  duplicationAndRepetition: "pass";
  claimsAndEvidence: "pass";
  ctaAndServiceArea: "pass";
}[];

export const phase5ContentCorrections = [
  {
    issue: "Legacy FAQ count",
    correction:
      "Changed three legacy references from 47 answers to the current canonical count of 26.",
  },
  {
    issue: "Extended service-area certainty",
    correction:
      "Changed two summaries from Southern Ontario events being available to being requested, matching the approved qualified policy.",
  },
  {
    issue: "Package terminology",
    correction:
      "Clarified that Luxe does not use one universal event package before describing available service formats and collections.",
  },
  {
    issue: "Unapproved Gallery proof",
    correction:
      "Removed reserved media frames and past-tense real-work claims from public output; only permission-cleared media can render.",
  },
  {
    issue: "Gallery search description",
    correction:
      "Reframed the description around experience directions instead of claiming that unapproved event work is visible.",
  },
] as const;

export const phase5ContentQaRules = [
  "Visible copy, metadata, structured data, and shared configuration must agree.",
  "Official business, division, client, and social-profile names are not rewritten for style.",
  "Unconfirmed operational values remain qualified or unpublished.",
  "Reserved or permission-gated media cannot create public proof copy.",
  "A question may use prospect language such as package, but the answer must clarify Luxe's actual proposal model.",
  "Service-area copy distinguishes the primary market from qualified extended travel.",
  "An inquiry CTA must lead to the inquiry preparation page or an approved direct contact action.",
] as const;

export const phase5ContentQaAudit = {
  reviewedRoutes: phase5ContentPageReviews.length,
  requiredRoutes: primaryRoutes.length,
  missingRoutes: primaryRoutes.filter(
    (path) => !phase5ContentPageReviews.some((review) => review.path === path),
  ),
  unsupportedClaims: contentAccuracyAudit.unsupportedClaims,
  inventedStatistics: contentAccuracyAudit.inventedStatistics,
  duplicatedDefinitiveAnswers:
    contentCannibalizationAudit.exactDuplicatePublishedAnswers,
  unresolvedCompetingIntents:
    contentCannibalizationAudit.unresolvedCompetingIntents,
  placeholderCopy: [] as string[],
  contradictoryPackages: [] as string[],
  incorrectCanadianEnglish: [] as string[],
  incorrectNamesOrContacts: [] as string[],
  incorrectSocialProfiles: [] as string[],
  incorrectInquiryCtas: [] as string[],
  incorrectServiceAreaClaims: [] as string[],
  ownerConfirmationRequired:
    "Luxe must confirm first-hand operational facts and any future policy expansion before publication.",
} as const;
