import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Livros from './pages/Livros'
import Usuarios from './pages/Usuarios'
import Emprestimos from './pages/Emprestimos'


function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/livros">Livros</Link>
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/emprestimos">Emprestimos</Link>
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