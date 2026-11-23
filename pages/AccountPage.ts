import { Page, Locator } from '@playwright/test';

export class AccountPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly profilLink: Locator;
  readonly accountEditButton: Locator;
  readonly accountFullnameInput: Locator;
  readonly accountPhoneInput: Locator;
  readonly accountAddressInput: Locator;
  readonly accountpostalCodeInput: Locator;
  readonly accountSaveButton: Locator;

  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.profilLink = page.getByTestId('account-tab-profile');
    this.accountEditButton = page.getByTestId('account-edit-button');
    this.accountFullnameInput = page.getByTestId('account-fullname-input');
    this.accountPhoneInput = page.getByTestId('account-phone-input');
    this.accountAddressInput = page.getByTestId('account-address-input');
    this.accountpostalCodeInput = page.getByTestId('account-postalcode-input');
    this.accountSaveButton = page.getByTestId('account-save-button');
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto('/account');
  
  }

  async goToProfile() {
    await this.profilLink.click();
  }
  async goToAccountEdit() {
    await this.accountEditButton.click();
  }
  async fillAccountFullname(fullname: string) {
    await this.accountFullnameInput.fill(fullname);
  }
  async fillAccountPhone(phone: string) {
    await this.accountPhoneInput.fill(phone);
  }
  async fillAccountAddress(address: string) {
    await this.accountAddressInput.fill(address);
  }
  async fillAccountPostalCode(postalCode: string) {
    await this.accountpostalCodeInput.fill(postalCode);
  }
  async saveAccount() {
    await this.accountSaveButton.click();
  }

}