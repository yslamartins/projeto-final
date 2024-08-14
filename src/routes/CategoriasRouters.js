const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriasController');
//esperando o middlewareCategorias//

router.get('/categoria', CategoriaController.getAllCategories);
router.get(
    '/categorias/:id',
    //esperando o middlewareCategorias//
    CategoriaController.getCategoryById
)

router.post(
    '/categoria',
    //esperando o middlewareCategorias//
    CategoriaController.insertCategoryModel
);

router.put(
    '/categoria/:id',
    //esperando o middlewareCategorias//
    CategoriaController.updateCategoryPropertyModel
)

router.delete(
    '/categoria/:id',
    //esperando o middlewareCategorias//
    CategoriaController.deleteCategoryModel
);

module.exports = router;