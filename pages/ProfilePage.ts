import { Page, Locator } from "@playwright/test"

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
        this.clearCertificationButton = page.locator(
            "input#certification + div button",
        )
        this.clearSkillButton = page.locator("input#skill + div button")
        this.createGigButton = page.locator("button.btn", {
            hasText: "Create a new Gig",
        })
    }

    async clickDropdownMenu() {
        await this.dropdownMenuButton.click({ timeout: 3000, force: true })
    }

    async logout() {
        await this.clickDropdownMenu()
        await this.page.waitForTimeout(1000)
        await this.logoutButton.waitFor({ state: "visible", timeout: 60000 })
        await this.logoutButton.click({ force: true })
        await this.page.waitForURL("/", { timeout: 5000 })
    }

    async uploadProfileImage(filePath: string) {
        await this.profileImageFileInput.setInputFiles(filePath, {
            timeout: 3000,
        })
    }

    async clickEditButton() {
        await this.editButton.nth(1).click({ timeout: 3000 })
    }

    async clickFacebooklink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.FacebookLink.click(),
        ])
        await newPage.waitForLoadState()
    }

    async clickGoogleLink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.GoogleLink.click(),
        ])
        await newPage.waitForLoadState()
    }

    async clickGithubLink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.GithubLink.click(),
        ])
        await newPage.waitForLoadState()
    }

    async clickTwitterLink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.TwitterLink.click(),
        ])
        await newPage.waitForLoadState()
    }

    async clickDribbleLink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.DribbleLink.click(),
        ])
        await newPage.waitForLoadState()
    }

    async clickStackOverflowLink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.StackOverflowLink.click(),
        ])
        await newPage.waitForLoadState()
    }

    async updateName(name: string) {
        await this.nameInput.fill("")
        await this.nameInput.fill(name)
    }

    async updatePhone(phone: string) {
        await this.phoneInput.fill("")
        await this.phoneInput.fill(phone)
    }

    async updateBirthday(birthday: string) {
        await this.birthdayInput.fill("")
        await this.birthdayInput.fill(birthday)
    }

    async selectMale() {
        await this.maleRadio.check()
    }

    async selectFemale() {
        await this.femaleRadio.check()
    }

    async addCertification(cert: string) {
        await this.certificationInput.fill(cert)
        await this.page.keyboard.press("Enter")
    }

    async addSkill(skill: string) {
        await this.skillInput.fill(skill)
        await this.page.keyboard.press("Enter")
    }

    async clickSave() {
        await this.saveButton.click()
    }

    async clickCancel() {
        await this.cancelButton.click()
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
        if (await this.clearCertificationButton.isVisible()) {
            await this.clearCertificationButton.click()
        }
    }

    async clearSkill() {
        if (await this.clearSkillButton.isVisible()) {
            await this.clearSkillButton.click()
        }
    }

    async clickCreateGig() {
        await this.createGigButton.click()
    }
}
