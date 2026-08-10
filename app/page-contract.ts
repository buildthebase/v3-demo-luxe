import { primaryRoutes } from "./site-config";
import { searchIntents } from "./search-intent";

export type PageContract = {
  path: string;
  page: string;
  purpose: string;
  primaryCta: string;
  secondaryCta: string;
  indexable: boolean;
  audienceGroups: string[];
  schemaPlan: string[];
};

export const pageContracts: PageContract[] = [
  { path: "/", page: "Home", purpose: "Introduce Luxe Event Co., establish trust, explain the parent-brand relationship, and direct visitors into service-led or event-led journeys.", primaryCta: "Plan Your Event", secondaryCta: "Explore Experiences", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["Organization", "WebSite", "WebPage", "ImageObject"] },
  { path: "/experiences", page: "Experiences", purpose: "Present Coffee Bar, Sweet Cart, and Seating Rentals as distinct but complementary experiences.", primaryCta: "Explore an Experience", secondaryCta: "Plan Your Event", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["CollectionPage", "ItemList", "BreadcrumbList", "WebPage"] },
  { path: "/experiences/coffee-bar", page: "Coffee Bar", purpose: "Position Luxe Coffee Bar as a complete café and beverage experience rather than a basic mobile coffee cart.", primaryCta: "Plan Your Event", secondaryCta: "Explore Sweet Cart", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage", "FAQPage when visible FAQ content is approved"] },
  { path: "/experiences/sweet-cart", page: "Sweet Cart", purpose: "Present Sweet Cart as a live, interactive dessert experience that contributes to décor and atmosphere.", primaryCta: "Plan Your Event", secondaryCta: "Explore Coffee Bar", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage", "FAQPage when visible FAQ content is approved"] },
  { path: "/experiences/seating-rentals", page: "Seating Rentals", purpose: "Position a focused inventory of premium core rentals for weddings, showers, backyard and outdoor events, birthdays, engagements, and private celebrations, with rental-specific quantity and placement guidance.", primaryCta: "Plan Your Event", secondaryCta: "Explore Coffee and Dessert", indexable: true, audienceGroups: ["weddings", "private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage", "FAQPage when visible FAQ content is approved"] },
  { path: "/events", page: "Events", purpose: "Help visitors explore Luxe based on what they are planning rather than a predefined service.", primaryCta: "Plan Your Event", secondaryCta: "Explore Experiences", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["CollectionPage", "ItemList", "BreadcrumbList", "WebPage"] },
  { path: "/events/weddings", page: "Weddings", purpose: "Establish Luxe as a credible wedding vendor and encourage cohesive multi-service wedding bookings.", primaryCta: "Plan Your Event", secondaryCta: "Explore Wedding Experiences", indexable: true, audienceGroups: ["weddings"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/events/corporate-events", page: "Corporate Events", purpose: "Demonstrate professionalism, reliability, scalability, branding capability, and suitability for corporate work.", primaryCta: "Plan Your Event", secondaryCta: "Review Corporate Capabilities", indexable: true, audienceGroups: ["corporate", "brand-activations"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/events/brand-activations", page: "Brand Activations", purpose: "Speak directly to agencies, marketers, experiential teams, retail brands, and campaign teams.", primaryCta: "Plan Your Event", secondaryCta: "Discuss Campaign Requirements", indexable: true, audienceGroups: ["brand-activations", "corporate"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/events/baby-showers", page: "Baby Showers", purpose: "Present cohesive coffee, dessert, and rental combinations for baby showers.", primaryCta: "Plan Your Event", secondaryCta: "Explore Private Event Experiences", indexable: true, audienceGroups: ["private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/events/bridal-showers", page: "Bridal Showers", purpose: "Showcase visual, cohesive service combinations for bridal shower hosts and planners.", primaryCta: "Plan Your Event", secondaryCta: "Explore Wedding Experiences", indexable: true, audienceGroups: ["weddings", "private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/events/birthdays", page: "Birthdays", purpose: "Serve milestone, adult, family, and suitable children's celebrations without reducing the page to a generic party template.", primaryCta: "Plan Your Event", secondaryCta: "Explore Dessert Experiences", indexable: true, audienceGroups: ["private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/events/private-events", page: "Private Events", purpose: "Capture event types that do not fit neatly into the other event pages.", primaryCta: "Plan Your Event", secondaryCta: "Explore Experiences", indexable: true, audienceGroups: ["private-events"], schemaPlan: ["Service", "BreadcrumbList", "WebPage"] },
  { path: "/gallery", page: "Gallery", purpose: "Provide visual evidence, demonstrate range, support image discovery, and help visitors imagine Luxe at their event.", primaryCta: "Plan Your Event", secondaryCta: "Explore Experiences", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["CollectionPage", "ImageObject", "BreadcrumbList", "WebPage"] },
  { path: "/faq", page: "FAQ", purpose: "Resolve objections, establish expectations, qualify visitors, and provide clear factual answers.", primaryCta: "Plan Your Event", secondaryCta: "Review Experiences", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["FAQPage only when visible questions and answers are implemented", "BreadcrumbList", "WebPage"] },
  { path: "/contact", page: "Contact", purpose: "Help qualified visitors contact Luxe with the event details needed for a useful response and personalized proposal.", primaryCta: "Plan Your Event", secondaryCta: "See What to Include", indexable: true, audienceGroups: ["weddings", "corporate", "brand-activations", "private-events"], schemaPlan: ["ContactPage", "BreadcrumbList", "WebPage"] },
];

export const pageContractSummary = {
  routes: pageContracts.map((page) => page.path),
  missingRoutes: primaryRoutes.filter((path) => !pageContracts.some((page) => page.path === path)),
  primaryIntents: searchIntents.map((intent) => intent.primary.toLowerCase()),
};

export function getPageContract(path: string) {
  return pageContracts.find((page) => page.path === path);
}
