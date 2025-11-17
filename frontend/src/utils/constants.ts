import { CategoryInfo, CategoryType } from '../types'

export const CATEGORIES: Record<CategoryType, CategoryInfo> = {
  basics: {
    id: 'basics',
    name: 'Basics',
    description: 'Fundamental Playwright operations like navigation, clicking, typing, and screenshots',
    icon: '📚',
    color: 'bg-blue-500',
  },
  selectors: {
    id: 'selectors',
    name: 'Selectors',
    description: 'Master element selection with CSS, text, role-based, XPath, and custom selectors',
    icon: '🎯',
    color: 'bg-purple-500',
  },
  actions: {
    id: 'actions',
    name: 'Actions',
    description: 'Mouse actions, keyboard input, drag-drop, and file uploads',
    icon: '⚡',
    color: 'bg-yellow-500',
  },
  assertions: {
    id: 'assertions',
    name: 'Assertions',
    description: 'Verify visibility, content, attributes, and element counts',
    icon: '✓',
    color: 'bg-green-500',
  },
  waits: {
    id: 'waits',
    name: 'Waits',
    description: 'Auto-waiting, custom waits, and timeout handling',
    icon: '⏱️',
    color: 'bg-orange-500',
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced',
    description: 'Multiple contexts, network interception, API mocking, and mobile emulation',
    icon: '🚀',
    color: 'bg-red-500',
  },
  patterns: {
    id: 'patterns',
    name: 'Patterns',
    description: 'Page Object Model, data-driven tests, and BDD/Cucumber patterns',
    icon: '🏗️',
    color: 'bg-indigo-500',
  },
  'real-world': {
    id: 'real-world',
    name: 'Real World',
    description: 'E-commerce flows, form validation, authentication, and infinite scroll',
    icon: '🌍',
    color: 'bg-teal-500',
  },
}

export const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
export const DEMO_SITE_URL = import.meta.env.VITE_DEMO_URL || 'http://localhost:3002'
