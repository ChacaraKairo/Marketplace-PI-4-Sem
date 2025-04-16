import { Request, Response } from 'express';
import ServicePedido from '../service/Service_Pedido';

class PedidoController {
  static async criar_pedido(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const data = {
        ...req.body,
        req: req,
      };

      const result = await ServicePedido.criar_pedido(data);
      res.status(201).json(result); // ✅ sem return
    } catch (error: any) {
      console.error(
        'Erro no controller ao criar pedido:',
        error.message,
      );
      res.status(500).json({ error: error.message }); // ✅ sem return
    }
  }

  static async pedido_para_nota_fiscal(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const result =
        await ServicePedido.pedido_para_nota_fiscal(id);
      res.status(200).json(result); // ✅ sem return
    } catch (error: any) {
      console.error(
        'Erro no controller ao buscar nota fiscal:',
        error.message,
      );
      res.status(500).json({ error: error.message }); // ✅ sem return
    }
  }
}

export default PedidoController;
