import YoutubePlayer from '../modules/player/YoutubePlayer'

interface AdminVideoPreviewDialogProps {
  isOpen: boolean
  videoId: string | null
  channelId: string | null
  onAuthorizeVideo: () => void
  onAuthorizeChannel: () => void
  onClose: () => void
  isVideoAuthorized: boolean
  isChannelAuthorized: boolean
}

function AdminVideoPreviewDialog({
  isOpen,
  videoId,
  channelId,
  onAuthorizeVideo,
  onAuthorizeChannel,
  onClose,
  isVideoAuthorized,
  isChannelAuthorized
}: AdminVideoPreviewDialogProps) {
  if (!isOpen || !videoId) return null

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal__header">
          <h3>Assista antes de liberar</h3>
          <button className="link" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>

        <YoutubePlayer videoId={videoId} />

        <div className="modal__actions">
          <button className="button secondary" type="button" onClick={onAuthorizeVideo} disabled={isVideoAuthorized}>
            {isVideoAuthorized ? 'Video ja liberado' : 'Autorizar este video'}
          </button>
          <button
            className="button ghost"
            type="button"
            onClick={onAuthorizeChannel}
            disabled={!channelId || isChannelAuthorized}
          >
            {isChannelAuthorized ? 'Canal ja liberado' : 'Autorizar conteudo deste canal'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminVideoPreviewDialog
