import { test, expect } from '@playwright/test';

test.describe('App routing tests', () => {
  test('should display HomePage at the root path', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should display UserReposPage when navigating to /user/:username', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/user/dev-wyp');

    await expect(page.locator('text=Repositories for dev-wyp')).toBeVisible();
  });

  test('should display RepoIssuesPage when navigating to /user/:username/repo/:repoName', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/user/dev-wyp/repo/cv-template');

    await expect(page.locator('text=Issues for cv-template')).toBeVisible();
  });
});
