import { Page, Locator } from '@playwright/test';

export class HomePage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  
  

  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
 
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto(process.env.URL!);
  
  }

}