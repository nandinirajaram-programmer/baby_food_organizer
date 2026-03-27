// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('History Section Functionality', () => {
  test('Delete food entry from history', async ({ page }) => {
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Add a food entry
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Test Food');
    
    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('100');
    
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Click 'View History' to display entries
    const historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();

    // Verify Test Food entry is visible with a Delete button
    await expect(page.locator('text=Test Food')).toBeVisible();
    const deleteBtn = page.getByRole('button', { name: /Delete/ });
    await expect(deleteBtn).toBeVisible();

    // Click the 'Delete' button
    await deleteBtn.click();

    // Verify the entry is no longer in history
    await expect(page.locator('text=Test Food')).not.toBeVisible();
  });
});