import { expect, Locator, Page } from "@playwright/test";

export class ListGigsPage {
  readonly page: Page;
  readonly gigCards: Locator;
  readonly gigTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gigCards = page.locator(".service-card");
    this.gigTitle = page.locator('a[href^="/jobDetail/"]');
  }

  async waitForGigListLoaded() {
    await expect(this.gigCards.first()).toBeVisible();
  }

  async getGigCount() {
    return await this.gigCards.count();
  }

  async clickGig(index: number) {
    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.gigTitle.nth(index).click(),
    ]);
  }
}
