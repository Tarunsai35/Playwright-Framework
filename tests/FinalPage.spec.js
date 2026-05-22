import { test, expect } from "@playwright/test";
import { ProductPages } from "../Pages/Productpages";
import { BASE_URL, USERNAME, PASSWORD } from "../utlis/envConfig";
import { Loginpage } from "../Pages/loginpage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";
import { CheckoutData } from "../Test-data/Checkout";
import { CheckoutOverviewPage } from "../Pages/CheckoutOverviewPage";
import { CheckoutOverviewData } from "../Test-data/CheckoutOverview";
import { FinalPage } from "../Pages/FinalPage";
import { FinalPageLocators } from "../Locators/FinalPageLocators";

test.describe("Final Page Tests", () => {

    test.beforeEach(async ({ page }) => {
        const loginpage = new Loginpage(page);
        await page.goto(BASE_URL);
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
        const productPages = new ProductPages(page);
        await productPages.addFirstProductToCart();
        await productPages.clickOnCartIcon();
        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckoutButton();
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutForm(CheckoutData.firstName, CheckoutData.lastName, CheckoutData.postalCode);
        await checkoutPage.clickOnContinueButton();
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.clickOnFinishButton();
    });

    test("validate Final page elements", async ({ page }) => {
        const finalPage = new FinalPage(page);
        const finalPageElements = await finalPage.getFinalPageElement();
        await expect(finalPageElements.finalPageTitle).toBeVisible();
        await expect(finalPageElements.finalPageText).toBeVisible();
        await expect(finalPageElements.finalPageImage).toBeVisible();
        await expect(finalPageElements.backHomeButton).toBeVisible();
    });

    test("validate the Final page Success text", async ({ page }) => {
        const finalPage = new FinalPage(page);
        const finalPageText = await finalPage.getFinalPageText();
        await expect(finalPageText).toBe('Thank you for your order!');
    });

    test("validate the Final page image", async ({ page }) => {
        const finalPage = new FinalPage(page);
        const isImageVisible = await finalPage.isFinalPageImageVisible();
        expect(isImageVisible).toBe(true);
    });

    test("validate the Back Home button functionality", async ({ page }) => {
        const finalPage = new FinalPage(page);
        await finalPage.clickBackHomeButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });




});