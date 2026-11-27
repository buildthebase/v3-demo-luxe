import { imageAssets, type ResponsiveImageAsset } from "./image-system";

// Each photograph is also rendered on its corresponding public service page.
export const serviceSchemaImages: Readonly<Record<string, ResponsiveImageAsset>> = {
  "/experiences/coffee-bar": imageAssets.experiences.coffeeSignaturePreparation,
  "/experiences/sweet-cart": imageAssets.experiences.sweetCartSignature,
  "/experiences/seating-rentals": imageAssets.experiences.seatingRentalsHero,
  "/events/weddings": imageAssets.experiences.weddingHero,
  "/events/corporate-events": imageAssets.experiences.corporateHero,
  "/events/brand-activations": imageAssets.experiences.coffeeBarHero,
  "/events/baby-showers": imageAssets.experiences.babyHero,
  "/events/bridal-showers": imageAssets.experiences.bridalHero,
  "/events/birthdays": imageAssets.experiences.birthdayHero,
  "/events/private-events": imageAssets.experiences.privateHero,
};
