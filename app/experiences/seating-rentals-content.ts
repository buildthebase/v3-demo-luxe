import { approvedBusinessIdentity } from "../local-seo";

export const rentalCategories = [
  {
    id: "chairs",
    number: "01",
    name: "White Resin Chairs",
    role: "300 chairs available",
    description:
      "White resin chairs for wedding ceremonies and receptions, baby and bridal showers, birthdays, and private celebrations.",
  },
  {
    id: "tables",
    number: "02",
    name: "6-ft Rectangular Tables",
    role: "25 tables available",
    description:
      "Rectangular tables for guest seating, dining, food displays, gifts, and practical event setups. Coordinating linens are also available.",
  },
  {
    id: "cocktail-tables",
    number: "03",
    name: "Cocktail Tables",
    role: "10 high-top tables available",
    description:
      "High-top cocktail tables for arrivals, mingling, and standing service, with black or white cocktail-table linens.",
  },
  {
    id: "tents",
    number: "04",
    name: "Event Tents",
    role: "Six tents across three sizes",
    items: [
      {
        label: "Three 20' × 20' tents",
        subitems: ["Two vinyl-top tents", "One clear-top tent"],
      },
      { label: "One 15' × 15' tent" },
      { label: "Two 10' × 10' tents" },
    ],
    description: "Available for outdoor events, subject to site and weather review.",
  },
  {
    id: "dance-floor",
    number: "05",
    name: "Dance Floor",
    role: "18' × 18' dance floor",
    description:
      "A dedicated dance floor sized for intimate weddings, birthdays, engagements, and private celebrations.",
  },
  {
    id: "finishing",
    number: "06",
    name: "Linens, Tent Walls & Lighting",
    role: "Finishing pieces for a complete setup",
    description:
      "Table linens, black or white cocktail-table linens, tent walls, and tent lighting to complete indoor and outdoor rental setups.",
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
      "Using venue or site dimensions, we help plan the placement of our tables, chairs, cocktail tables, and dance floor around comfortable guest movement.",
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
      "On-site placement is completed according to the agreed rental layout. Our crew arranges the selected chairs, tables, cocktail tables, dance floor, and tent elements included in the setup scope.",
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
    context: "Ceremony seating and intimate weddings of approximately 100–150 guests, with tables, tents, linens, lighting, cocktail tables, and a dance floor.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Chairs, tables, linens, and optional tenting for indoor or backyard showers, including typical gatherings of roughly 30–80 guests.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "Guest seating, dining and display tables, cocktail tables, and linens for showers of roughly 30–80 guests, with coffee and dessert available through Luxe.",
  },
  {
    href: "/events/birthdays",
    label: "Birthdays",
    context: "Flexible rental setups for family celebrations, milestone parties, and outdoor gatherings.",
  },
  {
    href: "/events/private-events",
    label: "Backyard & Outdoor Events",
    context: "Tents, walls, lighting, tables, chairs, linens, cocktail tables, and a dance floor in one coordinated rental plan.",
  },
  {
    href: "/events/private-events",
    label: "Engagements & Private Events",
    context: "Practical rental support for engagements, anniversaries, graduations, and family gatherings.",
  },
] as const;

export const rentalGalleryPreview = [
  {
    number: "02",
    label: "The layout in use",
    note: "A guest-ready layout showing how the setting functions in use.",
    tone: "layout",
  },
  {
    number: "03",
    label: "Linens, lighting and finishing details",
    note: "A closer view of the practical finishing pieces that complete the setup.",
    tone: "detail",
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
    question: "What is included with an event-rental service?",
    answer:
      "Luxe offers 300 white resin chairs, 25 six-foot rectangular tables, 10 cocktail tables, three 20-foot by 20-foot tents with two vinyl tops and one clear top, one 15-foot by 15-foot tent, two 10-foot by 10-foot tents, an 18-foot by 18-foot dance floor, table and cocktail linens, tent walls, and tent lighting. Your proposal confirms availability and any agreed delivery, placement, setup, takedown, or pickup responsibilities.",
  },
  {
    question: "Does Luxe deliver rentals?",
    answer:
      "Delivery may be available within Toronto, the approved GTA service area, and for qualified extended-travel requests, but the current approved intake does not define one universal rental-delivery boundary or policy. Luxe reviews the venue address, requested inventory and quantities, route and travel time, parking or loading access, stairs or elevators, delivery window, placement or setup responsibilities, pickup plan, labour, and fees before confirming delivery.",
  },
  {
    question: "Is rental setup included?",
    answer:
      "Setup is not universally included. The proposal states whether delivery, placement, or installation is available for the selected inventory and identifies the agreed responsibilities, labour, timing, access requirements, and fees.",
  },
  {
    question: "Is rental teardown included?",
    answer:
      "Teardown and pickup responsibilities must be confirmed in the proposal. Timing, venue access, after-hours requirements, and the selected inventory can affect the final scope.",
  },
  {
    question: "Can rentals be combined with coffee or dessert?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can be requested independently or planned together through one inquiry and proposal journey.",
  },
  {
    question: "Can rentals be styled to match the event?",
    answer:
      "Yes, within the confirmed inventory. Black or white cocktail-table linens, linens for the 6-ft tables, tent walls, and tent lighting can help the setup feel cohesive. The rental plan can also be coordinated with Luxe Coffee Bar and Luxe Sweet Cart for one consistent event experience.",
  },
  {
    question: "Which areas does Luxe serve?",
    answer:
      "Luxe primarily serves Toronto and the Greater Toronto Area, including Scarborough, Etobicoke, North York, Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City, Thornhill, Mississauga, Brampton, Oakville, Burlington, Milton, Pickering, Ajax, Whitby, and Oshawa. Rental requests outside the primary area are reviewed individually, and availability or travel terms are not confirmed until the proposal is approved.",
  },
  {
    question: "Are travel or delivery fees applicable?",
    answer:
      "Travel fees may apply outside Luxe's standard service area, and rental delivery may carry event-specific transport, labour, access, setup, or pickup costs. Distance thresholds and the universal rental-delivery fee policy remain unapproved, so the proposal must state the available delivery model, responsibilities, and every applicable charge.",
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
