import { test, expect } from '@playwright/test';

test.describe('Первые тесты', () => {
  test('Открытие Goggle flight', async ({ page }) => {
    await page.goto('https://www.google.com/travel/flights?ucbcb=1');
    await expect(page.getByText('Flights', { exact: true }).nth(2)).toBeVisible();
    await expect(page.locator('body')).toContainText('Flights');
  });

  test('Изменение темы dark/light', async ({ page }) => {
    await page.goto('https://www.google.com/travel/flights?ucbcb=1');

    await page.getByRole('button', { name: 'Change appearance' }).click();
    await page.getByRole('menuitemradio', { name: 'Dark theme' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Change appearance' }).click();
    await page.getByRole('menuitemradio', { name: 'Light theme' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
  });
});
