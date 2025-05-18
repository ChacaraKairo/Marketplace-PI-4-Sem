/**
 * @file Routes_User.ts
 * @description Define as rotas relacionadas ao cadastro de usuários e vendedores.
 *              As rotas recebem requisições POST e chamam os métodos do ControllerUser.
 *
 * Rotas:
 * - POST /cadastro/usuarios: Cria um novo usuário.
 * - POST /cadastro/vendedores: Cria um novo vendedor.
 *
 * Autor: Kairo Chácara
 * Versão: 1.0
 */

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
