import { expect, Locator, Page } from "@playwright/test";
import { Toast } from "./components/Toast";
export class GigDetail {
  readonly page: Page;
  readonly gigTitle: Locator;
  readonly gigDescription: Locator;
  readonly purchaseButton: Locator;
  readonly toast: Toast;

  constructor(page: Page) {
    this.page = page;
    this.gigTitle = page.locator(".job-title");
    this.gigDescription = page.locator(".description");
    this.purchaseButton = page.getByRole("button", {
      name: "Continue (US$30)",
    });
    this.toast = new Toast(page);
  }

  async expectGigDetailLoaded(title: string, description: string) {
    await expect(this.gigTitle).toBeVisible();
    await expect(this.gigTitle).toContainText(title);
    // await expect(this.gigDescription).toBeVisible();
    // await expect(this.gigDescription).toContainText(description);
  }
  async clickPurchaseButton() {
    await this.purchaseButton.click();
  }

  async expectPurchaseButtonClickSuccess() {
    await this.toast.expectSuccessMessage(/Thuê công việc thành công !\s*!?/i);
  }

  async expectPurchaseButtonClickFail() {
    await this.toast.expectErrorMessage(/Đã\s*có\s*lỗi\s*xảy\s*ra\s*!?/i);
  }
}
