import {
  imageAssets,
  isPublishableImage,
  type ResponsiveImageAsset,
} from "../image-system";
import { experienceCardMedia } from "../experience-card-media";
import { weddingGalleryPreview } from "../events/weddings-content";
import { homeHeroMedia } from "../home-hero-media";
import { homeEventImageGroups } from "../home-content";
import { brandingPhotos } from "../coffee-branding-media";

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
  video?: { sources: readonly { src: string; type: string }[] };
};

export type GalleryGroup = {
  id: string;
  number: string;
  title: string;
  context: string;
  description: string;
  tags: readonly GalleryFilter[];
  tone: "coffee" | "dessert" | "seating" | "combined";
  links: readonly [{ href: string; label: string }];
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

function galleryVideo(asset: ResponsiveImageAsset, sources: readonly { src: string; type: string }[], caption: string): GalleryMedia {
  return { ...galleryMedia(asset, caption), id: `${asset.id}-film`, video: { sources } };
}

function heroFilm(id: "coffee" | "dessert" | "seating", caption: string): GalleryMedia {
  const media = homeHeroMedia.find(item => item.id === id)!;
  return galleryVideo({ id: `gallery-hero-${id}`, src: media.poster, alt: caption, width: 720, height: 1280, sizes: gallerySizes, status: "approved", format: "jpeg", unoptimized: true }, media.sources, caption);
}

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
      galleryMedia(experienceImages.coffeeSignaturePreparation),
      ...experienceCardMedia.coffee.carouselImages.map(asset => galleryMedia(asset)),
      ...brandingPhotos.map(asset => galleryMedia(asset)),
      heroFilm("coffee", "Sip: specialty coffee prepared live by Luxe Coffee Bar."),
      galleryMedia(homeImages.coffeeQuotePreparation, "A closer look at Luxe Coffee Bar preparation."),
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
      galleryMedia(experienceImages.sweetCartSignature, "Guests waiting for made-to-order desserts at the Signature Luxe Sweet Cart."),
      galleryMedia(experienceImages.miniDutchPancakes, "Mini Dutch Pancakes finished with toppings and sauces."),
      galleryMedia(experienceImages.belgianWaffles, "Belgian Waffles on a Stick finished for guests."),
      galleryMedia(experienceImages.miniDonuts, "Mini Donuts prepared fresh during service."),
      galleryMedia(experienceImages.sweetCartDecor, "The illuminated Luxe Sweet Cart within an evening event."),
      galleryMedia(experienceImages.sweetCartPreparation, "Belgian Waffles on a Stick prepared live at the cart."),
      galleryMedia(experienceImages.sweetCartFinish, "A finished Luxe dessert with fruit, sauces, and toppings."),
      galleryMedia(experienceImages.experiencesSweetCart, "Luxe Sweet Cart service in an event setting."),
      galleryMedia(experienceImages.experiencesGalleryDessertInPreparation, "Dessert prepared to order for an event guest."),
      galleryMedia(experienceImages.sweetCart, "Guest-facing live dessert service from the Luxe Sweet Cart."),
      galleryMedia(experienceCardMedia.dessert.image),
      heroFilm("dessert", "Indulge: live dessert preparation with Luxe Sweet Cart."),
    ],
  },
  {
    id: "seating-rental-experiences",
    number: "03",
    title: "Event seating and rental settings",
    context: "Luxe Seating Rentals",
    description:
      "Explore Luxe chairs, tables, tents, dance floors and completed event settings. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations are available up to 18' × 18'.",
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
      ...[
        experienceImages.experiencesSeatingRentals,
        experienceImages.seatingRentalsHero,
        experienceImages.seatingRentalsOverview,
        experienceImages.whiteResinChairs,
        experienceImages.sixFootRectangularTables,
        experienceImages.cocktailTables,
        experienceImages.eventTents,
        experienceImages.danceFloor,
        experienceImages.rentalFinishingPieces,
        experienceImages.seatingGalleryLayoutInUse,
        experienceImages.seatingGalleryFinishingDetails,
        experienceImages.seatingRentals,
        experienceCardMedia.seating.image,
      ].map(asset => galleryMedia(asset)),
      heroFilm("seating", "Gather: an aerial view of Luxe tents, seating and an outdoor celebration."),
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
      ...weddingGalleryPreview.map(item => galleryMedia(item.image, item.note)),
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
    ],
    media: [
      galleryVideo(homeImages.corporateBrandActivationsPoster, [
        { src: homeEventImageGroups[1].video.webm, type: "video/webm" },
        { src: homeEventImageGroups[1].video.mp4, type: "video/mp4" },
      ], "Luxe Coffee Bar hospitality at corporate events and brand activations."),
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
    ],
    media: [
      galleryVideo(homeImages.weddingsPrivateEventsPoster, [
        { src: homeEventImageGroups[0].video.webm, type: "video/webm" },
        { src: homeEventImageGroups[0].video.mp4, type: "video/mp4" },
      ], "Luxe hospitality incorporated into weddings and private celebrations."),
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
