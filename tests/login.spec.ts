import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  test("Dang nhap thanh cong", async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("buingochuyen01@gmail.com", "buingochuyen01");
    await page.waitForTimeout(5000);
    const result = await loginPage.isLoginSuccess();
    expect(result).toBeTruthy();
  });
  test("Dang nhap khong thanh cong voi email chua dang ky", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("buingochuyen02@gmail.com", "buingochuyen01");
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.logoutButton).not.toBeVisible();
  });
  test("Dang nhap khong thanh cong voi mat khau sai", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("emaildaTontai@gmail.com", "saimatkhau");
    // Vẫn ở trang login
    await expect(page).toHaveURL(/login/);
    // Không thấy nút logout (chưa login thành công)
    await expect(loginPage.logoutButton).not.toBeVisible();
  });
  test("Dang xuat thanh cong", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("buingochuyen01@gmail.com", "buingochuyen01");
    await loginPage.isLoginSuccess();
    await loginPage.logout();
    await loginPage.isLogoutSuccess();
  });
  test("Kiểm tra thông báo lỗi hiển thị đúng khi để trống Your Email", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.click();
    await loginPage.passwordInput.click();
    await expect(loginPage.emailErrorMessage).toHaveText(
      "Email không được bỏ trống !"
    );
  });
  //  *Kiểm tra thông báo lỗi hiển thị đúng khi nhập [Your Email] vượt quá ký tự quy định
  test("Hiển thị lỗi khi Email vượt quá 254 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const domain = "@gmail.com";
    const maxLength = 254;
    const localPartLength = maxLength - domain.length + 1;
    const longEmail = "a".repeat(localPartLength) + domain;
    await loginPage.emailInput.fill(longEmail);
    await loginPage.passwordInput.click(); // blur
    await expect(loginPage.emailErrorMessage).toHaveText(
      "Email phải từ 6 đến 254 ký tự"
    );
  });
  test("Hiển thị lỗi khi Email ít hơn 6 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("a@a.co"); // < 6 ký tự
    await loginPage.passwordInput.click();
    await expect(loginPage.emailErrorMessage).toHaveText(
      "Email phải từ 6 đến 254 ký tự"
    );
  });
  test("Email hợp lệ khi đúng 6 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("a@a.co"); // 6 ký tự
    await loginPage.passwordInput.click();
    await expect(loginPage.emailErrorMessage).toHaveText("");
  });
  test("Email hợp lệ khi đúng 254 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const domain = "@gmail.com";
    const maxLength = 254;
    const localPartLength = maxLength - domain.length;
    const validEmail = "a".repeat(localPartLength) + domain;
    await loginPage.emailInput.fill(validEmail);
    await loginPage.passwordInput.click();
    await expect(loginPage.emailErrorMessage).toHaveText("");
  });
  test("Hiển thị lỗi khi Email không đúng định dạng", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("abc123"); // sai format
    // trigger validation
    await loginPage.passwordInput.click();
    await expect(loginPage.emailErrorMessage).toHaveText(
      "Email không đúng định dạng !"
    );
  });
  test("Hiển thị lỗi khi để trống Your Password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Nhập email hợp lệ
    await loginPage.emailInput.fill("test@gmail.com");
    await loginPage.passwordInput.click();
    await loginPage.emailInput.click();
    await expect(loginPage.passwordErrorMessage).toHaveText(
      "Password không được bỏ trống !"
    );
  });
  // *Kiểm tra thông báo lỗi hiển thị đúng khi nhập [Your Password] vượt quá ký tự quy định
  test("Hiển thị lỗi khi Password ít hơn 6 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("test@gmail.com");
    await loginPage.passwordInput.fill("12345"); // 5 ký tự
    await loginPage.emailInput.click();
    await expect(loginPage.passwordErrorMessage).toHaveText(
      "pass từ 6 - 32 ký tự !"
    );
  });
  test("Hiển thị lỗi khi Password vượt quá 32 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("test@gmail.com");
    const longPassword = "A".repeat(33); // 33 ký tự
    await loginPage.passwordInput.fill(longPassword);
    await loginPage.emailInput.click();
    await expect(loginPage.passwordErrorMessage).toHaveText(
      "pass từ 6 - 32 ký tự !"
    );
  });
  test("Password hợp lệ khi đúng 6 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("test@gmail.com");
    await loginPage.passwordInput.fill("123456");
    await loginPage.emailInput.click();
    await expect(loginPage.passwordErrorMessage).toHaveText("");
  });
  test("Password hợp lệ khi đúng 32 ký tự", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("test@gmail.com");
    const validPassword = "A".repeat(32);
    await loginPage.passwordInput.fill(validPassword);
    await loginPage.emailInput.click();
    await expect(loginPage.passwordErrorMessage).toHaveText("");
  });
  test("Hiển thị lỗi khi Password không đúng định dạng", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill("test@gmail.com");
    await loginPage.passwordInput.fill("abc123");
    await loginPage.emailInput.click();
    await expect(loginPage.passwordErrorMessage).toHaveText(
      "Password phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt."
    );
  });
});
