/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Arquivo responsável por iniciar o servidor Express,
 *              carregar variáveis de ambiente e testar a conexão com o banco de dados Prisma.
 */

import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import app from './app';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT;

/**
 * Testa a conexão com o banco de dados utilizando Prisma Client.
 * Em caso de falha, encerra a aplicação com código de erro 1.
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

/**
 * Inicia o servidor na porta configurada e executa o teste de conexão com o banco.
 */
app.listen(PORT, async () => {
  await testDatabaseConnection();
  console.log(
    `🚀 Servidor rodando em http://localhost:${PORT}`,
  );
});
