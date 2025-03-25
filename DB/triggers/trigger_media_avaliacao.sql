DELIMITER //

CREATE TRIGGER atualizar_media_avaliacoes
AFTER INSERT ON avaliacoes
FOR EACH ROW
BEGIN
    DECLARE media_calculada DECIMAL(3,2);
    
    SELECT AVG(nota) INTO media_calculada
    FROM avaliacoes
    WHERE produto_id = NEW.produto_id;
    
    UPDATE produtos
    SET media_avaliacoes = media_calculada
    WHERE id = NEW.produto_id;
END//

DELIMITER ;