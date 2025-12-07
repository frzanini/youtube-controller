import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import Pais from './routes/Pais'
import Filhos from './routes/Filhos'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pais" element={<Pais />} />
          <Route path="/filhos" element={<Filhos />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
