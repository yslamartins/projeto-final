const categoriasModel = require('../models/CategoriasModel');

async function middlewareGetCategoryById(req, res, next) {
  const { id } = req.params;
  const categoria = await categoriasModel.getCategoryById(id);

  if (!categoria) {
    return res.status(404).send('Categoria não encontrado');
  }

  next();
}

async function middlewareInsertCategory(req, res, next) {
  const { name, enabled } = req.body;

  if (!name || !enabled) {
    return res.status(400).send('Dados da categoria incompletos');
  }

  const categoria = await categoriasModel.getCategoryByName(name);

  if (categoria) {
    return res.status(400).send('Categoria já cadastro');
  }

  next();
}

async function middlewareUpdateCategory(req, res, next) {
  const { id } = req.params;
  const { property, newValue } = req.body;
  const categoria = await categoriasModel.getCategoryById(id);

  if (!categoria) {
    return res.status(404).send('Categoria não encontrada');
  }

  if (!property || !newValue) {
    return res.status(400).send('Dados incompletos');
  }

  if (property != 'name' && property != 'enabled') {
    return res.status(400).send('Propriedade inválida');
  }

  next();
}

async function middlewareDeleteCategory(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Dados incompletos');
  }

  const categoria = await categoriasModel.getCategoryById(id);

  if (!categoria) {
    return res.status(404).send('Categoria não encontrado');
  }
  next();
}

module.exports = {
  middlewareGetCategoryById,
  middlewareInsertCategory,
  middlewareUpdateCategory,
  middlewareDeleteCategory,
};
