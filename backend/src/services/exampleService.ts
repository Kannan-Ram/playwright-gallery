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


function normalizeDifficulty(difficulty: string): 'beginner' | 'intermediate' | 'advanced' {
  if (difficulty === 'beginner' || difficulty === 'intermediate' || difficulty === 'advanced') {
    return difficulty;
  }
  return 'beginner'; // fallback
}

export async function getAllExamples(): Promise<PlaywrightExample[]> {
  // Map difficulty to correct type
  return examplesData.map((ex: any) => ({
    ...ex,
    difficulty: normalizeDifficulty(ex.difficulty),
  }));
}

export async function getExampleById(id: string): Promise<PlaywrightExample | null> {
  const ex = examplesData.find((ex) => ex.id === id);
  if (!ex) return null;
  return {
    ...ex,
    difficulty: normalizeDifficulty(ex.difficulty),
  };
}
