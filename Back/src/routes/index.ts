import { Router } from 'express';

import crudRouter from './Routes_Crud';
import userRouter from './Routes_User';
import authRouter from './Routes_Auth';
import pedidoRouter from './Routes_Pedido';
import carrinhoRouter from './Routes_Carrinho';

const router = Router();

router.use(crudRouter);
router.use(userRouter);
router.use(authRouter);
router.use(pedidoRouter);
router.use(carrinhoRouter);

export default router;
