import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CategoryType, DifficultyLevel, PlaywrightExample } from '../types'
import ExampleCard from '../components/Gallery/ExampleCard'
import CategoryFilter from '../components/Gallery/CategoryFilter'
import SearchBar from '../components/Gallery/SearchBar'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [examples, setExamples] = useState<PlaywrightExample[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>(
    (searchParams.get('category') as CategoryType) || 'all'
  )
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all')

  useEffect(() => {
    fetchExamples()
  }, [])

  useEffect(() => {
    if (selectedCategory !== 'all') {
      setSearchParams({ category: selectedCategory })
    } else {
      setSearchParams({})
    }
  }, [selectedCategory])

  const fetchExamples = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/examples`)
      setExamples(response.data)
    } catch (error) {
      console.error('Failed to fetch examples:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredExamples = examples.filter((example) => {
    const matchesSearch =
      searchQuery === '' ||
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || example.category === selectedCategory

    const matchesDifficulty =
      selectedDifficulty === 'all' || example.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading examples..." />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Example Gallery
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore {examples.length}+ Playwright testing examples across various categories
        </p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by title, description, or tags..."
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={setSelectedDifficulty}
      />

      {filteredExamples.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No examples found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedDifficulty('all')
            }}
            className="btn-primary mt-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example) => (
              <ExampleCard key={example.id} example={example} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
