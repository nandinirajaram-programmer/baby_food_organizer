// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Data Persistence and Storage', () => {
  test('Data persists across page refresh', async ({ page }) => {
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Add a food entry
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Persistent Food');
    
    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('200');
    
    const favoriteCheckbox = page.getByRole('checkbox', { name: 'Save as Favorite' });
    await favoriteCheckbox.check();
    
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Verify entry is visible in History
    const historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();
    await expect(page.locator('text=Persistent Food')).toBeVisible();

    // Refresh the page
    await page.reload();

    // Navigate back to application
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Click View History and verify entry still exists
    const historyBtnAfter = page.getByRole('button', { name: /View History/ });
    await historyBtnAfter.click();
    
    // Check that the entry persisted
    await expect(page.locator('text=Persistent Food')).toBeVisible();
    await expect(page.locator('text=200 ml')).toBeVisible();

    // Verify favorite still exists
    const favoritesBtn = page.getByRole('button', { name: /Favorites/ });
    await favoritesBtn.click();
    await expect(page.locator('text=Persistent Food')).toBeVisible();
  });
});