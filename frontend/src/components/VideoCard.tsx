interface VideoCardProps {
  id: string
  label: string
  onSelect: (id: string) => void
}

function VideoCard({ id, label, onSelect }: VideoCardProps) {
  return (
    <button className="card card--clickable" onClick={() => onSelect(id)}>
      <span className="chip">Video liberado</span>
      <h3>{label}</h3>
      <p className="muted">ID: {id}</p>
      <span className="link">Assistir dentro do app</span>
    </button>
  )
}

export default VideoCard
