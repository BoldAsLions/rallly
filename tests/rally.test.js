const { test, expect } = require('@playwright/test');

test.describe('Rallly Website Tests', () => {
 
// Test 1: Verify the homepage title
  test('Homepage has correct title', async ({ page }) => {
    await page.goto('https://www.rallly.co');
    await expect(page).toHaveTitle(/Rallly/);
  });

 // Test 2: Check if the "Get Started" button is visible
  test('"Get Started" button is visible', async ({ page }) => {
    await page.goto('https://www.rallly.co');
    const button = page.locator('text=Get Started');
    await expect(button).toBeVisible();
  });

// Test 3: Check if the "How It Works" button works 
test('"How It Works" button is visible', async ({ page }) => {
    await page.goto('https://www.rallly.co');
    const howItWorksButton = page.locator('text=How it Works'); 
    await expect(howItWorksButton).toBeVisible();
    await howItWorksButton.click();
    await expect(page).toHaveURL('https://support.rallly.co/workflow/create');
  });

// Test 4: Check if the "Pricing" page is accessible
test('Pricing page is accessible', async ({ page }) => {
    await page.goto('https://www.rallly.co', { waitUntil: 'networkidle'});
    const pricingLink = page.locator('a[href="/pricing"].inline-flex');
    await pricingLink.click();
    await expect(page).toHaveURL(/.*pricing/);
});

//Test 5: Verify that the "Meeting Poll" page is accessible
test('Meeting Poll page is accessible', async ({ page }) => {
    await page.goto('https://www.rallly.co');
    const pollLink = page.locator('text=Meeting Poll');
    await pollLink.click();
    await expect(page).toHaveURL(/meeting-poll/);
  });

  //Test 6: Verify that the website logo is visible and clickable
test('Rallly.co logo is clickable', async ({ page }) => {
    await page.goto('https://www.rallly.co');
    const logo = page.getByRole('link', { name: 'rallly.co' });
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL(/https:\/\/(www\.)?rallly\.co\/$/);
});
// Test 7: Ensure that the "Terms of Use" link is present in the footer
test('Terms of Use link is present', async ({ page }) => {
    await page.goto('https://www.rallly.co');
    await page.getByRole('link', { name: 'rallly.co' }).click();
    await page.getByRole('link', { name: 'Terms of Use' }).click();
});
// Test 8: End-2-End Test User Navigation and Subscription Flow 
test('Rallly website interaction flow', async ({ page }) => {
    await page.goto('https://www.rallly.co/');
    await page.getByRole('navigation').getByRole('link', { name: 'Pricing' }).click();
    await page.getByRole('tab', { name: 'Monthly' }).click();
    await expect(page.getByRole('heading', { name: 'Upgrade now, save later' })).toBeVisible();
    await page.locator('p').filter({ hasText: 'To upgrade, you can go to' }).getByRole('link').click();
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('heading', { name: 'Quick Create' }).click();
    await page.getByRole('link', { name: 'Create Group Poll' }).click();
    await page.getByLabel('Disable comments').click();
    await page.getByLabel('Make email address required').click();
    await page.getByRole('button', { name: 'Subscribe' }).click();

});

/// Test 9: End-2-End Test User Support Navigation Flow
test('Rallly Support Navigation flow', async ({ page }) => {
    await page.goto('https://www.rallly.co/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Terms of Use' }).click();
    await page.waitForLoadState('load');
    await page.goto('https://rallly.co/', { waitUntil: 'networkidle' });
    await page.getByRole('contentinfo').getByRole('link', { name: 'Support' }).click();
    await page.waitForLoadState('load');
    await page.locator('#navigation-items').getByRole('link', { name: 'FAQ' }).click();
    await page.locator('button').filter({ hasText: 'Is Rallly free?' }).click();
    await page.locator('button').filter({ hasText: 'How long will Rallly keep my' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Raise issue' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('link', { name: 'Forgot password?' }).click();
    });
  
});
