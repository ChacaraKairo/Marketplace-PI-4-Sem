/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Controlador responsável por gerenciar as operações relacionadas ao carrinho de compras.
 */

import { Request, Response } from 'express';
import ServiceCarrinho from '../service/Service_Carrinho';

/**
 * Classe CarrinhoController
 * Responsável por lidar com as requisições relacionadas ao carrinho de compras,
 * como adicionar itens e converter o carrinho em um pedido.
 */
class CarrinhoController {
  /**
   * Adiciona um novo item ao carrinho de compras.
   * @param req Requisição HTTP contendo os dados do item a ser adicionado.
   * @param res Resposta HTTP com o carrinho atualizado ou erro.
   * @returns Retorna o carrinho atualizado.
   */
  static async addCarrinho(req: Request, res: Response) {
    try {
      const carrinho = await ServiceCarrinho.addCarrinho({
        ...req.body,
        req,
      });
      res.status(201).json(carrinho);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Converte um carrinho existente em um pedido finalizado.
   * @param req Requisição HTTP contendo o ID do carrinho a ser convertido.
   * @param res Resposta HTTP com os dados do pedido gerado ou erro.
   * @returns Retorna o pedido criado a partir do carrinho.
   */
  static async passarParaPedido(
    req: Request,
    res: Response,
  ) {
    try {
      const id = parseInt(req.params.id, 10);
      const pedido =
        await ServiceCarrinho.passar_para_pedido(id);
      res.status(200).json(pedido);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CarrinhoController;
