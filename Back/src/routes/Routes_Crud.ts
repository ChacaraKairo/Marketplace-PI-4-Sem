import { Router } from 'express';
import ContollerCrud from '../controller/Controller_Crud';
import ControllerUser from '../controller/Controller_User';
import ControllerAuth from '../controller/Controller_Auth';

const router = Router();
router.get('/entities', ContollerCrud.listar_entidades);

// Rota para buscar todos os registros de uma entidade
router.get('/entities/:entity', ContollerCrud.findAll);

// Rota para buscar um registro por ID
router.get('/entities/:entity/:id', ContollerCrud.findById);

// Rota para criar um novo registro
router.post('/entities/:entity', ContollerCrud.create);

// Rota para atualizar um registro
router.put('/entities/:entity/:id', ContollerCrud.update);

// Rota para deletar um registro
router.delete(
  '/entities/:entity/:id',
  ContollerCrud.delete,
);

// Rota para buscar registros por campo e valor
router.get(
  '/entities/:entity/findByField',
  ContollerCrud.findByField,
);
router.post(
  '/cadastro/usuarios',
  ControllerUser.criar_usuario,
);
router.post(
  '/cadastro/vendedores',
  ControllerUser.criar_vendedor,
);

router.post('/auth/login', ControllerAuth.login);

export default router;
