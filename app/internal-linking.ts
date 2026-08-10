import { experiences, eventTypes, primaryRoutes, siteConfig } from "./site-config";

export type LinkPurpose = "navigation" | "context" | "conversion" | "proof" | "cross-sell";

export type InternalLink = {
  href: string;
  anchor: string;
  purpose: LinkPurpose;
  required?: boolean;
  note?: string;
};

export type PageLinkPlan = {
  path: string;
  links: InternalLink[];
  minimums?: { label: string; count: number }[];
  anchorRules: string[];
};

const anchorRules = [
  "Use concise, descriptive anchor text that makes sense without surrounding copy.",
  "Use the destination page name or a natural contextual phrase; do not force exact-match keywords.",
  "Avoid generic anchors such as click here, read more, learn more, or website.",
  "Use crawlable HTML anchor elements with resolvable href values.",
  "Do not chain repetitive links together without surrounding context.",
];

const experienceLinks: InternalLink[] = experiences.map((experience) => ({
  href: experience.landingPath,
  anchor: experience.name,
  purpose: "navigation",
  required: true,
}));

const eventLinks: InternalLink[] = eventTypes.map((event) => ({
  href: `/events/${event.slug}`,
  anchor: event.name,
  purpose: "navigation",
  required: true,
}));

const sharedConversionLinks: InternalLink[] = [
  { href: "/gallery", anchor: "See the Luxe event gallery", purpose: "proof", required: true },
  { href: "/contact", anchor: "Plan an event with Luxe", purpose: "conversion", required: true },
];

export const homeLinkPlan: PageLinkPlan = {
  path: "/",
  links: [
    { href: "/experiences", anchor: "Explore Luxe experiences", purpose: "navigation", required: true },
    ...experienceLinks,
    { href: "/events", anchor: "Explore events", purpose: "navigation", required: true },
    { href: "/events/weddings", anchor: "Wedding experiences", purpose: "context", required: true },
    { href: "/events/corporate-events", anchor: "Corporate event experiences", purpose: "context", required: true },
    { href: "/events/brand-activations", anchor: "Brand activation experiences", purpose: "context", required: true },
    { href: "/gallery", anchor: "View the Luxe event gallery", purpose: "proof", required: true },
    { href: "/contact", anchor: "Start an event inquiry", purpose: "conversion", required: true },
  ],
  minimums: [{ label: "required destinations", count: 10 }],
  anchorRules,
};

export const experiencesHubLinkPlan: PageLinkPlan = {
  path: "/experiences",
  links: [
    ...experienceLinks,
    ...eventLinks.filter((link) => ["/events/weddings", "/events/corporate-events", "/events/brand-activations", "/events/private-events"].includes(link.href)),
    ...sharedConversionLinks,
  ],
  minimums: [{ label: "division destinations", count: 3 }, { label: "relevant event destinations", count: 4 }],
  anchorRules,
};

const eventApplicationsByExperience: Record<string, string[]> = {
  "coffee-bar": ["weddings", "corporate-events", "brand-activations", "baby-showers", "bridal-showers", "birthdays", "private-events"],
  "sweet-cart": ["weddings", "corporate-events", "brand-activations", "baby-showers", "bridal-showers", "birthdays", "private-events"],
  "seating-rentals": ["weddings", "baby-showers", "bridal-showers", "birthdays", "private-events"],
};

export const experienceLinkPlans: PageLinkPlan[] = experiences.map((experience) => {
  const complementary = experiences.filter((item) => item.slug !== experience.slug);
  const relevantEvents = eventApplicationsByExperience[experience.slug].slice(0, 3).map((slug) => {
    const event = eventTypes.find((item) => item.slug === slug)!;
    return { href: `/events/${slug}`, anchor: `${event.name} with ${experience.name}`, purpose: "context" as const, required: true };
  });

  return {
    path: experience.landingPath,
    links: [
      { href: "/experiences", anchor: "Browse all Luxe experiences", purpose: "navigation", required: true },
      ...complementary.map((item) => ({ href: item.landingPath, anchor: `Pair with ${item.name}`, purpose: "cross-sell" as const, required: true })),
      ...relevantEvents,
      { href: "/gallery", anchor: `View ${experience.name} work`, purpose: "proof", required: true },
      { href: "/faq", anchor: `${experience.name} planning questions`, purpose: "context", required: true },
      { href: "/contact", anchor: `Inquire about ${experience.name}`, purpose: "conversion", required: true },
    ],
    minimums: [{ label: "complementary experience destinations", count: 2 }, { label: "relevant event destinations", count: 3 }],
    anchorRules,
  };
});

export const eventsHubLinkPlan: PageLinkPlan = {
  path: "/events",
  links: [
    ...eventLinks,
    ...experienceLinks,
    ...sharedConversionLinks,
  ],
  minimums: [{ label: "event destinations", count: eventTypes.length }, { label: "experience destinations", count: experiences.length }],
  anchorRules,
};

const relevantExperienceSlugsByEvent: Record<string, string[]> = {
  weddings: ["coffee-bar", "sweet-cart", "seating-rentals"],
  "corporate-events": ["coffee-bar", "sweet-cart"],
  "brand-activations": ["coffee-bar", "sweet-cart"],
  "baby-showers": ["coffee-bar", "sweet-cart", "seating-rentals"],
  "bridal-showers": ["coffee-bar", "sweet-cart", "seating-rentals"],
  birthdays: ["coffee-bar", "sweet-cart", "seating-rentals"],
  "private-events": ["coffee-bar", "sweet-cart", "seating-rentals"],
};

export const eventLinkPlans: PageLinkPlan[] = eventTypes.map((event) => {
  const relevantExperiences = (relevantExperienceSlugsByEvent[event.slug] ?? experiences.map((item) => item.slug)).map((slug) => {
    const experience = experiences.find((item) => item.slug === slug)!;
    return { href: experience.landingPath, anchor: `${experience.name} for ${event.name}`, purpose: "context" as const, required: true };
  });
  const relatedEvent = eventTypes.find((item) => item.slug !== event.slug && ["weddings", "corporate-events", "brand-activations", "private-events"].includes(item.slug));

  return {
    path: `/events/${event.slug}`,
    links: [
      { href: "/events", anchor: "Browse all event applications", purpose: "navigation", required: true },
      ...relevantExperiences,
      ...(relatedEvent ? [{ href: `/events/${relatedEvent.slug}`, anchor: `Related: ${relatedEvent.name}`, purpose: "context" as const, required: false }] : []),
      { href: "/gallery", anchor: `${event.name} event gallery`, purpose: "proof", required: true },
      { href: "/faq", anchor: "Luxe booking and planning FAQ", purpose: "context", required: true },
      { href: "/contact", anchor: `Plan your ${event.name.toLowerCase()} with Luxe`, purpose: "conversion", required: true },
    ],
    minimums: [{ label: "relevant experience destinations", count: relevantExperiences.length }],
    anchorRules,
  };
});

export const galleryLinkPlan: PageLinkPlan = {
  path: "/gallery",
  links: [
    ...experienceLinks.map((link) => ({ ...link, purpose: "proof" as const, anchor: `${link.anchor} gallery` })),
    ...eventLinks.slice(0, 7).map((link) => ({ ...link, purpose: "proof" as const, anchor: `${link.anchor} event gallery` })),
    { href: "/contact", anchor: "Inquire about a Luxe event experience", purpose: "conversion", required: true },
  ],
  minimums: [{ label: "associated experience or event destinations per meaningful image group", count: 1 }],
  anchorRules,
};

export const faqLinkPlan: PageLinkPlan = {
  path: "/faq",
  links: [
    ...experienceLinks.map((link) => ({ ...link, purpose: "context" as const, anchor: `${link.anchor} details` })),
    ...eventLinks.slice(0, 7).map((link) => ({ ...link, purpose: "context" as const, anchor: `${link.anchor} planning` })),
    { href: "/contact", anchor: "Prepare your Luxe inquiry", purpose: "conversion", required: true },
  ],
  minimums: [{ label: "relevant destination from each service or event answer", count: 1 }],
  anchorRules,
};

export const contactLinkPlan: PageLinkPlan = {
  path: "/contact",
  links: [
    { href: "/experiences", anchor: "Choose a Luxe experience", purpose: "context", required: true },
    { href: "/events", anchor: "Choose an event application", purpose: "context", required: true },
    { href: "/faq", anchor: "Review booking questions", purpose: "context", required: true },
    { href: `mailto:${siteConfig.contact.email}`, anchor: siteConfig.contact.email, purpose: "conversion", required: true },
    { href: `tel:${siteConfig.contact.phone}`, anchor: "Call Luxe Event Co.", purpose: "conversion", required: true },
    ...experiences.map((experience) => ({ href: experience.instagram, anchor: `${experience.name} on Instagram`, purpose: "proof" as const, required: false })),
  ],
  minimums: [{ label: "internal journey destinations", count: 3 }, { label: "contact methods", count: 2 }],
  anchorRules,
};

export const pageLinkPlans: PageLinkPlan[] = [
  homeLinkPlan,
  experiencesHubLinkPlan,
  ...experienceLinkPlans,
  eventsHubLinkPlan,
  ...eventLinkPlans,
  galleryLinkPlan,
  faqLinkPlan,
  contactLinkPlan,
];

export const internalLinkingRules = [
  "Every approved route must have a defined linking role before content writing begins.",
  "Every page that matters for search must receive at least one crawlable internal link from another relevant page.",
  "Use root-relative internal URLs and real anchor href values.",
  "Cross-link complementary divisions where the visitor's event context makes the relationship useful.",
  "Do not create a separate indexable page for every contextual event or location unless Phase 1 approves its intent and content requirements.",
  "The sitemap is not a substitute for contextual internal links.",
] as const;

export const internalLinkingSummary = {
  coveredRoutes: pageLinkPlans.map((plan) => plan.path),
  missingRoutes: primaryRoutes.filter((path) => !pageLinkPlans.some((plan) => plan.path === path)),
  totalPlans: pageLinkPlans.length,
};

export function getPageLinkPlan(path: string) {
  return pageLinkPlans.find((plan) => plan.path === path);
}
