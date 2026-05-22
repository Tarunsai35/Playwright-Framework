import { test, expect } from "@playwright/test";
import { ProductPages } from "../Pages/Productpages";
import { BASE_URL, USERNAME, PASSWORD } from "../utlis/envConfig";
import { Loginpage } from "../Pages/loginpage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";
import { CheckoutData } from "../Test-data/Checkout";
import { CheckoutOverviewPage } from "../Pages/CheckoutOverviewPage";
import { CheckoutOverviewData } from "../Test-data/CheckoutOverview";

test.describe("CheckoutOverview Page Tests", () => {

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
    });

    test("validate Checkout Overview page elements", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutOverviewElements = await checkoutOverviewPage.getCheckoutOverviewElements();
        await expect(checkoutOverviewElements.checkoutOverviewTitle).toBeVisible();
        await expect(checkoutOverviewElements.finishButton).toBeVisible();
        await expect(checkoutOverviewElements.cancelButton).toBeVisible();
    });

    test("validate product details on Checkout Overview page", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutOverviewProductDetails = await checkoutOverviewPage.getCheckoutOverviewProductDetails();
        expect(checkoutOverviewProductDetails.productNames[0]).toBe(CheckoutOverviewData.productName);
        expect(checkoutOverviewProductDetails.productDescriptions[0]).toBe(CheckoutOverviewData.productDescription);
        expect(checkoutOverviewProductDetails.productPrices[0]).toBe(CheckoutOverviewData.productPrice);
    });

    test("validate total price calculation on Checkout Overview page", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const iteamTotal = await checkoutOverviewPage.getIteamTotal();
        const tax = await checkoutOverviewPage.getTax();
        const total = await checkoutOverviewPage.getTotal();
        const iteamTotalValue = parseFloat(iteamTotal.replace('Item total: $', ''));
        const taxValue = parseFloat(tax.replace('Tax: $', ''));
        const totalValue = parseFloat(total.replace('Total: $', ''));
        expect(totalValue).toBeCloseTo(iteamTotalValue + taxValue, 2);
    });

    test("validate cancel button functionality on Checkout Overview page", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.clickOnCancelButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test("validate finish button functionality on Checkout Overview page", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.clickOnFinishButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    });

    test("Validate Item total Calculation on Checkout Overview page", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const iteamTotal = await checkoutOverviewPage.getIteamTotal();
        const iteamTotalValue = parseFloat(iteamTotal.replace('Item total: $', ''));
        expect(iteamTotalValue).toBeCloseTo(29.99, 2);
    });

    test("Validate two products total Calculation on Checkout Overview page", async ({ page }) => {
        const productPages = new ProductPages(page);
        await page.pause();
        await productPages.addSpecificProductToCart(['Sauce Labs Bike Light', 'Sauce Labs Backpack']);
        await productPages.clickOnCartIcon();
        const cartPage = new CartPage(page);
        await cartPage.clickOnCheckoutButton();
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutForm(CheckoutData.firstName, CheckoutData.lastName, CheckoutData.postalCode);
        await checkoutPage.clickOnContinueButton();
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const iteamTotal = await checkoutOverviewPage.getIteamTotal();
        const iteamTotalValue = parseFloat(iteamTotal.replace('Item total: $', ''));
        expect(iteamTotalValue).toBeCloseTo(29.99 + 9.99, 2);
    });

    test.only("Validate Item total and Tax Calculation on Checkout Overview page", async ({ page }) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const iteamTotal = await checkoutOverviewPage.getIteamTotal();
        const tax = await checkoutOverviewPage.getTax();
        const iteamTotalValue = parseFloat(iteamTotal.replace('Item total: $', ''));
        const taxValue = parseFloat(tax.replace('Tax: $', ''));
        expect(iteamTotalValue).toBeCloseTo(29.99, 2);
        expect(taxValue).toBeCloseTo(2.40, 2);
    });



});