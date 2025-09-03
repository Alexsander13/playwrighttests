import { test, expect } from '@playwright/test';

test.describe('Первые тесты', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com/travel/flights?ucbcb=1');
  });

  test('Открытие Goggle flight', async ({ page }) => {
    //await page.goto('https://www.google.com/travel/flights?ucbcb=1');
    await expect(page.getByText('Flights', { exact: true }).nth(2)).toBeVisible();
    await expect(page.locator('body')).toContainText('Flights');
  });

  test('Изменение темы dark/light', async ({ page }) => {
    // await page.goto('https://www.google.com/travel/flights?ucbcb=1');

    await page.getByRole('button', { name: 'Change appearance' }).click();
    await page.getByRole('menuitemradio', { name: 'Dark theme' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Change appearance' }).click();
    await page.getByRole('menuitemradio', { name: 'Light theme' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
  });

  test('Проверка наличия ссылок на сервисы', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Travel', exact: true })).toBeVisible();
    await expect(page.locator('[id="12"]')).toContainText('Travel');
    await expect(page.getByRole('link', { name: 'Explore' })).toBeVisible();
    await expect(page.locator('[id="18"]')).toContainText('Explore');
    await expect(page.getByRole('link', { name: 'Flights', exact: true })).toBeVisible();
    await expect(page.locator('[id="7"]')).toContainText('Flights');
    await expect(page.getByRole('link', { name: 'Hotels' })).toBeVisible();
    await expect(page.locator('[id="8"]')).toContainText('Hotels');
    await expect(page.getByRole('link', { name: 'Vacation rentals' })).toBeVisible();
    await expect(page.locator('[id="14"]')).toContainText('Vacation rentals');
  });
});
