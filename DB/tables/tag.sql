CREATE TABLE tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE produto_tags (
    produto_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (produto_id, tag_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
