const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoriesController');
const middlewareCategories = require('../middleware/CategoriesMiddleware');
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
