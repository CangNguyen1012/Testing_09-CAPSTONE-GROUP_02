import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly logoutButton: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly loginFailMessage: Locator;

  readonly url = "https://demo4.cybersoft.edu.vn/login";

  constructor(page: Page) {
    this.page = page;

    // Define locators
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("button[type='submit']");
    this.registerLink = page.getByRole("link", { name: "Register now ?" });
    this.logoutButton = page.getByRole("button", { name: "Logout" });
    this.emailErrorMessage = page
      .locator("#email")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.passwordErrorMessage = page
      .locator("#password")
      .locator('xpath=following::div[contains(@class,"text-danger")]')
      .first();
    this.loginFailMessage = page.locator(".ant-message-error");
  }

  // Open login page
  async goto(): Promise<void> {
    await this.page.goto(this.url, { timeout: 60000 });
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email, { timeout: 30000 });
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password, { timeout: 30000 });
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click({ timeout: 30000 });
  }

  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click({ timeout: 30000 });
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async isLoginSuccess(): Promise<boolean> {
    // Sau khi login thành công sẽ chuyển về trang profile
    console.log("isSuccess: ", this.page.url());
    await this.page.waitForURL(/profile/, { timeout: 10000 });
    return this.page.url() !== this.url;
  }

  async isLoginFail(): Promise<boolean> {
    // Sau khi login không thành công sẽ vẫn ở lại trang login
    console.log("errormessage: ", this.page.url());
    await this.page.waitForURL(/login/, { timeout: 10000 });
    return this.page.url() !== this.url;
  }

  async logout() {
    await this.logoutButton.click();
  }

  // Logout thành công
  async isLogoutSuccess() {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.loginButton).toBeVisible();
  }

  //Kiểm tra thông báo lỗi hiển thị đúng khi để trống Your Email
  async submit() {
    await this.loginButton.click();
  }

  async getEmailError() {
    await expect(this.emailErrorMessage).toBeVisible();
    return await this.emailErrorMessage.textContent();
  }

  async getPasswordError() {
    await expect(this.passwordErrorMessage).toBeVisible();
    return await this.passwordErrorMessage.textContent();
  }

  async getLoginFailMessage() {
    await expect(this.loginFailMessage).toBeVisible();
    return await this.loginFailMessage.textContent();
  }
}
