import { test, expect } from "@playwright/test";
import { ProductPages } from "../Pages/Productpages";
import { BASE_URL, USERNAME, PASSWORD } from "../utlis/envConfig";
import { Loginpage } from "../Pages/loginpage";
import { ProductPage } from "../Locators/ProductPagelocators";
import { ProductData } from "../Test-data/Products";
import { CartPage } from "../Pages/CartPage";

test.describe("Product Page Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginpage = new Loginpage(page);
    await page.goto(BASE_URL);
    await loginpage.login(USERNAME, PASSWORD);
  });

  test("Logout from the application", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test("validate cart page Url and Ui Elements ", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.addFirstProductToCart();
    await productPages.clickOnCartIcon();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartPage = new CartPage(page);
    const { cartTitle, checkoutButton, continueShoppingButton } = await cartPage.getCartPageElements();
    await expect(cartTitle).toBeVisible();
    await expect(checkoutButton).toBeVisible();
    await expect(continueShoppingButton).toBeVisible();

  });

  test("validate continue shopping button functionality", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.addFirstProductToCart();
    await productPages.clickOnCartIcon();
    const cartPage = new CartPage(page);
    await page.pause();
    await cartPage.clickOnContinueShoppingButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test("validate Single product in cart page", async ({ page }) => {
    const productPages = new ProductPages(page);
    const firstProduct = await productPages.getFirstProductDetails();
    await productPages.addFirstProductToCart();
    await productPages.clickOnCartIcon();
    const cartPage = new CartPage(page);
    const { productNames, productDescriptions, productPrices } = await cartPage.getCartProductDetails();
    expect(productNames[0]).toBe(firstProduct.name);
    expect(productDescriptions[0]).toBe(firstProduct.description);
    expect(productPrices[0]).toBe(firstProduct.price);

  });

  test("validate All product Added in cart page", async ({ page }) => {
    const productPages = new ProductPages(page);
    await page.pause();
    await productPages.addAllProductsToCart();
    await productPages.clickOnCartIcon();
    const cartPage = new CartPage(page);
    const { productNames, productDescriptions, productPrices } = await cartPage.getCartProductDetails();
    expect(productNames.length).toBe(ProductData.length);
    expect(productDescriptions.length).toBe(ProductData.length);
    expect(productPrices.length).toBe(ProductData.length);

  });

  test("validate Specific product added in cart page", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.addSpecificProductToCart(ProductData[0].name);
    await productPages.clickOnCartIcon();
    const cartPage = new CartPage(page);
    const { productNames, productDescriptions, productPrices } = await cartPage.getCartProductDetails();
    expect(productNames[0]).toBe(ProductData[0].name);

  });

  test.only("validate remove button functionality in cart page", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.addFirstProductToCart();
    await productPages.clickOnCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.removeFirstProduct();
    const { productNames } = await cartPage.getCartProductDetails();
    expect(productNames.length).toBe(0);
  });


});