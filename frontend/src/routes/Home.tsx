import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero">
      <div className="card">
        <h1>YouTube Controller – Versão Free</h1>
        <p>
          Crie uma lista branca simples para que as crianças só assistam o que você liberar. Tudo
          roda no seu navegador, com PWA para usar offline.
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
