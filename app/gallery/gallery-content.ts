import {
  isPublishableImage,
  type ResponsiveImageAsset,
} from "../image-system";

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
};

export type GalleryGroup = {
  id: string;
  number: string;
  title: string;
  context: string;
  description: string;
  tags: readonly GalleryFilter[];
  tone: "coffee" | "dessert" | "seating" | "combined";
  links: readonly { href: string; label: string }[];
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

export const galleryGroups: readonly GalleryGroup[] = [
  {
    id: "wedding-coffee-hospitality",
    number: "01",
    title: "Wedding coffee bar experiences",
    context: "Luxe Coffee Bar / Weddings",
    description:
      "Coffee service can support arrivals, cocktail hour, the reception, or a late-night moment, with the cart, menu, drinks, and signage shaped around the stage of the day.",
    tags: ["coffee-bar", "weddings"],
    tone: "coffee",
    links: [
      { href: "/experiences/coffee-bar", label: "Explore Coffee Bar" },
      { href: "/events/weddings", label: "Plan a Wedding Experience" },
    ],
    media: [
      {
        id: "wedding-coffee-arrival",
        alt: "Luxe Coffee Bar serving guests during a wedding hospitality moment",
        caption: "Arrival, cocktail hour, reception, or late-night coffee in its real wedding context.",
        width: 1600,
        height: 1200,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        priority: true,
        status: "reserved",
        format: "avif",
      },
      {
        id: "wedding-coffee-detail",
        alt: "Personalized wedding coffee menu and handcrafted beverage by Luxe Coffee Bar",
        caption: "The beverage, menu, cup, and signage details that made the service specific to the couple.",
        width: 1200,
        height: 1500,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
  {
    id: "branded-corporate-hospitality",
    number: "02",
    title: "Corporate coffee bars and brand activations",
    context: "Coffee Bar / Corporate / Brand Activations",
    description:
      "Branded cups, cart treatment, tailored menus, and guest service can carry a campaign into a hospitality experience guests can see and taste.",
    tags: ["coffee-bar", "corporate", "brand-activations"],
    tone: "coffee",
    links: [
      { href: "/events/corporate-events", label: "Explore Corporate Events" },
      { href: "/events/brand-activations", label: "Create a Branded Experience" },
    ],
    media: [
      {
        id: "activation-branded-service",
        alt: "Custom-branded Luxe coffee service at a corporate brand activation",
        caption: "Branded hospitality shown with the campaign, audience, and physical environment around it.",
        width: 1600,
        height: 1067,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
      {
        id: "activation-menu-detail",
        alt: "Custom beverage menu and branded cups prepared for a Luxe corporate activation",
        caption: "Approved menu language, cups, signage, and drink details captured as one visual system.",
        width: 1200,
        height: 1500,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
  {
    id: "shower-dessert-experience",
    number: "03",
    title: "Sweet cart experiences for baby and bridal showers",
    context: "Luxe Sweet Cart / Baby & Bridal Showers",
    description:
      "Live preparation, sauces, toppings, signage, and coordinated styling allow the dessert cart to become part of the shower setting.",
    tags: ["sweet-cart", "baby-showers", "bridal-showers"],
    tone: "dessert",
    links: [
      { href: "/experiences/sweet-cart", label: "Explore Sweet Cart" },
      { href: "/events/bridal-showers", label: "Plan a Bridal Shower" },
      { href: "/events/baby-showers", label: "Plan a Baby Shower" },
    ],
    media: [
      {
        id: "shower-dessert-cart",
        alt: "Luxe Sweet Cart integrated into a styled shower setting",
        caption: "The cart and room shown together so the dessert experience reads as part of the event design.",
        width: 1600,
        height: 1200,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
      {
        id: "shower-dessert-preparation",
        alt: "Fresh dessert being prepared on-site by Luxe Sweet Cart at a shower",
        caption: "Live preparation, finishing details, and guest interaction at the point of service.",
        width: 1200,
        height: 1500,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
  {
    id: "milestone-dessert-moment",
    number: "04",
    title: "Birthday and private event dessert carts",
    context: "Luxe Sweet Cart / Birthdays & Private Events",
    description:
      "Personalized dessert choices and milestone signage give the guest-facing service a character specific to the celebration.",
    tags: ["sweet-cart", "birthdays", "private-events"],
    tone: "dessert",
    links: [
      { href: "/events/birthdays", label: "Plan a Birthday Experience" },
      { href: "/events/private-events", label: "Explore Private Events" },
    ],
    media: [
      {
        id: "milestone-dessert-service",
        alt: "Personalized Luxe Sweet Cart dessert service at a milestone celebration",
        caption: "A live dessert experience shaped around the person, milestone, and atmosphere.",
        width: 1600,
        height: 1200,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
  {
    id: "wedding-room-composition",
    number: "05",
    title: "Wedding seating and event rentals",
    context: "Luxe Seating Rentals / Weddings",
    description:
      "Chairs, tables, linens, lighting, and layout work together to shape the completed environment at a truthful, room-wide scale.",
    tags: ["seating-rentals", "weddings"],
    tone: "seating",
    links: [
      { href: "/experiences/seating-rentals", label: "Explore Seating Rentals" },
      { href: "/events/weddings", label: "Plan a Wedding Experience" },
    ],
    media: [
      {
        id: "wedding-seating-room",
        alt: "Luxe seating and table rentals arranged for a wedding reception",
        caption: "The completed room, showing layout, comfort, circulation, and the relationship between rental elements.",
        width: 1600,
        height: 1067,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
      {
        id: "wedding-rental-detail",
        alt: "Wedding chair, linen, table, and lighting details supplied by Luxe Seating Rentals",
        caption: "Material and styling details shown close enough to understand their role in the wider room.",
        width: 1200,
        height: 1500,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
  {
    id: "corporate-room-support",
    number: "06",
    title: "Cocktail tables for a corporate reception",
    context: "Request-Specific Rentals / Corporate Events",
    description:
      "Confirmed cocktail tables may support conversation and circulation when the available inventory fits a corporate reception request.",
    tags: ["seating-rentals", "corporate"],
    tone: "seating",
    links: [
      { href: "/experiences/seating-rentals", label: "Explore Seating Rentals" },
      { href: "/events/corporate-events", label: "Discuss a Corporate Event" },
    ],
    media: [
      {
        id: "corporate-rental-layout",
        alt: "Luxe cocktail tables arranged for a corporate reception",
        caption: "A request-specific cocktail-table layout captured in use, with clear evidence of placement and guest interaction.",
        width: 1600,
        height: 1067,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
  {
    id: "complete-private-gathering",
    number: "07",
    title: "Coffee, dessert, and rentals for private events",
    context: "Coffee / Dessert / Seating / Private Events",
    description:
      "Hospitality, dessert, signage, and the surrounding room can be coordinated as one composition while each Luxe experience keeps its own role.",
    tags: ["coffee-bar", "sweet-cart", "seating-rentals", "private-events"],
    tone: "combined",
    links: [
      { href: "/experiences", label: "Explore All Experiences" },
      { href: "/events/private-events", label: "Discuss a Private Event" },
    ],
    media: [
      {
        id: "combined-private-event",
        alt: "Coffee, dessert, and rental experiences coordinated by Luxe Event Co. for a private gathering",
        caption: "The parent-brand story shown through one real occasion rather than isolated service details.",
        width: 1600,
        height: 1067,
        sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw",
        status: "reserved",
        format: "avif",
      },
    ],
  },
] as const;

export const approvedGalleryImages = galleryGroups.flatMap((group) =>
  group.media
    .filter(isPublishableImage)
    .map((item) => ({ ...item, group })),
);
