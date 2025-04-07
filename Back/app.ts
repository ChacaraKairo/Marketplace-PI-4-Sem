/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 01/04/2025
 * @description Arquivo responsável pela configuração da aplicação Express.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './src/routes/Routes_Crud';

const app = express(); // Inicializa o aplicativo Express

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

// Conectar as rotas da aplicação
app.use('/api', router);

export default app;
