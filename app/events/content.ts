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
      "Mobile coffee, live desserts and coordinated chair, table, tent and linen rentals for ceremonies, receptions and outdoor weddings. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
  },
  {
    slug: "corporate-events",
    number: "02",
    name: "Corporate Events",
    cue: "Purposeful hospitality",
    statement: "Service shaped around the schedule.",
    summary:
      "Premium Coffee Bar and Sweet Cart experiences for conferences, office events, client appreciation, networking events and corporate celebrations, with customization available to complement your brand.",
  },
  {
    slug: "brand-activations",
    number: "03",
    name: "Brand Activations",
    cue: "The brief, made tangible",
    statement: "An experience guests can see, taste, and remember.",
    summary:
      "Custom-branded coffee and live dessert experiences designed for product launches, pop-ups and brand activations where guest interaction and presentation matter.",
  },
  {
    slug: "baby-showers",
    number: "04",
    name: "Baby Showers",
    cue: "A beautiful beginning",
    statement: "A welcoming setting for family and friends.",
    summary:
      "Coordinated chair, table, linen and optional tent rentals for indoor, backyard and private baby showers.",
  },
  {
    slug: "bridal-showers",
    number: "05",
    name: "Bridal Showers",
    cue: "Before the next chapter",
    statement: "A considered setting for the people closest to the couple.",
    summary:
      "Café-style coffee and matcha service, interactive desserts and select event rentals for elegant bridal celebrations.",
  },
  {
    slug: "birthdays",
    number: "06",
    name: "Birthdays",
    cue: "A milestone, made personal",
    statement: "Built around the guest of honour.",
    summary:
      "Specialty coffee, interactive dessert experiences and select event rentals tailored to the celebration, venue and guest count.",
  },
  {
    slug: "private-events",
    number: "07",
    name: "Private Events",
    cue: "Gather in your own way",
    statement: "A complete experience for personal milestones.",
    summary:
      "Bring Luxe to engagements, anniversaries, graduations, family celebrations and other meaningful occasions with Coffee Bar, Sweet Cart and select event rentals available individually or together.",
  },
];

export const eventLedPrinciples = [
  {
    number: "01",
    label: "Occasion",
    description: "Tell us what you’re celebrating or hosting.",
  },
  {
    number: "02",
    label: "Guests",
    description:
      "Share your guest count so we can recommend the right service and setup.",
  },
  {
    number: "03",
    label: "Space",
    description:
      "We consider your venue, layout and event format when coordinating your selected Luxe experiences.",
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
