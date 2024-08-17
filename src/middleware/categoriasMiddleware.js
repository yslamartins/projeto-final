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
  const data = req.body;
  const hasId = await categoriasModel.getCategoryById(id);

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
