export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type CategoryType =
  | 'basics'
  | 'selectors'
  | 'actions'
  | 'assertions'
  | 'waits'
  | 'advanced'
  | 'patterns'
  | 'real-world';

export interface PlaywrightExample {
  id: string;
  title: string;
  category: CategoryType;
  difficulty: DifficultyLevel;
  description: string;
  code: string;
  testUrl: string;
  tags: string[];
  relatedExamples: string[];
  bestPractices: string[];
  commonPitfalls: string[];
}

export interface TestExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  videoUrl?: string;
  screenshots?: string[];
  duration?: number;
}

export interface PlaygroundState {
  code: string;
  isRunning: boolean;
  result?: TestExecutionResult;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  description: string;
  icon: string;
  color: string;
}
