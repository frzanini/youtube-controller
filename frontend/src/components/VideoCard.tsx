interface VideoCardProps {
  videoId: string
  title: string
  thumbnailUrl: string
  onSelect: (id: string) => void
  size?: 'small' | 'medium'
}

function VideoCard({ videoId, title, thumbnailUrl, onSelect, size = 'medium' }: VideoCardProps) {
  const sizeClass = size === 'small' ? 'video-card--small' : 'video-card--medium'
  return (
    <button className={`video-card ${sizeClass}`} onClick={() => onSelect(videoId)} title={title}>
      <div className="video-card__thumb">
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x112.png?text=Video'
          }}
        />
      </div>
    </button>
  )
}

export default VideoCard
