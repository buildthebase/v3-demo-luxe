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
import { weddingHeroPhotos } from "../wedding-hero-media";
import { weddingBrandingPhotos } from "../wedding-branding-media";
import { galleryGuestPhotos } from "./guest-photos";

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
  previewSrc: string;
  tags: readonly GalleryFilter[];
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
  { value: "seating-rentals", label: "Event Rentals" },
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
  tags: readonly GalleryFilter[] = [],
): GalleryMedia {
  return {
    ...asset,
    caption,
    previewSrc: `/images/gallery/previews/${asset.id}.webp`,
    tags,
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

const editorialGroups: readonly GalleryGroup[] = [
  {
    id: "coffee-bar-experiences",
    number: "01",
    title: "Mobile coffee bars",
    context: "Luxe Coffee Bar",
    description:
      "Espresso at the cart, matcha whisked for guests, and custom signs that make the coffee bar feel right at home.",
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
      galleryMedia({
        id: "cafe-dea-guests", src: "/images/gallery/cafe-dea-guests.avif",
        alt: "Two guests seated together holding personalized Café Dea iced coffee drinks",
        width: 900, height: 1600, sizes: gallerySizes, status: "approved", format: "avif", unoptimized: true,
      }, undefined, ["coffee-bar"]),
      ...[galleryGuestPhotos.cafeDeaThree, galleryGuestPhotos.cafeDeaDark, galleryGuestPhotos.cafeDeaHost]
        .map(photo => galleryMedia(photo, undefined, ["coffee-bar"])),
    ],
  },
  {
    id: "sweet-cart-experiences",
    number: "02",
    title: "Live dessert carts",
    context: "Luxe Sweet Cart",
    description:
      "Mini pancakes, Belgian waffles, mini donuts, and churros, made right at the cart. Take a peek at how we finish them with sauces and toppings.",
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
      galleryMedia(experienceImages.sweetChurroService, undefined, ["sweet-cart"]),
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
    title: "Event rentals and setups",
    context: "Luxe Event Rentals",
    description:
      "A place to sit, a table to gather around, and room to dance. See our chairs, tables, tents, and dance floors in place. Dance floors go up to 18' × 18', and lighting is available with a Luxe tent rental.",
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
      { href: "/experiences/seating-rentals", label: "Explore Event Rentals" },
    ],
    media: [
      ...[
        experienceImages.experiencesSeatingRentals,
        experienceImages.seatingRentalsHero,
        experienceImages.seatingRentalsOverview,
        experienceImages.seatingOutdoorApplication,
        experienceImages.seatingIndoorApplication,
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
      "Coffee as guests arrive, desserts made at the cart, and a room ready for the reception. Look out for the names on the cups and the menus made for the day.",
    tags: ["coffee-bar", "sweet-cart", "seating-rentals", "weddings"],
    tone: "combined",
    links: [
      { href: "/events/weddings", label: "Plan a Wedding Experience" },
    ],
    media: [
      galleryMedia(experienceImages.weddingWelcome, "Luxe Coffee Bar hospitality welcoming wedding guests."),
      galleryMedia(experienceImages.weddingSweetMoment, "Luxe live dessert service incorporated into a wedding celebration."),
      ...weddingGalleryPreview.map(item => galleryMedia(item.image, item.note)),
      ...weddingHeroPhotos.map(photo => galleryMedia(photo, undefined,
        [photo.id === "wedding-hero-couple-coffee-cheers" ? "coffee-bar" : "sweet-cart", "weddings"])),
      ...weddingBrandingPhotos.map(photo => galleryMedia(photo, undefined, ["coffee-bar", "weddings"])),
      galleryMedia(experienceImages.weddingPersonalizedMenu, undefined, ["coffee-bar", "weddings"]),
      galleryMedia(experienceImages.weddingPersonalizedCup, undefined, ["coffee-bar", "weddings"]),
      galleryMedia(experienceImages.weddingRoom, undefined, ["seating-rentals", "weddings"]),
    ],
  },
  {
    id: "corporate-brand-experiences",
    number: "05",
    title: "Corporate events and brand activations",
    context: "Corporate & Brand Events",
    description:
      "Company logos on the coffee cart, fresh drinks for guests, and dessert carts set up for team celebrations.",
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
      galleryMedia(homeImages.professionalOccasions, "A complete Luxe setup for a professional occasion."),
      galleryMedia(homeImages.workInContext, "Guests interacting with Luxe service in an event setting."),
      galleryMedia(experienceImages.corporateHero, undefined, ["sweet-cart", "corporate"]),
      galleryMedia(experienceImages.corporateBranding, undefined, ["coffee-bar", "corporate"]),
      galleryMedia(experienceImages.corporateEmployeeEvents, undefined, ["sweet-cart", "corporate"]),
    ],
  },
  {
    id: "celebration-experiences",
    number: "06",
    title: "Celebrations and private events",
    context: "Events",
    description:
      "A coffee cart to welcome guests and desserts made while everyone catches up. Here’s how those little moments looked at weddings, showers, birthdays, and private parties.",
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
      "When the coffee bar, dessert cart, and rentals are booked together, each has its own place in the room. Here’s what the whole setup can look like.",
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
  {
    id: "baby-shower-coffee-details",
    number: "08",
    title: "Baby showers and little details",
    context: "Baby Showers",
    description:
      "A Peter Rabbit tucked beside an iced matcha, personalised cups, and tables ready for family and friends. Take a closer look at the details from these baby showers.",
    tags: ["coffee-bar", "baby-showers"],
    tone: "coffee",
    links: [
      { href: "/events/baby-showers", label: "Explore Baby Showers" },
    ],
    media: [
      galleryMedia(homeImages.workingWithLuxePoster, "Peter Rabbit plush beside a personalised iced matcha at a baby shower coffee bar."),
      galleryMedia(homeImages.workingWithLuxe, "Close-up of Peter Rabbit and a personalised baby shower matcha cup on the Luxe Coffee Bar."),
      galleryMedia(experienceImages.babyHero, undefined, ["coffee-bar", "baby-showers"]),
      galleryMedia(experienceImages.babyIndoor, undefined, ["coffee-bar", "baby-showers"]),
      galleryMedia(experienceImages.babyWelcome, undefined, ["coffee-bar", "baby-showers"]),
      galleryMedia(experienceImages.babyDessert, undefined, ["sweet-cart", "baby-showers"]),
      galleryMedia(experienceImages.babySetting, undefined, ["seating-rentals", "baby-showers"]),
    ],
  },
  {
    id: "bridal-shower-experiences", number: "09", title: "Coffee at bridal showers",
    context: "Bridal Showers", description: "A look at the coffee bar set up for a bridal shower, and an iced matcha in a guest’s hands.",
    tags: ["coffee-bar", "bridal-showers"], tone: "coffee",
    links: [{ href: "/events/bridal-showers", label: "Explore Bridal Showers" }],
    media: [
      galleryMedia(experienceImages.bridalHero, undefined, ["coffee-bar", "bridal-showers"]),
      galleryMedia(galleryGuestPhotos.bridalMatcha, undefined, ["coffee-bar", "bridal-showers"]),
    ],
  },
  {
    id: "birthday-experiences", number: "10", title: "Dessert carts at birthdays",
    context: "Birthdays", description: "Fresh desserts from the cart and a moment with the family right beside it.",
    tags: ["sweet-cart", "birthdays"], tone: "dessert",
    links: [{ href: "/events/birthdays", label: "Explore Birthdays" }],
    media: [
      galleryMedia(experienceImages.birthdayHero, undefined, ["sweet-cart", "birthdays"]),
      galleryMedia(galleryGuestPhotos.birthdayDessert, undefined, ["sweet-cart", "birthdays"]),
    ],
  },
  {
    id: "private-event-experiences", number: "11", title: "Coffee at private celebrations",
    context: "Private Events", description: "A closer look at the coffee cart and the drinks made for a private celebration.",
    tags: ["coffee-bar", "private-events"], tone: "coffee",
    links: [{ href: "/events/private-events", label: "Explore Private Events" }],
    media: [galleryMedia(experienceImages.privateHero, undefined, ["coffee-bar", "private-events"])],
  },
] as const;

// Occasion tags describe the pictured event, never every occasion a service can support.
const occasionTags = new Map<string, readonly GalleryFilter[]>([
  [experienceImages.coffeeBarDecor.src!, ["corporate"]],
  [experienceImages.coffeeBarHero.src!, ["brand-activations"]],
  [experienceImages.experiencesGalleryCompletedSetting.src!, ["weddings"]],
  [experienceCardMedia.coffee.carouselImages[1].src!, ["weddings"]],
  [experienceImages.experiencesSweetCart.src!, ["weddings"]],
  [experienceImages.seatingRentals.src!, ["weddings"]],
  ...brandingPhotos.filter(photo => ["sonali-cup", "cafe-bebe-cups", "mercado-do-cafe", "cafe-bebe-bow-cart", "cafe-bebe-classic-cart", "sonali-cart"].includes(photo.id)).map(photo =>
    [photo.src!, ["baby-showers"]] as [string, readonly GalleryFilter[]]),
  [brandingPhotos.find(photo => photo.id === "she-flirts-cart")!.src!, ["brand-activations"]],
]);

const serviceForWeddingPhoto: readonly GalleryFilter[][] = [
  ["coffee-bar"], ["sweet-cart"], ["coffee-bar"], ["sweet-cart"], ["seating-rentals"],
];

const taggedGroups: readonly GalleryGroup[] = editorialGroups.map(group => ({
  ...group,
  media: group.media.map((item, index) => {
    if (item.tags.length > 0) return item;
    let services = group.tags.filter(tag => ["coffee-bar", "sweet-cart", "seating-rentals"].includes(tag));
    let occasions: readonly GalleryFilter[] = occasionTags.get(item.src!) ?? [];
    if (group.id === "wedding-experiences") {
      services = [...(serviceForWeddingPhoto[index] ?? [])];
      occasions = ["weddings"];
    } else if (group.id === "baby-shower-coffee-details") {
      occasions = ["baby-showers"];
    } else if (group.id === "corporate-brand-experiences") {
      services = item.id === homeImages.professionalOccasions.id ? [] : ["coffee-bar"];
      occasions = item.video ? ["corporate", "brand-activations"] :
        item.id === homeImages.professionalOccasions.id ? ["corporate"] : ["brand-activations"];
    } else if (group.id === "celebration-experiences") {
      services = item.id === experienceImages.eventsHubHero.id ? ["sweet-cart"] :
        item.id === homeImages.personalCelebrations.id ? ["coffee-bar"] : ["coffee-bar", "sweet-cart"];
      occasions = item.video ? ["weddings", "private-events"] :
        item.id === homeImages.personalCelebrations.id ? ["private-events"] : [];
    } else if (group.id === "combined-luxe-experiences") {
      services = ["coffee-bar", "sweet-cart"];
    }
    return { ...item, tags: [...services, ...occasions] };
  }),
}));

// Share verified tags when the same source appears in multiple editorial groups.
const tagsBySource = new Map<string, Set<GalleryFilter>>();
for (const group of taggedGroups) for (const item of group.media) {
  const key = item.video ? item.id : item.src!;
  const tags = tagsBySource.get(key) ?? new Set<GalleryFilter>();
  item.tags.forEach(tag => tags.add(tag));
  tagsBySource.set(key, tags);
}
const serviceAndOccasionGroups: readonly GalleryGroup[] = taggedGroups.map(group => ({
  ...group,
  media: group.media.map(item => ({ ...item, tags: [...tagsBySource.get(item.video ? item.id : item.src!)!] })),
}));

// Reuse the original gallery records so detail collections retain verified
// service/occasion tags, captions, thumbnails and full-resolution sources.
const photoBySource = new Map(serviceAndOccasionGroups.flatMap(group => group.media)
  .filter(item => !item.video && isPublishableImage(item)).map(item => [item.src!, item]));

function detailPhotos(assets: readonly ResponsiveImageAsset[]): GalleryMedia[] {
  return [...new Set(assets.map(asset => asset.src!))].map(src => {
    const photo = photoBySource.get(src);
    if (!photo) throw new Error(`Detail collection photo is missing from the gallery: ${src}`);
    return photo;
  });
}

// Exclude these photographs from every collection, including reused copies.
const removedGallerySources = new Set<string | null | undefined>([
  experienceImages.seatingIndoorApplication.src,
  homeImages.professionalOccasions.src,
  experienceImages.weddingRoom.src,
  experienceImages.seatingRentals.src,
]);

export const galleryGroups: readonly GalleryGroup[] = ([
  ...serviceAndOccasionGroups,
  {
    id: "custom-branding-signage", number: "12", title: "Custom Branding & Signage",
    context: "Personalized Details",
    description: "Lavender stripes and a bow for Café Bébé, the couple’s names on a wedding cart, or a company logo out front. A sign can make the cart feel like part of the day.",
    tags: [], tone: "coffee",
    links: [{ href: "/experiences/coffee-bar", label: "Explore Coffee Bar Customization" }],
    media: detailPhotos([
      ...brandingPhotos.filter(photo => ["mercado-do-cafe", "cafe-bebe-bow-cart", "cafe-bebe-classic-cart", "sonali-cart", "she-flirts-cart"].includes(photo.id)),
      ...weddingBrandingPhotos.filter(photo => ["perfect-blend-cart", "love-is-brewing-cart"].includes(photo.id)),
      experienceImages.coffeeBarHero, experienceImages.coffeeBarDecor, experienceImages.corporateBranding,
    ]),
  },
  {
    id: "cups-menus-signature-drinks", number: "13", title: "Cups, Menus & Signature Drinks",
    context: "Made Personal",
    description: "A menu beside the cart, a name on the cup, and a closer look at the drinks themselves. These are the details guests see when they come up to order.",
    tags: [], tone: "coffee",
    links: [{ href: "/experiences/coffee-bar", label: "Explore Coffee & Matcha" }],
    media: detailPhotos([
      ...weddingBrandingPhotos.filter(photo => ["personalized-iced-coffee", "hanging-coffee-menu", "wedding-cup-labels"].includes(photo.id)),
      ...brandingPhotos.filter(photo => ["sonali-cup", "cafe-bebe-cups"].includes(photo.id)),
      experienceImages.weddingPersonalizedMenu, experienceImages.weddingPersonalizedCup,
      experienceImages.experiencesCoffeeBar, experienceImages.coffeeBar,
    ]),
  },
  {
    id: "styled-setups-event-details", number: "14", title: "Styled Setups & Event Details",
    context: "The Complete Setting",
    description: "Step back from the cart and see the whole setup, from chairs and linens to where the lights, tables, and carts ended up.",
    tags: [], tone: "combined",
    links: [{ href: "/experiences", label: "Explore Luxe Experiences" }],
    media: detailPhotos([
      experienceImages.experiencesHero, experienceImages.sweetCartHero, experienceImages.coffeeBarOverview,
      experienceImages.seatingRentalsHero, experienceImages.seatingRentalsOverview,
      experienceImages.seatingIndoorApplication, experienceImages.seatingOutdoorApplication,
      experienceImages.seatingGalleryLayoutInUse, experienceImages.seatingGalleryFinishingDetails,
      experienceImages.rentalFinishingPieces, experienceImages.danceFloor,
      weddingGalleryPreview[2].image, experienceImages.babySetting,
    ]),
  },
] satisfies readonly GalleryGroup[]).map(group => ({ ...group, media: group.media.filter(item => !removedGallerySources.has(item.src)) }));

// A reused photograph has one ImageObject in page metadata as well.
export const approvedGalleryImages = [...new Map(galleryGroups.flatMap(group =>
  group.media.filter(item => !item.video && isPublishableImage(item))
    .map(item => [item.src, { ...item, group }] as const),
)).values()];
