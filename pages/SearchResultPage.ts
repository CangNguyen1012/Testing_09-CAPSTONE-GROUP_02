import { Page, Locator } from "@playwright/test"

export class SearchResultPage {
    readonly page: Page
    readonly gigItems: Locator
    readonly minPriceInput: Locator
    readonly maxPriceInput: Locator
    readonly applyButton: Locator
    readonly gigPrices: Locator
    readonly clearAllButton: Locator
    readonly firstFilterOption: Locator

    constructor(page: Page) {
        this.page = page
        this.gigItems = page.locator(".card")
        this.minPriceInput = page.locator('input[name="minPrice"]')
        this.maxPriceInput = page.locator('input[name="maxPrice"]')
        this.applyButton = page.getByRole("button", { name: "Apply" })
        this.gigPrices = page.locator(".price")
        this.clearAllButton = page.getByText("Clear All")
        this.firstFilterOption = page.locator(".categoriesmenu_li").first()
    }

    // chọn category theo tên
    async filterByCategory(categorySlug: string) {
        await this.page
            .locator(`a[href*="${categorySlug}"]`)
            .first()
            .click()
    }

    async filterByPrice(min: string, max: string) {
        await this.minPriceInput.fill(min)
        await this.maxPriceInput.fill(max)
        await this.applyButton.click()
    }

    async applyOneFilter() {
        await this.firstFilterOption.click()
    }
    async clearAllFilters() {
        await this.clearAllButton.click()
    }
}
