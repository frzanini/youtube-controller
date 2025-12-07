interface VideoCardProps {
  id: string
  label: string
  onSelect: (id: string) => void
}

function VideoCard({ id, label, onSelect }: VideoCardProps) {
  return (
    <button className="card card--clickable" onClick={() => onSelect(id)}>
      <span className="chip">Vídeo</span>
      <h3>{label}</h3>
      <p>ID: {id}</p>
      <span className="link">Assistir</span>
    </button>
  )
}

export default VideoCard
