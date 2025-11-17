import { Link } from 'react-router-dom'
import { X, Home, Grid, Code2, BookOpen } from 'lucide-react'
import { CategoryType } from '../../types'
import { CATEGORIES } from '../../utils/constants'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-gray-800 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Navigation
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    onClick={onClose}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Home className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    onClick={onClose}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Grid className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                    <span>Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/playground"
                    onClick={onClose}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Code2 className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                    <span>Playground</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Categories
              </h3>
              <ul className="space-y-1">
                {Object.values(CATEGORIES).map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/gallery?category=${category.id}`}
                      onClick={onClose}
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className={`h-2 w-2 rounded-full mr-3 ${category.color}`} />
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Resources
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://playwright.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <BookOpen className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm">Documentation</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
