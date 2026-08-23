import { entityNames } from "../entity-names";

export const coffeeFormats = [
  {
    id: "cafe-cart",
    name: entityNames.coffeeExperiences.cafeCart.canonicalName,
    displayName: entityNames.coffeeExperiences.cafeCart.canonicalName,
    shortName: entityNames.coffeeExperiences.cafeCart.contextualName,
    formatLabel: "Compact café experience",
    statement:
      "Our compact café experience designed for intimate celebrations, office events and spaces where a smaller footprint is preferred—without compromising the quality or presentation of the Luxe Coffee Bar experience.",
    eventFit:
      "Smaller celebrations, bridal and baby showers, private dinners, intimate gatherings, and tighter venues.",
    presence:
      "A compact, flexible footprint that sits naturally within indoor or outdoor spaces.",
  },
  {
    id: "signature-bar",
    name: entityNames.coffeeExperiences.signatureCoffeeBar.canonicalName,
    displayName: entityNames.coffeeExperiences.signatureCoffeeBar.canonicalName,
    shortName: entityNames.coffeeExperiences.signatureCoffeeBar.contextualName,
    formatLabel: "Full premium setup",
    statement:
      "Our full premium coffee bar experience designed for weddings, corporate events and celebrations where the bar itself becomes a larger part of the event presentation.",
    eventFit:
      "Larger events, weddings, corporate functions, conferences, brand activations, galas, and high-capacity celebrations.",
    presence:
      "A statement-making bar presence tailored for higher volume and greater visual impact.",
  },
] as const;

export const coffeeBookingIncludes = [
  "Choice of Luxe Café Cart or Luxe Signature Coffee Bar",
  "Professional barista service",
  "Premium espresso equipment",
  "A curated selection of café classics, signature beverages and premium non-coffee options tailored to your selected experience.",
  "Hot and iced beverages",
  "Hot and iced service, whole milk and premium milk alternatives are available as part of the Coffee Bar experience.",
  "Dairy and premium milk alternatives",
  "Premium syrups and sauces",
  "Luxury menu display",
  "Complete setup and takedown",
  "Cups, lids, and serving essentials",
] as const;

export const espressoClassics = [
  "Espresso",
  "Americano",
  "Cappuccino",
  "Café Latte",
] as const;

export const signatureCoffeeCollection = [
  "Luxe Spanish Latte",
  "Brown Sugar Latte",
  "Vanilla Bean Latte",
  "White Mocha Velvet",
  "Tiramisu Latte",
  "Honey Lavender Latte",
] as const;

export const nonCoffeeCollection = [
  "Premium Matcha Latte",
  "Strawberry Matcha",
  "Chai Latte",
  "Hot Chocolate",
] as const;

export const seasonalCoffeeCollections = [
  {
    season: "Spring",
    drinks: ["Lavender Honey Latte", "Rose Vanilla Latte", "Strawberry Matcha"],
  },
  {
    season: "Summer",
    drinks: [
      "Coconut Vanilla Latte",
      "Brown Sugar Shaken Latte",
      "Iced Spanish Latte",
      "Peach Matcha",
      "Espresso Tonic",
    ],
  },
  {
    season: "Autumn",
    drinks: [
      "Pumpkin Spice Latte",
      "Maple Cinnamon Latte",
      "Salted Caramel Latte",
      "Apple Crisp Latte",
    ],
  },
  {
    season: "Holiday",
    drinks: [
      "Peppermint Mocha",
      "Gingerbread Latte",
      "Toasted Marshmallow Latte",
      "White Chocolate Peppermint",
    ],
  },
] as const;

export const coffeeEventLinks = [
  {
    href: "/events/weddings",
    label: "Weddings",
    context: "Ceremony arrivals, cocktail hour, late-night coffee, and guest hospitality.",
  },
  {
    href: "/events/corporate-events",
    label: "Corporate Events",
    context: "Office cafés, conferences, employee appreciation, and client hosting.",
  },
  {
    href: "/events/brand-activations",
    label: "Brand Activations",
    context: "Branded drinks, launches, retail moments, and campaign experiences.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "A polished café moment for an intimate pre-wedding gathering.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Coffee, matcha, and specialty drinks presented around the celebration.",
  },
  {
    href: "/events/birthdays",
    label: "Birthdays",
    context: "A personalized beverage experience for milestone celebrations.",
  },
  {
    href: "/events/private-events",
    label: "Private Events",
    context: "Engagements, anniversaries, graduations, and gatherings of many kinds.",
  },
] as const;

export const coffeeGalleryPreview = [
  {
    number: "01",
    label: "The cart in context",
    note: "Coffee bar presentation shaped around the event setting",
    tone: "cart",
  },
  {
    number: "02",
    label: "Craft in service",
    note: "Professional baristas preparing beverages on-site",
    tone: "service",
  },
  {
    number: "03",
    label: "The finished drink",
    note: "Specialty coffee beverages, matcha, and signature drinks",
    tone: "drink",
  },
] as const;

export const coffeeFaqs = [
  {
    question: "How much does mobile coffee catering cost, and how is it priced?",
    answer:
      "Mobile coffee bar pricing is tailored to your event's specific scope. Custom quotes are based on your chosen setup (Café Cart or Signature Coffee Bar), guest count, service duration, venue location, staffing needs, custom menu selections, and branding options.\n\nBecause guest count, venue logistics, and timing all shape the required operational setup, Luxe provides custom proposals rather than flat, one-size-fits-all rates.",
  },
  {
    question: "What is included with a Luxe Coffee Bar booking?",
    answer:
      "Every coffee booking includes the selected Café Cart or Signature Coffee Bar format, professional barista service, premium espresso equipment, a curated selection of café classics, signature beverages and premium non-coffee options tailored to your selected experience, hot and iced service, whole milk and premium milk alternatives, syrups and sauces, a menu display, serving essentials, setup, and takedown.",
  },
  {
    question: "What is the difference between the two coffee experiences?",
    answer:
      "Luxe Café Cart is our compact café experience designed for intimate celebrations, office events and spaces where a smaller footprint is preferred—without compromising the quality or presentation of the Luxe Coffee Bar experience. Luxe Signature Coffee Bar is our full premium coffee bar experience designed for weddings, corporate events and celebrations where the bar itself becomes a larger part of the event presentation.",
  },
  {
    question: "How does a coffee cart compare with traditional coffee catering?",
    answer:
      "Unlike traditional batch or self-serve coffee catering, Luxe Coffee Bar creates a staffed café-style experience where specialty beverages are prepared and served throughout the event. The bar becomes both a hospitality service and part of the guest experience.",
  },
  {
    question: "How does outside coffee service compare with venue coffee service?",
    answer:
      "Venue coffee service can be the practical choice when it is already integrated with the venue's catering team, schedule, and banquet setup. A dedicated Luxe bar is useful when the event calls for made-to-order specialty drinks, dedicated baristas, a distinct service point, or branded presentation. Review the venue's included menu, outside-vendor rules, service timing, placement, utilities, and guest flow before deciding.",
  },
  {
    question: "Are iced drinks included?",
    answer:
      "Yes. Hot and iced beverages are included within the Luxe Coffee Bar experience rather than treated as separate service categories.",
  },
  {
    question: "Is matcha available?",
    answer:
      "Yes. Matcha is available within the premium non-coffee selection, including options such as a Premium Matcha Latte and Strawberry Matcha. The menu is selected for the event.",
  },
  {
    question: "Are milk alternatives available?",
    answer:
      "Yes. Dairy and premium milk alternatives are included as part of the coffee experience.",
  },
  {
    question: "Can the menu, cups, and signage be customized?",
    answer:
      "Yes. Clients can personalize signature drinks, seasonal selections, matcha or other non-coffee choices, drink names, menu displays, custom cups, event signage, and cart branding. The final menu and visual treatment are confirmed around ingredient availability, equipment, service speed, guest flow, approved artwork, production requirements, and the event timeline.",
  },
  {
    question: "Can pastries be added to the presentation?",
    answer:
      "Pastry-display possibilities can be planned as part of the coffee presentation. Availability and display details are confirmed during planning.",
  },
  {
    question: "How many guests can Luxe Coffee Bar serve?",
    answer:
      "Luxe Coffee Bar serves intimate gatherings through large-scale events, with service plans tailored to guest count, menu, venue requirements and event flow. Larger-format events can be accommodated through a customized service plan.",
  },
  {
    question: "How many drinks can be served per hour?",
    answer:
      "Service capacity varies based on guest count, selected menu, hot-to-iced drink mix, and guest arrival patterns. We recommend the appropriate staffing and service setup for each event to keep service moving efficiently.",
  },
  {
    question: "How many baristas are included?",
    answer:
      "Professional barista service is included with every Coffee Bar booking. Staffing is determined by guest count, menu, service duration and venue requirements to ensure smooth service throughout the event.",
  },
  {
    question: "Is setup and teardown included?",
    answer:
      "Yes. Setup and takedown are included with the confirmed coffee experience. Exact access and timing requirements are coordinated for the venue and event schedule.",
  },
  {
    question: "Does Luxe Coffee Bar travel outside Toronto?",
    answer:
      "Yes. Luxe primarily serves Toronto and the Greater Toronto Area, with select destination events available throughout Southern Ontario. Travel fees may apply.",
  },
  {
    question: "What space, power, or water access is required?",
    answer:
      "Setup requirements vary by Coffee Bar format and venue. Our team confirms electrical, water, access and setup requirements with the client or venue before the event so the appropriate service plan can be prepared.",
  },
] as const;
