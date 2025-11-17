import { useState } from 'react'
import { TestExecutionResult } from '../types'
import CodeEditor from '../components/Playground/CodeEditor'
import ResultsPanel from '../components/Playground/ResultsPanel'
import TestRunner from '../components/Playground/TestRunner'
import { DEMO_SITE_URL } from '../utils/constants'

const DEFAULT_CODE = `import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  // Navigate to the demo site
  await page.goto('${DEMO_SITE_URL}');

  // Your test code here
  await expect(page).toHaveTitle(/Demo/);

  // Example: Click a button
  // await page.click('button');

  // Example: Fill a form
  // await page.fill('input[name="email"]', 'test@example.com');

  // Example: Take a screenshot
  // await page.screenshot({ path: 'screenshot.png' });
});
`

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [result, setResult] = useState<TestExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleReset = () => {
    setCode(DEFAULT_CODE)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Playground
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write and test your own Playwright code in a safe environment
        </p>
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Tips for using the playground
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <ul className="list-disc list-inside space-y-1">
                <li>Tests run in a sandboxed environment with a 30-second timeout</li>
                <li>You can test against the demo site at {DEMO_SITE_URL}</li>
                <li>Video recordings and screenshots are automatically captured</li>
                <li>Use the Save button to download your test code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <TestRunner
        code={code}
        onRun={setResult}
        onReset={handleReset}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Code Editor
          </h2>
          <CodeEditor value={code} onChange={setCode} readOnly={isRunning} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Results
          </h2>
          <ResultsPanel result={result} />
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Common Test Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() =>
              setCode(`import { test, expect } from '@playwright/test';

test('form submission', async ({ page }) => {
  await page.goto('${DEMO_SITE_URL}');

  // Fill form fields
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.selectOption('select[name="country"]', 'US');
  await page.check('input[name="agree"]');

  // Submit form
  await page.click('button[type="submit"]');

  // Verify success message
  await expect(page.locator('.success-message')).toBeVisible();
});
`)
            }
            className="btn-secondary text-left"
          >
            <div className="font-semibold">Form Submission</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Fill and submit a form with validation
            </div>
          </button>

          <button
            onClick={() =>
              setCode(`import { test, expect } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('${DEMO_SITE_URL}');

  // Click navigation link
  await page.click('a[href="/about"]');

  // Verify URL changed
  await expect(page).toHaveURL(/.*about/);

  // Verify page content
  await expect(page.locator('h1')).toContainText('About');
});
`)
            }
            className="btn-secondary text-left"
          >
            <div className="font-semibold">Navigation</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Navigate between pages and verify URLs
            </div>
          </button>

          <button
            onClick={() =>
              setCode(`import { test, expect } from '@playwright/test';

test('element interaction', async ({ page }) => {
  await page.goto('${DEMO_SITE_URL}');

  // Wait for element
  await page.waitForSelector('.my-element');

  // Hover over element
  await page.hover('.my-element');

  // Click and hold
  await page.click('.draggable', { delay: 100 });

  // Double click
  await page.dblclick('.item');

  // Right click
  await page.click('.context-menu-trigger', { button: 'right' });
});
`)
            }
            className="btn-secondary text-left"
          >
            <div className="font-semibold">Element Interactions</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Various mouse and keyboard interactions
            </div>
          </button>

          <button
            onClick={() =>
              setCode(`import { test, expect } from '@playwright/test';

test('assertions example', async ({ page }) => {
  await page.goto('${DEMO_SITE_URL}');

  // Visibility assertions
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.hidden')).toBeHidden();

  // Content assertions
  await expect(page.locator('h1')).toHaveText('Welcome');
  await expect(page.locator('.message')).toContainText('success');

  // Attribute assertions
  await expect(page.locator('button')).toHaveAttribute('disabled');

  // Count assertions
  await expect(page.locator('li')).toHaveCount(5);
});
`)
            }
            className="btn-secondary text-left"
          >
            <div className="font-semibold">Assertions</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Common assertion patterns
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
