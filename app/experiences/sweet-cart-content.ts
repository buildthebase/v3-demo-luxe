export const sweetCartCollections = [
  {
    id: "classic",
    number: "01",
    name: "The Classic Collection",
    character: "Sleek. Timeless. Versatile.",
    description:
      "A refined cart design made to integrate naturally into your event decor while live dessert preparation draws guests in.",
  },
  {
    id: "signature",
    number: "02",
    name: "The Signature Collection",
    character: "Bold. Elegant. A statement piece.",
    description:
      "A more prominent cart expression for events where the dessert setup is intended to become a visible part of the décor.",
  },
] as const;

export const dessertExperiences = [
  {
    id: "pancakes",
    number: "01",
    name: "Mini Dutch Pancakes",
    description:
      "Warm, bite-sized mini pancakes finished live with your selection of gourmet sauces and toppings.",
    decisionFit:
      "An interactive guest favourite that allows everyone to customize their dessert in an easy, bowl-style serving.",
  },
  {
    id: "waffles",
    number: "02",
    name: "Belgian Waffles on a Stick",
    description:
      "Crisp Belgian waffles prepared fresh, drizzled to order, and served in a convenient handheld format.",
    decisionFit:
      "Ideal for cocktail hours, corporate networking, and celebrations where guests are actively mingling.",
  },
  {
    id: "donuts",
    number: "03",
    name: "Mini Donuts",
    description:
      "Freshly made mini donuts dusted, glazed, and served warm directly from the cart.",
    decisionFit:
      "A classic crowd-pleaser that pairs effortlessly with our mobile coffee service or stands alone as a feature moment.",
  },
] as const;

export const dessertBookingIncludes = [
  "Choice of Classic or Signature dessert cart",
  "Desserts prepared fresh on-site",
  "Drizzled premium Belgian sauces",
  "Selection of classic toppings included",
  "Curated cart styling and setup",
  "Professional attendant service",
  "Complete venue setup and takedown",
  "Napkins, bowls, and serving essentials",
  "Custom menu display and frame",
] as const;

export const dessertSauces = [
  "Belgian Milk Chocolate",
  "Belgian White Chocolate",
  "Nutella",
  "Caramel",
  "Strawberry",
  "Pure Maple Syrup",
  "Lotus Biscoff",
  "Pistachio Cream",
] as const;

export const standardToppings = [
  "Milk Chocolate Chips",
  "White Chocolate Chips",
  "Crushed Oreos",
  "Brownies",
  "Chocolate Curls",
  "Sliced Bananas",
  "Rainbow Sprinkles",
  "M&M's",
  "Shredded Coconut",
  "Sliced Almonds",
  "Lotus Biscoff Cookies",
] as const;

export const premiumToppings = [
  "Freshly Sliced Strawberries",
  "Fresh Blueberries",
  "KitKat Bites",
  "Kinder Bueno",
  "Crushed Pistachios",
  "Crushed Pecans",
  "Knafeh",
] as const;

export const sweetCustomization = [
  {
    number: "01",
    title: "Choose the dessert direction",
    description:
      "Select your preferred desserts, gourmet sauces, toppings, and optional soft serve. We will curate a balanced combination that delivers fast, seamless guest service.",
  },
  {
    number: "02",
    title: "Shape the presentation",
    description:
      "Select your cart style and coordinate custom menu signage, floral accenting, and visual details to blend naturally into your event layout.",
  },
  {
    number: "03",
    title: "Carry the brand or occasion",
    description:
      "Add personalized vinyl decals, branded cups, or custom signage to align the cart setup with your wedding aesthetic, party theme, or corporate brand identity.",
  },
] as const;

export const sweetEventLinks = [
  {
    href: "/events/weddings",
    label: "Weddings",
    context: "Cocktail hour, late-night sweets, and an interactive reception moment.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "Live dessert preparation, cart styling, and guest-facing service for an intimate celebration.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Soft presentation, live preparation, and a menu guests can gather around.",
  },
  {
    href: "/events/birthdays",
    label: "Birthdays",
    context: "Made-to-order desserts personalized for milestone celebrations.",
  },
  {
    href: "/events/corporate-events",
    label: "Corporate Events",
    context: "Employee appreciation, office events, conferences, and client hospitality.",
  },
  {
    href: "/events/brand-activations",
    label: "Brand Activations",
    context: "A tactile branded moment with signage, styling, and live guest interaction.",
  },
  {
    href: "/events/private-events",
    label: "Private Events",
    context: "Engagements, anniversaries, graduations, and personal celebrations.",
  },
] as const;

export const sweetGalleryPreview = [
  {
    number: "01",
    label: "The cart as décor",
    note: "Styled as part of the event setting",
    tone: "cart",
  },
  {
    number: "02",
    label: "Prepared in the moment",
    note: "Desserts prepared fresh on-site",
    tone: "preparation",
  },
  {
    number: "03",
    label: "Finished for the guest",
    note: "Sauces and toppings selected for each guest",
    tone: "finish",
  },
] as const;

export const sweetCartFaqs = [
  {
    question: "How much does the Luxe Sweet Cart cost?",
    answer:
      "Luxe Sweet Cart pricing is tailored to your guest count, selected desserts, cart style, service duration, attendant staffing, venue access, and custom branding requirements. Because every celebration is unique, we review your specific event details and provide a fully transparent, itemized proposal with no hidden fees.",
  },
  {
    question: "Which desserts are available?",
    answer:
      "The signature Luxe Churro Bar features fresh churros prepared live and served warm. Luxe Sweet Cart also offers Mini Dutch Pancakes, Belgian Waffles on a Stick, and Mini Donuts. Vanilla or Chocolate soft serve can be added as an optional enhancement to a dessert experience.",
  },
  {
    question: "Are desserts prepared on-site?",
    answer:
      "Yes. The selected dessert is prepared at the cart, finished for each guest with the confirmed sauces and toppings, and served during the agreed operating window. Equipment, staffing, quantities, placement, and guest flow are confirmed for the event.",
  },
  {
    question: "How many attendants are included?",
    answer:
      "Professional attendants are included, but Luxe has not approved one public or universally included headcount. The assigned team depends on guest count, dessert selection, service duration, equipment, quantities, guest-arrival pattern, placement, and venue conditions, then appears in the proposal.",
  },
  {
    question: "How long does dessert service last?",
    answer:
      "Luxe has not approved one standard dessert-service duration. The operating window is confirmed from guest count, selected dessert, quantities, staffing, equipment, when guests are expected to arrive, the wider event schedule, and venue access.",
  },
  {
    question: "What is the difference between a dessert cart and a dessert table?",
    answer:
      "A dessert table usually presents a broad selection of pre-arranged sweets for self-service, which can work well when guests need quick, flexible access. A hosted Sweet Cart is appropriate when live preparation, attendant-led service, and guest interaction should become part of the event. Compare the desired selection, preparation style, timing, staffing, space, presentation, and guest flow before choosing.",
  },
  {
    question: "Which sauces and toppings are included?",
    answer:
      "Every dessert experience includes premium sauces and a selection of standard toppings. The available sauce collection includes Belgian milk chocolate, Belgian white chocolate, Nutella, caramel, strawberry, pure maple syrup, Lotus Biscoff, and pistachio cream. The final included selection is confirmed for the event.",
  },
  {
    question: "Are premium toppings available?",
    answer:
      "Yes. Premium toppings such as fresh strawberries, blueberries, KitKat Bites, Kinder Bueno, crushed pistachios, crushed pecans, and knafeh are available as enhancements.",
  },
  {
    question: "Can toppings be customized?",
    answer:
      "Yes. Sauces, standard toppings, and available premium toppings can be selected around the dessert experience. Requests outside the confirmed menu require review for sourcing, preparation, allergies, service speed, and presentation.",
  },
  {
    question: "Can dietary restrictions and allergies be accommodated?",
    answer:
      "Share dietary restrictions, allergies, and cross-contact concerns before the menu is finalized. Luxe reviews each request against the selected dessert, ingredients, toppings, equipment, preparation process, and event setting. No allergen-free service or accommodation is confirmed until the event requirements have been reviewed.",
  },
  {
    question: "Can multiple dessert types be combined?",
    answer:
      "Multiple dessert types can be requested. Because every combination is not defined as a standard inclusion, Luxe confirms the available pairing, equipment, staffing, and service format in the event proposal.",
  },
  {
    question: "Is soft serve available?",
    answer:
      "Yes. Vanilla or Chocolate soft serve can be added as an optional enhancement to a selected Sweet Cart dessert experience; it is not offered as a standalone cart or service.",
  },
  {
    question: "Can the Sweet Cart setup be branded?",
    answer:
      "Yes. The selected dessert, sauces, toppings, cart collection, menu display, custom signage, colour direction, and approved branding can be planned together. The final treatment must remain practical for on-site preparation, clear guest choices, service speed, and the confirmed event setting.",
  },
  {
    question: "How many guests can Luxe Sweet Cart serve?",
    answer:
      "Luxe Sweet Cart supports events of up to 400 guests and can support up to three simultaneous setups. Dessert selection, service duration, staffing, venue access, and event flow are reviewed before the service plan is confirmed.",
  },
  {
    question: "Is setup and teardown included?",
    answer:
      "Yes. Setup and takedown are included with the confirmed dessert experience. Exact access and timing requirements are coordinated around the venue and event schedule.",
  },
  {
    question: "How much space and power does the Sweet Cart require?",
    answer:
      "Space, power, placement, and access requirements depend on the selected dessert, equipment, cart collection, staffing, and number of stations. Luxe confirms the required footprint and utilities after reviewing the venue and event plan.",
  },
  {
    question: "Can the Sweet Cart operate outdoors?",
    answer:
      "Outdoor service can be requested. Luxe reviews the season, weather exposure, ground conditions, power, access, placement, equipment, and venue requirements before confirming whether the planned setup is suitable for the event.",
  },
  {
    question: "Which events are best suited to Luxe Sweet Cart?",
    answer:
      "Sweet Cart is suited to weddings, bridal and baby showers, birthdays, corporate events, brand activations, and private celebrations where live preparation and a visually refined dessert moment add to the atmosphere.",
  },
] as const;
