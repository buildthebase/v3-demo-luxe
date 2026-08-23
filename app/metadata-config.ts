import type { Metadata } from "next";
import type { BlogArticle } from "./blog/content";
import { siteConfig } from "./site-config";
import { getRouteSocialCard } from "./social-card-config";

const defaultSocialImageAsset = siteConfig.brandAssets.defaultSocialImage;

type PageMetadataDefinition = {
  title: string;
  description: string;
};

export const pageMetadata = {
  "/": {
    title: "Luxe Event Co. | Mobile Coffee Bar, Live Desserts & Event Rentals Toronto",
    description:
      "Luxe Event Co. provides mobile coffee bars, live desserts, and focused chair, table and tent rentals for weddings and private celebrations across Toronto and the GTA.",
  },
  "/experiences": {
    title: "Coffee, Dessert & Event Rentals Toronto | Luxe Event Co.",
    description:
      "Compare mobile coffee bars and live dessert carts for events, plus focused seating and rentals for weddings and private celebrations across Toronto and the GTA.",
  },
  "/experiences/coffee-bar": {
    title: "Mobile Coffee Bar in Toronto | Luxe Coffee Bar",
    description:
      "Bring a complete mobile café to Toronto and GTA events with barista-served specialty coffee, Premium Matcha, two service formats, and tailored presentation.",
  },
  "/experiences/sweet-cart": {
    title: "Dessert Cart Experiences in Toronto | Luxe Sweet Cart",
    description:
      "Discover the signature Luxe Churro Bar and live dessert carts for Toronto and GTA events, with warm sweets prepared and finished for guests on-site.",
  },
  "/experiences/seating-rentals": {
    title: "Chair, Table & Tent Rentals Toronto | Luxe Seating Rentals",
    description:
      "Rent white resin chairs, tables, tents, linens, lighting and a dance floor for weddings, showers, birthdays, engagements, backyard events and private celebrations.",
  },
  "/events": {
    title: "Toronto Event Services | Coffee, Dessert & Rentals | Luxe",
    description:
      "Explore mobile coffee bars and dessert carts for Toronto events, plus focused seating and rentals for weddings, showers and private celebrations.",
  },
  "/events/weddings": {
    title: "Toronto Wedding Coffee, Dessert & Rentals | Luxe Event Co.",
    description:
      "See where coffee, live dessert, and refined rentals can support a Toronto or GTA wedding, from cocktail hour through the late-night celebration.",
  },
  "/events/corporate-events": {
    title: "Corporate Coffee & Event Experiences | Luxe Event Co.",
    description:
      "Plan scalable coffee, matcha and live dessert service for Toronto and GTA office events, conferences, employee appreciation, and client hospitality.",
  },
  "/events/brand-activations": {
    title: "Branded Coffee Cart Toronto & GTA | Luxe Event Co.",
    description:
      "Turn coffee, matcha, dessert, cups, signage, and cart styling into a cohesive branded activation for launches and campaigns in Toronto and the GTA.",
  },
  "/events/baby-showers": {
    title: "Baby Shower Dessert Cart Toronto: Luxe Event Co.",
    description:
      "Plan a Toronto or GTA baby shower with mobile coffee bars, matcha drinks, live dessert carts, signage, and refined event rentals for indoor or outdoor venues.",
  },
  "/events/bridal-showers": {
    title: "Bridal Shower Coffee Cart Toronto: Luxe Event Co.",
    description:
      "Plan a Toronto or GTA bridal shower with a coffee cart, dessert cart, matcha, signage, florals, seating, and event rentals in one cohesive setting.",
  },
  "/events/birthdays": {
    title: "Birthday Dessert Catering & Coffee Bar Toronto: Luxe",
    description:
      "Plan Toronto and GTA birthday dessert catering with live dessert carts, mobile coffee and matcha bars, seating, and rentals for milestone celebrations.",
  },
  "/events/private-events": {
    title: "Private Event Coffee, Dessert & Rentals Toronto: Luxe",
    description:
      "Plan a private event in Toronto or the GTA with staffed coffee service, live dessert carts, personalized signage, seating, tents, linens, and lighting.",
  },
  "/gallery": {
    title: "Toronto Event Gallery: Coffee, Dessert and Rentals",
    description:
      "Explore our Toronto event gallery with mobile coffee bars, live dessert carts and seating rentals for weddings, showers and private celebrations.",
  },
  "/faq": {
    title: "Event Planning & Booking FAQs | Luxe Event Co.",
    description:
      "Get clear answers about Luxe Event Co. pricing factors, booking terms, travel, setup, venue requirements, and cross-service customization before you inquire.",
  },
  "/blog": {
    title: "Event Planning Blog Toronto | Luxe Event Co.",
    description:
      "Planning guidance for mobile coffee catering, live dessert, event rentals, weddings, corporate events, brand activations, and private celebrations across Toronto and the GTA.",
  },
  "/contact": {
    title: "Contact Luxe Event Co.: Toronto Event Services",
    description:
      "Contact Luxe Event Co. to plan a mobile coffee bar, live dessert experience, or event rentals for weddings and events across Toronto and the GTA.",
  },
} as const satisfies Record<string, PageMetadataDefinition>;

export type PagePath = keyof typeof pageMetadata;

export function createPageMetadata(path: PagePath): Metadata {
  const definition = pageMetadata[path];
  const socialCard = getRouteSocialCard(path, defaultSocialImageAsset);
  const socialImage = {
    url: socialCard.src,
    width: socialCard.width,
    height: socialCard.height,
    alt: socialCard.alt,
  };

  return {
    title: definition.title,
    description: definition.description,
    alternates: { canonical: path },
    openGraph: {
      title: definition.title,
      description: definition.description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.openGraphLocale,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: definition.title,
      description: definition.description,
      images: [socialCard.src],
    },
  };
}

export function createArticleMetadata(article: BlogArticle): Metadata {
  const path = `/blog/${article.slug}`;
  const approvedHero =
    article.socialImage?.status === "approved" && article.socialImage.src
      ? article.socialImage
      : article.heroImage?.status === "approved" && article.heroImage.src
      ? article.heroImage
      : defaultSocialImageAsset;
  const approvedHeroSrc = approvedHero.src ?? defaultSocialImageAsset.src;
  const socialImage = {
    url: approvedHeroSrc,
    width: approvedHero.width,
    height: approvedHero.height,
    alt: article.heroAlt || approvedHero.alt,
  };
  const wasModified = article.modifiedDate !== article.publishDate;

  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: path },
    authors: [{ name: article.author.name, url: article.author.url }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.openGraphLocale,
      type: "article",
      publishedTime: article.publishDate,
      ...(wasModified ? { modifiedTime: article.modifiedDate } : {}),
      authors: [article.author.name],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.description,
      images: [approvedHeroSrc],
    },
  };
}
