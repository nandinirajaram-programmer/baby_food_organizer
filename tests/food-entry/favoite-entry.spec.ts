// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Food Entry Form - Happy Path', () => {
  test('Add food entry and mark as favorite', async ({ page }) => {
    // Navigate to the Baby Food Tracker application
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');
    
    // Verify Application loads with Add Food section active
    const addFoodBtn = page.getByRole('button', { name: /Add Food/ });
    await expect(addFoodBtn).toBeVisible();

    // Enter 'Banana Puree' in the Food Name field
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Banana Puree');

    // Enter '100' in the Portion Size field
    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('100');

    // Check the 'Save as Favorite' checkbox
    const favoriteCheckbox = page.getByRole('checkbox', { name: 'Save as Favorite' });
    await favoriteCheckbox.check();
    await expect(favoriteCheckbox).toBeChecked();

    // Click the 'Add Food Entry' button
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();

    // Verify success message is displayed
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Click on the '⭐ Favorites' button
    const favoritesBtn = page.getByRole('button', { name: /Favorites/ });
    await favoritesBtn.click();

    // Verify Favorites section is displayed
    await expect(page.locator('text=Banana Puree')).toBeVisible();

    // Verify counter shows 'Fed 1x'
    await expect(page.locator('text=Fed 1x')).toBeVisible();

    // Verify last portion '100 ml' is shown
    await expect(page.locator('text=Last: 100 ml')).toBeVisible();
  });
});