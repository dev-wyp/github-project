import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
  });

  test('should load HomePage with search bar', async ({ page }) => {
    await expect(
      page.locator('input[placeholder="Search Users..."]')
    ).toBeVisible();
  });

  test('should search users and display results', async ({ page }) => {
    await page.fill('input[placeholder="Search Users..."]', 'test');
    await page.click('button:text("Search")');
    await page.waitForSelector('.user-card');
    await expect(page.locator('.user-card')).toHaveCount(10);
  });

  test('should handle pagination', async ({ page }) => {
    await page.fill('input[placeholder="Search Users..."]', 'test');
    await page.click('button:text("Search")');
    await page.waitForSelector('.pagination-button');
    const totalPages = await page.locator('.pagination-button').count();
    expect(totalPages).toBeGreaterThan(1);
    await page.click('.pagination-button:text("Next")');
    await expect(page.locator('.pagination-button.active')).toHaveText('2');
  });

  test('should navigate to user profile on user card click', async ({
    page,
  }) => {
    await page.fill('input[placeholder="Search Users..."]', 'test');
    await page.click('button:text("Search")');
    await page.waitForSelector('.user-card');
    await page.click('.user-card');
    await expect(page).toHaveURL(/\/user\/.*/);
  });
});
