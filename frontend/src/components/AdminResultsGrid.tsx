import AdminVideoCard from './AdminVideoCard'
import AdminChannelCard from './AdminChannelCard'

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

interface AdminResultsGridProps {
  mode: 'videos' | 'channels'
  videoResults: VideoResult[]
  channelResults: ChannelResult[]
  authorizedVideos: Set<string>
  authorizedChannels: Set<string>
  selectionMode?: boolean
  selectedVideos?: Set<string>
  selectedChannels?: Set<string>
  onToggleSelectVideo?: (videoId: string) => void
  onToggleSelectChannel?: (channelId: string) => void
  onAuthorizeVideo: (videoId: string, title: string, channelId: string) => void
  onAuthorizeChannel: (channelId: string, title: string) => void
  onRevokeVideo: (videoId: string) => void
  onRevokeChannel: (channelId: string) => void
  onPreviewVideo: (videoId: string, channelId: string) => void
  onNextPage: () => void
  onPrevPage: () => void
  hasNextPage: boolean
  hasPrevPage: boolean
  showPagination?: boolean
}

function AdminResultsGrid({
  mode,
  videoResults,
  channelResults,
  authorizedVideos,
  authorizedChannels,
  selectionMode = false,
  selectedVideos,
  selectedChannels,
  onToggleSelectVideo,
  onToggleSelectChannel,
  onAuthorizeVideo,
  onAuthorizeChannel,
  onRevokeVideo,
  onRevokeChannel,
  onPreviewVideo,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  showPagination = true
}: AdminResultsGridProps) {
  const hasResults = mode === 'videos' ? videoResults.length > 0 : channelResults.length > 0
  const emptyMessage = selectionMode
    ? 'Nenhum conteudo liberado ainda.'
    : 'Busque algo para ver opcoes de liberacao.'

  return (
    <div className="card">
      <h2>Resultados</h2>
      {!hasResults && <p className="muted">{emptyMessage}</p>}
      <div className="admin-list">
        {mode === 'videos' &&
          videoResults.map((video) => (
            <AdminVideoCard
              key={video.videoId}
              videoId={video.videoId}
              channelId={video.channelId}
              title={video.title}
              channelTitle={video.channelTitle}
              duration={video.duration}
              thumbnailUrl={video.thumbnailUrl}
              authorized={authorizedVideos.has(video.videoId)}
              channelAuthorized={authorizedChannels.has(video.channelId)}
              mode={selectionMode ? 'authorized' : 'search'}
              selected={selectedVideos?.has(video.videoId)}
              onToggleSelect={selectionMode && onToggleSelectVideo ? () => onToggleSelectVideo(video.videoId) : undefined}
              onAuthorize={() => onAuthorizeVideo(video.videoId, video.title, video.channelId)}
              onAuthorizeChannel={
                !selectionMode ? () => onAuthorizeChannel(video.channelId, video.channelTitle) : undefined
              }
              onRevoke={() => onRevokeVideo(video.videoId)}
              onPreview={() => onPreviewVideo(video.videoId, video.channelId)}
            />
          ))}

        {mode === 'channels' &&
          channelResults.map((channel) => (
            <AdminChannelCard
              key={channel.channelId}
              channelId={channel.channelId}
              title={channel.title}
              thumbnailUrl={channel.thumbnailUrl}
              authorized={authorizedChannels.has(channel.channelId)}
              mode={selectionMode ? 'authorized' : 'search'}
              selected={selectedChannels?.has(channel.channelId)}
              onToggleSelect={
                selectionMode && onToggleSelectChannel ? () => onToggleSelectChannel(channel.channelId) : undefined
              }
              onAuthorizeChannel={() => onAuthorizeChannel(channel.channelId, channel.title)}
              onRevokeChannel={() => onRevokeChannel(channel.channelId)}
            />
          ))}
      </div>
      {showPagination && (
        <div className="pagination">
          <button className="button ghost" type="button" onClick={onPrevPage} disabled={!hasPrevPage}>
            Pagina anterior
          </button>
          <button className="button ghost" type="button" onClick={onNextPage} disabled={!hasNextPage}>
            Proxima pagina
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminResultsGrid
