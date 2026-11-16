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
  readonly footerPresse: Locator;
  readonly footerBlog: Locator;
  readonly footerSupport: Locator;
  readonly footerContact: Locator;
  readonly footerFaq: Locator;
  readonly footerShipping: Locator;
  readonly footerBack: Locator;
  readonly footerLegal: Locator;
  readonly footerCgv: Locator;
  readonly footerConfidentialite: Locator;
  readonly footerCookies: Locator;
  readonly footerMentionLegales: Locator;
  readonly footerContactMail: Locator;
  readonly footerContactPhone: Locator;
  readonly footerCityLocation: Locator;
  readonly footerMentionsDroits: Locator;


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
    this.footerPresse = page.getByRole('link', { name: 'Presse' });
    this.footerBlog = page.getByRole('link', { name: 'Blog' });
  this.footerSupport = page.getByRole('link', { name: 'Support' });
  this.footerContact = page.getByRole('link', { name: 'Contact' });
  this.footerFaq = page.getByRole('link', { name: 'FAQ' });
  this.footerShipping = page.getByRole('link', { name: 'Livraison' });
  this.footerBack = page.getByRole('link', { name: 'Retours' });
  this.footerLegal = page.getByRole('link', { name: 'Légal' });
  this.footerCgv = page.getByRole('link', { name: 'CGV' });
  this.footerConfidentialite = page.getByRole('link', { name: 'Confidentialité' });
  this.footerCookies = page.getByRole('link', { name: 'Cookies' });
  this.footerMentionLegales = page.getByRole('link', { name: 'Mentions Légales' });
  this.footerContactMail = page.getByRole('link', { name: 'Contact@techub.fr' });
  this.footerContactPhone = page.getByRole('link', { name: '23 45 67 89' });
  this.footerCityLocation = page.getByText('Paris, France');
  this.footerMentionsDroits = page.getByText('© 2026 TechHub. Tous droits réservés.');
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
  async goToFooterPresse() {
    await this.footerPresse.click();
  }
  async goToFooterBlog() {
    await this.footerBlog.click();
  }
  async goToFooterSupport() {
    await this.footerSupport.click();
  }
  async goToFooterContact() {
    await this.footerContact.click();
  }
  async goToFooterFaq() {
    await this.footerFaq.click();
  }
  async goToFooterShipping() {
    await this.footerShipping.click();
  }
  async goToFooterBack() {
    await this.footerBack.click();
  }
  async goToFooterLegal() {
    await this.footerLegal.click();
  }
  async goToFooterCgv() {
    await this.footerCgv.click();
  }
  async goToFooterConfidentialite() {
    await this.footerConfidentialite.click();
  }
  async goToFooterCookies() {
    await this.footerCookies.click();
  
  }
  async goToFooterMentionLegales() {
    await this.footerMentionLegales.click();
  }
  async goToFooterContactMail() {
    await this.footerContactMail.click();
  }
  async goToFooterContactPhone() {
    await this.footerContactPhone.click();
  }
  
}

