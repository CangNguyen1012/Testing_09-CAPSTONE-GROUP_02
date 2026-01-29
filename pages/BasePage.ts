import { Locator, Page, expect } from "@playwright/test"

export class BasePage {
    readonly page: Page
    readonly searchButton: Locator

    constructor(page: Page) {
        this.page = page
        // <button class="btn btn-success" type="submit">Search</button>
        this.searchButton = page.locator(
            "button.btn.btn-success[type='submit']",
        )
    }

    async goto(): Promise<void> {
        await this.page.goto("/", {
            waitUntil: "commit",
        })

        await expect(this.searchButton).toBeVisible({
            timeout: 15000,
        })
    }
}
