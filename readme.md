
# 💬 Chat Rooms

Salas de chat em tempo real utilizando **Socket.IO** (WebSockets), **Express** e **SQLite**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

---

## ✨ Funcionalidades

- Criação e exclusão de salas de chat
- Mensagens em tempo real com WebSockets (Socket.IO)
- Entrada e saída de salas (`join_chat` / `leave_chat`)
- Persistência das mensagens no banco de dados SQLite
- Mensagens de feedback na interface (flash messages)
- Páginas renderizadas no servidor com EJS

## 🛠️ Tecnologias

| Dependência | Uso |
| --- | --- |
| [Express](https://expressjs.com/) | Servidor HTTP e rotas |
| [Socket.IO](https://socket.io/) | Comunicação em tempo real |
| [SQLite3](https://www.npmjs.com/package/sqlite3) | Banco de dados |
| [EJS](https://ejs.co/) | Template engine das views |
| [express-session](https://www.npmjs.com/package/express-session) | Sessões |
| [connect-flash](https://www.npmjs.com/package/connect-flash) | Mensagens flash |
| [body-parser](https://www.npmjs.com/package/body-parser) | Leitura de formulários e JSON |
| [dotenv](https://www.npmjs.com/package/dotenv) | Variáveis de ambiente |

## 📁 Estrutura do projeto

```
Chat-Rooms/
├── assets/            # Arquivos estáticos (CSS, JS do cliente, imagens)
├── database/          # Banco de dados SQLite
├── models/
│   └── chats/         # Lógica de acesso a dados (chats e mensagens)
├── routes/
│   ├── index.js       # Rota principal
│   └── chats/         # Rotas: create, del e room
├── views/             # Templates EJS
├── application.js     # Ponto de entrada (Express + Socket.IO)
├── .env.example       # Exemplo de variáveis de ambiente
└── package.json
```

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- npm (já incluso com o Node.js)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/higordday/Chat-Rooms.git

# 2. Acesse a pasta do projeto
cd Chat-Rooms

# 3. Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
EXPRESS_SESSION_SECRET_KEY=sua_chave_secreta
SERVER_LISTENING_PORT=8000
```

| Variável | Descrição |
| --- | --- |
| `EXPRESS_SESSION_SECRET_KEY` | Chave secreta usada para assinar as sessões |
| `SERVER_LISTENING_PORT` | Porta em que o servidor vai rodar |

### Execução

```bash
node application.js
```

Depois, acesse `http://localhost:8000` (ou a porta que você definiu no `.env`).

## 🔌 Eventos do Socket.IO

| Evento | Direção | Descrição |
| --- | --- | --- |
| `join_chat` | cliente → servidor | Entra na sala informada (`chat_id`) |
| `leave_chat` | cliente → servidor | Sai da sala informada (`chat_id`) |
| `send` | cliente → servidor | Envia uma mensagem; ela é salva no banco e retransmitida |
| `broadcast` | servidor → cliente | Entrega a mensagem a todos os participantes da sala |