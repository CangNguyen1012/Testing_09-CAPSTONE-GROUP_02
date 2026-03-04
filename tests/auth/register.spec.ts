import { expect, test } from "../../utils/base";

test.describe("Register Page tessts", () => {
  test("TC-01 Đăng ký tài khoản thành công", async ({ registerPage }) => {
    await registerPage.header.gotoRegisterPage();
    await registerPage.fillRegisterForm(
      "Nguyen Van A",
      "lomauttoddeppo-1494@yopmail.com",
      "123456789",
      "123456789",
      "0312345678",
      "2001-12-02",
      "male"
    );
    await registerPage.expectRegisterSuccess();
  });
  test("TC-03 Đăng ký tài khoản thất bại với email đã tồn tại", async ({
    registerPage,
  }) => {
    await registerPage.header.gotoRegisterPage();
    await registerPage.fillRegisterForm(
      "Nguyen Van A",
      "kuppebrameinou-1488@yopmail.com",
      "123456789",
      "123456789",
      "0312345678",
      "2001-12-02",
      "male"
    );
    await registerPage.expectRegisterFail();
  });

  test("TC-08 Validate message lỗi hiển thị đúng", async ({ registerPage }) => {
    await registerPage.header.gotoRegisterPage();
    await registerPage.fillNameInput("");
    await registerPage.clickRegisterButton();
    expect(await registerPage.nameInput.hasError()).toBeTruthy();
    expect(await registerPage.nameInput.getErrorText()).toContain(
      "Name không được bỏ trống"
    );
  });
});
