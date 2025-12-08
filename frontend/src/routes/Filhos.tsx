import { useEffect, useMemo, useRef, useState } from 'react'
import VideoCard from '../components/VideoCard'
import LastWatchedCarousel from '../components/LastWatchedCarousel'
import YoutubePlayer from '../modules/player/YoutubePlayer'
import { loadHistory, loadWhitelist, mergeVideosFromWhitelist, saveHistory } from '../modules/whitelist/storageLocal'
import { VideoInfo, WatchHistoryItem } from '../modules/whitelist/types'

const HISTORY_LIMIT = 15
const PAGE_SIZE = 20

function Filhos() {
  const [videos, setVideos] = useState<VideoInfo[]>([])
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [history, setHistory] = useState<WatchHistoryItem[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const playerRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const config = loadWhitelist()
    const initialVideos = config.videos.map<VideoInfo>((video) => ({
      videoId: video.id,
      title: video.label,
      thumbnailUrl: video.thumbnailUrl || 'https://via.placeholder.com/200x112.png?text=Video',
      channelTitle: video.channelTitle,
      duration: video.duration,
      channelId: video.channelId
    }))
    setVideos(initialVideos)
    mergeVideosFromWhitelist(config)
      .then((allVideos) => {
        setVideos(allVideos)
      })
      .finally(() => setIsLoading(false))
    setHistory(loadHistory())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDisplayCount((prev) => prev + PAGE_SIZE)
          }
        })
      },
      { rootMargin: '200px' }
    )
    const el = loadMoreRef.current
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  const lastWatchedVideos = useMemo(() => {
    const sorted = [...history]
      .sort((a, b) => b.lastWatchedAt - a.lastWatchedAt)
      .slice(0, HISTORY_LIMIT)
      .map((item) => videos.find((v) => v.videoId === item.videoId))
      .filter(Boolean) as VideoInfo[]
    return sorted
  }, [history, videos])

  const availableVideos = useMemo(() => {
    const recentIds = new Set(lastWatchedVideos.map((v) => v.videoId))
    return videos.filter((v) => !recentIds.has(v.videoId))
  }, [videos, lastWatchedVideos])

  const handleSelect = (videoId: string) => {
    setSelectedVideo(videoId)
    const now = Date.now()
    setHistory((prev) => {
      const next = prev.filter((item) => item.videoId !== videoId)
      next.unshift({ videoId, lastWatchedAt: now })
      const trimmed = next.slice(0, HISTORY_LIMIT * 2)
      saveHistory(trimmed)
      return trimmed
    })
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  return (
    <section className="page kids-page">
      {selectedVideo && (
        <div className="card" ref={playerRef}>
          <div className="player-actions">
            <h3>Assistindo agora</h3>
          </div>
          <YoutubePlayer videoId={selectedVideo} autoPlay fullscreen />
        </div>
      )}

      {lastWatchedVideos.length > 0 && (
        <LastWatchedCarousel videos={lastWatchedVideos} onSelect={handleSelect} />
      )}

      <div className="card">
        <h2>Videos disponiveis</h2>
        {isLoading && <p className="muted">Carregando videos...</p>}
        <div className="kids-grid">
          {availableVideos.slice(0, displayCount).map((video) => (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              size="medium"
              onSelect={handleSelect}
            />
          ))}
          {availableVideos.length === 0 && !isLoading && <p className="muted">Sem videos novos no momento.</p>}
          <div ref={loadMoreRef} />
        </div>
      </div>
    </section>
  )
}

export default Filhos
