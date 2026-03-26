# Baby Food Tracker - React App

A simple, minimal React application for tracking baby food intake with portion tracking, allergies, and favorites.

## Features

- ✅ **Add Food** - Log meals with timestamps and portion sizes
- 📋 **View History** - See all meals with details
- ⭐ **Favorites** - Quick-add frequently used meals
- ⚠️ **Allergies** - Track restricted foods with frequency
- 💾 **Local Storage** - All data saved in browser (no backend needed)
- 🚀 **GitHub Actions** - Automated CI/CD pipeline included

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

## GitHub Actions Setup

To enable automated CI/CD:

```bash
# 1. Setup GitHub Actions workflows
node setup-github-actions.js

# 2. Commit and push
git add .github/
git commit -m "feat: add GitHub Actions CI/CD"
git push origin main
```

See [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) for detailed configuration.

## Final Project Structure

```
baby_food_organizer/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── App.js                  # Main React component
│   ├── index.js                # React entry point
│   └── index.css               # Styles
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml           # GitHub Actions workflow
│   └── CODEOWNERS              # Code ownership
├── package.json                # Dependencies and scripts
├── .gitignore                  # Git ignore file
├── clean.js                    # Organize project files
├── setup-github-actions.js     # Setup CI/CD
├── GITHUB_ACTIONS.md           # CI/CD documentation
└── README.md                   # This file
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests

## CI/CD Pipeline

**Automatic triggers:**
- 📦 Build & Test on every push/PR
- ✅ Test on multiple Node versions
- 🚀 Deploy to GitHub Pages (main branch only)

View workflow status in the **Actions** tab of your repository.

## Technologies

- React 18
- React DOM 18
- CSS3
- LocalStorage API
- GitHub Actions

## Data Storage

All food entries stored in browser's localStorage with key `babyFoodData`:
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
- GitHub Pages deployment available (enable in repository settings)

