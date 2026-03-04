import { Locator, Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly btnShowGigDetail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnShowGigDetail = page.locator("button.viewdetail");
  }

  async showGigDetail() {
    await this.btnShowGigDetail.nth(0).click();
  }
}
