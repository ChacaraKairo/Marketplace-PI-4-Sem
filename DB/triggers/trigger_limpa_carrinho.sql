DELIMITER //

CREATE TRIGGER limpar_carrinho_apos_pedido
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    DELETE FROM carrinho
    WHERE usuario_id = NEW.usuario_id;
END//

DELIMITER ;