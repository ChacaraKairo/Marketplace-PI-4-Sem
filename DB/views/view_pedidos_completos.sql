CREATE VIEW view_pedidos_completos AS
SELECT 
    p.id AS pedido_id,
    p.usuario_id,
    u.nome AS cliente_nome,
    u.email AS cliente_email,
    u.telefone AS cliente_telefone,
    p.data_pedido,
    p.status AS status_pedido,
    p.total,
    p.cupom_id,
    cp.codigo AS cupom_codigo,
    cp.desconto AS cupom_desconto,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'produto_id', ip.produto_id,
                'nome', pr.nome,
                'quantidade', ip.quantidade,
                'preco_unitario', ip.preco_unitario,
                'subtotal', ip.subtotal,
                'imagem_url', pr.imagem_url,
                'vendedor_id', pr.vendedor_id,
                'vendedor_nome', v.nome_fantasia
            )
        )
        FROM itens_pedidos ip
        JOIN produtos pr ON ip.produto_id = pr.id
        JOIN vendedores v ON pr.vendedor_id = v.usuario_id
        WHERE ip.pedido_id = p.id
    ) AS itens,
    (
        SELECT JSON_OBJECT(
            'logradouro', u.endereco,
            'cidade', u.cidade,
            'estado', u.estado,
            'cep', SUBSTRING_INDEX(u.endereco, 'CEP:', -1)
        )
    ) AS endereco_entrega
FROM 
    pedidos p
JOIN 
    usuarios u ON p.usuario_id = u.id
LEFT JOIN 
    cupons cp ON p.cupom_id = cp.id;