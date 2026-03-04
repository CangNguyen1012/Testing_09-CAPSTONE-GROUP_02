import { Locator, Page } from "@playwright/test";

/**
 * InputField Component - Reusable input field with error message support
 * Supports various input types and error validation
 */
export class InputFieldComponent {
  readonly container: Locator;
  readonly input: Locator;
  readonly errorMessage: Locator;

  constructor(
    page: Page,
    private fieldName: string,
    options?: {
      byId?: string;
      byName?: string;
      byPlaceholder?: string;
      customLocator?: Locator;
    }
  ) {
    // Xác định input field dựa trên các options
    if (options?.customLocator) {
      this.input = options.customLocator;
    } else if (options?.byId) {
      this.input = page.locator(`#${options.byId}`);
    } else if (options?.byName) {
      this.input = page.locator(`input[name="${options.byName}"]`);
    } else if (options?.byPlaceholder) {
      this.input = page.locator(
        `input[placeholder="${options.byPlaceholder}"]`
      );
    } else {
      // Default: tìm theo name attribute
      this.input = page.locator(`input[name="${fieldName}"]`);
    }

    // Container chứa input và error message
    this.container = this.input.locator("..");

    // Error message locator - tìm trong container hoặc sibling element
    this.errorMessage = this.container.locator(".text-danger span.text-danger");
  }

  /**
   * Nhập giá trị vào input field
   */
  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }

  /**
   * Clear input field
   */
  async clear(): Promise<void> {
    await this.input.clear();
  }

  /**
   * Click vào input field
   */
  async click(): Promise<void> {
    await this.input.click();
  }

  /**
   * Blur khỏi input field (trigger validation)
   */
  async blur(): Promise<void> {
    await this.input.blur();
  }

  /**
   * Lấy giá trị hiện tại của input
   */
  async getValue(): Promise<string> {
    return await this.input.inputValue();
  }

  /**
   * Kiểm tra input có visible không
   */
  async isVisible(): Promise<boolean> {
    return await this.input.isVisible();
  }

  /**
   * Kiểm tra input có enabled không
   */
  async isEnabled(): Promise<boolean> {
    return await this.input.isEnabled();
  }

  /**
   * Kiểm tra input có required attribute không
   */
  async isRequired(): Promise<boolean> {
    const required = await this.input.getAttribute("required");
    return required !== null;
  }

  /**
   * Kiểm tra error message có hiển thị không
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Lấy nội dung error message
   */
  async getErrorText(): Promise<string> {
    if (await this.hasError()) {
      return (await this.errorMessage.textContent()) || "";
    }
    return "";
  }

  /**
   * Kiểm tra error message có chứa text cụ thể không
   */
  async hasErrorText(expectedText: string): Promise<boolean> {
    if (await this.hasError()) {
      const errorText = await this.getErrorText();
      return errorText.trim().includes(expectedText);
    }
    return false;
  }

  /**
   * Wait for error message to appear
   */
  async waitForError(timeout: number = 5000): Promise<void> {
    await this.errorMessage.waitFor({ state: "visible", timeout });
  }

  /**
   * Wait for error message to disappear
   */
  async waitForErrorToDisappear(timeout: number = 5000): Promise<void> {
    await this.errorMessage.waitFor({ state: "hidden", timeout });
  }

  /**
   * Lấy placeholder text
   */
  async getPlaceholder(): Promise<string> {
    return (await this.input.getAttribute("placeholder")) || "";
  }

  /**
   * Fill và blur (thường dùng để trigger validation)
   */
  async fillAndBlur(value: string): Promise<void> {
    await this.fill(value);
    await this.blur();
  }

  /**
   * Fill và press Enter
   */
  async fillAndEnter(value: string): Promise<void> {
    await this.fill(value);
    await this.input.press("Enter");
  }
}
