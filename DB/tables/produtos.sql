CREATE TABLE produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vendedor_id BIGINT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
    quantidade INT NOT NULL CHECK (quantidade >= 0),
    categoria_id BIGINT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('ativo', 'inativo') DEFAULT 'ativo',
    imagem_url TEXT,
    FOREIGN KEY (vendedor_id) REFERENCES vendedores(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);
