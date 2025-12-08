interface AdminVideoCardProps {
  videoId: string
  channelId: string
  title: string
  channelTitle: string
  duration: string
  thumbnailUrl: string
  authorized: boolean
  channelAuthorized: boolean
  mode: 'search' | 'authorized'
  selected?: boolean
  onToggleSelect?: () => void
  onAuthorize: () => void
  onAuthorizeChannel?: () => void
  onRevoke: () => void
  onPreview: () => void
}

function AdminVideoCard({
  title,
  channelTitle,
  duration,
  thumbnailUrl,
  authorized,
  channelAuthorized,
  mode,
  selected,
  onToggleSelect,
  onAuthorize,
  onAuthorizeChannel,
  onRevoke,
  onPreview
}: AdminVideoCardProps) {
  return (
    <div className={`admin-card admin-card--video ${mode === 'authorized' ? 'admin-card--readonly' : ''}`}>
      <img className="admin-card__thumb admin-card__thumb--video" src={thumbnailUrl} alt={title} />
      <div className="admin-card__body">
        <div className="admin-card__head">
          {mode === 'authorized' && onToggleSelect && (
            <input type="checkbox" checked={selected} onChange={onToggleSelect} aria-label="Selecionar video" />
          )}
          <div className="admin-card__meta">
            <p className="pill pill--soft">{duration}</p>
            <h3 className="admin-card__title">{title}</h3>
            <p className="muted">Canal: {channelTitle}</p>
          </div>
        </div>

        {mode === 'search' && (
          <div className="admin-card__actions admin-card__actions--compact">
            <button className="button secondary button--sm" type="button" onClick={onPreview}>
              Assistir previa
            </button>
            {authorized ? (
              <button className="button ghost button--sm" type="button" onClick={onRevoke}>
                Remover video
              </button>
            ) : (
              <button className="button primary button--sm" type="button" onClick={onAuthorize}>
                Autorizar video
              </button>
            )}
            {onAuthorizeChannel &&
              (channelAuthorized ? (
                <span className="pill pill--soft">Canal ja autorizado</span>
              ) : (
                <button className="button ghost button--sm" type="button" onClick={onAuthorizeChannel}>
                  Autorizar canal
                </button>
              ))}
          </div>
        )}

        {mode === 'authorized' && <p className="note">Video liberado para as criancas.</p>}
      </div>
    </div>
  )
}

export default AdminVideoCard
