import { test, expect, devices } from "@playwright/test";

const { defaultBrowserType: _defaultBrowserType, ...pixel7 } = devices["Pixel 7"];

test.describe("Desktop header", () => {
  test.skip(
    ({ isMobile }) => isMobile,
    "desktop nav is hidden below the lg breakpoint",
  );

  test("opens and closes the 'What We Do' submenu", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "What We Do" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator("#sub--what-we-do");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("link", { name: "All services" })).toBeVisible();
    await expect(
      panel.getByRole("link", { name: "Landscape Architecture" }),
    ).toBeVisible();

    // Clicking outside closes it.
    await page.mouse.click(20, 400);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
  });

  test("Escape closes the open submenu", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "What We Do" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Mobile header", () => {
  test.use({ ...pixel7 });

  test("Menu button opens the full-screen mobile nav", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    await expect(menuButton).toBeVisible();

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeHidden();

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Contact" })).toBeVisible();

    // body scroll is locked while the menu is open
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  });

  test("Escape closes the mobile menu and returns focus to the toggle", async ({
    page,
  }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    await menuButton.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test("close (x) button closes the mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(mobileMenu).toBeHidden();
  });

  test("navigating via the mobile menu closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const mobileMenu = page.locator("#mobile-menu");
    await mobileMenu.getByRole("link", { name: "About", exact: true }).click();

    await expect(page).toHaveURL(/\/about/);
    await expect(mobileMenu).toBeHidden();
  });
});
