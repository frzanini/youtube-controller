import { Link } from 'react-router-dom'

function Home() {
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
