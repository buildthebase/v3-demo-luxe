export type PageSectionNavigationItem = {
  id: string;
  label: string;
};

export const homeSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "luxe-family", label: "Luxe family" },
  { id: "reviews", label: "Reviews" },
  { id: "experience-selector", label: "The experience" },
  { id: "unified-experience", label: "Tailored events" },
  { id: "combinations", label: "A Luxe occasion" },
  { id: "planning-journey", label: "Planning process" },
  { id: "event-types", label: "Event types" },
  { id: "contextual-imagery", label: "See Luxe in action" },
  { id: "operational-proof", label: "Our capabilities" },
  { id: "service-area", label: "Service areas" },
  { id: "event-planning", label: "Plan your event" },
] as const;

export const experiencesSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "booking-approach", label: "Booking approach" },
  { id: "experience-coffee", label: "Coffee Bar" },
  { id: "experience-dessert", label: "Sweet Cart" },
  { id: "experience-seating", label: "Seating Rentals" },
  { id: "experience-comparison", label: "Plan your event" },
  { id: "combinations", label: "Combinations" },
  { id: "event-types", label: "Explore by event" },
  { id: "gallery", label: "See Luxe in action" },
  { id: "planning-journey", label: "Planning process" },
  { id: "event-planning", label: "Plan your event" },
] as const;

export const eventsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "event-led-approach", label: "The event-led approach" },
  { id: "event-pathways", label: "Event pathways" },
  { id: "combinations", label: "Combinations" },
  { id: "gallery", label: "See Luxe in action" },
  { id: "planning-journey", label: "Planning process" },
  { id: "event-planning", label: "Plan your event" },
] as const;

export const coffeeBarSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "coffee-overview-title", label: "The experience" },
  { id: "coffee-formats", label: "Signature Coffee Bar" },
  { id: "coffee-branding", label: "Signage & branding" },
  { id: "coffee-inclusions-title", label: "What is included" },
  { id: "coffee-menu-title", label: "Coffee menu" },
  { id: "coffee-pricing", label: "Pricing" },
  { id: "coffee-events-title", label: "Event types" },
  { id: "coffee-gallery-title", label: "Gallery" },
  { id: "coffee-related-title", label: "Pair experiences" },
  { id: "coffee-faq-title", label: "Questions" },
] as const;

export const sweetCartSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "sweet-positioning-title", label: "The experience" },
  { id: "sweet-collections-title", label: "Signature cart" },
  { id: "dessert-experiences", label: "Dessert menu" },
  { id: "sweet-inclusions-title", label: "What is included" },
  { id: "sweet-pantry-title", label: "Sauces and toppings" },
  { id: "sweet-operations-title", label: "Pricing" },
  { id: "sweet-events-title", label: "Event types" },
  { id: "sweet-gallery-title", label: "Gallery" },
  { id: "sweet-combinations-title", label: "Pair experiences" },
  { id: "sweet-faq-title", label: "Questions" },
] as const;

export const seatingRentalsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "seating-overview-title", label: "The experience" },
  { id: "rental-categories", label: "Rental categories" },
  { id: "tent-configurations", label: "Tent configurations" },
  { id: "seating-operations-title", label: "Operations" },
  { id: "seating-events-title", label: "Event types" },
  { id: "seating-pricing-title", label: "Pricing" },
  { id: "seating-combinations-title", label: "Pair experiences" },
  { id: "seating-faq-title", label: "Questions" },
] as const;

export const weddingsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "wedding-overview-title", label: "The wedding experience" },
  { id: "wedding-day-title", label: "Wedding-day possibilities" },
  { id: "wedding-experiences", label: "Three experiences" },
  { id: "wedding-customization-title", label: "Personalization" },
  { id: "wedding-coordination-title", label: "Planning and logistics" },
  { id: "wedding-gallery-title", label: "Gallery" },
  { id: "wedding-faq-title", label: "Questions" },
  { id: "wedding-inquiry", label: "Plan your wedding" },
] as const;

export const corporateEventsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "corporate-overview-title", label: "The event experience" },
  { id: "corporate-capabilities-title", label: "Capabilities" },
  { id: "corporate-experiences", label: "Three experiences" },
  { id: "corporate-branding-title", label: "Branding" },
  { id: "corporate-scale-title", label: "Scale and logistics" },
  { id: "corporate-trust-title", label: "Trusted by teams" },
  { id: "corporate-gallery-title", label: "Gallery" },
  { id: "corporate-planning-title", label: "Planning process" },
  { id: "corporate-faq-title", label: "Questions" },
] as const;

export const brandActivationsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "activation-overview-title", label: "The activation" },
  { id: "activation-contexts-title", label: "Activation formats" },
  { id: "activation-system-title", label: "Brand system" },
  { id: "activation-services-title", label: "Experiences" },
  { id: "activation-scale-title", label: "Scale and logistics" },
  { id: "activation-content-title", label: "Content moments" },
  { id: "activation-trust-title", label: "Trusted by teams" },
  { id: "activation-gallery-title", label: "Gallery" },
  { id: "activation-planning-title", label: "Planning process" },
  { id: "activation-faq-title", label: "Questions" },
] as const;

export const babyShowersSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "baby-overview-title", label: "The shower experience" },
  { id: "baby-experiences", label: "Three experiences" },
  { id: "baby-styling-title", label: "Styling" },
  { id: "baby-settings-title", label: "Indoor and outdoor" },
  { id: "baby-combinations", label: "Experience combinations" },
  { id: "baby-gallery-title", label: "Gallery" },
  { id: "baby-planning-title", label: "Planning checklist" },
  { id: "baby-faq-title", label: "Questions" },
] as const;

export const bridalShowersSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "bridal-overview-title", label: "The shower experience" },
  { id: "bridal-moments-title", label: "Event moments" },
  { id: "bridal-experiences", label: "Three experiences" },
  { id: "bridal-combinations-title", label: "Experience combinations" },
  { id: "bridal-details-title", label: "Personal details" },
  { id: "bridal-gallery-title", label: "Gallery" },
  { id: "bridal-planning-title", label: "Planning checklist" },
  { id: "bridal-faq-title", label: "Questions" },
] as const;

export const birthdaysSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "birthday-overview-title", label: "The birthday experience" },
  { id: "birthday-contexts-title", label: "Birthday formats" },
  { id: "birthday-experiences", label: "Three experiences" },
  { id: "birthday-personalization-title", label: "Personalization" },
  { id: "birthday-combinations-title", label: "Experience combinations" },
  { id: "birthday-gallery-title", label: "Gallery" },
  { id: "birthday-planning-title", label: "Planning checklist" },
  { id: "birthday-faq-title", label: "Questions" },
] as const;

export const privateEventsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "private-overview-title", label: "The event experience" },
  { id: "private-contexts-title", label: "Occasions" },
  { id: "private-experiences", label: "Three experiences" },
  { id: "private-personalization-title", label: "Personalization" },
  { id: "private-gallery-title", label: "Gallery" },
  { id: "private-planning-title", label: "Planning checklist" },
  { id: "private-faq-title", label: "Questions" },
] as const;
