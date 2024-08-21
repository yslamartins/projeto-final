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
 *       '400':
 *         description: Não é possível deletar a categoria, pois há produtos associados.
 *     security:
 *       - bearerAuth: []
 */

const {
  createProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
} = require('../models/productsModels');

async function createProduct(req, res) {
  try {
    const product = req.body;
    const newProduct = await createProductModel(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await getAllProductsModel();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getProductById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID do produto inválido' });
    }
    const product = await getProductByIdModel(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID do produto inválido' });
    }

    const updatedFields = req.body;
    const updatedProduct = await updateProductModel(id, updatedFields);

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID do produto inválido' });
    }

    const result = await deleteProductModel(id);

    if (result) {
      return res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}