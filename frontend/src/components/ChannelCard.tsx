interface ChannelCardProps {
  id: string
  label: string
}

function ChannelCard({ id, label }: ChannelCardProps) {
  return (
    <div className="card card--blocked">
      <span className="chip chip--outline">Canal liberado</span>
      <h3>{label}</h3>
      <p className="muted">ID: {id}</p>
      <p className="note">Reproducao de videos deste canal liberada no app.</p>
    </div>
  )
}

export default ChannelCard
