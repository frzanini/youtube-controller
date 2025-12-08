interface AdminChannelCardProps {
  channelId: string
  title: string
  thumbnailUrl: string
  authorized: boolean
  mode: 'search' | 'authorized'
  selected?: boolean
  onToggleSelect?: () => void
  onAuthorizeChannel: () => void
  onRevokeChannel: () => void
}

function AdminChannelCard({
  title,
  thumbnailUrl,
  authorized,
  mode,
  selected,
  onToggleSelect,
  onAuthorizeChannel,
  onRevokeChannel
}: AdminChannelCardProps) {
  return (
    <div className={`admin-card admin-card--channel ${mode === 'authorized' ? 'admin-card--readonly' : ''}`}>
      <img className="admin-card__thumb" src={thumbnailUrl} alt={title} />
      <div className="admin-card__body">
        <div className="admin-card__head">
          {mode === 'authorized' && onToggleSelect && (
            <input type="checkbox" checked={selected} onChange={onToggleSelect} aria-label="Selecionar canal" />
          )}
          <div>
            <h3 className="admin-card__title">{title}</h3>
            <p className="muted">Canal seguro escolhido por voce.</p>
          </div>
        </div>

        {mode === 'search' && (
          <div className="admin-card__actions admin-card__actions--compact">
            {authorized ? (
              <button className="button ghost button--sm" type="button" onClick={onRevokeChannel}>
                Remover canal
              </button>
            ) : (
              <button className="button primary button--sm" type="button" onClick={onAuthorizeChannel}>
                Autorizar canal
              </button>
            )}
          </div>
        )}

        {mode === 'authorized' && <p className="note">Canal liberado para as criancas.</p>}
      </div>
    </div>
  )
}

export default AdminChannelCard
