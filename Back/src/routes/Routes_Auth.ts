import { Router } from 'express';
import ControllerAuth from '../controller/Controller_Auth';

const authRouter = Router();

authRouter.post('/auth/login', ControllerAuth.login);

export default authRouter;
