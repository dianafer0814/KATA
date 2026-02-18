import { Locator, Page } from "@playwright/test";

export class RegisterPage {

    private readonly signupButton: Locator;
    private readonly firstnameTextbox: Locator;
    private readonly lastnameTextBox: Locator;
    private readonly emailTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page){
        this.signupButton= page.locator('#signup');
        this.firstnameTextbox= page.locator("#firstName");
        this.lastnameTextBox= page.locator("#lastName");
        this.emailTextbox= page.locator("#email");
        this.passwordTextbox= page.locator("#password");
        this.submitButton=page.locator("#submit")

    }
 
    async registerUserPage(firstName: string, lastName: string, email: string, password: string) {

        await this.signupButton.click();
        await this.firstnameTextbox.fill(firstName);
        await this.lastnameTextBox.fill(lastName);
        await this.emailTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.submitButton.click()


    }



    




}