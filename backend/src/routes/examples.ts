import express from 'express'
import { getAllExamples, getExampleById } from '../services/exampleService.js'

const router = express.Router()

// GET /api/examples - Get all examples
router.get('/', async (req, res, next) => {
  try {
    const examples = await getAllExamples()
    res.json(examples)
  } catch (error) {
    next(error)
  }
})

// GET /api/examples/:id - Get specific example
router.get('/:id', async (req, res, next) => {
  try {
    const example = await getExampleById(req.params.id)
    if (!example) {
      return res.status(404).json({ error: 'Example not found' })
    }
    res.json(example)
  } catch (error) {
    next(error)
  }
})

export default router
