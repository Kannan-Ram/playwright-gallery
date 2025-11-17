import { examplesData } from '../data/examples.js'

export interface PlaywrightExample {
  id: string
  title: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  code: string
  testUrl: string
  tags: string[]
  relatedExamples: string[]
  bestPractices: string[]
  commonPitfalls: string[]
}

export async function getAllExamples(): Promise<PlaywrightExample[]> {
  return examplesData
}

export async function getExampleById(id: string): Promise<PlaywrightExample | null> {
  const example = examplesData.find((ex) => ex.id === id)
  return example || null
}
