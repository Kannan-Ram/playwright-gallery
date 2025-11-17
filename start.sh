#!/bin/bash

# Playwright Gallery - Quick Start Script

set -e

echo "🎭 Playwright Gallery - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js $(node --version) found"
echo ""

# Check if this is first run
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
    echo ""
fi

# Install frontend dependencies
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
    echo ""
fi

# Install backend dependencies
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
    echo ""
fi

# Install demo-site dependencies
if [ ! -d "demo-site/node_modules" ]; then
    echo "📦 Installing demo-site dependencies..."
    cd demo-site && npm install && cd ..
    echo ""
fi

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
cd backend && npx playwright install chromium firefox webkit && cd ..
echo ""

# Create media directory
mkdir -p backend/media

echo "✅ Setup complete!"
echo ""
echo "🚀 Starting all services..."
echo ""
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001"
echo "   Demo Site: http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start all services
npm run dev
