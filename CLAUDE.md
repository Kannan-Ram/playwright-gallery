# CLAUDE.md - Development Guide for Claude Code

This document provides context and guidance for working on the Playwright Gallery project using Claude Code.

## 🎯 Project Overview

**Playwright Gallery** is a full-stack web application that serves as an interactive showcase and learning platform for the Playwright testing framework. Think of it as "Storybook for Playwright tests."

### Key Features
- Interactive gallery of 30+ Playwright examples across 8 categories
- Live test execution with video recording and screenshots
- Code playground for experimenting with Playwright
- Multi-browser support (Chromium, Firefox, WebKit)
- Real-time test results with detailed output

## 📐 Architecture

### Monorepo Structure
```
playwright-gallery/
├── frontend/     # React + TypeScript + Tailwind CSS
├── backend/      # Express + Playwright test execution
└── demo-site/    # Test target site with various UI elements
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for bundling
- Tailwind CSS for styling
- Monaco Editor for code editing
- Prism.js for syntax highlighting
- Axios for API calls

**Backend:**
- Express.js server
- TypeScript
- Playwright for test execution
- Rate limiting and security middleware
- File-based example storage

**Demo Site:**
- Vanilla HTML/CSS/JavaScript
- Vite for serving
- Interactive test targets

## 🧭 Key Directories and Files

### Frontend Important Files

```
frontend/src/
├── types/index.ts           # TypeScript type definitions
├── utils/constants.ts       # Categories, colors, API URLs
├── components/
│   ├── Gallery/
│   │   ├── ExampleCard.tsx       # Gallery item card
│   │   ├── ExampleViewer.tsx     # Full example display with test runner
│   │   ├── CategoryFilter.tsx    # Filter controls
│   │   └── SearchBar.tsx         # Search functionality
│   ├── Playground/
│   │   ├── CodeEditor.tsx        # Monaco editor wrapper
│   │   ├── ResultsPanel.tsx      # Test results display
│   │   └── TestRunner.tsx        # Test execution controls
│   ├── Layout/
│   │   ├── Layout.tsx           # Main layout wrapper
│   │   ├── Header.tsx           # Top navigation
│   │   ├── Sidebar.tsx          # Side navigation
│   │   └── Footer.tsx           # Footer component
│   └── Common/
│       ├── CodeHighlighter.tsx  # Prism.js wrapper
│       ├── VideoPlayer.tsx      # Video playback
│       └── LoadingSpinner.tsx   # Loading indicator
└── pages/
    ├── HomePage.tsx             # Landing page
    ├── GalleryPage.tsx          # Example gallery with filtering
    ├── ExampleDetailPage.tsx    # Single example view
    └── PlaygroundPage.tsx       # Code playground
```

### Backend Important Files

```
backend/src/
├── index.ts                 # Express server setup
├── routes/
│   ├── examples.ts          # GET /api/examples endpoints
│   ├── testRunner.ts        # POST /api/run-test
│   └── playground.ts        # POST /api/playground/execute
├── services/
│   ├── exampleService.ts    # Example data management
│   └── testExecutionService.ts  # Playwright test execution
├── middleware/
│   └── validation.ts        # Request validation and security
├── data/
│   └── examples.ts          # All example definitions
└── utils/
    └── cleanup.ts           # Media file cleanup
```

## 🔧 Common Development Tasks

### Adding a New Example

1. Open `backend/src/data/examples.ts`
2. Add to the `examplesData` array:
```typescript
{
  id: 'my-new-example',
  title: 'My New Example',
  category: 'basics', // basics, selectors, actions, assertions, waits, advanced, patterns, real-world
  difficulty: 'beginner', // beginner, intermediate, advanced
  description: 'Brief description of what this example demonstrates',
  code: `import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  // Your test code here
});`,
  testUrl: 'https://example.com',
  tags: ['tag1', 'tag2'],
  relatedExamples: ['other-example-id'],
  bestPractices: [
    'Practice 1',
    'Practice 2'
  ],
  commonPitfalls: [
    'Pitfall 1',
    'Pitfall 2'
  ],
}
```

### Adding a New Category

1. Open `frontend/src/types/index.ts`
2. Add to `CategoryType`:
```typescript
export type CategoryType =
  | 'basics'
  | 'selectors'
  // ... existing categories
  | 'my-new-category';
```

3. Open `frontend/src/utils/constants.ts`
4. Add to `CATEGORIES`:
```typescript
'my-new-category': {
  id: 'my-new-category',
  name: 'My Category',
  description: 'Description of the category',
  icon: '🎨', // Pick an emoji
  color: 'bg-blue-500', // Tailwind color class
},
```

### Modifying the Demo Site

The demo site (`demo-site/index.html`) contains various UI elements for testing:
- Forms with validation
- Buttons and interactive elements
- Dynamic content loading
- Drag and drop
- Modals
- Tables

To add new test targets:
1. Edit `demo-site/index.html` - Add HTML structure
2. Edit `demo-site/public/script.js` - Add JavaScript interactivity

### Modifying Test Execution

The core test execution logic is in `backend/src/services/testExecutionService.ts`:

**Key functions:**
- `runTest()` - Main test execution function
- Browser launch configuration
- Video recording setup
- Screenshot capture
- Custom expect implementation

**Timeout configuration:**
```typescript
page.setDefaultTimeout(30000) // 30 seconds
```

**Browser options:**
```typescript
const browser = await browserEngine.launch({
  headless: true, // Run without UI
})
```

### Customizing UI Theme

Tailwind configuration is in `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize these colors
        500: '#22c55e',
        600: '#16a34a',
        // ...
      },
    },
  },
}
```

## 🐛 Debugging Tips

### Frontend Debugging
- Check browser console for errors
- React DevTools for component inspection
- Network tab for API calls
- Use `console.log()` in components

### Backend Debugging
- Server logs in terminal
- Add `console.log()` in services
- Check `backend/media/` for generated videos/screenshots
- Test execution timeout is 30 seconds

### Common Issues

**Issue:** Tests fail with timeout
- Check if demo site is running on port 3002
- Verify test URL in example code
- Increase timeout in `testExecutionService.ts`

**Issue:** Video not playing
- Videos are saved asynchronously after context closes
- Check if media directory exists
- Verify file permissions

**Issue:** Frontend can't reach backend
- Ensure backend is running on port 3001
- Check proxy configuration in `frontend/vite.config.ts`
- Verify CORS settings in `backend/src/index.ts`

## 🔒 Security Considerations

The backend validates all user code for security:

**Blocked patterns** (in `backend/src/middleware/validation.ts`):
- `require()` calls (except Playwright)
- File system access (`fs.`)
- Process access (`process.`)
- Child processes
- eval/Function constructors

**Rate limiting:**
- 100 requests per 15 minutes (general API)
- 20 test executions per 5 minutes

**Media cleanup:**
- Old files deleted after 1 hour
- Automatic cleanup runs every hour

## 📦 Dependencies to Know

### Critical Dependencies
- `@playwright/test` - Test framework
- `express` - Web server
- `react` - UI library
- `@monaco-editor/react` - Code editor
- `prismjs` - Syntax highlighting

### Development Dependencies
- `typescript` - Type checking
- `vite` - Build tool
- `tsx` - TypeScript execution
- `tailwindcss` - CSS framework

## 🚀 Deployment Checklist

1. **Environment Variables:**
   - `VITE_API_URL` - Backend API URL
   - `VITE_DEMO_URL` - Demo site URL
   - `PORT` - Backend port (default: 3001)

2. **Build Steps:**
   ```bash
   npm run build        # Build all projects
   npm run start        # Start in production mode
   ```

3. **Docker:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

4. **Health Check:**
   - GET `/api/health` should return `{"status": "ok"}`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Gallery page loads with examples
- [ ] Search and filters work
- [ ] Example detail page displays correctly
- [ ] Test execution produces video/screenshots
- [ ] Playground accepts custom code
- [ ] All three browsers work (Chromium, Firefox, WebKit)
- [ ] Dark mode toggles correctly
- [ ] Mobile responsive design works

### Test Examples
Test the application with these scenarios:
1. Run a basic navigation test
2. Test form interaction example
3. Try playground with custom code
4. Check video recording playback
5. Verify screenshot capture
6. Test rate limiting (20 requests)

## 📝 Code Style Guidelines

### TypeScript
- Use strict type checking
- Prefer interfaces over types for objects
- Use explicit return types for functions
- Avoid `any` - use `unknown` if needed

### React
- Functional components with hooks
- Extract logic into custom hooks
- Use meaningful component names
- Keep components focused and small

### CSS (Tailwind)
- Use utility classes
- Extract repeated patterns to CSS classes
- Follow mobile-first approach
- Use design tokens from theme

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev)
- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com/en/guide/routing.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/api/index.html)

## 🔄 Future Enhancement Ideas

### Short-term
- [ ] Add more examples (targeting 50+ total)
- [ ] Improve error messages
- [ ] Add test templates in playground
- [ ] Better mobile experience

### Medium-term
- [ ] User authentication
- [ ] Save/share test snippets
- [ ] Export as GitHub Actions workflow
- [ ] Community examples submission

### Long-term
- [ ] Visual regression testing examples
- [ ] Performance testing patterns
- [ ] CI/CD integration guides
- [ ] Multi-language support

## 💡 Tips for AI Assistants

When working on this project:

1. **Adding examples**: Always include best practices and common pitfalls
2. **Modifying UI**: Maintain dark mode compatibility
3. **Backend changes**: Consider security implications
4. **Testing**: Run locally before committing
5. **Documentation**: Update README.md if adding features

## 🤝 Contribution Workflow

1. Create feature branch
2. Make changes
3. Test locally (all 3 services)
4. Update documentation
5. Commit with clear message
6. Push and create PR

## 📞 Getting Help

When debugging:
1. Check terminal output for errors
2. Inspect browser console
3. Review network requests
4. Check file permissions (media directory)
5. Verify all services are running

---

**Last Updated:** 2024
**Maintainer:** Development Team

This document should be updated as the project evolves. Keep it current with architectural changes and new patterns.
