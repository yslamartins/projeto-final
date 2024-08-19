const categoriasModel = require('../models/categoryModel');

async function getAllCategories(req, res) {
  const categorias = await categoriasModel.getAllCategories();

  return res.send(categorias);
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const categorias = await categoriasModel.getCategoryById(id);

  return res.send(categorias);
}

async function insertCategory(req, res) {
  const { name, enabled } = req.body;

  await categoriasModel.insertCategoryModel(name, enabled);

  return res.status(201).send('categoria inserido com sucesso');
}

async function updateCategoryProperty(req, res) {
  const { id } = req.params;
  const values = req.body;

  await categoriasModel.updateCategoryModel(id, values);

  return res.send('categorias atualizados com sucesso');
}

async function deleteCategory(req, res) {
  const { id } = req.params;

  await categoriasModel.deleteCategoryModel(id);

  return res.send('Categorias deletado com sucesso');
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategoryProperty,
  deleteCategory,
};
