const productsModel = require('../models/ProductsModels');

function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  next();
}

function validateProduct(req, res, next) {
  const { name, price, description, stock, categorie_id } = req.body;
  if (!name || !price || typeof stock !== 'number' || typeof categorie_id !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid product fields' });
  }
  next();
}

module.exports = {
  validateId,
  validateProduct,
}