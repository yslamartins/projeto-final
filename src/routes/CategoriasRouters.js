const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriasController');
const middlewareCategorias = require('../middleware/categoriasMiddleware');

router.get('/categoria', CategoriaController.getAllCategories);
router.get(
    '/categorias/:id',
    middlewareCategorias.middlewareGetCategoryById,
    CategoriaController.getCategoryById
)

router.post(
    '/categoria',
    middlewareCategorias.middlewareInsertCategory,
    CategoriaController.insertCategoryModel
);

router.put(
    '/categoria/:id',
    middlewareCategorias.middlewareUpdateCategory,
    CategoriaController.updateCategoryPropertyModel
)

router.delete(
    '/categoria/:id',
    middlewareCategorias.middlewareDeleteCategory,
    CategoriaController.deleteCategoryModel
);

module.exports = router;