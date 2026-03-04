import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage"

test.describe("Search Functionality Tests", () => {
    test("Kiểm tra chức năng Search gig theo từ khóa", async ({ page }) => {
        const homePage = new HomePage(page)

        // 1. Truy cập trang
        await homePage.goto()

        // 2. Thực hiện search
        const keyword = "design"
        await homePage.search(keyword)

        // 3. Chờ load
        await page.waitForLoadState("networkidle")

        // 4. Verify URL chứa keyword
        await expect(page).toHaveURL(new RegExp(keyword))

        // 5. Verify có kết quả hiển thị
        await expect(homePage.gigItems.first()).toBeVisible()
    })

    test("Kiểm tra chức năng các gợi ý Popular được hiển thị", async ({
        page,
    }) => {
        const homePage = new HomePage(page)

        // 1. Vào trang chủ
        await homePage.goto()

        // 2. Verify section Popular hiển thị
        await expect(homePage.popularSection).toBeVisible()

        // 3. Verify có ít nhất 1 item
        const count = await homePage.popularItems.count()
        expect(count).toBeGreaterThan(0)

        // 4. Verify item đầu tiên có text và link
        await expect(homePage.popularItems.first()).toBeVisible()
    })

    test("Click vào Popular không làm thay đổi URL", async ({ page }) => {
        const homePage = new HomePage(page)

        await homePage.goto()

        // Đảm bảo Popular hiển thị
        await expect(homePage.popularSection).toBeVisible()

        const originalUrl = page.url()

        // Click vào item đầu tiên
        await homePage.popularItems.first().click()

        // Verify URL không thay đổi
        await expect(page).toHaveURL(originalUrl)
    })
})
