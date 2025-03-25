DELIMITER //

CREATE TRIGGER atualizar_estoque_pedido_pago
AFTER UPDATE ON pedidos
FOR EACH ROW
BEGIN
    -- Só executa quando o status muda para 'pago'
    IF NEW.status = 'pago' AND OLD.status != 'pago' THEN
        UPDATE produtos p
        JOIN itens_pedidos ip ON p.id = ip.produto_id
        SET p.quantidade = p.quantidade - ip.quantidade
        WHERE ip.pedido_id = NEW.id;
    END IF;
END//

DELIMITER ;