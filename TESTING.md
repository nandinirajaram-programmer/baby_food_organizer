# Unit Testing Guide

This project includes comprehensive unit tests using Jest and React Testing Library.

## Test Coverage

The test suite covers:

✅ **Component Rendering**
- App component loads correctly
- All tabs are accessible
- Default tab is "Add Food"

✅ **Add Food Functionality**
- Form validation
- Adding entries with all fields
- Portion size tracking
- Allergen marking
- Favorite marking
- Form reset after submission

✅ **View History**
- Empty state display
- Food entry display
- Badges (allergen, favorite, fed status)
- Delete functionality
- Proper data formatting

✅ **Favorites**
- Empty state display
- Favorite food cards
- Count of times fed
- Quick-add functionality
- Last portion display

✅ **Allergies**
- Empty state display
- Allergen tracking
- Times given count
- Last given timestamp

✅ **LocalStorage**
- Data persistence
- Data retrieval
- Data format

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run specific test file
```bash
npm test App.test.js
```

## Test Files

- **`src/App.test.js`** - Main component tests covering all features

## Test Setup

- **`src/setupTests.js`** - Test environment configuration

## Testing Tools

- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation

## Test Structure

Each test follows the Arrange-Act-Assert pattern:

```javascript
test('description', () => {
  // Arrange - Set up test data
  render(<App />);
  
  // Act - Perform action
  fireEvent.click(button);
  
  // Assert - Check results
  expect(element).toBeInTheDocument();
});
```

## Writing New Tests

### Example: Testing a new feature

```javascript
describe('New Feature', () => {
  test('does something specific', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('...');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(screen.getByText('success')).toBeInTheDocument();
  });
});
```

## Common Testing Patterns

### Finding Elements
```javascript
// By text content
screen.getByText('Add Food Entry')

// By placeholder
screen.getByPlaceholderText('e.g., Banana puree')

// By label
screen.getByLabelText('Food Name')

// By role
screen.getByRole('button', { name: /Add/i })
```

### Firing Events
```javascript
// Click event
fireEvent.click(button)

// Change input
fireEvent.change(input, { target: { value: 'test' } })

// Submit form
fireEvent.click(submitButton)
```

### Waiting for Changes
```javascript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});

// Wait for async operations
await userEvent.type(input, 'text')
```

## Mocking

### localStorage Mock
Tests include a complete localStorage mock for testing data persistence.

```javascript
beforeEach(() => {
  localStorage.clear(); // Clear before each test
});
```

### window.alert and window.confirm
Mocked globally for testing dialogs.

```javascript
window.confirm = jest.fn(() => true);
```

## CI/CD Integration

Tests run automatically on:
- Every push to main/develop
- Every pull request
- Part of the GitHub Actions workflow

The workflow runs: `npm test -- --watchAll=false --passWithNoTests`

## Debugging Tests

### View rendered output
```javascript
import { render, screen } from '@testing-library/react';
render(<App />);
screen.debug(); // Prints DOM
```

### Check what queries are available
```javascript
screen.logTestingPlaygroundURL(); // Gets a testing playground URL
```

### Run single test
```bash
npm test -- --testNamePattern="test name"
```

## Test Statistics

- **Total Tests**: 30+
- **Coverage Areas**: 
  - Rendering (4 tests)
  - Add Food (6 tests)
  - View History (5 tests)
  - Favorites (3 tests)
  - Allergies (3 tests)
  - LocalStorage (2 tests)

## Best Practices

1. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `querySelector`
2. **Test behavior, not implementation** - What users see/do, not internal state
3. **Keep tests focused** - One concept per test
4. **Use descriptive names** - Test name should explain what's being tested
5. **Mock external dependencies** - localStorage, API calls, etc.
6. **Clean up after tests** - Use `beforeEach`/`afterEach` hooks
7. **Avoid test interdependence** - Tests should run in any order

## Troubleshooting

### Tests failing after changes
- Clear cache: `npm test -- --clearCache`
- Ensure localStorage is cleared in beforeEach
- Check component prop changes

### localStorage not persisting in tests
- Mock is reset each test by `beforeEach(() => localStorage.clear())`
- Set mock data using `localStorage.setItem()` if needed

### Async/await issues
- Use `await waitFor()` for async state changes
- Use `userEvent` instead of `fireEvent` for better simulation

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
