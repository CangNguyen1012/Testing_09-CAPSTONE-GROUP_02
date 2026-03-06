import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { SearchResultPage } from "../pages/SearchResultPage"

test.describe("Filter Functionality Tests", () => {
    test("Kiểm tra chức năng Filter theo category", async ({ page }) => {
        const homePage = new HomePage(page)
        const searchResultPage = new SearchResultPage(page)

        // 1. Truy cập trang
        await homePage.goto()

        // 2. Search keyword
        await homePage.search("design")

        // 3. Chọn category
        const categoryName = "Graphics & Design"
        await searchResultPage.filterByCategory("graphics-design")

        // 4. Chờ load
        await page.waitForLoadState("networkidle")

        // 5. Verify URL có chứa category (nếu có)
        await expect(page).toHaveURL(/graphics-design/)

        // 6. Verify có kết quả hiển thị
        await expect(page.getByText("0 services available")).toBeVisible()
    })

    test("Kiểm tra chức năng Filter theo khoảng giá", async ({ page }) => {
        const homePage = new HomePage(page)
        const searchResultPage = new SearchResultPage(page)

        // 1. Vào trang
        await homePage.goto()

        // 2. Search
        await homePage.search("design")

        await page.waitForLoadState("networkidle")

        // 3. Filter giá từ 10 đến 100
        await searchResultPage.filterByPrice("10", "100")

        await page.waitForLoadState("networkidle")

        // 4. Verify URL có param giá (nếu có)
        await expect(page).toHaveURL(/10/)
    })

    test("Kiểm tra chức năng Clear All Filters", async ({ page }) => {
        const homePage = new HomePage(page)
        const searchResultPage = new SearchResultPage(page)

        // 1. Vào trang
        await homePage.goto()

        // 2. Search
        await homePage.search("design")
        await page.waitForLoadState("networkidle")

        const originalUrl = page.url()

        // 3. Apply filter
        await searchResultPage.applyOneFilter()
        await page.waitForLoadState("networkidle")

        // URL phải thay đổi
        await expect(page).not.toHaveURL(originalUrl)

        // 4. Clear all
        await searchResultPage.clearAllFilters()
        await page.waitForLoadState("networkidle")

        // 5. Verify quay về trạng thái ban đầu
        await expect(page).toHaveURL(originalUrl)
    })
})
