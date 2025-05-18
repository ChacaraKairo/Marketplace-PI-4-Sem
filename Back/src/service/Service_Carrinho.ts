/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Serviço responsável pelas operações relacionadas ao carrinho de compras,
 *              incluindo adicionar itens ao carrinho e transformar o carrinho em pedido.
 */

import ServiceCrud from './Service_Crud';
import ServiceUser from './Service_User';
import ServicePedido from './Service_Pedido';
import { Pedido, ItemPedido } from '../interface/Pedido'; // Importa a interface do pedido

class ServiceCarrinho {
  /**
   * Adiciona um item ao carrinho do usuário autenticado.
   * @param data Dados do item a ser adicionado, incluindo a requisição para identificar o usuário.
   * @returns O objeto do carrinho criado.
   * @throws Error Caso o usuário não esteja autenticado ou ocorra erro na criação do carrinho.
   */
  static async addCarrinho(data: any): Promise<any> {
    try {
      const usuario_id = ServiceUser.getUserIdFromRequest(
        data.req,
      );

      if (!usuario_id) {
        throw new Error('Usuário não autenticado.');
      }

      // Criação do carrinho com os dados do usuário
      const carrinho = await ServiceCrud.create(
        'carrinhos',
        {
          ...data,
          usuario_id: usuario_id,
        },
      );

      return carrinho;
    } catch (error: any) {
      console.error(
        'Erro ao adicionar ao carrinho:',
        error.message,
      );
      throw new Error(
        `Erro ao adicionar ao carrinho: ${error.message}`,
      );
    }
  }

  /**
   * Transforma os itens do carrinho em um pedido.
   * @param id ID do usuário para buscar os itens no carrinho.
   * @returns O objeto Pedido criado a partir do carrinho.
   * @throws Error Caso o carrinho não seja encontrado, inválido ou ocorra erro na transformação.
   */
  static async passar_para_pedido(
    id: number,
  ): Promise<Pedido> {
    try {
      // Buscar itens do carrinho pelo ID do usuário
      const carrinho = await ServiceCrud.findByField(
        'carrinhos',
        'usuario_id',
        id,
      );

      if (!carrinho || !Array.isArray(carrinho)) {
        throw new Error(
          'Carrinho não encontrado ou inválido',
        );
      }

      // Montar os itens do pedido com base nos itens do carrinho
      const itens_pedidos: ItemPedido[] = carrinho.map(
        (item: any) => ({
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
          subtotal: item.subtotal,
        }),
      );

      // Calcular valores do pedido
      const subtotal = itens_pedidos.reduce(
        (acc, item) => acc + item.subtotal,
        0,
      );
      const desconto = 10; // Exemplo fixo, pode ser calculado dinamicamente
      const total = subtotal - desconto;

      // Criar o pedido final com dados agregados
      const pedido: Pedido = {
        usuario_id: carrinho[0].usuario_id,
        data_pedido: new Date().toISOString(),
        status: 'pendente',
        total,
        subtotal,
        desconto,
        cupom_id: carrinho[0].cupom_id || null,
        metodo_pagamento: 'cartao', // Exemplo fixo
        itens_pedidos,
      };

      // Deletar os itens do carrinho após criar o pedido
      await Promise.all(
        carrinho.map((item: any) =>
          ServiceCrud.delete('carrinhos', item.id),
        ),
      );

      return pedido;
    } catch (error: any) {
      console.error(
        'Erro ao passar para pedido:',
        error.message,
      );
      throw new Error(
        `Erro ao passar para pedido: ${error.message}`,
      );
    }
  }
}

export default ServiceCarrinho;
