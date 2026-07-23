import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Livros from './pages/Livros'
import Usuarios from './pages/Usuarios'
import Emprestimos from './pages/Emprestimos'


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">API Biblioteca</span>
        <div className="navbar-nav">
          <Link className="nav-link text-white" to="/livros">Livros</Link>
          <Link className="nav-link text-white" to="/usuarios">Usuários</Link>
          <Link className="nav-link text-white" to="/emprestimos">Empréstimos</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/livros" element={<Livros />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
        <Route path="/" element={<h1>Bem-vindo ao Sistema de Biblioteca!</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App