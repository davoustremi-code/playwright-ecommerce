import { Page, Locator } from '@playwright/test';

export class CartPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly productName: Locator;
  readonly checkoutButton: Locator;
  


  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('a').filter({ hasText: 'Clavier Mécanique RGB' });
    this.checkoutButton = page.getByRole('button', { name: 'Passer au paiement' });
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto(process.env.URL!);

  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

}
