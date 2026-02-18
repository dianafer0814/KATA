import { Locator, Page } from '@playwright/test';

export class LoginPage {

  private readonly emailTextBox: Locator;
  private readonly passwordTextBox: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.emailTextBox = page.locator('#email');
    this.passwordTextBox = page.locator('#password');
    this.submitButton = page.locator('#submit');
  }

  async login(email: string, password: string) {
  await this.emailTextBox.fill(email);
  await this.passwordTextBox.fill(password);
  await this.submitButton.click();
}

}