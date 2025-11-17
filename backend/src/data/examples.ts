export const examplesData = [
  // BASICS
  {
    id: 'basic-navigation',
    title: 'Basic Page Navigation',
    category: 'basics',
    difficulty: 'beginner',
    description: 'Navigate to a URL and verify the page title',
    code: `import { test, expect } from '@playwright/test';

test('navigate to page', async ({ page }) => {
  // Navigate to URL
  await page.goto('https://playwright.dev');

  // Verify page title
  await expect(page).toHaveTitle(/Playwright/);

  console.log('Navigation successful!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['navigation', 'title', 'basic'],
    relatedExamples: ['basic-click', 'basic-typing'],
    bestPractices: [
      'Always verify page load with title or URL checks',
      'Use regex patterns for flexible title matching',
      'Set appropriate timeouts for slow networks',
    ],
    commonPitfalls: [
      'Not waiting for page to fully load before assertions',
      'Using exact title matches that might change',
    ],
  },
  {
    id: 'basic-click',
    title: 'Click Elements',
    category: 'basics',
    difficulty: 'beginner',
    description: 'Click on buttons and links',
    code: `import { test, expect } from '@playwright/test';

test('click button', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Click on link
  await page.click('text=Get started');

  // Verify navigation
  await expect(page).toHaveURL(/.*intro/);

  console.log('Click successful!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['click', 'button', 'link', 'basic'],
    relatedExamples: ['basic-navigation', 'selector-text'],
    bestPractices: [
      'Use text selectors for better readability',
      'Verify state changes after clicks',
      'Wait for navigation to complete',
    ],
    commonPitfalls: [
      'Clicking before element is ready',
      'Not handling navigation promises',
    ],
  },
  {
    id: 'basic-typing',
    title: 'Type into Input Fields',
    category: 'basics',
    difficulty: 'beginner',
    description: 'Fill text into input fields',
    code: `import { test, expect } from '@playwright/test';

test('fill input', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Find search input and type
  await page.fill('input[type="search"]', 'testing');

  // Verify value
  const value = await page.inputValue('input[type="search"]');
  console.log('Input value:', value);
});`,
    testUrl: 'https://playwright.dev',
    tags: ['input', 'fill', 'typing', 'basic'],
    relatedExamples: ['basic-navigation', 'action-keyboard'],
    bestPractices: [
      'Use fill() for faster input',
      'Use type() when you need to simulate real typing',
      'Clear fields before filling',
    ],
    commonPitfalls: [
      'Forgetting to wait for input to be ready',
      'Not clearing previous values',
    ],
  },
  {
    id: 'basic-screenshot',
    title: 'Take Screenshots',
    category: 'basics',
    difficulty: 'beginner',
    description: 'Capture full page and element screenshots',
    code: `import { test } from '@playwright/test';

test('take screenshot', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Full page screenshot
  await page.screenshot({ path: 'fullpage.png', fullPage: true });

  // Element screenshot
  await page.locator('.hero').screenshot({ path: 'hero.png' });

  console.log('Screenshots captured!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['screenshot', 'capture', 'basic'],
    relatedExamples: ['basic-navigation'],
    bestPractices: [
      'Use fullPage option for complete captures',
      'Take screenshots on failures for debugging',
      'Use consistent naming conventions',
    ],
    commonPitfalls: [
      'Not waiting for page to be fully loaded',
      'Forgetting to handle dynamic content',
    ],
  },

  // SELECTORS
  {
    id: 'selector-css',
    title: 'CSS Selectors',
    category: 'selectors',
    difficulty: 'beginner',
    description: 'Use CSS selectors to find elements',
    code: `import { test, expect } from '@playwright/test';

test('css selectors', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Class selector
  await page.locator('.navbar').click();

  // ID selector
  await page.locator('#searchbox');

  // Attribute selector
  await page.locator('input[type="search"]').fill('test');

  // Descendant selector
  await page.locator('nav > a').first().click();

  console.log('CSS selectors work!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['selectors', 'css', 'locator'],
    relatedExamples: ['selector-text', 'selector-xpath'],
    bestPractices: [
      'Prefer data-testid attributes for stability',
      'Use specific selectors to avoid ambiguity',
      'Combine selectors for precision',
    ],
    commonPitfalls: [
      'Using fragile class names that change',
      'Overly complex selectors',
    ],
  },
  {
    id: 'selector-text',
    title: 'Text Selectors',
    category: 'selectors',
    difficulty: 'beginner',
    description: 'Select elements by their text content',
    code: `import { test } from '@playwright/test';

test('text selectors', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Exact text match
  await page.locator('text=Get started').click();

  // Partial text match
  await page.locator('text=/Get start/').click();

  // Text within specific element
  await page.locator('button:has-text("Search")');

  console.log('Text selectors work!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['selectors', 'text', 'locator'],
    relatedExamples: ['selector-css', 'selector-role'],
    bestPractices: [
      'Use text selectors for readable tests',
      'Combine with element tags for specificity',
      'Use regex for flexible matching',
    ],
    commonPitfalls: [
      'Text content changes breaking tests',
      'Not handling case sensitivity',
    ],
  },
  {
    id: 'selector-role',
    title: 'Role-based Selectors',
    category: 'selectors',
    difficulty: 'intermediate',
    description: 'Use ARIA roles to select accessible elements',
    code: `import { test, expect } from '@playwright/test';

test('role selectors', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Select by role
  await page.getByRole('button', { name: 'Search' });

  // Select link by role
  await page.getByRole('link', { name: 'Get started' }).click();

  // Select heading
  await page.getByRole('heading', { level: 1 });

  console.log('Role selectors work!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['selectors', 'role', 'accessibility', 'aria'],
    relatedExamples: ['selector-text', 'selector-css'],
    bestPractices: [
      'Prefer role selectors for accessibility',
      'Use name option for disambiguation',
      'Test with screen readers',
    ],
    commonPitfalls: [
      'Missing or incorrect ARIA roles in markup',
      'Not considering mobile accessibility',
    ],
  },
  {
    id: 'selector-xpath',
    title: 'XPath Selectors',
    category: 'selectors',
    difficulty: 'advanced',
    description: 'Use XPath expressions for complex selections',
    code: `import { test } from '@playwright/test';

test('xpath selectors', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // XPath selector
  await page.locator('xpath=//button[contains(text(), "Search")]');

  // Parent navigation
  await page.locator('xpath=//input/parent::div');

  // Following sibling
  await page.locator('xpath=//h1/following-sibling::p');

  console.log('XPath selectors work!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['selectors', 'xpath', 'advanced'],
    relatedExamples: ['selector-css', 'selector-chain'],
    bestPractices: [
      'Use XPath only when CSS is insufficient',
      'Keep XPath expressions simple',
      'Test XPath in browser console first',
    ],
    commonPitfalls: [
      'Overly complex XPath expressions',
      'Performance issues with // operator',
    ],
  },

  // ACTIONS
  {
    id: 'action-mouse',
    title: 'Mouse Actions',
    category: 'actions',
    difficulty: 'intermediate',
    description: 'Perform various mouse actions',
    code: `import { test } from '@playwright/test';

test('mouse actions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Single click
  await page.click('text=Docs');

  // Double click
  await page.dblclick('text=API');

  // Right click
  await page.click('text=Docs', { button: 'right' });

  // Hover
  await page.hover('nav a');

  console.log('Mouse actions complete!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['actions', 'mouse', 'click', 'hover'],
    relatedExamples: ['action-keyboard', 'action-drag'],
    bestPractices: [
      'Wait for elements before interaction',
      'Use hover to reveal hidden elements',
      'Consider mobile touch alternatives',
    ],
    commonPitfalls: [
      'Not waiting for hover effects',
      'Clicking covered elements',
    ],
  },
  {
    id: 'action-keyboard',
    title: 'Keyboard Actions',
    category: 'actions',
    difficulty: 'intermediate',
    description: 'Simulate keyboard input and shortcuts',
    code: `import { test } from '@playwright/test';

test('keyboard actions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Press single key
  await page.press('body', 'Escape');

  // Type text
  await page.type('input[type="search"]', 'playwright');

  // Keyboard shortcuts
  await page.press('body', 'Control+F');

  // Press Enter
  await page.press('input', 'Enter');

  console.log('Keyboard actions complete!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['actions', 'keyboard', 'typing', 'shortcuts'],
    relatedExamples: ['action-mouse', 'basic-typing'],
    bestPractices: [
      'Use fill() for speed, type() for realism',
      'Test keyboard navigation',
      'Handle different keyboard layouts',
    ],
    commonPitfalls: [
      'Not waiting between keypress events',
      'Platform-specific shortcuts failing',
    ],
  },
  {
    id: 'action-upload',
    title: 'File Upload',
    category: 'actions',
    difficulty: 'intermediate',
    description: 'Upload files using input elements',
    code: `import { test } from '@playwright/test';

test('file upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  // Set file to upload
  await page.setInputFiles('input[type="file"]', {
    name: 'test.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Test content')
  });

  // Submit form
  await page.click('input[type="submit"]');

  console.log('File uploaded!');
});`,
    testUrl: 'https://the-internet.herokuapp.com/upload',
    tags: ['actions', 'upload', 'file', 'input'],
    relatedExamples: ['action-mouse'],
    bestPractices: [
      'Use setInputFiles for file inputs',
      'Test with various file types',
      'Verify upload success',
    ],
    commonPitfalls: [
      'Not waiting for upload to complete',
      'File path issues across platforms',
    ],
  },

  // ASSERTIONS
  {
    id: 'assert-visibility',
    title: 'Visibility Assertions',
    category: 'assertions',
    difficulty: 'beginner',
    description: 'Assert element visibility states',
    code: `import { test, expect } from '@playwright/test';

test('visibility assertions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Assert visible
  await expect(page.locator('nav')).toBeVisible();

  // Assert hidden
  await expect(page.locator('.hidden-element')).toBeHidden();

  // Check if element exists
  const count = await page.locator('a').count();
  console.log('Found links:', count);
});`,
    testUrl: 'https://playwright.dev',
    tags: ['assertions', 'visibility', 'expect'],
    relatedExamples: ['assert-content', 'assert-attributes'],
    bestPractices: [
      'Use toBeVisible for interactive elements',
      'Consider viewport and scrolling',
      'Test responsive visibility',
    ],
    commonPitfalls: [
      'Not accounting for CSS opacity',
      'Elements outside viewport',
    ],
  },
  {
    id: 'assert-content',
    title: 'Content Assertions',
    category: 'assertions',
    difficulty: 'beginner',
    description: 'Verify text content and values',
    code: `import { test, expect } from '@playwright/test';

test('content assertions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Exact text match
  await expect(page.locator('h1')).toHaveText('Playwright');

  // Contains text
  await expect(page.locator('.hero')).toContainText('reliable');

  // Input value
  await page.fill('input', 'test');
  await expect(page.locator('input')).toHaveValue('test');

  console.log('Content assertions passed!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['assertions', 'content', 'text', 'value'],
    relatedExamples: ['assert-visibility', 'assert-count'],
    bestPractices: [
      'Use toContainText for flexible matching',
      'Trim whitespace in comparisons',
      'Test with dynamic content',
    ],
    commonPitfalls: [
      'Exact matches breaking on whitespace',
      'Not handling special characters',
    ],
  },
  {
    id: 'assert-attributes',
    title: 'Attribute Assertions',
    category: 'assertions',
    difficulty: 'intermediate',
    description: 'Check element attributes and properties',
    code: `import { test, expect } from '@playwright/test';

test('attribute assertions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Has attribute
  await expect(page.locator('a')).toHaveAttribute('href');

  // Attribute value
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /favicon/);

  // CSS class
  await expect(page.locator('nav')).toHaveClass(/navbar/);

  console.log('Attribute assertions passed!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['assertions', 'attributes', 'properties'],
    relatedExamples: ['assert-content', 'assert-visibility'],
    bestPractices: [
      'Use regex for flexible attribute matching',
      'Check ARIA attributes for accessibility',
      'Verify data attributes',
    ],
    commonPitfalls: [
      'Confusing attributes with properties',
      'Not handling null attributes',
    ],
  },
  {
    id: 'assert-count',
    title: 'Count Assertions',
    category: 'assertions',
    difficulty: 'beginner',
    description: 'Verify the number of matching elements',
    code: `import { test, expect } from '@playwright/test';

test('count assertions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Count elements
  await expect(page.locator('nav a')).toHaveCount(5);

  // At least one
  const count = await page.locator('a').count();
  expect(count).toBeGreaterThan(0);

  console.log('Found', count, 'links');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['assertions', 'count', 'collection'],
    relatedExamples: ['assert-visibility', 'selector-css'],
    bestPractices: [
      'Use toHaveCount for exact counts',
      'Test edge cases (0, 1, many)',
      'Consider dynamic content',
    ],
    commonPitfalls: [
      'Not waiting for all elements to load',
      'Counting hidden elements',
    ],
  },

  // WAITS
  {
    id: 'wait-auto',
    title: 'Auto-waiting',
    category: 'waits',
    difficulty: 'beginner',
    description: 'Understand Playwright auto-waiting behavior',
    code: `import { test, expect } from '@playwright/test';

test('auto waiting', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Playwright auto-waits for:
  // - Element to be attached
  // - Element to be visible
  // - Element to be stable
  // - Element to receive events

  await page.click('text=Get started'); // Auto-waits
  await page.fill('input', 'test'); // Auto-waits

  console.log('Auto-waiting works!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['waits', 'auto-wait', 'actionability'],
    relatedExamples: ['wait-explicit', 'wait-network'],
    bestPractices: [
      'Trust auto-waiting for most cases',
      'Understand actionability checks',
      'Configure timeouts appropriately',
    ],
    commonPitfalls: [
      'Adding unnecessary explicit waits',
      'Not understanding what triggers waits',
    ],
  },
  {
    id: 'wait-explicit',
    title: 'Explicit Waits',
    category: 'waits',
    difficulty: 'intermediate',
    description: 'Use explicit wait conditions',
    code: `import { test } from '@playwright/test';

test('explicit waits', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Wait for selector
  await page.waitForSelector('text=Documentation');

  // Wait for timeout
  await page.waitForTimeout(1000);

  // Wait for function
  await page.waitForFunction(() => document.readyState === 'complete');

  // Wait for load state
  await page.waitForLoadState('networkidle');

  console.log('Explicit waits complete!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['waits', 'explicit', 'waitFor'],
    relatedExamples: ['wait-auto', 'wait-network'],
    bestPractices: [
      'Use specific wait conditions',
      'Avoid arbitrary timeouts',
      'Wait for meaningful states',
    ],
    commonPitfalls: [
      'Overusing waitForTimeout',
      'Not setting appropriate timeouts',
    ],
  },
  {
    id: 'wait-network',
    title: 'Wait for Network',
    category: 'waits',
    difficulty: 'advanced',
    description: 'Wait for network requests to complete',
    code: `import { test } from '@playwright/test';

test('wait for network', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Wait for specific request
  const responsePromise = page.waitForResponse(
    response => response.url().includes('api') && response.status() === 200
  );

  await page.click('button');
  const response = await responsePromise;

  console.log('Response:', await response.json());
});`,
    testUrl: 'https://playwright.dev',
    tags: ['waits', 'network', 'requests', 'api'],
    relatedExamples: ['wait-explicit', 'advanced-network'],
    bestPractices: [
      'Wait for specific API responses',
      'Check response status codes',
      'Handle network errors',
    ],
    commonPitfalls: [
      'Not handling failed requests',
      'Waiting for wrong URLs',
    ],
  },

  // ADVANCED
  {
    id: 'advanced-network',
    title: 'Network Interception',
    category: 'advanced',
    difficulty: 'advanced',
    description: 'Intercept and modify network requests',
    code: `import { test } from '@playwright/test';

test('network interception', async ({ page }) => {
  // Intercept all requests
  await page.route('**/*', route => {
    console.log('Request:', route.request().url());
    route.continue();
  });

  // Mock API response
  await page.route('**/api/**', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true })
    });
  });

  await page.goto('https://playwright.dev');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['advanced', 'network', 'interception', 'mocking'],
    relatedExamples: ['wait-network', 'advanced-contexts'],
    bestPractices: [
      'Mock external dependencies',
      'Test error scenarios',
      'Log network activity',
    ],
    commonPitfalls: [
      'Not calling route.continue()',
      'Overly broad route patterns',
    ],
  },
  {
    id: 'advanced-contexts',
    title: 'Multiple Browser Contexts',
    category: 'advanced',
    difficulty: 'advanced',
    description: 'Use multiple isolated browser contexts',
    code: `import { test, chromium } from '@playwright/test';

test('multiple contexts', async () => {
  const browser = await chromium.launch();

  // Create contexts
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();

  // Pages in different contexts
  const page1 = await context1.newPage();
  const page2 = await context2.newPage();

  await page1.goto('https://playwright.dev');
  await page2.goto('https://playwright.dev');

  // Contexts are isolated
  console.log('Two isolated sessions!');

  await browser.close();
});`,
    testUrl: 'https://playwright.dev',
    tags: ['advanced', 'context', 'isolation', 'browser'],
    relatedExamples: ['advanced-mobile', 'advanced-auth'],
    bestPractices: [
      'Use contexts for parallel testing',
      'Isolate test data',
      'Clean up contexts properly',
    ],
    commonPitfalls: [
      'Not closing contexts',
      'Sharing state between contexts',
    ],
  },
  {
    id: 'advanced-mobile',
    title: 'Mobile Emulation',
    category: 'advanced',
    difficulty: 'advanced',
    description: 'Emulate mobile devices',
    code: `import { test, devices } from '@playwright/test';

test('mobile emulation', async ({ browser }) => {
  const iPhone = devices['iPhone 12'];

  const context = await browser.newContext({
    ...iPhone,
  });

  const page = await context.newPage();
  await page.goto('https://playwright.dev');

  // Test mobile-specific features
  await page.locator('.mobile-menu').click();

  console.log('Mobile test complete!');
  await context.close();
});`,
    testUrl: 'https://playwright.dev',
    tags: ['advanced', 'mobile', 'emulation', 'devices'],
    relatedExamples: ['advanced-contexts'],
    bestPractices: [
      'Test on multiple device types',
      'Consider touch interactions',
      'Test responsive design',
    ],
    commonPitfalls: [
      'Not testing touch events',
      'Assuming desktop interactions work',
    ],
  },

  // PATTERNS
  {
    id: 'pattern-pom',
    title: 'Page Object Model',
    category: 'patterns',
    difficulty: 'advanced',
    description: 'Implement Page Object Model pattern',
    code: `import { test, expect } from '@playwright/test';

// Page Object
class HomePage {
  constructor(private page: any) {}

  async navigate() {
    await this.page.goto('https://playwright.dev');
  }

  async clickGetStarted() {
    await this.page.click('text=Get started');
  }

  async searchFor(term: string) {
    await this.page.fill('input[type="search"]', term);
  }
}

test('page object model', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.clickGetStarted();

  await expect(page).toHaveURL(/.*intro/);
});`,
    testUrl: 'https://playwright.dev',
    tags: ['patterns', 'pom', 'page-object', 'architecture'],
    relatedExamples: ['pattern-fixtures'],
    bestPractices: [
      'Encapsulate page logic in objects',
      'Use descriptive method names',
      'Return page objects for chaining',
    ],
    commonPitfalls: [
      'Too granular page objects',
      'Mixing test logic with page objects',
    ],
  },
  {
    id: 'pattern-fixtures',
    title: 'Custom Fixtures',
    category: 'patterns',
    difficulty: 'advanced',
    description: 'Create reusable test fixtures',
    code: `import { test as base } from '@playwright/test';

// Extend base test with fixtures
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://playwright.dev');
    // Perform authentication
    await page.click('text=Sign in');
    await use(page);
    // Cleanup
    await page.click('text=Sign out');
  }
});

test('with fixture', async ({ authenticatedPage }) => {
  // Page is already authenticated
  await authenticatedPage.goto('/dashboard');
  console.log('Using authenticated page!');
});`,
    testUrl: 'https://playwright.dev',
    tags: ['patterns', 'fixtures', 'reusability'],
    relatedExamples: ['pattern-pom'],
    bestPractices: [
      'Create fixtures for common setups',
      'Handle cleanup properly',
      'Share fixtures across tests',
    ],
    commonPitfalls: [
      'Not cleaning up fixtures',
      'Overly complex fixtures',
    ],
  },

  // REAL WORLD
  {
    id: 'real-form-validation',
    title: 'Form Validation Testing',
    category: 'real-world',
    difficulty: 'intermediate',
    description: 'Test complex form validation',
    code: `import { test, expect } from '@playwright/test';

test('form validation', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // Test empty submission
  await page.click('button[type="submit"]');

  // Test invalid credentials
  await page.fill('#username', 'invalid');
  await page.fill('#password', 'wrong');
  await page.click('button[type="submit"]');

  // Verify error message
  await expect(page.locator('.error')).toBeVisible();

  console.log('Validation tests complete!');
});`,
    testUrl: 'https://the-internet.herokuapp.com/login',
    tags: ['real-world', 'form', 'validation', 'error'],
    relatedExamples: ['basic-typing', 'assert-visibility'],
    bestPractices: [
      'Test all validation rules',
      'Verify error messages',
      'Test edge cases',
    ],
    commonPitfalls: [
      'Not testing all input combinations',
      'Skipping accessibility checks',
    ],
  },
  {
    id: 'real-auth-flow',
    title: 'Authentication Flow',
    category: 'real-world',
    difficulty: 'advanced',
    description: 'Test complete authentication flow',
    code: `import { test, expect } from '@playwright/test';

test('authentication', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // Login
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  // Verify logged in
  await expect(page.locator('.flash.success')).toBeVisible();

  // Logout
  await page.click('text=Logout');

  // Verify logged out
  await expect(page.locator('.flash.success')).toBeVisible();

  console.log('Auth flow complete!');
});`,
    testUrl: 'https://the-internet.herokuapp.com/login',
    tags: ['real-world', 'authentication', 'login', 'security'],
    relatedExamples: ['real-form-validation', 'pattern-fixtures'],
    bestPractices: [
      'Store credentials securely',
      'Test session persistence',
      'Handle logout properly',
    ],
    commonPitfalls: [
      'Hardcoding credentials',
      'Not testing session expiry',
    ],
  },
  {
    id: 'real-dynamic-content',
    title: 'Dynamic Content Handling',
    category: 'real-world',
    difficulty: 'intermediate',
    description: 'Handle dynamically loaded content',
    code: `import { test, expect } from '@playwright/test';

test('dynamic content', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

  // Start loading
  await page.click('button');

  // Wait for content to appear
  await page.waitForSelector('#finish');

  // Verify content
  await expect(page.locator('#finish')).toContainText('Hello World!');

  console.log('Dynamic content loaded!');
});`,
    testUrl: 'https://the-internet.herokuapp.com/dynamic_loading/2',
    tags: ['real-world', 'dynamic', 'loading', 'ajax'],
    relatedExamples: ['wait-explicit', 'wait-network'],
    bestPractices: [
      'Wait for specific elements',
      'Handle loading states',
      'Test error scenarios',
    ],
    commonPitfalls: [
      'Using arbitrary timeouts',
      'Not handling load failures',
    ],
  },
]
