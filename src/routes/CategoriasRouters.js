const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriasController');
const middlewareCategorias = require('../middleware/categoriasMiddleware');

router.get('/categories', CategoriaController.getAllCategories);
router.get(
  '/categories/:id',
  middlewareCategorias.middlewareGetCategoryById,
  CategoriaController.getAllCategories,
);

router.post(
  '/categories',
  middlewareCategorias.middlewareInsertCategory,
  CategoriaController.insertCategory,
);

router.put(
  '/categories/:id',
  middlewareCategorias.middlewareUpdateCategory,
  CategoriaController.updateCategoryProperty,
);

router.delete(
  '/categories/:id',
  middlewareCategorias.middlewareDeleteCategory,
  CategoriaController.deleteCategory,
);

module.exports = router;
