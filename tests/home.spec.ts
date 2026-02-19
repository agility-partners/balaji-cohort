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

  for (const crypto of cryptosData) {
    test(`has ${crypto.name} card`, async ({ page }) => {  
      await expect(page.getByRole('heading', { name: `${crypto.name} (${crypto.ticker})` })).toBeVisible();
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