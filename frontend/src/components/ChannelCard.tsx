interface ChannelCardProps {
  id: string
  label: string
}

function ChannelCard({ id, label }: ChannelCardProps) {
  const channelUrl = `https://www.youtube.com/channel/${id}`
  return (
    <a className="card card--clickable" href={channelUrl} target="_blank" rel="noreferrer">
      <span className="chip chip--outline">Canal</span>
      <h3>{label}</h3>
      <p>ID: {id}</p>
      <span className="link">Abrir no YouTube</span>
    </a>
  )
}

export default ChannelCard
