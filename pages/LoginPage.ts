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
        // <input class="form-control" id="email" name="email" required="" placeholder="Your Email">
        this.emailInput = page.locator("input[name='email']")
        // <input type="password" class="form-control" id="password" name="password" required="" placeholder="Your Password">
        this.passwordInput = page.locator("input[name='password']")
        // <button class="btn btn-success login" type="submit">Login</button>
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
