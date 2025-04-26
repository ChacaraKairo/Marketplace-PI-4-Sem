interface ItemPedido {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

interface Pedido {
  usuario_id: string;
  data_pedido: string; // ISO 8601 datetime format, e.g., "2025-04-26T15:00:00Z"
  status: 'pendente' | 'pago' | 'cancelado' | 'processando';
  total: number;
  subtotal: number;
  desconto: number;
  cupom_id: number | null; // cupom_id pode ser nulo
  metodo_pagamento: 'cartao' | 'boleto' | 'pix' | 'outro';
  itens_pedidos: ItemPedido[];
}

interface PedidoRequest {
  req: {
    user_id: string;
  };
  data: Pedido;
}

export { Pedido, ItemPedido, PedidoRequest };
