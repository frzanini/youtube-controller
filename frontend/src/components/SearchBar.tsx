interface SearchBarProps {
  query: string
  mode: 'videos' | 'channels'
  onQueryChange: (value: string) => void
  onModeChange: (mode: 'videos' | 'channels') => void
  onSearch: () => void
  isLoading?: boolean
}

function SearchBar({ query, mode, onQueryChange, onModeChange, onSearch, isLoading }: SearchBarProps) {
  return (
    <div className="card search-bar search-bar--sticky">
      <div className="search-bar__header">
        <div>
          <h2>Busque conteudos seguros</h2>
          <p>Redefina a busca a qualquer momento.</p>
        </div>
        <div className="toggle">
          <button
            className={`toggle__item ${mode === 'videos' ? 'toggle__item--active' : ''}`}
            type="button"
            onClick={() => onModeChange('videos')}
          >
            Videos
          </button>
          <button
            className={`toggle__item ${mode === 'channels' ? 'toggle__item--active' : ''}`}
            type="button"
            onClick={() => onModeChange('channels')}
          >
            Canais
          </button>
        </div>
      </div>

      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch()
        }}
      >
        <input
          className="input"
          placeholder={mode === 'videos' ? 'Busque por um video' : 'Busque por um canal'}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button className="button secondary" type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </div>
  )
}

export default SearchBar
