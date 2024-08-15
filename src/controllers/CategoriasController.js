const CategoriasModel = require('../models/CategoriasModel');

async function getAllCategories(req, res) {
  const Categorias = await CategoriasModel.getAllCategories();

  return res.send(Categorias);
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const Categorias = await CagoriasModel.getCategoryById(id);

  return res.send(Categorias);
}

async function insertCategory(req, res) {
  const { name, enabled } = req.body;

  await CategoriasModel.insertCategoryModel(name, enabled);

  return res.status(201).send('categoria inserido com sucesso');
}

async function updateCategoryProperty(req, res) {
  const { id } = req.params;
  const { name } = req.params;

  await CategoriasModel.updateCategoryPropertyModel(id, name);

  return res.send('categorias atualizados com sucesso');
}

async function deleteCategory(req, res) {
  const { id } = req.params;

  await CategoriasModel.deleteCategoryModel(id);

  return res.send('Categorias deletado com sucesso');
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategoryProperty,
  deleteCategory,
};
