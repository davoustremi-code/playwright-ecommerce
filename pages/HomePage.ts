import { Page, Locator } from '@playwright/test';

export class HomePage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly profileLink: Locator;
  readonly productLink: Locator;

  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.profileLink = page.getByTestId('login-button');
    this.productLink = page.getByTestId('nav-link-products');
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto(process.env.URL!);
  }

  async profile() {
    await this.profileLink.click();
  }
  async goToProducts() {
    await this.productLink.click();
  }
}