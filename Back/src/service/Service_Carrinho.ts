import ServiceCrud from './Service_Crud';
import ServiceUser from './Service_User';
import ServicePedido from './Service_Pedido';
import { Pedido, ItemPedido } from '../interface/Pedido'; // Importe a interface do pedido corretamente
class ServiceCarrinho {
  static async addCarrinho(data: any): Promise<any> {
    try {
      const usuario_id = ServiceUser.getUserIdFromRequest(
        data.req,
      );

      if (!usuario_id) {
        throw new Error('Usuário não autenticado.');
      }

      // Criação do carrinho
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

  static async passar_para_pedido(
    id: number,
  ): Promise<Pedido> {
    try {
      // Buscar carrinho pelo ID
      const carrinho = await ServiceCrud.findByField(
        'carrinhos',
        'usuario_id',
        id,
      );

      // Verifica se o carrinho existe
      if (!carrinho || !Array.isArray(carrinho)) {
        throw new Error(
          'Carrinho não encontrado ou inválido',
        );
      }

      // Criar os itens do pedido com base no carrinho
      const itens_pedidos: ItemPedido[] = carrinho.map(
        (item: any) => ({
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
          subtotal: item.subtotal,
        }),
      );

      // Calcular o subtotal, desconto e total
      const subtotal = itens_pedidos.reduce(
        (acc, item) => acc + item.subtotal,
        0,
      );
      const desconto = 10; // Exemplo de desconto fixo (pode ser calculado de forma dinâmica)
      const total = subtotal - desconto;

      // Criar o pedido com base nos dados do carrinho
      const pedido: Pedido = {
        usuario_id: carrinho[0].usuario_id, // ID do usuário associado ao carrinho
        data_pedido: new Date().toISOString(), // Data atual no formato ISO 8601
        status: 'pendente', // Status inicial do pedido
        total, // Total do pedido após desconto
        subtotal, // Subtotal dos itens
        desconto, // Desconto aplicado
        cupom_id: carrinho[0].cupom_id || null, // Cupom associado, se houver
        metodo_pagamento: 'cartao', // Método de pagamento (exemplo fixo, pode ser dinâmico)
        itens_pedidos, // Itens do pedido
      };

      // Obter todos os ids do carrinho para a deleção
      const ids_carrinho = carrinho.map(
        (item: any) => item.id,
      );

      // Deletar todos os itens do carrinho de forma assíncrona em paralelo
      await Promise.all(
        carrinho.map((item: any) =>
          ServiceCrud.delete('carrinhos', item.id),
        ),
      );

      // Retorna o pedido criado
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
