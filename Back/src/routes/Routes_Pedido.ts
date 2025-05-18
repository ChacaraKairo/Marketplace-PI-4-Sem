/**
 * @file Routes_Pedido.ts
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Define rotas relacionadas ao gerenciamento de pedidos.
 *              Inclui criação de pedidos por compradores e geração de nota fiscal por vendedores.
 */

import { Router } from 'express';
import PedidoController from '../controller/Controller_Pedido';
import {
  authMiddleware,
  compradorMiddleware,
  vendedorMiddleware,
} from '../middleware/mid_authGeral'; // Middlewares de autenticação e autorização

const pedidoRouter = Router();

/**
 * @route POST /compra/pedido
 * @description Endpoint para compradores criarem um novo pedido.
 * Middlewares:
 *  - authMiddleware: Verifica se o token JWT é válido.
 *  - compradorMiddleware: Verifica se o usuário autenticado é do tipo 'comprador'.
 * Body esperado:
 *  - Objeto contendo informações do pedido e itens.
 * Controlador:
 *  - PedidoController.criar_pedido
 */
pedidoRouter.post(
  '/compra/pedido',
  authMiddleware,
  compradorMiddleware,
  PedidoController.criar_pedido,
);

/**
 * @route GET /gestao/vendedor/pedidos/:id/nota-fiscal
 * @description Endpoint para vendedores obterem a nota fiscal de um pedido.
 * Params:
 *  - id: ID do pedido para o qual será gerada a nota fiscal.
 * Middlewares:
 *  - authMiddleware: Verifica token JWT.
 *  - vendedorMiddleware: Verifica se o usuário é do tipo 'vendedor'.
 * Controlador:
 *  - PedidoController.pedido_para_nota_fiscal
 */
pedidoRouter.get(
  '/gestao/vendedor/pedidos/:id/nota-fiscal',
  authMiddleware,
  vendedorMiddleware,
  PedidoController.pedido_para_nota_fiscal,
);

// Exporta o roteador de pedidos para ser usado no roteador principal
export default pedidoRouter;
