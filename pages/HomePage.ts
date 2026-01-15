import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  }
}
