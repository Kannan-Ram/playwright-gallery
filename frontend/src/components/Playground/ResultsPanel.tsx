import { TestExecutionResult } from '../../types'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'
import VideoPlayer from '../Common/VideoPlayer'

interface ResultsPanelProps {
  result: TestExecutionResult | null
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  if (!result) {
    return (
      <div className="card h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Run a test to see results here
        </p>
      </div>
    )
  }

  return (
    <div className="card space-y-4 h-full overflow-auto">
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
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-64">
            {result.output}
          </pre>
        </div>
      )}

      {result.error && (
        <div>
          <h3 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
            Error
          </h3>
          <pre className="bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 p-4 rounded-lg overflow-x-auto text-sm max-h-64">
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
            Screenshots ({result.screenshots.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
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
  )
}
