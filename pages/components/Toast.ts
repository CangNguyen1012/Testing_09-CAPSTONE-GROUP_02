import { expect, Locator, Page } from "@playwright/test";

export class Toast {
  readonly page: Page;
  readonly successToast: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successToast = page.locator(
      '.Toastify__toast--success [role="alert"]'
    );
    this.errorToast = page.locator('.Toastify__toast--error [role="alert"]');
  }

  async expectSuccessMessage(expectedMessage: RegExp): Promise<void> {
    await expect(this.successToast).toBeVisible();
    await expect(this.successToast).toContainText(expectedMessage);
  }

  async expectErrorMessage(expectedMessage: RegExp): Promise<void> {
    await expect(this.errorToast).toBeVisible();
    await expect(this.errorToast).toContainText(expectedMessage);
  }
}
