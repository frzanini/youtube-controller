import { FormEvent, useMemo, useState } from 'react'
import { AllowedChannel, AllowedVideo } from '../modules/whitelist/types'

type ResultType = 'video' | 'channel'

interface SearchResult {
  id: string
  title: string
  channel: string
  duration: string
  thumbnail: string
  type: ResultType
}

interface SearchBarProps {
  onAuthorizeVideo: (video: AllowedVideo) => void
  onAuthorizeChannel: (channel: AllowedChannel) => void
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Musica calma para criancas',
    channel: 'Kids Studio',
    duration: '3:25',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    type: 'video'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'ABC das cores',
    channel: 'Aprender Brincando',
    duration: '4:02',
    thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg',
    type: 'video'
  },
  {
    id: 'UC123KIDS',
    title: 'Canal Cientistas Kids',
    channel: 'Cientistas Kids',
    duration: 'Canal',
    thumbnail: 'https://via.placeholder.com/160x90.png?text=Canal',
    type: 'channel'
  },
  {
    id: 'UC999HIST',
    title: 'Historias para dormir',
    channel: 'Hora da Historinha',
    duration: 'Canal',
    thumbnail: 'https://via.placeholder.com/160x90.png?text=Canal',
    type: 'channel'
  }
]

function SearchBar({ onAuthorizeVideo, onAuthorizeChannel }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return results
    return results.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.channel.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term)
    )
  }, [query, results])

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    setHasSearched(true)
    // Mock search in place of external API
    setResults(MOCK_RESULTS)
  }

  const authorize = (result: SearchResult) => {
    if (result.type === 'video') {
      onAuthorizeVideo({ id: result.id, label: result.title })
    } else {
      onAuthorizeChannel({ id: result.id, label: result.title })
    }
  }

  return (
    <div className="card">
      <h2>Buscar conteudo</h2>
      <p>Simulacao de busca segura. Adicione somente resultados aprovados.</p>
      <form className="search" onSubmit={handleSearch}>
        <input
          className="input"
          placeholder="Buscar por titulo, canal ou ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button secondary" type="submit">
          Buscar
        </button>
      </form>
      <div className="grid results">
        {filtered.map((item) => (
          <div className="result" key={`${item.type}-${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="result__thumb" />
            <div className="result__meta">
              <strong>{item.title}</strong>
              <p className="muted">
                {item.channel} • {item.duration}
              </p>
            </div>
            <div className="result__actions">
              {item.type === 'video' ? (
                <button className="button primary" type="button" onClick={() => authorize(item)}>
                  Autorizar video
                </button>
              ) : (
                <button className="button secondary" type="button" onClick={() => authorize(item)}>
                  Autorizar canal
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && hasSearched && <p className="muted">Nenhum resultado encontrado.</p>}
      </div>
    </div>
  )
}

export default SearchBar
