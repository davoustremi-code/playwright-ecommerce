import { Page, Locator } from '@playwright/test';

export class FooterComponent {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly footerLogo: Locator;
  readonly footerFacebook: Locator;
  readonly footerTwitter: Locator;
  readonly footerInstagram: Locator;
  readonly footerLinkedIn: Locator;
  readonly footerCatalog: Locator;
    readonly footerAccessories: Locator;
    readonly footerHomeConnect: Locator;
    readonly footerGaming: Locator;
    readonly footerOffice: Locator;
  readonly footerEnterprise: Locator;
    readonly footerinfos: Locator;
    readonly footercareers: Locator;
  


  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.footerLogo = page.getByRole('img', { name: 'contentinfo' });
    this.footerFacebook = page.getByRole('link', { name: 'Facebook' });
    this.footerTwitter = page.getByRole('link', { name: 'Twitter' });
    this.footerInstagram = page.getByRole('link', { name: 'Instagram' });
    this.footerLinkedIn = page.getByRole('link', { name: 'LinkedIn' });
    this.footerCatalog = page.getByRole('link', { name: 'Produits' });
    this.footerAccessories = page.getByRole('link', { name: 'Accessoires' });
    this.footerHomeConnect = page.getByRole('link', { name: 'Maison Connectée' });
    this.footerGaming = page.getByRole('link', { name: 'Gaming' });
    this.footerOffice = page.getByRole('link', { name: 'Office' });
    this.footerEnterprise = page.getByRole('link', { name: 'Entreprise' });
    this.footerinfos = page.getByRole('link', { name: 'contentinfo' });
    this.footercareers = page.getByRole('link', { name: 'Carrières' });
  }

  async goToFooterLogo() {
    await this.footerLogo.click();
  }
  async goToFooterFacebook() {
    await this.footerFacebook.click();
  }
  async goToFooterTwitter() {
    await this.footerTwitter.click();
  }
  async goToFooterInstagram() {
    await this.footerInstagram.click();
  }
  async goToFooterLinkedIn() {
    await this.footerLinkedIn.click();
  }
    async goToFooterCatalog() {
    await this.footerCatalog.click();
  }
  async goToFooterAccessories() {
    await this.footerAccessories.click();
  }
  async goToFooterHomeConnect() {
    await this.footerHomeConnect.click();
  }
  async goToFooterGaming() {
    await this.footerGaming.click();
  }
  async goToFooterOffice() {
    await this.footerOffice.click();
  }
  async goToFooterEnterprise() {
    await this.footerEnterprise.click();
  }
  async goToFooterInfos() {
    await this.footerinfos.click();
  }
  async goToFooterCareers() {
    await this.footercareers.click();
  }
}
