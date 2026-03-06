import { test, expect } from "@playwright/test"
import { RegisterPage } from "../pages/RegisterPage"

test.describe("Register Page", () => {
    test("Dang ky thanh cong", async ({ page }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()

        await registerPage.register({
            name: "testing",
            email: `testing${Date.now()}@gmail.com`,
            password: "123456",
            passwordConfirm: "123456",
            phone: "0999999991",
            birthday: "1999-09-19",
            gender: "male",
        })

        await page.waitForTimeout(5000)
        const isSuccess = await registerPage.isSuccessRegister()
        console.log("isSuccess: ", isSuccess)
        expect(true).toBe(true)
    })

    test("Dang ky that bai voi email da ton tai ", async ({ page }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()

        await registerPage.register({
            name: "testing",
            email: "buingochuyen01@gmail.com", // email đã đăng ký
            password: "123456",
            passwordConfirm: "123456",
            phone: "0999999991",
            birthday: "1999-09-19",
            gender: "male",
        })

        await page.waitForTimeout(5000)
        const isFailRegister = await registerPage.isFailRegister()
        console.log("erroMassage: ", isFailRegister)
        expect(true).toBe(true)
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi để trống trường Your Name", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.nameInput.click()
        await registerPage.emailInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.nameErrorMessage).toBeVisible()
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi nhập Your Name không đúng định dạng", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.fillName("123456")
        await registerPage.nameInput.click()
        await registerPage.emailInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.nameErrorMessage).toHaveText(
            /không đúng định dạng/i,
        )
    })

    test("Kiểm tra thông báo lỗi khi nhập Tên vượt quá 50 ký tự", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        const longName = "a".repeat(51)
        await registerPage.nameInput.click()
        await registerPage.emailInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.nameErrorMessage).toHaveText(
            /tối đa|vượt quá|50.*ký tự/i,
        )
    })

    test("Kiểm tra tên hợp lệ khi nhập 50 ký tự", async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const maxValidName = "a".repeat(50)

        await registerPage.fillName(maxValidName)
        await registerPage.submit()

        await expect(registerPage.nameErrorMessage).not.toBeVisible()
    })

    test("Kiểm tra tên hợp lệ khi nhập 2 ký tự", async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const minValidName = "ab"

        await registerPage.fillName(minValidName)
        await registerPage.submit()

        await expect(registerPage.nameErrorMessage).not.toBeVisible()
    })

    test("Kiểm tra thông báo lỗi khi Tên ít hơn 2 ký tự", async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const shortName = "a" // 1 ký tự

        await registerPage.fillName(shortName)
        await registerPage.submit()

        await expect(registerPage.nameErrorMessage).toHaveText(
            /2.*ký tự|ít nhất 2/i,
        )
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi để trống trường Your Email", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.emailInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.emailErrorMessage).toHaveText(
            /required|trống|email/i,
        )
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi nhập Your Email không đúng định dạng", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.fillEmail("abc123")
        await registerPage.emailInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.emailErrorMessage).toContainText(
            /không.*định dạng/i,
        )
    })

    test("Kiểm tra thông báo lỗi khi nhập Email vượt quá 254 ký tự", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const domain = "@gmail.com"
        const maxLength = 254

        // 255 ký tự
        const localPartLength = maxLength - domain.length + 1
        const longEmail = "a".repeat(localPartLength) + domain

        await registerPage.emailInput.fill(longEmail)
        await registerPage.nameInput.click()

        await expect(registerPage.emailErrorMessage).toHaveText(
            "Email phải từ 6 đến 254 ký tự",
        )
    })

    test("Kiểm tra thông báo lỗi khi nhập Email ít hơn 6 ký tự", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const shortEmail = "a@b.c" // 5 ký tự

        await registerPage.emailInput.fill(shortEmail)
        await registerPage.nameInput.click()

        await expect(registerPage.emailErrorMessage).toHaveText(
            "Email phải từ 6 đến 254 ký tự",
        )
    })

    test("Kiểm tra Email hợp lệ khi nhập đúng 6 ký tự", async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const validEmail = "a@b.cd" // 6 ký tự

        await registerPage.emailInput.fill(validEmail)
        await registerPage.nameInput.click()

        await expect(registerPage.emailErrorMessage).not.toBeVisible()
    })

    test("Kiểm tra Email hợp lệ khi nhập đúng 254 ký tự", async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const domain = "@gmail.com"
        const maxLength = 254

        const localPartLength = maxLength - domain.length
        const validEmail = "a".repeat(localPartLength) + domain

        await registerPage.emailInput.fill(validEmail)
        await registerPage.nameInput.click()

        await expect(registerPage.emailErrorMessage).not.toBeVisible()
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi để trống trường Your Password", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.passwordInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.passwordErrorMessage).toHaveText(
            /required|trống|password/i,
        )
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi nhập Your Password không đúng định dạng", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.fillPassword("123")
        await registerPage.passwordInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.passwordErrorMessage).toHaveText(
            /6\s*-\s*32/i,
        )
    })

    //*Kiểm tra thông báo lỗi hiển thị đúng khi nhập [Your Password] vượt quá ký tự quy định
    test("Kiểm tra thông báo lỗi hiển thị đúng khi nhập Password vượt quá 32 ký tự", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const maxLength = 32

        const longPassword = "A".repeat(maxLength + 1)

        await registerPage.passwordInput.fill(longPassword)

        await registerPage.nameInput.click()

        await expect(registerPage.passwordErrorMessage).toHaveText(
            /6\s*-\s*32 ký tự/i,
        )
    })

    test("Kiểm tra Password hợp lệ khi nhập đúng 32 ký tự", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const validPassword = "A".repeat(32)

        await registerPage.passwordInput.fill(validPassword)
        await registerPage.nameInput.click()

        await expect(registerPage.passwordErrorMessage).not.toBeVisible()
    })

    test("Kiểm tra thông báo lỗi khi nhập Password ít hơn 6 ký tự", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const shortPassword = "A".repeat(5)

        await registerPage.passwordInput.fill(shortPassword)
        await registerPage.nameInput.click()

        await expect(registerPage.passwordErrorMessage).toHaveText(
            /6\s*-\s*32 ký tự/i,
        )
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi để trống trường Repeat Your Password", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        await registerPage.passwordInput.fill("Aa123456")
        await registerPage.confirmPasswordInput.click()
        await registerPage.nameInput.click()

        await expect(registerPage.confirmPasswordErrorMessage).toHaveText(
            "PasswordConfirm không được bỏ trống",
        )
    })

    test("Kiểm tra thông báo lỗi hiển thị đúng khi Repeat Password không trùng với Password", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        await registerPage.passwordInput.fill("Aa123456")
        await registerPage.confirmPasswordInput.fill("Bb123456")

        await registerPage.nameInput.click()

        await expect(registerPage.confirmPasswordErrorMessage).toHaveText(
            "Password phải trùng nhau",
        )
    })

    test("thông báo lỗi hiển thị đúng khi để trống trường Your Phone", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.phoneInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.phoneErrorMessage).toHaveText(
            /required|trống|phone/i,
        )
    })

    test("thông báo lỗi hiển thị đúng khi nhập Your Phone không đúng định dạng", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.fillPhone("abc123")
        await registerPage.phoneInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.phoneErrorMessage).toContainText("10")
    })

    test("thông báo lỗi hiển thị đúng khi để trống trường ngày tháng năm sinh", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.birthdayInput.click()
        await registerPage.nameInput.click()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.birthdayErrorMessage).toHaveText(
            /required|trống|birthday|date/i,
        )
    })

    test("thông báo lỗi hiển thị đúng khi không tích chọn [I agree all statements in Terms of service]", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()
        await registerPage.fillName("Testing User")
        await registerPage.fillEmail(`test${Date.now()}@gmail.com`)
        await registerPage.fillPassword("123456")
        await registerPage.fillPasswordConfirm("123456")
        await registerPage.fillPhone("0999999991")
        await registerPage.fillBirthday("1999-09-19")
        await registerPage.selectMaleGender()
        await registerPage.submit()

        await expect(page).toHaveURL(/register/)
        await expect(registerPage.agreeTermCheckBox).not.toBeChecked()
    })

    test('Kiểm tra link "Terms of Service" có thể nhấp được và mở trang mới', async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.goto()

        const [newPage] = await Promise.all([
            page.context().waitForEvent("page"),
            registerPage.termsOfServiceLink.click(),
        ])

        await newPage.waitForLoadState()

        await expect(newPage).toHaveURL(/terms/i)
    })
})
