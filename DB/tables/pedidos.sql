CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('pendente', 'pago', 'cancelado') DEFAULT 'pendente',
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cupom_id) REFERENCES cupons(id) ON DELETE SET NULL
);
