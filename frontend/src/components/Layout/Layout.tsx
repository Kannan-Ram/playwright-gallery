import { ReactNode, useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    // Close mobile sidebar when toggling collapse
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={toggleCollapse}
        />

        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          }`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Floating expand button - only show on desktop when collapsed */}
        {sidebarCollapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden md:flex fixed top-24 left-4 z-40 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <Footer />
    </div>
  )
}
