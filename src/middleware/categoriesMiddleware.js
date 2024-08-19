const categoryModel = require('../models/categoryModel');

async function middlewareGetCategoryById(req, res, next) {
  const { id } = req.params;
  const category = await categoryModel.getCategoryById(id);

  if (!category) {
    return res.status(404).send('Categoria não encontrado');
  }

  next();
}

async function middlewareInsertCategory(req, res, next) {
  const { name, enabled } = req.body;

  if (!name || typeof enabled != 'boolean') {
    return res.status(400).send('Dados da categoria incompletos');
  }

  const category = await categoryModel.getCategoryByName(name);

  if (category) {
    return res.status(400).send('Categoria já cadastro');
  }

  next();
}

async function middlewareUpdateCategory(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  const hasId = await categoryModel.getCategoryById(id);

  if (!hasId) return res.status(400).send('Categoria não encontrada');

  for (info in data) {
    if (info !== 'name' && info !== 'enabled') {
      return res.status(400).send('Campos além do esperado');
    }

    if (info === 'name' && !data[info]) {
      return res.status(400).send('Campo vazio');
    }

    if (info === 'enabled' && typeof data[info] !== 'boolean') {
      return res.status(400).send('Campo diferente de boolean');
    }
  }

  next();
}

async function middlewareDeleteCategory(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Dados incompletos');
  }

  const category = await categoryModel.getCategoryById(id);

  if (!category) {
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
