import { cryptosData } from '@/domains/crypto/mock/cryptos.mock';
import { test, expect } from '@playwright/test';

test.describe(`page tab tests`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });
  
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Crypto Watchlist/);
  });

  test(`page has a favicon`, async ({ page }) => {
    const favicon = await page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', /\/favicon\.ico/);
  });
});

test.describe('page content tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('has h1 heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Crypto Watchlist' })).toBeVisible();
  }); 

  test('search input updates value on typing', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search by name or ticker...');
    await searchInput.fill('Bitcoin');
    await expect(searchInput).toHaveValue('Bitcoin');
  });

  test('favorites toggle button toggles state', async ({ page }) => {
    const favToggle = page.locator('button').filter({ hasText: /Show Favorites|Show All/i }).first();
    await expect(favToggle).toHaveText(/Show Favorites/i);
    await favToggle.click();
    await expect(favToggle).toHaveText(/Show All/i);
    await favToggle.click();
    await expect(favToggle).toHaveText(/Show Favorites/i);
  });

  for (const crypto of cryptosData) {
    test(`has ${crypto.name} card`, async ({ page }) => {  
      await expect(page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` })).toBeVisible();
    }); 

    test(`has price for ${crypto.name} card`, async ({ page }) => {
      const heading = page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` });
      const card = heading.locator('xpath=..'); // finds parent card div of this heading
      await expect(card.getByText(new RegExp(`^Current Price:\\s*\\$${crypto.price}$`, 'i'))).toBeVisible();
    });

    test(`has "View Details" link for ${crypto.name} card`, async ({ page }) => {
      const heading = page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` });
      const card = heading.locator('xpath=..');
      await expect(card.getByRole('link', { name: 'View Details' })).toBeVisible();
    });

    test(`"View Details" link for ${crypto.name} card navigates to details page`, async ({ page }) => {
      const heading = page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` });
      const card = heading.locator('xpath=..');
      await card.getByRole('link', { name: 'View Details' }).click();
      await expect(page).toHaveURL(`http://localhost:3000/${crypto.ticker.toLowerCase()}`);
    });

    test(`has favorite button for ${crypto.name} card`, async ({ page }) => {
      const heading = page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` });
      const card = heading.locator('xpath=..');
      await expect(card.getByRole('button', { name: /Add to favorites|Remove from favorites/i })).toBeVisible();
    });

    test(`favorite button for ${crypto.name} card toggles favorite state`, async ({ page }) => {
      const heading = page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` });
      const card = heading.locator('xpath=..');
      const favButton = card.getByRole('button', { name: /Add to favorites|Remove from favorites/i });

      // Initially should be "Add to favorites"
      await expect(favButton).toHaveAttribute('aria-label', 'Add to favorites');
      
      // Click to add to favorites
      await favButton.click();
      await expect(favButton).toHaveAttribute('aria-label', 'Remove from favorites');
      
      // Click again to remove from favorites
      await favButton.click();
      await expect(favButton).toHaveAttribute('aria-label', 'Add to favorites');
     });
  }
});

test.describe('navbar tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('has "home" page link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Crypto Watchlist' })).toBeVisible();
  });

  test('home page link navigates to home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Crypto Watchlist' }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});