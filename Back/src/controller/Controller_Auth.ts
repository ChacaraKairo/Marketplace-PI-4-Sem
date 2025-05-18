/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Controlador responsável pela autenticação de usuários, realizando login e retorno de token.
 */

import ServiceAuth from '../service/Service_Auth';

/**
 * Classe ControllerAuth
 * Responsável por tratar as requisições relacionadas à autenticação de usuários.
 */
class ControllerAuth {
  /**
   * Realiza o login do usuário com base nos dados enviados no corpo da requisição.
   * @param req Objeto da requisição contendo os dados de login (e.g. email e senha).
   * @param res Objeto de resposta utilizado para retornar o status e dados ao cliente.
   * @returns Retorna um token JWT caso as credenciais estejam corretas.
   */
  static async login(req: any, res: any) {
    try {
      const data = req.body;
      const token = await ServiceAuth.login(data);
      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao fazer login', error);
      // Retorna erro genérico para não expor detalhes da falha
      res
        .status(500)
        .json({ error: 'Usuário ou senha incorretos' });
    }
  }
}

export default ControllerAuth;
