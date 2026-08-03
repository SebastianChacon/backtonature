import { test, expect, type Page } from "@playwright/test";

async function isDesktopNav(page: Page) {
  const viewport = page.viewportSize();
  return (viewport?.width ?? 0) >= 1024; // Tailwind `lg` breakpoint.
}

test.describe("Desktop navigation", () => {
  test("primary nav links navigate to the right pages", async ({ page }) => {
    test.skip(!(await isDesktopNav(page)), "desktop-only nav");
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav).toBeVisible();

    await nav.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/case-study\/?$/);

    await page.goto("/");
    await nav.getByRole("link", { name: "How We Work", exact: true }).click();
    await expect(page).toHaveURL(/\/how-we-work\/?$/);
  });

  test("What We Do dropdown opens on click and links to service pages", async ({
    page,
  }) => {
    test.skip(!(await isDesktopNav(page)), "desktop-only nav");
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /what we do/i });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const panel = page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Landscape Architecture", exact: true });
    await expect(panel).toBeVisible();
    await panel.click();
    await expect(page).toHaveURL(/\/landscape-architecture\/?$/);
  });

  test("dropdown closes with Escape and returns focus", async ({ page }) => {
    test.skip(!(await isDesktopNav(page)), "desktop-only nav");
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /what we do/i });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("dropdown closes on outside click", async ({ page }) => {
    test.skip(!(await isDesktopNav(page)), "desktop-only nav");
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /what we do/i });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.mouse.click(20, 400);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("active page is marked with aria-current", async ({ page }) => {
    test.skip(!(await isDesktopNav(page)), "desktop-only nav");
    await page.goto("/how-we-work/");
    const activeLink = page.getByRole("navigation", { name: "Main" }).getByRole("link", {
      name: "How We Work",
    });
    await expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  test("Contact button in header works", async ({ page }) => {
    test.skip(!(await isDesktopNav(page)), "desktop-only nav");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });
});

test.describe("Mobile navigation", () => {
  test("menu button opens the mobile drawer", async ({ page }) => {
    test.skip(await isDesktopNav(page), "mobile-only nav");
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Menu" });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  });

  test("mobile menu lists every primary nav item and the phone number", async ({
    page,
  }) => {
    test.skip(await isDesktopNav(page), "mobile-only nav");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    for (const label of ["Work", "What We Do", "How We Work", "Galleries", "About", "Ethos", "Contact"]) {
      await expect(mobileNav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu.getByRole("link", { name: /908.*350.*7506/ })).toBeVisible();
  });

  test("closes with the close button and returns focus to the toggle", async ({
    page,
  }) => {
    test.skip(await isDesktopNav(page), "mobile-only nav");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("closes with Escape key", async ({ page }) => {
    test.skip(await isDesktopNav(page), "mobile-only nav");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });

  test("body scroll is locked while menu is open", async ({ page }) => {
    test.skip(await isDesktopNav(page), "mobile-only nav");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");
  });

  test("navigating from the mobile menu closes it", async ({ page }) => {
    test.skip(await isDesktopNav(page), "mobile-only nav");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });
});

test.describe("Footer", () => {
  test("footer links point to the right routes", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy/",
    );
    await expect(footer.getByRole("link", { name: "Accessibility" })).toHaveAttribute(
      "href",
      "/accessibility-statement/",
    );
  });
});
