-- Active: 1689009198662@@127.0.0.1@3306

CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

PRAGMA table_info('users');

INSERT INTO users (id, name, email, password, created_at) 
VALUES 
    ('u001', 'Astrodev', 'astrodev@email.com', 'abc123', DATETIME('now')),
    ('u002', 'Joaquina', 'joaquina@email.com', 'joaninha123', DATETIME('now')),
    ('u003', 'Joselito', 'joselito@email.com', 'jose123', DATETIME('now'));

INSERT INTO users (id, name, email, password, created_at)
VALUES
('c004', 'Micaeli', 'micaeli@email.com', 'mica123', DATETIME('now'));

DELETE FROM users
WHERE id = 'c004';

SELECT * FROM users;

DROP TABLE users;




CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products
WHERE name LIKE '%Gamer%';

PRAGMA table_info('products');

INSERT INTO products (id, name, price, description, image_url) 
VALUES 
    ('prod001', 'Monitor', 469.99, 'Monitorzão gamer', 'https://www.kabum.com.br/produto/397845/monitor-gamer-lg-21-5-led-full-hd-75hz-5ms-hdmi-freesync-22mp410-b'),

    ('prod002', 'Placa de Vídeo',  2569.99, 'Placa de Vídeo daora', 'https://www.kabum.com.br/produto/470146/placa-de-video-rtx-4060-xlr8-verto-epic-x-gaming-pny-nvidia-geforce-8gb-gddr6-rgb-dlss-ray-tracing-vcg40608tfxxpb1'),

    ('prod003', 'HD SSD', 599, 'HD SSD para o se pc voar de tão rápido', 'https://www.kabum.com.br/produto/290922/hd-ssd-externo-sandisk-1tb-portatil-sdssde30-1t00-g25-preto'),

    ('prod004', 'Headset Gamer', 249.99, 'Headset pra escutar', 'https://www.kabum.com.br/produto/227818/headset-gamer-redragon-zeus-x-chroma-mk-ii-rgb-surround-7-1-usb-drivers-53mm-preto-vermelho-h510-rgb'),

    ('prod005', 'Cadeira Gamer', 999.99, 'Cadeira pra sentar', 'https://www.kabum.com.br/produto/134179/cadeira-gamer-husky-gaming-tempest-700-branco-com-almofadas-descanso-para-pernas-retratil-reclinavel-hgma077'),

    ('prod006', 'Celular', 4895.55, 'Celular pra entrar no zapzap', 'https://www.kabum...');


DELETE FROM products
WHERE id = 'prod006';

UPDATE products
SET 
name = 'Controle Remoto',
price = 100.00,
description = 'Controle pra abrir',
image_url = 'https://www.kabum...'
WHERE id = 'prod005';

SELECT * FROM products;

DROP TABLE products;



CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO purchases(id, buyer, total_price, created_at)
VALUES 
('pur001', 'c001', 700.59, DATETIME('now')),

('pur002', 'c002', 489.65, DATETIME('now'));


UPDATE purchases
SET total_price = 123.12
WHERE purchases.id = 'purc001';

SELECT
 purchases.id AS idCompra,
 users.id AS idComprador,
 users.name,
 users.email,
 purchases.total_price,
 purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

DROP TABLE purchases;


CREATE TABLE purchases_products(
    products_id TEXT NOT NULL,
    purchases_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (products_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (purchases_id) REFERENCES purchases(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO purchases_products(purchases_id, products_id, quantity)
VALUES 
('pur001', 'prod001', 5),
('pur002', 'prod003', 1),
('pur001', 'prod004', 9);

SELECT 
users.name AS userName,
products.id AS productsId,
purchases.id AS purchasesId,
products.name AS productsName,
quantity,
purchases.total_price AS TotalPrice

FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchases_id = purchases.id

INNER JOIN products
ON purchases_products.products_id = products.id

INNER JOIN users
ON purchases.buyer = users.id;

DROP TABLE purchases_products;