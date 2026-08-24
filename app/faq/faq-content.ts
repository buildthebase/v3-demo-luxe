export type FaqLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links: readonly FaqLink[];
};

export type FaqCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: readonly FaqItem[];
};

const sharedFaqCategories: readonly FaqCategory[] = [
  {
    id: "general-booking",
    number: "01",
    title: "General Booking",
    description: "Experience formats, pricing inputs, reservation terms, and insurance.",
    items: [
      {
        id: "available-packages",
        question: "What packages are available?",
        answer:
          "Luxe does not use one universal event package. Luxe Coffee Bar offers the Café Cart Experience and Signature Coffee Bar Experience. Luxe Sweet Cart offers Classic and Signature physical cart styles, subject to availability. Dessert options include Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station and the Luxe Churro Bar. Your selected option or combination of options is confirmed in your proposal. Seating Rentals is quoted from confirmed inventory and event requirements. Any service may be available independently or combined through Luxe Event Co.",
        links: [{ href: "/experiences", label: "Compare Luxe experiences" }],
      },
      {
        id: "pricing-calculation",
        question: "How is pricing calculated?",
        answer:
          "Event pricing is calculated from the selected experience and format, guest count, service duration, location and travel, staffing, menu, custom branding, equipment, setup requirements, outdoor conditions, rental quantities, delivery access, multi-day needs, multiple service stations, combined experiences, and approved enhancements. Luxe reviews the actual event requirements and itemizes the confirmed scope in the proposal rather than applying one total to materially different events.",
        links: [{ href: "/contact", label: "Request a personalized proposal" }],
      },
      {
        id: "guest-count-or-hours",
        question: "Is pricing based on guest count or hours?",
        answer:
          "Both can affect the quote, but neither works alone. Guest count informs quantities, equipment, service planning, staffing, and minimums; service duration affects operating time, staffing coverage, replenishment, and venue scheduling. Menu, location, travel, access, branding, rentals, setup, and the number of stations can also change the final price.",
        links: [{ href: "/contact", label: "Share your event details" }],
      },
      {
        id: "booking-lead-time",
        question: "How far in advance should I book?",
        answer:
          "We recommend booking as early as possible, especially for peak wedding and event dates between spring and fall. Additional lead time is also helpful for custom signage, branded cups and coordinated rentals.",
        links: [{ href: "/contact", label: "Check your date" }],
      },
      {
        id: "reserve-a-date",
        question: "How do I secure my event date?",
        answer:
          "Your event date is secured once the service agreement is signed and the 30% non-refundable retainer is received.",
        links: [{ href: "/contact", label: "Begin an inquiry" }],
      },
      {
        id: "retainer-required",
        question: "Is a retainer required?",
        answer:
          "Yes. A 30% non-refundable retainer is required to secure a confirmed booking.",
        links: [{ href: "/contact", label: "Ask about your event" }],
      },
      {
        id: "balance-due",
        question: "When is the remaining balance due?",
        answer:
          "The remaining balance is due 7 days before the event unless otherwise stated in your agreement.",
        links: [{ href: "/contact", label: "Discuss booking terms" }],
      },
      {
        id: "payment-methods",
        question: "Which payment methods are accepted?",
        answer:
          "Available payment methods and payment instructions are provided with your proposal and service agreement.",
        links: [{ href: "/contact", label: "Confirm payment options" }],
      },
      {
        id: "luxe-insured",
        question: "Is Luxe insured?",
        answer:
          "Yes. Luxe carries $5 million in commercial liability insurance, and proof of insurance can be provided to venues or corporate clients where required.",
        links: [{ href: "/contact", label: "Request event-specific documentation" }],
      },
    ],
  },
  {
    id: "travel-service-area",
    number: "02",
    title: "Travel and Service Area",
    description: "Primary coverage, extended travel, and location-based quote considerations.",
    items: [
      {
        id: "areas-served",
        question: "Where does Luxe provide service?",
        answer:
          "Luxe primarily serves Toronto and the Greater Toronto Area, with select bookings available throughout Southern Ontario. Travel fees may apply based on event location and logistics.",
        links: [{ href: "/contact", label: "Confirm service for your location" }],
      },
      {
        id: "outside-gta",
        question: "Does Luxe travel outside the GTA?",
        answer:
          "Yes. Select bookings are available throughout Southern Ontario. The final service plan is tailored to the event location, selected experience, guest count, travel requirements, venue access and event schedule.",
        links: [{ href: "/contact", label: "Discuss an extended-service event" }],
      },
      {
        id: "travel-fees",
        question: "Do travel fees apply?",
        answer:
          "Travel fees may apply depending on event location, distance, service requirements and transportation needs. Any applicable travel charges are clearly included in your proposal before booking.",
        links: [{ href: "/contact", label: "Request a location-specific quote" }],
      },
      {
        id: "destination-events",
        question: "Are destination events available?",
        answer:
          "Select destination events throughout Southern Ontario are available based on event scope and logistics. Your proposal confirms the travel, transport, staffing, venue access, setup and service requirements for the booking.",
        links: [{ href: "/contact", label: "Discuss a destination event" }],
      },
    ],
  },
  {
    id: "setup-logistics",
    number: "03",
    title: "Setup and Logistics",
    description: "Space, utilities, timing, weather, access, and outdoor operating conditions.",
    items: [
      {
        id: "space-required",
        question: "How much space is required?",
        answer:
          "Setup requirements vary by Coffee Bar format and venue. Our team confirms electrical, water, access and setup requirements with the client or venue before the event so the appropriate service plan can be prepared.",
        links: [{ href: "/contact", label: "Review your venue setup" }],
      },
      {
        id: "power-required",
        question: "What power or water access is required?",
        answer:
          "Power and water requirements vary by the selected Luxe experience and event setup. We confirm all electrical, water and access requirements before the event so the correct service plan can be prepared.",
        links: [{ href: "/experiences", label: "Explore the experiences" }],
      },
      {
        id: "water-required",
        question: "Is water required?",
        answer:
          "Power and water requirements vary by the selected Luxe experience and event setup. We confirm all electrical, water and access requirements before the event so the correct service plan can be prepared.",
        links: [{ href: "/contact", label: "Confirm venue requirements" }],
      },
      {
        id: "setup-duration",
        question: "How much setup time does Luxe need?",
        answer:
          "Setup time varies by selected experience, venue access and event requirements. Our team confirms the appropriate arrival and setup window with the client or venue before the event.",
        links: [{ href: "/contact", label: "Share venue access details" }],
      },
      {
        id: "teardown-duration",
        question: "How long does teardown take?",
        answer:
          "Takedown timing varies by the selected services, equipment, rental pickup plan, venue rules, loading access and event schedule. The appropriate takedown or pickup window is confirmed before the event.",
        links: [{ href: "/contact", label: "Discuss the event schedule" }],
      },
      {
        id: "outdoor-service",
        question: "Can Luxe operate outdoors?",
        answer:
          "Yes. Many Luxe experiences can be provided outdoors, subject to suitable weather conditions, venue access and the requirements of the selected service. Outdoor events should have an appropriate contingency plan where weather may affect service.",
        links: [{ href: "/events", label: "Explore event applications" }],
      },
      {
        id: "rain-plan",
        question: "What happens if it rains?",
        answer:
          "For outdoor events, the client is responsible for ensuring an appropriate covered or alternate service area if weather conditions could affect equipment or service. Tent options may also be available through Luxe depending on the event.",
        links: [{ href: "/contact", label: "Plan an outdoor event" }],
      },
      {
        id: "without-direct-power",
        question: "Can Luxe operate without direct access to power?",
        answer:
          "Alternative power arrangements may be available depending on the selected experience, equipment, menu, event duration and venue requirements. Our team confirms the appropriate power plan before the event.",
        links: [{ href: "/contact", label: "Review an off-grid setup" }],
      },
    ],
  },
  {
    id: "customization",
    number: "04",
    title: "Customization",
    description: "Themes, signage, menus, combined experiences, and corporate branding.",
    items: [
      {
        id: "event-theme",
        question: "Can experiences be matched to an event theme?",
        answer:
          "Yes. Luxe can discuss colour direction, menu language, beverage or dessert selections, signage, cups, cart presentation and selected rental elements. We can also coordinate the Luxe service presentation with floral accents provided by the event’s florist or creative team. The visual direction preserves menu clarity, practical guest movement and the operating needs of each experience, with the final plan tailored to the selected service and event requirements.",
        links: [{ href: "/experiences", label: "Explore experience customization" }],
      },
      {
        id: "signage",
        question: "Can signage be added?",
        answer:
          "Yes. Custom event signage and menu displays can be added. Wording, dimensions, materials, artwork, placement, production lead time, approvals, and pricing are confirmed before production. The finished sign must remain legible and useful where guests order, choose, or move through the service area.",
        links: [{ href: "/contact", label: "Discuss custom signage" }],
      },
      {
        id: "custom-menus",
        question: "Can menus be customized?",
        answer:
          "Coffee Bar menus can include café favourites, signature beverages, premium matcha and selected non-coffee options based on the chosen experience. Dessert menus can include the available desserts, premium sauces, standard toppings, premium toppings and Soft Serve Add-On. Soft serve is offered as an enhancement and is not available as a standalone service. Final menu names and presentation are tailored to the selected experience, guest count, equipment, service speed and guest flow.",
        links: [{ href: "/experiences", label: "Explore menu possibilities" }],
      },
      {
        id: "multiple-experiences",
        question: "Can Coffee, Dessert and Rentals be booked together?",
        answer:
          "Yes. Luxe Coffee Bar, Luxe Sweet Cart and select event rentals can each be booked independently or coordinated together through one inquiry.",
        links: [{ href: "/experiences", label: "Explore combined experiences" }],
      },
      {
        id: "planner-venue-coordination",
        question: "Does Luxe work with venues/planners?",
        answer:
          "Yes. We can coordinate directly with planners, venues and event contacts regarding access, setup timing, service placement and the requirements of the Luxe services booked.",
        links: [{ href: "/contact", label: "Discuss event coordination" }],
      },
      {
        id: "corporate-branding",
        question: "Can corporate branding be incorporated?",
        answer:
          "Yes. Approved logos, branded cups, cart treatment, custom signage, campaign drink names, menu displays, and brand-colour direction can be discussed. Clients should provide approved logos, brand guidelines, colour references, campaign copy or naming direction, usage permissions, and an approval contact. Exact file formats, print specifications, quantities, and deadlines are confirmed after the branding surfaces and service plan are scoped.",
        links: [{ href: "/events/brand-activations", label: "Create a branded experience" }],
      },
    ],
  },
] as const;

type PublishedFaqItem = {
  question: string;
  answer: string;
};

type PublishedFaqSource = {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  items: readonly PublishedFaqItem[];
};

const masterFaqAnswerOverrides: Readonly<Record<string, string>> = {
  "Can the Coffee Bar menu be customized?":
    "Yes. Coffee Bar menus can be personalized with café favourites, signature beverages, premium matcha and selected non-coffee options based on the chosen experience. Custom menu wording, drink names, cups, stickers and signage can also be incorporated.",
  "Are iced drinks included?":
    "Yes. Hot and iced beverage service is available as part of the Luxe Coffee Bar experience.",
  "Is matcha available?":
    "Yes. Premium matcha is available as a non-coffee option and can also be incorporated into customized event menus.",
  "Are milk alternatives available?":
    "Yes. Whole milk and premium non-dairy milk alternatives are available. Final milk selections are confirmed with the event menu.",
  "How many baristas are included?":
    "Professional barista service is included with every Coffee Bar booking. Staffing is tailored to guest count, selected menu, service duration and event flow.",
  "How many drinks can Luxe serve per hour?":
    "Service capacity depends on guest count, selected menu, hot-to-iced drink mix and guest arrival patterns. We recommend the appropriate staffing and setup for each event to keep service moving efficiently.",
  "What is the difference between Café Cart and Signature Coffee Bar?":
    "The Luxe Café Cart offers a more compact café setup for intimate celebrations, offices and spaces where a smaller footprint is preferred. The Luxe Signature Coffee Bar creates a larger, more prominent service presence for weddings, corporate events and celebrations where presentation is a bigger part of the experience.",
  "What desserts does Luxe Sweet Cart offer?":
    "Luxe Sweet Cart offers Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. The selected dessert experience is prepared and served live for guests.",
  "Is soft serve available?":
    "Yes. Vanilla or chocolate soft serve can be added to select Luxe Sweet Cart bookings as an enhancement. Soft serve is not currently offered as a standalone service.",
  "What toppings and sauces are included?":
    "Sweet Cart experiences include a curated selection of standard toppings and premium sauces based on the selected package. Premium toppings and additional enhancements can also be added where available.",
  "Can Luxe accommodate allergies or dietary restrictions?":
    "Please share any dietary restrictions or allergy concerns during your inquiry. Our team will review the selected ingredients, preparation process and equipment to determine what accommodations can safely be offered. Because equipment and preparation areas may be shared, Luxe cannot guarantee an allergen-free environment.",
  "How long does Sweet Cart service last?":
    "Service duration is based on guest count and the selected dessert experience. Most Luxe Sweet Cart bookings include approximately 1.5–2.5 hours of live dessert service, with the exact service window confirmed in your proposal.",
  "How many Sweet Cart attendants are included?":
    "Professional attendant service is included with every Luxe Sweet Cart booking. Staffing is determined by guest count, dessert selection and service requirements.",
  "What event rentals does Luxe offer?":
    "Luxe offers a focused rental collection including white resin chairs, 6-ft rectangular tables, cocktail tables, linens, tents, tent walls, tent lighting and dance-floor configurations up to 18' × 18'.",
  "Is Tent Lighting available separately?":
    "Tent lighting is available with Luxe tent rentals and is not currently offered as a standalone lighting service.",
  "Is rental setup included?":
    "Setup is available and will be clearly identified in your proposal. Depending on the rental order, clients may select delivery only or delivery with professional setup. Any applicable setup fees are confirmed before booking.",
  "Does Luxe deliver rentals?":
    "Yes. Delivery is available throughout Toronto and the GTA, with select extended-distance requests considered based on availability. Delivery fees are based on location, order size, access requirements and requested service.",
};

const sweetCartPricingVariant: PublishedFaqItem = {
  question: "What affects dessert cart pricing?",
  answer: sweetCartFaqs[0].answer,
};

const seatingPricingVariant: PublishedFaqItem = {
  question: "How are event seating and table rentals priced?",
  answer: seatingRentalFaqs[0].answer,
};

const publishedFaqSources: readonly PublishedFaqSource[] = [
  {
    id: "coffee-bar",
    title: "Luxe Coffee Bar",
    description: "Formats, menus, inclusions, capacity, staffing, utilities, and travel.",
    href: "/experiences/coffee-bar",
    linkLabel: "Explore Luxe Coffee Bar",
    items: coffeeFaqs,
  },
  {
    id: "sweet-cart",
    title: "Luxe Sweet Cart",
    description: "Pricing, desserts, toppings, service format, capacity, setup, and outdoor planning.",
    href: "/experiences/sweet-cart",
    linkLabel: "Explore Luxe Sweet Cart",
    items: [...sweetCartFaqs, sweetCartPricingVariant],
  },
  {
    id: "seating-rentals",
    title: "Luxe Seating Rentals",
    description: "Inventory scope, pricing, delivery, setup, styling, service area, and outdoor use.",
    href: "/experiences/seating-rentals",
    linkLabel: "Explore Luxe Seating Rentals",
    items: [...seatingRentalFaqs, seatingPricingVariant],
  },
  {
    id: "weddings",
    title: "Weddings",
    description: "Wedding timing, service combinations, customization, pricing, booking, and coordination.",
    href: "/events/weddings",
    linkLabel: "Explore Luxe weddings",
    items: weddingFaqs,
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    description: "Event fit, multiple setups, recurring programs, capacity, combinations, and planning.",
    href: "/events/corporate-events",
    linkLabel: "Explore corporate events",
    items: corporateFaqs,
  },
  {
    id: "brand-activations",
    title: "Brand Activations",
    description: "Branding scope, creative assets, campaign menus, agency coordination, and production timing.",
    href: "/events/brand-activations",
    linkLabel: "Explore brand activations",
    items: activationFaqs,
  },
  {
    id: "bridal-showers",
    title: "Bridal Showers",
    description: "Coffee, matcha, desserts, rentals, personalization, styling boundaries, and vendor coordination.",
    href: "/events/bridal-showers",
    linkLabel: "Explore bridal showers",
    items: bridalShowerFaqs,
  },
  {
    id: "baby-showers",
    title: "Baby Showers",
    description: "Available services, personalization, outdoor planning, venue needs, capacity, and booking timing.",
    href: "/events/baby-showers",
    linkLabel: "Explore baby showers",
    items: babyShowerFaqs,
  },
  {
    id: "birthdays",
    title: "Birthdays",
    description: "Adult, milestone, family, and select children’s celebrations, menus, desserts, pricing, and travel.",
    href: "/events/birthdays",
    linkLabel: "Explore birthday events",
    items: birthdayFaqs,
  },
  {
    id: "private-events",
    title: "Private Events",
    description: "Occasion fit, independent or combined services, personalization, cultural events, rentals, and travel.",
    href: "/events/private-events",
    linkLabel: "Explore private events",
    items: privateEventFaqs,
  },
] as const;

const publishedFaqCategories: readonly FaqCategory[] = publishedFaqSources.map(
  (source, sourceIndex) => ({
    id: source.id,
    number: String(sharedFaqCategories.length + sourceIndex + 1).padStart(2, "0"),
    title: source.title,
    description: source.description,
    items: source.items.map((item, itemIndex) => ({
      id: `${source.id}-${String(itemIndex + 1).padStart(2, "0")}`,
      question: item.question,
      answer: masterFaqAnswerOverrides[item.question] ?? item.answer,
      links: [{ href: source.href, label: source.linkLabel }],
    })),
  }),
);

export const faqCategories: readonly FaqCategory[] = [
  ...sharedFaqCategories,
  ...publishedFaqCategories,
];

export const allFaqItems = faqCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category })),
);
import { babyShowerFaqs } from "../events/baby-showers-content";
import { birthdayFaqs } from "../events/birthdays-content";
import { activationFaqs } from "../events/brand-activations-content";
import { bridalShowerFaqs } from "../events/bridal-showers-content";
import { corporateFaqs } from "../events/corporate-events-content";
import { privateEventFaqs } from "../events/private-events-content";
import { weddingFaqs } from "../events/weddings-content";
import { coffeeFaqs } from "../experiences/coffee-bar-content";
import { seatingRentalFaqs } from "../experiences/seating-rentals-content";
import { sweetCartFaqs } from "../experiences/sweet-cart-content";
