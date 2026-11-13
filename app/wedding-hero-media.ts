import { imageAssets, type ResponsiveImageAsset } from "./image-system";

const weddingHeroImageDefaults = {
  sizes: imageAssets.experiences.weddingHero.sizes,
  unoptimized: true,
  status: "approved",
  format: "avif",
} as const;

export const weddingHeroPhotos = [
  imageAssets.experiences.weddingHero,
  {
    ...weddingHeroImageDefaults,
    id: "wedding-hero-couple-dessert",
    src: "/images/weddings/wedding-hero-couple-dessert-clear.avif",
    alt: "Bride in red and gold wedding attire sharing a freshly prepared dessert with her groom",
    width: 992,
    height: 1585,
  },
  {
    ...weddingHeroImageDefaults,
    id: "wedding-hero-bride-dessert-smile",
    src: "/images/weddings/wedding-hero-bride-dessert-smile-clear.avif",
    alt: "Smiling bride in an ivory embroidered outfit enjoying live desserts beside the Luxe Sweet Cart globe lights",
    width: 947,
    height: 1660,
  },
  {
    ...weddingHeroImageDefaults,
    id: "wedding-hero-couple-late-night",
    src: "/images/weddings/wedding-hero-couple-late-night-clear.avif",
    alt: "Bride and groom holding waffles on sticks and dessert plates during their evening wedding celebration",
    width: 1077,
    height: 1461,
  },
  {
    ...weddingHeroImageDefaults,
    id: "wedding-hero-couple-coffee-cheers",
    src: "/images/weddings/wedding-hero-couple-coffee-cheers-clear.avif",
    alt: "Bride in red and groom in white toasting personalized iced coffee cups at the outdoor Luxe Coffee Bar",
    width: 974,
    height: 1615,
  },
  {
    ...weddingHeroImageDefaults,
    id: "wedding-hero-bride-dessert-selection",
    src: "/images/weddings/wedding-hero-bride-dessert-selection-clear.avif",
    alt: "Bride in a beaded wedding outfit and emerald necklace choosing dessert at the Luxe Sweet Cart",
    width: 968,
    height: 1625,
  },
] as const satisfies readonly ResponsiveImageAsset[];
