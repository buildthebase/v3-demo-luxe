import { entityNames } from "../entity-names";

export const coffeeFormats = [
  {
    id: "cafe-cart",
    name: entityNames.coffeeExperiences.cafeCart.canonicalName,
    displayName: entityNames.coffeeExperiences.cafeCart.canonicalName,
    shortName: entityNames.coffeeExperiences.cafeCart.contextualName,
    formatLabel: "Compact café experience",
    statement:
      "Our more compact café experience for smaller, intimate events and spaces.",
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
      "Our full premium setup for larger events and a higher-impact presentation.",
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
  "Four handcrafted espresso classics",
  "Hot and iced beverages",
  "Two signature coffee drinks",
  "One premium non-coffee beverage",
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
  "Ceremonial Matcha Latte",
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
    note: "Handcrafted coffee, matcha, and specialty drinks",
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
      "Every coffee booking includes the selected Café Cart or Signature Coffee Bar format, professional barista service, premium espresso equipment, four espresso classics, hot and iced service, two signature coffee drinks, one premium non-coffee beverage, dairy and premium milk alternatives, syrups and sauces, a menu display, serving essentials, setup, and takedown.",
  },
  {
    question: "What is the difference between the two coffee experiences?",
    answer:
      "The Luxe Café Cart is our more compact café experience for smaller, intimate events and spaces. The Luxe Signature Coffee Bar is our full premium setup for larger events, weddings, corporate functions, and occasions that call for a higher-impact presentation. Both are complete, staffed Luxe experiences; guest count, service duration, venue, menu, available space, and desired visibility determine the better fit.",
  },
  {
    question: "How does a coffee cart compare with traditional coffee catering?",
    answer:
      "Traditional coffee catering often prioritizes straightforward batch service or a self-serve beverage point, which can be appropriate when speed and simplicity matter most. A staffed coffee cart prepares made-to-order espresso, matcha, and other selected drinks and makes service part of the guest experience. Compare the required menu, service style, guest-arrival pattern, operating window, space, and budget before choosing.",
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
      "Yes. Matcha is available within the premium non-coffee selection, including options such as a Ceremonial Matcha Latte and Strawberry Matcha. One premium non-coffee beverage is included and the menu is selected for the event.",
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
      "Luxe Coffee Bar supports events of up to 500 guests and can support up to three simultaneous setups. Service duration, staffing, venue access, menu complexity, and event flow are planned before confirming the service plan.",
  },
  {
    question: "How many drinks can be served per hour?",
    answer:
      "Luxe has not approved a public drinks-per-hour figure. Throughput changes with the selected coffee format, menu, hot-to-iced mix, equipment, service duration, guest-arrival pattern, staffing, placement, and venue conditions. The proposal confirms the event-specific operating plan instead of promising one universal hourly rate.",
  },
  {
    question: "How many baristas are included?",
    answer:
      "Professional barista service is included, but Luxe has not approved one public or universally included headcount. The team is assigned from the guest count, menu complexity, service duration, arrival pattern, equipment, placement, and venue conditions, then confirmed in the proposal.",
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
      "Requirements depend on the selected coffee format, menu, venue, and whether the event is indoors or outdoors. Luxe confirms the footprint and any required power or water access during planning; no universal utility or space specification should be assumed before the event details are reviewed.",
  },
] as const;
