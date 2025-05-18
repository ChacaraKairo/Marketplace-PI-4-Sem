/**
 * @file Controller_Pedido.ts
 * @description Controller responsável por lidar com as requisições HTTP relacionadas a pedidos.
 *              Inclui criação de pedidos e geração de nota fiscal.
 * @author Kairo Chácara
 * @version 1.0
 */

import { Request, Response } from 'express';
import ServicePedido from '../service/Service_Pedido';

class PedidoController {
  /**
   * @method criar_pedido
   * @description Recebe a requisição para criação de um novo pedido, delega para o ServicePedido,
   *              e retorna a resposta ao cliente.
   * @param req - objeto Request do Express, contendo corpo da requisição e dados do usuário autenticado
   * @param res - objeto Response do Express para enviar resposta HTTP
   */
  static async criar_pedido(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      // Monta o objeto de dados incluindo o próprio req para passagem de dados adicionais (ex: usuário)
      const data = {
        ...req.body,
        req: req,
      };

      // Chama o serviço que processa a criação do pedido
      const result = await ServicePedido.criar_pedido(data);

      // Retorna status 201 (Criado) com os dados do pedido criado
      res.status(201).json(result);
    } catch (error: any) {
      // Log do erro no servidor para diagnóstico
      console.error(
        'Erro no controller ao criar pedido:',
        error.message,
      );

      // Retorna erro 500 para o cliente com mensagem do erro
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method pedido_para_nota_fiscal
   * @description Gera e retorna a nota fiscal para um pedido específico.
   * @param req - objeto Request contendo o parâmetro 'id' do pedido na URL
   * @param res - objeto Response para enviar a resposta HTTP
   */
  static async pedido_para_nota_fiscal(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      // Valida o ID do pedido passado na URL
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      // Chama o serviço para obter a nota fiscal do pedido
      const result =
        await ServicePedido.pedido_para_nota_fiscal(id);

      // Retorna status 200 (OK) com os dados da nota fiscal
      res.status(200).json(result);
    } catch (error: any) {
      console.error(
        'Erro no controller ao buscar nota fiscal:',
        error.message,
      );
      res.status(500).json({ error: error.message });
    }
  }
}

export default PedidoController;
