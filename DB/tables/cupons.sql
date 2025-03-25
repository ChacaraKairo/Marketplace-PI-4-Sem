CREATE TABLE IF NOT EXISTS cupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    desconto DECIMAL(5,2) NOT NULL COMMENT 'Valor em porcentagem (ex: 10.00 = 10%)',
    valido_ate DATE NOT NULL COMMENT 'Data de expiração',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);