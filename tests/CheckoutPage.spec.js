import { test, expect } from "@playwright/test";
import { ProductPages } from "../Pages/Productpages";
import { BASE_URL, USERNAME, PASSWORD } from "../utlis/envConfig";
import { Loginpage } from "../Pages/loginpage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";
import { CheckoutData } from "../Test-data/Checkout";

test.describe("Checkout Page Tests", () => {

    test.beforeEach(async ({ page }) => {
        const loginpage = new Loginpage(page);
        await page.goto(BASE_URL);
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
        const productPages = new ProductPages(page);
        await productPages.addFirstProductToCart();
        await productPages.clickOnCartIcon();
    });

    test("validate Checkout page elements", async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckoutButton();
        const checkoutElements = await checkoutPage.getCheckoutPageElements();
        await expect(checkoutElements.checkoutTitle).toBeVisible();
        await expect(checkoutElements.firstNameInput).toBeVisible();
        await expect(checkoutElements.lastNameInput).toBeVisible();
        await expect(checkoutElements.postalCodeInput).toBeVisible();
        await expect(checkoutElements.continueButton).toBeVisible();
        await expect(checkoutElements.cancelButton).toBeVisible();
    });

    test("Validate Cancel button functionality on checkout page", async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckoutButton();
        await checkoutPage.clickOnCancelButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test("Validate Continue button functionality on checkout page", async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckoutButton();
        await checkoutPage.fillCheckoutForm(CheckoutData.firstName, CheckoutData.lastName, CheckoutData.postalCode);
        await checkoutPage.clickOnContinueButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test("Validate error message on checkout page with empty form submission", async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckoutButton();
        await checkoutPage.clickOnContinueButton();
        const errorMessage = await checkoutPage.getErrorMessage();
        await expect(errorMessage).toBe('Error: First Name is required');
    });






});