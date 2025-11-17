import { Link } from 'react-router-dom'
import { PlaywrightExample } from '../../types'
import { CATEGORIES, DIFFICULTY_COLORS } from '../../utils/constants'
import { Code2, Tag } from 'lucide-react'

interface ExampleCardProps {
  example: PlaywrightExample
}

export default function ExampleCard({ example }: ExampleCardProps) {
  const category = CATEGORIES[example.category]

  return (
    <Link
      to={`/gallery/${example.id}`}
      className="card hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{category.icon}</span>
          <span className={`badge ${DIFFICULTY_COLORS[example.difficulty]}`}>
            {example.difficulty}
          </span>
        </div>
        <Code2 className="h-5 w-5 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {example.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
        {example.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {example.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
        {example.tags.length > 3 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            +{example.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Category: {category.name}
        </span>
      </div>
    </Link>
  )
}
