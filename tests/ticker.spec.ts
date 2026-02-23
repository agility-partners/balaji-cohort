import { cryptosData } from '@/domains/crypto/mock/cryptos.mock';
import { test, expect } from '@playwright/test';

test.describe(`Crypto Ticker Details Page`, () => {
    for (const crypto of cryptosData) {
        test(`shows crypto details for ${crypto.name}`, async ({ page }) => {
            await page.goto(`http://localhost:3000/${crypto.ticker}`);
            await expect(page.getByRole('heading', { name: new RegExp(`Crypto Details for: ${crypto.ticker}`, 'i') })).toBeVisible();
            await expect(page.getByText(new RegExp(`${crypto.name} \\(${crypto.ticker}\\)`))).toBeVisible();
            await expect(page.getByText(/Price:/)).toBeVisible();
            await expect(page.getByText(/Market Cap:/)).toBeVisible();
            await expect(page.getByText(/24h Volume:/)).toBeVisible();
            await expect(page.getByText(/24h Change:/)).toBeVisible();
        });
    }

    test(`shows "Crypto not found" for invalid ticker`, async ({ page }) => {
        await page.goto('http://localhost:3000/invalidticker');
        await expect(page.getByText(/Failed to load coin data/i)).toBeVisible();
    });
});