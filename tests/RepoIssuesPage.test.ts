import { test, expect } from '@playwright/test';

test.describe('RepoIssuesPage Component', () => {
  test('should display issues for the repo and allow creating a new issue', async ({
    page,
  }) => {
    const username = 'dev-wyp';
    const repoName = 'cv-template';

    await page.goto(`http://localhost:5173/user/${username}/repo/${repoName}`);

    const issueList = page.locator('.issue-list');
    await expect(issueList).toBeVisible();

    await page.click('button:has-text("New Issue")');

    const modal = page.locator('.new-issue-modal');
    await expect(modal).toBeVisible();
  });
});
