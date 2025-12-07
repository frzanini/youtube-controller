interface YoutubePlayerProps {
  videoId: string
}

function YoutubePlayer({ videoId }: YoutubePlayerProps) {
  const src = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="player">
      <iframe
        title="YouTube player"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default YoutubePlayer
