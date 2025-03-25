# Guia de Contribuição

## 🛠️ Padrões de Nomeação

Para manter a consistência no código e evitar incompatibilidades, utilizamos os seguintes padrões:

### 📌 Nomeação de Entidades e Banco de Dados

- **snake_case** para nomes de tabelas e colunas.
- **Plural** para nomes de tabelas no banco de dados.
- **Singular** para entidades do sistema.

**Exemplo:**

```sql
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL
);
```

### 📌 Nomeação de Variáveis e Classes

- **snake_case** para variáveis e atributos.
- **PascalCase** para classes.
- **snake_case** para métodos e funções.

**Exemplo:**

```python
class Produto:
    def __init__(self, nome, preco, quantidade_estoque):
        self.nome = nome
        self.preco = preco
        self.quantidade_estoque = quantidade_estoque

    def calcular_desconto(self, percentual):
        return self.preco * (1 - percentual / 100)
```

### 📌 Nomeação de Rotas e Endpoints (API REST)

- Utilizar substantivos no **plural**.
- Utilizar **snake_case** nas rotas.
- Priorizar verbos HTTP adequados.

**Exemplo:**

```plaintext
GET    /produtos         # Listar produtos
POST   /produtos         # Criar um novo produto
GET    /produtos/{id}    # Obter um produto por ID
PUT    /produtos/{id}    # Atualizar um produto
DELETE /produtos/{id}    # Remover um produto
```

## ⚙️ Padrões de Implementação

### 📌 Repositórios e Serviços

- **Nome de repositórios**: `{entidade}_repository`
- **Nome de serviços**: `{entidade}_service`

**Exemplo:**

```python
class produto_repository:
    def buscar_por_id(self, produto_id):
        pass

class produto_service:
    def calcular_total(self, produtos):
        pass
```

## 🚀 Padronização de Retornos da API

### 📌 Uso de DTOs (Data Transfer Objects)

Para evitar exposição desnecessária de informações, usamos DTOs:

```python
class ProdutoDTO:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco
```

### 📌 Padrão de Respostas

Todas as respostas da API devem seguir um formato padronizado:

```json
{
  "sucesso": true,
  "mensagem": "Operação realizada com sucesso",
  "dados": {}
}
```

## 🛑 Tratamento de Erros

- **400 Bad Request** – Requisição inválida
- **404 Not Found** – Recurso não encontrado
- **500 Internal Server Error** – Erro interno

## 📜 Convenções Gerais

- **Comentarios**: Sempre que necessário, adicione comentarios explicativos.
- **Testes**: Todo novo recurso deve incluir testes adequados.
- **Versionamento**: Utilize commits descritivos e claros.

### 📌 Exemplo de Commit Message

```plaintext
feat: adiciona endpoint para listagem de produtos
fix: corrige erro de conexão no repositório
```

## 📌 Contato e Suporte

Caso tenha dúvidas, entre em contato com o time de desenvolvimento. 🚀
