export const contentHierarchyRequirements = {
  primaryHeading: {
    count: 1,
    visible: true,
    rule: "Every page must expose one visible primary H1 in the initial HTML.",
  },
  openingExplanation: {
    required: true,
    rule: "Concise explanatory text must appear before the first major H2 section.",
  },
  sectionHeadings: {
    allowedLevels: ["h2", "h3", "h4"],
    rule:
      "Headings must describe content structure, remain properly nested, and never exist only to create a visual style.",
  },
  visibleContent: {
    serverRendered: true,
    rule:
      "Critical positioning, factual information, links, and qualifications must remain available outside images, videos, carousels, and interaction-only states.",
  },
  conversion: {
    primaryCtaRequired: true,
    finalInquiryRequired: true,
    rule:
      "Every page must offer its defined primary action and a final inquiry opportunity appropriate to the page context.",
  },
  discovery: {
    internalLinksRequired: true,
    crossServicePathRequired: true,
    rule:
      "Every page must provide crawlable internal links and a relevant route into another Luxe division or event context.",
  },
  evidence: {
    proofRequired: true,
    qualificationRequired: true,
    rule:
      "Proof and logistics must use confirmed Luxe facts or clearly identified permission-gated content boundaries.",
  },
} as const;

export const hierarchyPrimaryCtas = {
  "/": "Plan Your Event",
  "/experiences": "Explore an Experience",
  "/experiences/coffee-bar": "Plan Your Event",
  "/experiences/sweet-cart": "Plan Your Event",
  "/experiences/seating-rentals": "Plan Your Event",
  "/events": "Plan Your Event",
  "/events/weddings": "Plan Your Event",
  "/events/corporate-events": "Plan Your Event",
  "/events/brand-activations": "Plan Your Event",
  "/events/baby-showers": "Plan Your Event",
  "/events/bridal-showers": "Plan Your Event",
  "/events/birthdays": "Plan Your Event",
  "/events/private-events": "Plan Your Event",
  "/gallery": "Plan Your Event",
  "/faq": "Plan Your Event",
  "/contact": "Plan Your Event",
} as const;
