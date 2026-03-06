import test, { expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { highLightAndScreenshot } from "../utils/screenshot";
import { HomePage } from "../pages/HomePage";
import { ListGigsPage } from "../pages/ListGigsPage";
import { GigDetail } from "../pages/GigDetail";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";

test.describe("Home Page tests", () => {
  test("Verify search button", async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.goto();

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
  test("Xem chi tiết gig", async ({ page }) => {
    const homePage = new HomePage(page);
    const listGigsPage = new ListGigsPage(page);
    const gigDetail = new GigDetail(page);
    homePage.goto();
    await page.waitForTimeout(3000);

    homePage.header.hoverCategory("Digital Marketing");
    homePage.header.clickSubCategory(
      "Digital  Marketing",
      "Social Media Marketing"
    );
    await listGigsPage.waitForGigListLoaded();
    await listGigsPage.clickGig(0);
    await page.waitForTimeout(3000);

    gigDetail.expectGigDetailLoaded(
      "I will write simple and interesting content for your website",
      "My name is Kristina; I am not only a freelance writer but a professional basketball player too."
    );
  });

  test("Mua gig thất bại", async ({ page }) => {
    const homePage = new HomePage(page);

    const listGigsPage = new ListGigsPage(page);
    const gigDetail = new GigDetail(page);
    homePage.goto();
    await page.waitForTimeout(3000);

    homePage.header.hoverCategory("Digital Marketing");
    homePage.header.clickSubCategory(
      "Digital  Marketing",
      "Social Media Marketing"
    );
    await listGigsPage.waitForGigListLoaded();
    await listGigsPage.clickGig(0);
    await page.waitForTimeout(3000);

    gigDetail.clickPurchaseButton();
    gigDetail.expectPurchaseButtonClickFail();
  });

  test("Mua gig thành công", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("gepeidoukafou-7756@yopmail.com", "123456789");
    await page.waitForTimeout(3000);
    const listGigsPage = new ListGigsPage(page);
    const gigDetail = new GigDetail(page);
    homePage.goto();
    await page.waitForTimeout(3000);

    homePage.header.hoverCategory("Digital Marketing");
    homePage.header.clickSubCategory(
      "Digital  Marketing",
      "Social Media Marketing"
    );
    await listGigsPage.waitForGigListLoaded();
    await listGigsPage.clickGig(0);
    await page.waitForTimeout(3000);

    gigDetail.clickPurchaseButton();
    await page.waitForTimeout(3000);
    gigDetail.expectPurchaseButtonClickSuccess();
  });
  test("Xem chi tiết gig t", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    await loginPage.goto();
    await loginPage.login("gepeidoukafou-7756@yopmail.com", "123456789");
    await page.waitForTimeout(3000);
    homePage.header.clickUserProfile();
    await page.waitForTimeout(3000);
    profilePage.showGigDetail();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL("/jobDetail");
  });
});
