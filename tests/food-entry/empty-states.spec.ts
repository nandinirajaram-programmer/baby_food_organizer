// spec: tests/testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('UI/UX and Accessibility Tests', () => {
  test('Verify empty state messages are user-friendly', async ({ page }) => {
    await page.goto('https://nandinirajaram-programmer.github.io/baby_food_organizer/');

    // Click View History - should show empty state
    const historyBtn = page.getByRole('button', { name: /View History/ });
    await historyBtn.click();
    
    await expect(page.locator('text=No food entries yet')).toBeVisible();
    await expect(page.locator('text=Add your first food entry to get started!')).toBeVisible();

    // Click Favorites - should show empty state
    const favoritesBtn = page.getByRole('button', { name: /Favorites/ });
    await favoritesBtn.click();
    
    await expect(page.locator('text=No favorite foods yet')).toBeVisible();
    await expect(page.locator('text=Mark foods as favorites when adding them!')).toBeVisible();

    // Click Allergies - should show empty state
    const allergiesBtn = page.getByRole('button', { name: /Allergies/ });
    await allergiesBtn.click();
    
    await expect(page.locator('text=No allergens marked yet')).toBeVisible();
    await expect(page.locator('text=Mark foods as allergens to track them here!')).toBeVisible();
  });
});