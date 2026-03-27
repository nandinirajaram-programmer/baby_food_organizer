// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('History Section Functionality', () => {
  test('View History displays all added food entries', async ({ page }) => {
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Add first food entry
    let foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Banana');
    
    let portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('100');
    
    let addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Add second food entry
    foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Apple');
    
    portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('120');
    
    addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Add third food entry
    foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await foodNameInput.fill('Carrot');
    
    portionInput = page.getByPlaceholder('Amount');
    await portionInput.fill('150');
    
    addBtn = page.getByRole('button', { name: 'Add Food Entry' });
    await addBtn.click();
    await expect(page.locator('text=✓ Food added successfully!')).toBeVisible();

    // Click on 'View History' button
    const historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();

    // Verify all 3 entries are displayed
    await expect(page.locator('text=Banana')).toBeVisible();
    await expect(page.locator('text=Apple')).toBeVisible();
    await expect(page.locator('text=Carrot')).toBeVisible();

    // Verify portion sizes with units are displayed
    await expect(page.locator('text=100 ml')).toBeVisible();
    await expect(page.locator('text=120 ml')).toBeVisible();
    await expect(page.locator('text=150 ml')).toBeVisible();
  });
});