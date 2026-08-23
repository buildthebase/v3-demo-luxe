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

const experienceImages = imageAssets.experiences;
const homeImages = imageAssets.home;

export const galleryGroups: readonly GalleryGroup[] = [
  {
    id: "coffee-bar-experiences",
    number: "01",
    title: "Mobile coffee bar experiences",
    context: "Luxe Coffee Bar",
    description:
      "Explore mobile espresso, matcha, custom drinks, cart styling, and professional barista service shown across real event settings.",
    tags: ["coffee-bar", "weddings", "corporate", "brand-activations", "private-events"],
    tone: "coffee",
    links: [
      { href: "/experiences/coffee-bar", label: "Explore Coffee Bar" },
    ],
    media: [
      galleryMedia(experienceImages.coffeeBarHero),
      galleryMedia(experienceImages.coffeeBarOverview),
      galleryMedia(experienceImages.coffeeBarDecor),
      galleryMedia(experienceImages.coffeeBarCraftInService),
      galleryMedia(experienceImages.coffeeBarFinishedDrink),
      galleryMedia(experienceImages.experiencesCoffeeBar),
      galleryMedia(experienceImages.experiencesGalleryCoffeeInService),
      galleryMedia(experienceImages.experiencesGalleryCompletedSetting),
      galleryMedia(experienceImages.coffeeBar),
    ],
  },
  {
    id: "sweet-cart-experiences",
    number: "02",
    title: "Live dessert cart experiences",
    context: "Luxe Sweet Cart",
    description:
      "See made-to-order Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, the Luxe Churro Bar, toppings, cart presentation, and guest-facing dessert service.",
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
      galleryMedia(experienceImages.sweetCartHero),
      galleryMedia(experienceImages.sweetCartOverview),
      galleryMedia(experienceImages.miniDutchPancakes),
      galleryMedia(experienceImages.belgianWaffles),
      galleryMedia(experienceImages.miniDonuts),
      galleryMedia(experienceImages.sweetCartDecor),
      galleryMedia(experienceImages.sweetCartPreparation),
      galleryMedia(experienceImages.sweetCartFinish),
      galleryMedia(experienceImages.experiencesSweetCart),
      galleryMedia(experienceImages.experiencesGalleryDessertInPreparation),
      galleryMedia(experienceImages.sweetCart),
    ],
  },
  {
    id: "seating-rental-experiences",
    number: "03",
    title: "Event seating and rental settings",
    context: "Luxe Seating Rentals",
    description:
      "Explore chairs, tables, tents, linens, lighting, dance floors, reception layouts, and finishing details for indoor and outdoor events.",
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
      galleryMedia(experienceImages.seatingRentalsHero),
      galleryMedia(experienceImages.seatingRentalsOverview),
      galleryMedia(experienceImages.seatingIndoorApplication),
      galleryMedia(experienceImages.seatingOutdoorApplication),
      galleryMedia(experienceImages.seatingGalleryLayoutInUse),
      galleryMedia(experienceImages.seatingGalleryFinishingDetails),
      galleryMedia(experienceImages.whiteResinChairs),
      galleryMedia(experienceImages.sixFootRectangularTables),
      galleryMedia(experienceImages.cocktailTables),
      galleryMedia(experienceImages.eventTents),
      galleryMedia(experienceImages.danceFloor),
      galleryMedia(experienceImages.rentalFinishingPieces),
      galleryMedia(experienceImages.experiencesSeatingRentals),
      galleryMedia(experienceImages.seatingRentals),
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
      galleryMedia(experienceImages.weddingWelcome),
      galleryMedia(experienceImages.weddingSweetMoment),
      galleryMedia(experienceImages.weddingRoom),
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
      galleryMedia(homeImages.corporateBrandActivationsPoster),
      galleryMedia(homeImages.workingWithLuxePoster),
      galleryMedia(homeImages.professionalOccasions),
      galleryMedia(homeImages.workInContext),
      galleryMedia(homeImages.workingWithLuxe),
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
      galleryMedia(homeImages.weddingsPrivateEventsPoster),
      galleryMedia(experienceImages.eventsHubHero),
      galleryMedia(homeImages.personalCelebrations),
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
      galleryMedia(experienceImages.experiencesHero),
    ],
  },
] as const;

export const approvedGalleryImages = galleryGroups.flatMap((group) =>
  group.media
    .filter(isPublishableImage)
    .map((item) => ({ ...item, group })),
);
