CREATE VIEW view_produtos_detalhados AS
SELECT 
    p.id,
    p.nome AS produto_nome,
    p.descricao,
    p.preco,
    p.quantidade AS estoque,
    p.status,
    p.imagem_url,
    p.data_cadastro,
    -- Informações do vendedor
    v.razao_social AS vendedor_razao_social,
    v.nome_fantasia AS vendedor_nome_fantasia,
    u.foto_perfil AS vendedor_foto,
    -- Categoria
    c.nome AS categoria_nome,
    -- Média de avaliações
    ROUND(COALESCE(AVG(a.nota), 0), 1) AS media_avaliacoes,
    COUNT(a.id) AS total_avaliacoes,
    -- Tags agrupadas (MySQL)
    (SELECT GROUP_CONCAT(t.nome SEPARATOR ', ') 
     FROM produto_tags pt 
     JOIN tags t ON pt.tag_id = t.id 
     WHERE pt.produto_id = p.id) AS tags,
    -- Contagem de vendas
    (SELECT SUM(ip.quantidade) 
     FROM itens_pedidos ip 
     JOIN pedidos ped ON ip.pedido_id = ped.id 
     WHERE ip.produto_id = p.id AND ped.status = 'pago') AS total_vendido
FROM 
    produtos p
LEFT JOIN 
    vendedores v ON p.vendedor_id = v.usuario_id
LEFT JOIN 
    usuarios u ON v.usuario_id = u.id
LEFT JOIN 
    categorias c ON p.categoria_id = c.id
LEFT JOIN 
    avaliacoes a ON p.id = a.produto_id
GROUP BY 
    p.id;