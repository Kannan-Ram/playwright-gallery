import { Request, Response, NextFunction } from 'express'

// Dangerous patterns that should be blocked
const DANGEROUS_PATTERNS = [
  /require\s*\(/,
  /import\s+.*\s+from\s+['"](?!@playwright)/,
  /eval\s*\(/,
  /Function\s*\(/,
  /child_process/,
  /fs\./,
  /process\./,
  /__dirname/,
  /__filename/,
  /\.env/,
]

export function validateTestCode(req: Request, res: Response, next: NextFunction) {
  const { code } = req.body

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      error: 'Code is required and must be a string',
    })
  }

  if (code.length > 10000) {
    return res.status(400).json({
      error: 'Code is too long (max 10000 characters)',
    })
  }

  // Check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(code)) {
      return res.status(400).json({
        error: 'Code contains potentially dangerous patterns',
      })
    }
  }

  // Validate browser
  const { browser } = req.body
  if (browser && !['chromium', 'firefox', 'webkit'].includes(browser)) {
    return res.status(400).json({
      error: 'Invalid browser. Must be chromium, firefox, or webkit',
    })
  }

  next()
}
