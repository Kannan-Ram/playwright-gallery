import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import examplesRouter from './routes/examples.js'
import testRunnerRouter from './routes/testRunner.js'
import playgroundRouter from './routes/playground.js'
import { cleanupOldFiles } from './utils/cleanup.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true)

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ]

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // Check if origin matches ngrok pattern
    if (/^https?:\/\/.*\.ngrok(-free)?\.app$/.test(origin)) {
      return callback(null, true)
    }

    // For development, allow all origins
    // In production, you should remove this and only allow specific origins
    return callback(null, true)
  },
  credentials: true,
}))
app.use(express.json({ limit: '1mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

const testLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Limit test execution to 20 per 5 minutes
  message: 'Too many test executions, please try again later.',
})

app.use('/api', limiter)
app.use('/api/run-test', testLimiter)
app.use('/api/playground/execute', testLimiter)

// Serve static files (recordings, screenshots)
// Use express.static with proper options for video streaming
app.use('/api/media', express.static('media', {
  setHeaders: (res, path) => {
    if (path.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/webm')
      res.setHeader('Accept-Ranges', 'bytes')
      // Prevent caching of potentially incomplete videos
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
    } else if (path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Cache-Control', 'public, max-age=3600')
    }
  }
}))

// Routes
app.use('/api/examples', examplesRouter)
app.use('/api', testRunnerRouter)
app.use('/api/playground', playgroundRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// Cleanup old files every hour
setInterval(() => {
  cleanupOldFiles()
}, 60 * 60 * 1000)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📚 API available at http://localhost:${PORT}/api`)

  // Initial cleanup
  cleanupOldFiles()
})
