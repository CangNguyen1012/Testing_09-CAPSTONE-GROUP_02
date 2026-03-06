import { Page, Locator } from "@playwright/test"
import { highLightAndScreenshot } from "../utils/screenshot"

export class GigPage {
    readonly page: Page

    // Locators
    readonly gigTitleInput: Locator
    readonly gigDescriptionInput: Locator
    readonly gigCategorySelect: Locator
    readonly gigPriceInput: Locator
    readonly gigDeliveryTimeSelect: Locator
    readonly gigRevisionInput: Locator
    readonly publishButton: Locator
    readonly cancelButton: Locator

    readonly url = "https://demo4.cybersoft.edu.vn/gig/create"

    constructor(page: Page) {
        this.page = page
        this.gigTitleInput = page.locator("input[name='title']")
        this.gigDescriptionInput = page.locator("textarea[name='description']")
        this.gigCategorySelect = page.locator("select[name='category']")
        this.gigPriceInput = page.locator("input[name='price']")
        this.gigDeliveryTimeSelect = page.locator("select[name='deliveryTime']")
        this.gigRevisionInput = page.locator("input[name='revision']")
        this.publishButton = page.locator("button", { hasText: "Publish" })
        this.cancelButton = page.locator("button", { hasText: "Cancel" })
    }

    async fillTitle(title: string) {
        await this.gigTitleInput.fill(title)
        await highLightAndScreenshot(
            this.page,
            this.gigTitleInput,
            "Gig Management Tests",
            "fill_title",
        )
    }

    async fillDescription(description: string) {
        await this.gigDescriptionInput.fill(description)
        await highLightAndScreenshot(
            this.page,
            this.gigDescriptionInput,
            "Gig Management Tests",
            "fill_description",
        )
    }

    async selectCategory(category: string) {
        await this.gigCategorySelect.selectOption(category)
        await highLightAndScreenshot(
            this.page,
            this.gigCategorySelect,
            "Gig Management Tests",
            "select_category",
        )
    }

    async fillPrice(price: string) {
        await this.gigPriceInput.fill(price)
        await highLightAndScreenshot(
            this.page,
            this.gigPriceInput,
            "Gig Management Tests",
            "fill_price",
        )
    }

    async selectDeliveryTime(deliveryTime: string) {
        await this.gigDeliveryTimeSelect.selectOption(deliveryTime)
        await highLightAndScreenshot(
            this.page,
            this.gigDeliveryTimeSelect,
            "Gig Management Tests",
            "select_delivery_time",
        )
    }

    async fillRevision(revision: string) {
        await this.gigRevisionInput.fill(revision)
        await highLightAndScreenshot(
            this.page,
            this.gigRevisionInput,
            "Gig Management Tests",
            "fill_revision",
        )
    }

    async publishGig() {
        await highLightAndScreenshot(
            this.page,
            this.publishButton,
            "Gig Management Tests",
            "click_publish",
        )
        await this.publishButton.click()
    }

    async cancelGig() {
        await highLightAndScreenshot(
            this.page,
            this.cancelButton,
            "Gig Management Tests",
            "click_cancel",
        )
        await this.cancelButton.click()
    }
}
