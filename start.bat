@echo off
REM Playwright Gallery - Quick Start Script for Windows

echo ========================================
echo 🎭 Playwright Gallery - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% found
echo.

REM Install root dependencies
if not exist "node_modules\" (
    echo 📦 Installing root dependencies...
    call npm install
    echo.
)

REM Install frontend dependencies
if not exist "frontend\node_modules\" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo.
)

REM Install backend dependencies
if not exist "backend\node_modules\" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo.
)

REM Install demo-site dependencies
if not exist "demo-site\node_modules\" (
    echo 📦 Installing demo-site dependencies...
    cd demo-site
    call npm install
    cd ..
    echo.
)

REM Install Playwright browsers
echo 🌐 Installing Playwright browsers...
cd backend
call npx playwright install chromium firefox webkit
cd ..
echo.

REM Create media directory
if not exist "backend\media\" mkdir backend\media

echo ✅ Setup complete!
echo.
echo 🚀 Starting all services...
echo.
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:3001
echo    Demo Site: http://localhost:3002
echo.
echo Press Ctrl+C to stop all services
echo.

REM Start all services
call npm run dev
