import { PrismaClient } from '@prisma/client';
import ServiceCrud from './Service_Crud';
import ServiceUser from './Service_User';

class ServicePedido {
  static async criar_pedido(data: any) {
    const id_user =  await ServiceUser.getUserIdFromRequest(data.req);
    if (!id_user) {
      throw new Error('Usuário não autenticado.');
    }
    data.usuarios_id = id_user;
    ServiceCrud.create('pedidos', data.pedido);
    const id_pedido = data.pedido.id;
    ServiceCrud.create('itens_pedidos', data.itens_pedidos);
    return await ;
  }
}
