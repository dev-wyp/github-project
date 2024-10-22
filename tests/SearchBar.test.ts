import { test, expect } from '@playwright/test';

test.describe('SearchBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
  });

  test('should allow input of search query', async ({ page }) => {
    await page.fill('input[placeholder="Search Users..."]', 'test');
    await expect(
      page.locator('input[placeholder="Search Users..."]')
    ).toHaveValue('test');
  });

  test('should trigger search on button click', async ({ page }) => {
    await page.fill('input[placeholder="Search Users..."]', 'test');
    await page.click('button:text("Search")');
  });
});
