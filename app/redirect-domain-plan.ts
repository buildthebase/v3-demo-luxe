import { canonicalHostname, canonicalOrigin, formerCanonicalHostname } from "./url-policy";

export type RedirectPlan = {
  source: string;
  destination: string;
  status:
    | "confirmed-destination"
    | "implemented-locally-needs-domain-access";
  redirectType: "301";
  indexing: "do-not-index-source";
  notes: string;
};

export const canonicalHost = canonicalOrigin;

export const redirectDomainPlan: RedirectPlan[] = [
  {
    source: "luxecoffeebar.ca",
    destination: `${canonicalHost}/experiences/coffee-bar`,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Service-specific domain should never host a duplicate website.",
  },
  {
    source: "luxesweetcart.ca",
    destination: `${canonicalHost}/experiences/sweet-cart`,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Service-specific domain should never host a duplicate website.",
  },
  {
    source: "luxeseatingrentals.ca",
    destination: `${canonicalHost}/experiences/seating-rentals`,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Service-specific domain should never host a duplicate website.",
  },
  {
    source: `${formerCanonicalHostname} and www.${formerCanonicalHostname} over HTTP or HTTPS`,
    destination: canonicalHost,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Preserve the requested path on the new domain. Route both former hostnames to the redirect worker and provide HTTPS certificates.",
  },
  {
    source: `http://${canonicalHostname} and http(s)://www.${canonicalHostname}`,
    destination: canonicalHost,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Redirect to the HTTPS apex on the same path. The www host needs DNS and a certificate for HTTPS requests.",
  },
];

export const redirectRules = [
  "Use server-level or edge-level 301 redirects.",
  "Do not include redirect sources in the primary XML sitemap.",
  "Do not canonicalize primary pages to redirect domains.",
  "Avoid redirect chains and loops.",
  "Redirect to the clean canonical URL without carrying query or tracking parameters.",
  "Keep permanent redirects active long-term.",
  "Confirm SSL works on every redirect domain before launch.",
] as const;
