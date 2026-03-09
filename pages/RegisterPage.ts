import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  // locator, elements
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly phoneInput: Locator;
  readonly birthdayInput: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly agreeTermCheckBox: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly errorMessage: Locator;
  readonly nameErrorMessage: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly confirmPasswordErrorMessage: Locator;
  readonly phoneErrorMessage: Locator;
  readonly birthdayErrorMessage: Locator;
  readonly termsErrorMessage: Locator;
  readonly termsOfServiceLink: Locator;

  readonly url = "https://demo4.cybersoft.edu.vn/register";

  constructor(page: Page) {
    this.page = page;

    //tim cac locator, element
    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.confirmPasswordInput = page.locator("#passwordConfirm");
    this.phoneInput = page.locator("#phone");
    this.birthdayInput = page.locator("#birthday");
    this.maleRadio = page.locator("#male");
    this.femaleRadio = page.locator("#female");
    this.agreeTermCheckBox = page.locator("#agree-term");
    this.submitButton = page.locator("button.btn_register");
    this.loginLink = page.getByRole("link", { name: "I am already member" });
    this.errorMessage = page.getByText(/Email.*tồn tại/i);
    this.nameErrorMessage = page
      .locator("#name")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.emailErrorMessage = page
      .locator("#email")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.passwordErrorMessage = page
      .locator("#password")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.confirmPasswordErrorMessage = page
      .locator("#passwordConfirm")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.phoneErrorMessage = page
      .locator("#phone")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.birthdayErrorMessage = page
      .locator("#birthday")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.termsErrorMessage = page
      .locator("#agree-term")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.termsOfServiceLink = page.locator("a.term-service");
  }

  // Mo trang web
  async goto(): Promise<void> {
    await this.page.goto(this.url, { timeout: 60000 });
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name, { timeout: 30000 });
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email, { timeout: 30000 });
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password, { timeout: 30000 });
  }

  async fillPasswordConfirm(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password, { timeout: 30000 });
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone, { timeout: 30000 });
  }

  async fillBirthday(birthday: string): Promise<void> {
    await this.birthdayInput.fill(birthday, { timeout: 30000 });
  }

  async selectMaleGender(): Promise<void> {
    await this.maleRadio.check({ timeout: 30000 });
  }

  async selectFemaleGender(): Promise<void> {
    await this.femaleRadio.check({ timeout: 30000 });
  }

  async agreeTerms(): Promise<void> {
    await this.agreeTermCheckBox.check({ timeout: 30000 });
  }

  async submit(): Promise<void> {
    await this.submitButton.click({ timeout: 30000 });
  }

  async link(): Promise<void> {
    await this.loginLink.click({ timeout: 30000 });
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phone: string;
    birthday: string;
    gender: "male" | "female";
  }): Promise<void> {
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.fillPasswordConfirm(data.passwordConfirm);
    await this.fillPhone(data.phone);
    await this.fillBirthday(data.birthday);

    if (data.gender === "male") {
      await this.selectMaleGender();
    } else {
      await this.selectFemaleGender();
    }

    await this.agreeTerms();

    await this.submit();
  }

  async isSuccessRegister(): Promise<boolean> {
    //register thanh cong se chuyen sang trang login
    console.log("isSuccess: ", this.page.url());
    return this.page.url() !== this.url;
  }

  async isFailRegister() {
    await expect(this.page).toHaveURL(/register/);
    await expect(this.errorMessage).toBeVisible();
  }
}
