import type { ResponsiveImageAsset } from "./image-system";

export const weddingBrandingPhotos: readonly ResponsiveImageAsset[] = [
  { id: "personalized-iced-coffee", width: 1086, height: 1448, alt: "Iced coffee with a personalized Maham and Umer wedding cup label against burgundy draping" },
  { id: "hanging-coffee-menu", width: 970, height: 1622, alt: "Custom hanging fabric menu displaying coffee, featured drinks, matcha and milk options on the Luxe Coffee Bar" },
  { id: "wedding-cup-labels", width: 1084, height: 1451, alt: "Wedding guests holding hot and iced coffee with matching personalized The Perfect Blend cup labels" },
  { id: "perfect-blend-cart", width: 1200, height: 1295, alt: "The Luxe Coffee Bar with The Perfect Blend custom cart signage for Maham and Umer" },
  { id: "love-is-brewing-cart", width: 1068, height: 1472, alt: "Outdoor Luxe Coffee Bar with Love Is Brewing cart signage, a menu stand and white fringed umbrella" },
].map(photo => ({
  ...photo,
  src: `/images/weddings/custom-branding/${photo.id}-clear-v2.avif`,
  sizes: "(max-width: 700px) calc(100vw - 48px), 480px",
  status: "approved" as const,
  format: "avif" as const,
  unoptimized: true,
}));
