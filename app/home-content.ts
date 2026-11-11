import { eventTypes } from "./site-config";
import { imageAssets } from "./image-system";

const featuredEventSlugs = [
  "weddings",
  "private-events",
  "corporate-events",
  "brand-activations",
] as const;

const homeEventSummaries: Record<(typeof featuredEventSlugs)[number], string> = {
  weddings: "Coffee bars, live dessert stations, and event rentals thoughtfully coordinated around your wedding day.",
  "private-events": "Personalized coffee, desserts, and event experiences for engagements, anniversaries, graduations, and private gatherings.",
  "corporate-events": "Elevated hospitality experiences for employees, clients, conferences, and workplace celebrations.",
  "brand-activations": "Custom-branded coffee and dessert experiences that bring your brand to life through interactive guest engagement.",
};

export const featuredHomeEvents = featuredEventSlugs.map((slug, index) => {
  const event = eventTypes.find((item) => item.slug === slug)!;

  return {
    ...event,
    summary: homeEventSummaries[slug],
    number: String(index + 1).padStart(2, "0"),
  };
});

export const homeEventImageGroups = [
  {
    id: "personal-gatherings",
    eventSlugs: ["weddings", "private-events"],
    tone: "dessert",
    label: "Weddings & Private Celebrations",
    context: "Celebrate life's meaningful moments with specialty coffee, live desserts, and event rentals tailored to your occasion.",
    image: imageAssets.home.personalCelebrations,
    video: {
      mp4: "/images/home/luxe-weddings-private-events-v2.mp4",
      webm: "/images/home/luxe-weddings-private-events-v2.webm",
      poster: imageAssets.home.weddingsPrivateEventsPoster.src,
    },
  },
  {
    id: "professional-gatherings",
    eventSlugs: ["corporate-events", "brand-activations"],
    tone: "coffee",
    label: "Corporate Events & Brand Activations",
    context: "Professional beverage service, interactive dessert stations, and custom-branded experiences for corporate gatherings, conferences, and brand activations.",
    image: imageAssets.home.professionalOccasions,
    video: {
      mp4: "/images/home/luxe-corporate-events-brand-activations-v3.mp4",
      webm: "/images/home/luxe-corporate-events-brand-activations-v3.webm",
      poster: imageAssets.home.corporateBrandActivationsPoster.src,
    },
  },
] as const;

export const homeProofPoints = [
  {
    value: "$5M",
    label: "Commercial Liability Coverage",
    detail: "Supporting venue, planner, corporate, and private-event insurance requirements.",
  },
  {
    value: "Flexible",
    label: "Event Formats",
    detail: "From intimate gatherings to larger celebrations, our services are tailored around guest count, venue requirements, and event flow.",
  },
  {
    value: "Multiple",
    label: "Setups Available",
    detail: "Additional coffee bars, dessert stations, and event rental setups can be arranged for larger or multi-space events, subject to availability.",
  },
] as const;

export const homeWorkingPrinciples = [
  {
    marker: "1st",
    markerLabel: "First",
    title: "The occasion comes first.",
    description:
      "Luxe begins with the event, audience, venue, and atmosphere before shaping the service around it.",
  },
  {
    marker: "∞",
    markerLabel: "Continuously connected",
    title: "The details stay connected.",
    description:
      "Menus, presentation, signage, service flow, and the physical setting are shaped as one cohesive guest experience.",
  },
  {
    marker: "⧉",
    markerLabel: "Composed layers",
    title: "The experience feels thoughtful.",
    description:
      "Professional service, setup, teardown, and event-day hospitality are built into the way Luxe works.",
  },
] as const;

export const homeTestimonialPlaceholders = [
  {
    quote:
      "The service felt cohesive from the first planning conversation through the final guest interaction.",
    context: "Wedding client",
  },
  {
    quote:
      "Every detail felt connected—the presentation, the hospitality, and the way the room came together.",
    context: "Corporate event partner",
  },
  {
    quote:
      "Luxe made several moving pieces feel like one calm, cohesive experience.",
    context: "Private event host",
  },
  {
    quote:
      "The team understood the room immediately and shaped the service around how our guests would move through it.",
    context: "Venue partner",
  },
  {
    quote:
      "From the first pour to the final detail, the experience felt polished, personal, and easy for our team.",
    context: "Brand activation client",
  },
  {
    quote:
      "Coffee, dessert, and the setting each had their own moment, yet everything still felt beautifully connected.",
    context: "Celebration host",
  },
] as const;

export const homeImageSlots = [
  {
    id: "occasion-in-context",
    label: "The whole occasion",
    context: "From the first welcome drink to the final dessert, discover how Luxe brings hospitality, presentation, and meaningful guest experiences together.",
    tone: "seating",
    image: imageAssets.home.workInContext,
  },
] as const;

export const homeWorkingImage = {
  id: "cohesive-service",
  label: "Connected from beginning to end",
  context: "The details remain aligned through planning, service, and delivery.",
  tone: "combined",
  image: imageAssets.home.workingWithLuxe,
  video: {
    mp4: "/images/home/luxe-working-with-luxe.mp4",
    webm: "/images/home/luxe-working-with-luxe.webm",
    poster: imageAssets.home.workingWithLuxePoster.src,
  },
} as const;

export const homeTestimonialSlots = [
  {
    context: "Wedding perspective",
    requirement: "Approved client quotation with event and venue context",
  },
  {
    context: "Corporate perspective",
    requirement: "Approved client quotation with organization and activation context",
  },
] as const;

export const homeServiceAreaGroups = [
  {
    label: "Toronto & districts",
    places: ["Toronto", "North York", "Scarborough", "Etobicoke"],
  },
  {
    label: "York & North GTA",
    places: [
      "Markham",
      "Vaughan",
      "Richmond Hill",
      "Aurora",
      "Newmarket",
      "King City",
      "Thornhill",
    ],
  },
  {
    label: "West GTA",
    places: ["Mississauga", "Brampton", "Oakville", "Burlington", "Milton"],
  },
  {
    label: "East GTA",
    places: ["Pickering", "Ajax", "Whitby", "Oshawa"],
  },
  {
    label: "Regional",
    places: [
      "Greater Toronto Area (GTA)",
      "Southern Ontario (for larger events)",
    ],
  },
] as const;
