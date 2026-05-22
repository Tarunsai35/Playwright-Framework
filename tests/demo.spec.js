import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://jcibe--eodbprjcts.sandbox.my.site.com/Solution/');
  await page.locator('iframe[title="Cookie Consent Notice"]').contentFrame().getByRole('button', { name: 'Decline All' }).click();
  await page.locator('div').filter({ hasText: /^Sign In$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dinesh.ede@jci.com.hn.eodbprjcts');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Dinesh@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('Dinesh Ede - H3 HVAC Parts,').click();
  await page.getByRole('button', { name: 'H3 HVAC Parts, LLC.' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});