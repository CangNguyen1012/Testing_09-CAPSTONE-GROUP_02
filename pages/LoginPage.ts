import { expect, Locator, Page } from "@playwright/test";
import { Header } from "./components/Header";
import { Toast } from "./components/Toast";
import { ErrorMessage } from "./components/ErrorMessage";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly joinButton: Locator;
  readonly errorMessage: ErrorMessage;
  readonly toast: Toast;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[id="email"]');
    this.passwordInput = page.locator('input[id="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    // this.errorMessage = new ErrorMessage()
    this.toast = new Toast(page);
    this.header = new Header(page);
  }
  async goto(): Promise<void> {
    await this.page.goto("/login", { waitUntil: "commit" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginSuccess(): Promise<boolean> {
    return await this.header.userNameDisplay.isVisible();
  }
  async loginFail(): Promise<boolean> {
    return await this.header.signInLink.isVisible();
  }

  async expectLoginSuccess(): Promise<void> {
    await this.toast.expectSuccessMessage(
      /đăng\s*nhập(\s*tài\s*khoản)?\s*thành\s*công\s*!?/i
    );
  }

  async expectLoginFail(): Promise<void> {
    await this.toast.expectErrorMessage(/Email hoặc mật khẩu không đúng\s*!?/i);
  }
}
