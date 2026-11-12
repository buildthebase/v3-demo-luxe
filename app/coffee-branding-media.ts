import type { ResponsiveImageAsset } from "./image-system";

export const brandingPhotos: readonly ResponsiveImageAsset[] = [
  { id: "sonali-cup", width: 1086, height: 1448, alt: "Iced coffee with a Sonali’s Coffee cup label in front of a personalized baby shower welcome sign" },
  { id: "cafe-bebe-cups", width: 1200, height: 1080, alt: "Two iced coffees with floral Café Bébé custom cup stickers on a wooden serving board" },
  { id: "mercado-do-cafe", width: 1178, height: 1335, alt: "The Luxe Coffee Bar with a gold Leandro Mercado do Café personalized front panel" },
  { id: "cafe-bebe-bow-cart", width: 1200, height: 1305, alt: "Lavender striped Café Bébé custom coffee cart signage with a bow and coordinating menu stand" },
  { id: "cafe-bebe-classic-cart", width: 1200, height: 1298, alt: "The Luxe Coffee Bar with lavender Café Bébé lettering and a bow on a cream custom cart panel" },
  { id: "sonali-cart", width: 1095, height: 1436, alt: "The Luxe Coffee Bar with dark green Sonali’s Coffee custom cart branding" },
  { id: "she-flirts-cart", width: 1200, height: 1152, alt: "The Luxe Coffee Bar with pink She Flirts Beauty Bar logo and branded cart signage" },
].map(photo => ({
  ...photo,
  src: `/images/experiences/custom-branding/${photo.id}-clear.avif`,
  sizes: "(max-width: 800px) calc(100vw - 3rem), 24rem",
  unoptimized: true,
  status: "approved" as const,
  format: "avif" as const,
}));
