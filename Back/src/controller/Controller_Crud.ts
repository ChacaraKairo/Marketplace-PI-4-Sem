/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Controlador genérico para execução de operações CRUD em qualquer entidade do banco de dados.
 * Cada rota permite interagir com entidades diferentes, utilizando o nome da entidade como parâmetro dinâmico.
 */

import { Request, Response } from 'express';
import ServiceCrud from '../service/Service_Crud';

/**
 * Classe ControllerCrud
 * Responsável por manipular requisições relacionadas a diversas entidades do banco de dados,
 * utilizando um serviço genérico reutilizável.
 */
class ControllerCrud {
  /**
   * Rota para listar todos os nomes de entidades (tabelas) existentes no banco de dados.
   * @param req Requisição HTTP
   * @param res Resposta HTTP
   */
  static async listar_entidades(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result = await ServiceCrud.listar_entidades();
      res.status(200).json(result);
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
   * Rota para buscar todos os registros de uma entidade.
   * @param req Requisição HTTP contendo o nome da entidade em req.params.entity
   * @param res Resposta HTTP com os registros encontrados
   */
  static async findAll(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity } = req.params;

    try {
      const result = await ServiceCrud.findAll(entity);
      res.status(200).json(result);
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
   * Rota para buscar um registro específico por ID em uma entidade.
   * @param req Requisição HTTP contendo o nome da entidade e o ID nos parâmetros
   * @param res Resposta HTTP com o registro encontrado
   */
  static async findById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity, id } = req.params;

    try {
      const result = await ServiceCrud.findById(entity, id);
      res.status(200).json(result);
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
   * Rota para criar um novo registro em uma entidade.
   * @param req Requisição HTTP com os dados no corpo e o nome da entidade nos parâmetros
   * @param res Resposta HTTP com o registro criado
   */
  static async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity } = req.params;
    const data = req.body;

    try {
      const result = await ServiceCrud.create(entity, data);
      res.status(201).json(result);
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
   * Rota para atualizar um registro existente em uma entidade.
   * @param req Requisição HTTP com ID e entidade nos parâmetros e dados atualizados no corpo
   * @param res Resposta HTTP com o registro atualizado
   */
  static async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity, id } = req.params;
    const data = req.body;

    try {
      const result = await ServiceCrud.update(
        entity,
        id,
        data,
      );
      res.status(200).json(result);
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
   * Rota para deletar um registro por ID em uma entidade.
   * @param req Requisição HTTP com o nome da entidade e ID nos parâmetros
   * @param res Resposta HTTP com o resultado da exclusão
   */
  static async delete(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity, id } = req.params;

    try {
      const result = await ServiceCrud.delete(entity, id);
      res.status(200).json(result);
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
   * Rota para buscar registros filtrando por um campo e valor específicos.
   * @param req Requisição HTTP contendo a entidade nos parâmetros e o campo e valor na query string
   * @param res Resposta HTTP com os registros filtrados
   */
  static async findByField(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { entity } = req.params;
    const { field, value } = req.query;

    try {
      const result = await ServiceCrud.findByField(
        entity,
        field as string,
        value,
      );
      res.status(200).json(result);
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
