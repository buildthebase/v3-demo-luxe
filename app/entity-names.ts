export const entityNames = {
  parentBrand: {
    stableKey: "luxe-event-co",
    currentName: "Experiences by Luxe",
    alternateNames: ["Luxe"],
    nameStatus: "current",
  },
  divisions: {
    coffeeBar: "Luxe Coffee Bar",
    sweetCart: "Luxe Sweet Cart",
    seatingRentals: "Luxe Event Rentals",
  },
  coffeeExperiences: {
    cafeCart: {
      canonicalName: "Luxe Café Cart",
      shortName: "Café Cart Experience",
      contextualName: "Café Cart",
    },
    signatureCoffeeBar: {
      canonicalName: "Luxe Signature Coffee Bar",
      shortName: "Signature Coffee Bar Experience",
      contextualName: "Signature Coffee Bar",
    },
  },
  geography: {
    toronto: "Toronto",
    greaterTorontoArea: "Greater Toronto Area",
    greaterTorontoAreaAbbreviation: "GTA",
    southernOntario: "Southern Ontario",
  },
} as const;
