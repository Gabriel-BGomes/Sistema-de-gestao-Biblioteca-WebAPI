import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Emprestimos(){
    const[emprestimos, setEmprestimos] = useState([])
    const[usuarioId, setUsuarioId] = useState('')
    const[livroId, setLivroId] = useState('')
    const navigate = useNavigate()
    const [confirmandoId, setConfirmandoId] = useState(null)

function devolverEmprestimos(id) {
   fetch(`http://localhost:8080/emprestimos/${id}/devolver`, {
    method: 'PUT'
    })
    .then(res => res.json())
    .then(emprestimoAtualizado => {
    setEmprestimos(emprestimos.map(e =>
        e.id === emprestimoAtualizado.id ? emprestimoAtualizado : e
    ))
    })
} 

function cadastrarEmprestimos(){
    fetch('http://localhost:8080/emprestimos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuarioId: usuarioId,
      livroId: livroId
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        alert(err.erro)
      })
    }
    return res.json()
  })
  .then(novoEmprestimo => {
    setEmprestimos([...emprestimos, novoEmprestimo])
    setUsuarioId('')
    setLivroId('')
  })
}

    useEffect(() => {
        fetch('http://localhost:8080/emprestimos')
        .then(res => res.json())
        .then(data => setEmprestimos(data))
    }, [])

    return(
        <div>
            <h1>Emprestimos</h1>
            <div className="CadastroEmprestimo">
                <label htmlFor="" className="IDLivro">ID Livro:</label>
                <input className="IDLivro" type="text" value={livroId} onChange={e => setLivroId(e.target.value)}/>

                <label htmlFor="" className="IDUsuario">ID Usuario:</label>
                <input className="IDUsuario" type="text" value={usuarioId} onChange={e => setUsuarioId(e.target.value)}/>

                <button className="BtnCadastrar" onClick={cadastrarEmprestimos}>Cadastrar</button>

                <button className="BtnVoltar" onClick={() => navigate('/')}>
                    Voltar
                </button>
            </div>
            <h1>Lista de Usuarios:</h1>
            <div className="ListaEmprestimos">
                <ul>
                    {emprestimos.map(emprestimo => (
                    <li key={emprestimo.id}>
                        {emprestimo.usuario.nome} — {emprestimo.livro.titulo} — {emprestimo.status} — {emprestimo.dataEmprestimo} — {emprestimo.dataPrevistaDevolucao} 
                        {emprestimo.status === 'EMPRESTADO' && (
                        confirmandoId === emprestimo.id
                            ? <button onClick={() => devolverEmprestimos(emprestimo.id)}>Confirmar</button>
                            : <button onClick={() => {
                                setConfirmandoId(emprestimo.id)
                                setTimeout(() => setConfirmandoId(null), 5000)
                            }}>Devolver</button>
                        )}
                    </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Emprestimos