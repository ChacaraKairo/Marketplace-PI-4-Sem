📌 Estrutura Inicial do Banco de Dados

1️⃣ Tabelas Principais
usuarios (id, nome, email, senha, tipo_usuario)

Pode ser comprador ou vendedor.
produtos (id, nome, descricao, preco, quantidade_estoque, categoria_id, vendedor_id)

Relacionamento com categorias.
Relacionamento com usuarios (vendedor).
categorias (id, nome, descricao)

Relacionado a produtos.
pedidos (id, usuario_id, data_pedido, status, total)

Relacionado a usuarios.
itens_pedido (id, pedido_id, produto_id, quantidade, preco_unitario, subtotal)

Relacionado a pedidos e produtos.
pagamentos (id, pedido_id, metodo_pagamento, status, valor_pago)

Relacionado a pedidos.
avaliacoes (id, produto_id, usuario_id, nota, comentario, data_avaliacao)

Relacionado a produtos e usuarios.
2️⃣ Relacionamentos no DER/MER
1 usuário pode ser vendedor e/ou comprador.
1 vendedor pode vender vários produtos.
1 pedido pode ter vários itens.
1 produto pode estar em apenas 1 categoria.
1 pedido pode ter apenas 1 pagamento.
1 usuário pode avaliar vários produtos.