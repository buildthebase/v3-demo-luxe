import { experiences, siteConfig } from "./site-config";

export const approvedBusinessIdentity = {
  businessName: siteConfig.organization.publicName,
  phone: siteConfig.contact.phone,
  phoneDisplay: siteConfig.contact.phoneDisplay,
  email: siteConfig.contact.email,
  website: siteConfig.url,
  primaryMarket: "Toronto and the Greater Toronto Area",
  primaryServiceAreas: siteConfig.serviceAreas,
  extendedServiceArea: siteConfig.extendedServiceArea,
  divisions: experiences.map((experience) => ({
    name: experience.name,
    website: `${siteConfig.url}${experience.landingPath}`,
    socialProfile: experience.instagram,
  })),
  publicDescription: siteConfig.description,
  publicAddress: null,
  openingHours: null,
} as const;

export const localProfileTracking = {
  source: "google",
  medium: "organic",
  campaign: "gbp",
  websiteContent: "website",
  inquiryContent: "inquiry",
} as const;

export function createLocalProfileUrl(
  path: "/" | "/contact",
  content:
    | typeof localProfileTracking.websiteContent
    | typeof localProfileTracking.inquiryContent,
) {
  const url = new URL(path, siteConfig.url);
  url.searchParams.set("utm_source", localProfileTracking.source);
  url.searchParams.set("utm_medium", localProfileTracking.medium);
  url.searchParams.set("utm_campaign", localProfileTracking.campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export const googleBusinessProfilePlan = {
  status: "verification-required",
  profileUrl: null,
  recommendedModel:
    "Begin with one Experiences by Luxe service-area profile only if ownership and eligibility are confirmed. Do not create separate division profiles unless each independently meets Google's real-world business and department requirements.",
  addressTreatment:
    "Do not publish a residential address. If Luxe travels to customers and does not receive customers at its base, configure the profile as a service-area business and hide the address.",
  serviceAreas: approvedBusinessIdentity.primaryServiceAreas,
  websiteLink: createLocalProfileUrl("/", localProfileTracking.websiteContent),
  inquiryLink: createLocalProfileUrl(
    "/contact",
    localProfileTracking.inquiryContent,
  ),
  fieldsRequiringOwnerVerification: [
    "Existing profile and ownership status",
    "Profile URL",
    "Real-world business name",
    "Primary and secondary categories",
    "Actual operating base and eligibility",
    "Service-area selections",
    "Public hours, if meaningful",
    "Whether any division independently qualifies for a separate profile",
  ],
} as const;

export const externalBusinessInformationPlan = {
  socialProfiles: {
    status: "confirmed",
    records: approvedBusinessIdentity.divisions.map((division) => ({
      division: division.name,
      url: division.socialProfile,
    })),
  },
  directories: {
    status: "inventory-required",
    records: [] as readonly string[],
    rule:
      "Do not create or edit a directory listing until ownership, relevance, and the existing record are verified. Update approved records from the canonical business identity.",
  },
  corporateMaterials: {
    status: "owner-review-required",
    rule:
      "Use the canonical business identity for proposals, invoices, insurance documents, email signatures, decks, and stationery; do not infer that external files have already been updated.",
  },
} as const;

export const localContentPolicy = {
  primaryMarket:
    "Identify Toronto and the GTA as the primary market in core site context.",
  municipalityUsage:
    "Mention individual municipalities only where they help answer a real service-area, travel, delivery, venue, or event-planning question.",
  fullServiceAreaRoutes: [
    "/",
    "/faq",
    "/experiences/seating-rentals",
  ] as const,
  currentLocationPages: [] as readonly string[],
  locationPageGate: [
    "Unique local event evidence",
    "Approved local photography",
    "First-hand venue or logistics knowledge",
    "Permissioned local testimonials or case studies",
    "A distinct and useful local searcher need",
    "Enough original information to avoid a city-name template",
  ] as const,
  prohibition:
    "Do not create thin city pages, doorway pages, or pages that differ only by a place name.",
} as const;

export const localSeoFoundation = {
  identity: approvedBusinessIdentity,
  googleBusinessProfile: googleBusinessProfilePlan,
  externalSurfaces: externalBusinessInformationPlan,
  contentPolicy: localContentPolicy,
} as const;
