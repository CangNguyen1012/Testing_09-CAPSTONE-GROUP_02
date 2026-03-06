import { Locator, Page } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly userNameDisplay: Locator;
  readonly signInLink: Locator;
  readonly joinLink: Locator;
  readonly categoriesMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameDisplay = this.page.locator('a[href="/profile"]');
    this.signInLink = this.page.getByRole("link", { name: "Sign in" });
    this.joinLink = this.page.getByRole("link", { name: "Join" });
    this.categoriesMenu = page.locator("section.CategoriesMenu");
  }

  async gotoRegisterPage() {
    await this.page.goto("/", { waitUntil: "commit" });
    await this.joinLink.click();
  }

  async scrollToShowHeader() {
    await this.page.mouse.wheel(0, 800);
    await this.categoriesMenu.waitFor({ state: "visible" });
  }

  async hoverCategory(name: string) {
    await this.scrollToShowHeader();

    const category = this.categoriesMenu
      .locator(".categoriesmenu_li")
      .filter({ hasText: name });

    await category.hover();
  }

  async clickSubCategory(parentName: string, subName: string) {
    await this.hoverCategory(parentName);

    const subItem = this.categoriesMenu.getByText(subName, { exact: true });

    await subItem.click();
  }

  async clickUserProfile() {
    await this.userNameDisplay.click();
  }
}
