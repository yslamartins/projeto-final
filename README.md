# Tech Products E-commerce APIREST

Este repositório contém a API para um e-commerce voltado para a venda de produtos de tecnologia. A API foi desenvolvida utilizando Node.js, Express, e PostgreSQL.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação e Configuração](#instalação-e-configuração)
  - [Configurar o arquivo `.env`](#configurar-o-arquivo-env)
  - [Configurar a Conexão (Opcional)](#configurar-a-conexão-opcional)
  - [Rodar a aplicação](#rodar-a-aplicação)
  - [Solução de Problemas](#solução-de-problemas)
- [Rotas e Documentação](#rotas-e-documentação)
- [Colaboradores](#colaboradores)

## Visão Geral

A API permite a gestão de usuários, categorias e produtos voltados para um e-commerce de tecnologia. Suporta operações de CRUD (criação, leitura, atualização e exclusão) e conta com autenticação JWT, validação de dados e documentação via Swagger.

## Tecnologias Utilizadas

- _Node.js_: Ambiente de execução para JavaScript no lado do servidor.
- _Express_: Framework web para Node.js.
- _PostgreSQL_: Banco de dados relacional.
- _Swagger_: Ferramenta para documentação da API.
- _JWT (JSON Web Tokens)_: Utilizado para autenticação e segurança.
- _Tembo.io_: Armazenamento em nuvem do banco de dados.
- _bcrypt_: Utilizado para a criptografia de senhas.
- _Nodemon_: Utilizado para rodar aplicação em ambiente de desenvolvimento.

## Funcionalidades

- Cadastro, autenticação e gerenciamento de usuários com senhas criptografadas usando bcrypt.
- Gestão de categorias de produtos.
- CRUD completo para produtos tecnológicos.
- Documentação automática das rotas via Swagger.

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências e inicie o projeto em modo de desenvolvedor:

   ```bash
   npm install
   npm run dev
   ```

### Configurar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```plaintext
URL_DB=your_database_url
SECRET_KEY=your_secret_key
```

- `URL_DB`: A URL de conexão completa para o banco de dados PostgreSQL.
- `SECRET_KEY`: Uma chave secreta para uso no projeto (pode ser utilizada para tokens, criptografia, etc.).

**Exemplo de URL_DB**:

```plaintext
URL_DB=postgres://usuario:senha@host:porta/nome_do_banco
```

### Configurar a Conexão (Opcional)

Se preferir configurar a conexão usando parâmetros separados em vez de uma URL, modifique o arquivo `connection.js` para algo assim:

```javascript
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
});

module.exports = connection;
```

Neste caso, seu arquivo `.env` deve conter:

```plaintext
DB_USER=your_database_user
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=your_database_port
```

### Rodar a aplicação

Após configurar o arquivo `.env`, você pode rodar a aplicação com o comando:

```bash
npm run dev
```

Isso iniciará o servidor Node.js e conectará ao banco de dados PostgreSQL usando as credenciais fornecidas.

### Solução de Problemas

- **Erro de Conexão**: Certifique-se de que as variáveis no arquivo `.env` estão corretas e que o PostgreSQL está rodando.
- **SSL**: Se enfrentar problemas relacionados ao SSL, você pode desativar o SSL (não recomendado em produção) alterando `ssl: true` para `ssl: false` no `connection.js`.

## Rotas e Documentação

Para acessar o Swagger da aplicação, basta ir para a rota:

```url
localhost:3000/api-docs
```

## Colaboradores

- Agleice Souza - [Github](https://github.com/agleicesousa) | [LinkedIn](https://www.linkedin.com/in/agleice-faria-de-sousa-47a6722a2/)
- Emmanuel Cordeiro - [Github](https://github.com/manuzx) | [LinkedIn](https://www.linkedin.com/in/emmanuel-cordeiro-653a132a7)
- Ezequias de Oliveira - [Github](https://github.com/Ez3qu14s) | [LinkedIn](https://www.linkedin.com/in/ezequias-de-oliveira-bernardo-2b216420b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app&original_referer=https%3A%2F%2Fgithub.com%2FEz3qu14s%2FDigital-Store%3Ftab%3Dreadme-ov-file)
- Ysla Martins - [Github](https://github.com/yslamartins) | [LinkedIn](https://www.linkedin.com/in/ysla-martins-dev)