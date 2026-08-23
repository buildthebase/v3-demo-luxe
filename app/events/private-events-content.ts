import { imageAssets } from "../image-system";
import type { SignatureExperience } from "../signature-elements";

export const privateEventContexts = [
  {
    number: "01",
    title: "Engagement parties",
    description:
      "Coffee, matcha, live dessert, signage, and selected rentals can support an intimate toast, cocktail-style gathering, dinner, or open-house celebration.",
  },
  {
    number: "02",
    title: "Anniversaries",
    description:
      "A personalized menu, guest-facing dessert moment, or refined room setting can reflect the couple, the milestone, and the way they want to gather.",
  },
  {
    number: "03",
    title: "Graduations",
    description:
      "Coffee and non-coffee drinks, live dessert, custom signage, and flexible gathering spaces can suit daytime receptions, family dinners, and larger celebrations.",
  },
  {
    number: "04",
    title: "Religious and cultural celebrations",
    description:
      "Luxe can discuss beverage, dessert, presentation, dietary, timing, venue, and setup needs with the host, planner, or venue before confirming an appropriate service direction.",
  },
  {
    number: "05",
    title: "Holiday gatherings",
    description:
      "Seasonal beverage collections, coffee, matcha, live dessert, and selected room elements can support private holiday parties and indoor winter gatherings.",
  },
  {
    number: "06",
    title: "Family celebrations / Other milestone events",
    description:
      "Retirements, reunions, accomplishments, welcome-home gatherings, and other personal occasions can begin with this atmosphere and guest experience rather than a predefined package.",
  },
] as const;

export const privateEventExperiences = [
  {
    id: "coffee",
    number: "01",
    label: "Mobile coffee bar and non-coffee drinks",
    name: "Luxe Coffee Bar",
    image: imageAssets.experiences.coffeeBar,
    href: "/experiences/coffee-bar",
    description:
      "Premium mobile coffee service featuring classic coffee drinks, custom signature lattes, Premium Matcha, teas, hot chocolate, dairy alternatives, and seasonal menu items served hot or iced. Select between our versatile Café Cart or full Signature Coffee Bar based on your venue size, guest count, and party schedule.",
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert carts",
    name: "Luxe Sweet Cart",
    image: imageAssets.experiences.sweetCart,
    href: "/experiences/sweet-cart",
    description:
      "Interactive live dessert catering featuring warm Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, and the Luxe Churro Bar made fresh on-site with Premium Sauces and toppings. Menu selections, station setup, toppings bar, and staffing levels are customized in your tailored event proposal.",
  },
  {
    id: "seating",
    number: "03",
    label: "Event seating and rentals",
    name: "Luxe Seating Rentals",
    image: imageAssets.experiences.seatingRentals,
    href: "/experiences/seating-rentals",
    description:
      "White resin chairs, 6-ft tables, cocktail tables, linens, tents, tent lighting, and a dance floor for suitable indoor, backyard, and outdoor celebrations. Availability and any delivery, setup, teardown, or pickup responsibilities are confirmed in the proposal.",
  },
] satisfies readonly SignatureExperience[];

export const privateEventPersonalization = [
  {
    number: "01",
    title: "Menus and drinks",
    description:
      "Signature beverages, seasonal menus, custom cups, and menu displays can be discussed around the occasion and the confirmed experiences.",
  },
  {
    number: "02",
    title: "Signage and presentation",
    description:
      "Event signage, cart details, dessert presentation, and selected visual elements can be tailored to the gathering and its production timeline.",
  },
  {
    number: "03",
    title: "Seating and room details",
    description:
      "The confirmed chairs, tables, cocktail tables, linens, tents, tent lighting, and dance floor can be considered around the venue dimensions and guest count.",
  },
] as const;

export const privateEventPlanningRequirements = [
  {
    number: "01",
    title: "The occasion and atmosphere",
    description:
      "Tell us about the celebration, desired vibe, formality level, and personal touches you want incorporated into the guest experience.",
  },
  {
    number: "02",
    title: "Date, venue, and attendance",
    description:
      "Provide your event date, venue location, estimated guest count, indoor or outdoor setting, timeline, and lead planner contact information.",
  },
  {
    number: "03",
    title: "The experiences in consideration",
    description:
      "Select your desired services including espresso bar, matcha, live dessert carts, rentals, custom signage, and any dietary preferences.",
  },
  {
    number: "04",
    title: "Access and operating conditions",
    description:
      "Share venue access times, setup placement, power availability, weather backup plans, and load-out requirements to ensure smooth execution.",
  },
] as const;

export const privateEventGallery = [
  {
    number: "01",
    label: "Personal hospitality",
    note: "Coffee, matcha, menus, and guest interaction",
    tone: "hospitality",
  },
  {
    number: "02",
    label: "A live centrepiece",
    note: "Dessert preparation, signage, and presentation",
    tone: "dessert",
  },
  {
    number: "03",
    label: "The gathering in context",
    note: "Layout, rentals, atmosphere, and guest flow",
    tone: "setting",
  },
] as const;

export const privateEventFaqs = [
  {
    question: "Which occasions are planned private events?",
    answer:
      "Private events can include engagement parties, anniversaries, graduations, religious and cultural celebrations, holiday gatherings, family celebrations, retirements, reunions, and other personal milestones that do not fit another Luxe event page.",
  },
  {
    question: "Can one Luxe experience be booked independently?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can each be booked independently. Minimum booking requirements, availability, and the final scope vary by service, travel, and event logistics.",
  },
  {
    question: "Can coffee, dessert, and rentals be combined?",
    answer:
      "Yes. Multiple services can be coordinated through one Luxe Event Co. inquiry and proposal journey. Timing, placement, staffing, inventory, access, and venue requirements are confirmed for the specific event.",
  },
  {
    question: "Can menus, signage, and presentation be personalized?",
    answer:
      "Yes. Signature beverages, seasonal menus, custom cups, menu displays, event signage, cart details, dessert presentation, and selected visual elements can be discussed. Final options depend on timing, production requirements, and the confirmed experiences.",
  },
  {
    question: "Can Luxe support religious or cultural celebrations?",
    answer:
      "Luxe can discuss these occasions with the host, planner, and venue. Cultural context, dietary considerations, service timing, presentation, venue rules, and any specific operating requirements must be shared before an appropriate scope is confirmed.",
  },
  {
    question: "Which event rentals are required for outdoor events?",
    answer:
      "There is no universal outdoor-rental list. Depending on the site and event, the plan may require tents, chairs, tables, cocktail tables, linens, or lighting, together with suitable weather protection and a backup plan. Ground conditions, guest count, layout, accessibility, access, anchoring or installation requirements, utilities, venue rules, and forecast planning must be reviewed before any item is confirmed.",
  },
  {
    question: "Does Luxe travel outside Toronto and the GTA?",
    answer:
      "Luxe primarily serves Toronto and the Greater Toronto Area and may consider select larger events elsewhere in Southern Ontario. Travel fees, minimums, availability, and logistics are confirmed for the location and event scope.",
  },
] as const;
