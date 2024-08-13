const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');
const middlewareProducts = require('../middleware/ProductsMiddleware');

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', middlewareProducts.middlewareGetProductsById, productsController.getProductById);

router.post('/products', middlewareProducts.middlewareGetAllProducts, productsController.createProduct)

module.exports = router;