import { imageAssets } from "../image-system";
import type { SignatureExperience } from "../signature-elements";

export const birthdayContexts = [
  {
    number: "01",
    title: "Milestone birthdays",
    description:
      "Celebrate 30th, 40th, 50th, 60th, and other milestone birthdays with handcrafted specialty drinks, interactive live desserts, and personalized event details.",
  },
  {
    number: "02",
    title: "Adult celebrations",
    description:
      "Elevate birthday dinners, brunches, and evening gatherings with barista-served coffee, premium matcha, signature beverages, and freshly prepared desserts.",
  },
  {
    number: "03",
    title: "Family birthdays",
    description:
      "Bring generations together with live dessert stations, specialty coffee for adults, and non-coffee beverages for younger guests.",
  },
  {
    number: "04",
    title: "Children's birthdays",
    description:
      "Create memorable birthday moments with freshly prepared mini Dutch pancakes, mini donuts, waffles on a stick, or churros, complemented by customized signage and selected event rentals.",
  },
] as const;

export const birthdayExperiences = [
  {
    id: "coffee",
    number: "01",
    label: "Coffee, matcha, and specialty beverages",
    name: "Luxe Coffee Bar",
    image: imageAssets.experiences.coffeeBar,
    href: "/experiences/coffee-bar",
    description:
      "Professional baristas serving handcrafted espresso drinks, iced lattes, premium matcha, and signature beverages. Our mobile coffee bars can be personalized with custom menus, branded cups, and cart signage to complement your celebration.",
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert prepared on-site",
    name: "Luxe Sweet Cart",
    image: imageAssets.experiences.sweetCart,
    href: "/experiences/sweet-cart",
    description:
      "Interactive live dessert experiences featuring mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and freshly prepared churros. Select your preferred dessert experience, with optional premium toppings and soft serve enhancements.",
  },
  {
    id: "seating",
    number: "03",
    label: "Seating and event rentals",
    name: "Luxe Seating Rentals",
    hideMedia: true,
    image: imageAssets.experiences.seatingRentals,
    href: "/experiences/seating-rentals",
    description:
      "Complete your celebration with white resin chairs, 6-ft tables, cocktail tables, linens, tents, and dance floor rentals available in configurations up to 18 × 18 ft. Tent lighting is available exclusively with our tent rentals.",
  },
] satisfies readonly SignatureExperience[];

export const birthdayPersonalization = [
  {
    number: "01",
    title: "Menus and flavours",
    description:
      "Personalize your celebration with signature coffee drinks, matcha, seasonal beverages, and dessert toppings selected to complement the guest of honour's favourite flavours.",
  },
  {
    number: "02",
    title: "Signage and presentation",
    description:
      "Customize your experience with personalized cart signage, branded drink cups, menu boards, milestone wording, and colour-coordinated design details.",
  },
  {
    number: "03",
    title: "Seating and room details",
    description:
      "Complete your setting with our available chairs, tables, linens, tent rentals, and dance floors. Tent lighting can also be incorporated when booking a Luxe tent.",
  },
] as const;

export const birthdayCombinations = [
  {
    number: "01",
    title: "Coffee Bar + Sweet Cart",
    description:
      "Pair handcrafted specialty coffee and matcha with an interactive live dessert experience for a memorable birthday celebration.",
  },
  {
    number: "02",
    title: "Sweet Cart + Event Rentals",
    description:
      "Combine freshly prepared desserts with seating, tables, linens, or tent rentals to create a welcoming space for your guests.",
  },
  {
    number: "03",
    title: "Coffee Bar + Event Rentals",
    description:
      "Create a café-inspired birthday setting with barista-served beverages and coordinated seating or event rentals.",
  },
  {
    number: "04",
    title: "Coffee Bar + Sweet Cart + Event Rentals",
    description:
      "Bring together specialty beverages, interactive desserts, and coordinated event rentals through one seamless booking experience.",
  },
] as const;

export const birthdayGallery = [
  { number: "01", label: "The milestone setup", note: "Adult or milestone birthday setup.", tone: "room" },
  { number: "02", label: "The Coffee Bar", note: "Coffee Bar service within a birthday celebration.", tone: "arrival" },
  { number: "03", label: "The Sweet Cart", note: "Sweet Cart actively preparing and serving dessert.", tone: "centre" },
  { number: "04", label: "The personalized details", note: "Custom birthday signage and menu presentation.", tone: "arrival" },
  { number: "05", label: "The guest experience", note: "Guests interacting with the Luxe service.", tone: "centre" },
  { number: "06", label: "The rental setup", note: "Actual Luxe rentals arranged for the celebration.", tone: "room" },
  { number: "07", label: "The wider celebration", note: "A wider view showing how the service fits into the event.", tone: "arrival" },
] as const;

export const birthdayPlanning = [
  {
    title: "The occasion",
    description:
      "Share the date, venue, age or milestone being celebrated, estimated guest count, schedule, and event format.",
  },
  {
    title: "The experiences",
    description:
      "Let us know whether you're interested in Luxe Coffee Bar, Luxe Sweet Cart, Luxe Seating Rentals, or a combination of experiences. Matcha and specialty non-coffee beverages can be incorporated into your selected coffee service.",
  },
  {
    title: "The venue and service needs",
    description:
      "Provide available information about access, footprint, power or water, delivery timing, setup, teardown, and venue requirements.",
  },
  {
    title: "The personal direction",
    description:
      "Share your preferred drink flavours, dessert selections, colour palette, custom signage wording, and any rental items or quantities you're considering.",
  },
] as const;

export const birthdayFaqs = [
  {
    question: "Does Luxe support milestone and adult birthday celebrations?",
    answer:
      "Yes. Milestone birthdays, adult celebrations, dinners, cocktail-style gatherings, and family events can be planned around the venue, guests, schedule, and selected Luxe experiences.",
  },
  {
    question: "Does Luxe provide service for children’s birthdays?",
    answer:
      "Children’s events can be planned where the occasion fits Luxe’s staffed, presentation-led service. Non-coffee beverages, live dessert, and selected rentals can be planned around the age group, venue, guest count, and host’s expectations.",
  },
  {
    question: "Which non-coffee beverages are available?",
    answer:
      "Coffee Bar menus can include café favourites, signature beverages, premium matcha and selected non-coffee options based on the chosen experience.",
  },
  {
    question: "Which birthday desserts are available?",
    answer:
      "Luxe Sweet Cart options include Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. Your selected option or combination of options is confirmed in your proposal. Soft Serve Add-On is available with select dessert options as an optional enhancement and is not offered as a standalone service. Sauces, toppings, quantities and service format are confirmed in the proposal.",
  },
  {
    question: "Can coffee, dessert, and rentals be combined?",
    answer:
      "Yes. Any one service can be booked independently, and several can be coordinated through one Luxe Event Co. inquiry and proposal journey. The final plan is tailored to the selected services, timing, placement, staffing, rental scope, access and venue requirements.",
  },
  {
    question: "How much does birthday dessert catering cost?",
    answer:
      "Birthday dessert catering is quoted around the selected menu, guest count, service duration, staffing, travel, venue access, presentation, and optional enhancements. Share the event details with Luxe Event Co. to receive a proposal shaped around the celebration.",
  },
  {
    question: "Which areas does Luxe serve for birthday events?",
    answer:
      "Luxe Event Co. serves birthday events across Toronto and the Greater Toronto Area. Venue access, travel, delivery, setup, and service requirements are confirmed for the specific event location during the proposal process.",
  },
] as const;
