CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id VARCHAR(20) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('pendente', 'pago', 'cancelado', 'processando') DEFAULT 'pendente',
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    subtotal DECIMAL(10,2) NOT NULL COMMENT 'Valor antes de descontos',
    desconto DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Valor total de descontos aplicados',
    cupom_id INT NULL COMMENT 'Cupom aplicado no pedido',
    metodo_pagamento ENUM('cartao', 'boleto', 'pix', 'outro') DEFAULT 'cartao',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cupom_id) REFERENCES cupons(id) ON DELETE SET NULL
);