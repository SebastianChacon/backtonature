import { test, expect } from "@playwright/test";
import { legacyRedirects } from "./fixtures";

for (const [source, destination] of legacyRedirects) {
  test(`redirects ${source} -> ${destination}`, async ({ page }) => {
    const response = await page.goto(source);
    // Final response after following the redirect chain.
    expect(response?.status()).toBeLessThan(400);
    const url = new URL(page.url());
    expect(url.pathname).toBe(destination);
  });
}

test("legacy redirect issues a 301", async ({ request }) => {
  const response = await request.get("/home/", { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers()["location"]).toContain("/");
});
