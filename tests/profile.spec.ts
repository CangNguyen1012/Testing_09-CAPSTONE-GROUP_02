import test, { expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ProfilePage } from "../pages/ProfilePage"

test.describe("Profile Page tests", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("testuser123@gmail.com", "cang@1012")

        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/profile")
    })

    test("Verify profile page loaded ", async ({ page }) => {
        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/profile")
    })

    test("Update name successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.updateName("Cang")
        await profilePage.clickSave()

        // Verify the name is updated
        const updatedName = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(0)
            .textContent()
        expect(updatedName).toBe("Cang")
    })

    test("Update phone successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.phoneInput.fill("1234567890")
        await profilePage.clickSave()

        // Verify the phone number is updated
        const updatedPhone = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(1)
            .textContent()
        expect(updatedPhone).toBe("1234567890")
    })

    test("Update birthday successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.birthdayInput.fill("01/01/1990")
        await profilePage.clickSave()

        // Verify the birthday is updated
        const updatedBirthday = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(2)
            .textContent()
        expect(updatedBirthday).toBe("01/01/1990")
    })

    test("Verify select gender successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.selectFemale()
        await profilePage.clickSave()

        // Verify the gender is updated
        await profilePage.clickEditButton()
        const isFemaleSelected = await profilePage.femaleRadio.isChecked()
        expect(isFemaleSelected).toBeTruthy()
    })

    test("Verify one certification added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.clearCertification()
        await profilePage.addCertification("ISTQB")
        await profilePage.clickSave()

        // Verify the certification is added
        const certifications = await page
            .locator('.inner_item:has(h3:has-text("Certification")) p.lorem')
            .allTextContents()
        await page.waitForTimeout(2000) // Wait for the certifications to be updated
        expect(certifications).toContain("ISTQB")
    })

    test("Verify many certifications added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.clearCertification()
        await profilePage.addCertification("Testing")
        await profilePage.addCertification("PMP")
        await profilePage.addCertification("AWS Certified Solutions Architect")
        await profilePage.clickSave()

        // Verify the certifications are added
        const certifications = await page
            .locator('.inner_item:has(h3:has-text("Certification")) p.lorem')
            .allTextContents()
        await page.waitForTimeout(2000) // Wait for the certifications to be updated
        expect(certifications).toContain("Testing")
        expect(certifications).toContain("PMP")
        expect(certifications).toContain("AWS Certified Solutions Architect")
    })

    test("Verify one skill added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.clearSkill()
        await profilePage.addSkill("Automation")
        await profilePage.clickSave()

        // Verify the skill is added
        const skills = await page
            .locator('.inner_item:has(h3:has-text("Skills")) p.lorem')
            .allTextContents()
        await page.waitForTimeout(2000) // Wait for the skills to be updated
        expect(skills).toContain("Automation")
    })

    test("Verify many skills added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.clearSkill()
        await profilePage.addSkill("Manual Testing")
        await profilePage.addSkill("Performance Testing")
        await profilePage.addSkill("Security Testing")
        await profilePage.clickSave()

        // Verify the skills are added
        const skills = await page
            .locator('.inner_item:has(h3:has-text("Skills")) p.lorem')
            .allTextContents()
        await page.waitForTimeout(2000) // Wait for the skills to be updated
        expect(skills).toContain("Manual Testing")
        expect(skills).toContain("Performance Testing")
        expect(skills).toContain("Security Testing")
    })

    test("Verify Facebook link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickFacebooklink()

        // Verify the Facebook page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const facebookPage = pages[1]
        await facebookPage.waitForLoadState()
        expect(facebookPage.url()).toContain("facebook.com")
    })

    test("Verify Google link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickGoogleLink()

        // Verify the Google page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const googlePage = pages[1]
        await googlePage.waitForLoadState()
        expect(googlePage.url()).toContain("accounts.google.com")
    })

    test("Verify Github link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickGithubLink()

        // Verify the Github page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const githubPage = pages[1]
        await githubPage.waitForLoadState()
        expect(githubPage.url()).toContain("github.com")
    })

    test("Verify Twitter link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickTwitterLink()

        // Verify the Twitter page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const twitterPage = pages[1]
        await twitterPage.waitForLoadState()
        expect(twitterPage.url()).toContain("twitter.com")
    })

    test("Verify Dribble link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickDribbleLink()

        // Verify the Dribble page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const dribblePage = pages[1]
        await dribblePage.waitForLoadState()
        expect(dribblePage.url()).toContain("dribbble.com")
    })

    test("Verify Stack Overflow link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickStackOverflowLink()

        // Verify the Stack Overflow page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const stackOverflowPage = pages[1]
        await stackOverflowPage.waitForLoadState()
        expect(stackOverflowPage.url()).toContain("stackoverflow.com")
    })

    test("Logout successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.logout()

        // Verify the user is logged out and redirected to the login page
        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/login")
    })

    test("Verify profile image upload", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        const filePath = "data\\images\\images.jfif"
        await profilePage.profileImageFileInput.setInputFiles(filePath)
        await profilePage.clickSave()

        // Verify the profile image is updated
        const uploadedImageSrc = await page
            .locator("div.image.d-flex img.avatar")
            .getAttribute("src")
        expect(uploadedImageSrc).toContain("images.jfif")
    })

    test("Verify update basic information successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.updateProfile({
            name: "Cang Nguyen",
            phone: "0987654321",
            birthday: "02/02/1992",
        })
        await profilePage.clickSave()

        // Verify the basic information is updated
        const updatedName = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(0)
            .textContent()
        const updatedPhone = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(1)
            .textContent()
        const updatedBirthday = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(2)
            .textContent()
        expect(updatedName).toBe("Cang Nguyen")
        expect(updatedPhone).toBe("0987654321")
        expect(updatedBirthday).toBe("02/02/1992")
    })

    test("Verify birthday input validation", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await profilePage.updateBirthday("invalid-date")
        await profilePage.clickSave()

        // Verify an error message is displayed for invalid birthday input
        const errorMessage = await page.locator(".text-danger").textContent()
        expect(errorMessage).toBe("Please enter a valid date.")
    })

    test("Verify cannot save with empty name", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.updateName("")
        await profilePage.clickSave()

        const errorMessage = await page
            .locator(".text-danger")
            .first()
            .textContent()
        expect(errorMessage).toBeTruthy()
    })

    test("Verify phone rejects letters", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.updatePhone("abcde123")
        await profilePage.clickSave()

        const errorMessage = await page.locator(".text-danger").textContent()
        expect(errorMessage).toBeTruthy()
    })

    test("Verify phone too short validation", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.updatePhone("123")
        await profilePage.clickSave()

        const errorMessage = await page.locator(".text-danger").textContent()
        expect(errorMessage).toBeTruthy()
    })

    test("Verify birthday cannot be future date", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.updateBirthday("01/01/2099")
        await profilePage.clickSave()

        const errorMessage = await page.locator(".text-danger").textContent()
        expect(errorMessage).toBeTruthy()
    })

    test("Verify duplicate certification is not allowed", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.clearCertification()
        await profilePage.addCertification("ISTQB")
        await profilePage.addCertification("ISTQB")

        await profilePage.clickSave()

        const certifications = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .allTextContents()

        const count = certifications.filter((c) => c === "ISTQB").length
        expect(count).toBe(1)
    })

    test("Verify empty certification cannot be added", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.certificationInput.fill("")
        await page.keyboard.press("Enter")

        const tags = await page.locator(".ant-tag").count()
        expect(tags).toBe(0)
    })

    test("Verify duplicate skill not allowed", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        await profilePage.clearSkill()
        await profilePage.addSkill("Automation")
        await profilePage.addSkill("Automation")

        await profilePage.clickSave()

        const skills = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .allTextContents()

        const count = skills.filter((s) => s === "Automation").length
        expect(count).toBe(1)
    })

    test("Verify very long skill name handling", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()

        const longSkill = "A".repeat(300)
        await profilePage.addSkill(longSkill)

        await profilePage.clickSave()

        const skills = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .allTextContents()

        expect(skills.some((s) => s.length <= 255)).toBeTruthy()
    })

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(2000)
    })
})
