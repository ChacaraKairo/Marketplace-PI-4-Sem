/**
 * @file index.ts
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Arquivo principal de roteamento. Centraliza e organiza os grupos de rotas da aplicação.
 */

import { Router } from 'express';

// Importa os arquivos de rotas específicas
import crudRouter from './Routes_Crud'; // Rotas genéricas de CRUD (pode ser usado para testes ou rotas padrão)
import userRouter from './Routes_User'; // Rotas relacionadas à criação de usuários e vendedores
import authRouter from './Routes_Auth'; // Rotas relacionadas à autenticação (login, token, etc.)
import pedidoRouter from './Routes_Pedido'; // Rotas relacionadas a pedidos (criação, visualização, status)
import carrinhoRouter from './Routes_Carrinho'; // Rotas relacionadas ao carrinho de compras do usuário

// Cria o roteador principal
const router = Router();

// Usa todos os sub-roteadores importados
router.use(crudRouter);
router.use(userRouter);
router.use(authRouter);
router.use(pedidoRouter);
router.use(carrinhoRouter);

// Exporta o roteador principal para ser utilizado no app Express
export default router;
