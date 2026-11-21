import { permanentRoutes } from "./responsive-system";

export const accessibilitySystem = {
  status: "established",
  target: "WCAG 2.2 Level AA",
  governingSources: [
    "Experiences by Luxe Website Strategy, Design, Development, SEO and AEO Implementation Master Specification",
    "Experiences by Luxe Complete Intake, July 2026",
  ],
  scope: permanentRoutes,
  semantics: {
    language: "en-CA",
    landmarks: [
      "one primary header and navigation",
      "one main content target",
      "one contentinfo footer",
      "labelled contextual navigation where used",
    ],
    headings:
      "Every page has one H1 and follows a logical hierarchy without selecting levels for visual appearance.",
    bypass:
      "A first-focus skip link moves keyboard users directly to the programmatically focusable main-content target.",
  },
  keyboard: {
    requirements: [
      "Every action is operable without a pointer.",
      "Visual and DOM order preserve the same reading and focus sequence.",
      "Navigation, filters, accordions, and inquiry actions retain a visible focus indicator.",
      "Current navigation state is identified in markup and with more than colour alone.",
      "No required information is available only on hover.",
    ],
    nativePatterns: {
      mobileMenu: "details and summary disclosure",
      faq: "details and summary disclosure",
      galleryFilters: "buttons with aria-pressed and aria-controls",
    },
  },
  contrast: {
    primaryText: { value: "#1F1F1F", onIvory: 15.27 },
    mutedText: { value: "#595754", onIvory: 6.67, onTaupe: 4.64 },
    accentText: { value: "#695438", onIvory: 6.65, onTaupe: 4.63 },
    accentTextOnDark: { value: "#DEC297", onWarmDark: 5.08, onMatteBlack: 9.63 },
    rules: [
      "Body-sized text maintains at least 4.5:1 contrast.",
      "Large text, focus indicators, and meaningful graphics maintain at least 3:1 contrast.",
      "Literal champagne gold and warm grey remain visual accents, not small text on ivory.",
      "Dark chapters use a lighter champagne tint and muted ivory so small text remains readable on matte-black and warm-dark surfaces.",
      "State and meaning never depend on colour alone.",
    ],
  },
  media: {
    meaningfulImages:
      "Use concise, context-specific alternative text that does not repeat an adjacent caption.",
    decorativeImages: "Use an empty alt attribute or remove decorative media from the accessibility tree.",
    video:
      "Autoplay media is muted and decorative. Any future video that communicates unique information requires captions and an adjacent transcript or equivalent text alternative.",
    motion:
      "prefers-reduced-motion removes non-essential choreography; no content or control depends on animation.",
  },
  controls: {
    targetSize: "44 by 44 CSS pixels wherever the control is not covered by a WCAG exception",
    names: "Links and controls expose descriptive, contextual accessible names.",
    status:
      "Dynamic filtering and submission outcomes use polite status messaging; urgent errors use an assertive alert.",
  },
  forms: {
    currentBoundary:
      "The production inquiry is an external handoff, so the current website contains no native inquiry fields.",
    requirements: [
      "Every future field has a persistent visible label.",
      "Required state, format, and errors are described in text and associated programmatically.",
      "On failed submission, focus moves to an error summary that links to each invalid field.",
      "Success and failure messages are announced without requiring a viewport change.",
      "Consent and privacy context appears before submission where required.",
    ],
  },
  qualityGate: [
    "Run source-level accessibility contract tests.",
    "Run rendered landmark, name, state, and heading checks on every permanent route.",
    "Verify keyboard-only navigation, disclosures, filters, and skip-link behavior.",
    "Verify mobile and 200 percent zoom layouts without horizontal page overflow.",
    "Verify reduced-motion and media fallback states.",
    "Re-audit when final photography, video, inquiry fields, or third-party embeds are introduced.",
  ],
} as const;

export type AccessibilitySystem = typeof accessibilitySystem;
