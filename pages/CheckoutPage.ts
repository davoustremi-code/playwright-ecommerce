import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly ShippingFirstNameImput: Locator;
  readonly ShippingLastNameImput: Locator;
  readonly ShippingMailImput: Locator;
  readonly ShippingPhoneImput: Locator;
  readonly ShippingAddressImput: Locator;
  readonly ShippingCityImput: Locator;
  readonly ShippingPostaleCodeImput: Locator;
  readonly ShippingSubmitButton: Locator;
  readonly PaymentCardNumberInput: Locator;
  readonly PaymentCardNameInput: Locator;
  readonly PaymentExpirationDateInput: Locator;
  readonly PaymentCvvInput: Locator;
  readonly PaymentSubmitButton: Locator;

  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.ShippingFirstNameImput = page.getByTestId('shipping-firstname-input');
    this.ShippingLastNameImput = page.getByTestId('shipping-lastname-input');
    this.ShippingMailImput = page.getByTestId('shipping-email-input');
    this.ShippingPhoneImput = page.getByTestId('shipping-phone-input');
    this.ShippingAddressImput = page.getByTestId('shipping-address-input');
    this.ShippingCityImput = page.getByTestId('shipping-city-input');
    this.ShippingPostaleCodeImput = page.getByTestId('shipping-postalcode-input');
    this.ShippingSubmitButton = page.getByTestId('shipping-submit-button');
    this.PaymentCardNumberInput = page.getByTestId('payment-cardnumber-input');
    this.PaymentCardNameInput = page.getByTestId('payment-cardname-input');
    this.PaymentExpirationDateInput = page.getByTestId('payment-expiry-input');
    this.PaymentCvvInput = page.getByTestId('payment-cvv-input');
    this.PaymentSubmitButton = page.getByTestId('payment-submit-button');
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto(process.env.URL!);
  
  }
  async fillFirstName(firstName: string) {
    await this.ShippingFirstNameImput.fill(firstName);
  }
  async fillLastName(lastName: string) {
    await this.ShippingLastNameImput.fill(lastName);
  }
  async fillMail(mail: string) {
    await this.ShippingMailImput.fill(mail);
  }
  async fillPhone(phone: string) {
    await this.ShippingPhoneImput.fill(phone);
  }
  async fillAddress(address: string) {
    await this.ShippingAddressImput.fill(address);
  }
  async fillCity(city: string) {
    await this.ShippingCityImput.fill(city);
  }
  async fillPostaleCode(postaleCode: string) {
    await this.ShippingPostaleCodeImput.fill(postaleCode);
  }
  async placeOrder() {
    await this.ShippingSubmitButton.click();
  }

  async fillPaymentCardNumber(cardNumber: string) {
    await this.PaymentCardNumberInput.fill(cardNumber);
  }
  async fillPaymentCardName(cardName: string) {
    await this.PaymentCardNameInput.fill(cardName);
  }

  async fillPaymentExpirationDate(expirationDate: string) {
    await this.PaymentExpirationDateInput.fill(expirationDate);
  }

  async fillPaymentCvc(cvc: string) {
    await this.PaymentCvvInput.fill(cvc);
  }
  async submitPayment() {
    await this.PaymentSubmitButton.click();
  }
}