import React, { useState, useEffect } from 'react';

// ============ Utility Functions ============
const getData = () => JSON.parse(localStorage.getItem('babyFoodData')) || [];
const saveData = (data) => localStorage.setItem('babyFoodData', JSON.stringify(data));

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// ============ Add Food Component ============
function AddFood({ onSuccess, showSuccess }) {
  const [formData, setFormData] = useState({
    foodName: '',
    foodTime: '',
    portionAmount: '',
    portionUnit: 'ml',
    isAllergen: false,
    isFavorite: false,
  });

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setFormData(prev => ({ ...prev, foodTime: now.toISOString().slice(0, 16) }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foodName.trim() || !formData.foodTime) {
      alert('Please fill in all required fields');
      return;
    }

    const data = getData();
    data.push({
      id: Date.now(),
      name: formData.foodName,
      timestamp: new Date(formData.foodTime).toISOString(),
      portion: formData.portionAmount ? `${formData.portionAmount} ${formData.portionUnit}` : 'Not specified',
      isAllergen: formData.isAllergen,
      isFavorite: formData.isFavorite,
      markedAsFed: true,
    });

    saveData(data);
    onSuccess();
    
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setFormData({
      foodName: '',
      foodTime: now.toISOString().slice(0, 16),
      portionAmount: '',
      portionUnit: 'ml',
      isAllergen: false,
      isFavorite: false,
    });
  };

  return (
    <div className="tab-content active">
      {showSuccess && (
        <div className="success-message show">✓ Food added successfully!</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="foodName">Food Name</label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            placeholder="e.g., Banana puree"
            value={formData.foodName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodTime">Time Fed</label>
          <input
            type="datetime-local"
            id="foodTime"
            name="foodTime"
            value={formData.foodTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Portion Size</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              name="portionAmount"
              placeholder="Amount"
              style={{ flex: 1 }}
              min="0"
              step="0.1"
              value={formData.portionAmount}
              onChange={handleChange}
            />
            <select
              name="portionUnit"
              style={{ flex: 1, padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em' }}
              value={formData.portionUnit}
              onChange={handleChange}
            >
              <option value="ml">ml</option>
              <option value="oz">oz</option>
              <option value="grams">grams</option>
              <option value="tbsp">tbsp</option>
              <option value="tsp">tsp</option>
              <option value="cups">cups</option>
            </select>
          </div>
        </div>

        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="isAllergen"
              name="isAllergen"
              checked={formData.isAllergen}
              onChange={handleChange}
            />
            <label htmlFor="isAllergen" style={{ marginBottom: 0 }}>Mark as Allergen</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              checked={formData.isFavorite}
              onChange={handleChange}
            />
            <label htmlFor="isFavorite" style={{ marginBottom: 0 }}>Save as Favorite</label>
          </div>
        </div>

        <button type="submit">Add Food Entry</button>
      </form>
    </div>
  );
}

// ============ History Component ============
function History() {
  const [data, setData] = useState(getData());

  const deleteFood = (id) => {
    if (window.confirm('Delete this entry?')) {
      const updatedData = data.filter(item => item.id !== id);
      saveData(updatedData);
      setData(updatedData);
    }
  };

  if (data.length === 0) {
    return (
      <div className="tab-content active">
        <div className="empty-state">
          <p>No food entries yet</p>
          <p>Add your first food entry to get started!</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="tab-content active">
      {sortedData.map(item => (
        <div key={item.id} className="food-item">
          <div className="food-name">{item.name}</div>
          <div className="food-meta">
            <div className="meta-item timestamp">⏰ {formatTime(item.timestamp)}</div>
            <div className="meta-item">📊 {item.portion}</div>
            {item.markedAsFed && <div className="meta-item"><span className="badge badge-fed">✓ Fed</span></div>}
            {item.isAllergen && <div className="meta-item"><span className="badge badge-allergen">⚠️ Allergen</span></div>}
            {item.isFavorite && <div className="meta-item"><span className="badge badge-favorite">⭐ Favorite</span></div>}
          </div>
          <div className="food-actions">
            <button className="btn-small btn-danger" onClick={() => deleteFood(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Favorites Component ============
function Favorites({ onSuccess }) {
  const [data, setData] = useState(getData());

  const favorites = data.filter(item => item.isFavorite);

  const grouped = favorites.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { count: 0, lastPortion: item.portion };
    }
    acc[item.name].count += 1;
    acc[item.name].lastPortion = item.portion;
    return acc;
  }, {});

  const addFavoriteQuickly = (name, portion) => {
    const newData = getData();
    newData.push({
      id: Date.now(),
      name,
      timestamp: new Date().toISOString(),
      portion: portion || 'Not specified',
      isAllergen: false,
      isFavorite: true,
      markedAsFed: true,
    });
    saveData(newData);
    onSuccess();
  };

  if (favorites.length === 0) {
    return (
      <div className="tab-content active">
        <div className="empty-state">
          <p>No favorite foods yet</p>
          <p>Mark foods as favorites when adding them!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content active">
      <div className="favorites-grid">
        {Object.entries(grouped).map(([name, favData]) => (
          <div
            key={name}
            className="favorite-card"
            onClick={() => addFavoriteQuickly(name, favData.lastPortion)}
          >
            <div className="favorite-card-name">{name}</div>
            <div className="favorite-card-count">Fed {favData.count}x</div>
            <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '8px' }}>Last: {favData.lastPortion}</div>
            <button className="btn-small" style={{ marginTop: '10px' }}>Add Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Allergies Component ============
function Allergies() {
  const [data, setData] = useState(getData());

  const allergens = data.filter(item => item.isAllergen);

  const grouped = allergens.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});

  if (allergens.length === 0) {
    return (
      <div className="tab-content active">
        <div className="empty-state">
          <p>No allergens marked yet</p>
          <p>Mark foods as allergens to track them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content active">
      {Object.entries(grouped).map(([name, items]) => (
        <div key={name} className="food-item" style={{ borderLeftColor: '#ff6b6b' }}>
          <div className="food-name">⚠️ {name}</div>
          <div className="food-meta">
            <div className="meta-item">Last given: {formatTime(items[items.length - 1].timestamp)}</div>
            <div className="meta-item">Last portion: {items[items.length - 1].portion}</div>
            <div className="meta-item">Times given: {items.length}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Main App Component ============
export default function App() {
  const [activeTab, setActiveTab] = useState('add');
  const [showSuccess, setShowSuccess] = useState(false);

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="container">
      <header>
        <h1>👶 Baby Food Tracker</h1>
        <p>Track meals, allergies, and favorites</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add Food
        </button>
        <button
          className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          📋 View History
        </button>
        <button
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ⭐ Favorites
        </button>
        <button
          className={`tab-btn ${activeTab === 'allergies' ? 'active' : ''}`}
          onClick={() => setActiveTab('allergies')}
        >
          ⚠️ Allergies
        </button>
      </div>

      {activeTab === 'add' && (
        <AddFood onSuccess={showSuccessMessage} showSuccess={showSuccess} />
      )}
      {activeTab === 'view' && <History />}
      {activeTab === 'favorites' && <Favorites onSuccess={showSuccessMessage} />}
      {activeTab === 'allergies' && <Allergies />}
    </div>
  );
}
