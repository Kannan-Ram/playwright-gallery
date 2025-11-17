import { chromium, firefox, webkit } from '@playwright/test'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export interface TestResult {
  success: boolean
  output: string
  error?: string
  videoUrl?: string
  screenshots?: string[]
  duration?: number
}

type BrowserType = 'chromium' | 'firefox' | 'webkit'

export async function runTest(code: string, browserType: BrowserType = 'chromium'): Promise<TestResult> {
  const startTime = Date.now()
  const testId = uuidv4()
  const mediaDir = join(process.cwd(), 'media', testId)

  // Create media directory
  if (!existsSync(mediaDir)) {
    mkdirSync(mediaDir, { recursive: true })
  }

  let output = ''
  let success = false
  let error: string | undefined
  let videoUrl: string | undefined
  let screenshots: string[] = []

  try {
    // Select browser
    const browserMap = { chromium, firefox, webkit }
    const browserEngine = browserMap[browserType]

    // Launch browser with video recording
    const browser = await browserEngine.launch({
      headless: true,
    })

    const context = await browser.newContext({
      recordVideo: {
        dir: mediaDir,
        size: { width: 1280, height: 720 },
      },
      viewport: { width: 1280, height: 720 },
    })

    const page = await context.newPage()

    // Capture console logs
    const logs: string[] = []
    page.on('console', (msg) => {
      logs.push(`[${msg.type()}] ${msg.text()}`)
    })

    // Set timeout
    page.setDefaultTimeout(30000)

    try {
      // Execute the test code
      // We need to wrap it in an async function to execute
      const wrappedCode = `
        (async () => {
          ${code.replace(/import\s+.*from\s+['"]@playwright\/test['"];?/g, '')}
        })()
      `

      // Create a safer execution context
      const testFunction = new Function('page', 'expect', wrappedCode)

      // Simple expect implementation
      const expect = (value: any) => ({
        toHaveTitle: async (expected: RegExp | string) => {
          const title = await page.title()
          const matches = expected instanceof RegExp ? expected.test(title) : title.includes(expected)
          if (!matches) throw new Error(`Expected title to match ${expected}, but got: ${title}`)
        },
        toBeVisible: async () => {
          if (value && typeof value.isVisible === 'function') {
            const visible = await value.isVisible()
            if (!visible) throw new Error('Element is not visible')
          }
        },
        toBeHidden: async () => {
          if (value && typeof value.isHidden === 'function') {
            const hidden = await value.isHidden()
            if (!hidden) throw new Error('Element is not hidden')
          }
        },
        toHaveText: async (expected: string) => {
          if (value && typeof value.textContent === 'function') {
            const text = await value.textContent()
            if (text !== expected) throw new Error(`Expected text to be "${expected}", but got: "${text}"`)
          }
        },
        toContainText: async (expected: string) => {
          if (value && typeof value.textContent === 'function') {
            const text = await value.textContent()
            if (!text?.includes(expected)) throw new Error(`Expected text to contain "${expected}", but got: "${text}"`)
          }
        },
        toHaveAttribute: async (attr: string, value?: string) => {
          if (value && typeof value.getAttribute === 'function') {
            const attrValue = await value.getAttribute(attr)
            if (attrValue === null) throw new Error(`Element does not have attribute "${attr}"`)
            if (value && attrValue !== value) throw new Error(`Expected attribute "${attr}" to be "${value}", but got: "${attrValue}"`)
          }
        },
        toHaveCount: async (expected: number) => {
          if (value && typeof value.count === 'function') {
            const count = await value.count()
            if (count !== expected) throw new Error(`Expected count to be ${expected}, but got: ${count}`)
          }
        },
        toHaveURL: async (expected: RegExp | string) => {
          const url = page.url()
          const matches = expected instanceof RegExp ? expected.test(url) : url.includes(expected)
          if (!matches) throw new Error(`Expected URL to match ${expected}, but got: ${url}`)
        },
      })

      await testFunction(page, expect)

      output = logs.join('\n') || 'Test executed successfully'
      success = true

      // Take final screenshot
      const screenshotPath = join(mediaDir, 'screenshot.png')
      await page.screenshot({ path: screenshotPath, fullPage: true })
      screenshots.push(`/api/media/${testId}/screenshot.png`)
    } catch (err: any) {
      error = err.message || String(err)
      output = logs.join('\n')
      success = false

      // Take error screenshot
      try {
        const errorScreenshotPath = join(mediaDir, 'error-screenshot.png')
        await page.screenshot({ path: errorScreenshotPath, fullPage: true })
        screenshots.push(`/api/media/${testId}/error-screenshot.png`)
      } catch {}
    }

    // Close browser
    await context.close()
    await browser.close()

    // Video path
    const videoPath = join(mediaDir, 'video.webm')
    // Note: Video might not be immediately available, Playwright saves it after context closes
    videoUrl = `/api/media/${testId}/video.webm`
  } catch (err: any) {
    error = err.message || String(err)
    success = false
  }

  const duration = Date.now() - startTime

  return {
    success,
    output,
    error,
    videoUrl: success || error ? videoUrl : undefined,
    screenshots: screenshots.length > 0 ? screenshots : undefined,
    duration,
  }
}
