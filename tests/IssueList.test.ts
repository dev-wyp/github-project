import { test, expect } from '@playwright/test';

test.describe('IssueList Component', () => {
  test('should display a list of issues and handle new issue creation', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/user/dev-wyp/repo/cv-template');

    await page.waitForSelector('.issue-list', { timeout: 60000 });

    const issueItem = page.locator(`.issue-item:has-text("Test1")`);
    await expect(issueItem).toContainText('Test1');
    await expect(issueItem).toContainText('by dev-wyp');

    const newIssueButton = page.locator('button:has-text("New Issue")');
    await expect(newIssueButton).toBeVisible();

    await newIssueButton.click();
  });
});
