# 📚 Sistema de Gestão de Biblioteca

Sistema fullstack para gerenciamento de biblioteca, com cadastro de livros, usuários e controle de empréstimos.

Desenvolvido com **Java + Spring Boot** no backend e **React + Vite** no frontend.

---

## 🖥️ Tecnologias utilizadas

### Backend
- Java 21
- Spring Boot 4
- Spring Data JPA
- Spring Web
- PostgreSQL
- Lombok
- Bean Validation

### Frontend
- React 19
- Vite
- React Router DOM
- Bootstrap 5

---

## 🎯 Conceitos aplicados no projeto

| Conceito | Aplicação |
|---|---|
| Encapsulamento | Entidades protegidas com getters/setters |
| Herança | Estrutura de classes base |
| Polimorfismo | Regras de empréstimo no Service |
| Abstração | Camada de Services |
| MVC | Arquitetura Spring Boot |
| DTO | Comunicação segura com a API |

---

## 🗂️ Modelo de Dados

```
Usuario
-------
id
nome
email
telefone
    1
    |
    N
Emprestimo
----------
id
usuario_id
livro_id
data_emprestimo
data_prevista_devolucao
status (EMPRESTADO | DEVOLVIDO)
    N
    |
    1
Livro
-----
id
titulo
autor
isbn
disponivel
```

**Relacionamentos:**
- Um usuário pode ter vários empréstimos `(1:N)`
- Um livro pode ter vários empréstimos ao longo do tempo `(1:N)`

---

## 📋 Requisitos do sistema

O sistema permite:
- Cadastrar usuários
- Cadastrar livros
- Realizar empréstimos
- Devolver livros
- Verificar disponibilidade do livro automaticamente

---

## ✅ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

| Ferramenta | Versão recomendada | Download |
|---|---|---|
| JDK | 21 (LTS) | https://adoptium.net |
| Node.js | 18+ (LTS) | https://nodejs.org |
| PostgreSQL | 14+ | https://www.postgresql.org/download |
| Git | qualquer | https://git-scm.com |

> **Dica:** no instalador do JDK Temurin, marque a opção **"Set JAVA_HOME"** para configurar automaticamente.

---

## 🗄️ Configuração do Banco de Dados

1. Abra o **pgAdmin** ou o terminal do PostgreSQL
2. Crie um banco de dados chamado `Biblioteca`:

```sql
CREATE DATABASE "Biblioteca";
```

3. O Hibernate vai criar as tabelas automaticamente quando o backend subir pela primeira vez.

---

## ⚙️ Rodando o Backend

### 1. Clone o repositório

```bash
git clone https://github.com/Gabriel-BGomes/Sistema-de-gestao-Biblioteca-WebAPI.git
cd Sistema-de-gestao-Biblioteca-WebAPI
```

### 2. Configure o banco de dados

Abra o arquivo `biblioteca-api/src/main/resources/application.yml` e edite as credenciais:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/Biblioteca
    username: seu_usuario
    password: sua_senha
```

> Substitua `seu_usuario` e `sua_senha` pelas credenciais do seu PostgreSQL. O padrão na instalação é usuário `postgres`.

### 3. Suba o backend

```bash
cd biblioteca-api
./mvnw spring-boot:run
```

> No Windows, se o comando acima não funcionar, use: `mvnw.cmd spring-boot:run`

O backend estará rodando em: **http://localhost:8080**

---

## 🌐 Rodando o Frontend

Abra um **novo terminal** e execute:

```bash
cd biblioteca-frontend
npm install
npm run dev
```

O frontend estará rodando em: **http://localhost:5173**

---

## 📋 Funcionalidades

### Livros
- Cadastrar livros (título, autor, ISBN)
- Listar todos os livros com status de disponibilidade
- Validação de ISBN duplicado

### Usuários
- Cadastrar usuários (nome, email, telefone)
- Listar todos os usuários
- Validação de email e telefone duplicados

### Empréstimos
- Realizar empréstimo vinculando usuário e livro
- Listar todos os empréstimos com datas e status
- Devolver livro com confirmação de duplo clique
- Controle automático de disponibilidade do livro

---

## 🔗 Endpoints da API

### Livros
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/livros` | Lista todos os livros |
| POST | `/livros` | Cadastra um novo livro |
| GET | `/livros/{isbn}` | Busca livro por ISBN |

### Usuários
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/usuarios` | Lista todos os usuários |
| POST | `/usuarios` | Cadastra um novo usuário |

### Empréstimos
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/emprestimos` | Lista todos os empréstimos |
| POST | `/emprestimos` | Realiza um empréstimo |
| PUT | `/emprestimos/{id}/devolver` | Devolve um livro |

---

## 🏗️ Arquitetura do Backend

```
Controller  →  recebe as requisições HTTP
    ↓
  DTO       →  dados que entram e saem da API
    ↓
 Service    →  regras de negócio
    ↓
Repository  →  acesso ao banco de dados
    ↓
  Entity    →  representa as tabelas do banco
```

### Camadas do projeto

```
Banco (PostgreSQL)       →  Usuario | Livro | Emprestimo
Backend (Spring Boot)    →  Entity | Repository | Service | Controller | DTO
Frontend (React)         →  Componentes | fetch API | useState | useEffect
```

---

## 🧪 Rodando os Testes

```bash
cd biblioteca-api
./mvnw test
```

---

## 📁 Estrutura do Projeto

```
Sistema-de-gestao-Biblioteca-WebAPI/
├── biblioteca-api/          # Backend Spring Boot
│   └── src/
│       ├── main/java/.../
│       │   ├── controller/  # Controllers REST
│       │   ├── dto/         # Data Transfer Objects
│       │   ├── entity/      # Entidades JPA
│       │   ├── enums/       # Enumerações
│       │   ├── exception/   # Exceções customizadas
│       │   ├── repository/  # Repositories JPA
│       │   └── service/     # Regras de negócio
│       └── test/            # Testes unitários
│
└── biblioteca-frontend/     # Frontend React
    └── src/
        ├── pages/           # Páginas da aplicação
        │   ├── Livros.jsx
        │   ├── Usuarios.jsx
        │   └── Emprestimos.jsx
        ├── App.jsx          # Componente raiz e rotas
        └── main.jsx         # Ponto de entrada
```

---

## 👨‍💻 Autor

**Gabriel Braga**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel%20Braga-blue)](https://www.linkedin.com/in/ogabrielbraga/)
[![GitHub](https://img.shields.io/badge/GitHub-Gabriel--BGomes-black)](https://github.com/Gabriel-BGomes)