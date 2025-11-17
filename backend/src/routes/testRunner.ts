import express from 'express'
import { runTest } from '../services/testExecutionService.js'
import { validateTestCode } from '../middleware/validation.js'

const router = express.Router()

// POST /api/run-test - Run a test from gallery examples
router.post('/run-test', validateTestCode, async (req, res, next) => {
  try {
    const { code, browser = 'chromium' } = req.body

    const result = await runTest(code, browser)
    res.json(result)
  } catch (error: any) {
    res.status(500).json({
      success: false,
      output: '',
      error: error.message || 'Test execution failed',
    })
  }
})

export default router
