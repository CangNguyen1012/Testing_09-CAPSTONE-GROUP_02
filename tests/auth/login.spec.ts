import { log } from "node:console";
import { LoginPage } from "../../pages/LoginPage";
import { expect, test } from "../../utils/base";

test.describe("Login Page tessts", () => {
  test("TC-05 Đăng nhập thành công", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("gepeidoukafou-7756@yopmail.com", "123456789");
    await loginPage.expectLoginSuccess();
  });

  test("TC-06 Đăng nhập thất bại", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("gepeidoukafou-776@yopmail.com", "123456789");
    await loginPage.expectLoginFail();
  });
});
