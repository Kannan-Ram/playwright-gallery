import { Play } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
  poster?: string
}

export default function VideoPlayer({ videoUrl, poster }: VideoPlayerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      <video
        controls
        poster={poster}
        className="w-full"
        preload="metadata"
      >
        <source src={videoUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {!poster && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <Play className="h-16 w-16 text-white opacity-75" />
        </div>
      )}
    </div>
  )
}
