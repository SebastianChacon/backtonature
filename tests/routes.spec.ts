import { test, expect } from "@playwright/test";
import { staticRoutes, projectSlugs } from "./fixtures";

const allRoutes = [
  ...staticRoutes,
  ...projectSlugs.map((slug) => `/portfolio/${slug}/`),
];

for (const route of allRoutes) {
  test(`loads without errors: ${route}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));

    const response = await page.goto(route);
    expect(response?.status(), `HTTP status for ${route}`).toBeLessThan(400);

    // Every page must render exactly one h1.
    await expect(page.locator("h1")).toHaveCount(1);

    // Header and footer must be present on every page.
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();

    // Page must have a non-empty <title>.
    await expect(page).toHaveTitle(/.+/);

    // The Vimeo iframe posts a readiness handshake before its own origin
    // check settles — benign, and outside our code (components/VideoBackground.tsx).
    const ignorable = /favicon|ERR_BLOCKED_BY_CLIENT|Unable to post message to https:\/\/player\.vimeo\.com/i;
    const realConsoleErrors = consoleErrors.filter((e) => !ignorable.test(e));
    expect(realConsoleErrors, `console errors on ${route}`).toEqual([]);
    expect(pageErrors, `uncaught page errors on ${route}`).toEqual([]);
  });
}

test("404 page renders for unknown routes", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/grown over/i);
  await expect(page.getByRole("link", { name: /view the work/i })).toBeVisible();
});

test("unknown portfolio slug renders 404", async ({ page }) => {
  const response = await page.goto("/portfolio/not-a-real-project/");
  expect(response?.status()).toBe(404);
});

test("robots.txt is served", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.status()).toBe(200);
  const body = await response?.text();
  expect(body).toContain("Sitemap");
});

test("sitemap.xml is served and includes core routes", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);
  const body = (await response?.text()) ?? "";
  expect(body).toContain("<urlset");
  expect(body).toContain("/case-study/");
  expect(body).toContain("/contact/");
});
