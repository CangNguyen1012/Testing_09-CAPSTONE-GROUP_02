import { Locator, Page, expect } from "@playwright/test";

export class ErrorMessage {
  readonly errorText: Locator;

  constructor(container: Locator) {
    this.errorText = container.locator(".text-danger span");
  }

  async expectVisible() {
    await expect(this.errorText).toBeVisible();
  }

  async expectText(expected: string | RegExp) {
    await expect(this.errorText).toHaveText(expected);
  }

  async getText(): Promise<string> {
    return (await this.errorText.textContent()) ?? "";
  }
}
