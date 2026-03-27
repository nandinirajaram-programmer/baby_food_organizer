// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Food Entry Form - Happy Path', () => {
  test('Add food entry and mark as allergen', async ({ page }) => {
    // Navigate to the Baby Food Tracker application
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');
    
    // Verify Application loads successfully
    const addFoodBtn = page.getByRole('button', { name: /Add Food/ });
    await expect(addFoodBtn).toBeVisible();

    // Enter 'Peanut Butter' in the Food Name field
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Peanut Butter');

    // Enter '50' in the Portion Size field
    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('50');

    // Check the 'Mark as Allergen' checkbox
    const allergenCheckbox = page.getByRole('checkbox', { name: 'Mark as Allergen' });
    await allergenCheckbox.check();
    await expect(allergenCheckbox).toBeChecked();

    // Click the 'Add Food Entry' button
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();

    // Verify success message is displayed
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Click on the '⚠️ Allergies' button
    const allergiesBtn = page.getByRole('button', { name: /Allergies/ });
    await allergiesBtn.click();

    // Verify Allergies section is displayed
    // Verify Peanut Butter appears with warning icon
    await expect(page.locator('text=⚠️ Peanut Butter')).toBeVisible();

    // Verify Last given date/time is shown
    await expect(page.locator('text=Last given:')).toBeVisible();

    // Verify Last portion (50 ml) is displayed
    await expect(page.locator('text=Last portion: 50 ml')).toBeVisible();

    // Verify Times given counter shows '1'
    await expect(page.locator('text=Times given: 1')).toBeVisible();
  });
});