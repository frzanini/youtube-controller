interface YoutubePlayerProps {
  videoId: string
}

function YoutubePlayer({ videoId }: YoutubePlayerProps) {
  const src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&controls=1&fs=0&iv_load_policy=3&disablekb=1`

  return (
    <div className="player">
      <iframe
        title="Player seguro"
        src={src}
        sandbox="allow-same-origin allow-scripts allow-presentation"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
      <p className="muted player__notice">
        O video toca aqui dentro. Nenhum link ou recomendacao externa e exibido.
      </p>
    </div>
  )
}

export default YoutubePlayer
