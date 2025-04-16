/**
 * @description Arquivo responsável por iniciar o servidor e testar conexão com o banco de dados.
 */

import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import app from './app';

// Carrega variáveis de ambiente
dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

/**
 * Função para testar a conexão com o banco de dados usando Prisma.
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
    process.exit(1);
  }
}

// Inicia o servidor e testa a conexão
app.listen(PORT, async () => {
  await testDatabaseConnection();
  console.log(
    `🚀 Servidor rodando em http://localhost:${PORT}`,
  );
});
