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
        <div>
            <h1>Usuarios</h1>
            <div className="CadastroUsuarios">
                <h3>Cadastrar Usuarios:</h3>
                <div className="InputsCadastroUsuarios">
                    <label>Digite o nome do usuário:</label>
                    <input className="nome_usuario" type="text" value={nome} onChange={e => setNome(e.target.value)}/>

                    <label>Digite o email do usuario:</label>
                    <input className="email_usuario" type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <label className="">Digite o telefone:</label>
                    <input className="telefone_usuario" type="text" value={telefone} onChange={e => setTelefone(e.target.value)}/>
                </div>
                <button className="BtnCadastrar" type="button" onClick={cadastrarUsuario}>
                    Cadastrar
                </button>
                <button className="BtnVoltar" onClick={() => navigate('/')}>
                    Voltar
                </button>
            </div>
            <h1>Lista de Usuarios:</h1>
            <div className="ListaUsuarios">
                <ul>
                    {usuarios.map(usuarios => (
                    <li key={usuarios.id}>
                    {usuarios.nome} — {usuarios.email} — {usuarios.telefone}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Usuarios