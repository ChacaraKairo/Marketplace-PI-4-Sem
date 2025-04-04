# 📘 Guia de Contribuição

Este guia define padrões e boas práticas para manter a consistência e qualidade do código no projeto.

---

## 🛠️ Padrões de Nomeação

### 📌 Entidades e Banco de Dados

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

### 📌 Variáveis e Classes

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

### 📌 Rotas e Endpoints (API REST)

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

---

## ⚙️ Padrões de Implementação

### 📌 Repositórios e Serviços

- **Repositórios**: `{entidade}_repository`
- **Serviços**: `{entidade}_service`

**Exemplo:**

```python
class ProdutoRepository:
    def buscar_por_id(self, produto_id):
        pass

class ProdutoService:
    def calcular_total(self, produtos):
        pass
```

---

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

---

## 🛑 Tratamento de Erros

- **400 Bad Request** – Requisição inválida
- **404 Not Found** – Recurso não encontrado
- **500 Internal Server Error** – Erro interno

---

## 📜 Convenções Gerais

- **Comentários**: Sempre que necessário, adicione explicações.
- **Testes**: Todo novo recurso deve incluir testes adequados.
- **Versionamento**: Utilize commits descritivos e claros.

### 📌 Exemplo de Commit Message

```plaintext
feat: adiciona endpoint para listagem de produtos
fix: corrige erro de conexão no repositório
```

---

## 📌 Contato e Suporte

Caso tenha dúvidas, entre em contato com o time de desenvolvimento. 🚀

---

# 📖 Padronização de Documentação de Código

## 1. Introdução

Este documento define um padrão para a documentação de código dentro do projeto, garantindo consistência, clareza e facilidade de manutenção.

## 2. Diretrizes Gerais

- Todos os arquivos devem iniciar com um bloco de cabeçalho contendo informações do autor, versão e data.
- O formato padrão para a documentação será baseado em Javadoc para Java.
- Funções, classes e variáveis importantes devem conter descrição e informações sobre seus parâmetros e retorno.
- Comentários inline devem ser utilizados apenas quando necessários para explicar trechos complexos de código.

## 3. Estrutura de Documentação

### 3.1. Cabeçalho do Arquivo

Todo arquivo deve conter um cabeçalho no seguinte formato:

```java
/**
 * @author Nome do Autor
 * @version 1.0
 * @date DD/MM/AAAA
 * @description Breve descrição do propósito do arquivo.
 */
```

### 3.2. Documentação de Métodos

Todo método relevante deve ser documentado com a seguinte estrutura:

```java
/**
 * Breve descrição do método.
 * @param nomeDoParametro Descrição do parâmetro.
 * @return Descrição do retorno do método.
 * @throws TipoDeExcecao Descrição da exceção lançada.
 */
public int exemplo(String param) {
    // Implementação
}
```

### 3.3. Documentação de Classes

```java
/**
 * Descrição da classe.
 */
public class NomeDaClasse {
    /**
     * Construtor da classe.
     * @param param Descrição do parâmetro.
     */
    public NomeDaClasse(String param) {
        // Implementação
    }
}
```

### 3.4. Comentários Inline

Para trechos de código específicos, usar `//` para explicar funcionalidades complexas.

```java
// Conecta ao banco de dados e verifica conexão
connection.connect();
```

---

## 4. Convenções de Nomeação

- **Variáveis e Métodos:** snake_case (`minha_variavel`)
- **Classes e Interfaces:** PascalCase (`MinhaClasse`)
- **Constantes:** UPPER_CASE (`MINHA_CONSTANTE`)

---

## 5. Exemplo de Implementação

```java
/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 25/03/2025
 * @description Classe principal do sistema.
 */
public class Main {

    /**
     * Testa a conexão com o banco de dados.
     * @throws Exception Se a conexão falhar.
     */
    public static void testDatabaseConnection() throws Exception {
        try {
            System.out.println("Conectado ao banco");
        } catch (Exception e) {
            System.err.println("Erro ao conectar:" + e.getMessage());
        }
    }

    public static void main(String[] args) {
        try {
            testDatabaseConnection();
            System.out.println("Sistema iniciado");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

## 6. Conclusão

Seguir este padrão garante que o código seja compreensível, de fácil manutenção e colaboração eficiente entre os desenvolvedores.
