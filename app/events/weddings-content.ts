import { signatureExperiences, type SignatureExperience } from "../signature-elements";
import { imageAssets } from "../image-system";

const weddingExperienceDescriptions: Record<SignatureExperience["id"], string> = {
  coffee:
    "Mobile espresso, matcha, and seasonal specialty drink service designed for guest arrivals, cocktail hour, reception, or late-night energy.",
  dessert:
    "Fresh on-site dessert preparation and custom cart styling that creates an engaging, delicious focal point for your guests.",
  seating:
    "White resin chairs, 6-ft tables, cocktail tables, linens, tents, tent lighting, and a dance floor for ceremonies, receptions, and outdoor weddings.",
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
      "Greet early-arriving guests and the wedding party with espresso-style classics and signature beverages, iced matchas, and warm signature drinks as they arrive before the ceremony.",
  },
  {
    number: "02",
    phase: "Cocktail hour",
    title: "Coffee becomes part of the transition.",
    fitLabel: "Best fit",
    fit: "Signature Coffee Bar",
    description:
      "Provide guests with a sophisticated hospitality feature between the ceremony and dinner. Tailored with seasonal hot drinks and refreshing iced lattes.",
  },
  {
    number: "03",
    phase: "Reception",
    title: "Hospitality woven into the room.",
    fitLabel: "Can include",
    fit: "Coffee Bar",
    description:
      "Complement dinner service, speeches, and evening dancing with specialty coffee beverages, herbal teas, and custom non-coffee options.",
  },
  {
    number: "04",
    phase: "Dessert",
    title: "A live sweet moment.",
    fitLabel: "Best fit",
    fit: "Sweet Cart",
    description:
      "Interactive live dessert station featuring fresh Mini Dutch Pancakes, Belgian Waffles on a Stick, a Mini Donut Station, and the Luxe Churro Bar prepared fresh in front of your guests. Soft Serve Add-On is available as an enhancement.",
  },
  {
    number: "05",
    phase: "Late night",
    title: "A second wind, served beautifully.",
    fitLabel: "Can include",
    fit: "Coffee Bar or Sweet Cart",
    description:
      "Re-energize the dance floor with late-night specialty coffee beverages or freshly baked warm treats, providing a memorable second-wind hospitality moment.",
  },
  {
    number: "06",
    phase: "The morning after",
    title: "Hospitality can continue.",
    fitLabel: "Optional",
    fit: "Coffee Bar",
    description:
      "Keep the celebration going during your farewell brunch or day-after gift opening with premium mobile coffee service for family and close friends.",
  },
] as const;

export const weddingCustomization = [
  {
    number: "01",
    title: "Drinks and menus",
    description:
      "Tailored signature drinks, seasonal lattes, oat and almond milk alternatives, matcha, and custom menu wording crafted for your taste.",
  },
  {
    number: "02",
    title: "Cups, signage, and wording",
    description:
      "Add custom wedding monograms, partner names, wedding dates, and custom printed cups or signage frames for a cohesive visual look.",
  },
  {
    number: "03",
    title: "Dessert and cart presentation",
    description:
      "Coordinate cart finishes, floral arrangements, custom topper displays, and gourmet sauce bars to match your wedding color palette.",
  },
  {
    number: "04",
    title: "Seating and room details",
    description:
      "Coordinate the confirmed white resin chairs, 6-ft tables, cocktail tables, and linen options with the venue dimensions and rental layout.",
  },
] as const;

export const weddingLogistics = [
  {
    number: "01",
    title: "Planner and venue coordination",
    description:
      "Share planner and venue contacts where relevant so access, placement, and service details can be reviewed for the confirmed scope.",
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
      "Based in Toronto, Luxe serves the GTA and select destination venues across Southern Ontario, including Muskoka, Niagara, and Prince Edward County.",
  },
] as const;

export const weddingGalleryPreview = [
  {
    number: "01",
    label: "The welcome",
    note: "Coffee service within the arrival or cocktail-hour setting.",
    tone: "welcome",
    image: imageAssets.experiences.weddingWelcome,
  },
  {
    number: "02",
    label: "The sweet moment",
    note: "On-site dessert preparation and guest interaction.",
    tone: "dessert",
    image: imageAssets.experiences.weddingSweetMoment,
  },
  {
    number: "03",
    label: "The room",
    note: "Gold seating, soft linens, garden florals, and warm light shape an intimate reception beneath the trees.",
    tone: "room",
    image: imageAssets.experiences.weddingRoom,
  },
] as const;

export const weddingFaqs = [
  {
    question: "Can Luxe provide coffee service for weddings?",
    answer:
      "Yes. Luxe Coffee Bar provides professional barista service, espresso classics, signature drinks, matcha and premium non-coffee options, hot and iced service, milk alternatives, serving essentials, setup, and takedown. The Café Cart or Signature Coffee Bar is selected around the wedding format and guest experience.",
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
      "Yes, when it supports the transition between ceremony and reception. A coffee bar can give guests a staffed hospitality point with hot, iced, matcha, and non-coffee choices while they gather. Placement, menu breadth, service duration, guest count, and coordination with the venue, planner, caterer, and beverage program determine whether cocktail hour is the right window.",
  },
  {
    question: "Can coffee and dessert be booked together?",
    answer:
      "Yes. Luxe Coffee Bar and Luxe Sweet Cart can be selected together. Their service timeline, placement, menus, staffing, and setup requirements are coordinated around the wedding.",
  },
  {
    question: "Can seating and rentals be included?",
    answer:
      "Yes. Chairs, tables, cocktail tables, tents, linens, and lighting can be planned alongside Coffee Bar or Sweet Cart. Inventory, quantities, delivery, setup, teardown, access, and fees must be confirmed for the venue and date.",
  },
  {
    question: "Can wedding menus, cups, and signage be customized?",
    answer:
      "Yes. Signature beverages, seasonal selections, menu displays, custom cups, event signage, cart branding, dessert presentation, and other visual details can be discussed. Final possibilities depend on the approved direction, timeline, and production requirements.",
  },
  {
    question: "How early should couples book?",
    answer:
      "Luxe recommends booking early for weddings and peak-season dates, especially from April through October. No universal lead time is promised because availability depends on the date, requested experiences, staffing, travel, and logistics.",
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
