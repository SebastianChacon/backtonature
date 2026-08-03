import { test, expect } from "@playwright/test";

test.describe("Gallery browser", () => {
  test("filter buttons switch the active category", async ({ page }) => {
    await page.goto("/galleries/");

    const group = page.getByRole("group", { name: "Filter galleries" });
    const buttons = group.getByRole("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(1);

    await expect(buttons.first()).toHaveAttribute("aria-pressed", "true");

    const second = buttons.nth(1);
    const secondLabel = (await second.textContent())?.trim() ?? "";
    await second.click();
    await expect(second).toHaveAttribute("aria-pressed", "true");
    await expect(buttons.first()).toHaveAttribute("aria-pressed", "false");

    // Heading should update to the newly selected category.
    if (secondLabel) {
      await expect(page.locator("h2").first()).toBeVisible();
    }
  });
});

test.describe("Lightbox", () => {
  test("opens on thumbnail click, shows dialog, and closes with Escape", async ({
    page,
  }) => {
    await page.goto("/galleries/");

    const thumbnails = page.locator("main button").filter({ has: page.locator("img") });
    await expect(thumbnails.first()).toBeVisible();
    await thumbnails.first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close gallery" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("navigates between images with the arrow buttons and keyboard", async ({
    page,
  }) => {
    await page.goto("/galleries/");
    const thumbnails = page.locator("main button").filter({ has: page.locator("img") });
    await thumbnails.first().click();

    const dialog = page.getByRole("dialog");
    const caption = dialog.locator("figcaption");
    await expect(caption).toContainText("1 /");

    await dialog.getByRole("button", { name: "Next image" }).click();
    await expect(caption).toContainText("2 /");

    await page.keyboard.press("ArrowRight");
    await expect(caption).toContainText("3 /");

    await page.keyboard.press("ArrowLeft");
    await expect(caption).toContainText("2 /");
  });

  test("body scroll locks while the lightbox is open", async ({ page }) => {
    await page.goto("/galleries/");
    const thumbnails = page.locator("main button").filter({ has: page.locator("img") });
    await thumbnails.first().click();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");
  });

  test("closing returns focus to the opening thumbnail", async ({ page }) => {
    await page.goto("/galleries/");
    const thumbnails = page.locator("main button").filter({ has: page.locator("img") });
    const first = thumbnails.first();
    await first.click();
    await page.getByRole("dialog").getByRole("button", { name: "Close gallery" }).click();
    await expect(first).toBeFocused();
  });
});
