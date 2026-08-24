import { imageAssets } from "../image-system";
import type { SignatureExperience } from "../signature-elements";

export const birthdayContexts = [
  {
    number: "01",
    title: "Milestone birthdays",
    description:
      "Celebrate 30th, 40th, 50th, or 80th birthdays with custom cocktail-style receptions, coffee, dessert and rental enhancements, or open-house dessert and coffee bars.",
  },
  {
    number: "02",
    title: "Adult celebrations",
    description:
      "Enhance daytime brunches, cocktail parties, private dinners, or late-night dessert hours with barista-served specialty coffee, Premium Matcha, signature beverages, and live treats.",
  },
  {
    number: "03",
    title: "Family birthdays",
    description:
      "Serve multigenerational parties with warm dessert stations, barista-served coffee and matcha for adults, and fun non-caffeinated beverages for younger guests.",
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
      "Professional baristas provide specialty coffee and matcha service, signature birthday lattes, and specialty beverages throughout your celebration.",
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert prepared on-site",
    name: "Luxe Sweet Cart",
    image: imageAssets.experiences.sweetCart,
    href: "/experiences/sweet-cart",
    description:
      "Interactive live dessert service with Luxe Sweet Cart options including Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. Your selected option or combination of options is confirmed in your proposal. Soft Serve Add-On is available with select dessert options as an optional enhancement and is not offered as a standalone service.",
  },
  {
    id: "seating",
    number: "03",
    label: "Seating and event rentals",
    name: "Luxe Seating Rentals",
    image: imageAssets.experiences.seatingRentals,
    href: "/experiences/seating-rentals",
    description:
      "Select Luxe rentals include white resin chairs, 6-ft tables, cocktail tables, linens and tents. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
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
      "Available linens can be incorporated where applicable to the selected Luxe rentals. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service.",
  },
] as const;

export const birthdayCombinations = [
  {
    number: "01",
    title: "Coffee Bar",
    description:
      "Create a café-style birthday experience with specialty coffee, matcha and signature beverages.",
  },
  {
    number: "02",
    title: "Sweet Cart",
    description:
      "Turn dessert into part of the entertainment with live preparation, sauces and toppings.",
  },
  {
    number: "03",
    title: "Sweet Cart + Rentals",
    description:
      "Pair an interactive dessert experience with select seating, tables, linens or tenting.",
  },
  {
    number: "04",
    title: "Coffee + Dessert + Rentals",
    description:
      "Bring multiple Luxe services together through one coordinated inquiry.",
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
