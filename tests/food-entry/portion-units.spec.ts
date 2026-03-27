// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Food Entry Form - Happy Path', () => {
  test('Add food entry with different portion size units', async ({ page }) => {
    // Navigate to the Baby Food Tracker application
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');
    
    // Verify Application loads
    const addFoodBtn = page.getByRole('button', { name: /Add Food/ });
    await expect(addFoodBtn).toBeVisible();

    // Enter 'Carrot Puree' in the Food Name field and '75' in portion size
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Carrot Puree');

    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('75');

    // Click on the portion unit dropdown
    const unitDropdown = page.getByRole('combobox');
    await unitDropdown.click();

    // Verify Dropdown opens showing options
    const ozOption = page.getByRole('option', { name: 'oz' });
    await expect(ozOption).toBeVisible();

    // Select 'oz' from the dropdown
    await unitDropdown.selectOption('oz');

    // Click 'Add Food Entry' button
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();

    // Verify success message is displayed
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Click on 'View History' button
    const historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();

    // Verify History is displayed and shows '75 oz' as portion size
    await expect(page.locator('text=Carrot Puree')).toBeVisible();
    await expect(page.locator('text=75 oz')).toBeVisible();
  });
});