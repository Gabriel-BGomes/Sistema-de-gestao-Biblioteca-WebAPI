import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Usuarios() {
    const[usuarios, setUsuarios] = useState([])
    const[nome,setNome] = useState('')
    const[email,setEmail] = useState('')
    const[telefone,setTelefone] = useState('')
    const navigate = useNavigate()

function cadastrarUsuario(){
    fetch('http://localhost:8080/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      email: email,
      telefone: telefone 
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
  .then(novoUsuario => {
    setUsuarios([...usuarios, novoUsuario])
    setNome('')
    setEmail('')
    setTelefone('')
  })
}
   
    useEffect(() => {
    fetch('http://localhost:8080/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
}, [])
    return (
        <div className="card mb-4">
          <div className="card-body">
            <h1 className="mb-4">Usuarios</h1>
            <div className="CadastroUsuarios">
              <h5 className="card-title">Cadastrar Usuarios:</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <input className="form-control" type="text" placeholder="Digite o nome do usuário:" value={nome} onChange={e => setNome(e.target.value)}/>
                </div>
                <div className="col-md-4">
                  <input className="form-control" type="text" placeholder="Digite o email do usuario:" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="col-md-4">
                  <input className="form-control" type="text" placeholder="Digite o telefone:" value={telefone} onChange={e => setTelefone(e.target.value)}/>
                </div>
              </div> 
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary mt-3" type="button" onClick={cadastrarUsuario}>
                    Cadastrar
                </button>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                    Voltar
                </button>
                </div>
            </div>
            <h1>Lista de Usuarios:</h1>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                    {usuarios.map(usuarios => (
                    <tr key={usuarios.id}>
                    <td>{usuarios.nome}</td>
                    <td>{usuarios.email}</td> 
                    <td>{usuarios.telefone}</td>
                    </tr>
                    ))}
                
            </tbody>
    </table>
    </div>
  </div>
    )
}

export default Usuarios