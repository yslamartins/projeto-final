/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Produto Exemplo"
 *         price:
 *           type: number
 *           format: float
 *           example: 29.99
 *         discount_percentage:
 *           type: number
 *           format: float
 *           example: 10
 *         enabled:
 *           type: boolean
 *           example: true
 *         description:
 *           type: string
 *           example: "Descrição do produto exemplo"
 *         categorie_id:
 *           type: integer
 *           example: 2
 *         stock:
 *           type: integer
 *           example: 100
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-08-18T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-08-18T00:00:00Z"
 * paths:
 *   /products:
 *     post:
 *       summary: Cria um novo produto
 *       description: Adiciona um novo produto ao banco de dados.
 *       requestBody:
 *         description: Dados do novo produto
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         201:
 *           description: Produto criado com sucesso
 *         400:
 *           description: Dados inválidos ou produto já cadastrado
 *     get:
 *       summary: Obtém todos os produtos
 *       description: Retorna uma lista de todos os produtos.
 *       responses:
 *         200:
 *           description: Lista de produtos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *   /products/{id}:
 *     get:
 *       summary: Obtém um produto por ID
 *       description: Retorna detalhes de um produto específico.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Detalhes do produto
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *         404:
 *           description: Produto não encontrado
 *     put:
 *       summary: Atualiza um produto por ID
 *       description: Atualiza as informações de um produto específico.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         description: Dados para atualizar o produto
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         200:
 *           description: Produto atualizado com sucesso
 *         400:
 *           description: Dados inválidos
 *         404:
 *           description: Produto não encontrado
 *     delete:
 *       summary: Deleta um produto por ID
 *       description: Remove um produto do banco de dados.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Produto deletado com sucesso
 *         404:
 *           description: Produto não encontrado
 */

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;