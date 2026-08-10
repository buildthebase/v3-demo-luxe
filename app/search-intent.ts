export type SearchIntent = {
  path: string;
  page: string;
  primary: string;
  supporting: string[];
  status: "strategic-draft";
};

// These are planning inputs only. Final metadata waits for live search and first-party data validation.
export const searchIntents: SearchIntent[] = [
  {
    path: "/",
    page: "Home",
    primary: "Luxury event experiences Toronto",
    supporting: ["Coffee, dessert and event rentals GTA"],
    status: "strategic-draft",
  },
  {
    path: "/experiences",
    page: "Experiences",
    primary: "Event experiences Toronto",
    supporting: ["Coffee bar", "Dessert cart", "Event rentals"],
    status: "strategic-draft",
  },
  {
    path: "/experiences/coffee-bar",
    page: "Coffee Bar",
    primary: "Mobile coffee bar Toronto",
    supporting: ["Espresso bar catering", "Wedding coffee bar", "Corporate coffee catering"],
    status: "strategic-draft",
  },
  {
    path: "/experiences/sweet-cart",
    page: "Sweet Cart",
    primary: "Dessert cart rental Toronto",
    supporting: ["Mini pancake catering", "Waffle cart", "Mini donut catering"],
    status: "strategic-draft",
  },
  {
    path: "/experiences/seating-rentals",
    page: "Seating Rentals",
    primary: "Chair table and tent rentals Toronto",
    supporting: ["Wedding chair rentals", "Shower table rentals", "Backyard tent rentals GTA"],
    status: "strategic-draft",
  },
  {
    path: "/events",
    page: "Events",
    primary: "Event services Toronto",
    supporting: ["Weddings", "Corporate events", "Showers", "Celebrations"],
    status: "strategic-draft",
  },
  {
    path: "/events/weddings",
    page: "Weddings",
    primary: "Wedding coffee bar Toronto",
    supporting: ["Wedding dessert cart", "Wedding rentals", "Cocktail-hour coffee"],
    status: "strategic-draft",
  },
  {
    path: "/events/corporate-events",
    page: "Corporate Events",
    primary: "Corporate coffee catering GTA",
    supporting: ["Office events", "Employee appreciation", "Conferences"],
    status: "strategic-draft",
  },
  {
    path: "/events/brand-activations",
    page: "Brand Activations",
    primary: "Branded coffee cart Toronto",
    supporting: ["Product launches", "Retail activations", "Branded drinks"],
    status: "strategic-draft",
  },
  {
    path: "/events/baby-showers",
    page: "Baby Showers",
    primary: "Baby shower dessert cart Toronto",
    supporting: ["Baby shower coffee cart", "Baby shower rentals"],
    status: "strategic-draft",
  },
  {
    path: "/events/bridal-showers",
    page: "Bridal Showers",
    primary: "Bridal shower coffee cart Toronto",
    supporting: ["Bridal shower dessert cart", "Bridal shower seating"],
    status: "strategic-draft",
  },
  {
    path: "/events/birthdays",
    page: "Birthdays",
    primary: "Birthday dessert catering Toronto",
    supporting: ["Coffee bar for birthdays", "Dessert carts for birthdays"],
    status: "strategic-draft",
  },
  {
    path: "/events/private-events",
    page: "Private Events",
    primary: "Private event catering GTA",
    supporting: ["Engagements", "Anniversaries", "Graduations", "Celebrations"],
    status: "strategic-draft",
  },
  {
    path: "/gallery",
    page: "Gallery",
    primary: "Toronto event gallery",
    supporting: [
      "Mobile coffee bar",
      "Live dessert cart",
      "Weddings",
      "Corporate events",
      "Event rentals",
    ],
    status: "strategic-draft",
  },
  {
    path: "/faq",
    page: "FAQ",
    primary: "Luxe Event Co. booking questions",
    supporting: ["Pricing", "Booking", "Setup", "Travel", "Customization"],
    status: "strategic-draft",
  },
  {
    path: "/contact",
    page: "Contact",
    primary: "Contact Luxe Event Co.",
    supporting: ["Toronto event inquiry", "Coffee bar inquiry", "Dessert cart inquiry", "Event rental inquiry"],
    status: "strategic-draft",
  },
];

export const searchIntentByPath = Object.fromEntries(
  searchIntents.map((intent) => [intent.path, intent]),
) as Record<string, SearchIntent>;

export const searchIntentValidationRequirements = [
  "Current search-result analysis",
  "Competitor review",
  "Google Search Console data when available",
  "Google Business Profile insights",
  "Keyword research",
] as const;

export function hasUniquePrimaryIntents(intents: SearchIntent[] = searchIntents) {
  const primaries = intents.map((intent) => intent.primary.toLowerCase());
  return new Set(primaries).size === primaries.length;
}
