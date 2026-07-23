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
        <div className="card mb-4">
          <div className="card-body">
            <h1 className="mb-4">Emprestimos</h1>
            <div className="CadastroEmprestimos"></div>
                <h5 className="card-title">Cadastrar Emprestimos:</h5>
                <div className="row">
                    <div className="col">
                    <input className="form-control" type="text" placeholder="ID Livro:" value={livroId} onChange={e => setLivroId(e.target.value)}/>
                    </div>
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Digite o ID Usuario:" value={usuarioId} onChange={e => setUsuarioId(e.target.value)}/>
                    </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary mt-3" type="button" onClick={cadastrarEmprestimos}>Cadastrar</button>
                    <button className="btn btn-primary mt-3" type="button" onClick={() => navigate('/')}>Voltar</button>
                </div> 
            </div>
            <div className="ListaEmprestimos">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                        <th>Nome</th>
                        <th>Título do livro</th>
                        <th>Data do emprestimo</th>
                        <th>Data prevista para devolução</th>
                        <th>Status</th>
                        <th>Devolver</th>
                        </tr>
                    </thead>
                    <tbody>
                    {emprestimos.map(emprestimo => (
                    <tr key={emprestimo.id}>
                        <td>{emprestimo.usuario.nome}</td>
                        <td>{emprestimo.livro.titulo}</td>
                        <td>{emprestimo.dataEmprestimo}</td>
                        <td>{emprestimo.dataPrevistaDevolucao}</td>
                        <td>{emprestimo.status}</td>
                        <td>{emprestimo.status === 'EMPRESTADO' && (
                        confirmandoId === emprestimo.id
                            ? <button className="btn btn-warning btn-sm" onClick={() => devolverEmprestimos(emprestimo.id)}>Confirmar</button>
                            : <button className="btn btn-danger btn-sm" onClick={() => {
                                setConfirmandoId(emprestimo.id)
                                setTimeout(() => setConfirmandoId(null), 5000)
                            }}>Devolver</button>
                        )}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Emprestimos