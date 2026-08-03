import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact/");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
    await expect(page.getByText("Please enter your first name.")).toBeVisible();
    await expect(page.getByText("Please enter your last name.")).toBeVisible();
  });

  test("rejects an invalid email", async ({ page }) => {
    await page.getByLabel("First name").fill("Jamie");
    await page.getByLabel("Last name").fill("Rivera");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Phone").fill("9083334444");
    await page.getByLabel("Property location").fill("Basking Ridge, NJ");
    await page.getByLabel("Property size").selectOption("Under 1 acre");
    await page.getByLabel("Project type").selectOption("Not sure yet");
    await page.getByLabel("Approximate budget").selectOption("Prefer not to say");
    await page.getByLabel("Message").fill("We would like a consultation.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("honeypot field is hidden from sighted users and out of tab order", async ({
    page,
  }) => {
    const honeypot = page.locator("#website");
    // Positioned off-screen (not display:none) so it still fools naive bots,
    // but it must never be reachable by keyboard or visible in the viewport.
    await expect(honeypot).not.toBeInViewport();
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    const wrapper = page.locator("div[aria-hidden='true']").filter({ has: honeypot });
    await expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  test("submits successfully with valid data", async ({ page }) => {
    await page.getByLabel("First name").fill("Jamie");
    await page.getByLabel("Last name").fill("Rivera");
    await page.getByLabel("Email").fill("jamie.rivera@example.com");
    await page.getByLabel("Phone").fill("9083334444");
    await page.getByLabel("Property location").fill("Basking Ridge, NJ");
    await page.getByLabel("Property size").selectOption("1–3 acres");
    await page.getByLabel("Project type").selectOption("New design / build");
    await page.getByLabel("Approximate budget").selectOption("$100k – $250k");
    await page
      .getByLabel("Message")
      .fill("We'd like to redesign the back garden and add a small orchard.");

    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByRole("status")).toContainText("Message received");
  });

  test("field-level errors clear once corrected on resubmit", async ({ page }) => {
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText("Please enter your first name.")).toBeVisible();

    await page.getByLabel("First name").fill("Jamie");
    await page.getByLabel("Last name").fill("Rivera");
    await page.getByLabel("Email").fill("jamie.rivera@example.com");
    await page.getByLabel("Phone").fill("9083334444");
    await page.getByLabel("Property location").fill("Basking Ridge, NJ");
    await page.getByLabel("Property size").selectOption("5+ acres");
    await page.getByLabel("Project type").selectOption("Ongoing maintenance");
    await page.getByLabel("Approximate budget").selectOption("Under $50k");
    await page.getByLabel("Message").fill("Ongoing seasonal maintenance please.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Please enter your first name.")).toBeHidden();
    await expect(page.getByRole("status")).toContainText("Message received");
  });
});

test.describe("Subscribe form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/subscribe/");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /subscribe/i }).click();
    await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
  });

  test("submits successfully with valid data", async ({ page }) => {
    await page.getByLabel("Name").fill("Jamie");
    await page.getByLabel("Email").fill("jamie.rivera@example.com");
    await page.getByRole("button", { name: /subscribe/i }).click();
    await expect(page.getByRole("status")).toContainText(/on the list/i);
  });
});
