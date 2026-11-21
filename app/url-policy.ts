import { primaryRoutes, siteConfig } from "./site-config";

export const canonicalOrigin = siteConfig.url;
export const canonicalHostname = new URL(canonicalOrigin).hostname;
export const formerCanonicalHostname = "luxeeventco.ca";
export const canonicalPaths = new Set<string>(primaryRoutes);

export const duplicateUrlPolicy = {
  trackingParameters:
    "Tracking parameters may remain available to analytics, but the initial HTML canonical and Open Graph URL always omit them.",
  galleryFilters:
    "Gallery filters are client-side view state on /gallery and do not create indexable filter URLs.",
  thirdPartyReturns:
    "Third-party return parameters do not create distinct canonical inquiry pages.",
  redirects:
    "HTTP, www, trailing-slash, case, duplicate-slash, and service-domain redirects terminate at the clean canonical URL without forwarding query parameters.",
  legacyPaths:
    "Only verified retired URLs receive permanent redirects. Unconfirmed aliases remain 404 until an approved source-to-destination map exists.",
} as const;

export function normalizeCanonicalPath(pathname: string) {
  const withoutDuplicateSlashes = pathname.replace(/\/{2,}/g, "/");
  const withoutTrailingSlash =
    withoutDuplicateSlashes.length > 1
      ? withoutDuplicateSlashes.replace(/\/+$/, "")
      : withoutDuplicateSlashes;
  const lowercasePath = withoutTrailingSlash.toLowerCase();

  return canonicalPaths.has(lowercasePath) ? lowercasePath : pathname;
}
