import { test, expect } from '@playwright/test';

test.describe('UserReposPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/config/api/getUserRepos**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: 1, name: 'repo1', stargazers_count: 5, watchers_count: 3 },
          { id: 2, name: 'repo2', stargazers_count: 10, watchers_count: 6 },
        ]),
      });
    });

    await page.route('**/config/api/getUserDetails**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ data: { public_repos: 20 } }),
      });
    });

    await page.goto('http://localhost:5173/user/dev-wyp');
    await page.waitForLoadState('networkidle');
  });

  test('should display user repositories and handle pagination', async ({
    page,
  }) => {
    const repoItems = await page.locator('.repo-item');
    expect(await repoItems.count()).toBe(10);

    const repo1 = repoItems.nth(0);
    expect(await repo1.textContent()).toContain('cv-template');
    expect(await repo1.textContent()).toContain('0 ★');
    expect(await repo1.textContent()).toContain('0 👁️');

    const paginationButtons = await page.locator('.pagination-button');
    expect(await paginationButtons.count()).toBeGreaterThan(0);

    await paginationButtons.nth(1).click();
    await page.waitForLoadState('networkidle');

    await page.route('**/config/api/getUserRepos**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    await expect(repoItems).toHaveCount(2);
  });

  test('should navigate to repository details on selecting a repository', async ({
    page,
  }) => {
    await page.waitForSelector('.repo-item', {
      state: 'visible',
      timeout: 60000,
    });
    await page.click('.repo-item');
    await expect(page).toHaveURL(/\/user\/dev-wyp\/repo\/.*/);
  });
});
