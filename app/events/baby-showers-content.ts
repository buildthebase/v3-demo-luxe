import { imageAssets } from "../image-system";
import type { CombinedExperience, SignatureExperience } from "../signature-elements";

export const babyShowerExperiences = [
  {
    id: "coffee",
    number: "01",
    label: "COFFEE AND MATCHA",
    name: "Luxe Coffee Bar",
    description:
      "Professional mobile coffee service serving custom lattes, Premium Matcha, and specialty iced drinks to greet guests upon arrival.",
    href: "/experiences/coffee-bar",
    image: imageAssets.experiences.coffeeBar,
  },
  {
    id: "dessert",
    number: "02",
    label: "LIVE DESSERT",
    name: "Luxe Sweet Cart",
    description:
      "Interactive live dessert carts serving warm Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, and the Luxe Churro Bar prepared fresh on-site.",
    href: "/experiences/sweet-cart",
    image: imageAssets.experiences.sweetCart,
  },
  {
    id: "seating",
    number: "03",
    label: "SEATING AND RENTALS",
    name: "Luxe Seating Rentals",
    description:
      "White resin chairs, 6-ft tables, cocktail tables, linens, and optional tenting for indoor or backyard showers.",
    href: "/experiences/seating-rentals",
    image: imageAssets.experiences.seatingRentals,
  },
] satisfies readonly SignatureExperience[];

export const babyShowerCombinations = [
  {
    id: "baby-shower-welcome",
    occasion: "A WELCOMING START",
    title: "Coffee Bar + Seating",
    description:
      "A warm arrival pairing espresso-style classics and signature beverages with iced matchas, chairs, and tables for guests to connect and settle in.",
    href: "/contact",
    experienceIds: ["coffee", "seating"],
  },
  {
    id: "baby-shower-sweet-moment",
    occasion: "A SHARED FOCAL POINT",
    title: "Coffee Bar + Sweet Cart",
    description:
      "Barista-served specialty coffee paired with interactive live dessert service to create two distinct, complementary tasting focal points.",
    href: "/contact",
    experienceIds: ["coffee", "dessert"],
  },
  {
    id: "baby-shower-complete",
    occasion: "THE COMPLETE GATHERING",
    title: "Coffee + Dessert + Rentals",
    description:
      "Coordinate specialty coffee, a live dessert cart, and the confirmed chairs, tables, linens, or tenting needed for the shower through one Luxe inquiry.",
    href: "/contact",
    experienceIds: ["coffee", "dessert", "seating"],
  },
] satisfies readonly CombinedExperience[];

export const babyShowerStyling = [
  {
    number: "01",
    title: "Menus and drinks",
    description:
      "Tailored signature lattes, Premium Matcha, seasonal drink options, dairy-free alternatives, and custom menu displays curated for your guests.",
  },
  {
    number: "02",
    title: "Signage and presentation",
    description:
      "Display the parents-to-be names, custom baby shower monograms, branded cups, acrylic signage, and cart floral accents to tie the room together.",
  },
  {
    number: "03",
    title: "Seating and room details",
    description:
      "Arrange white resin chairs, 6-ft tables, cocktail tables, and linens around guest seating, gifts, food displays, and games.",
  },
] as const;

export const babyShowerSettings = [
  {
    number: "01",
    title: "Indoor baby showers",
    description:
      "Seamless setups for home living rooms, private dining spaces, photo studios, and event venues tailored around doorway clearances, electrical access, and smooth guest circulation.",
  },
  {
    number: "02",
    title: "Outdoor baby showers",
    description:
      "Outdoor requests can combine espresso bars, live dessert carts, tents, tables, and tent lighting, subject to site, surface, access, and weather review.",
  },
] as const;

export const babyShowerGallery = [
  {
    number: "01",
    label: "The welcome",
    note: "Coffee or matcha service within the arrival and gathering setting.",
    tone: "welcome",
  },
  {
    number: "02",
    label: "The sweet moment",
    note: "Fresh dessert preparation and guest interaction.",
    tone: "sweet",
  },
  {
    number: "03",
    label: "The room",
    note: "Seating, tables, linens, signage, and atmosphere in context.",
    tone: "gathering",
  },
] as const;

export const babyShowerPlanning = [
  {
    number: "01",
    title: "Event details",
    description:
      "Provide your event date, venue location, estimated guest count, overall timeline, and whether the shower takes place indoors or outdoors.",
  },
  {
    number: "02",
    title: "Experience preferences",
    description:
      "Let us know if you prefer premium mobile coffee service, Premium Matcha service, live dessert carts, seating rentals, or a coordinated bundle.",
  },
  {
    number: "03",
    title: "Venue and setup needs",
    description:
      "Share any details regarding room access, available floor space, electrical access, vendor load-in timing, and venue rules.",
  },
] as const;

export const babyShowerFaqs = [
  {
    question: "What baby shower services does Luxe provide?",
    answer:
      "Luxe provides mobile coffee and matcha service, live dessert preparation, and event rentals including chairs, tables, cocktail tables, tents, linens, and lighting. The right selection depends on the venue, guest count, schedule, and desired atmosphere.",
  },
  {
    question: "Can the Coffee Bar, Sweet Cart, and rentals be booked separately?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can each be booked independently or coordinated within one baby shower plan.",
  },
  {
    question: "What desserts can be prepared at a baby shower?",
    answer:
      "Luxe Sweet Cart can prepare Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, or the Luxe Churro Bar on-site. Soft Serve Add-On is an enhancement. Dessert choices, sauces, toppings, quantities, and service format are confirmed during planning.",
  },
  {
    question: "Can drinks, menus, signage, and cups be personalized?",
    answer:
      "Yes. Signature beverages, menu displays, cups, signage, cart details, dessert presentation, and selected room details can be discussed. Final possibilities depend on the approved direction, production requirements, timing, and selected experience.",
  },
  {
    question: "Can Luxe support an outdoor baby shower?",
    answer:
      "Yes. Outdoor service can be considered when weather planning, surface conditions, access, utilities, equipment protection, guest comfort, and a suitable contingency plan are confirmed.",
  },
  {
    question: "What venue requirements are needed for mobile coffee service?",
    answer:
      "Requirements depend on the selected coffee format, menu, venue, and whether the event is indoors or outdoors. Luxe confirms the service footprint and any required power or water access during planning.",
  },
  {
    question: "Does Luxe provide delivery, setup, and teardown?",
    answer:
      "Setup and takedown are included with confirmed Coffee Bar and Sweet Cart experiences. Rental delivery, setup, teardown, pickup responsibilities, access requirements, and applicable fees are confirmed for the venue and order.",
  },
  {
    question: "Does Luxe serve baby showers outside Toronto?",
    answer:
      "Yes. Luxe primarily serves Toronto and the Greater Toronto Area, with select events available throughout Southern Ontario. Travel or delivery fees may apply.",
  },
  {
    question: "How many guests can Luxe serve?",
    answer:
      "Luxe Coffee Bar serves intimate gatherings through large-scale events, with service plans tailored to guest count, menu, venue requirements and event flow. Larger-format events can be accommodated through a customized service plan.",
  },
  {
    question: "How far in advance should a baby shower be booked?",
    answer:
      "Earlier inquiries provide more flexibility, especially for peak dates, personalized details, rentals, or coordinated services. Availability and production timing depend on the event date, selected experiences, staffing, inventory, and venue requirements.",
  },
] as const;
