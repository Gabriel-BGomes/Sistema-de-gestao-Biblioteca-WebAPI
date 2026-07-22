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
    <div>
      <h1>Livros</h1>
      <div className="CadastroLivros">
        <h3>Cadastrar Livros:</h3>
        <div className="InputsCadastroLivros">
          <label>Digite o título do livro:</label>
          <input className="titulo_livro" type="text" value={titulo} onChange={e => setTitulo(e.target.value)}/>

          <label>Digite o nome do autor do livro:</label>
          <input className="autor_livro" type="text" value={autor} onChange={e => setAutor(e.target.value)}/>

          <label className="">Digite o isbn do livro:</label>
          <input className="isbn_livro" type="text" value={isbn} onChange={e => setIsbn(e.target.value)}/>
        </div>
        <button className="BtnCadastrar" type="button" onClick={cadastrarLivro}>
          Cadastrar
        </button>
        <button className="BtnVoltar" onClick={() => navigate ('/')}>
          Voltar
        </button>
      </div>

      <div className="ListaLivros">
        <h3>Livros Cadastrados</h3>
        <ul>
          {livros.map(livro => (
            <li key={livro.id}>
              {livro.titulo} — {livro.autor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Livros