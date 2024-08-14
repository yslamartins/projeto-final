const cagoriasModel = require('../models/categoriasModel');

async function getAllCategories(req, res) {
  const Categorias = await CategoriasModel.getAllCategories();

  return res.send(Categorias);
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const Categorias = await CagoriasModel.getCategoryById();

  return res.send(Categorias);
}

async function insertCategoryModel(req, res) {
  const { name, enable } = req.body;

  await CategoriasModel.insertCategoryModel(name, enable);

  return res.status(201).send('categoria inserido com sucesso');
}

async function updateCategoryPropertyModel(req, res) {
  const { id } = req.params;
  const { name } = req.params;

  await CategoriasModel.updateCategoryPropertyModel(id, name);

  return res.send('categorias atualizados com sucesso');
}

async function deleteCategoryModel(req, res) {
  const { id } = req.params;

  await CategoriasModel.deleteCategoryModel(id);

  return res.send('Categorias deletado com sucesso');
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategoryModel,
  updateCategoryPropertyModel,
  deleteCategoryModel,
};
