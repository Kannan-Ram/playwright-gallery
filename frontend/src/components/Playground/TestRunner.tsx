import { useState } from 'react'
import { Play, RotateCcw, Save } from 'lucide-react'
import { TestExecutionResult } from '../../types'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/constants'
import LoadingSpinner from '../Common/LoadingSpinner'

interface TestRunnerProps {
  code: string
  onRun: (result: TestExecutionResult) => void
  onReset: () => void
  isRunning: boolean
  setIsRunning: (running: boolean) => void
}

export default function TestRunner({
  code,
  onRun,
  onReset,
  isRunning,
  setIsRunning,
}: TestRunnerProps) {
  const [selectedBrowser, setSelectedBrowser] = useState<'chromium' | 'firefox' | 'webkit'>('chromium')

  const handleRunTest = async () => {
    setIsRunning(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/playground/execute`, {
        code,
        browser: selectedBrowser,
      })

      onRun(response.data)
    } catch (error: any) {
      onRun({
        success: false,
        output: '',
        error: error.response?.data?.error || 'Failed to execute test',
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'playwright-test.ts'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1 w-full sm:w-auto">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Browser
        </label>
        <select
          value={selectedBrowser}
          onChange={(e) => setSelectedBrowser(e.target.value as any)}
          className="input-field w-full"
          disabled={isRunning}
        >
          <option value="chromium">Chromium</option>
          <option value="firefox">Firefox</option>
          <option value="webkit">WebKit</option>
        </select>
      </div>

      <div className="flex gap-2 sm:mt-6 w-full sm:w-auto">
        <button
          onClick={handleRunTest}
          disabled={isRunning || !code.trim()}
          className="btn-primary flex-1 sm:flex-initial"
        >
          {isRunning ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Running...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Play className="h-5 w-5 mr-2" />
              Run
            </span>
          )}
        </button>

        <button
          onClick={onReset}
          disabled={isRunning}
          className="btn-secondary"
          title="Reset to default template"
        >
          <RotateCcw className="h-5 w-5" />
        </button>

        <button
          onClick={handleSave}
          disabled={isRunning || !code.trim()}
          className="btn-secondary"
          title="Download code"
        >
          <Save className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
