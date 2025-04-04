import { PrismaClient } from '@prisma/client';
import ServiceCrud from './Service_Crud';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { Request } from 'express';

class ServiceUser {
  prisma = new PrismaClient();
  static async criar_usuario(data: any) {
    const senhaCriptografada = await bcrypt.hash(
      data.senha,
      10,
    );
    data = {
      ...data,
      id: nanoid(20),
      senha: senhaCriptografada,
    };
    return await ServiceCrud.create('usuarios', data);
  }
  // Cria o usuário e obtém os dados com ID gerado
  static async criar_vendedor(data: any) {
    // 1. Cria o usuário
    const usuarioCriado = await ServiceUser.criar_usuario(
      data.usuarios,
    );

    // 2. Prepara e cria o vendedor
    const vendedorData = {
      ...data.vendedores,
      usuario_id: usuarioCriado.id,
    };
    const vendedorCriado = await ServiceCrud.create(
      'vendedores',
      vendedorData,
    );

    // 3. Retorna os dados relevantes
    const new_sales = {
      id: vendedorCriado.id,
      nome: vendedorCriado.nome,
      cpf: vendedorCriado.cpf,
      ...vendedorCriado,
    };

    return new_sales;
  }
  static getUserIdFromRequest(req: Request): string | null {
    const user = (req as any).user;
    return user?.id || null;
  }
}
export default ServiceUser;
