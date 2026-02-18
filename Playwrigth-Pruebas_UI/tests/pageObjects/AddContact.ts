import { Locator, Page } from "@playwright/test";

export class AddContactPage {

  private readonly addContactButton: Locator;
  private readonly firstNameTextBox: Locator;
  private readonly lastNameTextBox: Locator;
  private readonly birthdateTextBox: Locator;
  private readonly phoneTextBox: Locator;
  private readonly street1TextBox: Locator;
  private readonly street2TextBox: Locator;
  private readonly cityTextBox: Locator;
  private readonly stateProvinceTextBox: Locator;
  private readonly countryTextBox: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.addContactButton = page.locator("#add-contact");
    this.firstNameTextBox = page.locator("#firstName");
    this.lastNameTextBox = page.locator("#lastName");
    this.birthdateTextBox = page.locator("#birthdate");
    this.phoneTextBox = page.locator("#phone");
    this.street1TextBox = page.locator("#street1");
    this.street2TextBox = page.locator("#street2");
    this.cityTextBox = page.locator("#city");
    this.stateProvinceTextBox = page.locator("#stateProvince");
    this.countryTextBox = page.locator("#country");
    this.submitButton = page.locator("#submit");
  }

  async createContact(
    firstName: string,
    lastName: string,
    birthdate: string,   // yyyy-MM-dd
    phone: string,
    street1: string,
    street2: string,
    city: string,
    stateProvince: string,
    country: string
  ) {
    await this.addContactButton.click();
    await this.firstNameTextBox.fill(firstName);
    await this.lastNameTextBox.fill(lastName);
    await this.birthdateTextBox.fill(birthdate);
    await this.phoneTextBox.fill(phone);
    await this.street1TextBox.fill(street1);
    await this.street2TextBox.fill(street2);
    await this.cityTextBox.fill(city);
    await this.stateProvinceTextBox.fill(stateProvince);
    await this.countryTextBox.fill(country);
    await this.submitButton.click();
  }
}