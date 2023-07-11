-- Active: 1689009198662@@127.0.0.1@3306

CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

PRAGMA table_info('users');

INSERT INTO users (id, name, email, password, created_at) 
VALUES 
    ('c001', 'Astrodev', 'astrodev@email.com', 'abc123', DATETIME('now')),
    ('c002', 'Joaquina', 'joaquina@email.com', 'joaninha123', DATETIME('now')),
    ('c003', 'Joselito', 'joselito@email.com', 'jose123', DATETIME('now'));


DROP TABLE users;



CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

PRAGMA table_info('products');

INSERT INTO products (id, name, price, description, image_url) 
VALUES 
    ('prod001', 'Monitor', 469.99, 'Monitorzão gamer', 'https://www.kabum.com.br/produto/397845/monitor-gamer-lg-21-5-led-full-hd-75hz-5ms-hdmi-freesync-22mp410-b'),

    ('prod002', 'Placa de Vídeo',  2569.99, 'Placa de Vídeo daora', 'https://www.kabum.com.br/produto/470146/placa-de-video-rtx-4060-xlr8-verto-epic-x-gaming-pny-nvidia-geforce-8gb-gddr6-rgb-dlss-ray-tracing-vcg40608tfxxpb1'),

    ('prod003', 'HD SSD', 599, 'HD SSD para o se pc voar de tão rápido', 'https://www.kabum.com.br/produto/290922/hd-ssd-externo-sandisk-1tb-portatil-sdssde30-1t00-g25-preto'),

    ('prod004', 'Headset Gamer', 249.99, 'Headset pra escutar', 'https://www.kabum.com.br/produto/227818/headset-gamer-redragon-zeus-x-chroma-mk-ii-rgb-surround-7-1-usb-drivers-53mm-preto-vermelho-h510-rgb'),

    ('prod005', 'Cadeira Gamer', 999.99, 'Cadeira pra sentar', 'https://www.kabum.com.br/produto/134179/cadeira-gamer-husky-gaming-tempest-700-branco-com-almofadas-descanso-para-pernas-retratil-reclinavel-hgma077');

DROP TABLE products;