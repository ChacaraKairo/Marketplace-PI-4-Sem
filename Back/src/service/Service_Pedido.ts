/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Serviço responsável pelas operações relacionadas a pedidos,
 *              incluindo criação de pedidos e geração de dados para nota fiscal.
 */

import { PrismaClient } from '@prisma/client';
import ServiceCrud from './Service_Crud';
import ServiceUser from './Service_User';
import { getPedidoToSales } from '@prisma/client/sql';

class ServicePedido {
  /**
   * Cria um novo pedido associado ao usuário autenticado.
   * Também cria os itens do pedido relacionados.
   * @param data Objeto contendo os dados do pedido e itens.
   * @returns Um objeto contendo o pedido criado e os itens do pedido.
   * @throws Error Caso o usuário não esteja autenticado ou ocorra erro na criação.
   */
  static async criar_pedido(data: any) {
    try {
      const usuario_id = ServiceUser.getUserIdFromRequest(
        data.req,
      );
      if (!usuario_id) {
        throw new Error('Usuário não autenticado.');
      }

      // Cria o pedido no banco com o ID do usuário
      const pedido = await ServiceCrud.create('pedidos', {
        ...data,
        usuario_id: usuario_id,
      });

      const pedido_id = pedido.usuario_id;

      // Cria os itens relacionados ao pedido
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

  /**
   * Consulta dados do pedido para geração de nota fiscal.
   * Utiliza Prisma Client para executar query raw tipada.
   * @param id ID do pedido a ser consultado.
   * @returns Resultado da consulta com os dados necessários para a nota fiscal.
   * @throws Error Caso ocorra falha na consulta dos dados.
   */
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
