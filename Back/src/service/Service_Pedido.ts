import { PrismaClient } from '@prisma/client';
import ServiceCrud from './Service_Crud';
import ServiceUser from './Service_User';
import { getPedidoToSales } from '@prisma/client/sql';

class ServicePedido {
  static async criar_pedido(data: any) {
    try {
      const usuario_id = ServiceUser.getUserIdFromRequest(
        data.req,
      );
      if (!usuario_id) {
        throw new Error('Usuário não autenticado.');
      }

      const pedido = await ServiceCrud.create('pedidos', {
        ...data,
        usuario_id: usuario_id,
      });
      const pedido_id = pedido.usuario_id;
      const itens_pedido = await ServiceCrud.create(
        'itens_pedidos',
        {
          pedido_id: pedido_id,
          ...data,
        },
      );
      return {
        pedido,
        itens_pedido,
      };
    } catch (error: any) {
      console.error('Erro ao criar pedido:', error.message);
      throw new Error(
        `Erro ao criar pedido: ${error.message}`,
      );
    }
  }
  static async pedido_para_nota_fiscal(id: number) {
    const prisma = new PrismaClient();
    try {
      const result = await prisma.$queryRawTyped(
        getPedidoToSales(id),
      );
      return result;
    } catch (error: any) {
      console.error(
        'Erro ao buscar dados da nota fiscal:',
        error.message,
      );
      throw new Error(
        `Erro ao buscar dados da nota fiscal: ${error.message}`,
      );
    }
  }
}
export default ServicePedido;
