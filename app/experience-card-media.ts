import type { ResponsiveImageAsset } from "./image-system";

const cardImage = (id: string, src: string, alt: string): ResponsiveImageAsset => ({
  id, src, alt, width: 1254, height: 1254,
  sizes: "(max-width: 700px) 100vw, 33vw",
  unoptimized: true, status: "approved", format: "webp",
});

const coffeeImages = [
  cardImage("coffee-core-1-wide", "/images/home/coffee-core-1-wide.webp", "Personalized Luxe Coffee Bar with a gold Leandro Mercado do Café front panel in an ivory indoor event setting"),
  cardImage("coffee-core-2-wide", "/images/home/coffee-core-2-wide.webp", "White Luxe Coffee Bar with Love is brewing signage beneath a fringed umbrella in an outdoor garden setting"),
];

// Shared only by experience-selector cards; page heroes and galleries keep
// their own event-specific imagery.
export const experienceCardMedia = {
  coffee: { image: coffeeImages[0], carouselImages: coffeeImages },
  dessert: { image: cardImage("sweet-cart-core-wide", "/images/home/sweet-cart-core-wide.webp", "Centered Luxe Sweet Cart with three globe lights in an evening event venue") },
  seating: { image: cardImage("rentals-core-garden", "/images/home/rentals-core-garden.webp", "Overhead view of a garden celebration with white and clear-top tents, banquet tables, chairs and warm tent lighting") },
};
