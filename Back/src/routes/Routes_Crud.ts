/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 07/04/2025
 * @description Arquivo de definição das rotas principais da API, incluindo operações genéricas (CRUD), autenticação, cadastro de usuários e operações relacionadas a pedidos.
 */

import { Router } from 'express';
import ContollerCrud from '../controller/Controller_Crud';
import ControllerUser from '../controller/Controller_User';
import ControllerAuth from '../controller/Controller_Auth';
import PedidoController from '../controller/Controller_Pedido';
import {
  authMiddleware,
  compradorMiddleware,
  vendedorMiddleware,
} from '../middleware/mid_authGeral';

const router = Router();

/**
 * Rota para listar todas as entidades disponíveis no sistema.
 */
router.get(
  '/entities',
  authMiddleware,
  ContollerCrud.listar_entidades,
);

/**
 * Rota para buscar todos os registros de uma entidade.
 * @param entity Nome da entidade.
 */
router.get(
  '/entities/:entity',
  authMiddleware,
  ContollerCrud.findAll,
);

/**
 * Rota para buscar um registro específico por ID.
 * @param entity Nome da entidade.
 * @param id Identificador do registro.
 */
router.get(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.findById,
);

/**
 * Rota para criar um novo registro em uma entidade.
 * @param entity Nome da entidade.
 */
router.post(
  '/entities/:entity',
  authMiddleware,
  ContollerCrud.create,
);

/**
 * Rota para atualizar um registro existente de uma entidade.
 * @param entity Nome da entidade.
 * @param id Identificador do registro.
 */
router.put(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.update,
);

/**
 * Rota para deletar um registro de uma entidade.
 * @param entity Nome da entidade.
 * @param id Identificador do registro.
 */
router.delete(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.delete,
);

/**
 * Rota para buscar registros com base em um campo e valor específico.
 * @param entity Nome da entidade.
 * @param field Campo a ser filtrado.
 * @param value Valor do campo.
 */
router.get(
  '/entities/:entity/findByField',
  authMiddleware,
  ContollerCrud.findByField,
);

/**
 * Rota para cadastrar um novo usuário comum (comprador).
 */
router.post(
  '/cadastro/usuarios',
  ControllerUser.criar_usuario,
);

/**
 * Rota para cadastrar um novo vendedor.
 */
router.post(
  '/cadastro/vendedores',
  ControllerUser.criar_vendedor,
);

/**
 * Rota para criar um novo pedido de compra (restrita a compradores).
 */
router.post(
  '/compra/pedido',
  authMiddleware,
  compradorMiddleware,
  PedidoController.criar_pedido,
);

/**
 * Rota para gerar a nota fiscal de um pedido (restrita a vendedores).
 * @param id ID do pedido.
 */
router.get(
  '/gestao/vendedor/pedidos/:id/nota-fiscal',
  authMiddleware,
  vendedorMiddleware,
  PedidoController.pedido_para_nota_fiscal,
);

/**
 * Rota de login do sistema.
 */
router.post('/auth/login', ControllerAuth.login);

export default router;
