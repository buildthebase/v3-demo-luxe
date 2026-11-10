import type { ResponsiveImageAsset } from "./image-system";

export type SocialCardAsset = ResponsiveImageAsset & {
  src: string;
  status: "approved";
};

export const routeSocialCards = {
  "/": {
    id: "social-card-luxe-event-co-home",
    src: "/images/social/luxe-event-co-home.png",
    alt: "Luxe Event Co. coffee, dessert, and seating experiences",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
  "/experiences/coffee-bar": {
    id: "social-card-luxe-coffee-bar",
    src: "/images/social/luxe-coffee-bar.png",
    alt: "Luxe Coffee Bar mobile coffee experiences for Toronto events",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
  "/experiences/sweet-cart": {
    id: "social-card-luxe-sweet-cart",
    src: "/images/social/luxe-sweet-cart.png",
    alt: "Luxe Sweet Cart live dessert experiences for Toronto events",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
  "/experiences/seating-rentals": {
    id: "social-card-luxe-seating-rentals",
    src: "/images/social/luxe-seating-rentals.png",
    alt: "Luxe Event Rentals for events across Toronto and the GTA",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
  "/events/weddings": {
    id: "social-card-luxe-wedding-experiences",
    src: "/images/social/luxe-wedding-experiences.png",
    alt: "Luxe coffee, dessert, and rental experiences for Toronto weddings",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
  "/events/corporate-events": {
    id: "social-card-luxe-corporate-events",
    src: "/images/social/luxe-corporate-events.png",
    alt: "Luxe coffee, dessert, and event support for Toronto organizations",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
  "/events/brand-activations": {
    id: "social-card-luxe-brand-activations",
    src: "/images/social/luxe-brand-activations.png",
    alt: "Luxe branded coffee, dessert, and hospitality experiences in Toronto",
    width: 1200,
    height: 630,
    sizes: "1200px",
    priority: true,
    status: "approved",
    format: "png",
  },
} as const satisfies Record<string, SocialCardAsset>;

export function getRouteSocialCard(
  path: string,
  fallback: SocialCardAsset,
): SocialCardAsset {
  return routeSocialCards[path as keyof typeof routeSocialCards] ?? fallback;
}
