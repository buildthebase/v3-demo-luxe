const playwrightModulePath = process.env.PLAYWRIGHT_MODULE_PATH;
const chromeExecutablePath = process.env.CHROME_EXECUTABLE_PATH;
const baseUrl = process.env.AUDIT_BASE_URL ?? "http://localhost:3001";

if (!playwrightModulePath || !chromeExecutablePath) {
  throw new Error("PLAYWRIGHT_MODULE_PATH and CHROME_EXECUTABLE_PATH are required.");
}

const { chromium } = await import(playwrightModulePath);

const routes = [
  "/",
  "/experiences",
  "/experiences/coffee-bar",
  "/experiences/sweet-cart",
  "/experiences/seating-rentals",
  "/events",
  "/events/weddings",
  "/events/corporate-events",
  "/events/brand-activations",
  "/events/baby-showers",
  "/events/bridal-showers",
  "/events/birthdays",
  "/events/private-events",
  "/faq",
  "/gallery",
  "/contact",
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

const expectedFaqCopy = [
  "Your event date is secured once the service agreement is signed and the 30% non-refundable retainer is received.",
  "The remaining balance is due 7 days before the event unless otherwise stated in your agreement.",
  "Yes. Luxe carries $5 million in commercial liability insurance, and proof of insurance can be provided to venues or corporate clients where required.",
  "Luxe primarily serves Toronto and the Greater Toronto Area, with select bookings available throughout Southern Ontario. Travel fees may apply based on event location and logistics.",
  "Travel fees may apply depending on event location, distance, service requirements and transportation needs. Any applicable travel charges are clearly included in your proposal before booking.",
  "Setup time varies by selected experience, venue access and event requirements. Our team confirms the appropriate arrival and setup window with the client or venue before the event.",
  "Power and water requirements vary by the selected Luxe experience and event setup. We confirm all electrical, water and access requirements before the event so the correct service plan can be prepared.",
  "Yes. Many Luxe experiences can be provided outdoors, subject to suitable weather conditions, venue access and the requirements of the selected service. Outdoor events should have an appropriate contingency plan where weather may affect service.",
  "For outdoor events, the client is responsible for ensuring an appropriate covered or alternate service area if weather conditions could affect equipment or service. Tent options may also be available through Luxe depending on the event.",
  "Yes. Coffee Bar menus can be personalized with café favourites, signature beverages, premium matcha and selected non-coffee options based on the chosen experience. Custom menu wording, drink names, cups, stickers and signage can also be incorporated.",
  "Yes. Hot and iced beverage service is available as part of the Luxe Coffee Bar experience.",
  "Yes. Premium matcha is available as a non-coffee option and can also be incorporated into customized event menus.",
  "Yes. Whole milk and premium non-dairy milk alternatives are available. Final milk selections are confirmed with the event menu.",
  "Professional barista service is included with every Coffee Bar booking. Staffing is determined by guest count, menu, service duration and venue requirements to ensure smooth service throughout the event.",
  "Service capacity varies based on guest count, selected menu, hot-to-iced drink mix, and guest arrival patterns. We recommend the appropriate staffing and service setup for each event to keep service moving efficiently.",
  "The Luxe Café Cart offers a more compact café setup for intimate celebrations, offices and spaces where a smaller footprint is preferred. The Luxe Signature Coffee Bar creates a larger, more prominent service presence for weddings, corporate events and celebrations where presentation is a bigger part of the experience.",
  "Luxe Sweet Cart offers Mini Dutch Pancakes, Belgian Waffles on a Stick, Mini Donuts and the Luxe Churro Bar. The selected dessert experience is prepared and served live for guests.",
  "Yes. Vanilla or chocolate soft serve can be added to select Luxe Sweet Cart bookings as an enhancement. Soft serve is not currently offered as a standalone service.",
  "Sweet Cart experiences include a curated selection of standard toppings and premium sauces based on the selected package. Premium toppings and additional enhancements can also be added where available.",
  "Please share any dietary restrictions or allergy concerns during your inquiry. Our team will review the selected ingredients, preparation process and equipment to determine what accommodations can safely be offered. Because equipment and preparation areas may be shared, Luxe cannot guarantee an allergen-free environment.",
  "Service duration is based on guest count and the selected dessert experience. Most Luxe Sweet Cart bookings include approximately 1.5–2.5 hours of live dessert service, with the exact service window confirmed in your proposal.",
  "Professional attendant service is included with every Luxe Sweet Cart booking. Staffing is determined by guest count, dessert selection and service requirements.",
  "Luxe offers a focused rental collection including white resin chairs, 6-ft rectangular tables, cocktail tables, linens, tents, tent walls, tent lighting with Luxe tent rentals and dance-floor configurations up to 18' × 18'.",
  "Tent lighting is available with Luxe tent rentals and is not currently offered as a standalone lighting service.",
  "Setup is available and will be clearly identified in your proposal. Depending on the rental order, clients may select delivery only or delivery with professional setup. Any applicable setup fees are confirmed before booking.",
  "Yes. Delivery is available throughout Toronto and the GTA, with select extended-distance requests considered based on availability. Delivery fees are based on location, order size, access requirements and requested service.",
  "Yes. Luxe Coffee Bar, Luxe Sweet Cart and select event rentals can each be booked independently or coordinated together through one inquiry.",
  "Yes. We can coordinate directly with planners, venues and event contacts regarding access, setup timing, service placement and the requirements of the Luxe services booked.",
  "We recommend booking as early as possible, especially for peak wedding and event dates between spring and fall. Additional lead time is also helpful for custom signage, branded cups and coordinated rentals.",
];

const expectedCoffeeCopy = [
  "250+",
  "Luxe Coffee Bar serves intimate gatherings through large-scale events, with service plans tailored to guest count, menu, venue requirements and event flow. Larger-format events can be accommodated through a customized service plan.",
  "Service capacity varies based on guest count, selected menu, hot-to-iced drink mix, and guest arrival patterns. We recommend the appropriate staffing and service setup for each event to keep service moving efficiently.",
  "Professional barista service is included with every Coffee Bar booking. Staffing is determined by guest count, menu, service duration and venue requirements to ensure smooth service throughout the event.",
  "Setup requirements vary by Coffee Bar format and venue. Our team confirms electrical, water, access and setup requirements with the client or venue before the event so the appropriate service plan can be prepared.",
];

const browser = await chromium.launch({
  executablePath: chromeExecutablePath,
  headless: true,
});

const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 30_000,
      });
      const pageResult = await page.evaluate(() => {
        const root = document.documentElement;
        const text = document.body.innerText.trim();
        const overlay = document.querySelector(
          "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay",
        );

        return {
          hasContent: text.length > 100,
          hasErrorOverlay: Boolean(overlay),
          horizontalOverflow: root.scrollWidth > root.clientWidth + 1,
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
        };
      });

      results.push({
        viewport: viewport.name,
        route,
        status: response?.status() ?? null,
        ...pageResult,
      });

      if (
        viewport.name === "mobile" &&
        ["/", "/faq", "/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals"].includes(route)
      ) {
        const filename = route === "/" ? "home" : route.split("/").at(-1);
        await page.screenshot({
          path: `/private/tmp/luxe-${filename}-mobile.png`,
          fullPage: false,
        });
      }
    }

    results.push({
      viewport: viewport.name,
      consoleErrors: [...new Set(consoleErrors)],
      pageErrors: [...new Set(pageErrors)],
    });
    await context.close();
  }

  const faqContext = await browser.newContext({ viewport: viewports[0] });
  const faqPage = await faqContext.newPage();
  await faqPage.goto(`${baseUrl}/faq`, { waitUntil: "networkidle" });
  const faqText = await faqPage.locator("body").textContent() ?? "";
  const missingFaqCopy = expectedFaqCopy.filter((answer) => !faqText.includes(answer));
  results.push({ faqAnswerCount: expectedFaqCopy.length, missingFaqCopy });
  await faqContext.close();

  const coffeeContext = await browser.newContext({ viewport: viewports[0] });
  const coffeePage = await coffeeContext.newPage();
  await coffeePage.goto(`${baseUrl}/experiences/coffee-bar`, { waitUntil: "networkidle" });
  const coffeeText = await coffeePage.locator("body").textContent() ?? "";
  const missingCoffeeCopy = expectedCoffeeCopy.filter((copy) => !coffeeText.includes(copy));
  const forbiddenCoffeeCopy = ["Every menu begins with four café favourites"].filter((copy) =>
    coffeeText.includes(copy),
  );
  results.push({
    coffeeCopyCount: expectedCoffeeCopy.length,
    missingCoffeeCopy,
    forbiddenCoffeeCopy,
  });
  await coffeeContext.close();
} finally {
  await browser.close();
}

const failedPages = results.filter(
  (result) =>
    result.route &&
    (result.status !== 200 ||
      !result.hasContent ||
      result.hasErrorOverlay ||
      result.horizontalOverflow),
);
const runtimeErrors = results.filter(
  (result) => result.consoleErrors?.length || result.pageErrors?.length,
);
const faqResult = results.find((result) => "missingFaqCopy" in result);
const coffeeResult = results.find((result) => "missingCoffeeCopy" in result);

console.log(JSON.stringify({
  passed:
    failedPages.length === 0 &&
    runtimeErrors.length === 0 &&
    faqResult.missingFaqCopy.length === 0 &&
    coffeeResult.missingCoffeeCopy.length === 0 &&
    coffeeResult.forbiddenCoffeeCopy.length === 0,
  auditedPageStates: routes.length * viewports.length,
  failedPages,
  runtimeErrors,
  faq: faqResult,
  coffee: coffeeResult,
  screenshots: [
    "/private/tmp/luxe-home-mobile.png",
    "/private/tmp/luxe-faq-mobile.png",
    "/private/tmp/luxe-coffee-bar-mobile.png",
    "/private/tmp/luxe-sweet-cart-mobile.png",
    "/private/tmp/luxe-seating-rentals-mobile.png",
  ],
}, null, 2));
