import { Link, useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/': 'YouTube Controller Free',
  '/pais': 'Painel para Pais',
  '/filhos': 'Modo Filhos'
}

function Header() {
  const { pathname } = useLocation()
  const activeTitle = titles[pathname] ?? 'YouTube Controller Free'

  return (
    <header className="header">
      <div className="header__brand">
        <Link to="/" className="header__logo">
          YTC Free
        </Link>
        <span className="header__title">{activeTitle}</span>
      </div>
      <nav className="header__nav">
        <Link className={`nav__link ${pathname === '/filhos' ? 'nav__link--active' : ''}`} to="/filhos">
          Modo Filhos
        </Link>
        <Link className={`nav__link ${pathname === '/pais' ? 'nav__link--active' : ''}`} to="/pais">
          Modo Pais
        </Link>
        <span className="pill">PWA pronta</span>
      </nav>
    </header>
  )
}

export default Header
