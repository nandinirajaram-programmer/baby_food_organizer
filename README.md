# Baby Food Tracker - React App

A simple, minimal React application for tracking baby food intake with portion tracking, allergies, and favorites.

## Features

- ✅ **Add Food** - Log meals with timestamps and portion sizes
- 📋 **View History** - See all meals with details
- ⭐ **Favorites** - Quick-add frequently used meals
- ⚠️ **Allergies** - Track restricted foods with frequency
- 💾 **Local Storage** - All data saved in browser (no backend needed)

## Quick Start

```bash
# 1. Clean and organize project
node clean.js

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at `http://localhost:3000`

## Final Project Structure

```
baby_food_organizer/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.js              # Main React component
│   ├── index.js            # React entry point
│   └── index.css           # Styles
├── package.json            # Dependencies and scripts
├── .gitignore              # Git ignore file
├── clean.js                # Run once to organize files
└── README.md               # This file
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests

## Technologies

- React 18
- React DOM 18
- CSS3
- LocalStorage API

## Data Storage

All food entries are stored in the browser's localStorage under the key `babyFoodData`. Data includes:
- Food name
- Timestamp
- Portion size and unit
- Allergen status
- Favorite status

## Notes

- No backend server required
- Works completely offline
- Browser must have localStorage enabled
- Each browser/device maintains separate data

