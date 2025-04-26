import { Request, Response } from 'express';
import ServiceCarrinho from '../service/Service_Carrinho';

class CarrinhoController {
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
