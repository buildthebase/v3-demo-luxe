export type ExperienceHubFeature = {
  id: "coffee" | "dessert" | "seating";
  number: string;
  eyebrow: string;
  name: string;
  searchDescriptor: string;
  statement: string;
  description: string;
  details: readonly string[];
  fact: string;
  factLabel: string;
  href: `/experiences/${string}`;
  cta: string;
};

export const experienceHubFeatures: readonly ExperienceHubFeature[] = [
  {
    id: "coffee",
    number: "01",
    eyebrow: "Craft and hospitality",
    name: "Luxe Coffee Bar",
    searchDescriptor: "Mobile Coffee Service for Events",
    statement: "Create a warm arrival",
    description:
      "Luxe Coffee Bar brings professional barista service, handcrafted beverages, and a refined café atmosphere into weddings, corporate gatherings, activations, and private celebrations.",
    details: [
      "Café Cart or Signature Coffee Bar",
      "Hot and iced espresso beverages",
      "Signature drinks and premium non-coffee options",
      "Menus, cups, signage, and branding possibilities",
    ],
    fact: "Up to 500",
    factLabel: "confirmed guest capacity",
    href: "/experiences/coffee-bar",
    cta: "Explore Luxe Coffee Bar",
  },
  {
    id: "dessert",
    number: "02",
    eyebrow: "Live preparation and presentation",
    name: "Luxe Sweet Cart",
    searchDescriptor: "Live Dessert Cart Experiences",
    statement: "Build a live guest moment",
    description:
      "Luxe Sweet Cart pairs made-to-order desserts with interactive service and carts designed to become part of the event décor.",
    details: [
      "Mini Dutch pancakes",
      "Belgian waffles on a stick",
      "Mini donuts",
      "Sauces, toppings, signage, and styling",
    ],
    fact: "Up to 400",
    factLabel: "confirmed guest capacity",
    href: "/experiences/sweet-cart",
    cta: "Explore Luxe Sweet Cart",
  },
  {
    id: "seating",
    number: "03",
    eyebrow: "Structure and atmosphere",
    name: "Luxe Seating Rentals",
    searchDescriptor: "Event Seating and Rentals",
    statement: "Define the room and its flow",
    description:
      "Luxe Seating Rentals offers a focused collection of confirmed essentials, with quantities and placement considered around the venue, tent, and guest count.",
    details: [
      "Chairs and tables",
      "Cocktail tables",
      "Tents and linens",
      "Lighting and event setup considerations",
    ],
    fact: "Core pieces",
    factLabel: "focused rental inventory",
    href: "/experiences/seating-rentals",
    cta: "Explore Luxe Seating Rentals",
  },
] as const;

export const experienceNeedComparison = [
  {
    need: "Create a warm arrival",
    atmosphere: "Crafted, welcoming, conversational",
    experience: "Luxe Coffee Bar",
    href: "/experiences/coffee-bar",
  },
  {
    need: "Build a live guest moment",
    atmosphere: "Interactive, indulgent, visually staged",
    experience: "Luxe Sweet Cart",
    href: "/experiences/sweet-cart",
  },
  {
    need: "Define the room and its flow",
    atmosphere: "Architectural, composed, functional",
    experience: "Luxe Seating Rentals",
    href: "/experiences/seating-rentals",
  },
  {
    need: "Carry one atmosphere through the event",
    atmosphere: "Coordinated across hospitality, dessert, and setting",
    experience: "A combined Luxe experience",
    href: "/contact",
  },
] as const;

export const experienceHubCombinations: readonly CombinedExperience[] = [
  {
    id: "bridal-shower",
    occasion: "Bridal shower",
    title: "Mobile Coffee Bar + Sweet Cart",
    description:
      "A warm arrival, a live dessert moment, and one unified presentation for pre-wedding celebrations.",
    href: "/events/bridal-showers",
    experienceIds: ["coffee", "dessert"],
  },
  {
    id: "backyard-celebration",
    occasion: "Backyard celebration",
    title: "Coffee Bar + Seating Rentals",
    description:
      "Mobile coffee with the tables, chairs, tenting, and linens needed for a welcoming outdoor gathering.",
    href: "/events/private-events",
    experienceIds: ["coffee", "seating"],
  },
  {
    id: "wedding",
    occasion: "Wedding",
    title: "Coffee + Dessert Cart + Event Rentals",
    description:
      "On-site barista service, interactive dessert stations, and rental layouts planned seamlessly around your wedding venue.",
    href: "/events/weddings",
    experienceIds: ["coffee", "dessert", "seating"],
  },
  {
    id: "product-launch",
    occasion: "Product launch",
    title: "Branded Drinks + Custom Signage",
    description:
      "A tactile brand experience with customized beverage menus, branded cups, and interactive cart displays.",
    href: "/events/brand-activations",
    experienceIds: ["coffee", "signage"],
  },
] as const;

export const experienceGalleryPreview = [
  {
    id: "coffee-service",
    number: "01",
    label: "Coffee in service",
    context: "Craft, hospitality, and guest interaction",
    tone: "coffee",
  },
  {
    id: "dessert-preparation",
    number: "02",
    label: "Dessert in preparation",
    context: "Made-to-order finishing, toppings, and guest interaction",
    tone: "dessert",
  },
  {
    id: "completed-setting",
    number: "03",
    label: "The coffee bar, fully styled",
    context: "Custom cart branding, fresh florals, and outdoor service ready for guests",
    tone: "seating",
  },
] as const;
import type { CombinedExperience } from "../signature-elements";
