import { eventTypes } from "./site-config";

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
    image: {
      id: "home-personal-gatherings",
      src: "/images/home/personal-celebrations.webp",
      alt: "White Luxe mobile coffee cart prepared beneath greenery for a Toronto wedding or private celebration",
      width: 1220,
      height: 1340,
      sizes:
        "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 38vw",
      status: "approved",
      format: "webp",
    },
    video: {
      mp4: "/images/home/luxe-weddings-private-events.mp4",
      webm: "/images/home/luxe-weddings-private-events.webm",
      poster: "/images/home/luxe-weddings-private-events-poster.webp",
    },
  },
  {
    id: "professional-gatherings",
    eventSlugs: ["corporate-events", "brand-activations"],
    tone: "coffee",
    label: "Corporate Events & Brand Activations",
    context: "Professional mobile espresso bars, custom-branded beverage cups, and refined event spaces for corporate teams, clients, and brand launches.",
    image: {
      id: "home-professional-gatherings",
      src: "/images/home/professional-occasions.webp",
      alt: "Guests gathered around lounge seating and floral tables at a bright Toronto corporate event reception",
      width: 788,
      height: 874,
      sizes:
        "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 38vw",
      status: "approved",
      format: "webp",
    },
    video: {
      mp4: "/images/home/luxe-corporate-events-brand-activations.mp4",
      webm: "/images/home/luxe-corporate-events-brand-activations.webm",
      poster: "/images/home/luxe-corporate-events-brand-activations-poster.webp",
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
    image: {
      id: "home-occasion-in-context",
      src: "/images/home/work-in-context.webp",
      alt: "Luxe mobile coffee bar with branded cups and pastries arranged in an arched Toronto event space",
      width: 2400,
      height: 1351,
      sizes: "(max-width: 700px) calc(100vw - 40px), 88vw",
      status: "approved",
      format: "webp",
    },
  },
] as const;

export const homeWorkingImage = {
  id: "cohesive-service",
  label: "Connected from beginning to end",
  context: "The details remain aligned through planning, service, and delivery.",
  tone: "combined",
  image: {
    id: "home-cohesive-service",
    src: "/images/home/working-with-luxe.webp",
    alt: "Rabbit mascot presenting a personalized iced drink at a themed Toronto brand event",
    width: 768,
    height: 1064,
    sizes:
      "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 42vw",
    status: "approved",
    format: "webp",
  },
  video: {
    mp4: "/images/home/luxe-working-with-luxe.mp4",
    webm: "/images/home/luxe-working-with-luxe.webm",
    poster: "/images/home/luxe-working-with-luxe-poster.webp",
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
