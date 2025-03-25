DELIMITER //

CREATE TRIGGER atualizar_total_pedido_insert_update
AFTER INSERT ON itens_pedidos
FOR EACH ROW
BEGIN
    DECLARE novo_total DECIMAL(10,2);
    
    -- Calcula o novo total somando todos os itens do pedido
    SELECT SUM(subtotal) INTO novo_total
    FROM itens_pedidos
    WHERE pedido_id = NEW.pedido_id;
    
    -- Atualiza o total na tabela pedidos
    UPDATE pedidos
    SET total = novo_total
    WHERE id = NEW.pedido_id;
END//

CREATE TRIGGER atualizar_total_pedido_update
AFTER UPDATE ON itens_pedidos
FOR EACH ROW
BEGIN
    DECLARE novo_total DECIMAL(10,2);
    
    -- Recalcula o total se o subtotal foi alterado
    IF NEW.subtotal <> OLD.subtotal OR NEW.quantidade <> OLD.quantidade THEN
        SELECT SUM(subtotal) INTO novo_total
        FROM itens_pedidos
        WHERE pedido_id = NEW.pedido_id;
        
        UPDATE pedidos
        SET total = novo_total
        WHERE id = NEW.pedido_id;
    END IF;
END//

DELIMITER ;

DELIMITER //

CREATE TRIGGER atualizar_total_pedido_delete
AFTER DELETE ON itens_pedidos
FOR EACH ROW
BEGIN
    DECLARE novo_total DECIMAL(10,2);
    DECLARE itens_restantes INT;
    
    -- Calcula o novo total
    SELECT SUM(subtotal), COUNT(*) INTO novo_total, itens_restantes
    FROM itens_pedidos
    WHERE pedido_id = OLD.pedido_id;
    
    -- Se não houver mais itens, define total como zero
    IF itens_restantes = 0 THEN
        SET novo_total = 0;
    END IF;
    
    -- Atualiza o pedido
    UPDATE pedidos
    SET total = novo_total
    WHERE id = OLD.pedido_id;
END//

DELIMITER ;