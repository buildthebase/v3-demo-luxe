export type EventHubEntry = {
  slug:
    | "weddings"
    | "corporate-events"
    | "brand-activations"
    | "baby-showers"
    | "bridal-showers"
    | "birthdays"
    | "private-events";
  number: string;
  name: string;
  cue: string;
  statement: string;
  summary: string;
};

export const eventHubEntries: EventHubEntry[] = [
  {
    slug: "weddings",
    number: "01",
    name: "Weddings",
    cue: "The full celebration",
    statement: "Hospitality carried through the celebration.",
    summary:
      "Mobile coffee, live desserts, and focused chair, table, tent, linen, and dance-floor rentals for ceremonies, receptions, and outdoor weddings.",
  },
  {
    slug: "corporate-events",
    number: "02",
    name: "Corporate Events",
    cue: "Purposeful hospitality",
    statement: "Service shaped around the schedule.",
    summary:
      "For conferences, product launches, and corporate galas, Luxe aligns coffee bars and dessert stations with your itinerary and brand aesthetic.",
  },
  {
    slug: "brand-activations",
    number: "03",
    name: "Brand Activations",
    cue: "The brief, made tangible",
    statement: "An experience guests can see, taste, and remember.",
    summary:
      "Custom branded coffee and live dessert setups translate your campaign details into an engaging, shareable guest experience.",
  },
  {
    slug: "baby-showers",
    number: "04",
    name: "Baby Showers",
    cue: "A beautiful beginning",
    statement: "A welcoming setting for family and friends.",
    summary:
      "Specialty drinks, freshly prepared desserts, and practical chair and table rentals designed for a warm, memorable afternoon.",
  },
  {
    slug: "bridal-showers",
    number: "05",
    name: "Bridal Showers",
    cue: "Before the next chapter",
    statement: "A considered setting for the people closest to the couple.",
    summary:
      "Welcome drinks, live sweet stations, and stylish seating arranged to foster conversation, beautiful photo moments, and effortless gathering.",
  },
  {
    slug: "birthdays",
    number: "06",
    name: "Birthdays",
    cue: "A milestone, made personal",
    statement: "Built around the guest of honour.",
    summary:
      "Customized espresso menus, interactive dessert carts, and confirmed chair and table rentals suited to the birthday and guest count.",
  },
  {
    slug: "private-events",
    number: "07",
    name: "Private Events",
    cue: "Gather in your own way",
    statement: "A complete experience for personal milestones.",
    summary:
      "Engagements, anniversaries, graduations, and holiday parties brought to life through a single tailored Luxe service or a full-suite experience.",
  },
];

export const eventLedPrinciples = [
  {
    number: "01",
    label: "Occasion",
    description: "Start with what is being celebrated, hosted, or launched.",
  },
  {
    number: "02",
    label: "Guests",
    description: "Consider guest count and how people will gather, mingle, and interact.",
  },
  {
    number: "03",
    label: "Flow",
    description: "Position each experience to elevate the natural rhythm of your space.",
  },
] as const;

export const eventsGalleryPreview = [
  {
    id: "wedding-hospitality",
    number: "01",
    label: "Wedding hospitality",
    context: "Coffee, dessert, and the setting in use",
    tone: "wedding",
  },
  {
    id: "corporate-service",
    number: "02",
    label: "Corporate service",
    context: "Guest interaction and branded presentation",
    tone: "corporate",
  },
  {
    id: "private-gathering",
    number: "03",
    label: "Private gathering",
    context: "Atmosphere, details, and room composition",
    tone: "private",
  },
] as const;
