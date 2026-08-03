import { test, expect, type Page } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/careers",
  "/case-study",
  "/contact",
  "/edible-gardens-and-culinary-experiences",
  "/ethos",
  "/galleries",
  "/how-we-work",
  "/landscape-architecture",
  "/landscape-construction",
  "/landscape-maintenance",
  "/privacy-policy",
  "/subscribe",
  "/what-we-do",
  "/accessibility-statement",
];

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

for (const route of routes) {
  test(`loads ${route} with no console/page errors`, async ({ page }) => {
    const errors = collectPageErrors(page);
    // "domcontentloaded" (not "load"/"networkidle"): pages render several
    // below-the-fold hero images, and waiting for every image request to
    // settle makes this test hostage to Next's dev-only image-optimizer
    // cold cache (first-time AVIF encodes can take well over a minute).
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `HTTP status for ${route}`).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
    expect(errors, `console/page errors on ${route}: ${errors.join("\n")}`).toEqual([]);
  });
}

test("404 route renders the not-found page", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
});
