import { useState } from 'react'
import { PlaywrightExample, TestExecutionResult } from '../../types'
import { CATEGORIES, DIFFICULTY_COLORS } from '../../utils/constants'
import CodeHighlighter from '../Common/CodeHighlighter'
import VideoPlayer from '../Common/VideoPlayer'
import LoadingSpinner from '../Common/LoadingSpinner'
import { Play, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/constants'

interface ExampleViewerProps {
  example: PlaywrightExample
}

export default function ExampleViewer({ example }: ExampleViewerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<TestExecutionResult | null>(null)
  const [selectedBrowser, setSelectedBrowser] = useState<'chromium' | 'firefox' | 'webkit'>('chromium')

  const category = CATEGORIES[example.category]

  const handleRunTest = async () => {
    setIsRunning(true)
    setResult(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/run-test`, {
        code: example.code,
        browser: selectedBrowser,
      })

      setResult(response.data)
    } catch (error: any) {
      setResult({
        success: false,
        output: '',
        error: error.response?.data?.error || 'Failed to execute test',
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {example.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {example.description}
              </p>
            </div>
          </div>
          <span className={`badge ${DIFFICULTY_COLORS[example.difficulty]}`}>
            {example.difficulty}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {example.tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Test URL */}
      {example.testUrl && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Test Target
          </h2>
          <a
            href={example.testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline flex items-center"
          >
            {example.testUrl}
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      )}

      {/* Code */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Code
        </h2>
        <CodeHighlighter code={example.code} language="typescript" />
      </div>

      {/* Run Test */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Run Test
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Browser
            </label>
            <select
              value={selectedBrowser}
              onChange={(e) => setSelectedBrowser(e.target.value as any)}
              className="input-field"
              disabled={isRunning}
            >
              <option value="chromium">Chromium</option>
              <option value="firefox">Firefox</option>
              <option value="webkit">WebKit</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunTest}
              disabled={isRunning}
              className="btn-primary w-full sm:w-auto"
            >
              {isRunning ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Running...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 inline mr-2" />
                  Run Test
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-4 space-y-4">
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                )}
                <span className={`font-semibold ${result.success ? 'text-green-900 dark:text-green-200' : 'text-red-900 dark:text-red-200'}`}>
                  {result.success ? 'Test Passed' : 'Test Failed'}
                </span>
                {result.duration && (
                  <span className="ml-auto text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {result.duration}ms
                  </span>
                )}
              </div>
            </div>

            {result.output && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Output
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  {result.output}
                </pre>
              </div>
            )}

            {result.error && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
                  Error
                </h3>
                <pre className="bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 p-4 rounded-lg overflow-x-auto text-sm">
                  {result.error}
                </pre>
              </div>
            )}

            {result.videoUrl && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Recording
                </h3>
                <VideoPlayer 
                  key={`${result.videoUrl}-${Date.now()}`}
                  videoUrl={result.videoUrl} 
                />
              </div>
            )}

            {result.screenshots && result.screenshots.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Screenshots
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Best Practices */}
      {example.bestPractices.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Best Practices
          </h2>
          <ul className="space-y-2">
            {example.bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Pitfalls */}
      {example.commonPitfalls.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
          <ul className="space-y-2">
            {example.commonPitfalls.map((pitfall, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
