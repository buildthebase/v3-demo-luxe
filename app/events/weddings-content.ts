import { signatureExperiences, type SignatureExperience } from "../signature-elements";
import { imageAssets } from "../image-system";

const weddingExperienceDescriptions: Record<SignatureExperience["id"], string> = {
  coffee:
    "Premium mobile coffee and matcha service with hot and iced café favourites, signature beverages and personalized menu options.",
  dessert:
    "Fresh on-site dessert preparation and custom cart styling that creates an engaging, delicious focal point for your guests.",
  seating:
    "White resin chairs, 6-ft tables, cocktail tables, linens and tents for ceremonies, receptions and outdoor weddings. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
};

const weddingExperienceLabels: Record<SignatureExperience["id"], string> = {
  coffee: "A café-style welcome",
  dessert: "A live sweet moment",
  seating: "A composed setting",
};

export const weddingExperiences: SignatureExperience[] = signatureExperiences.map(
  (experience) => ({
    ...experience,
    label: weddingExperienceLabels[experience.id],
    description: weddingExperienceDescriptions[experience.id],
  }),
);

export const weddingMoments = [
  {
    number: "01",
    phase: "Before the ceremony",
    title: "A thoughtful welcome.",
    fitLabel: "Best fit",
    fit: "Café Cart",
    description:
      "Welcome guests with a refined café experience featuring specialty coffee, matcha and signature hot or iced beverages before the ceremony begins.",
  },
  {
    number: "02",
    phase: "Cocktail hour",
    title: "Coffee becomes part of the transition.",
    fitLabel: "Best fit",
    fit: "Signature Coffee Bar",
    description:
      "Serve guests specialty coffee, matcha, signature beverages and refreshing iced drinks as they transition from the ceremony to the reception.",
  },
  {
    number: "03",
    phase: "Reception",
    title: "Hospitality woven into the room.",
    fitLabel: "Can include",
    fit: "Coffee Bar",
    description:
      "Complement dinner, speeches and evening celebrations with specialty coffee, matcha, tea and premium non-coffee options.",
  },
  {
    number: "04",
    phase: "Dessert",
    title: "A live sweet moment.",
    fitLabel: "Best fit",
    fit: "Sweet Cart",
    description:
      "Create an interactive dessert moment with Luxe Sweet Cart options including Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. Your selected option or combination of options is confirmed during planning. Soft serve can be added to select dessert options as an enhancement.",
  },
  {
    number: "05",
    phase: "Late night",
    title: "A second wind, served beautifully.",
    fitLabel: "Can include",
    fit: "Coffee Bar or Sweet Cart",
    description:
      "Re-energize the celebration with late-night specialty coffee or a live Luxe Sweet Cart experience.",
  },
  {
    number: "06",
    phase: "The morning after",
    title: "Hospitality can continue.",
    fitLabel: "Optional",
    fit: "Coffee Bar",
    description:
      "Extend the Luxe experience into a farewell brunch or morning-after gathering with café-style coffee and matcha service for your guests.",
  },
] as const;

export const weddingCustomization = [
  {
    number: "01",
    title: "DRINKS & MENUS",
    description:
      "Choose café favourites, signature beverages, matcha, milk alternatives and personalized menu selections for your wedding.",
  },
  {
    number: "02",
    title: "CUPS, SIGNAGE & WORDING",
    description:
      "Personalize cups, stickers, menu displays and event signage with your names, wedding date, monogram or custom design.",
  },
  {
    number: "03",
    title: "DESSERT & CART PRESENTATION",
    description:
      "Coordinate cart styling, custom signage, topping displays and premium sauce selections with your wedding aesthetic.",
  },
  {
    number: "04",
    title: "RENTALS",
    description:
      "Complete the setting with select Luxe chairs, tables, linens and tents. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. Dance-floor configurations available up to 18' × 18'.",
  },
] as const;

export const weddingLogistics = [
  {
    number: "01",
    title: "Planner and venue coordination",
    description:
      "We can coordinate directly with your planner or venue contact regarding arrival, setup timing, access requirements and the placement of Luxe services.",
  },
  {
    number: "02",
    title: "Setup, teardown, and pickup",
    description:
      "Coffee Bar and Sweet Cart setup and takedown are included. Rental delivery, setup, teardown, pickup, timing, and fees are confirmed separately in the proposal.",
  },
  {
    number: "03",
    title: "Venue requirements",
    description:
      "Power, water, access, floor protection, surface conditions, and weather considerations are reviewed according to the confirmed experiences and venue.",
  },
  {
    number: "04",
    title: "Travel and destination planning",
    description:
      "Luxe serves weddings throughout Toronto and the GTA, with select destination bookings available throughout Southern Ontario, including Muskoka, Niagara and Prince Edward County. Travel fees are quoted based on location and event requirements.",
  },
] as const;

export const weddingGalleryPreview = [
  {
    number: "01",
    label: "The welcome",
    note: "Coffee service within the arrival or cocktail-hour setting.",
    tone: "welcome",
    image: {
      ...imageAssets.experiences.weddingWelcome,
      id: "wedding-gallery-welcome-wide",
      src: "/images/weddings/welcome-coffee-service-wide.webp",
      width: 1122,
      height: 1402,
      unoptimized: true,
    },
  },
  {
    number: "02",
    label: "The sweet moment",
    note: "On-site dessert preparation and guest interaction.",
    tone: "dessert",
    image: {
      ...imageAssets.experiences.weddingSweetMoment,
      id: "wedding-gallery-dessert-wide",
      src: "/images/weddings/sweet-moment-dessert-station-wide.webp",
      width: 1254,
      height: 1254,
      unoptimized: true,
    },
  },
  {
    number: "03",
    label: "The rentals",
    note: "Luxe white resin chairs arranged for an outdoor wedding setting.",
    tone: "room",
    image: {
      ...imageAssets.experiences.whiteResinChairs,
      id: "wedding-gallery-white-resin-chairs-wide",
      src: "/images/weddings/white-resin-chairs-wide.webp",
      width: 1122,
      height: 1402,
      unoptimized: true,
      format: "webp",
    },
  },
] as const;

export const weddingFaqs = [
  {
    question: "Can Luxe provide coffee service for weddings?",
    answer:
      "Yes. Luxe Coffee Bar provides premium coffee and matcha service, hot and iced café favourites, signature beverages and premium non-coffee options, milk alternatives, serving essentials, setup, and takedown. The Café Cart or Signature Coffee Bar is selected around the wedding format and guest experience.",
  },
  {
    question: "How much does a wedding coffee bar, dessert cart, or rental plan cost?",
    answer:
      "Wedding pricing is prepared by quote and depends on the selected experiences, guest count, service duration, menu, customization, rental quantities, venue logistics, and travel. Couples can share their date, venue, estimated guest count, and preferred services to receive a proposal shaped around the wedding.",
  },
  {
    question: "When should coffee be served at a wedding?",
    answer:
      "Coffee can be served before the ceremony, during guest arrival or cocktail hour, with dessert, during the reception, or as a late-night moment. The best window depends on when guests will welcome a beverage, how coffee fits the food and bar plan, and whether the venue can support setup and service without interrupting another transition.",
  },
  {
    question: "Is a coffee bar appropriate for cocktail hour?",
    answer:
      "Yes. Cocktail hour is one of the most popular times for a mobile Coffee Bar, giving guests access to hot and iced specialty beverages while transitioning from the ceremony to the reception.",
  },
  {
    question: "Can coffee and dessert be booked together?",
    answer:
      "Yes. Luxe Coffee Bar and Luxe Sweet Cart can be selected together. Their service timeline, placement, menus, staffing, and setup requirements are coordinated around the wedding.",
  },
  {
    question: "Can seating and rentals be included?",
    answer:
      "Yes. Chairs, tables, cocktail tables, tents and linens can be planned alongside Coffee Bar or Sweet Cart. Tent Lighting is available with Luxe tent rentals and is not offered as a standalone service. The proposal confirms inventory, quantities, delivery, setup, takedown, access and fees for the venue and date.",
  },
  {
    question: "Can wedding menus, cups, and signage be customized?",
    answer:
      "Yes. Signature beverages, seasonal selections, menu displays, custom cups, event signage, cart branding, dessert presentation, and other visual details can be discussed. Final possibilities depend on the approved direction, timeline, and production requirements.",
  },
  {
    question: "How early should couples book?",
    answer:
      "We recommend booking as early as possible, particularly for weddings between April and October. Popular dates can fill quickly, and additional lead time is helpful when custom signage, cups, menus or coordinated rentals are required.",
  },
  {
    question: "Does Luxe coordinate with wedding planners and venues?",
    answer:
      "Yes. Luxe can coordinate timing, access, placement, setup, service flow, and event-day requirements with couples, planners, coordinators, venues, and relevant vendors. Exact responsibilities are confirmed during planning.",
  },
  {
    question: "Does Luxe travel outside Toronto?",
    answer:
      "Yes. Luxe serves Toronto and the Greater Toronto Area and considers select destination weddings throughout Southern Ontario. Travel fees may apply outside the standard service area.",
  },
] as const;
