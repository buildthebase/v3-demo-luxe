import { eventTypes } from "./site-config";
import { imageAssets } from "./image-system";

const featuredEventSlugs = [
  "weddings",
  "private-events",
  "corporate-events",
  "brand-activations",
] as const;

export const featuredHomeEvents = featuredEventSlugs.map((slug, index) => {
  const event = eventTypes.find((item) => item.slug === slug)!;

  return {
    ...event,
    number: String(index + 1).padStart(2, "0"),
  };
});

export const homeEventImageGroups = [
  {
    id: "personal-gatherings",
    eventSlugs: ["weddings", "private-events"],
    tone: "dessert",
    label: "Weddings & Private Celebrations",
    context: "Wedding coffee bar service, dessert cart rentals, and event seating shaped around meaningful moments and guest hospitality.",
    image: imageAssets.home.personalCelebrations,
    video: {
      mp4: "/images/home/luxe-weddings-private-events.mp4",
      webm: "/images/home/luxe-weddings-private-events.webm",
      poster: imageAssets.home.weddingsPrivateEventsPoster.src,
    },
  },
  {
    id: "professional-gatherings",
    eventSlugs: ["corporate-events", "brand-activations"],
    tone: "coffee",
    label: "Corporate Events & Brand Activations",
    context: "Professional mobile espresso bars, custom-branded beverage cups, and refined event spaces for corporate teams, clients, and brand launches.",
    image: imageAssets.home.professionalOccasions,
    video: {
      mp4: "/images/home/luxe-corporate-events-brand-activations.mp4",
      webm: "/images/home/luxe-corporate-events-brand-activations.webm",
      poster: imageAssets.home.corporateBrandActivationsPoster.src,
    },
  },
] as const;

export const homeProofPoints = [
  {
    value: "$5M",
    label: "liability insurance",
    detail: "A meaningful layer of assurance for venues, planners, and corporate teams.",
  },
  {
    value: "500",
    label: "guest coffee capacity",
    detail: "Coffee service can be planned for intimate gatherings through large-format events.",
  },
  {
    value: "03",
    label: "simultaneous setups",
    detail: "Confirmed coffee and dessert setup capacity supports multi-event and larger programs.",
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
    context: "Hospitality, presentation, and the surrounding space brought together as one experience.",
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
