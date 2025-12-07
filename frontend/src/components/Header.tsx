import { Link, useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/': 'YouTube Controller – Free',
  '/pais': 'Painel para Pais',
  '/filhos': 'Modo Filhos'
}

function Header() {
  const { pathname } = useLocation()
  const activeTitle = titles[pathname] ?? 'YouTube Controller – Free'

  return (
    <header className="header">
      <div className="header__brand">
        <Link to="/" className="header__logo">
          YTC Free
        </Link>
        <span className="header__title">{activeTitle}</span>
      </div>
      <div className="header__cta">
        <span className="pill">PWA Ready</span>
      </div>
    </header>
  )
}

export default Header
