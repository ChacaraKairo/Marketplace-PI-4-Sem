import { Router } from 'express';
import PedidoController from '../controller/Controller_Pedido';
import {
  authMiddleware,
  compradorMiddleware,
  vendedorMiddleware,
} from '../middleware/mid_authGeral';

const pedidoRouter = Router();

pedidoRouter.post(
  '/compra/pedido',
  authMiddleware,
  compradorMiddleware,
  PedidoController.criar_pedido,
);
pedidoRouter.get(
  '/gestao/vendedor/pedidos/:id/nota-fiscal',
  authMiddleware,
  vendedorMiddleware,
  PedidoController.pedido_para_nota_fiscal,
);

export default pedidoRouter;
