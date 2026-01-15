import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto("https://demo4.cybersoft.edu.vn/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  }
}
