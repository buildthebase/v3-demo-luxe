import { imageAssets, type ResponsiveImageAsset } from "./image-system";

export type SignatureExperience = {
  id: "coffee" | "dessert" | "seating";
  number: string;
  label: string;
  name: string;
  headingLead?: string;
  headingDetail?: string;
  tagline?: string;
  description: string;
  href: string;
  image: ResponsiveImageAsset;
};

export type CombinedExperienceNode = SignatureExperience["id"] | "signage";

export type CombinedExperience = {
  id: string;
  occasion: string;
  title: string;
  description: string;
  href: string;
  experienceIds: CombinedExperienceNode[];
};

export const signatureExperiences: SignatureExperience[] = [
  {
    id: "coffee",
    number: "01",
    label: "Coffee",
    name: "Luxe Coffee Bar",
    description:
      "Mobile espresso, matcha, and specialty beverage service for arrivals, cocktail hour, reception, or late-night hospitality.",
    href: "/experiences/coffee-bar",
    image: imageAssets.experiences.coffeeBar,
  },
  {
    id: "dessert",
    number: "02",
    label: "Dessert",
    name: "Luxe Sweet Cart",
    description:
      "Live dessert preparation and presentation designed to create an interactive guest moment.",
    href: "/experiences/sweet-cart",
    image: imageAssets.experiences.sweetCart,
  },
  {
    id: "seating",
    number: "03",
    label: "Seating",
    name: "Luxe Seating Rentals",
    description:
      "White resin chairs, 6-ft tables, cocktail tables, tents, linens, tent lighting, and a dance floor for weddings and private celebrations.",
    href: "/experiences/seating-rentals",
    image: imageAssets.experiences.seatingRentals,
  },
];

export type EventPlanningStep = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export const eventPlanningPathway: readonly EventPlanningStep[] = [
  {
    number: "01",
    title: "Choose the occasion.",
    description: "Start with the gathering, audience, setting, and atmosphere you are planning.",
    href: "/events",
  },
  {
    number: "02",
    title: "Select the experiences.",
    description: "Explore coffee, dessert, and seating independently or as one coordinated event experience.",
    href: "/experiences",
  },
  {
    number: "03",
    title: "Personalize the details.",
    description: "Shape the menu, presentation, service format, signage, and event-specific requirements.",
    href: "/faq",
  },
  {
    number: "04",
    title: "Open the conversation.",
    description: "Share the event context Luxe needs to prepare the right next conversation.",
    href: "/contact",
  },
];

export const combinedExperiences: CombinedExperience[] = [
  {
    id: "bridal-shower",
    occasion: "Bridal shower",
    title: "Coffee Bar + Sweet Cart",
    description:
      "A welcoming espresso arrival paired with an interactive live dessert cart, presented in a seamless aesthetic.",
    href: "/events/bridal-showers",
    experienceIds: ["coffee", "dessert"],
  },
  {
    id: "backyard-celebration",
    occasion: "Backyard celebration",
    title: "Coffee Bar + Rentals",
    description:
      "Mobile coffee paired with the core tables, chairs, tenting, and linens needed for a polished outdoor gathering.",
    href: "/events/private-events",
    experienceIds: ["coffee", "seating"],
  },
  {
    id: "wedding",
    occasion: "Wedding",
    title: "Coffee + Dessert + Rentals",
    description:
      "Specialty coffee, fresh-made desserts, and focused chair, table, tent, linen, and dance-floor rentals coordinated for the wedding.",
    href: "/events/weddings",
    experienceIds: ["coffee", "dessert", "seating"],
  },
  {
    id: "product-launch",
    occasion: "Product launch",
    title: "Branded drinks + Signage",
    description:
      "Custom branded beverage prints, bespoke signage, cart wraps, and tailored cup designs that bring your brand to life.",
    href: "/events/brand-activations",
    experienceIds: ["coffee", "signage"],
  },
];

export type CredibilityOrganization = {
  name: string;
  permission: "pending-written-confirmation" | "approved";
  logo: ResponsiveImageAsset | null;
};

export const credibilityOrganizations: CredibilityOrganization[] = [
  {
    name: "OPTrust",
    permission: "approved",
    logo: imageAssets.credibilityLogos.optrust,
  },
  {
    name: "CST Savings",
    permission: "approved",
    logo: imageAssets.credibilityLogos.cstSavings,
  },
  {
    name: "Convergint",
    permission: "approved",
    logo: imageAssets.credibilityLogos.convergint,
  },
  {
    name: "ICNA Canada",
    permission: "approved",
    logo: imageAssets.credibilityLogos.icnaCanada,
  },
  {
    name: "Waste Connections of Canada",
    permission: "approved",
    logo: imageAssets.credibilityLogos.wasteConnectionsCanada,
  },
];

export type InquiryContext = {
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  href: "/contact";
};

export const inquiryContexts: Record<string, InquiryContext> = {
  home: {
    eyebrow: "Your event, shaped in full",
    heading: "Plan your event with Luxe.",
    description:
      "Share the occasion, location, guest count, and the experiences you are considering. Luxe will use that context to guide the right next conversation.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  default: {
    eyebrow: "Your gathering, thoughtfully shaped",
    heading: "Plan an experience with Luxe.",
    description:
      "Tell us what you are planning and which details matter most. We will use that context to guide the right next conversation.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  experiences: {
    eyebrow: "One coordinated point of view",
    heading: "Bring the experiences together.",
    description:
      "Begin with one service or describe the complete atmosphere. Luxe will take care of the rest.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  events: {
    eyebrow: "Begin with what you are planning",
    heading: "Plan your special event.",
    description:
      "Share the occasion, location, guest count, timing, and the kind of atmosphere you want to create. Luxe will use that context to guide the right combination of experiences.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "coffee-bar": {
    eyebrow: "Crafted for your event",
    heading: "Inquire about coffee service.",
    description:
      "Share your occasion, guest count, service timing, beverage direction, and any presentation or branding requirements.",
    cta: "Plan Your Coffee Bar",
    href: "/contact",
  },
  "sweet-cart": {
    eyebrow: "Dessert, made part of the moment",
    heading: "Plan your dessert experience.",
    description:
      "Tell us about the occasion, guest count, dessert direction, presentation, and details you would like personalized.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "seating-rentals": {
    eyebrow: "Shape the room",
    heading: "Plan your rentals with Luxe.",
    description:
      "Share the venue, guest count, event format, desired atmosphere, and the rental elements needed to complete the setting.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  weddings: {
    eyebrow: "Made for the full celebration",
    heading: "Plan your wedding experience.",
    description:
      "Tell us where coffee, dessert, and intentional seating could support the flow, atmosphere, and hospitality of the day.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "corporate-events": {
    eyebrow: "Hospitality with purpose",
    heading: "Discuss a corporate event.",
    description:
      "Share the audience, schedule, venue, service needs, and brand requirements so Luxe can prepare a polished event direction.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "brand-activations": {
    eyebrow: "Turn the brief into an experience",
    heading: "Create a branded experience.",
    description:
      "Tell us about the campaign, audience, timing, service format, and branded details that need to carry through the moment.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "baby-showers": {
    eyebrow: "A beautiful beginning",
    heading: "Plan a baby shower with Luxe.",
    description:
      "Share the date, venue, estimated guest count, and the coffee, dessert, seating, or rental experiences you are considering.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "bridal-showers": {
    eyebrow: "Before the next chapter",
    heading: "Plan a bridal shower experience.",
    description:
      "Tell us how coffee, dessert, and the setting can come together around the host, guests, and atmosphere.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  birthdays: {
    eyebrow: "A milestone, made personal",
    heading: "Plan a birthday experience.",
    description:
      "Share the guest count, setting, preferred experiences, and personal details that should shape the celebration.",
    cta: "Plan Your Event",
    href: "/contact",
  },
  "private-events": {
    eyebrow: "Gather in your own way",
    heading: "Plan your private event in Toronto and the GTA.",
    description:
      "Tell us what you are celebrating and how coffee, dessert, or refined rentals could support the occasion.",
    cta: "Plan Your Event",
    href: "/contact",
  },
};

export const signatureElementPlacements = {
  home: {
    path: "/",
    status: "implemented-in-full-home-blueprint",
    modules: [
      "experience-selector",
      "combined-experience-feature",
      "credibility-strip",
      "event-planning-pathway",
      "contextual-inquiry-panel",
    ],
    note: "The complete Home blueprint replaces the temporary compact coming-soon composition.",
  },
  experiences: {
    path: "/experiences",
    status: "implemented-in-complete-experiences-blueprint",
    modules: [
      "experience-selector",
      "independent-or-combined-clarity",
      "experience-differentiation-features",
      "event-need-comparison",
      "combined-experience-feature",
      "relevant-event-paths",
      "gallery-preview",
      "event-planning-pathway",
      "contextual-inquiry-panel",
    ],
    note: "The complete Experiences Hub distinguishes each experience while preserving its relationship to Luxe Event Co.",
  },
  events: {
    path: "/events",
    status: "implemented-in-complete-events-blueprint",
    modules: [
      "event-led-approach",
      "event-pathways",
      "combined-experience-feature",
      "gallery-preview",
      "event-planning-pathway",
      "contextual-inquiry-panel",
    ],
    note: "The complete Events Hub begins with the occasion and then connects visitors to relevant Luxe experiences.",
  },
  corporateEvents: {
    path: "/events/corporate-events",
    status: "implemented-in-complete-corporate-events-blueprint",
    modules: ["credibility-strip", "contextual-inquiry-panel"],
  },
  brandActivations: {
    path: "/events/brand-activations",
    status: "implemented-in-complete-brand-activations-blueprint",
    modules: ["credibility-strip", "contextual-inquiry-panel"],
  },
} as const;
