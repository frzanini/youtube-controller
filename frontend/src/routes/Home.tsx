import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { loadWhitelist } from '../modules/whitelist/storageLocal'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const config = loadWhitelist()
    if (config.videos.length > 0 || config.channels.length > 0) {
      navigate('/filhos', { replace: true })
    }
  }, [navigate])

  return (
    <section className="hero">
      <div className="card hero__card">
        <span className="pill">Versao Free</span>
        <h1>YouTube Controller</h1>
        <p>
          Este aplicativo permite que criancas assistam somente conteudos autorizados pelos pais. Tudo fica salvo no
          seu dispositivo.
        </p>
        <div className="button-grid">
          <Link className="button primary" to="/pais">
            Modo Pais
          </Link>
          <Link className="button secondary" to="/filhos">
            Modo Filhos
          </Link>
          <button className="button ghost" disabled>
            Premium (em breve)
          </button>
        </div>
      </div>
    </section>
  )
}

export default Home
