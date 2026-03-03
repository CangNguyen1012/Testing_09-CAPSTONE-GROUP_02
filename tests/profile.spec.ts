import test, { expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ProfilePage } from "../pages/ProfilePage"

test.describe("Profile Page tests", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await page.waitForTimeout(3000)

        await loginPage.gotoLoginPage()
        await loginPage.login("testuser123@gmail.com", "cang@1012")
        await page.waitForTimeout(3000)

        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/profile")
        await page.waitForTimeout(3000)
    })

    test("Verify profile page loaded ", async ({ page }) => {
        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/profile")
    })

    test("Update name successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        await profilePage.updateName("Cang")
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the name is updated
        // <div class="d-flex align-items-center gap-5"><h6>Name:</h6><p class="lorem">Cang</p></div>
        const updatedName = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(0)
            .textContent()
        expect(updatedName).toBe("Cang")
    })

    test("Update phone successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.editButton.nth(1).click()
        await page.waitForTimeout(1000)
        await profilePage.phoneInput.fill("1234567890")
        await page.waitForTimeout(1000)
        await profilePage.saveButton.click()
        await page.waitForTimeout(3000)

        // Verify the phone number is updated
        const updatedPhone = await page
            .locator(".d-flex.align-items-center.gap-5 p.lorem")
            .nth(1)
            .textContent()
        expect(updatedPhone).toBe("1234567890")
    })

    test("Update birthday successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.editButton.nth(1).click()
        await page.waitForTimeout(1000)
        await profilePage.birthdayInput.fill("01/01/1990")
        await page.waitForTimeout(1000)
        await profilePage.saveButton.click()
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(1000)
        await profilePage.selectFemale()
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the gender is updated
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        const isFemaleSelected = await profilePage.femaleRadio.isChecked()
        expect(isFemaleSelected).toBeTruthy()
    })

    test("Verify one certification added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        await profilePage.clearCertification()
        await page.waitForTimeout(500)
        await profilePage.addCertification("ISTQB")
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the certification is added
        // <div class="d-flex flex-row flex-wrap"><p class="lorem mx-1">Test</p></div>
        const certifications = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .textContent()
        expect(certifications).toContain("ISTQB")
    })

    test("Verify many certifications added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        await profilePage.clearCertification()
        await page.waitForTimeout(500)
        await profilePage.addCertification("Testing Course")
        await page.waitForTimeout(500)
        await profilePage.addCertification("PMP")
        await page.waitForTimeout(500)
        await profilePage.addCertification("AWS Certified Solutions Architect")
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the certifications are added
        const certifications = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .allTextContents()
        expect(certifications).toContain("Testing Course")
        expect(certifications).toContain("PMP")
        expect(certifications).toContain("AWS Certified Solutions Architect")
    })

    test("Verify one skill added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        await profilePage.clearSkill()
        await page.waitForTimeout(500)
        await profilePage.addSkill("Automation Testing")
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the skill is added
        // <div class="d-flex flex-row flex-wrap"><p class="lorem mx-1">Test</p></div>
        const skills = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .textContent()
        expect(skills).toContain("Automation Testing")
    })

    test("Verify many skills added successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        await profilePage.clearSkill()
        await page.waitForTimeout(500)
        await profilePage.addSkill("Manual Testing")
        await page.waitForTimeout(500)
        await profilePage.addSkill("Performance Testing")
        await page.waitForTimeout(500)
        await profilePage.addSkill("Security Testing")
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the skills are added
        const skills = await page
            .locator(".d-flex.flex-row.flex-wrap p.lorem")
            .allTextContents()
        expect(skills).toContain("Manual Testing")
        expect(skills).toContain("Performance Testing")
        expect(skills).toContain("Security Testing")
    })

    test("Verify Facebook link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickFacebooklink()
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(3000)

        // Verify the Dribble page is opened
        const pages = page.context().pages()
        expect(pages.length).toBe(2)
        const dribblePage = pages[1]
        await dribblePage.waitForLoadState()
        expect(dribblePage.url()).toContain("dribbble.com") // Assuming the Dribble link should lead to dribbble.com
    })

    test("Verify Stack Overflow link works", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickStackOverflowLink()
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(3000)

        // Verify the user is logged out and redirected to the login page
        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/login")
    })

    test("Verify profile image upload", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)
        const filePath = "data\\images\\images.jfif" // Update with the actual path to your test image
        await profilePage.profileImageFileInput.setInputFiles(filePath)
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

        // Verify the profile image is updated (this will depend on how the application displays the uploaded image)
        // <div class="image d-flex"><img src="http://fiverrnew.cybersoft.edu.vn/avatar/23-02-2026-10-15-47-images.jfif" alt="avatar" class="w-100 avatar"></div>
        const uploadedImageSrc = await page
            .locator("div.image.d-flex img.avatar")
            .getAttribute("src")
        expect(uploadedImageSrc).toContain("images.jfif") // Assuming the uploaded image's filename is part of the src attribute
    })

    test("Verify update basic information successfully", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickEditButton()
        await page.waitForTimeout(1000)

        await profilePage.updateProfile({
            name: "Cang Nguyen",
            phone: "0987654321",
            birthday: "02/02/1992",
        })
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(3000)

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
        await page.waitForTimeout(1000)
        await profilePage.updateBirthday("invalid-date")
        await page.waitForTimeout(1000)
        await profilePage.clickSave()
        await page.waitForTimeout(2000)

        // Verify an error message is displayed for invalid birthday input
        const errorMessage = await page.locator(".text-danger").textContent()
        expect(errorMessage).toBe("Please enter a valid date.")
    })
})
