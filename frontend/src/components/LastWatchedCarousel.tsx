import VideoCard from './VideoCard'
import { VideoInfo } from '../modules/whitelist/types'

interface LastWatchedCarouselProps {
  videos: VideoInfo[]
  onSelect: (videoId: string) => void
}

function LastWatchedCarousel({ videos, onSelect }: LastWatchedCarouselProps) {
  if (videos.length === 0) return null

  return (
    <div className="card">
      <h2>Ultimos assistidos</h2>
      <div className="carousel">
        {videos.map((video) => (
          <VideoCard
            key={video.videoId}
            videoId={video.videoId}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            size="small"
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default LastWatchedCarousel
