import { Page, Locator } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly gigItems: Locator
    readonly popularSection: Locator
    readonly popularItems: Locator

    constructor(page: Page) {
        this.page = page
        this.searchInput = page.locator('input[name="searchInputCarousel"]')
        this.searchButton = page.getByRole("button", { name: "Search" })
        this.gigItems = page.locator(".card")
        this.popularSection = page.locator(".d-flex.popular")
        this.popularItems = this.popularSection.locator(".btn")
    }

    async goto() {
        await this.page.goto("https://demo4.cybersoft.edu.vn/")
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword)
        await this.searchInput.press("Enter")
    }
}
