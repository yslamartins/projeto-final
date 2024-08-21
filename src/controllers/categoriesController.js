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

  const hasProducts = await categoriasModel.hasProducts(id);
  
  if (hasProducts) {
    return res.status(400).send('Não é possível deletar a categoria, pois há produtos associados.');
  }

  await categoriasModel.deleteCategoryModel(id);

  return res.send('Categoria deletada com sucesso');
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategoryProperty,
  deleteCategory,
};
