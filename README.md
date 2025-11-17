# 🎭 Playwright Gallery

An interactive gallery and showcase application for the Playwright testing framework. Explore live examples, experiment in a playground, and learn Playwright through hands-on experience.

![Playwright Gallery](https://img.shields.io/badge/Playwright-Gallery-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Features

- **📚 Example Gallery**: Browse 30+ categorized Playwright examples
- **💻 Interactive Playground**: Write and run tests in real-time
- **🎥 Video Recording**: See your tests in action with video playback
- **📸 Screenshot Capture**: Automatic screenshots on test execution
- **🌓 Dark Mode**: Beautiful dark/light theme support
- **🔍 Smart Search**: Find examples quickly with filtering
- **🎯 Multiple Browsers**: Test on Chromium, Firefox, and WebKit
- **📱 Responsive Design**: Works great on desktop and mobile

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Docker Deployment](#-docker-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Option 1: Local Development (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd playwright-gallery

# Install dependencies
npm install

# Install dependencies for all workspaces
npm run install:all

# Start all services (frontend, backend, demo site)
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Demo Site**: http://localhost:3002

### Option 2: Docker

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

## 📦 Installation

### Step 1: Install Root Dependencies

```bash
npm install
```

### Step 2: Install Workspace Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Demo Site
cd ../demo-site
npm install
```

### Step 3: Install Playwright Browsers

```bash
cd backend
npx playwright install
```

## 🎮 Usage

### Running the Gallery

1. **Start all services**:
   ```bash
   npm run dev
   ```

2. **Open your browser** to http://localhost:3000

3. **Explore the gallery**:
   - Browse examples by category
   - Click on any example to see details
   - Run tests directly in the browser
   - View video recordings and screenshots

### Using the Playground

1. Navigate to the **Playground** page
2. Write your Playwright test code
3. Select a browser (Chromium, Firefox, or WebKit)
4. Click **Run** to execute your test
5. View results, videos, and screenshots

### Example Test Code

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('http://localhost:3002');
  await expect(page).toHaveTitle(/Demo/);
  await page.click('text=Get started');
});
```

## 🏗️ Project Structure

```
playwright-gallery/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Gallery/     # Gallery-specific components
│   │   │   ├── Playground/  # Playground components
│   │   │   ├── Layout/      # Layout components
│   │   │   └── Common/      # Shared components
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── backend/                  # Express backend server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── data/            # Example data
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── demo-site/                # Demo testing site
│   ├── index.html           # Main HTML file
│   └── public/              # Static assets
│       └── script.js        # Interactive JS
│
├── docker-compose.yml        # Docker orchestration
├── Dockerfile.frontend       # Frontend Docker image
├── Dockerfile.backend        # Backend Docker image
├── Dockerfile.demo           # Demo site Docker image
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🛠️ Development

### Available Scripts

#### Root Level

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all projects
- `npm run start` - Start all services in production mode
- `npm run docker:build` - Build Docker images
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers

#### Frontend (cd frontend)

- `npm run dev` - Start dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend (cd backend)

- `npm run dev` - Start dev server with hot reload (port 3001)
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

#### Demo Site (cd demo-site)

- `npm run dev` - Start dev server (port 3002)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Examples

1. Open `backend/src/data/examples.ts`
2. Add your example following this structure:

```typescript
{
  id: 'unique-id',
  title: 'Example Title',
  category: 'basics', // or selectors, actions, etc.
  difficulty: 'beginner', // or intermediate, advanced
  description: 'Brief description',
  code: `your Playwright test code here`,
  testUrl: 'https://example.com',
  tags: ['tag1', 'tag2'],
  relatedExamples: ['related-id-1'],
  bestPractices: ['Practice 1', 'Practice 2'],
  commonPitfalls: ['Pitfall 1', 'Pitfall 2'],
}
```

### Modifying Categories

Edit `frontend/src/utils/constants.ts` to add or modify categories.

## 🐳 Docker Deployment

### Build Images

```bash
docker-compose build
```

### Start Services

```bash
docker-compose up
```

### Scale Services

```bash
docker-compose up --scale backend=3
```

### View Logs

```bash
docker-compose logs -f
```

### Stop Services

```bash
docker-compose down
```

### Remove Volumes

```bash
docker-compose down -v
```

## 📡 API Documentation

### Endpoints

#### GET /api/examples
Get all examples

**Response:**
```json
[
  {
    "id": "basic-navigation",
    "title": "Basic Page Navigation",
    "category": "basics",
    "difficulty": "beginner",
    "description": "Navigate to a URL and verify the page title",
    "code": "...",
    "testUrl": "https://playwright.dev",
    "tags": ["navigation", "title"],
    "relatedExamples": [],
    "bestPractices": [],
    "commonPitfalls": []
  }
]
```

#### GET /api/examples/:id
Get specific example by ID

**Parameters:**
- `id` (string): Example ID

**Response:**
```json
{
  "id": "basic-navigation",
  "title": "Basic Page Navigation",
  ...
}
```

#### POST /api/run-test
Execute a test

**Request Body:**
```json
{
  "code": "import { test } from '@playwright/test'; ...",
  "browser": "chromium" // or firefox, webkit
}
```

**Response:**
```json
{
  "success": true,
  "output": "Test output...",
  "videoUrl": "/api/media/uuid/video.webm",
  "screenshots": ["/api/media/uuid/screenshot.png"],
  "duration": 1234
}
```

#### POST /api/playground/execute
Execute playground code

Same as `/api/run-test`

#### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Rate Limiting

- General API: 100 requests per 15 minutes per IP
- Test execution: 20 requests per 5 minutes per IP

### Security

- Code validation prevents dangerous operations
- Sandboxed test execution
- Automatic cleanup of old media files
- Input sanitization

## 🎨 Customization

### Changing Theme Colors

Edit `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Modifying Test Timeout

Edit `backend/src/services/testExecutionService.ts`:

```typescript
page.setDefaultTimeout(30000) // Change this value
```

### Adding Custom Templates

Edit `frontend/src/pages/PlaygroundPage.tsx` to add more template buttons.

## 🧪 Testing

### Run Backend Tests

```bash
cd backend
npm test
```

### Run Frontend Tests

```bash
cd frontend
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev) - The amazing testing framework
- [React](https://react.dev) - UI library
- [Express](https://expressjs.com) - Backend framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor

## 📞 Support

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/playwright-gallery/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/playwright-gallery/discussions)

## 🗺️ Roadmap

- [ ] User authentication and saved tests
- [ ] Share test snippets via URL
- [ ] Export tests as GitHub Actions workflows
- [ ] CI/CD integration examples
- [ ] Visual regression testing examples
- [ ] Performance testing examples
- [ ] Community-submitted examples
- [ ] Multi-language support

## ⚡ Performance

- Lazy loading of examples
- Video compression
- Automatic media cleanup
- Efficient caching strategy
- Optimized bundle sizes

## 🔒 Security

- Rate limiting on API endpoints
- Code validation and sanitization
- Sandboxed test execution
- No access to file system or network in user code
- Regular dependency updates

---

Made with ❤️ for the Playwright community

**Star ⭐ this repository if you find it helpful!**
