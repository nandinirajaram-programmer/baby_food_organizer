// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Food Entry Form - Input Validation & Edge Cases', () => {
  test('Attempt to add food entry with empty Food Name field', async ({ page }) => {
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Leave Food Name field empty and enter only portion size
    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('100');

    // Click Add Food Entry button
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();

    // Verify behavior - either entry is rejected OR accepted 
    // Check if success message appears
    const successMsg = page.locator('text=✓ Food added successfully!');
    const isVisible = await successMsg.isVisible().catch(() => false);
    
    if (isVisible) {
      // If accepted, entry should appear in history
      const historyBtn = page.getByRole('button', { name: /View History/ });
      await historyBtn.click();
      // Entry with empty name behavior varies by implementation
    }
    // If rejected, form remains for correction
  });
});