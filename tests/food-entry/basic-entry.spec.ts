// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Food Entry Form - Happy Path', () => {
  test('Add basic food entry with required fields', async ({ page }) => {
    // Navigate to the Baby Food Tracker application at https://nandinirajaram-programmer.github.io/baby_food_organizer/
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');
    
    // Verify page title shows 'Baby Food Tracker'
    await expect(page).toHaveTitle(/Baby Food Tracker/);
    
    // Verify Add Food button is active/visible
    const addFoodBtn = page.getByRole('button', { name: /Add Food/ });
    await expect(addFoodBtn).toBeVisible();
    
    // Verify Food entry form is displayed
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await expect(foodNameInput).toBeVisible();

    // Enter 'Apple Puree' in the Food Name field
    await foodNameInput.fill('Apple Puree');
    await expect(foodNameInput).toHaveValue('Apple Puree');

    // Enter '120' in the Portion Size field
    const portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('120');
    await expect(portionInput).toHaveValue('120');

    // Verify that Time Fed field auto-populates with current date and time
    const timeFedInput = page.getByRole('textbox', { name: 'Time Fed' });
    const timeValue = await timeFedInput.inputValue();
    expect(timeValue).toBeTruthy();
    expect(timeValue).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/); // ISO format

    // Verify that Portion Size unit dropdown defaults to 'ml'
    const unitDropdown = page.getByRole('combobox');
    const selectedUnit = await unitDropdown.locator('option[selected]').textContent();
    expect(selectedUnit).toContain('ml');

    // Click the 'Add Food Entry' button
    const addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();

    // Verify success message is displayed
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Verify Food Name field is cleared
    await expect(foodNameInput).toHaveValue('');

    // Verify the entry appears in View History
    const historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();
    
    // Check that Apple Puree entry is visible in history
    await expect(page.locator('text=Apple Puree')).toBeVisible();
    await expect(page.locator('text=120 ml')).toBeVisible();
  });
});