import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

const lightMode = ['light', 'dark'];

test.describe('Первые тесты', () => {
  //  test.beforeEach(async ({ page }) => {
  //await page.goto('https://www.google.com/travel/flights?ucbcb=1');
  //});

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

  test('Проверка отображения элементов навигации', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsVisability();
  });

  test('Проверка отображения элементов по названию', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsName();
  });

  lightMode.forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('body')?.setAttribute('data-theme', value);
      }, value);
      await expect(
        page
          .getByLabel('Flight', { exact: true })
          .locator('div')
          .filter({
            hasText:
              'Round tripRound tripOne wayMulti-city1AdultsRemove adult1Add adultChildren Aged',
          })
          .first(),
      ).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
