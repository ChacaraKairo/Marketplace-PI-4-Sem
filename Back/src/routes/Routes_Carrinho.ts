import { Router } from 'express';
import CarrinhoController from '../controller/Controller_Carrinho';
import {
  authMiddleware,
  compradorMiddleware,
} from '../middleware/mid_authGeral';

const carrinhoRouter = Router();

carrinhoRouter.post(
  '/carrinho',
  authMiddleware,
  compradorMiddleware,
  CarrinhoController.addCarrinho,
);
carrinhoRouter.post(
  '/carrinho/:id/transformar',
  authMiddleware,
  compradorMiddleware,
  CarrinhoController.passarParaPedido,
);

export default carrinhoRouter;
