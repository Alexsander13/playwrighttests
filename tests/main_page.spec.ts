import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: String;
  text: String;
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.locator('[id="12"]'),
    name: 'Travel',
    text: 'Travel',
  },
  {
    locator: (page: Page): Locator => page.locator('[id="18"]'),
    name: 'Explore',
    text: 'Explore',
  },
  {
    locator: (page: Page): Locator => page.locator('[id="7"]'),
    name: 'Flights',
    text: 'Flights',
  },
  {
    locator: (page: Page): Locator => page.locator('[id="8"]'),
    name: 'Hotels',
    text: 'Hotels',
  },
  {
    locator: (page: Page): Locator => page.locator('[id="14"]'),
    name: 'Vacation rentals',
    text: 'Vacation rentals',
  },
];

test.describe('Первые тесты', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com/travel/flights?ucbcb=1');
  });

  test('Открытие Goggle flight', async ({ page }) => {
    //await page.goto('https://www.google.com/travel/flights?ucbcb=1');
    await expect(page.getByText('Flights', { exact: true }).nth(2)).toBeVisible();
    test.step('Check to Contain text Flight', async () => {
      await expect(page.locator('body')).toContainText('Flights');
    });
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

  test('Проверка ссылок на сервисы', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      test.step(`Check visibility ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });

      test.step(`Check name ${name}`, async () => {
        await expect(locator(page)).toContainText(`${text}`);
      });
    });
  });
});
