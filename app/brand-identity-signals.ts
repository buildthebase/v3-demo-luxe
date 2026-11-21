import { siteConfig } from "./site-config";

export const brandIdentitySignals = {
  preferredSiteName: siteConfig.name,
  alternateSiteNames: siteConfig.alternateNames,
  canonicalHome: siteConfig.url,
  publicBusinessName: siteConfig.organization.publicName,
  signals: {
    websiteSchema:
      "The Home page emits one WebSite entity with the preferred name, ordered alternate names, canonical Home URL, and stable #website identifier.",
    homePage:
      "The canonical Home page is crawlable, indexable, server rendered, self-canonicalizing, and uses the public business name visibly.",
    metadata:
      "Application name, Open Graph site name, page-title suffixes, manifest name, and public organization references derive from the shared site configuration.",
    favicon:
      "The Home page declares a stable ICO favicon, a high-resolution square PNG icon, and a 180 by 180 Apple touch icon.",
    logo:
      "The Organization graph references one 1200 by 1200 public logo ImageObject through the stable #logo identifier.",
  },
  constraints: [
    "Do not create separate site-name entities for division subdirectories.",
    "Do not treat the social card as the organization logo.",
    `Use Luxe and ${siteConfig.domain.primary} as ordered fallbacks for ${siteConfig.name}.`,
    "A valid implementation indicates a preference but does not guarantee the site name or favicon Google displays.",
  ],
} as const;

export type BrandIdentitySignals = typeof brandIdentitySignals;
