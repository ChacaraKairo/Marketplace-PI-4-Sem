import { Request, Response } from 'express';
import ServicePedido from '../service/Service_Pedido';
class PedidoController {
  static async criar_pedido(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        req: req,
      };

      const result = await ServicePedido.criar_pedido(data);
      return res.status(201).json(result);
    } catch (error: any) {
      console.error(
        'Erro no controller ao criar pedido:',
        error.message,
      );
      return res.status(500).json({ error: error.message });
    }
  }

  static async pedido_para_nota_fiscal(
    req: Request,
    res: Response,
  ) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res
          .status(400)
          .json({ error: 'ID inválido' });
      }

      const result =
        await ServicePedido.pedido_para_nota_fiscal(id);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error(
        'Erro no controller ao buscar nota fiscal:',
        error.message,
      );
      return res.status(500).json({ error: error.message });
    }
  }
}

export default PedidoController;
