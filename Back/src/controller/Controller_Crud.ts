import { Request, Response } from 'express';
import ServiceCrud from '../service/Service_Crud'; // Importe a classe ServiceCrud

class ControllerCrud {
  /**
   * Rota para buscar todos os registros de uma entidade
   */
  static async findAll(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity } = req.params; // Obtém o nome da entidade via parâmetro de rota

    try {
      const result = await ServiceCrud.findAll(entity);
      res.status(200).json(result); // Retorna os registros encontrados
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Verifica se o erro é uma instância de Error
        res.status(500).json({ error: error.message });
      } else {
        // Caso o erro não seja uma instância de Error, retornamos uma mensagem genérica
        res
          .status(500)
          .json({ error: 'Erro desconhecido' });
      }
    }
  }

  /**
   * Rota para buscar um registro por ID
   */
  static async findById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity, id } = req.params; // Obtém o nome da entidade e o ID via parâmetros de rota

    try {
      const result = await ServiceCrud.findById(entity, id);
      res.status(200).json(result); // Retorna o registro encontrado
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
   * Rota para criar um novo registro
   */
  static async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity } = req.params; // Obtém o nome da entidade via parâmetro de rota
    const data = req.body; // Obtém os dados do corpo da requisição

    try {
      const result = await ServiceCrud.create(entity, data);
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
   * Rota para atualizar um registro
   */
  static async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity, id } = req.params; // Obtém o nome da entidade e o ID via parâmetros de rota
    const data = req.body; // Obtém os dados do corpo da requisição

    try {
      const result = await ServiceCrud.update(
        entity,
        id,
        data,
      );
      res.status(200).json(result); // Retorna o registro atualizado
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
   * Rota para deletar um registro
   */
  static async delete(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity, id } = req.params; // Obtém o nome da entidade e o ID via parâmetros de rota

    try {
      const result = await ServiceCrud.delete(entity, id);
      res.status(200).json(result); // Retorna o registro deletado
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
   * Rota para buscar registros por campo e valor
   */
  static async findByField(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity } = req.params; // Obtém o nome da entidade via parâmetro de rota
    const { field, value } = req.query; // Obtém o campo e o valor da query string

    try {
      const result = await ServiceCrud.findByField(
        entity,
        field as string,
        value,
      );
      res.status(200).json(result); // Retorna os registros encontrados
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

export default ControllerCrud;
