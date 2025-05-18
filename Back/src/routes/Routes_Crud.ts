/**
 * @file Routes_Crud.ts
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Define rotas genéricas de CRUD para múltiplas entidades do sistema.
 *              Todas as rotas são protegidas por autenticação.
 */

import { Router } from 'express';
import ContollerCrud from '../controller/Controller_Crud';
import { authMiddleware } from '../middleware/mid_authGeral'; // Middleware que protege as rotas com autenticação JWT

const crudRouter = Router();

/**
 * @route GET /entities
 * @description Lista o nome de todas as entidades disponíveis no CRUD.
 * Middleware:
 *  - authMiddleware: Verifica token JWT.
 * Controlador: ControllerCrud.listar_entidades
 */
crudRouter.get(
  '/entities',
  authMiddleware,
  ContollerCrud.listar_entidades,
);

/**
 * @route GET /entities/:entity
 * @description Lista todos os registros da entidade especificada.
 * Params:
 *  - entity: Nome da entidade (tabela) a ser consultada.
 * Middleware:
 *  - authMiddleware: Verifica token JWT.
 * Controlador: ControllerCrud.findAll
 */
crudRouter.get(
  '/entities/:entity',
  authMiddleware,
  ContollerCrud.findAll,
);

/**
 * @route GET /entities/:entity/:id
 * @description Busca um registro pelo ID na entidade especificada.
 * Params:
 *  - entity: Nome da entidade (tabela)
 *  - id: ID do registro
 * Middleware:
 *  - authMiddleware
 * Controlador: ControllerCrud.findById
 */
crudRouter.get(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.findById,
);

/**
 * @route POST /entities/:entity
 * @description Cria um novo registro na entidade especificada.
 * Params:
 *  - entity: Nome da entidade (tabela)
 * Body:
 *  - Dados a serem inseridos
 * Middleware:
 *  - authMiddleware
 * Controlador: ControllerCrud.create
 */
crudRouter.post(
  '/entities/:entity',
  authMiddleware,
  ContollerCrud.create,
);

/**
 * @route PUT /entities/:entity/:id
 * @description Atualiza um registro da entidade especificada.
 * Params:
 *  - entity: Nome da entidade (tabela)
 *  - id: ID do registro a ser atualizado
 * Body:
 *  - Novos dados para o registro
 * Middleware:
 *  - authMiddleware
 * Controlador: ControllerCrud.update
 */
crudRouter.put(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.update,
);

/**
 * @route DELETE /entities/:entity/:id
 * @description Remove um registro da entidade especificada.
 * Params:
 *  - entity: Nome da entidade
 *  - id: ID do registro
 * Middleware:
 *  - authMiddleware
 * Controlador: ControllerCrud.delete
 */
crudRouter.delete(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.delete,
);

/**
 * @route GET /entities/campo/:entity
 * @description Consulta registros de uma entidade com base em um campo específico.
 * Query params esperados: campo e valor (ex: ?campo=email&valor=teste@dominio.com)
 * Middleware:
 *  - authMiddleware
 * Controlador: ControllerCrud.findByField
 */
crudRouter.get(
  '/entities/campo/:entity',
  authMiddleware,
  ContollerCrud.findByField,
);

// Exporta o roteador para ser usado no roteador principal
export default crudRouter;
