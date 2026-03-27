// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and Section Switching', () => {
  test('Navigate between all four sections smoothly', async ({ page }) => {
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Verify Add Food section is active
    let addFoodBtn = page.getByRole('button', { name: /Add Food/ });
    await expect(addFoodBtn).toBeVisible();

    // Click View History button
    let historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();
    await expect(page.locator('text=No food entries yet')).toBeVisible();

    // Click Favorites button
    let favoritesBtn = page.getByRole('button', { name: /Favorites/ });
    await favoritesBtn.click();
    await expect(page.locator('text=No favorite foods yet')).toBeVisible();

    // Click Allergies button
    let allergiesBtn = page.getByRole('button', { name: /Allergies/ });
    await allergiesBtn.click();
    await expect(page.locator('text=No allergens marked yet')).toBeVisible();

    // Click back to Add Food
    addFoodBtn = page.getByRole('button', { name: /Add Food/ });
    await addFoodBtn.click();
    
    // Verify form is displayed
    const foodNameInput = page.getByRole('textbox', { name: 'Food Name' });
    await expect(foodNameInput).toBeVisible();
  });
});