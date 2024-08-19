/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-incrementado da categoria
 *         name:
 *           type: string
 *           description: Nome da categoria
 *         enabled:
 *           type: boolean
 *           description: Indica se a categoria está habilitada
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da categoria
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data de atualização da categoria
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /category:
 *   get:
 *     summary: Obter todas as categorias
 *     tags:
 *       - Categorias
 *     responses:
 *       '200':
 *         description: Lista de todas as categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *   post:
 *     summary: Criar uma nova categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *
 * /category/{id}:
 *   get:
 *     summary: Obter uma categoria por ID
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       '200':
 *         description: Dados de uma categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *   put:
 *     summary: Atualizar uma categoria por ID
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Deletar uma categoria por ID
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       '204':
 *         description: Categoria deletada com sucesso
 *     security:
 *       - bearerAuth: []
 */

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoriesController');
const middlewareCategories = require('../middleware/categoriesMiddleware');
const {
  validateTokenMiddleware,
  isAdminValidateMiddleware,
} = require('../middleware/validateMiddleware');

router.get('/category', CategoryController.getAllCategories);
router.get(
  '/category/:id',
  middlewareCategories.middlewareGetCategoryById,
  CategoryController.getCategoryById,
);

router.post(
  '/category',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  middlewareCategories.middlewareInsertCategory,
  CategoryController.insertCategory,
);

router.put(
  '/category/:id',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  middlewareCategories.middlewareUpdateCategory,
  CategoryController.updateCategoryProperty,
);

router.delete(
  '/category/:id',
  validateTokenMiddleware,
  isAdminValidateMiddleware,
  middlewareCategories.middlewareDeleteCategory,
  CategoryController.deleteCategory,
);

module.exports = router;
