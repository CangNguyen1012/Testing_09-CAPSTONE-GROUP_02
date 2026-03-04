import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ProfilePage } from "../pages/ProfilePage"

test.describe("Gig Management Tests", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await page.waitForTimeout(2000)

        await loginPage.gotoLoginPage()
        await loginPage.login("testuser123@gmail.com", "cang@1012")
        await page.waitForTimeout(2000)

        await expect(page).toHaveURL("https://demo4.cybersoft.edu.vn/profile")
        await page.waitForTimeout(2000)
    })
    test("Create a new gig", async ({ page }) => {
        const profilePage = new ProfilePage(page)
        await profilePage.clickCreateGig()
        await page.waitForTimeout(2000)
        await expect(page).toHaveURL(
            "https://demo4.cybersoft.edu.vn/gig/create",
        )
    })
})
