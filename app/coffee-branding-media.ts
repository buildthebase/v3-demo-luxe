import type { ResponsiveImageAsset } from "./image-system";

// Add the remaining client photo here when supplied. No duplicate slides.
export const brandingPhotos: readonly ResponsiveImageAsset[] = [
  {
    id: "coffee-custom-menu-signage",
    src: "/images/experiences/coffee-custom-signage-clear.webp",
    alt: "Personalized fabric Coffee Bar menu draped over a white cart beneath a planter",
    width: 945,
    height: 1665,
    sizes: "(max-width: 800px) calc(100vw - 3rem), 24rem",
    unoptimized: true,
    status: "approved",
    format: "webp",
  },
  {
    id: "coffee-custom-wedding-cup",
    src: "/images/experiences/coffee-custom-wedding-cup.webp",
    alt: "Bride holding an iced coffee with a personalized Maham and Umer wedding cup sticker",
    width: 1100,
    height: 1262,
    sizes: "(max-width: 800px) calc(100vw - 3rem), 24rem",
    unoptimized: true,
    status: "approved",
    format: "webp",
  },
];
