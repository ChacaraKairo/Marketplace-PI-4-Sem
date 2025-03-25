DELIMITER //

CREATE TRIGGER validar_estoque_carrinho
BEFORE INSERT ON carrinho
FOR EACH ROW
BEGIN
    DECLARE estoque_atual INT;
    
    SELECT quantidade INTO estoque_atual
    FROM produtos
    WHERE id = NEW.produto_id;
    
    IF estoque_atual < NEW.quantidade THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ERROR: Estoque insuficiente';
    END IF;
END//

DELIMITER ;