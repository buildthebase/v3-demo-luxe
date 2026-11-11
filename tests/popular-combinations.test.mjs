import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("brand activation combinations use the same concise custom-branding description", () => {
  const description = "Coffee bar service with custom signage, branded cups, backdrops and more, coordinated around your brand.";
  for (const file of ["app/experiences/content.ts", "app/signature-elements.ts"]) {
    assert.ok(read(file).includes(description), file);
  }
});

test("popular combinations share the presentation and quote popup", () => {
  const component = read("app/components/signature-elements.tsx").split("export function CombinedExperienceFeature")[1].split("export function CredibilityStrip")[0];
  assert.match(component, /<QuoteModalTrigger key=\{combination.id\}>/);
  assert.doesNotMatch(component, /<Link/);
  assert.match(component, /useLineIcons = true/);
  assert.match(component, /variant = "popular"/);
  for (const path of ["app/experiences/page.tsx", "app/events/page.tsx"]) {
    const source = read(path);
    assert.match(source, /<CombinedExperienceFeature/);
    assert.match(source, /heading="Popular Combinations"/);
  }
  const baby = read("app/components/baby-showers-page.tsx");
  assert.match(baby, /heading="Ways the experiences can come together"/);
  assert.match(baby, /variant="original"/);
  assert.match(baby, /useLineIcons=\{false\}/);
  assert.match(read("app/components/bridal-showers-page.tsx"), /Example bridal shower service combinations/);
  assert.match(read("app/components/birthdays-page.tsx"), /Popular birthday service combinations/);
});

test("customer-facing sources use Event Rentals or the requested Luxe Seating Rentals brand without changing service URLs", () => {
  function visit(directory) {
    for (const item of readdirSync(new URL(`../${directory}`, import.meta.url), { withFileTypes: true })) {
      const path = `${directory}/${item.name}`;
      if (item.isDirectory()) visit(path);
      else if (/\.(tsx?|css|json)$/.test(path)) assert.doesNotMatch(read(path).replace(/\bLuxe Seating Rentals\b/g, ""), /\bseating rentals\b/i, path);
    }
  }
  visit("app");
  assert.doesNotMatch(read("public/llms.txt"), /\bseating rentals\b/i);
  assert.match(read("app/site-config.ts"), /\/experiences\/seating-rentals/);
  for (const sourcePath of ["app/experiences/content.ts", "app/signature-elements.ts"]) {
    const source = read(sourcePath).split(/export const (?:experienceHubCombinations|combinedExperiences)/)[1];
    for (const match of source.matchAll(/title: "([^"]+)"/g)) {
      if (/coffee/i.test(match[1])) assert.match(match[1], /Coffee Bar/);
    }
  }
});

test("employee events are featured and wedding venue copy excludes floor protection", () => {
  const corporate = read("app/components/corporate-events-page.tsx");
  assert.match(corporate, /panel\(employeeEvents, true\)/);
  assert.match(corporate, /panel\(conferenceEvents\)/);
  assert.doesNotMatch(corporate, /panel\(conferenceEvents, true\)/);
  assert.doesNotMatch(read("app/events/weddings-content.ts"), /floor protection/i);
});

test("corporate planning and scale are condensed into one four-step section", () => {
  const component = read("app/components/corporate-events-page.tsx");
  assert.doesNotMatch(component, /CorporateScale|Built to adapt to larger corporate events/);
  assert.equal((component.match(/<CorporatePlanning\s*\/>/g) ?? []).length, 1);
  assert.match(component, /corporate-planning-merged/);
  const steps = read("app/events/corporate-events-content.ts").split("export const corporatePlanningSteps = [")[1].split("] as const;")[0];
  assert.equal((steps.match(/number: "/g) ?? []).length, 4);
  assert.ok(steps.split(/\s+/).length < 100, "Keep the merged content concise");
  assert.match(steps, /additional service points/);
  assert.match(steps, /multi-day or recurring/);
  assert.match(steps, /storage and setup times/);
  assert.match(steps, /Approve any quoted branding before production/);
  const navigation = read("app/page-section-navigation.ts").split("export const corporateEventsSectionNavigation")[1].split("] as const;")[0];
  assert.doesNotMatch(navigation, /corporate-scale-title/);
  assert.equal((navigation.match(/corporate-planning-title/g) ?? []).length, 1);
});

test("wedding personalization retains only two evenly arranged cards", () => {
  const cards = read("app/events/weddings-content.ts").split("export const weddingCustomization = [")[1].split("] as const;")[0];
  assert.equal((cards.match(/number: "/g) ?? []).length, 2);
  assert.match(cards, /Custom Cups, Menus & Signage/);
  assert.match(cards, /Cart Styling & Dessert Presentation/);
  assert.doesNotMatch(cards, /DRINKS & MENUS|title: "RENTALS"/);
  const css = read("app/wedding-page-polish.css");
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);\s*grid-auto-rows: 1fr/);
  assert.match(css, /\.wedding-customization article:nth-child\(n\)\s*\{\s*grid-column: auto;\s*margin-top: 0;/);
});

test("corporate gallery is replaced by one quote popup link", () => {
  const component = read("app/components/corporate-events-page.tsx");
  assert.doesNotMatch(component, /CorporateGallery|corporate-gallery-grid|Corporate hospitality, shown in action/);
  assert.match(component, /<QuoteModalTrigger className="corporate-event-fit-link">/);
  assert.match(component, /className="corporate-event-fit-link">\s*Plan Your Event/);
  assert.doesNotMatch(component, /See how this fits into your corporate event/);
  const navigation = read("app/page-section-navigation.ts").split("export const corporateEventsSectionNavigation")[1].split("] as const;")[0];
  assert.doesNotMatch(navigation, /corporate-gallery-title/);
});

test("wedding gallery follows the schedule and its navigation matches", () => {
  const page = read("app/components/weddings-page.tsx");
  assert.match(page, /<WeddingDay\s*\/>\s*<WeddingGallery\s*\/>/);
  assert.equal((page.match(/<WeddingGallery\s*\/>/g) ?? []).length, 1);
  const navigation = read("app/page-section-navigation.ts").split("export const weddingsSectionNavigation")[1].split("] as const;")[0];
  assert.ok(navigation.indexOf("wedding-day-title") < navigation.indexOf("wedding-gallery-title"));
  assert.ok(navigation.indexOf("wedding-gallery-title") < navigation.indexOf("wedding-experiences"));
});

test("corporate specialist occasions share one concise inclusive card", () => {
  const cards = read("app/events/corporate-events-content.ts").split("export const corporateEventApplications = [")[1].split("] as const;")[0];
  assert.equal((cards.match(/number: "/g) ?? []).length, 7);
  assert.match(cards, /Business and community events/);
  assert.doesNotMatch(cards, /Holiday and appreciation events|Real estate and development events|Institutional and campus events/);
  const component = read("app/components/corporate-events-page.tsx");
  assert.match(component, /panel\(businessAndCommunityEvents\)/);
  assert.doesNotMatch(component, /panel\((?:holidayEvents|realEstateEvents|institutionalEvents)/);
  assert.doesNotMatch(component, /corporate-capability-group-universal/);
  assert.match(component, /corporate-capability-group-balanced/);
});

test("corporate process follows a snake trail without changing semantic step order", () => {
  const component = read("app/components/corporate-events-page.tsx");
  assert.match(component, /<ol className="corporate-planning-trail">/);
  assert.match(component, /corporatePlanningSteps.map\(\(step\) =>/);
  assert.match(component, /className="corporate-planning-marker" aria-hidden="true"/);
  const css = read("app/corporate-page-polish.css");
  assert.match(css, /li:nth-child\(3\)\s*\{\s*grid-area: 2 \/ 2;/);
  assert.match(css, /li:nth-child\(4\)\s*\{\s*grid-area: 2 \/ 1;/);
  assert.match(css, /border-radius: 0 3rem 3rem 0/);
  assert.match(css, /grid-row: auto/);
});

test("wedding gallery, experiences and customization alternate their surfaces", () => {
  const css = read("app/wedding-page-polish.css");
  assert.match(css, /\.wedding-page > \.wedding-gallery\s*\{[^}]*background: var\(--surface-chapter-soft\)/);
  assert.match(css, /\.wedding-page > \.signature-selector-taupe\s*\{[^}]*background: var\(--color-luxe-ivory\)/);
  assert.match(css, /\.wedding-page > \.wedding-customization\s*\{\s*--wedding-customization-surface: var\(--surface-chapter-soft\)/);
});

test("wedding overview is removed and the centered logistics heading has no redundant summary", () => {
  const page = read("app/components/weddings-page.tsx");
  assert.doesNotMatch(page, /WeddingOverview|wedding-overview-title/);
  assert.doesNotMatch(page, /Access, timing, placement, utilities|confirmed services arrive prepared for the setting/);
  const navigation = read("app/page-section-navigation.ts").split("export const weddingsSectionNavigation")[1].split("] as const;")[0];
  assert.doesNotMatch(navigation, /wedding-overview-title/);
  assert.match(read("app/wedding-page-polish.css"), /\.wedding-customization\s*\{\s*text-align: center/);
});

test("wedding coordination omits the insurance panel and corporate proof headings use sentence case", () => {
  const wedding = read("app/components/weddings-page.tsx");
  assert.doesNotMatch(wedding, /wedding-coordination-insurance|Certificates of Insurance \(COI\)/);
  assert.match(wedding, /<dt>\$5 million<\/dt>/, "Keep the separate hero proof intact");
  const corporate = read("app/components/corporate-events-page.tsx");
  for (const label of ["Flexible capacity", "Multiple setups", "Coffee + dessert", "$5 million"]) {
    assert.ok(corporate.includes(`<dt>${label}</dt>`));
  }
  assert.match(read("app/corporate-page-polish.css"), /\.corporate-hero-proof dt\s*\{\s*text-transform: none/);
});
