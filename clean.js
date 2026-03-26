const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning project structure...\n');

// Create directories
['src', 'public'].forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Copy files to proper locations
const copies = [
  { from: 'App.jsx', to: 'src/App.js' },
  { from: 'index.jsx', to: 'src/index.js' },
  { from: 'index.css', to: 'src/index.css' },
  { from: 'public-index.html', to: 'public/index.html' }
];

copies.forEach(({ from, to }) => {
  const fromPath = path.join(__dirname, from);
  const toPath = path.join(__dirname, to);
  if (fs.existsSync(fromPath)) {
    fs.copyFileSync(fromPath, toPath);
    console.log(`✅ ${to}`);
  }
});

// Files to remove (cleanup)
const filesToRemove = [
  'App.jsx',
  'index.jsx',
  'public-index.html',
  'setup.js',
  'setup.sh'
];

filesToRemove.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️  Removed ${file}`);
  }
});

console.log('\n✨ Project structure cleaned!\n');
console.log('Ready to use:');
console.log('  npm install');
console.log('  npm start\n');
