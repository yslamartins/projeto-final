/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do produto
 *           example: "Camiseta de Algodão"
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *           example: 29.99
 *         discount_percentage:
 *           type: number
 *           format: float
 *           description: Porcentagem de desconto do produto
 *           example: 10.5
 *         description:
 *           type: string
 *           description: Descrição do produto
 *           example: "Camiseta de algodão 100% com estampa exclusiva."
 *         stock:
 *           type: integer
 *           description: Quantidade em estoque do produto
 *           example: 150
 *         category_name:
 *           type: string
 *           description: Nome da categoria associada ao produto
 *           example: "Roupas"
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductImage'
 *           description: Lista de imagens associadas ao produto
 *           example:
 *             - content: "https://example.com/image1.jpg"
 *               enabled: true
 *             - content: "https://example.com/image2.jpg"
 *               enabled: false
 *         enabled:
 *           type: boolean
 *           description: Indica se o produto está habilitado
 *           example: true
 *     ProductImage:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: URL ou caminho da imagem do produto
 *           example: "https://example.com/image1.jpg"
 *         enabled:
 *           type: boolean
 *           description: Indica se a imagem do produto está habilitada
 *           example: true
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /products:
 *   get:
 *     summary: Obter todos os produtos
 *     tags:
 *       - Produtos
 *     responses:
 *       '200':
 *         description: Lista de todos os produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Criar um novo produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *       required: true
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * 
 * /products/{id}:
 *   get:
 *     summary: Obter um produto por ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       '200':
 *         description: Dados de um produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Produto não encontrado
 *   put:
 *     summary: Atualizar um produto por ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *       required: true
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Produto não encontrado
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Deletar um produto por ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       '204':
 *         description: Produto deletado com sucesso
 *       '404':
 *         description: Produto não encontrado
 *     security:
 *       - bearerAuth: []
 */

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const {
  validateTokenMiddleware,
  isAdminValidateMiddleware,
} = require('../middleware/validateMiddleware');

const { 
  validateProductCreation, 
  validateProductUpdate, 
  validateProductId 
} = require('../middleware/productsMiddleware');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', validateProductId, productsController.getProductById);

router.post(
  '/products',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  validateProductCreation,
  productsController.createProduct
);

router.put(
  '/products/:id',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  validateProductId,
  validateProductUpdate,
  productsController.updateProduct
);

router.delete(
  '/products/:id',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  validateProductId,
  productsController.deleteProduct
);

module.exports = router;