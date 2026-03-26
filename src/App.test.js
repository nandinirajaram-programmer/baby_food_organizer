import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders app title', () => {
    render(<App />);
    expect(screen.getByText('👶 Baby Food Tracker')).toBeInTheDocument();
  });

  test('renders all tab buttons', () => {
    render(<App />);
    expect(screen.getByText('➕ Add Food')).toBeInTheDocument();
    expect(screen.getByText('📋 View History')).toBeInTheDocument();
    expect(screen.getByText('⭐ Favorites')).toBeInTheDocument();
    expect(screen.getByText('⚠️ Allergies')).toBeInTheDocument();
  });

  test('add food tab is active by default', () => {
    render(<App />);
    expect(screen.getByText('Food Name')).toBeInTheDocument();
  });

  test('switches to view history tab', () => {
    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);
    expect(screen.getByText('No food entries yet')).toBeInTheDocument();
  });

  test('switches to favorites tab', () => {
    render(<App />);
    const favTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Favorites'));
    fireEvent.click(favTab);
    expect(screen.getByText('No favorite foods yet')).toBeInTheDocument();
  });

  test('switches to allergies tab', () => {
    render(<App />);
    const allergyTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Allergies'));
    fireEvent.click(allergyTab);
    expect(screen.getByText('No allergens marked yet')).toBeInTheDocument();
  });
});

describe('Add Food Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('displays form fields', () => {
    render(<App />);
    expect(screen.getByLabelText('Food Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Time Fed')).toBeInTheDocument();
    expect(screen.getByLabelText('Mark as Allergen')).toBeInTheDocument();
    expect(screen.getByLabelText('Save as Favorite')).toBeInTheDocument();
  });

  test('shows error when required fields are empty', () => {
    render(<App />);
    const submitBtn = screen.getByText('Add Food Entry');
    fireEvent.click(submitBtn);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields');
  });

  test('adds food entry successfully', async () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('e.g., Banana puree');
    const timeInput = screen.getByLabelText('Time Fed');
    const submitBtn = screen.getByText('Add Food Entry');

    fireEvent.change(nameInput, { target: { value: 'Banana' } });
    fireEvent.change(timeInput, { target: { value: '2024-03-26T10:30' } });
    
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('✓ Food added successfully!')).toBeInTheDocument();
    });

    expect(nameInput.value).toBe('');
  });

  test('saves food with portion size', async () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('e.g., Banana puree');
    const timeInput = screen.getByLabelText('Time Fed');
    const portionInput = screen.getByPlaceholderText('Amount');
    const submitBtn = screen.getByText('Add Food Entry');

    fireEvent.change(nameInput, { target: { value: 'Apple puree' } });
    fireEvent.change(timeInput, { target: { value: '2024-03-26T14:00' } });
    fireEvent.change(portionInput, { target: { value: '100' } });
    
    fireEvent.click(submitBtn);

    const data = JSON.parse(localStorage.getItem('babyFoodData'));
    expect(data[0].portion).toBe('100 ml');
  });

  test('marks food as allergen', async () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('e.g., Banana puree');
    const timeInput = screen.getByLabelText('Time Fed');
    const allergenCheck = screen.getByLabelText('Mark as Allergen');
    const submitBtn = screen.getByText('Add Food Entry');

    fireEvent.change(nameInput, { target: { value: 'Peanuts' } });
    fireEvent.change(timeInput, { target: { value: '2024-03-26T10:00' } });
    fireEvent.click(allergenCheck);
    fireEvent.click(submitBtn);

    const data = JSON.parse(localStorage.getItem('babyFoodData'));
    expect(data[0].isAllergen).toBe(true);
  });

  test('marks food as favorite', async () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('e.g., Banana puree');
    const timeInput = screen.getByLabelText('Time Fed');
    const favoriteCheck = screen.getByLabelText('Save as Favorite');
    const submitBtn = screen.getByText('Add Food Entry');

    fireEvent.change(nameInput, { target: { value: 'Carrots' } });
    fireEvent.change(timeInput, { target: { value: '2024-03-26T12:00' } });
    fireEvent.click(favoriteCheck);
    fireEvent.click(submitBtn);

    const data = JSON.parse(localStorage.getItem('babyFoodData'));
    expect(data[0].isFavorite).toBe(true);
  });
});

describe('View History', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows empty state', () => {
    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);
    expect(screen.getByText('No food entries yet')).toBeInTheDocument();
  });

  test('displays added food entries', async () => {
    const foodData = [
      {
        id: 1,
        name: 'Banana',
        timestamp: new Date().toISOString(),
        portion: '100 ml',
        isAllergen: false,
        isFavorite: false,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);

    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('100 ml')).toBeInTheDocument();
  });

  test('shows allergen badge', () => {
    const foodData = [
      {
        id: 1,
        name: 'Peanuts',
        timestamp: new Date().toISOString(),
        portion: '50 ml',
        isAllergen: true,
        isFavorite: false,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);

    expect(screen.getByText('⚠️ Allergen')).toBeInTheDocument();
  });

  test('shows favorite badge', () => {
    const foodData = [
      {
        id: 1,
        name: 'Carrots',
        timestamp: new Date().toISOString(),
        portion: '75 ml',
        isAllergen: false,
        isFavorite: true,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);

    expect(screen.getByText('⭐ Favorite')).toBeInTheDocument();
  });

  test('deletes food entry', () => {
    const foodData = [
      {
        id: 123,
        name: 'Banana',
        timestamp: new Date().toISOString(),
        portion: '100 ml',
        isAllergen: false,
        isFavorite: false,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);

    window.confirm = jest.fn(() => true);
    const deleteBtn = screen.getByText('Delete');
    fireEvent.click(deleteBtn);

    const updatedData = JSON.parse(localStorage.getItem('babyFoodData'));
    expect(updatedData.length).toBe(0);
  });
});

describe('Favorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows empty state', () => {
    render(<App />);
    const favTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Favorites'));
    fireEvent.click(favTab);
    expect(screen.getByText('No favorite foods yet')).toBeInTheDocument();
  });

  test('displays favorite foods', () => {
    const foodData = [
      {
        id: 1,
        name: 'Apple',
        timestamp: new Date().toISOString(),
        portion: '80 ml',
        isAllergen: false,
        isFavorite: true,
        markedAsFed: true
      },
      {
        id: 2,
        name: 'Apple',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        portion: '80 ml',
        isAllergen: false,
        isFavorite: true,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const favTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Favorites'));
    fireEvent.click(favTab);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Fed 2x')).toBeInTheDocument();
  });

  test('quick-add favorite food', async () => {
    const foodData = [
      {
        id: 1,
        name: 'Banana',
        timestamp: new Date().toISOString(),
        portion: '100 ml',
        isAllergen: false,
        isFavorite: true,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const favTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Favorites'));
    fireEvent.click(favTab);

    const addBtn = screen.getByText('Add Now');
    fireEvent.click(addBtn);

    await waitFor(() => {
      const updatedData = JSON.parse(localStorage.getItem('babyFoodData'));
      expect(updatedData.length).toBe(2);
      expect(updatedData[1].name).toBe('Banana');
    });
  });
});

describe('Allergies', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows empty state', () => {
    render(<App />);
    const allergyTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Allergies'));
    fireEvent.click(allergyTab);
    expect(screen.getByText('No allergens marked yet')).toBeInTheDocument();
  });

  test('displays allergen foods', () => {
    const foodData = [
      {
        id: 1,
        name: 'Peanuts',
        timestamp: new Date().toISOString(),
        portion: '50 ml',
        isAllergen: true,
        isFavorite: false,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const allergyTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Allergies'));
    fireEvent.click(allergyTab);

    expect(screen.getByText('⚠️ Peanuts')).toBeInTheDocument();
    expect(screen.getByText('Times given: 1')).toBeInTheDocument();
  });

  test('shows multiple allergen entries', () => {
    const foodData = [
      {
        id: 1,
        name: 'Peanuts',
        timestamp: new Date().toISOString(),
        portion: '50 ml',
        isAllergen: true,
        isFavorite: false,
        markedAsFed: true
      },
      {
        id: 2,
        name: 'Peanuts',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        portion: '50 ml',
        isAllergen: true,
        isFavorite: false,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(foodData));

    render(<App />);
    const allergyTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('Allergies'));
    fireEvent.click(allergyTab);

    expect(screen.getByText('Times given: 2')).toBeInTheDocument();
  });
});

describe('LocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('persists data to localStorage', () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('e.g., Banana puree');
    const timeInput = screen.getByLabelText('Time Fed');
    const submitBtn = screen.getByText('Add Food Entry');

    fireEvent.change(nameInput, { target: { value: 'Mango' } });
    fireEvent.change(timeInput, { target: { value: '2024-03-26T15:00' } });
    fireEvent.click(submitBtn);

    const data = JSON.parse(localStorage.getItem('babyFoodData'));
    expect(data).toBeTruthy();
    expect(data[0].name).toBe('Mango');
  });

  test('retrieves data from localStorage', () => {
    const mockData = [
      {
        id: 999,
        name: 'Orange',
        timestamp: '2024-03-26T11:00:00.000Z',
        portion: '90 ml',
        isAllergen: false,
        isFavorite: false,
        markedAsFed: true
      }
    ];
    localStorage.setItem('babyFoodData', JSON.stringify(mockData));

    render(<App />);
    const viewTab = screen.getAllByRole('button').find(btn => btn.textContent.includes('View History'));
    fireEvent.click(viewTab);

    expect(screen.getByText('Orange')).toBeInTheDocument();
  });
});
