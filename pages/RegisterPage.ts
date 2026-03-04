import { expect, Locator, Page } from "@playwright/test";
import { Header } from "./components/Header";
import { Toast } from "./components/Toast";
import { InputFieldComponent } from "./components/InputField";

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: InputFieldComponent;
  readonly emailInput: InputFieldComponent;
  readonly passwordInput: InputFieldComponent;
  readonly repeatPasswordInput: InputFieldComponent;
  readonly phoneInput: InputFieldComponent;
  readonly birthdayInput: InputFieldComponent;
  readonly registerButton: Locator;
  readonly termsCheckbox: Locator;
  readonly toast: Toast;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = new InputFieldComponent(page, "name", { byId: "name" });
    this.emailInput = new InputFieldComponent(page, "email", { byId: "email" });
    this.passwordInput = new InputFieldComponent(page, "password", {
      byId: "password",
    });
    this.repeatPasswordInput = new InputFieldComponent(
      page,
      "passwordConfirm",
      { byId: "passwordConfirm" }
    );
    this.phoneInput = new InputFieldComponent(page, "phone", { byId: "phone" });
    this.birthdayInput = new InputFieldComponent(page, "birthday", {
      byId: "birthday",
    });
    this.termsCheckbox = page.locator('input[id="agree-term"]');
    this.registerButton = page.locator('button[type="submit"]');
    this.toast = new Toast(page);
    this.header = new Header(page);
  }

  async fillNameInput(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmailInput(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPasswordInput(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPasswordInput(repeatPassword: string): Promise<void> {
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async fillPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  async fillBirthInput(birthday: string): Promise<void> {
    await this.birthdayInput.fill(birthday);
  }

  async selectGender(gender: "male" | "female"): Promise<void> {
    await this.page.locator(`input[type="radio"][id="${gender}"]`).check();
  }
  async checkTermsCheckbox(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  async fillRegisterForm(
    name: string,
    email: string,
    password: string,
    repeatPassword: string,
    phone: string,
    birthday: string,
    gender: "male" | "female"
  ): Promise<void> {
    await this.fillNameInput(name);
    await this.fillEmailInput(email);
    await this.fillPasswordInput(password);
    await this.fillRepeatPasswordInput(repeatPassword);
    await this.fillPhoneInput(phone);
    await this.fillBirthInput(birthday);
    await this.selectGender(gender);
    await this.checkTermsCheckbox();
    await this.clickRegisterButton();
  }

  async expectRegisterSuccess(): Promise<void> {
    // await expect(this.successToast).toBeVisible();
    // await expect(this.successToast).toContainText(
    //   /Đăng\s*kí\s*tài\s*khoản\s*thành\s*công\s*!?/i
    // );
    await this.toast.expectSuccessMessage(
      /Đăng\s*kí\s*tài\s*khoản\s*thành\s*công\s*!?/i
    );
  }

  async expectRegisterFail(): Promise<void> {
    // await expect(this.errorToast).toBeVisible();
    // await expect(this.errorToast).toContainText(/Email đã tồn tại\s*!?/i);
    await this.toast.expectErrorMessage(/Email đã tồn tại\s*!?/i);
  }
}
