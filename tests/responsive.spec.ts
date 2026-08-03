import { test, expect, type Page } from "@playwright/test";
import { staticRoutes } from "./fixtures";

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1; // 1px tolerance for subpixel rounding
  });
}

test.describe("No horizontal scroll on any route", () => {
  for (const route of staticRoutes) {
    test(`no horizontal overflow: ${route}`, async ({ page, isMobile }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const overflowing = await hasHorizontalOverflow(page);
      expect(overflowing, `${route} overflows horizontally (mobile=${isMobile})`).toBe(
        false,
      );
    });
  }
});

test.describe("Mobile layout specifics", () => {
  test("home hero fills the viewport without overflow", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("main").first();
    await expect(hero).toBeVisible();
    const overflowing = await hasHorizontalOverflow(page);
    expect(overflowing).toBe(false);
  });

  test("mobile menu button meets a reasonable tap-target size", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "mobile-only check");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    const box = await toggle.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(32);
  });

  test("contact form fields stack full-width below the sm breakpoint", async ({
    page,
  }) => {
    // The grid switches to 2 columns at Tailwind's `sm` (640px) — only assert
    // stacking below that, regardless of the device's touch/isMobile flag.
    test.skip((page.viewportSize()?.width ?? 0) >= 640, "requires a sub-640px viewport");
    await page.goto("/contact/");
    const firstName = page.getByLabel("First name");
    const lastName = page.getByLabel("Last name");
    const firstBox = await firstName.boundingBox();
    const lastBox = await lastName.boundingBox();
    expect(firstBox).not.toBeNull();
    expect(lastBox).not.toBeNull();
    // Below sm breakpoint the grid collapses to a single column, so the
    // second field should sit below, not beside, the first.
    expect(lastBox!.y).toBeGreaterThan(firstBox!.y);
  });

  test("gallery grid collapses to a single column below the sm breakpoint", async ({
    page,
  }) => {
    // Gallery grid also switches to 2 columns at `sm` (640px).
    test.skip((page.viewportSize()?.width ?? 0) >= 640, "requires a sub-640px viewport");
    await page.goto("/galleries/");
    const thumbnails = page.locator("main button").filter({ has: page.locator("img") });
    const count = await thumbnails.count();
    expect(count).toBeGreaterThan(1);
    const first = await thumbnails.nth(0).boundingBox();
    const second = await thumbnails.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(second!.y).toBeGreaterThan(first!.y);
  });

  test("text remains legible width (no unreadable overflow) on service pages", async ({
    page,
  }) => {
    await page.goto("/landscape-architecture/");
    const viewportWidth = page.viewportSize()?.width ?? 0;
    const bodyText = page.locator("p").first();
    const box = await bodyText.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(viewportWidth);
  });
});

test.describe("Images load correctly", () => {
  test("home page images have non-zero natural dimensions", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 6); i++) {
      const img = images.nth(i);
      // Most images below the fold use native lazy-loading, so scroll each
      // one into view before checking that it actually decoded.
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      await expect
        .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth), {
          message: `image ${i} failed to load`,
        })
        .toBeGreaterThan(0);
    }
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/galleries/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt, `image ${i} missing alt text`).not.toBeNull();
    }
  });
});
