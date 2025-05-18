/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Define as interfaces utilizadas para representar pedidos, itens de pedido e a estrutura de requisição de criação de pedido no sistema.
 */

/**
 * Interface que representa um item dentro de um pedido.
 */
interface ItemPedido {
  /** ID do produto relacionado ao item */
  produto_id: number;

  /** Quantidade do produto no pedido */
  quantidade: number;

  /** Preço unitário do produto no momento do pedido */
  preco_unitario: number;

  /** Subtotal do item (quantidade × preço_unitário) */
  subtotal: number;
}

/**
 * Interface que representa os dados de um pedido completo.
 */
interface Pedido {
  /** ID do usuário que realizou o pedido */
  usuario_id: string;

  /** Data e hora do pedido (formato ISO 8601) */
  data_pedido: string; // Exemplo: "2025-04-26T15:00:00Z"

  /** Status atual do pedido */
  status: 'pendente' | 'pago' | 'cancelado' | 'processando';

  /** Valor total do pedido (após desconto) */
  total: number;

  /** Valor total dos itens (sem aplicar o desconto) */
  subtotal: number;

  /** Valor do desconto aplicado no pedido */
  desconto: number;

  /** ID do cupom utilizado no pedido (pode ser nulo) */
  cupom_id: number | null;

  /** Método de pagamento escolhido */
  metodo_pagamento: 'cartao' | 'boleto' | 'pix' | 'outro';

  /** Lista de itens incluídos no pedido */
  itens_pedidos: ItemPedido[];
}

/**
 * Interface que representa a estrutura da requisição para criação de pedido,
 * incluindo o ID do usuário extraído do token e os dados do pedido.
 */
interface PedidoRequest {
  req: {
    /** ID do usuário autenticado, proveniente do middleware de autenticação */
    user_id: string;
  };
  /** Dados completos do pedido */
  data: Pedido;
}

export { Pedido, ItemPedido, PedidoRequest };
