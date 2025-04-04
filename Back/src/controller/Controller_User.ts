import { Request, Response } from 'express';
import ServiceCrud from '../service/Service_Crud'; // Importe a classe ServiceCrud
import ServiceUser from '../service/Service_User'; // Importe a classe ServiceUser

class ControllerUser {
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
