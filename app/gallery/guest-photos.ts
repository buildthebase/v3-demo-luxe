import type { ResponsiveImageAsset } from "../image-system";

export const galleryGuestPhotos = {
  "bridalMatcha": {
    "id": "bridal-guest-matcha",
    "src": "/images/gallery/bridal-guest-matcha-clear.avif",
    "alt": "Smiling guest in a green dress holding a layered Luxe Coffee Bar iced matcha at a bridal shower",
    "width": 966,
    "height": 1628,
    "sizes": "(max-width: 700px) calc(100vw - 2rem), 46vw",
    "status": "approved",
    "format": "avif",
    "unoptimized": true
  },
  "birthdayDessert": {
    "id": "birthday-guest-dessert",
    "src": "/images/gallery/birthday-guest-dessert-clear.avif",
    "alt": "Birthday guest wearing a small sombrero beneath the Luxe Sweet Cart globe lights",
    "width": 1730,
    "height": 909,
    "sizes": "(max-width: 700px) calc(100vw - 2rem), 46vw",
    "status": "approved",
    "format": "avif",
    "unoptimized": true
  },
  "cafeDeaThree": {
    "id": "cafe-dea-three-guests",
    "src": "/images/gallery/cafe-dea-three-guests-clear.avif",
    "alt": "Three guests posing together with personalized Café Dea coffee and matcha drinks",
    "width": 941,
    "height": 1671,
    "sizes": "(max-width: 700px) calc(100vw - 2rem), 46vw",
    "status": "approved",
    "format": "avif",
    "unoptimized": true
  },
  "cafeDeaDark": {
    "id": "cafe-dea-guests-dark-outfits",
    "src": "/images/gallery/cafe-dea-guests-dark-outfits-clear.avif",
    "alt": "Three guests in dark outfits enjoying personalized Café Dea iced coffee drinks",
    "width": 941,
    "height": 1672,
    "sizes": "(max-width: 700px) calc(100vw - 2rem), 46vw",
    "status": "approved",
    "format": "avif",
    "unoptimized": true
  },
  "cafeDeaHost": {
    "id": "cafe-dea-host-coffee",
    "src": "/images/gallery/cafe-dea-host-coffee-clear.avif",
    "alt": "Guest wearing a headset and holding a personalized Café Dea iced coffee",
    "width": 941,
    "height": 1672,
    "sizes": "(max-width: 700px) calc(100vw - 2rem), 46vw",
    "status": "approved",
    "format": "avif",
    "unoptimized": true
  }
} as const satisfies Record<string, ResponsiveImageAsset>;
