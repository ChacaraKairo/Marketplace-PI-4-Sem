CREATE VIEW view_carrinho_usuario AS
SELECT 
    c.id AS carrinho_id,
    c.usuario_id,
    c.produto_id,
    p.nome AS produto_nome,
    p.descricao AS produto_descricao,
    p.imagem_url AS produto_imagem,
    c.quantidade,
    c.preco_unitario,
    (c.quantidade * c.preco_unitario) AS subtotal,
    p.quantidade AS estoque_disponivel,
    CASE 
        WHEN p.quantidade >= c.quantidade THEN 'disponivel'
        WHEN p.quantidade > 0 THEN 'estoque_insuficiente'
        ELSE 'indisponivel'
    END AS status_estoque,
    v.nome_fantasia AS vendedor,
    v.usuario_id AS vendedor_id,
    p.categoria_id,
    cat.nome AS categoria_nome,
    c.adicionado_em,
    c.atualizado_em
FROM 
    carrinho c
JOIN 
    produtos p ON c.produto_id = p.id
JOIN 
    vendedores v ON p.vendedor_id = v.usuario_id
LEFT JOIN 
    categorias cat ON p.categoria_id = cat.id
WHERE 
    p.status = 'ativo';