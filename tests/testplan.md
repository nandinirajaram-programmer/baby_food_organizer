# Baby Food Organizer Test Plan

## Application Overview

The Baby Food Tracker application is a web-based tool designed to help parents and caregivers track baby food intake, manage portion sizes, mark allergens, and maintain a list of favorite foods. The application provides four main sections: Add Food (data entry), View History (all entries), Favorites (frequently used foods), and Allergies (allergen tracking). Users can input food name, time fed, portion size with various units, and special attributes like favorite status and allergen marking. The app persists data and provides visual feedback for user actions.

## Test Scenarios

### 1. Food Entry Form - Happy Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add basic food entry with required fields

**File:** `tests/food-entry/basic-entry.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application at https://nandinirajaram-programmer.github.io/baby_food_organizer/
    - expect: Page title shows 'Baby Food Tracker'
    - expect: Add Food button is active/visible
    - expect: Food entry form is displayed
  2. Enter 'Apple Puree' in the Food Name field
    - expect: Text 'Apple Puree' is entered in the Food Name field
  3. Enter '120' in the Portion Size field
    - expect: Value '120' is displayed in the portion size spinbutton
  4. Verify that Time Fed field auto-populates with current date and time
    - expect: Time Fed field displays a valid datetime in format like '3/27/2026 11:55 PM'
  5. Verify that Portion Size unit dropdown defaults to 'ml'
    - expect: Unit dropdown shows 'ml' as the selected option
  6. Click the 'Add Food Entry' button
    - expect: Success message '✓ Food added successfully!' is displayed
    - expect: Food Name field is cleared
    - expect: The entry appears in View History

#### 1.2. Add food entry and mark as favorite

**File:** `tests/food-entry/favorite-entry.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads with Add Food section active
  2. Enter 'Banana Puree' in the Food Name field
    - expect: Food name is entered
  3. Enter '100' in the Portion Size field
    - expect: Portion size is set to 100
  4. Check the 'Save as Favorite' checkbox
    - expect: Checkbox is checked/selected
  5. Click the 'Add Food Entry' button
    - expect: Success message is displayed
    - expect: Entry is saved and confirmed
  6. Click on the '⭐ Favorites' button
    - expect: Favorites section is displayed
    - expect: Banana Puree appears in the favorites list with count 'Fed 1x'
    - expect: Last portion '100 ml' is shown

#### 1.3. Add food entry and mark as allergen

**File:** `tests/food-entry/allergen-entry.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads successfully
  2. Enter 'Peanut Butter' in the Food Name field
    - expect: Food name is entered
  3. Enter '50' in the Portion Size field
    - expect: Portion size is set
  4. Check the 'Mark as Allergen' checkbox
    - expect: Checkbox is marked/selected
  5. Click the 'Add Food Entry' button
    - expect: Success message is displayed
    - expect: Entry is saved
  6. Click on the '⚠️ Allergies' button
    - expect: Allergies section is displayed
    - expect: Peanut Butter appears with warning icon (⚠️)
    - expect: Last given date/time is shown
    - expect: Last portion (50 ml) is displayed
    - expect: Times given counter shows '1'

#### 1.4. Add food entry with different portion size units

**File:** `tests/food-entry/portion-units.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads
  2. Enter 'Carrot Puree' in the Food Name field and '75' in portion size
    - expect: Food name and portion are entered
  3. Click on the portion unit dropdown
    - expect: Dropdown opens showing options: ml, oz, grams, tbsp, tsp, cups, pieces
  4. Select 'oz' from the dropdown
    - expect: 'oz' is selected as the unit
  5. Click 'Add Food Entry' button
    - expect: Success message is displayed
    - expect: Entry is saved
  6. Click on 'View History' button
    - expect: History is displayed
    - expect: The entry shows '75 oz' as the portion size

#### 1.5. Add multiple food entries with different units (grams, tbsp, tsp, cups, pieces)

**File:** `tests/food-entry/all-units.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker and add food entry with 'Rice Cereal' and 30 grams
    - expect: Entry with '30 grams' is saved and visible in history
  2. Add food entry with 'Applesauce' and 2 tbsp
    - expect: Entry with '2 tbsp' is saved
  3. Add food entry with 'Honey' and 1 tsp
    - expect: Entry with '1 tsp' is saved
  4. Add food entry with 'Juice' and 0.5 cups
    - expect: Entry with '0.5 cups' is saved
  5. Add food entry with 'Berries' and 10 pieces
    - expect: Entry with '10 pieces' is saved
  6. View History and verify all entries are displayed with correct units
    - expect: All five entries are listed with their respective portion units

### 2. Food Entry Form - Input Validation & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 2.1. Attempt to add food entry with empty Food Name field

**File:** `tests/validation/empty-name.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads successfully
  2. Leave Food Name field empty and enter only portion size '100'
    - expect: Food Name field remains empty
  3. Click 'Add Food Entry' button
    - expect: Entry is either rejected or error message is displayed (application validation behavior)
    - expect: OR entry is accepted and appears in history (if no validation required)

#### 2.2. Test with special characters in Food Name

**File:** `tests/validation/special-characters.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads
  2. Enter '@#$%Banana^&*' in the Food Name field
    - expect: Special characters are accepted in the field
  3. Enter '100' in Portion Size and click 'Add Food Entry'
    - expect: Entry is saved successfully
    - expect: Special characters are displayed as entered in history

#### 2.3. Test with very long food name (100+ characters)

**File:** `tests/validation/long-name.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads
  2. Enter a very long food name (100+ characters) in the Food Name field
    - expect: Text is accepted and displayed in the field
  3. Enter '100' in Portion Size and click 'Add Food Entry'
    - expect: Entry is saved
    - expect: Long name is either truncated in history or wraps to multiple lines

#### 2.4. Test with zero and negative portion sizes

**File:** `tests/validation/zero-negative-portions.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads
  2. Enter 'Milk' in Food Name and '0' in Portion Size
    - expect: Values are entered
  3. Click 'Add Food Entry' button
    - expect: Entry may be rejected with validation message OR accepted (depends on application logic)
  4. Try to enter '-50' in Portion Size field
    - expect: Negative value is either accepted or rejected at the form level

#### 2.5. Test updating time manually to past date

**File:** `tests/validation/past-date.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads
  2. Click on the 'Time Fed' field
    - expect: DateTime picker opens or field becomes editable
  3. Set a date to March 1, 2026 at 8:00 AM
    - expect: DateTime is set to the past date
  4. Enter 'Breakfast Puree' and '200' portion, then click 'Add Food Entry'
    - expect: Entry is saved with the past timestamp
  5. View History and verify the entry shows the past date
    - expect: History displays the past date/time as entered

#### 2.6. Test updating time to future date

**File:** `tests/validation/future-date.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads
  2. Click on the 'Time Fed' field and set a future date (e.g., April 1, 2026)
    - expect: DateTime is set to future date
  3. Enter 'Dinner Puree' and '150' portion, then click 'Add Food Entry'
    - expect: Entry is saved with future timestamp
    - expect: OR validation prevents future dates

### 3. History Section Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. View History displays all added food entries

**File:** `tests/history/view-all-entries.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker and add 3 different food entries (Banana, Apple, Carrot with different portion sizes)
    - expect: All 3 entries are saved successfully
  2. Click on 'View History' button
    - expect: History section is displayed
    - expect: All 3 food entries are listed
    - expect: Each entry shows food name, time, portion size with unit, and status

#### 3.2. History entries show correct formatting and details

**File:** `tests/history/entry-formatting.spec.ts`

**Steps:**
  1. Navigate and add a food entry 'Sweet Potato' with 120 grams at specific time
    - expect: Entry is saved
  2. Click 'View History'
    - expect: Entry displays food name clearly
    - expect: Time is formatted as 'M/D/YYYY H:MM AM/PM'
    - expect: Portion shows as '120 grams'
    - expect: Status indicator (✓ Fed) is visible

#### 3.3. Delete food entry from history

**File:** `tests/history/delete-entry.spec.ts`

**Steps:**
  1. Navigate and add a food entry 'Test Food'
    - expect: Entry is saved
  2. Click 'View History' to display entries
    - expect: Test Food entry is visible with a Delete button
  3. Click the 'Delete' button for the Test Food entry
    - expect: Entry is removed from history
    - expect: Confirmation may be shown or entry disappears immediately
  4. Verify the entry is no longer in history
    - expect: Test Food entry is gone from the list

#### 3.4. History shows favorite indicator for marked foods

**File:** `tests/history/favorite-indicator.spec.ts`

**Steps:**
  1. Navigate and add a food entry with 'Save as Favorite' checked
    - expect: Entry is saved as favorite
  2. Click 'View History'
    - expect: Entry shows a star/favorite indicator (⭐)
    - expect: Non-favorite entries do not show the indicator

#### 3.5. History persists after page refresh

**File:** `tests/history/persist-after-refresh.spec.ts`

**Steps:**
  1. Navigate and add multiple food entries
    - expect: Entries are saved
  2. Click 'View History' and note the entries displayed
    - expect: Multiple entries are visible
  3. Refresh the page (F5 or browser refresh)
    - expect: Page reloads and returns to the application
  4. Click 'View History' again
    - expect: All previously added entries are still displayed (data persistence)
    - expect: OR entries are cleared (if using session storage only)

### 4. Favorites Section Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1. Favorites displays foods marked as favorite

**File:** `tests/favorites/display-favorites.spec.ts`

**Steps:**
  1. Navigate and add 'Banana Puree' with 'Save as Favorite' checked
    - expect: Entry is saved
  2. Add 'Apple Puree' WITHOUT marking as favorite
    - expect: Entry is saved
  3. Click '⭐ Favorites' button
    - expect: Favorites section opens
    - expect: Banana Puree appears in the list
    - expect: Apple Puree does NOT appear

#### 4.2. Favorite shows food name, times fed, and last portion

**File:** `tests/favorites/favorite-details.spec.ts`

**Steps:**
  1. Navigate and add 'Orange Puree' with 'Save as Favorite' checked (100 ml)
    - expect: Favorite is saved
  2. Click '⭐ Favorites'
    - expect: Orange Puree is displayed with:
    - expect: Food name: 'Orange Puree'
    - expect: Times fed counter: 'Fed 1x'
    - expect: Last portion info: 'Last: 100 ml'

#### 4.3. Add favorite food again from Favorites section

**File:** `tests/favorites/quick-add.spec.ts`

**Steps:**
  1. Navigate and add 'Mango Puree' with 'Save as Favorite' checked (120 ml)
    - expect: Favorite is saved
  2. Click '⭐ Favorites' to display favorites
    - expect: Mango Puree appears with 'Add Now' button
  3. Click the 'Add Now' button for Mango Puree
    - expect: A new entry for Mango Puree is created with the last known portion (120 ml)
    - expect: Success message is displayed
    - expect: Times fed counter increments to 'Fed 2x'
  4. View History to verify the new entry
    - expect: New Mango Puree entry appears with current timestamp and 120 ml portion

#### 4.4. Favorite counter updates with repeated entries

**File:** `tests/favorites/counter-update.spec.ts`

**Steps:**
  1. Navigate and add 'Peach Puree' with 'Save as Favorite' (150 ml)
    - expect: Favorite is saved
  2. Click '⭐ Favorites' and verify 'Fed 1x' counter
    - expect: Counter shows 'Fed 1x'
  3. Click 'Add Now' button twice to add the same favorite twice
    - expect: Two new entries are created
    - expect: Success messages are displayed
  4. Check Favorites section again
    - expect: Counter now shows 'Fed 3x'

#### 4.5. Empty favorites message when no favorites exist

**File:** `tests/favorites/empty-state.spec.ts`

**Steps:**
  1. Navigate to a fresh application state (or delete all favorite entries)
    - expect: No food entries have been marked as favorite
  2. Click '⭐ Favorites' button
    - expect: Message is displayed: 'No favorite foods yet'
    - expect: Instruction text is shown: 'Mark foods as favorites when adding them!'

### 5. Allergies Section Functionality

**Seed:** `tests/seed.spec.ts`

#### 5.1. Allergies displays foods marked as allergen

**File:** `tests/allergies/display-allergens.spec.ts`

**Steps:**
  1. Navigate and add 'Peanut Butter' with 'Mark as Allergen' checked
    - expect: Entry is saved
  2. Add 'Apple' without marking as allergen
    - expect: Entry is saved
  3. Click '⚠️ Allergies' button
    - expect: Allergies section opens
    - expect: Peanut Butter appears with warning icon (⚠️)
    - expect: Apple does NOT appear

#### 5.2. Allergen shows food name, last given, last portion, and times given

**File:** `tests/allergies/allergen-details.spec.ts`

**Steps:**
  1. Navigate and add 'Shellfish' with 'Mark as Allergen' checked (75 grams)
    - expect: Allergen is saved with timestamp
  2. Click '⚠️ Allergies'
    - expect: Shellfish is displayed with:
    - expect: Warning icon and food name: '⚠️ Shellfish'
    - expect: Last given date/time is shown
    - expect: Last portion shows as '75 grams'
    - expect: Times given counter shows '1'

#### 5.3. Multiple allergen entries tracked separately

**File:** `tests/allergies/multiple-allergens.spec.ts`

**Steps:**
  1. Navigate and add 'Milk' with 'Mark as Allergen' (200 ml)
    - expect: Allergen is saved
  2. Add 'Eggs' with 'Mark as Allergen' (1 piece)
    - expect: Second allergen is saved
  3. Click '⚠️ Allergies'
    - expect: Both Milk and Eggs appear as separate entries
    - expect: Each shows its own last given date and portion size

#### 5.4. Allergen times given counter increments

**File:** `tests/allergies/counter-increment.spec.ts`

**Steps:**
  1. Navigate and add 'Wheat' with 'Mark as Allergen' (50 grams)
    - expect: Allergen is saved
  2. Click '⚠️ Allergies' and note times given shows '1'
    - expect: Counter displays '1'
  3. Go to Add Food and add 'Wheat' again with 'Mark as Allergen' (75 grams)
    - expect: Second entry is saved
  4. Check Allergies section again
    - expect: Times given counter now shows '2'
    - expect: Last portion updates to '75 grams'

#### 5.5. Empty allergies message when no allergens exist

**File:** `tests/allergies/empty-state.spec.ts`

**Steps:**
  1. Navigate to a fresh application state (or delete all allergen entries)
    - expect: No food entries have been marked as allergen
  2. Click '⚠️ Allergies' button
    - expect: Message is displayed: 'No allergens marked yet'
    - expect: Instruction text is shown: 'Mark foods as allergens to track them here!'

### 6. Navigation and Section Switching

**Seed:** `tests/seed.spec.ts`

#### 6.1. Navigate between all four sections smoothly

**File:** `tests/navigation/section-switching.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Application loads with Add Food section active (button is highlighted/active)
  2. Click '📋 View History' button
    - expect: History section displays
    - expect: View History button shows as active/highlighted
  3. Click '⭐ Favorites' button
    - expect: Favorites section displays
    - expect: Favorites button shows as active/highlighted
  4. Click '⚠️ Allergies' button
    - expect: Allergies section displays
    - expect: Allergies button shows as active/highlighted
  5. Click '➕ Add Food' button
    - expect: Add Food form appears
    - expect: Add Food button shows as active/highlighted

#### 6.2. Section content updates correctly when switching

**File:** `tests/navigation/content-update.spec.ts`

**Steps:**
  1. Navigate and add 3 food entries (2 with favorite, 1 with allergen)
    - expect: All entries are saved
  2. Click 'View History' and count visible entries
    - expect: 3 entries are displayed
  3. Click 'Favorites' and verify count of favorite entries
    - expect: 2 favorite entries are displayed
  4. Click 'Allergies' and verify allergen entries
    - expect: 1 allergen entry is displayed
  5. Switch back and forth between sections
    - expect: Content remains consistent and matches what was displayed previously

#### 6.3. Form state resets when switching from Add Food section

**File:** `tests/navigation/form-reset.spec.ts`

**Steps:**
  1. Navigate and enter 'Partial Entry' in Food Name field and '150' in Portion Size but DON'T submit
    - expect: Values are entered but not submitted
  2. Click 'View History' to switch sections
    - expect: History section is displayed
  3. Click '➕ Add Food' to return to the form
    - expect: Form is displayed; previously entered values may be cleared OR persisted
    - expect: Verify the behavior

### 7. Data Persistence and Storage

**Seed:** `tests/seed.spec.ts`

#### 7.1. Data persists across page refresh

**File:** `tests/persistence/refresh-persistence.spec.ts`

**Steps:**
  1. Navigate and add 2 food entries and 1 favorite
    - expect: All entries are saved
  2. Verify entries in History and Favorites
    - expect: All entries are visible
  3. Refresh the page using F5 or browser refresh button
    - expect: Page reloads and returns to the Baby Food Tracker
  4. Click 'View History' and '⭐ Favorites'
    - expect: All previously added entries are still present (data persisted)
    - expect: OR entries are cleared (if using session storage)

#### 7.2. Data persists across navigation away and back

**File:** `tests/persistence/navigate-away.spec.ts`

**Steps:**
  1. Navigate and add 2 food entries
    - expect: Entries are saved
  2. Open a new tab and navigate to a different website
    - expect: User is on a different page
  3. Return to the Baby Food Tracker application using back button or bookmark
    - expect: Application returns to the last section accessed
  4. Click 'View History'
    - expect: All previously added entries remain (data persisted)
    - expect: OR entries are cleared if using session storage

#### 7.3. Data is stored locally on individual browser/device

**File:** `tests/persistence/local-storage.spec.ts`

**Steps:**
  1. Navigate and add 3 food entries in main browser tab
    - expect: Entries are saved
  2. Open the application in a private/incognito window
    - expect: Application loads in incognito mode
  3. Check View History in incognito window
    - expect: History is empty OR shows only entries from incognito session (not from main browser)
    - expect: Data is NOT shared across private browsing

### 8. Combination Scenarios - Complex User Workflows

**Seed:** `tests/seed.spec.ts`

#### 8.1. Typical daily usage: Track morning, afternoon, and evening meals

**File:** `tests/workflows/daily-tracking.spec.ts`

**Steps:**
  1. Navigate to the application representing a morning meal setup
    - expect: Application is ready to track meals
  2. Add breakfast entry: 'Oatmeal' (150 grams) at 8:00 AM, mark as favorite
    - expect: Entry is saved successfully
  3. Add lunch entry: 'Chicken Puree' (120 grams) at 12:00 PM, mark as allergen
    - expect: Entry is saved
  4. Add dinner entry: 'Vegetable Mix' (180 grams) at 6:00 PM
    - expect: Entry is saved
  5. View History and verify all 3 entries with correct times and portions
    - expect: All 3 meals are listed with their respective times and portions
  6. Check Favorites section
    - expect: Oatmeal appears with 'Fed 1x'
  7. Check Allergies section
    - expect: Chicken Puree appears with 'Times given: 1'

#### 8.2. Quickly re-feed favorite foods multiple times in a day

**File:** `tests/workflows/repeat-favorites.spec.ts`

**Steps:**
  1. Navigate and add 'Banana Puree' as favorite (100 ml)
    - expect: Favorite is saved
  2. Add 'Apple Puree' as favorite (120 ml)
    - expect: Favorite is saved
  3. Click '⭐ Favorites'
    - expect: Both favorites are displayed
  4. Click 'Add Now' for Banana Puree 3 times
    - expect: 3 new entries are quickly created
    - expect: Success messages are shown each time
  5. Click 'Add Now' for Apple Puree twice
    - expect: 2 new entries are created
  6. Check Favorites and verify counters: Banana 'Fed 4x', Apple 'Fed 3x'
    - expect: Counters show the correct totals
  7. View History and count total entries
    - expect: 5 new entries are visible with current timestamps

#### 8.3. Monitor and track specific allergen over time

**File:** `tests/workflows/allergen-tracking.spec.ts`

**Steps:**
  1. Navigate and add 'Dairy' marked as allergen (100 ml) at time T1
    - expect: Allergen entry is saved
  2. Go to Add Food and add 'Dairy' again as allergen (75 ml) at time T2
    - expect: Second entry is saved
  3. Add 'Dairy' as allergen again (120 ml) at time T3
    - expect: Third entry is saved
  4. Check Allergies section
    - expect: Dairy is listed once with:
    - expect: Last given: T3 (most recent)
    - expect: Last portion: '120 ml'
    - expect: Times given: '3'
  5. View History and verify all 3 Dairy entries appear chronologically
    - expect: All 3 entries are shown with different times and portion sizes

#### 8.4. Delete problematic entry and verify removal from all sections

**File:** `tests/workflows/delete-entry.spec.ts`

**Steps:**
  1. Navigate and add 'Problematic Food' marked as both favorite AND allergen (100 ml)
    - expect: Entry is saved
  2. Verify entry appears in all three sections: History, Favorites, Allergies
    - expect: Entry is visible in History
    - expect: Entry appears in Favorites (if favorite was marked)
    - expect: Entry appears in Allergies (if allergen was marked)
  3. Go to View History and click Delete button for 'Problematic Food'
    - expect: Entry is removed from History
    - expect: Success or confirmation message may be shown
  4. Check Favorites and Allergies sections
    - expect: Entry is also removed/updated in Favorites and Allergies sections
    - expect: Counters are adjusted or entry is completely gone

#### 8.5. Use different portion units for the same food

**File:** `tests/workflows/varied-units.spec.ts`

**Steps:**
  1. Navigate and add 'Rice Cereal' with 30 grams and mark as favorite
    - expect: Entry is saved
  2. Add 'Rice Cereal' again with 3 tbsp and mark as favorite
    - expect: Second entry is saved with different unit
  3. Add 'Rice Cereal' again with 180 ml and mark as favorite
    - expect: Third entry is saved
  4. View History
    - expect: All 3 Rice Cereal entries are shown with their respective units: 30 grams, 3 tbsp, 180 ml
  5. Check Favorites
    - expect: Rice Cereal shows 'Fed 3x' and 'Last: 180 ml' (last added portion and unit)

### 9. UI/UX and Accessibility Tests

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify page title and header display

**File:** `tests/ui-ux/header-display.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Browser tab title shows 'Baby Food Tracker'
    - expect: Page header displays '👶 Baby Food Tracker'
    - expect: Subtitle 'Track meals, allergies, and favorites' is visible

#### 9.2. Verify all buttons are clickable and responsive

**File:** `tests/ui-ux/button-responsiveness.spec.ts`

**Steps:**
  1. Navigate and locate all four navigation buttons: Add Food, View History, Favorites, Allergies
    - expect: All 4 buttons are visible and have appropriate hover/cursor feedback
  2. Click each button individually
    - expect: Each button responds immediately and highlights as active
    - expect: Corresponding section content is displayed
  3. Click on 'Add Food Entry' button with empty/populated form
    - expect: Button responds with visual feedback
    - expect: Form is processed appropriately

#### 9.3. Verify form field labels are clear and accessible

**File:** `tests/ui-ux/form-labels.spec.ts`

**Steps:**
  1. Navigate to the application
    - expect: Food entry form is visible
  2. Inspect each form field: Food Name, Time Fed, Portion Size, checkboxes
    - expect: Each field has a clear, descriptive label
    - expect: Field labels are visible and associated with inputs
  3. Verify placeholder text in Food Name field
    - expect: Placeholder shows 'e.g., Banana puree' as helpful hint

#### 9.4. Verify success message display and styling

**File:** `tests/ui-ux/success-message.spec.ts`

**Steps:**
  1. Navigate and fill in the food entry form with valid data
    - expect: Form is ready to submit
  2. Click 'Add Food Entry' button
    - expect: Success message '✓ Food added successfully!' appears above the form
    - expect: Message is visible and styled distinctly (color, icon, etc.)
  3. Verify message is readable and prominent
    - expect: Text color contrasts well with background
    - expect: Checkmark icon is visible
    - expect: Message remains visible for appropriate duration

#### 9.5. Verify responsive layout on different viewport sizes

**File:** `tests/ui-ux/responsive-layout.spec.ts`

**Steps:**
  1. Navigate to the application at standard desktop width (1200px)
    - expect: All elements are clearly visible and properly spaced
  2. Verify form elements layout and button accessibility
    - expect: Form is readable and buttons are easily clickable
  3. Simulate mobile viewport (375px width) using browser dev tools
    - expect: Layout adapts for mobile
    - expect: Navigation buttons remain accessible
    - expect: Form fields stack vertically if needed
    - expect: Text is readable on small screens
  4. Simulate tablet viewport (768px width)
    - expect: Layout is optimized for tablet size
    - expect: Elements have appropriate spacing

#### 9.6. Verify empty state messages are user-friendly

**File:** `tests/ui-ux/empty-states.spec.ts`

**Steps:**
  1. Navigate to a fresh application state
    - expect: No entries have been added
  2. Click 'View History'
    - expect: Message 'No food entries yet' is displayed
    - expect: Helpful instruction 'Add your first food entry to get started!' is shown
  3. Click '⭐ Favorites'
    - expect: Message 'No favorite foods yet' is displayed
    - expect: Instruction 'Mark foods as favorites when adding them!' is shown
  4. Click '⚠️ Allergies'
    - expect: Message 'No allergens marked yet' is displayed
    - expect: Instruction 'Mark foods as allergens to track them here!' is shown

### 10. Browser Compatibility and Performance

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify application loads without console errors

**File:** `tests/performance/console-errors.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application
    - expect: Page loads successfully
  2. Open browser developer tools (F12) and check the Console tab
    - expect: No critical JavaScript errors are displayed
    - expect: Favicon 404 error may appear but is non-critical
  3. Perform basic operations: add entry, navigate sections
    - expect: No new errors appear in console

#### 10.2. Verify form submission does not have lag or delays

**File:** `tests/performance/form-submission.spec.ts`

**Steps:**
  1. Navigate and fill out the food entry form with valid data
    - expect: Form is populated
  2. Click 'Add Food Entry' and measure response time
    - expect: Success message appears immediately/within 1 second
    - expect: No freezing or lag during submission
    - expect: Form clears and is ready for next entry

#### 10.3. Verify navigation between sections is responsive

**File:** `tests/performance/navigation-speed.spec.ts`

**Steps:**
  1. Add multiple entries (5+) to populate History, Favorites, Allergies
    - expect: All entries are saved
  2. Rapidly click between navigation buttons: Add Food -> History -> Favorites -> Allergies
    - expect: Sections switch smoothly without lag
    - expect: Content loads immediately or very quickly

#### 10.4. Verify data loads quickly on initial page visit

**File:** `tests/performance/initial-load.spec.ts`

**Steps:**
  1. Navigate to the Baby Food Tracker application URL
    - expect: Page begins to render within 2 seconds
    - expect: Visible content (header, buttons, form) renders quickly
  2. Check that all interactive elements are functional immediately
    - expect: Buttons and form fields respond to clicks without delay
