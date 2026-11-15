import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly cartLink: Locator;
  readonly profileLink: Locator;
  readonly productLink: Locator;


  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.profileLink = page.getByTestId('login-button');
    this.productLink = page.getByTestId('nav-link-products');
    this.cartLink = page.getByTestId('cart-button');

  }

  async profile() {
    await this.profileLink.click();
  }
  async goToProducts() {
    await this.productLink.click();
  }
  async goToCart() {
    await this.cartLink.click();
  }
}

