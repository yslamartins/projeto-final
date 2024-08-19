const productsModel = require('../models/ProductsModels');

function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
}

function validateProduct(req, res, next) {
  const { name, price, description, stock, categorie_id, images } = req.body;
  
  if (!name || !price || typeof stock !== 'number' || typeof categorie_id !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes ou inválidos' });
  }

  if (images && !Array.isArray(images)) {
    return res.status(400).json({ error: 'O campo images deve ser um array' });
  }

  next();
}

module.exports = {
  validateId,
  validateProduct,
}