/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 25/03/2025
 *
 */
/**
 * app.ts - Arquivo principal do backend
 *
 * Configura:
 * 1. Servidor Express
 * 2. Conexão com o banco de dados (Prisma)
 * 3. Middlewares globais (CORS, logging, JSON parsing)
 * 4. Rotas básicas (health check)
 * 5. Tratamento de erros centralizado
 */

import express from 'express'; // Biblioteca para criar e configurar o servidor
import { PrismaClient } from '@prisma/client'; // Cliente do Prisma para interagir com o banco de dados
import cors from 'cors'; // Biblioteca para habilitar CORS(Cross-Origin Resource Sharing)
import morgan from 'morgan'; // Biblioteca para logging de requisições HTTP
import dotenv from 'dotenv'; // Biblioteca para carregar variáveis de ambiente

/* ====================== */
/* 1. CONFIGURAÇÃO INICIAL */
/* ====================== */

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Cria instância do Express
const app = express();

// Inicializa o cliente do Prisma para acesso ao banco de dados
const prisma = new PrismaClient();

// Define a porta do servidor (usa a variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;

/* ====================== */
/* 2. MIDDLEWARES GLOBAIS */
/* ====================== */

// Habilita CORS para todas as rotas
app.use(cors());

// Configura logging de requisições HTTP no formato 'dev' (colorido)
app.use(morgan('dev'));

// Permite o parse automático de JSON no body das requisições
app.use(express.json());

/* ====================== */
/* 3. CONEXÃO COM O BANCO */
/* ====================== */

/**
 * Testa a conexão com o banco de dados
 * @throws {Error} Se a conexão falhar
 */
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log(
      '✅ Conexão com o banco de dados estabelecida',
    );
  } catch (error) {
    console.error(
      '❌ Falha ao conectar ao banco de dados:',
      error,
    );
    process.exit(1); // Encerra o processo com erro
  }
}

/* ====================== */
/* 4. ROTAS DA APLICAÇÃO */
/* ====================== */

// Rota de health check para monitoramento
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message:
      'API do Marketplace de Hardware está operacional',
    timestamp: new Date().toISOString(),
    database: 'connected', // Poderia verificar o status real da conexão
    version: '1.0.0',
  });
});

/* ====================== */
/* 5. TRATAMENTO DE ERROS */
/* ====================== */

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware global de erros
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error('Erro não tratado:', err.stack);
    res.status(500).json({
      error: 'Ocorreu um erro interno no servidor',
      details:
        process.env.NODE_ENV === 'development'
          ? err.message
          : undefined,
    });
  },
);

/* ====================== */
/* 6. INICIALIZAÇÃO */
/* ====================== */

// Inicia o servidor
app.listen(PORT, async () => {
  await testDatabaseConnection();
  console.log(
    `🚀 Servidor rodando em http://localhost:${PORT}`,
  );
});

// Fecha a conexão com o banco ao encerrar o servidor
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('🔌 Conexão com o banco de dados encerrada');
  process.exit(0);
});

// Exporta a instância do Express para testes
export default app;
