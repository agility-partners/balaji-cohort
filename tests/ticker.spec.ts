import { test, expect } from '@playwright/test';
import { CryptoDetails } from '../domains/crypto/types/crypto.types';

let cryptosData: CryptoDetails[] = [];

test.beforeAll(async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/coins');
  cryptosData = await response.json();
});

test.describe('Crypto Ticker Details Page', () => {
  test('shows crypto details for all tickers from API', async ({ page }) => {
    expect(cryptosData.length).toBeGreaterThan(0);

    for (const crypto of cryptosData) {
      await test.step(`details page for ${crypto.name} (${crypto.ticker})`, async () => {
        await page.goto(`http://localhost:3000/${crypto.ticker.toLowerCase()}`);

        await expect(
          page.getByRole('heading', {
            name: new RegExp(`Crypto Details for:\\s*${crypto.ticker}`, 'i'),
          })
        ).toBeVisible();

        await expect(
          page.getByRole('heading', {
            name: new RegExp(`${crypto.name}\\s*\\(${crypto.ticker}\\)`, 'i'),
          })
        ).toBeVisible();

        await expect(page.getByText(/Price:/i)).toBeVisible();
        await expect(page.getByText(/Market Cap:/i)).toBeVisible();
        await expect(page.getByText(/24h Volume:/i)).toBeVisible();
        await expect(page.getByText(/24h Change:/i)).toBeVisible();
      });
    }
  });

  test('shows "Failed to load coin data" for invalid ticker', async ({ page }) => {
    await page.goto('http://localhost:3000/invalidticker');
    await expect(page.getByText(/Failed to load coin data/i)).toBeVisible();
  });
});