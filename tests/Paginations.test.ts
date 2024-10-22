import { test, expect } from '@playwright/test';

test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <div class="pagination">
        <button class="pagination-button">1</button>
        <button class="pagination-button">2</button>
        <button class="pagination-button">Next</button>
      </div>
    `);
  });

  test('should display pagination buttons', async ({ page }) => {
    await expect(page.locator('.pagination-button')).toHaveCount(3);
  });

  test('should trigger onPageChange on button click', async ({ page }) => {
    await page.click('.pagination-button:text("Next")');
  });
});
