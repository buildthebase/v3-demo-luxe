import { approvedBusinessIdentity } from "../local-seo";

export const rentalCategories = [
  {
    id: "chairs",
    number: "01",
    name: "White Resin Chairs",
    role: "300 White Resin Chairs available",
    description:
      "White resin chairs for wedding ceremonies and receptions, baby and bridal showers, birthdays, and private celebrations.",
  },
  {
    id: "tables",
    number: "02",
    name: "6-ft Rectangular Tables",
    role: "25 × 6-ft Rectangular Tables available",
    description:
      "6-ft rectangular tables for guest seating, dining, food displays, gifts, and practical event setups. Linens for our 6-ft tables are also available.",
  },
  {
    id: "cocktail-tables",
    number: "03",
    name: "Cocktail Tables",
    role: "10 Cocktail Tables available",
    description:
      "Cocktail tables for arrivals, mingling, and standing service, with black & white cocktail table linens.",
  },
  {
    id: "tents",
    number: "04",
    name: "Event Tents",
    role: "Six tents across three sizes",
    items: [
      {
        label: "3 × 20' × 20' tents",
        subitems: ["2 vinyl-top tents", "1 clear-top tent"],
      },
      { label: "2 × 10' × 10' tents" },
      { label: "1 × 15' × 15' tent" },
    ],
    description: "Available for outdoor events, subject to site and weather review.",
  },
  {
    id: "dance-floor",
    number: "05",
    name: "Dance Floor",
    role: "Dance-floor configurations available up to 18' × 18'.",
    description:
      "Dance-floor configurations available up to 18' × 18' for intimate weddings, birthdays, engagements and private celebrations.",
  },
  {
    id: "finishing",
    number: "06",
    name: "Linens, Tent Walls & Tent Lighting",
    role: "Available with Luxe tent rentals, not as a standalone service",
    description:
      "Linens for our 6-ft tables, black & white cocktail table linens and tent walls are available. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service.",
  },
] as const;

export const tentConfigurationOptions = [
  {
    id: "20-by-20",
    configuration: "20' × 20'",
    setup: "Single tent",
    moduleSize: 20,
    diagramGroups: [1],
  },
  {
    id: "20-by-40",
    configuration: "20' × 40' combined configuration",
    setup: "Two 20' × 20' tents",
    moduleSize: 20,
    diagramGroups: [2],
  },
  {
    id: "15-by-15",
    configuration: "15' × 15'",
    setup: "Standalone",
    moduleSize: 15,
    diagramGroups: [1],
  },
  {
    id: "10-by-10",
    configuration: "10' × 10'",
    setup: "Single or paired",
    moduleSize: 10,
    diagramGroups: [1, 2],
  },
] as const;

export const layoutStudies = [
  {
    number: "01",
    title: "Chair and table quantities",
    lead: "Start with the guest count and how the event will be used.",
    description:
      "We can help estimate how many chairs, 6-ft tables, and cocktail tables make sense for your ceremony, shower, dinner, or celebration.",
    tone: "ceremony",
  },
  {
    number: "02",
    title: "Rental placement and flow",
    lead: "The core rentals should fit the room without crowding it.",
    description:
      "Using venue or site dimensions, we help plan the placement of our tables, chairs and cocktail tables around comfortable guest movement. Dance-floor configurations available up to 18' × 18'.",
    tone: "reception",
  },
  {
    number: "03",
    title: "Tent and outdoor layouts",
    lead: "Outdoor rentals begin with the available footprint.",
    description:
      "We review how our tent sizes and rental pieces can work within the site, including practical spacing for entrances, tables, service, and dancing.",
    tone: "social",
  },
] as const;

export const rentalOperations = [
  {
    number: "01",
    title: "Delivery",
    status: "Planned for the venue",
    description:
      "Timed delivery scheduled around your venue loading dock access, event timeline, and order scope. All travel requirements and scheduling are confirmed in your rental proposal.",
  },
  {
    number: "02",
    title: "Setup",
    status: "Defined within the proposal",
    description:
      "On-site placement is completed according to the agreed rental layout. Our crew arranges the selected chairs, tables, cocktail tables and tent elements included in the setup scope. Dance-floor configurations available up to 18' × 18'.",
  },
  {
    number: "03",
    title: "Teardown and pickup",
    status: "Confirmed before the event",
    description:
      "Efficient post-event load-out scheduled around venue curfew. Pickup timing, after-hours access, and teardown responsibilities are fully verified ahead of time.",
  },
] as const;

export const rentalEventLinks = [
  {
    href: "/events/weddings",
    label: "Weddings",
    context: "Ceremony seating, reception rentals, tents, tables and linens for indoor and outdoor weddings. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Chairs, tables, linens and optional tenting for indoor, backyard and private baby showers.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "Coordinated seating, tables, linens and optional outdoor rentals for elegant bridal celebrations.",
  },
  {
    href: "/events/private-events",
    label: "Birthdays & Private Events",
    context: "Essential rental pieces for backyard celebrations, birthdays, engagements, anniversaries and other private events.",
  },
] as const;

export const rentalGalleryPreview = [
  {
    number: "01",
    label: "White resin chairs",
    note: "Reserved for Luxe photography of the current chair inventory.",
    tone: "chairs",
  },
  {
    number: "02",
    label: "6-ft tables",
    note: "Reserved for Luxe photography of the current rectangular tables.",
    tone: "tables",
  },
  {
    number: "03",
    label: "Cocktail tables",
    note: "Reserved for Luxe photography of the current cocktail tables.",
    tone: "cocktail-tables",
  },
  {
    number: "04",
    label: "Tents",
    note: "Reserved for Luxe photography of the current tent inventory.",
    tone: "tents",
  },
  {
    number: "05",
    label: "Tent Lighting",
    note: "Reserved for Luxe photography of Tent Lighting available with Luxe tent rentals and not offered as a standalone service.",
    tone: "tent-lighting",
  },
  {
    number: "06",
    label: "Dance Floor",
    note: "Reserved for Luxe photography of Dance-floor configurations available up to 18' × 18'.",
    tone: "dance-floor",
  },
  {
    number: "07",
    label: "Linens",
    note: "Reserved for Luxe photography of the current table and cocktail linens.",
    tone: "linens",
  },
  {
    number: "08",
    label: "Complete event setups",
    note: "Reserved for Luxe photography of complete backyard and event setups.",
    tone: "complete-setups",
  },
] as const;

export const rentalServiceAreas = [
  "Greater Toronto Area",
  ...approvedBusinessIdentity.primaryServiceAreas,
] as const;

export const seatingRentalFaqs = [
  {
    question: "How are chairs and tables priced?",
    answer:
      "Seating and table rental pricing is determined by the selected items, quantities, event date, venue location, delivery access, and agreed service scope. The proposal itemizes the confirmed rental and operational charges for the booking.",
  },
  {
    question: "What event rentals does Luxe offer?",
    answer:
      "Luxe offers a focused rental collection including white resin chairs, 6-ft rectangular tables, cocktail tables, linens, tents and tent walls. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
  },
  {
    question: "Does Luxe deliver rentals?",
    answer:
      "Yes. Delivery is available throughout Toronto and the GTA, with select extended-distance requests considered based on availability. Delivery fees are calculated based on location, order size, access requirements and requested service.",
  },
  {
    question: "Is rental setup included?",
    answer:
      "Setup is available and will be clearly identified in your proposal. Depending on your rental order, you may choose delivery only or delivery with professional setup. Any applicable setup fees are confirmed before booking.",
  },
  {
    question: "Is rental teardown included?",
    answer:
      "Pickup and takedown arrangements are confirmed in your proposal based on the selected rentals, event schedule and venue access. After-hours or special-access requirements may carry additional fees.",
  },
  {
    question: "Can rentals be combined with coffee or dessert?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can be requested independently or planned together through one inquiry and proposal journey.",
  },
  {
    question: "Can rentals be styled to match the event?",
    answer:
      "Yes, within the confirmed inventory. Black or white cocktail-table linens, linens for the 6-ft tables, and tent walls can help the setup feel cohesive. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone rental service. The rental plan can also be coordinated with Luxe Coffee Bar and Luxe Sweet Cart for one consistent event experience.",
  },
  {
    question: "Is Tent Lighting available separately?",
    answer:
      "Tent Lighting is available with Luxe tent rentals and is not offered as a standalone lighting service.",
  },
  {
    question: "Which areas does Luxe serve?",
    answer:
      "Luxe primarily serves Toronto and the Greater Toronto Area, including Scarborough, Etobicoke, North York, Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City, Thornhill, Mississauga, Brampton, Oakville, Burlington, Milton, Pickering, Ajax, Whitby and Oshawa. Select extended-distance requests are available based on inventory, event scope and logistics, with travel terms clearly included in the proposal.",
  },
  {
    question: "Are travel or delivery fees applicable?",
    answer:
      "Delivery and travel fees may apply based on event location, rental order, access requirements and whether setup or pickup services are requested. All applicable fees are clearly outlined in your proposal before booking.",
  },
  {
    question: "Can Luxe rentals be used outdoors?",
    answer:
      "Outdoor applications can be planned, but suitability is event-specific. Surface, access, weather planning, wind, tent requirements, utilities, venue rules, and the selected inventory must be reviewed before confirmation.",
  },
  {
    question: "What information is required for a rental quote?",
    answer:
      "Share the event date, venue address, event type, guest count, indoor or outdoor setting, requested categories, estimated quantities, floor plan or dimensions where available, delivery access, timing, setup and teardown needs, and any Coffee Bar or Sweet Cart experiences being requested.",
  },
] as const;
