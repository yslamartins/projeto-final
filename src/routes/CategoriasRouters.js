const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriasController');
const middlewareCategorias = require('../middleware/categoriasMiddleware');

router.get('/categoria', CategoriaController.getAllCategories);
router.get(
  '/categorias/:id',
  middlewareCategorias.middlewareGetCategoryById,
  CategoriaController.getCategoryById,
);

router.post(
  '/categoria',
  middlewareCategorias.middlewareInsertCategory,
  CategoriaController.insertCategory,
);

router.put(
  '/categoria/:id',
  middlewareCategorias.middlewareUpdateCategory,
  CategoriaController.updateCategoryProperty,
);

router.delete(
  '/categoria/:id',
  middlewareCategorias.middlewareDeleteCategory,
  CategoriaController.deleteCategory,
);

module.exports = router;
