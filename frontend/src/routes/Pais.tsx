import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ParentGate from '../components/ParentGate'
import SearchBar from '../components/SearchBar'
import { loadWhitelist, saveWhitelist } from '../modules/whitelist/storageLocal'
import { AllowedChannel, AllowedVideo, WhitelistConfig } from '../modules/whitelist/types'

function Pais() {
  const navigate = useNavigate()
  const [unlocked, setUnlocked] = useState(false)
  const [config, setConfig] = useState<WhitelistConfig>({ videos: [], channels: [] })
  const [newVideo, setNewVideo] = useState<AllowedVideo>({ id: '', label: '' })
  const [newChannel, setNewChannel] = useState<AllowedChannel>({ id: '', label: '' })

  useEffect(() => {
    const saved = loadWhitelist()
    setConfig(saved)
  }, [])

  const handleAddVideo = (event: FormEvent) => {
    event.preventDefault()
    if (!newVideo.id || !newVideo.label) return
    setConfig((prev) =>
      prev.videos.find((v) => v.id === newVideo.id)
        ? prev
        : { ...prev, videos: [...prev.videos, newVideo] }
    )
    setNewVideo({ id: '', label: '' })
  }

  const handleAddChannel = (event: FormEvent) => {
    event.preventDefault()
    if (!newChannel.id || !newChannel.label) return
    setConfig((prev) =>
      prev.channels.find((c) => c.id === newChannel.id)
        ? prev
        : { ...prev, channels: [...prev.channels, newChannel] }
    )
    setNewChannel({ id: '', label: '' })
  }

  const removeVideo = (id: string) => {
    setConfig((prev) => ({ ...prev, videos: prev.videos.filter((v) => v.id !== id) }))
  }

  const removeChannel = (id: string) => {
    setConfig((prev) => ({ ...prev, channels: prev.channels.filter((c) => c.id !== id) }))
  }

  const handleSaveAndExit = () => {
    saveWhitelist(config)
    navigate('/')
  }

  const authorizeVideo = (video: AllowedVideo) => {
    setConfig((prev) =>
      prev.videos.find((item) => item.id === video.id) ? prev : { ...prev, videos: [...prev.videos, video] }
    )
  }

  const authorizeChannel = (channel: AllowedChannel) => {
    setConfig((prev) =>
      prev.channels.find((item) => item.id === channel.id)
        ? prev
        : { ...prev, channels: [...prev.channels, channel] }
    )
  }

  if (!unlocked) {
    return (
      <section className="page">
        <ParentGate onUnlock={() => setUnlocked(true)} />
      </section>
    )
  }

  return (
    <section className="page">
      <div className="card">
        <h1>Painel dos pais</h1>
        <p>Busque, autorize e salve videos e canais. Nada sai do navegador.</p>
      </div>

      <SearchBar onAuthorizeVideo={authorizeVideo} onAuthorizeChannel={authorizeChannel} />

      <div className="grid two-cols">
        <div className="card">
          <h2>Videos liberados</h2>
          <form className="form" onSubmit={handleAddVideo}>
            <input
              className="input"
              placeholder="ID do video (ex: dQw4w9WgXcQ)"
              value={newVideo.id}
              onChange={(e) => setNewVideo((prev) => ({ ...prev, id: e.target.value }))}
              required
            />
            <input
              className="input"
              placeholder="Nome curto"
              value={newVideo.label}
              onChange={(e) => setNewVideo((prev) => ({ ...prev, label: e.target.value }))}
              required
            />
            <button className="button secondary" type="submit">
              Adicionar video
            </button>
          </form>
          <ul className="list">
            {config.videos.map((video) => (
              <li key={video.id} className="list__item">
                <div>
                  <strong>{video.label}</strong>
                  <p className="muted">{video.id}</p>
                </div>
                <button className="link danger" onClick={() => removeVideo(video.id)}>
                  remover
                </button>
              </li>
            ))}
            {config.videos.length === 0 && <p className="muted">Nenhum video ainda.</p>}
          </ul>
        </div>

        <div className="card">
          <h2>Canais liberados</h2>
          <form className="form" onSubmit={handleAddChannel}>
            <input
              className="input"
              placeholder="ID do canal"
              value={newChannel.id}
              onChange={(e) => setNewChannel((prev) => ({ ...prev, id: e.target.value }))}
              required
            />
            <input
              className="input"
              placeholder="Nome do canal"
              value={newChannel.label}
              onChange={(e) => setNewChannel((prev) => ({ ...prev, label: e.target.value }))}
              required
            />
            <button className="button secondary" type="submit">
              Adicionar canal
            </button>
          </form>
          <ul className="list">
            {config.channels.map((channel) => (
              <li key={channel.id} className="list__item">
                <div>
                  <strong>{channel.label}</strong>
                  <p className="muted">{channel.id}</p>
                </div>
                <button className="link danger" onClick={() => removeChannel(channel.id)}>
                  remover
                </button>
              </li>
            ))}
            {config.channels.length === 0 && <p className="muted">Nenhum canal ainda.</p>}
          </ul>
        </div>
      </div>

      <div className="actions">
        <button className="button primary" onClick={handleSaveAndExit}>
          Salvar e sair
        </button>
      </div>
    </section>
  )
}

export default Pais
