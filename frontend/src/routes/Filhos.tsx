import { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import YoutubePlayer from '../modules/player/YoutubePlayer'
import { loadWhitelist } from '../modules/whitelist/storageLocal'
import { WhitelistConfig } from '../modules/whitelist/types'

function Filhos() {
  const [config, setConfig] = useState<WhitelistConfig>({ videos: [], channels: [] })
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  useEffect(() => {
    setConfig(loadWhitelist())
  }, [])

  return (
    <section className="page">
      <div className="card">
        <h1>Escolha um video liberado</h1>
        <p className="muted">Nada de buscas ou links externos. Apenas o que os pais autorizaram.</p>
      </div>

      {selectedVideo && (
        <div className="card">
          <YoutubePlayer videoId={selectedVideo} />
        </div>
      )}

      <div className="card">
        <h2>Videos</h2>
        <div className="grid">
          {config.videos.map((video) => (
            <VideoCard key={video.id} id={video.id} label={video.label} onSelect={setSelectedVideo} />
          ))}
          {config.videos.length === 0 && <p className="muted">Nenhum video liberado ainda.</p>}
        </div>
      </div>

      <div className="card">
        <h2>Canais liberados</h2>
        <div className="grid">
          {config.channels.map((channel) => (
            <ChannelCard key={channel.id} id={channel.id} label={channel.label} />
          ))}
          {config.channels.length === 0 && <p className="muted">Nenhum canal liberado ainda.</p>}
        </div>
      </div>
    </section>
  )
}

export default Filhos
