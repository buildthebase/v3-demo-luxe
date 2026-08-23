import { imageAssets } from "../image-system";
import type { SignatureExperience } from "../signature-elements";

export const birthdayContexts = [
  {
    number: "01",
    title: "Milestone birthdays",
    description:
      "Celebrate 30th, 40th, 50th, or 80th birthdays with custom cocktail-style receptions, dinner service additions, or open-house dessert and coffee bars.",
  },
  {
    number: "02",
    title: "Adult celebrations",
    description:
      "Enhance daytime brunches, cocktail parties, private dinners, or late-night dessert hours with espresso-style classics and signature beverages, Premium Matcha, and live treats.",
  },
  {
    number: "03",
    title: "Family birthdays",
    description:
      "Serve multigenerational parties with warm dessert stations, specialty espresso for adults, and fun non-caffeinated beverages for younger guests.",
  },
  {
    number: "04",
    title: "Select children's birthdays",
    description:
      "Delight kids and parents alike with live warm mini Dutch pancakes, hot chocolate, customized signage, and comfortable seating layouts.",
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
      "Professional baristas serve espresso-style classics, Premium Matcha, signature birthday lattes, and specialty coffee beverages throughout your celebration.",
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert prepared on-site",
    name: "Luxe Sweet Cart",
    image: imageAssets.experiences.sweetCart,
    href: "/experiences/sweet-cart",
    description:
      "Interactive live dessert catering featuring warm Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, and the Luxe Churro Bar made fresh on-site for your guests. Soft Serve Add-On is available as an enhancement.",
  },
  {
    id: "seating",
    number: "03",
    label: "Seating and event rentals",
    name: "Luxe Seating Rentals",
    image: imageAssets.experiences.seatingRentals,
    href: "/experiences/seating-rentals",
    description:
      "White resin chairs, 6-ft tables, cocktail tables, linens, tents, tent lighting, and a dance floor for suitable birthday and backyard celebrations.",
  },
] satisfies readonly SignatureExperience[];

export const birthdayPersonalization = [
  {
    number: "01",
    title: "Menus and flavours",
    description:
      "Curate customized drink menus with signature birthday lattes, matcha, syrups, and dessert toppings picked specifically to match the guest of honour's favorite flavors.",
  },
  {
    number: "02",
    title: "Signage and presentation",
    description:
      "Personalize the setup with custom name decals, milestone year signage, branded cup sleeves, menu boards, and color-matched cart details.",
  },
  {
    number: "03",
    title: "Seating and room details",
    description:
      "Coordinate seating layouts, high-top cocktail tables, premium linens, and accent lighting tailored to your venue dimensions and guest circulation.",
  },
] as const;

export const birthdayCombinations = [
  {
    number: "01",
    title: "The milestone café",
    experiences: "Signature Coffee Bar + beverage service",
    description:
      "A dedicated specialty beverage station featuring barista-served specialty coffee, Premium Matcha, and signature birthday lattes to anchor guest arrivals or late-night party hours.",
  },
  {
    number: "02",
    title: "The interactive sweet moment",
    experiences: "Sweet Cart + live dessert service",
    description:
      "A live dessert station serving made-to-order Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, or the Luxe Churro Bar that doubles as an engaging visual focal point for all ages.",
  },
  {
    number: "03",
    title: "The complete birthday setting",
    experiences: "Coffee + Dessert + Rentals",
    description:
      "Coordinate barista coffee, a live dessert station, and confirmed chair, table, linen, or tent rentals through one Luxe inquiry.",
  },
] as const;

export const birthdayGallery = [
  { number: "01", label: "The arrival", note: "Coffee, matcha, menus, and guest hospitality.", tone: "arrival" },
  { number: "02", label: "The sweet moment", note: "Live dessert, signage, toppings, and guest interaction.", tone: "centre" },
  { number: "03", label: "The room", note: "Seating, tables, lighting, and celebration atmosphere.", tone: "room" },
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
      "Let us know if you are considering premium mobile coffee service, Premium Matcha service, live dessert cart, confirmed seating rentals, or a coordinated combination.",
  },
  {
    title: "The venue and service needs",
    description:
      "Provide available information about access, footprint, power or water, delivery timing, setup, teardown, and venue requirements.",
  },
  {
    title: "The personal direction",
    description:
      "Tell us about favourite drink flavours, dessert toppings, colour schemes, custom signage wording, and the confirmed rental items or quantities you need.",
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
      "The Coffee Bar offers premium non-coffee choices including Premium Matcha Latte, Strawberry Matcha, chai latte, and hot chocolate. The final menu selections are made for the event.",
  },
  {
    question: "Which birthday desserts are available?",
    answer:
      "Luxe Sweet Cart offers Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, and the Luxe Churro Bar prepared on-site. Soft Serve Add-On is an enhancement. Sauces, standard toppings, premium toppings, quantities, and service format are confirmed in the proposal.",
  },
  {
    question: "Can coffee, dessert, and rentals be combined?",
    answer:
      "Yes. Any one service can be booked independently, and several can be coordinated through one Luxe Event Co. inquiry and proposal journey. Availability, timing, placement, staffing, rental scope, access, and venue requirements must be confirmed.",
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
