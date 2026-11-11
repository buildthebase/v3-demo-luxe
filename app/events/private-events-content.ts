import { imageAssets } from "../image-system";
import type { SignatureExperience } from "../signature-elements";

export const privateEventContexts = [
  {
    number: "01",
    title: "Engagement Parties",
    description:
      "Celebrate the beginning of something special with handcrafted coffee, premium matcha, live desserts, and personalized details that complement your engagement celebration.",
  },
  {
    number: "02",
    title: "Anniversaries",
    description:
      "Mark another milestone together with a personalized coffee and dessert experience, whether you're hosting an intimate dinner or celebrating with family and friends.",
  },
  {
    number: "03",
    title: "Graduations",
    description:
      "Celebrate the achievement with specialty beverages, freshly prepared desserts, and custom signage designed around the graduate and their special day.",
  },
  {
    number: "04",
    title: "Religious & Cultural Celebrations",
    description:
      "From traditional family gatherings to meaningful cultural celebrations, we tailor our coffee, dessert, and service presentation to complement your occasion and preferences.",
  },
  {
    number: "05",
    title: "Holiday Gatherings",
    description:
      "Bring something special to your holiday celebration with seasonal coffee, premium matcha, warm desserts, and personalized service for family and friends.",
  },
  {
    number: "06",
    title: "Family Celebrations & Milestones",
    description:
      "From reunions and retirement celebrations to welcome-home gatherings and personal milestones, create a memorable experience with handcrafted beverages and interactive desserts.",
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
      "Enjoy a café-inspired experience featuring barista-crafted espresso, signature lattes, premium matcha, and specialty hot and iced beverages. Personalized drink menus, custom cups, and cart signage are available to complement your event.",
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert carts",
    name: "Luxe Sweet Cart",
    image: imageAssets.experiences.sweetCart,
    href: "/experiences/sweet-cart",
    description:
      "Bring interactive dessert catering to your celebration with freshly prepared mini Dutch pancakes, Belgian waffles on a stick, mini donuts, or live churros. Customize your experience with premium toppings, sauces, and optional soft serve.",
  },
  {
    id: "seating",
    number: "03",
    label: "Event seating and rentals",
    name: "Luxe Event Rentals",
    image: imageAssets.experiences.seatingRentals,
    href: "/experiences/seating-rentals",
    description:
      "Complete your gathering with selected event rentals, including white resin chairs, tables, cocktail tables, linens, tents, and dance floors in configurations up to 18 × 18 ft. Tent lighting is available with our tent rentals and is not offered separately.",
  },
] satisfies readonly SignatureExperience[];

export const privateEventPersonalization = [
  {
    number: "01",
    title: "Menus & Drinks",
    description:
      "Choose signature coffee drinks, premium matcha, seasonal favourites, and personalized beverage names that reflect your celebration.",
  },
  {
    number: "02",
    title: "Signage & Presentation",
    description:
      "Make your setup personal with custom cart signage, branded cups, menu displays, and colour-coordinated presentation tailored to your event.",
  },
  {
    number: "03",
    title: "Seating & Event Details",
    description:
      "Complete the setting with selected chairs, tables, linens, tents, and dance-floor rentals that suit your venue and celebration. Tent lighting is available exclusively with Luxe tent rentals.",
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
    title: "Services you’re considering",
    description:
      "Select your desired services including a premium mobile Coffee Bar, matcha, live dessert carts, rentals, custom signage, and any dietary preferences.",
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
    label: "Engagement or anniversary",
    note: "A meaningful milestone shown in its full event setting",
    tone: "setting",
  },
  {
    number: "02",
    label: "Graduation or family celebration",
    note: "Guests gathering for a personal occasion",
    tone: "hospitality",
  },
  {
    number: "03",
    label: "Coffee Bar service",
    note: "Coffee or matcha being prepared and served to guests",
    tone: "hospitality",
  },
  {
    number: "04",
    label: "Sweet Cart interaction",
    note: "Live dessert preparation and natural guest interaction",
    tone: "dessert",
  },
  {
    number: "05",
    label: "Personalized details",
    note: "Custom signage, menus, cups, decals, or presentation",
    tone: "dessert",
  },
  {
    number: "06",
    label: "Luxe rental setup",
    note: "Seating, tables, linens, tent, or dance-floor details",
    tone: "setting",
  },
  {
    number: "07",
    label: "The complete atmosphere",
    note: "An upscale wide view that does not read specifically as a wedding or corporate event",
    tone: "setting",
  },
] as const;

export const privateEventFaqs = [
  {
    question: "Which occasions are planned private events?",
    answer:
      "Private events can include engagement parties, anniversaries, graduations, religious and cultural celebrations, holiday gatherings, family celebrations, retirements, reunions, and other meaningful personal celebrations.",
  },
  {
    question: "Can one Luxe experience be booked independently?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Event Rentals can each be booked independently. Minimum booking requirements, availability, and the final scope vary by service, travel, and event logistics.",
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
      "Outdoor rental plans are tailored to the site, guest count, layout, accessibility, venue rules and weather requirements. The appropriate plan may include tents, chairs, tables, cocktail tables or linens, together with suitable weather protection and a backup service area. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Your proposal confirms the selected inventory, installation requirements and service scope.",
  },
  {
    question: "Does Luxe travel outside Toronto and the GTA?",
    answer:
      "Luxe primarily serves Toronto and the Greater Toronto Area and may consider select larger events elsewhere in Southern Ontario. Travel fees, minimums, availability, and logistics are confirmed for the location and event scope.",
  },
] as const;
