import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly headerLogo: Locator;
  readonly NavLinkHome: Locator;
  readonly productLink: Locator;
  readonly navLinkAbout: Locator;
  readonly navLinkContact: Locator;
  readonly searchButton: Locator;
  readonly cartLink: Locator;
  readonly profileLink: Locator;
  


  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.headerLogo = page.getByTestId('header-logo');
    this.NavLinkHome = page.getByTestId('nav-link-home');
    this.productLink = page.getByTestId('nav-link-products');
    this.navLinkAbout = page.getByTestId('nav-link-about');
    this.navLinkContact = page.getByTestId('nav-link-contact');
    this.searchButton = page.getByTestId('search-button');
    this.cartLink = page.getByTestId('cart-button');
    this.profileLink = page.getByTestId('login-button');
    
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
  async search() {
    await this.searchButton.click();
  }
  async goToHome() {
    await this.headerLogo.click();
  }
  async goToNavLinkHome() {
    await this.NavLinkHome.click();
  }
  async goToNavLinkAbout() {
    await this.navLinkAbout.click();
  }
  async goToNavLinkContact() {
    await this.navLinkContact.click();
  }
}

