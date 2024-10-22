import { test, expect } from '@playwright/test';

test.describe('UserList', () => {
  test('should display users', async ({ page }) => {
    await page.setContent(`
      <div class="user-card">
        <img src="http://example.com/user1.png" alt="user1" />
        <span>user1</span>
      </div>
      <div class="user-card">
        <img src="http://example.com/user2.png" alt="user2" />
        <span>user2</span>
      </div>
    `);

    await expect(page.locator('.user-card')).toHaveCount(2);
  });

  test('should handle user click', async ({ page }) => {
    await page.setContent(`
      <div class="user-card">
        <span>user1</span>
      </div>
    `);

    await page.click('.user-card');
  });
});
