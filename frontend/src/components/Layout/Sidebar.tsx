import { Link } from 'react-router-dom'
import { X, Home, Grid, Code2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '../../utils/constants'

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
}

export default function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) {
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
          fixed inset-y-0 left-0 z-50
          ${isCollapsed ? 'w-16 sidebar-collapsed' : 'w-64'} bg-white dark:bg-gray-800 shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header with logo and toggle button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Logo and title - hidden on mobile */}
          <div className={`hidden md:flex items-center ${isCollapsed ? 'justify-center flex-1' : 'flex-1'}`}>
            <img
              src="/playwright-icon.svg"
              alt="Playwright"
              className={`w-8 h-8 ${isCollapsed ? '' : 'mr-3'} transition-all duration-300`}
            />
            {!isCollapsed && (
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                PW Gallery
              </h1>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="sidebar-nav flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Navigation
                </h3>
              )}
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    onClick={onClose}
                    className={`flex items-center ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative`}
                    title={isCollapsed ? 'Home' : ''}
                  >
                    <Home 
                      className={`nav-icon ${isCollapsed ? 'h-8 w-8' : 'h-5 w-5 mr-3'} text-gray-600 dark:text-gray-400`}
                      style={isCollapsed ? { width: '32px', height: '32px' } : {}}
                    />
                    {!isCollapsed && <span>Home</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        Home
                      </div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    onClick={onClose}
                    className={`flex items-center ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative`}
                    title={isCollapsed ? 'Gallery' : ''}
                  >
                    <Grid 
                      className={`nav-icon ${isCollapsed ? 'h-8 w-8' : 'h-5 w-5 mr-3'} text-gray-600 dark:text-gray-400`}
                      style={isCollapsed ? { width: '32px', height: '32px' } : {}}
                    />
                    {!isCollapsed && <span>Gallery</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        Gallery
                      </div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/playground"
                    onClick={onClose}
                    className={`flex items-center ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative`}
                    title={isCollapsed ? 'Playground' : ''}
                  >
                    <Code2 
                      className={`nav-icon ${isCollapsed ? 'h-8 w-8' : 'h-5 w-5 mr-3'} text-gray-600 dark:text-gray-400`}
                      style={isCollapsed ? { width: '32px', height: '32px' } : {}}
                    />
                    {!isCollapsed && <span>Playground</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        Playground
                      </div>
                    )}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Categories
                </h3>
              )}
              <ul className="space-y-1">
                {Object.values(CATEGORIES).map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/gallery?category=${category.id}`}
                      onClick={onClose}
                      className={`flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative ${isCollapsed ? 'justify-center' : ''
                        }`}
                      title={isCollapsed ? category.name : ''}
                    >
                      <span className={`h-3 w-3 rounded-full ${category.color} ${isCollapsed ? '' : 'mr-3'
                        }`} />
                      {!isCollapsed && <span className="text-sm">{category.name}</span>}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {category.name}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Resources
                </h3>
              )}
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://playwright.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative`}
                    title={isCollapsed ? 'Documentation' : ''}
                  >
                    <BookOpen 
                      className={`nav-icon ${isCollapsed ? 'h-8 w-8' : 'h-5 w-5 mr-3'} text-gray-600 dark:text-gray-400`}
                      style={isCollapsed ? { width: '32px', height: '32px' } : {}}
                    />
                    {!isCollapsed && <span className="text-sm">Documentation</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        Documentation
                      </div>
                    )}
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
