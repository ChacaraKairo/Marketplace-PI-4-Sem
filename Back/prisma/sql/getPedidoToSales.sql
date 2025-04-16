SELECT 
    -- Dados do Pedido
    p.id AS pedido_id,
    p.data_pedido,
    p.subtotal,
    p.desconto,
    p.total,
    p.status,
    p.metodo_pagamento,
    c.codigo AS cupom_codigo,
    c.desconto AS desconto_cupom,
    
    -- Dados do Cliente
    u.id AS cliente_id,
    u.nome AS cliente_nome,
    u.email AS cliente_email,
    u.telefone,
    u.cpf_cnpj,
    u.endereco,
    u.cidade,
    u.estado,
    u.pais,
    
    -- Dados dos Itens do Pedido
    ip.produto_id,
    prod.nome AS produto_nome,
    prod.descricao AS produto_descricao,
    ip.quantidade,
    ip.preco_unitario,
    ip.subtotal AS subtotal_item

FROM pedidos p
JOIN usuarios u ON p.usuario_id = u.id
LEFT JOIN cupons c ON p.cupom_id = c.id
JOIN itens_pedidos ip ON p.id = ip.pedido_id
JOIN produtos prod ON ip.produto_id = prod.id

WHERE p.id = ?;
