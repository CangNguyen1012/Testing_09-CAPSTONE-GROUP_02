import { Locator, Page } from "@playwright/test"
export class LoginPage {
    readonly page: Page

    // Locators
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    readonly url = "https://demo4.cybersoft.edu.vn/login"

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.locator("input[name='email']")
        this.passwordInput = page.locator("input[name='password']")
        this.loginButton = page.locator("button[type='submit']")
    }

    async gotoLoginPage() {
        await this.page.goto(this.url)
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email, { timeout: 5000 })
        await this.passwordInput.fill(password, { timeout: 5000 })
        await this.loginButton.click()
    }
}
