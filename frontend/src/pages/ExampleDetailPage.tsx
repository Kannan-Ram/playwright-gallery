import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PlaywrightExample } from '../types'
import ExampleViewer from '../components/Gallery/ExampleViewer'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export default function ExampleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [example, setExample] = useState<PlaywrightExample | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExample()
  }, [id])

  const fetchExample = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/examples/${id}`)
      setExample(response.data)
    } catch (error) {
      console.error('Failed to fetch example:', error)
      setError('Example not found')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading example..." />
  }

  if (error || !example) {
    return (
      <div className="card text-center py-12">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Example Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The example you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/gallery" className="btn-primary">
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/gallery"
        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Gallery
      </Link>

      <ExampleViewer example={example} />
    </div>
  )
}
