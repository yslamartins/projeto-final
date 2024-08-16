-- Define o timezone para o horário de Brasília (BRT)
SET timezone = 'America/Sao_Paulo';

-- Criação da tabela de Categorias
CREATE TABLE categories (
    id SERIAL PRIMARY KEY, -- ID auto-incrementado
    name VARCHAR(255) NOT NULL UNIQUE, -- Nome do produto
	enabled BOOLEAN DEFAULT FALSE,     -- Habilitado ou desabilitado (0)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de atualização
);

-- Criação da tabela de Produtos
CREATE TABLE products (
    id SERIAL PRIMARY KEY, -- ID auto-incrementado
    name VARCHAR(255) NOT NULL UNIQUE, -- Nome do produto
	price FLOAT NOT NULL, -- Desconto
	discount_percentage FLOAT DEFAULT 0, -- Porcetagem do desconto
	enabled BOOLEAN DEFAULT FALSE,     -- Habilitado ou desabilitado (0)
	description VARCHAR(255), -- Descrição produto
	categorie_id INT, -- Vem de Categories
	stock INTEGER DEFAULT 0, -- Estoque do produto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de atualização
	FOREIGN KEY(categorie_id) REFERENCES categories(id) -- Chave estrangeira
);
-- Criação da tabela de Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- ID auto-incrementado
    firstname VARCHAR(255) NOT NULL, -- Primeiro nome do usuário
    surname VARCHAR(255) NOT NULL, -- Sobrenome do usuário
    email VARCHAR(255) NOT NULL UNIQUE, -- Endereço de email do usuário
    password VARCHAR(255) NOT NULL, -- Senha do usuário
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de atualização
);
CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    content VARCHAR(255),
    enabled BOOLEAN DEFAULT FALSE
);
