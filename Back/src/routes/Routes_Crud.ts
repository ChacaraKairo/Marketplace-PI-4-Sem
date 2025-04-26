import { Router } from 'express';
import ContollerCrud from '../controller/Controller_Crud';
import { authMiddleware } from '../middleware/mid_authGeral';

const crudRouter = Router();

crudRouter.get(
  '/entities',
  authMiddleware,
  ContollerCrud.listar_entidades,
);
crudRouter.get(
  '/entities/:entity',
  authMiddleware,
  ContollerCrud.findAll,
);
crudRouter.get(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.findById,
);
crudRouter.post(
  '/entities/:entity',
  authMiddleware,
  ContollerCrud.create,
);
crudRouter.put(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.update,
);
crudRouter.delete(
  '/entities/:entity/:id',
  authMiddleware,
  ContollerCrud.delete,
);
crudRouter.get(
  '/entities/campo/:entity',
  authMiddleware,
  ContollerCrud.findByField,
);

export default crudRouter;
