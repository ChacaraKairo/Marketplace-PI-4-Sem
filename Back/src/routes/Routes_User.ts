import { Router } from 'express';
import ControllerUser from '../controller/Controller_User';

const userRouter = Router();

userRouter.post(
  '/cadastro/usuarios',
  ControllerUser.criar_usuario,
);
userRouter.post(
  '/cadastro/vendedores',
  ControllerUser.criar_vendedor,
);

export default userRouter;
