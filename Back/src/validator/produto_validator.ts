import validator from 'validator';

// Definindo a interface para o tipo dos dados do produto
interface ProdutoData {
  nome: string;
  preco: number;
  quantidade: number;
  categoria_id?: number;
  descricao?: string;
  imagem_url?: string;
}

const validateProduto = (produtoData: ProdutoData) => {
  const errors: string[] = [];

  // Nome do produto - deve ser uma string não vazia
  if (
    !produtoData.nome ||
    validator.isEmpty(produtoData.nome)
  ) {
    errors.push('O nome do produto é obrigatório');
  }

  // Preço - deve ser um número positivo com duas casas decimais
  if (
    !produtoData.preco ||
    !validator.isDecimal(produtoData.preco.toString(), {
      decimal_digits: '2',
    })
  ) {
    errors.push(
      'O preço do produto deve ser um número positivo com duas casas decimais',
    );
  }

  // Quantidade - deve ser um número inteiro positivo
  if (
    !produtoData.quantidade ||
    !validator.isInt(produtoData.quantidade.toString(), {
      min: 1,
    })
  ) {
    errors.push(
      'A quantidade do produto deve ser um número inteiro positivo',
    );
  }

  // Categoria - deve ser um número válido de categoria
  if (
    produtoData.categoria_id &&
    !validator.isInt(produtoData.categoria_id.toString(), {
      min: 1,
    })
  ) {
    errors.push(
      'O ID da categoria deve ser um número válido',
    );
  }

  // Descrição (opcional) - não deve ser vazia se fornecida
  if (
    produtoData.descricao &&
    validator.isEmpty(produtoData.descricao)
  ) {
    errors.push('A descrição não pode ser vazia');
  }

  // Imagem URL (opcional) - deve ser uma URL válida
  if (
    produtoData.imagem_url &&
    !validator.isURL(produtoData.imagem_url)
  ) {
    errors.push('A URL da imagem não é válida');
  }

  return errors;
};

export { validateProduto };
