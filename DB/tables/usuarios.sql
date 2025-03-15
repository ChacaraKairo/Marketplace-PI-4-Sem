CREATE TABLE usuarios (
    id VARCHAR(20) AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NULL,
    cpf_cnpj VARCHAR(20) NULL UNIQUE,
    data_nascimento DATE NULL,
    endereco VARCHAR(255) NULL,
    cidade VARCHAR(100) NULL,
    estado VARCHAR(50) NULL,
    pais VARCHAR(50) NULL DEFAULT 'Brasil',
    foto_perfil VARCHAR(255) NULL,
    tipo ENUM('comprador', 'vendedor') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
