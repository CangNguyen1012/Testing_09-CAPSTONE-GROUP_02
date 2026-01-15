import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { highLightAndScreenshot } from "../utils/screenshot";

test.describe("Home Page tests", () => {
  test("Verify search button", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await page.waitForTimeout(3000);
    // <button class="btn btn-success" type="submit">Search</button>
    const searchButton = page.getByRole("button", { name: "Search" });
    await highLightAndScreenshot(
      page,
      searchButton,
      "HomePageTest",
      "SearchButtonVisible"
    );
    await expect(searchButton).toBeVisible();
    await page.waitForTimeout(2000);
  });
});
