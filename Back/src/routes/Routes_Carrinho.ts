/**
 * @file Routes_Carrinho.ts
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Define as rotas relacionadas ao carrinho de compras da aplicação.
 *              Inclui funcionalidades como adicionar itens ao carrinho e transformar o carrinho em pedido.
 */

import { Router } from 'express';
import CarrinhoController from '../controller/Controller_Carrinho';
import {
  authMiddleware,
  compradorMiddleware,
} from '../middleware/mid_authGeral'; // Middleware para autenticação e verificação de tipo de usuário (comprador)

const carrinhoRouter = Router();

/**
 * @route POST /carrinho
 * @description Adiciona um item ao carrinho do comprador autenticado.
 *              A requisição deve conter os dados do item no corpo da requisição.
 * Middlewares:
 *  - authMiddleware: Verifica se o token JWT está presente e é válido.
 *  - compradorMiddleware: Verifica se o usuário autenticado é do tipo 'comprador'.
 * Controlador: CarrinhoController.addCarrinho
 */
carrinhoRouter.post(
  '/carrinho',
  authMiddleware,
  compradorMiddleware,
  CarrinhoController.addCarrinho,
);

/**
 * @route POST /carrinho/:id/transformar
 * @description Transforma o carrinho com ID especificado em um pedido.
 *              Deve ser usado quando o comprador desejar finalizar a compra.
 * Params:
 *  - id: ID do carrinho que será convertido em pedido.
 * Middlewares:
 *  - authMiddleware: Verifica se o token JWT está presente e é válido.
 *  - compradorMiddleware: Verifica se o usuário autenticado é do tipo 'comprador'.
 * Controlador: CarrinhoController.passarParaPedido
 */
carrinhoRouter.post(
  '/carrinho/:id/transformar',
  authMiddleware,
  compradorMiddleware,
  CarrinhoController.passarParaPedido,
);

// Exporta o roteador para ser usado no roteador principal
export default carrinhoRouter;
