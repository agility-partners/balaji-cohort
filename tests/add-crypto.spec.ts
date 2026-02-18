import { test, expect } from '@playwright/test';

test.describe('"Add Crypto" page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/add-crypto-form');
    });

    test('has heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Add New Crypto' })).toBeVisible();
    });

    test('has input field for crypto ticker', async ({ page }) => {
        const input = page.getByPlaceholder('Enter Crypto Ticker (e.g. BTC)');
        await expect(input).toBeVisible();
    });

    test('has submit button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'Add crypto to watchlist' });
        await expect(button).toBeVisible();
    });
    
    test('submitting form shows alert with submitted ticker', async ({ page }) => {
        const input = page.getByPlaceholder('Enter Crypto Ticker (e.g. BTC)');
        const button = page.getByRole('button', { name: 'Add crypto to watchlist' });
        await input.fill('TEST');
        page.on('dialog', dialog => {
            expect(dialog.message()).toBe('Submitted: TEST');
            dialog.accept();
        });
        await button.click();
    });
});
