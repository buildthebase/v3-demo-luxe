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
    phase: "Before the Ceremony",
    title: "A warm welcome.",
    fitLabel: "Suggested Experience",
    fit: "Coffee Bar",
    description:
      "Start the celebration with barista-crafted coffee, premium matcha, and signature hot or iced beverages as guests arrive.",
  },
  {
    number: "02",
    phase: "Cocktail Hour",
    title: "A moment to gather.",
    fitLabel: "Suggested Experience",
    fit: "Coffee Bar",
    description:
      "Give guests a café-inspired experience between the ceremony and reception with handcrafted drinks and personalized service.",
  },
  {
    number: "03",
    phase: "Reception",
    title: "Hospitality throughout the celebration.",
    fitLabel: "Suggested Experience",
    fit: "Coffee Bar",
    description:
      "Complement your reception with specialty coffee and non-coffee beverages tailored to your wedding schedule.",
  },
  {
    number: "04",
    phase: "Dessert",
    title: "A sweet moment worth sharing.",
    fitLabel: "Suggested Experience",
    fit: "Sweet Cart",
    description:
      "Bring the excitement of live dessert preparation to your celebration with mini Dutch pancakes, Belgian waffles on a stick, mini donuts, or fresh churros.",
  },
  {
    number: "05",
    phase: "Late Night",
    title: "Keep the celebration going.",
    fitLabel: "Suggested Experience",
    fit: "Coffee Bar or Sweet Cart",
    description:
      "Surprise guests with late-night specialty coffee or a freshly prepared dessert experience.",
  },
  {
    number: "06",
    phase: "The Morning After",
    title: "One more moment together.",
    fitLabel: "Suggested Experience",
    fit: "Coffee Bar",
    description:
      "Extend the experience with a farewell brunch featuring handcrafted coffee, matcha, and specialty beverages. Available as an additional booking.",
  },
] as const;

export const weddingCustomization = [
  {
    number: "01",
    title: "Custom Cups, Menus & Signage",
    description:
      "Personalize your wedding coffee experience with custom drink names, branded cups, menu displays, and cart signage featuring your names, monogram, wedding date, or chosen design.",
  },
  {
    number: "02",
    title: "Cart Styling & Dessert Presentation",
    description:
      "Create a cohesive look across your coffee and dessert experiences with custom cart signage, coordinated colours, premium sauces, toppings, and thoughtful presentation details.",
  },
] as const;

export const weddingLogistics = [
  {
    number: "01",
    title: "Planner & Venue Coordination",
    iconPath: "M19 12h26v45H19V12Zm7-5h12v10H26V7Zm0 21h12M26 36h12M26 44h8",
    description:
      "We work with your planner or venue to confirm service placement, access, and setup timing.",
  },
  {
    number: "02",
    title: "Setup & Takedown",
    iconPath: "M7 19h30v28H7V19Zm30 10h11l9 10v8H37M43 31v9h12M22 49a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm31 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z",
    description:
      "Coffee Bar and Sweet Cart setup and takedown are included. Rental delivery, setup, and pickup arrangements are confirmed in your proposal.",
  },
  {
    number: "03",
    title: "Venue Requirements",
    iconPath: "M12 55V20L32 8l20 12v35M7 55h50M23 55V37h18v18M21 25h4m14 0h4",
    description:
      "We'll review electrical access, water needs, loading arrangements, and weather considerations for your selected services.",
  },
  {
    number: "04",
    title: "Travel & Destination Weddings",
    iconPath: "M32 57S13 37 13 25a19 19 0 0 1 38 0c0 12-19 32-19 32ZM40 25a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    description:
      "Serving Toronto, the GTA, and select Southern Ontario destinations, with travel requirements confirmed before booking.",
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
      ...imageAssets.experiences.sweetCartSignature,
      id: "wedding-gallery-dessert-guests",
      sizes: "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 42vw",
    },
  },
  {
    number: "03",
    label: "The rentals",
    note: "White resin chairs and tables dressed with teal linens and floral centrepieces.",
    tone: "room",
    image: {
      ...imageAssets.experiences.whiteResinChairs,
      id: "wedding-gallery-tables-and-chairs",
      src: "/images/weddings/wedding-rentals-clean.webp",
      alt: "White resin chairs around tables with teal linens, blue and white flowers, and candlelight in a bright reception room",
      width: 1330,
      height: 1182,
      unoptimized: true,
      format: "webp",
    },
  },
] as const;

export const weddingFaqs = [
  {
    question: "Can Luxe provide coffee service for weddings?",
    answer:
      "Yes. The Luxe Coffee Bar provides premium coffee and matcha service, hot and iced café favourites, signature beverages and premium non-coffee options, milk alternatives, serving essentials, setup, and takedown. We plan the Coffee Bar setup around your wedding format and guest experience.",
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
      "Yes. Luxe serves Toronto and the Greater Toronto Area and considers select destination weddings throughout Southern Ontario, including Muskoka, Niagara and Prince Edward County. Travel fees are based on your location and event requirements.",
  },
] as const;
