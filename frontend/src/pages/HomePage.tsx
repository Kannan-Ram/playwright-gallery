import { Link } from 'react-router-dom'
import { Grid, Code2, BookOpen, Zap, Shield, Globe } from 'lucide-react'
import { CATEGORIES } from '../utils/constants'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Master Playwright Testing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Interactive gallery of Playwright examples with live demos, code snippets,
          and a playground to experiment with your own tests
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/gallery" className="btn-primary text-lg px-8 py-3">
            <Grid className="h-5 w-5 inline mr-2" />
            Explore Gallery
          </Link>
          <Link to="/playground" className="btn-secondary text-lg px-8 py-3">
            <Code2 className="h-5 w-5 inline mr-2" />
            Try Playground
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Live Examples
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Run tests directly in your browser and see results in real-time with video recordings
          </p>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Learn by Doing
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Copy-paste ready examples with best practices and common pitfalls highlighted
          </p>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
            <Code2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Interactive Playground
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Write and test your own Playwright code in a safe, sandboxed environment
          </p>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(CATEGORIES).map((category) => (
            <Link
              key={category.id}
              to={`/gallery?category=${category.id}`}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Playwright */}
      <section className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Why Playwright?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Reliable
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Auto-wait and retry mechanisms ensure stable tests
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Fast
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Parallel execution across browsers for rapid feedback
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Globe className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Cross-browser
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Test on Chromium, Firefox, and WebKit with one API
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to get started?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse through 30+ examples or start experimenting in the playground
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/gallery" className="btn-primary px-8 py-3">
            Browse Examples
          </Link>
          <a
            href="https://playwright.dev/docs/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-8 py-3"
          >
            Read Documentation
          </a>
        </div>
      </section>
    </div>
  )
}
