/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 07/04/2025
 * @description Serviço responsável por gerenciar operações relacionadas aos usuários e vendedores, incluindo criação com hash de senha e associação entre usuário e vendedor.
 */

import { PrismaClient } from '@prisma/client';
import ServiceCrud from './Service_Crud';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { Request } from 'express';

/**
 * Classe responsável por operações relacionadas aos usuários e vendedores.
 */
class ServiceUser {
  prisma = new PrismaClient();

  /**
   * Cria um novo usuário no banco de dados com senha criptografada.
   * @param data Dados do usuário a ser criado. Deve conter o campo 'senha'.
   * @returns Retorna o objeto do usuário criado.
   * @throws Error Se houver falha na criação ou criptografia da senha.
   */
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

  /**
   * Cria um novo vendedor e seu respectivo usuário.
   * @param data Objeto contendo os dados do usuário (em `data.usuarios`) e do vendedor (em `data.vendedores`).
   * @returns Retorna os dados do vendedor criado.
   * @throws Error Se houver falha na criação do usuário ou vendedor.
   */
  static async criar_vendedor(data: any) {
    // Cria o usuário e obtém os dados com ID gerado
    const usuarioCriado = await ServiceUser.criar_usuario(
      data.usuarios,
    );

    // Prepara e cria o vendedor com o ID do usuário associado
    const vendedorData = {
      ...data.vendedores,
      usuario_id: usuarioCriado.id,
    };

    const vendedorCriado = await ServiceCrud.create(
      'vendedores',
      vendedorData,
    );

    // Retorna os dados relevantes do vendedor
    const new_sales = {
      id: vendedorCriado.id,
      nome: vendedorCriado.nome,
      cpf: vendedorCriado.cpf,
      ...vendedorCriado,
    };

    return new_sales;
  }

  /**
   * Obtém o ID do usuário autenticado a partir da requisição.
   * @param req Objeto da requisição do Express.
   * @returns Retorna o ID do usuário ou null se não houver.
   */
  static getUserIdFromRequest(req: Request): string | null {
    const user = (req as any).user;
    return user?.id || null;
  }
}

export default ServiceUser;
