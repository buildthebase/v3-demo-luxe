import {
  imageAssets,
  isPublishableImage,
  type ResponsiveImageAsset,
} from "../image-system";

export type GalleryFilter =
  | "all"
  | "coffee-bar"
  | "sweet-cart"
  | "seating-rentals"
  | "weddings"
  | "corporate"
  | "brand-activations"
  | "baby-showers"
  | "bridal-showers"
  | "birthdays"
  | "private-events";

export type GalleryMedia = ResponsiveImageAsset & {
  caption: string;
};

export type GalleryGroup = {
  id: string;
  number: string;
  title: string;
  context: string;
  description: string;
  tags: readonly GalleryFilter[];
  tone: "coffee" | "dessert" | "seating" | "combined";
  links: readonly { href: string; label: string }[];
  media: readonly GalleryMedia[];
};

export const galleryFilters: readonly { value: GalleryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "coffee-bar", label: "Coffee Bar" },
  { value: "sweet-cart", label: "Sweet Cart" },
  { value: "seating-rentals", label: "Seating Rentals" },
  { value: "weddings", label: "Weddings" },
  { value: "corporate", label: "Corporate" },
  { value: "brand-activations", label: "Brand Activations" },
  { value: "baby-showers", label: "Baby Showers" },
  { value: "bridal-showers", label: "Bridal Showers" },
  { value: "birthdays", label: "Birthdays" },
  { value: "private-events", label: "Private Events" },
] as const;

const gallerySizes =
  "(max-width: 700px) calc(100vw - 2rem), (max-width: 1100px) 46vw, 32vw";

function galleryMedia(
  asset: ResponsiveImageAsset,
  caption = asset.alt,
): GalleryMedia {
  return {
    ...asset,
    caption,
    priority: false,
    sizes: gallerySizes,
  };
}

function reservedGalleryMedia(id: string, caption: string): GalleryMedia {
  return {
    id,
    src: null,
    alt: "",
    caption,
    width: 1200,
    height: 900,
    sizes: gallerySizes,
    priority: false,
    status: "reserved",
    format: "webp",
  };
}

const experienceImages = imageAssets.experiences;
const homeImages = imageAssets.home;

export const galleryGroups: readonly GalleryGroup[] = [
  {
    id: "coffee-bar-experiences",
    number: "01",
    title: "Mobile coffee bar experiences",
    context: "Luxe Coffee Bar",
    description:
      "Explore barista-served specialty coffee, matcha, custom drinks, cart styling, and professional service shown across real event settings.",
    tags: ["coffee-bar", "weddings", "corporate", "brand-activations", "private-events"],
    tone: "coffee",
    links: [
      { href: "/experiences/coffee-bar", label: "Explore Coffee Bar" },
    ],
    media: [
      galleryMedia(experienceImages.coffeeBarHero, "Complete Luxe Coffee Bar setup for an event."),
      galleryMedia(experienceImages.coffeeBarOverview, "Luxe Coffee Bar with custom event branding."),
      galleryMedia(experienceImages.coffeeBarDecor, "Custom-branded Luxe Coffee Bar styled for the occasion."),
      galleryMedia(experienceImages.coffeeBarCraftInService, "Luxe barista preparing matcha live for guests."),
      galleryMedia(experienceImages.coffeeBarFinishedDrink, "Guests enjoying finished drinks from the Luxe Coffee Bar."),
      galleryMedia(experienceImages.experiencesCoffeeBar, "Luxe Coffee Bar service within a complete event setting."),
      galleryMedia(experienceImages.experiencesGalleryCoffeeInService, "Specialty drinks prepared live by the Luxe Coffee Bar team."),
      galleryMedia(experienceImages.experiencesGalleryCompletedSetting, "A completed Luxe coffee service ready for guests."),
      galleryMedia(experienceImages.coffeeBar, "Live drink preparation at the Luxe Coffee Bar."),
    ],
  },
  {
    id: "sweet-cart-experiences",
    number: "02",
    title: "Live dessert cart experiences",
    context: "Luxe Sweet Cart",
    description:
      "See made-to-order mini pancakes, Belgian waffles, mini donuts, toppings, cart presentation, and guest-facing dessert service.",
    tags: [
      "sweet-cart",
      "weddings",
      "corporate",
      "brand-activations",
      "baby-showers",
      "bridal-showers",
      "birthdays",
      "private-events",
    ],
    tone: "dessert",
    links: [
      { href: "/experiences/sweet-cart", label: "Explore Sweet Cart" },
    ],
    media: [
      galleryMedia(experienceImages.sweetCartHero, "The Luxe Sweet Cart set and ready for live dessert service."),
      galleryMedia(experienceImages.sweetCartOverview, "Guests gathering around the Luxe Sweet Cart."),
      galleryMedia(experienceImages.miniDutchPancakes, "Mini Dutch Pancakes finished with toppings and sauces."),
      galleryMedia(experienceImages.belgianWaffles, "Belgian Waffles on a Stick finished for guests."),
      galleryMedia(experienceImages.miniDonuts, "Mini Donuts prepared fresh during service."),
      galleryMedia(experienceImages.sweetCartDecor, "The illuminated Luxe Sweet Cart within an evening event."),
      galleryMedia(experienceImages.sweetCartPreparation, "Belgian Waffles on a Stick prepared live at the cart."),
      galleryMedia(experienceImages.sweetCartFinish, "A finished Luxe dessert with fruit, sauces, and toppings."),
      galleryMedia(experienceImages.experiencesSweetCart, "Luxe Sweet Cart service in an event setting."),
      galleryMedia(experienceImages.experiencesGalleryDessertInPreparation, "Dessert prepared to order for an event guest."),
      galleryMedia(experienceImages.sweetCart, "Guest-facing live dessert service from the Luxe Sweet Cart."),
    ],
  },
  {
    id: "seating-rental-experiences",
    number: "03",
    title: "Event seating and rental settings",
    context: "Luxe Seating Rentals",
    description:
      "This collection is reserved for verified Luxe inventory and completed Luxe installations. New photography will feature chairs, tables, linens, tents, tent walls and full private-event setups. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
    tags: [
      "seating-rentals",
      "weddings",
      "corporate",
      "baby-showers",
      "bridal-showers",
      "birthdays",
      "private-events",
    ],
    tone: "seating",
    links: [
      { href: "/experiences/seating-rentals", label: "Explore Seating Rentals" },
    ],
    media: [
      reservedGalleryMedia("reserved-luxe-chairs-tables", "Reserved for Luxe white resin chairs, 6-ft tables, cocktail tables, and linens."),
      reservedGalleryMedia("reserved-luxe-tents", "Reserved for Luxe 20' × 20' tents, combined 20' × 40' configurations, and clear-top tents."),
      reservedGalleryMedia("reserved-luxe-tent-finishes", "Reserved for Luxe tent walls and Tent Lighting, which is available with Luxe tent rentals and is not offered as a standalone service."),
      reservedGalleryMedia("reserved-luxe-dance-floor", "Reserved for Luxe dance-floor configurations, available up to 18' × 18'."),
      reservedGalleryMedia("reserved-luxe-backyard-setup", "Reserved for a complete Luxe backyard or private-event setup."),
    ],
  },
  {
    id: "wedding-experiences",
    number: "04",
    title: "Wedding coffee, dessert, and rentals",
    context: "Weddings",
    description:
      "See coffee hospitality, a live dessert moment, and a completed reception setting across the flow of a wedding day.",
    tags: ["coffee-bar", "sweet-cart", "seating-rentals", "weddings"],
    tone: "combined",
    links: [
      { href: "/events/weddings", label: "Plan a Wedding Experience" },
    ],
    media: [
      galleryMedia(experienceImages.weddingWelcome, "Luxe Coffee Bar hospitality welcoming wedding guests."),
      galleryMedia(experienceImages.weddingSweetMoment, "Luxe live dessert service incorporated into a wedding celebration."),
      reservedGalleryMedia("reserved-luxe-wedding-rentals", "Reserved for verified Luxe rentals within a wedding setting."),
    ],
  },
  {
    id: "corporate-brand-experiences",
    number: "05",
    title: "Corporate events and brand activations",
    context: "Professional Occasions",
    description:
      "Explore branded hospitality, event styling, guest interaction, and professional settings designed for teams, clients, and campaigns.",
    tags: ["coffee-bar", "corporate", "brand-activations"],
    tone: "coffee",
    links: [
      { href: "/events/corporate-events", label: "Explore Corporate Events" },
      { href: "/events/brand-activations", label: "Create a Branded Experience" },
    ],
    media: [
      galleryMedia(homeImages.corporateBrandActivationsPoster, "A Luxe hospitality experience created for a corporate or branded event."),
      galleryMedia(homeImages.workingWithLuxePoster, "Luxe service supporting guests in a professional event environment."),
      galleryMedia(homeImages.professionalOccasions, "A complete Luxe setup for a professional occasion."),
      galleryMedia(homeImages.workInContext, "Guests interacting with Luxe service in an event setting."),
      galleryMedia(homeImages.workingWithLuxe, "Luxe event service coordinated for a team, client, or campaign."),
    ],
  },
  {
    id: "celebration-experiences",
    number: "06",
    title: "Celebrations and private event moments",
    context: "Events",
    description:
      "See mobile hospitality and live dessert service placed within weddings, showers, birthdays, and private celebrations.",
    tags: [
      "coffee-bar",
      "sweet-cart",
      "weddings",
      "baby-showers",
      "bridal-showers",
      "birthdays",
      "private-events",
    ],
    tone: "dessert",
    links: [
      { href: "/events", label: "Explore Events" },
      { href: "/events/private-events", label: "Explore Private Events" },
    ],
    media: [
      galleryMedia(homeImages.weddingsPrivateEventsPoster, "Luxe hospitality incorporated into a wedding or private celebration."),
      galleryMedia(experienceImages.eventsHubHero, "A Luxe service moment designed around the occasion."),
      galleryMedia(homeImages.personalCelebrations, "Luxe event service within a personal celebration."),
    ],
  },
  {
    id: "combined-luxe-experiences",
    number: "07",
    title: "Coffee, dessert, and rentals together",
    context: "Complete Luxe Experiences",
    description:
      "See how Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can share one visual direction while serving distinct roles at an event.",
    tags: [
      "coffee-bar",
      "sweet-cart",
      "seating-rentals",
      "weddings",
      "corporate",
      "brand-activations",
      "baby-showers",
      "bridal-showers",
      "birthdays",
      "private-events",
    ],
    tone: "combined",
    links: [
      { href: "/experiences", label: "Explore All Experiences" },
    ],
    media: [
      galleryMedia(experienceImages.experiencesHero, "Coffee Bar, Sweet Cart, and Luxe rentals brought together as one coordinated event experience."),
    ],
  },
] as const;

export const approvedGalleryImages = galleryGroups.flatMap((group) =>
  group.media
    .filter(isPublishableImage)
    .map((item) => ({ ...item, group })),
);
