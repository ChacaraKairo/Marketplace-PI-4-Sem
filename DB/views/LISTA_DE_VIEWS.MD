# Documentação das Views do Sistema

## Visão Geral

As views abaixo foram projetadas para otimizar consultas frequentes, garantir consistência nos cálculos e simplificar o desenvolvimento do front-end e back-end.

---

## 1. `vw_produtos_detalhados`

### Descrição

Agrega informações completas de produtos incluindo:

- Média de avaliações
- Tags associadas
- Dados de estoque
- Informações do vendedor

### Benefícios

✅ **Performance**: Elimina múltiplos JOINs em consultas de listagem  
✅ **Consistência**: Centraliza o cálculo de médias de avaliação  
✅ **Facilidade**: Simplifica filtros (categoria, preço, avaliação)

### Tabelas Envolvidas

- `produtos`
- `avaliacoes`
- `produto_tags`
- `tags`
- `vendedores`

---

## 2. `vw_carrinho_usuario`

### Descrição

Exibe itens no carrinho com:

- Subtotal calculado (preço × quantidade)
- Imagem do produto
- Disponibilidade em estoque

### Benefícios

🛒 **Front-end**: Exibição simplificada do carrinho  
💰 **Cálculos**: Subtotal sempre consistente  
🎟️ **Cupons**: Base para aplicação de descontos

### Tabelas Envolvidas

- `carrinho`
- `produtos`

---

## 3. `vw_pedidos_completos`

### Descrição

Mostra pedidos com:

- Itens agrupados em JSON
- Status atual
- Total do pedido
- Dados do cliente

### Benefícios

📦 **Histórico**: Evita consultas aninhadas  
🧾 **NF-e**: Facilita geração de invoices  
🚀 **Performance**: Todos os dados em uma única chamada

### Tabelas Envolvidas

- `pedidos`
- `itens_pedidos`
- `usuarios`

---

## 4. `vw_vendedores_metricas`

### Descrição

KPIs essenciais para vendedores:

- Total de produtos ativos
- Número de vendas
- Média de avaliações

### Benefícios

📊 **Dashboard**: Dados prontos para exibição  
🔍 **Moderação**: Identifica baixo desempenho  
📈 **Otimização**: Base para relatórios gerenciais

### Tabelas Envolvidas

- `vendedores`
- `produtos`
- `pedidos`

---

## 5. `vw_produtos_mais_vendidos`

### Descrição

Ranking de produtos por:

- Quantidade total vendida
- Filtrado por status "pago"

### Benefícios

🏆 **Destaques**: Alimenta seção "Mais Vendidos"  
📌 **Estratégia**: Identifica produtos populares  
🎯 **Promoções**: Base para descontos automáticos

### Tabelas Envolvidas

- `produtos`
- `itens_pedidos`
- `pedidos`

---

## 6. `vw_estoque_critico`

### Descrição

Lista produtos com:

- Estoque abaixo de 5 unidades
- Status "ativo"

### Benefícios

⚠️ **Alertas**: Notifica reposição necessária  
🛑 **Prevenção**: Evita vendas sem estoque  
📧 **Integração**: Pode disparar e-mails automáticos

### Tabelas Envolvidas

- `produtos`

---

## 7. `vw_avaliacoes_produto`

### Descrição

Agrupa:

- Avaliações do produto
- Dados do usuário (nome, foto)
- Notas atribuídas

### Benefícios

⭐ **UX**: Exibição consolidada na página  
🔎 **Filtros**: Facilita busca por avaliações  
⚡ **Performance**: Elimina JOINs repetitivos

### Tabelas Envolvidas

- `avaliacoes`
- `usuarios`

---

## 8. `vw_faturamento_mensal`

### Descrição

Resumo financeiro por mês:

- Total de pedidos
- Receita bruta
- Médias comparativas

### Benefícios

💵 **Financeiro**: Base para relatórios  
📅 **Sazonalidade**: Identifica tendências  
🔗 **Integração**: Compatível com ferramentas de BI

### Tabelas Envolvidas

- `pedidos`
- `itens_pedidos`

---

## Views Opcionais

| View                     | Principal Utilidade                       |
| ------------------------ | ----------------------------------------- |
| `vw_clientes_fieis`      | Marketing personalizado para clientes VIP |
| `vw_produtos_sem_vendas` | Ajuste de catálogo e precificação         |
| `vw_frete_por_regiao`    | Otimização logística baseada em CEP       |
