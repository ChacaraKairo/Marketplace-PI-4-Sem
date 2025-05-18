/**
 * @file Routes_Auth.ts
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Define as rotas de autenticação da aplicação, como login de usuários e vendedores.
 */

import { Router } from 'express';
import ControllerAuth from '../controller/Controller_Auth'; // Importa o controller responsável pelas regras de autenticação

// Criação do roteador para rotas de autenticação
const authRouter = Router();

/**
 * @route POST /auth/login
 * @description Rota para autenticação de usuários (login).
 * Espera no corpo da requisição as credenciais (ex: email e senha).
 * Retorna um token JWT em caso de sucesso.
 * Controlador: ControllerAuth.login
 */
authRouter.post('/auth/login', ControllerAuth.login);

// Exporta o roteador para ser usado no roteador principal
export default authRouter;
