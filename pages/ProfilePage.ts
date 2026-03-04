import { Page, Locator } from "@playwright/test"
import { highLightAndScreenshot } from "../utils/screenshot"

export class ProfilePage {
    readonly page: Page

    // Locators
    readonly dropdownMenuButton: Locator
    readonly logoutButton: Locator
    readonly profileImageFileInput: Locator
    readonly editButton: Locator
    readonly FacebookLink: Locator
    readonly GoogleLink: Locator
    readonly GithubLink: Locator
    readonly TwitterLink: Locator
    readonly DribbleLink: Locator
    readonly StackOverflowLink: Locator
    readonly emailInput: Locator
    readonly nameInput: Locator
    readonly phoneInput: Locator
    readonly birthdayInput: Locator
    readonly maleRadio: Locator
    readonly femaleRadio: Locator
    readonly certificationInput: Locator
    readonly skillInput: Locator
    readonly saveButton: Locator
    readonly cancelButton: Locator
    readonly clearCertificationButton: Locator
    readonly clearSkillButton: Locator
    readonly createGigButton: Locator
    readonly successToastMessage: Locator

    readonly url = "https://demo4.cybersoft.edu.vn/profile"

    constructor(page: Page) {
        this.page = page
        this.dropdownMenuButton = page.locator("button#dropdownMenuButton1")
        this.logoutButton = page.locator("button.dropdown-item")
        this.profileImageFileInput = page.locator("input[type='file']")
        this.editButton = page.locator("button.edit")
        this.FacebookLink = page.locator("a.btn-connect", {
            hasText: "Facebook",
        })
        this.GoogleLink = page.locator("a.btn-connect.cl-gg", {
            hasText: "Google",
        })
        this.GithubLink = page.locator("a.btn-connect", { hasText: "Github" })
        this.TwitterLink = page.locator("a.btn-connect", { hasText: "Twitter" })
        this.DribbleLink = page.locator("a.btn-connect", { hasText: "Dirbble" })
        this.StackOverflowLink = page.locator("a.btn-connect", {
            hasText: "Stack Overflow",
        })
        this.emailInput = page.locator("input[name='email']")
        this.phoneInput = page.locator("input[name='phone']")
        this.nameInput = page.locator("input[name='name']")
        this.birthdayInput = page.locator("input[name='birthday']")
        this.maleRadio = page.locator("input[name='gender'][value='male']")
        this.femaleRadio = page.locator("input[name='gender'][value='female']")
        this.certificationInput = page.locator("input#certification")
        this.skillInput = page.locator("input#skill")
        this.saveButton = page.locator("button", { hasText: "Save" })
        this.cancelButton = page.locator("button", { hasText: "Cancel" })
        this.clearCertificationButton = page
            .locator(
                '.MuiFormControl-root:has(label:has-text("Certification"))',
            )
            .getByRole("button", { name: "Clear" })
        this.clearSkillButton = page
            .locator('.MuiFormControl-root:has(label:has-text("Skill"))')
            .getByRole("button", { name: "Clear" })
        this.createGigButton = page.locator("button.btn", {
            hasText: "Create a new Gig",
        })
        this.successToastMessage = page.locator(".Toastify__toast--success", {
            hasText: "Cập nhật thông tin thành công",
        })
    }

    async clickDropdownMenu() {
        await highLightAndScreenshot(
            this.page,
            this.dropdownMenuButton,
            "Profile Page tests",
            "click_dropdown_menu",
        )
        await this.dropdownMenuButton.click({ timeout: 3000, force: true })
    }

    async logout() {
        await this.clickDropdownMenu()
        await this.page.waitForTimeout(1000)
        await this.logoutButton.waitFor({ state: "visible", timeout: 60000 })
        await highLightAndScreenshot(
            this.page,
            this.logoutButton,
            "Profile Page tests",
            "click_logout",
        )
        await this.logoutButton.click({ force: true })
        await this.page.waitForURL("/", { timeout: 5000 })
    }

    async uploadProfileImage(filePath: string) {
        await highLightAndScreenshot(
            this.page,
            this.profileImageFileInput,
            "Profile Page tests",
            "upload_profile_image",
        )
        await this.profileImageFileInput.setInputFiles(filePath, {
            timeout: 3000,
        })
    }

    async clickEditButton() {
        await highLightAndScreenshot(
            this.page,
            this.editButton.nth(1),
            "Profile Page tests",
            "click_edit_button",
        )
        await this.editButton.nth(1).click({ timeout: 3000 })
    }

    async clickFacebooklink() {
        await highLightAndScreenshot(
            this.page,
            this.FacebookLink,
            "Profile Page tests",
            "click_facebook_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.FacebookLink.click({ timeout: 3000 }),
        ])
        await newPage.waitForLoadState()
    }

    async clickGoogleLink() {
        await highLightAndScreenshot(
            this.page,
            this.GoogleLink,
            "Profile Page tests",
            "click_google_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.GoogleLink.click({ timeout: 3000 }),
        ])
        await newPage.waitForLoadState()
    }

    async clickGithubLink() {
        await highLightAndScreenshot(
            this.page,
            this.GithubLink,
            "Profile Page tests",
            "click_github_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.GithubLink.click({ timeout: 3000 }),
        ])
        await newPage.waitForLoadState()
    }

    async clickTwitterLink() {
        await highLightAndScreenshot(
            this.page,
            this.TwitterLink,
            "Profile Page tests",
            "click_twitter_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.TwitterLink.click({ timeout: 3000 }),
        ])
        await newPage.waitForLoadState()
    }

    async clickDribbleLink() {
        await highLightAndScreenshot(
            this.page,
            this.DribbleLink,
            "Profile Page tests",
            "click_dribble_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.DribbleLink.click({ timeout: 3000 }),
        ])
        await newPage.waitForLoadState()
    }

    async clickStackOverflowLink() {
        await highLightAndScreenshot(
            this.page,
            this.StackOverflowLink,
            "Profile Page tests",
            "click_stackoverflow_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.StackOverflowLink.click({ timeout: 3000 }),
        ])
        await newPage.waitForLoadState()
    }

    async updateName(name: string) {
        await this.nameInput.fill("", { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await this.nameInput.fill(name, { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await highLightAndScreenshot(
            this.page,
            this.nameInput,
            "Profile Page tests",
            "update_name",
        )
    }

    async updatePhone(phone: string) {
        await this.phoneInput.fill("", { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await this.phoneInput.fill(phone, { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await highLightAndScreenshot(
            this.page,
            this.phoneInput,
            "Profile Page tests",
            "update_phone",
        )
    }

    async updateBirthday(birthday: string) {
        await this.birthdayInput.fill("", { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await this.birthdayInput.fill(birthday, { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await highLightAndScreenshot(
            this.page,
            this.birthdayInput,
            "Profile Page tests",
            "update_birthday",
        )
    }

    async selectMale() {
        await this.maleRadio.check({ timeout: 3000 })
        await highLightAndScreenshot(
            this.page,
            this.maleRadio,
            "Profile Page tests",
            "select_male",
        )
    }

    async selectFemale() {
        await this.femaleRadio.check({ timeout: 3000 })
        await highLightAndScreenshot(
            this.page,
            this.femaleRadio,
            "Profile Page tests",
            "select_female",
        )
    }

    async addCertification(cert: string) {
        await this.certificationInput.fill(cert, { timeout: 3000 })
        await highLightAndScreenshot(
            this.page,
            this.certificationInput,
            "Profile Page tests",
            "add_certification",
        )
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await this.page.keyboard.press("Enter")
        await this.page.waitForTimeout(2000) // Wait for the certification to be added
    }

    async addSkill(skill: string) {
        await this.skillInput.fill(skill, { timeout: 3000 })
        await this.page.waitForTimeout(1000) // Wait for DOM update
        await highLightAndScreenshot(
            this.page,
            this.skillInput,
            "Profile Page tests",
            "add_skill",
        )
        await this.page.keyboard.press("Enter")
        await this.page.waitForTimeout(2000) // Wait for DOM update
    }

    async clickSave() {
        await highLightAndScreenshot(
            this.page,
            this.saveButton,
            "Profile Page tests",
            "click_save",
        )
        await this.saveButton.click({ timeout: 3000 })
        await this.page.waitForTimeout(2000) // Wait for save operation to complete
    }

    async clickCancel() {
        await highLightAndScreenshot(
            this.page,
            this.cancelButton,
            "Profile Page tests",
            "click_cancel",
        )
        await this.cancelButton.click({ timeout: 3000 })
    }

    async updateProfile(data: {
        name?: string
        phone?: string
        birthday?: string
        gender?: "male" | "female"
    }) {
        if (data.name) await this.updateName(data.name)
        if (data.phone) await this.updatePhone(data.phone)
        if (data.birthday) await this.updateBirthday(data.birthday)

        if (data.gender === "male") await this.selectMale()
        if (data.gender === "female") await this.selectFemale()
    }

    async clearCertification() {
        while (await this.clearCertificationButton.isVisible()) {
            await highLightAndScreenshot(
                this.page,
                this.clearCertificationButton,
                "Profile Page tests",
                "clear_certification",
            )
            await this.clearCertificationButton.click({ timeout: 3000 })
            await this.page.waitForTimeout(1000) // Wait for DOM update
        }
    }

    async clearSkill() {
        while (await this.clearSkillButton.isVisible()) {
            await highLightAndScreenshot(
                this.page,
                this.clearSkillButton,
                "Profile Page tests",
                "clear_skill",
            )
            await this.clearSkillButton.click({ timeout: 3000 })
            await this.page.waitForTimeout(1000) // Wait for DOM update
        }
    }

    async clickCreateGig() {
        await highLightAndScreenshot(
            this.page,
            this.createGigButton,
            "Profile Page tests",
            "click_create_gig",
        )
        await this.createGigButton.click({ timeout: 3000 })
    }
}
