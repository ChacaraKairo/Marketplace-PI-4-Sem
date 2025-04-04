# 📦 Backend - Sistema de Pedidos e Pagamentos

## 🛠️ Dependências Necessárias

### 🔹 Core

| Pacote      | Comando de Instalação          | Descrição                         |
| ----------- | ------------------------------ | --------------------------------- |
| **Express** | `npm i express @types/express` | Framework web para Node.js        |
| **Prisma**  | `npm i prisma @prisma/client`  | ORM para banco de dados           |
|             | `npx prisma init`              | Inicializa configuração do Prisma |
|             | `npx prisma db pull`           | Gera o banco de dados             |
|             | `npx prisma generate`          | Gera o client do Prisma           |

### 🔹 Segurança & Utilidades

| Pacote        | Comando de Instalação                        | Descrição                              |
| ------------- | -------------------------------------------- | -------------------------------------- |
| **CORS**      | `npm i cors @types/cors`                     | Habilita comunicação front-back        |
| **Validator** | `npm i validator @types/validator`           | Validação de dados                     |
| **Bcrypt**    | `npm i bcrypt`                               | Criptografia de senhas                 |
|               | `npm install --save-dev @types/bcrypt`       | Dependência do bcrypt                  |
| **JWT**       | `npm i jsonwebtoken @types/jsonwebtoken`     | Autenticação por token                 |
|               | `npm install --save-dev @types/jsonwebtoken` | Dependência do jsonwebtoken            |
| **Dotenv**    | `npm i dotenv`                               | Gerenciamento de variáveis de ambiente |
| **Morgan**    | `npm i morgan @types/morgan`                 | Log de requisições HTTP                |

### 🔹 Ferramentas de Desenvolvimento

| Pacote  | Comando de Instalação | Descrição                            |
| ------- | --------------------- | ------------------------------------ |
| **TSX** | `npm i tsx`           | Permite rodar TypeScript diretamente |

## 🗂️ Estrutura de Pastas

```bash
/
├── 📄 app.ts               # Configuração do Express
├── 📄 server.ts            # Ponto de entrada
├── 📄 .env                 # Variáveis de ambiente
│
├── 📂 prisma/             # Configuração do banco
│   ├── 📄 schema.prisma   # Modelos de dados
│   └── 📂 migrations/     # Histórico de alterações
│
└── 📂 src/                # Código-fonte
    ├── 📂 controllers/    # Lógica de endpoints
    ├── 📂 services/       # Regras de negócio
    ├── 📂 routes/         # Definição de rotas
    └── 📂 validations/    # Validação de dados
```
