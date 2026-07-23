import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Livros() {
  const [livros, setLivros] = useState([])
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [isbn, setIsbn] = useState('')
  const navigate = useNavigate()

function cadastrarLivro() {
  fetch('http://localhost:8080/livros', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      disponivel: true
    })
  })
  .then(res => res.json())
  .then(novoLivro => {
    setLivros([...livros, novoLivro])
    setTitulo('')
    setAutor('')
    setIsbn('')
  })
}

  useEffect(() => {
    fetch('http://localhost:8080/livros')
      .then(res => res.json())
      .then(data => setLivros(data))
  }, [])

return (
  <div className="container mt-4">
    <h1 className="mb-4">Livros</h1>

    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Cadastrar Livros:</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input className="form-control" type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <input className="form-control" type="text" placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <input className="form-control" type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)}/>
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary mt-3" onClick={cadastrarLivro}>Cadastrar</button>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Voltar</button>
        </div>
      </div>
    </div>

    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>ISBN</th>
          <th>Disponível</th>
        </tr>
      </thead>
      <tbody>
        {livros.map(livro => (
          <tr key={livro.id}>
            <td>{livro.titulo}</td>
            <td>{livro.autor}</td>
            <td>{livro.isbn}</td>
            <td>{livro.disponivel ? '✅' : '❌'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}

export default Livros