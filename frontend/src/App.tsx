import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ExampleDetailPage from './pages/ExampleDetailPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<ExampleDetailPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
