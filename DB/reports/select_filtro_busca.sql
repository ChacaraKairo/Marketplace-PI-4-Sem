SELECT *
FROM view_produtos_detalhados
WHERE 
  -- Filtro por termo de busca (ignora se vazio)
  (nome LIKE CONCAT('%', IFNULL(:termo_busca, ''), '%') OR 
  IFNULL(:termo_busca, '') = '')
  
  -- Filtro por categoria (ignora se não selecionado)
  AND (categoria_id = IFNULL(:categoria_id, categoria_id))
  
  -- Faixa de preço (ignora se não definida)
  AND (preco BETWEEN 
    IFNULL(:preco_minimo, 0) AND 
    IFNULL(:preco_maximo, 999999))
  
  -- Avaliação mínima (ignora se não definida)
  AND (media_avaliacoes >= IFNULL(:avaliacao_minima, 0))
  
  -- Apenas com estoque (só aplica se marcado)
  AND (quantidade > 0 OR IFNULL(:apenas_estoque, 0) = 0)
  
  -- Marca/fabricante (ignora se não selecionado)
  AND (marca_id = IFNULL(:marca_id, marca_id))
  
  -- Condição do produto (ignora se não selecionado)
  AND (condicao = IFNULL(:condicao, condicao))
  
  -- Promoções (só aplica se marcado)
  AND (em_promocao = 1 OR IFNULL(:apenas_promocoes, 0) = 0)
ORDER BY
  CASE 
    WHEN :ordenacao = 'preco_asc' THEN preco
    WHEN :ordenacao = 'preco_desc' THEN -preco
    WHEN :ordenacao = 'avaliacao' THEN -media_avaliacoes
    WHEN :ordenacao = 'vendidos' THEN -total_vendido
    ELSE id
  END;