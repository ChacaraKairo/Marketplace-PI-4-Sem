/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Controlador responsável por lidar com as requisições relacionadas aos usuários e vendedores. Ele atua como intermediário entre as rotas HTTP e os serviços (camada de negócio).
 */

import { Request, Response } from 'express';
import ServiceCrud from '../service/Service_Crud'; // Serviço genérico de operações CRUD
import ServiceUser from '../service/Service_User'; // Serviço específico de operações de usuário

/**
 * Classe ControllerUser
 * Responsável por lidar com requisições HTTP referentes a usuários e vendedores.
 */
class ControllerUser {
  /**
   * Cria um novo usuário no sistema.
   * @param req Objeto da requisição HTTP contendo os dados do usuário no corpo.
   * @param res Objeto da resposta HTTP para retornar o resultado da operação.
   */
  static async criar_usuario(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const data = req.body;
      const result = await ServiceUser.criar_usuario(data);
      res.status(201).json(result); // Retorna o registro criado
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: 'Erro desconhecido' });
      }
    }
  }

  /**
   * Cria um novo vendedor no sistema.
   * @param req Objeto da requisição HTTP contendo os dados do vendedor no corpo.
   * @param res Objeto da resposta HTTP para retornar o resultado da operação.
   */
  static async criar_vendedor(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const data = req.body;
      const result = await ServiceUser.criar_vendedor(data);
      res.status(201).json(result); // Retorna o registro criado
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: 'Erro desconhecido' });
      }
    }
  }
}

export default ControllerUser;
