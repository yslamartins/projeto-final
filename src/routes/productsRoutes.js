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
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         discount_percentage:
 *           type: number
 *           format: float
 *           description: Porcentagem de desconto do produto
 *         description:
 *           type: string
 *           description: Descrição do produto
 *         stock:
 *           type: integer
 *           description: Quantidade em estoque do produto
 *         category_name:
 *           type: string
 *           description: Nome da categoria associada ao produto
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductImage'
 *           description: Lista de imagens associadas ao produto
 *         enabled:
 *           type: boolean
 *           description: Indica se o produto está habilitado
 *     ProductImage:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: URL ou caminho da imagem do produto
 *         enabled:
 *           type: boolean
 *           description: Indica se a imagem do produto está habilitada
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
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
  validateId,
  validateProduct,
} = require('../middleware/productsMiddleware');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', validateId, productsController.getProductById);

router.post(
  '/products',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  validateProduct,
  productsController.createProduct,
);

router.put(
  '/products/:id',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  validateId,
  validateProduct,
  productsController.updateProduct,
);

router.delete(
  '/products/:id',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  validateId,
  productsController.deleteProduct,
);

module.exports = router;