import { test, expect, type Page } from "@playwright/test";
import { CryptoDetails } from "../domains/crypto/types/crypto.types";

let cryptosData: CryptoDetails[] = [];

test.beforeAll(async ({ request }) => {
  const response = await request.get("http://localhost:8080/api/coins");
  cryptosData = await response.json();
});

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test.describe("page tab tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Crypto Watchlist/);
  });

  test("page has a favicon", async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute("href", /\/favicon\.ico/);
  });
});

test.describe("page content tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  const getCard = (page: Page, name: string) => {
    const heading = page.getByRole("heading", { name: new RegExp(`^${escapeRegex(name)}$`, "i") });
    return page.locator("article").filter({ has: heading }).first();
  };

  test("has h1 heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Crypto Watchlist" })).toBeVisible();
  });

  test("search input updates value on typing", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or ticker...");
    await searchInput.fill("Bitcoin");
    await expect(searchInput).toHaveValue("Bitcoin");
  });

  test("favorites toggle button toggles state", async ({ page }) => {
    const favToggle = page.locator("button").filter({ hasText: /Show Favorites|Show All/i }).first();
    await expect(favToggle).toHaveText(/Show Favorites/i);
    await favToggle.click();
    await expect(favToggle).toHaveText(/Show All/i);
    await favToggle.click();
    await expect(favToggle).toHaveText(/Show Favorites/i);
  });

  test("renders all crypto card headings", async ({ page }) => {
    for (const crypto of cryptosData) {
      await expect(
        page.getByRole("heading", { name: new RegExp(`^${escapeRegex(crypto.name)}$`, "i") })
      ).toBeVisible();
    }
  });

  test("each crypto card has USD price, details link, and favorite button", async ({ page }) => {
    for (const crypto of cryptosData) {
      const card = getCard(page, crypto.name);

      await expect(card).toContainText("USD");
      await expect(card).toContainText(/\$/);

      await expect(card.getByRole("link", { name: "View Details" })).toBeVisible();
      await expect(card.getByRole("button", { name: /Add to favorites|Remove from favorites/i })).toBeVisible();
    }
  });

  test("view details link navigates correctly for each crypto", async ({ page }) => {
    for (const crypto of cryptosData) {
      const card = getCard(page, crypto.name);

      await card.getByRole("link", { name: "View Details" }).click();
      await expect(page).toHaveURL(`http://localhost:3000/${crypto.ticker.toLowerCase()}`);
      await page.goBack();
      await expect(page).toHaveURL("http://localhost:3000/");
    }
  });
});

test.describe("navbar tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test('has "home" page link', async ({ page }) => {
    await expect(page.getByRole("link", { name: "Crypto Watchlist" })).toBeVisible();
  });

  test("home page link navigates to home page", async ({ page }) => {
    await page.getByRole("link", { name: "Crypto Watchlist" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});