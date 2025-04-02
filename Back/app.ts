/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 01/04/2025
 * @description Arquivo de configuração da API do Marketplace de Hardware.
 * Este arquivo configura os middlewares, conecta ao banco de dados usando Prisma,
 * e define as rotas básicas da aplicação.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import router from './src/routes/Routes_Crud';
/**
 * Importações:
 *
 * Express: Framework para criar a API e gerenciar rotas.
 * CORS: Middleware para permitir requisições de diferentes domínios.
 * Morgan: Middleware para logar requisições HTTP.
 * Dotenv: Carrega variáveis de ambiente do arquivo .env.
 * PrismaClient: Facilita a comunicação com o banco de dados.
 */

// Carregando as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express(); // Inicializa o aplicativo Express
const prisma = new PrismaClient(); // Inicializa o PrismaClient para comunicação com o banco de dados

// Usando a variável de ambiente PORT do .env, caso não esteja definida, usa a porta 3000
const PORT = process.env.PORT || 3000;

/**
 * Função para testar a conexão com o banco de dados usando Prisma.
 * @throws {Error} Se a conexão com o banco de dados falhar, o processo será encerrado.
 */
async function testDatabaseConnection() {
  try {
    await prisma.$connect(); // Tenta se conectar ao banco de dados
    console.log(
      '✅ Conexão com o banco de dados estabelecida',
    );
  } catch (error) {
    console.error(
      '❌ Falha ao conectar ao banco de dados:',
      error,
    );
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

// Middleware global para permitir requisições de outros domínios
app.use(cors());

// Middleware para logar todas as requisições HTTP
app.use(morgan('dev'));

// Middleware para permitir que a aplicação entenda requisições com corpo JSON
app.use(express.json());

/**
 * Rota de health check da API.
 * @route GET /api/health
 * @returns {Object} Status da API, mensagem e data/hora atual.
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message:
      'API do Marketplace de Hardware está operacional',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

/**
 * Rota raiz da API.
 * @route GET /
 * @returns {string} Mensagem indicando que a API está funcionando.
 */
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});
// Conectar as rotas ao app
app.use('/api', router); // Prefixando as rotas com '/api'

// Iniciar o servidor na porta definida
app.listen(PORT, async () => {
  await testDatabaseConnection(); // Testa a conexão com o banco de dados ao iniciar o servidor
  console.log(
    `🚀 Servidor rodando em http://localhost:${PORT}`,
  );
});
