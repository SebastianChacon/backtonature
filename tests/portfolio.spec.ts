import { test, expect } from "@playwright/test";
import { projectSlugs } from "./fixtures";

test("case study index links to each project detail page", async ({ page }) => {
  await page.goto("/case-study/");
  const links = page.locator('a[href^="/portfolio/"]');
  const count = await links.count();
  expect(count).toBeGreaterThanOrEqual(projectSlugs.length);
});

test("project detail page renders breadcrumbs, related projects and CTA", async ({
  page,
}) => {
  const slug = projectSlugs[0];
  await page.goto(`/portfolio/${slug}/`);

  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("link", { name: "Case Studies" }).first()).toHaveAttribute(
    "href",
    "/case-study/",
  );

  // Related projects section should link to other portfolio pages.
  const relatedLinks = page.locator('a[href^="/portfolio/"]');
  const relatedCount = await relatedLinks.count();
  expect(relatedCount).toBeGreaterThan(0);

  // Contact CTA present at the bottom of every project page.
  await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
});

test("structured data (JSON-LD) is present on a project page", async ({ page }) => {
  await page.goto(`/portfolio/${projectSlugs[0]}/`);
  const scripts = page.locator('script[type="application/ld+json"]');
  const count = await scripts.count();
  expect(count).toBeGreaterThan(0);

  const raw = await scripts.first().textContent();
  expect(() => JSON.parse(raw ?? "")).not.toThrow();
});
