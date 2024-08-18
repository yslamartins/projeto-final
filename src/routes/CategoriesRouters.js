const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoriesController');
const middlewareCategories = require('../middleware/CategoriesMiddleware');

router.get('/category', CategoryController.getAllCategories);
router.get(
  '/category/:id',
  middlewareCategories.middlewareGetCategoryById,
  CategoryController.getAllCategories,
);

router.post(
  '/category',
  middlewareCategories.middlewareInsertCategory,
  CategoryController.insertCategory,
);

router.put(
  '/category/:id',
  middlewareCategories.middlewareUpdateCategory,
  CategoryController.updateCategoryProperty,
);

router.delete(
  '/category/:id',
  middlewareCategories.middlewareDeleteCategory,
  CategoryController.deleteCategory,
);

module.exports = router;
