import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ParentGate from '../components/ParentGate'
import SearchBar from '../components/SearchBar'
import AdminResultsGrid from '../components/AdminResultsGrid'
import AdminVideoPreviewDialog from '../components/AdminVideoPreviewDialog'
import { loadWhitelist, saveWhitelist } from '../modules/whitelist/storageLocal'
import { AllowedChannel, AllowedVideo, WhitelistConfig } from '../modules/whitelist/types'

type Mode = 'videos' | 'channels'
type Tab = 'search' | 'authorized'

interface VideoResult {
  videoId: string
  channelId: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  duration: string
}

interface ChannelResult {
  channelId: string
  title: string
  thumbnailUrl: string
}

function Pais() {
  const navigate = useNavigate()
  const [unlocked, setUnlocked] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('search')
  const [config, setConfig] = useState<WhitelistConfig>({ videos: [], channels: [] })

  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<Mode>('videos')
  const [videoResults, setVideoResults] = useState<VideoResult[]>([])
  const [channelResults, setChannelResults] = useState<ChannelResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [prevPageToken, setPrevPageToken] = useState<string | null>(null)
  const [currentPageToken, setCurrentPageToken] = useState<string | null>(null)

  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null)
  const [previewChannelId, setPreviewChannelId] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set())
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = loadWhitelist()
    setConfig(saved)
  }, [])

  const authorizedVideos = useMemo(() => new Set(config.videos.map((v) => v.id)), [config.videos])
  const authorizedChannels = useMemo(() => new Set(config.channels.map((c) => c.id)), [config.channels])

  const runSearch = async (pageToken?: string | null) => {
    const term = query.trim()
    if (!term) {
      setSearchError('Digite algo para buscar.')
      return
    }
    setSearchError('')
    setIsSearching(true)

    try {
      const tokenQuery = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}&mode=${mode}${tokenQuery}`)
      if (!response.ok) {
        throw new Error('Falha na busca')
      }
      const data = (await response.json()) as {
        mode: Mode
        items: any[]
        nextPageToken: string | null
        prevPageToken: string | null
      }

      setNextPageToken(data.nextPageToken || null)
      setPrevPageToken(data.prevPageToken || null)
      setCurrentPageToken(pageToken || null)

      if (data.mode === 'videos') {
        setVideoResults(
          data.items.map((item) => ({
            videoId: item.videoId,
            channelId: item.channelId,
            title: item.title,
            channelTitle: item.channelTitle,
            thumbnailUrl: item.thumbnailUrl,
            duration: item.duration
          }))
        )
      } else {
        setChannelResults(
          data.items.map((item) => ({
            channelId: item.channelId,
            title: item.title,
            thumbnailUrl: item.thumbnailUrl
          }))
        )
      }
    } catch (error) {
      console.error('Erro ao buscar', error)
      setSearchError('Nao foi possivel buscar agora. Tente mais tarde.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = () => runSearch(null)
  const handlePrevPage = () => {
    if (prevPageToken) runSearch(prevPageToken)
  }
  const handleNextPage = () => {
    if (nextPageToken) runSearch(nextPageToken)
  }

  const authorizeVideo = (videoId: string, title: string, channelId: string) => {
    setConfig((prev) => {
      const already = prev.videos.find((item) => item.id === videoId)
      if (already) return prev
      const match = videoResults.find((v) => v.videoId === videoId)
      const newVideo: AllowedVideo = {
        id: videoId,
        label: title,
        channelId: match?.channelId || channelId,
        channelTitle: match?.channelTitle,
        thumbnailUrl: match?.thumbnailUrl,
        duration: match?.duration
      }
      return { ...prev, videos: [...prev.videos, newVideo] }
    })
  }

  const revokeVideo = (videoId: string) => {
    setConfig((prev) => ({ ...prev, videos: prev.videos.filter((v) => v.id !== videoId) }))
    setSelectedVideos((prev) => {
      const next = new Set(prev)
      next.delete(videoId)
      return next
    })
  }

  const authorizeChannel = (channelId: string, title: string) => {
    setConfig((prev) => {
      if (prev.channels.find((item) => item.id === channelId)) return prev
      const match = channelResults.find((c) => c.channelId === channelId)
      const newChannel: AllowedChannel = {
        id: channelId,
        label: title,
        thumbnailUrl: match?.thumbnailUrl
      }
      return { ...prev, channels: [...prev.channels, newChannel] }
    })
  }

  const revokeChannel = (channelId: string) => {
    setConfig((prev) => ({ ...prev, channels: prev.channels.filter((c) => c.id !== channelId) }))
    setSelectedChannels((prev) => {
      const next = new Set(prev)
      next.delete(channelId)
      return next
    })
  }

  const toggleSelectVideo = (videoId: string) => {
    setSelectedVideos((prev) => {
      const next = new Set(prev)
      if (next.has(videoId)) next.delete(videoId)
      else next.add(videoId)
      return next
    })
  }

  const toggleSelectChannel = (channelId: string) => {
    setSelectedChannels((prev) => {
      const next = new Set(prev)
      if (next.has(channelId)) next.delete(channelId)
      else next.add(channelId)
      return next
    })
  }

  const removeSelected = () => {
    if (selectedVideos.size === 0 && selectedChannels.size === 0) return
    setConfig((prev) => ({
      videos: prev.videos.filter((v) => !selectedVideos.has(v.id)),
      channels: prev.channels.filter((c) => !selectedChannels.has(c.id))
    }))
    setSelectedVideos(new Set())
    setSelectedChannels(new Set())
  }

  const removeAll = () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover todos os videos e canais liberados? Esta acao nao pode ser desfeita.'
    )
    if (!confirmed) return
    setConfig({ videos: [], channels: [] })
    setSelectedVideos(new Set())
    setSelectedChannels(new Set())
  }

  const handleSave = () => {
    saveWhitelist(config)
  }

  const handleExit = () => {
    saveWhitelist(config)
    navigate('/')
  }

  const openPreview = (videoId: string, channelId: string) => {
    setPreviewVideoId(videoId)
    setPreviewChannelId(channelId || null)
    setIsPreviewOpen(true)
  }

  const authorizedVideoCards: VideoResult[] = config.videos.map((video) => ({
    videoId: video.id,
    channelId: video.channelId || '',
    title: video.label,
    channelTitle: video.channelTitle || 'Canal liberado',
    thumbnailUrl: video.thumbnailUrl || 'https://via.placeholder.com/200x112.png?text=Video',
    duration: video.duration || '--:--'
  }))

  const authorizedChannelCards: ChannelResult[] = config.channels.map((channel) => ({
    channelId: channel.id,
    title: channel.label,
    thumbnailUrl: channel.thumbnailUrl || 'https://via.placeholder.com/160x90.png?text=Canal'
  }))

  if (!unlocked) {
    return (
      <section className="page">
        <ParentGate onUnlock={() => setUnlocked(true)} />
      </section>
    )
  }

  return (
    <section className="page">
      <div className="card actions-card">
        <div>
          <h1>Painel dos pais</h1>
          <p>Busque, assista e libere somente o que for seguro para as criancas.</p>
          <div className="toggle">
            <button
              className={`toggle__item ${activeTab === 'search' ? 'toggle__item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('search')}
            >
              Buscar videos e canais
            </button>
            <button
              className={`toggle__item ${activeTab === 'authorized' ? 'toggle__item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('authorized')}
            >
              Conteudo liberado
            </button>
          </div>
        </div>
        <div className="actions actions--top">
          <button className="button ghost" type="button" onClick={handleSave}>
            Salvar
          </button>
          <button className="button primary" type="button" onClick={handleExit}>
            Sair do modo pais
          </button>
        </div>
      </div>

      {activeTab === 'search' && (
        <>
          <SearchBar
            query={query}
            mode={mode}
            onQueryChange={setQuery}
            onModeChange={(m) => {
              setMode(m)
              setNextPageToken(null)
              setPrevPageToken(null)
              setCurrentPageToken(null)
              setVideoResults([])
              setChannelResults([])
            }}
            onSearch={handleSearch}
            isLoading={isSearching}
          />
          {searchError && <p className="text-error">{searchError}</p>}

          <AdminResultsGrid
            mode={mode}
            videoResults={videoResults}
            channelResults={channelResults}
            authorizedVideos={authorizedVideos}
            authorizedChannels={authorizedChannels}
            onAuthorizeVideo={authorizeVideo}
            onAuthorizeChannel={authorizeChannel}
            onRevokeVideo={revokeVideo}
            onRevokeChannel={revokeChannel}
            onPreviewVideo={openPreview}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            hasNextPage={Boolean(nextPageToken)}
            hasPrevPage={Boolean(prevPageToken)}
          />
        </>
      )}

      {activeTab === 'authorized' && (
        <>
          <div className="card">
        <h2>Videos liberados</h2>
            <p className="muted">Selecione para remover. Tudo fica salvo apenas aqui.</p>
            <AdminResultsGrid
              mode="videos"
              videoResults={authorizedVideoCards}
              channelResults={[]}
              authorizedVideos={authorizedVideos}
              authorizedChannels={authorizedChannels}
              selectionMode
              selectedVideos={selectedVideos}
              onToggleSelectVideo={toggleSelectVideo}
              onAuthorizeVideo={authorizeVideo}
              onAuthorizeChannel={authorizeChannel}
              onRevokeVideo={revokeVideo}
              onRevokeChannel={revokeChannel}
              onPreviewVideo={openPreview}
              onNextPage={() => {}}
              onPrevPage={() => {}}
              hasNextPage={false}
              hasPrevPage={false}
              showPagination={false}
            />
          </div>

          <div className="card">
            <h2>Canais liberados</h2>
            <p className="muted">Remova se nao quiser mais mostrar videos desses canais.</p>
            <AdminResultsGrid
              mode="channels"
              videoResults={[]}
              channelResults={authorizedChannelCards}
              authorizedVideos={authorizedVideos}
              authorizedChannels={authorizedChannels}
              selectionMode
              selectedChannels={selectedChannels}
              onToggleSelectChannel={toggleSelectChannel}
              onAuthorizeVideo={authorizeVideo}
              onAuthorizeChannel={authorizeChannel}
              onRevokeVideo={revokeVideo}
              onRevokeChannel={revokeChannel}
              onPreviewVideo={openPreview}
              onNextPage={() => {}}
              onPrevPage={() => {}}
              hasNextPage={false}
              hasPrevPage={false}
              showPagination={false}
            />
          </div>

          <div className="actions">
            <button
              className="button ghost"
              type="button"
              onClick={removeSelected}
              disabled={selectedVideos.size === 0 && selectedChannels.size === 0}
            >
              Remover selecionados
            </button>
            <button className="button secondary" type="button" onClick={removeAll}>
              Remover todas as autorizacoes
            </button>
          </div>
        </>
      )}

      <AdminVideoPreviewDialog
        isOpen={isPreviewOpen}
        videoId={previewVideoId}
        channelId={previewChannelId}
        isVideoAuthorized={previewVideoId ? authorizedVideos.has(previewVideoId) : false}
        isChannelAuthorized={previewChannelId ? authorizedChannels.has(previewChannelId) : false}
        onAuthorizeVideo={() => {
          if (previewVideoId) {
            const match = videoResults.find((v) => v.videoId === previewVideoId)
            authorizeVideo(
              previewVideoId,
              match?.title || 'Video autorizado',
              match?.channelId || previewChannelId || ''
            )
          }
        }}
        onAuthorizeChannel={() => {
          if (previewChannelId) {
            const match =
              channelResults.find((c) => c.channelId === previewChannelId) ||
              videoResults.find((v) => v.channelId === previewChannelId)
            authorizeChannel(previewChannelId, match?.title || 'Canal autorizado')
          }
        }}
        onClose={() => setIsPreviewOpen(false)}
      />
    </section>
  )
}

export default Pais
