import { primaryRoutes, siteConfig } from "./site-config";

export const indexNowPolicy = {
  status: siteConfig.indexNow.status,
  requiredFoundations: {
    bingWebmasterTools:
      "The canonical property must be verified in Bing Webmaster Tools before IndexNow is operationally monitored.",
    sitemap:
      "The canonical XML sitemap remains required and authoritative for the complete stable route set.",
  },
  activation: {
    environmentVariable: siteConfig.indexNow.keyEnvironmentVariable,
    keyFile:
      "When a valid key is configured, the canonical worker serves /{key}.txt from the site root for ownership verification.",
    submission:
      "The submission command remains inert unless --send is explicitly provided with one or more changed canonical URLs.",
  },
  eligibleChanges: ["added", "updated", "deleted", "redirected"] as const,
  submissionRules: [
    "Submit only URLs that changed after IndexNow activation.",
    `Submit only HTTPS URLs owned by ${siteConfig.domain.primary}.`,
    "Do not submit the full sitemap after every release.",
    "Deduplicate URLs and send no more than 10,000 in one request.",
    "A successful receipt does not guarantee crawling or indexing.",
    "Keep sitemap submission and Bing Webmaster Tools monitoring in place.",
  ],
  currentRoutes: primaryRoutes.map((path) =>
    path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
  ),
} as const;

export type IndexNowPolicy = typeof indexNowPolicy;
