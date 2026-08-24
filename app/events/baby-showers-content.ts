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
      "Interactive live dessert service with Luxe Sweet Cart options including Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. Your selected option or combination of options is confirmed in your proposal. Soft Serve Add-On is available with select dessert options as an optional enhancement and is not offered as a standalone service.",
    href: "/experiences/sweet-cart",
    image: imageAssets.experiences.sweetCart,
  },
  {
    id: "seating",
    number: "03",
    label: "SEATING AND RENTALS",
    name: "Luxe Seating Rentals",
    description:
      "Complete the setup with select Luxe chairs, tables, linens and optional tent rentals for indoor or outdoor baby showers.",
    href: "/experiences/seating-rentals",
    image: imageAssets.experiences.seatingRentals,
  },
] satisfies readonly SignatureExperience[];

export const babyShowerCombinations = [
  {
    id: "baby-shower-sweet-moment",
    occasion: "A CAFÉ-AND-DESSERT EXPERIENCE",
    title: "Coffee Bar + Sweet Cart",
    description:
      "A complete café-and-dessert experience for guests to enjoy throughout the celebration.",
    href: "/contact",
    experienceIds: ["coffee", "dessert"],
  },
  {
    id: "baby-shower-dessert-rentals",
    occasion: "DESSERT AND EVENT ESSENTIALS",
    title: "Sweet Cart + Rentals",
    description:
      "Pair an interactive dessert experience with the essential chairs, tables, linens or tenting needed for the event.",
    href: "/contact",
    experienceIds: ["dessert", "seating"],
  },
  {
    id: "baby-shower-complete",
    occasion: "THE COMPLETE GATHERING",
    title: "Coffee + Dessert + Rentals",
    description:
      "Bring multiple Luxe services together through one coordinated inquiry.",
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
      "Display the parents-to-be names, custom baby shower monograms, branded cups, and acrylic signage to coordinate with the event theme. Floral accents can be coordinated with the client’s florist or decorator where applicable.",
  },
  {
    number: "03",
    title: "Rental selections and service placement",
    description:
      "Choose from available white resin chairs, 6-ft tables, cocktail tables, linens and optional tent rentals, with service placement coordinated around the confirmed event plan.",
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
      "Outdoor requests can combine a premium mobile Coffee Bar, live dessert carts, tents and tables, subject to site, surface, access and weather review. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service.",
  },
] as const;

export const babyShowerGallery = [
  {
    number: "01",
    label: "The complete celebration",
    note: "A strong wide view showing the overall baby shower and Luxe services in context.",
    tone: "welcome",
  },
  {
    number: "02",
    label: "Coffee Bar in context",
    note: "A complete Luxe Coffee Bar setup within the baby-shower décor.",
    tone: "gathering",
  },
  {
    number: "03",
    label: "Coffee and matcha service",
    note: "Barista-served specialty coffee or Premium Matcha being prepared and served.",
    tone: "sweet",
  },
  {
    number: "04",
    label: "Personalized details",
    note: "Custom drink names, menus, cups or stickers, and cart signage shown clearly.",
    tone: "welcome",
  },
  {
    number: "05",
    label: "Sweet Cart at the event",
    note: "The Luxe Sweet Cart presented within the baby-shower setting.",
    tone: "sweet",
  },
  {
    number: "06",
    label: "Guests enjoying the service",
    note: "Guests interacting naturally with the Coffee Bar or Sweet Cart experience.",
    tone: "welcome",
  },
  {
    number: "07",
    label: "Luxe rentals in use",
    note: "Actual Luxe chairs, tables, linens, or tent setup where applicable.",
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
      "Luxe provides mobile coffee and matcha service, live dessert preparation, and event rentals including chairs, tables, cocktail tables, tents, and linens. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. The right selection depends on the venue, guest count, schedule, and desired atmosphere.",
  },
  {
    question: "Can the Coffee Bar, Sweet Cart, and rentals be booked separately?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can each be booked independently or coordinated within one baby shower plan.",
  },
  {
    question: "What desserts can be prepared at a baby shower?",
    answer:
      "Luxe Sweet Cart options include Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station and the Luxe Churro Bar. Your selected option or combination of options is confirmed during planning. Soft Serve Add-On is available as an enhancement. Sauces, toppings, quantities and service format are also confirmed during planning.",
  },
  {
    question: "Can drinks, menus, signage, and cups be personalized?",
    answer:
      "Yes. Signature beverages, menu displays, cups, signage, cart details, dessert presentation, and selected rental details can be discussed. Final possibilities depend on the approved direction, production requirements, timing, and selected experience.",
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
      "Luxe supports intimate gatherings through larger celebrations. Capacity depends on the selected experience, service duration, menu, staffing, venue access and guest flow. Larger events can be reviewed individually.",
  },
  {
    question: "How far in advance should a baby shower be booked?",
    answer:
      "Earlier inquiries provide more flexibility, especially for peak dates, personalized details, rentals, or coordinated services. Availability and production timing depend on the event date, selected experiences, staffing, inventory, and venue requirements.",
  },
] as const;
