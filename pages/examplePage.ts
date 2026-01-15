// Mẫu Page Object Model (POM)
// Đây là mẫu template thể hiện cấu trúc để tạo các page objects

import { Locator, Page } from "@playwright/test";
// Tùy chọn: Import các hàm utility nếu cần
// import { highLightAndScreenshot } from "../utils/screenshot";

export class ExamplePage {
  // Page object giúp tương tác với trang web
  readonly page: Page;

  // Locators - định nghĩa tất cả các phần tử bạn cần tương tác
  readonly exampleInput: Locator;
  readonly exampleButton: Locator;
  readonly exampleLink: Locator;
  readonly exampleText: Locator;

  // Constructor - khởi tạo page và tất cả các locators
  constructor(page: Page) {
    this.page = page;

    // Khởi tạo locators sử dụng các selector khác nhau
    this.exampleInput = page.locator('input[name="example"]');
    this.exampleButton = page.locator('button[type="submit"]');
    this.exampleLink = page.locator('a[href="/example"]');
    this.exampleText = page.locator(".example-class");

    // Các phương thức locator thay thế:
    // this.exampleButton = page.getByRole("button", { name: "Submit" });
    // this.exampleLink = page.getByRole("link", { name: "Example Link" });
    // this.exampleText = page.locator(".example-class");
  }

  // Các phương thức điều hướng
  async navigateToPage(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  }

  // Các phương thức hành động - các phương thức thực hiện hành động trên trang
  async fillInput(text: string): Promise<void> {
    await this.exampleInput.fill(text);
  }

  async clickButton(): Promise<void> {
    await this.exampleButton.click();
  }

  async clickLink(): Promise<void> {
    await this.exampleLink.click();
  }

  // Các phương thức getter - các phương thức lấy thông tin từ trang
  async getText(): Promise<string | null> {
    return await this.exampleText.textContent();
  }

  async getInputValue(): Promise<string | null> {
    return await this.exampleInput.inputValue();
  }

  // Các phương thức xác thực - các phương thức kiểm tra trạng thái trang
  async isElementVisible(): Promise<boolean> {
    try {
      await this.exampleButton.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isPageLoaded(urlPattern: RegExp): Promise<boolean> {
    try {
      await this.page.waitForURL(urlPattern, { timeout: 3000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Các phương thức phức tạp - các phương thức kết hợp nhiều hành động
  async performCompleteAction(inputText: string): Promise<void> {
    // Bước 1: Chờ phần tử hiển thị
    await this.exampleInput.waitFor({ state: "visible", timeout: 10000 });

    // Bước 2: Điền vào input
    await this.fillInput(inputText);

    // Bước 3: Click nút
    await this.clickButton();

    // Bước 4: Chờ điều hướng hoặc phần tử
    await this.page.waitForTimeout(2000);
  }

  // Các phương thức làm việc với tập hợp các phần tử
  async getAllMenuItems(): Promise<string[]> {
    const count = await this.exampleText.count();
    const items: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await this.exampleText.nth(i).textContent();
      if (text) {
        items.push(text);
      }
    }
    return items;
  }

  // Ví dụ upload file
  async uploadFile(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: "attached", timeout: 10000 });
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(2000);
  }
}
