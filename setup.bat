@echo off
REM Create proper React project structure
echo Setting up Baby Food Tracker React App...

REM Create directories
if not exist "public" mkdir public
if not exist "src" mkdir src

REM Copy and move files to proper locations
copy index.css src\index.css
ren index.jsx index.js.temp
move index.js.temp src\index.js
ren App.jsx App.js.temp
move App.js.temp src\App.js
copy public-index.html public\index.html

echo.
echo Project structure created successfully!
echo.
echo Now run: npm install
echo Then run: npm start
echo.
pause
