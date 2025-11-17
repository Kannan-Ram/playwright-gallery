import { CategoryType, DifficultyLevel } from '../../types'
import { CATEGORIES } from '../../utils/constants'

interface CategoryFilterProps {
  selectedCategory: CategoryType | 'all'
  selectedDifficulty: DifficultyLevel | 'all'
  onCategoryChange: (category: CategoryType | 'all') => void
  onDifficultyChange: (difficulty: DifficultyLevel | 'all') => void
}

export default function CategoryFilter({
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: CategoryFilterProps) {
  return (
    <div className="card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as CategoryType | 'all')}
            className="input-field"
          >
            <option value="all">All Categories</option>
            {Object.values(CATEGORIES).map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel | 'all')}
            className="input-field"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  )
}
