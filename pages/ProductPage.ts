import { Page, Locator } from '@playwright/test';

export class ProductPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly CartCount: Locator;
  readonly cartLink: Locator;
  readonly productTitle: Locator;
  readonly priceProduct: Locator;


  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Ajouter au panier' });
    this.CartCount = page.getByTestId('cart-count');
    this.cartLink = page.getByTestId('cart-button');
    this.productTitle = page.getByRole('heading', { name: 'Clavier Mécanique RGB' });
    this.priceProduct = page.locator('span.text-4xl.font-bold');
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto(process.env.URL!);
  }
  async chooseProduct() {
    await this.addToCartButton.click();
  }

  async viewCart() {
    await this.cartLink.click();
  }

}