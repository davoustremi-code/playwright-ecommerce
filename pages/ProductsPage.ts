import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly productsItem: Locator;


  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.productsItem = page.getByTestId('product-container-4');
    
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto(process.env.URL!);
  }
  async chooseProducts() {
    await this.productsItem.click();
  }

  }
