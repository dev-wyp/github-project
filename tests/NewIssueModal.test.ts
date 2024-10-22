import { test, expect } from '@playwright/test';

test.describe('NewIssueModal Component', () => {
  test('should open modal, allow issue creation, and handle cancellation', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/user/dev-wyp/repo/cv-template');

    const newIssueButton = page.locator('button:text("New Issue")');
    await newIssueButton.click();

    const modal = page.locator('.new-issue-modal');
    await expect(modal).toBeVisible();

    const titleInput = modal.locator('input[placeholder="Title"]');
    const descriptionTextarea = modal.locator(
      'textarea[placeholder="Description"]'
    );

    await titleInput.fill('Test Issue Title');
    await descriptionTextarea.fill('This is a description for the test issue.');

    await expect(titleInput).toHaveValue('Test Issue Title');
    await expect(descriptionTextarea).toHaveValue(
      'This is a description for the test issue.'
    );

    const createButton = modal.locator('button.create-button');
    await expect(createButton).toBeVisible();
    await createButton.click();

    await expect(modal).not.toBeVisible();

    await newIssueButton.click();
    await expect(modal).toBeVisible();

    const cancelButton = modal.locator('button.cancel-button');
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();

    await expect(modal).not.toBeVisible();
  });
});
