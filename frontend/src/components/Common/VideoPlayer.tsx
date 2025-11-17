
import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { API_BASE_URL } from '../../utils/constants'

interface VideoPlayerProps {
  videoUrl: string
  poster?: string
}

export default function VideoPlayer({ videoUrl, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsLoading(true)
    setHasError(false)

    // Force video to reload when URL changes
    video.load()

    // Timeout fallback - if video doesn't load within 5 seconds, clear loading state
    const loadingTimeout = setTimeout(() => {
      console.log('Video loading timeout - clearing loading state')
      setIsLoading(false)
    }, 5000)

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded')
      clearTimeout(loadingTimeout)
      setIsLoading(false)
    }

    const handleCanPlay = () => {
      console.log('Video can play')
      clearTimeout(loadingTimeout)
      setIsLoading(false)
    }

    const handleLoadedData = () => {
      console.log('Video data loaded')
      clearTimeout(loadingTimeout)
      setIsLoading(false)
    }

    const handleError = (e: Event) => {
      console.error('Video loading error:', e)
      clearTimeout(loadingTimeout)
      setIsLoading(false)
      setHasError(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    return () => {
      clearTimeout(loadingTimeout)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [videoUrl])

  return (
    <div className="relative rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="w-full h-auto block"
        preload="metadata"
        playsInline
        key={videoUrl} // Force React to recreate the element when URL changes
      >
        <source
          src={/^(https?:)?\//.test(videoUrl)
            ? videoUrl
            : `${API_BASE_URL.replace(/\/api$/, '')}${videoUrl}`}
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white text-sm">Loading video...</span>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="flex flex-col items-center space-y-2 text-center p-4">
            <Play className="h-16 w-16 text-red-400" />
            <span className="text-red-400 text-sm">Error loading video</span>
            <span className="text-gray-300 text-xs">The video file may still be processing</span>
          </div>
        </div>
      )}

      {!poster && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black bg-opacity-30 rounded-full p-4">
            <Play className="h-12 w-12 text-white opacity-90" />
          </div>
        </div>
      )}
    </div>
  )
}
