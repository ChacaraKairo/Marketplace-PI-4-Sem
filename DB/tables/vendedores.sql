CREATE TABLE vendedores (
    usuario_id VARCHAR(20) PRIMARY KEY,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    razao_social VARCHAR(150) NOT NULL,
    nome_fantasia VARCHAR(150) NULL,
    `site` VARCHAR(255) NULL,
    conta_bancaria VARCHAR(50) NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
