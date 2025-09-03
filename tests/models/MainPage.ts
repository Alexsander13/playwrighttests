import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: String;
  text: String;
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
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
  }

  async openMainPage() {
    await this.page.goto('https://www.google.com/travel/flights?ucbcb=1');
  }

  async checkElementsVisability() {
    this.elements.forEach(({ locator, name }) => {
      test.step(`Check visibility ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    });
  }

  async checkElementsName() {
    this.elements.forEach(({ locator, name, text }) => {
      test.step(`Check name ${name}`, async () => {
        await expect(locator(this.page)).toContainText(`${text}`);
      });
    });
  }
}
