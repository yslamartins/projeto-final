const productsModel = require('../models/productsModels');

function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
}

function validateProduct(req, res, next) {
  const { name, price, description, stock, categorie_id, images } = req.body;
  
  if (!name || !price || !description || typeof stock !== 'number' || typeof categorie_id !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes ou inválidos' });
  }
  next();
}

module.exports = {
  validateId,
  validateProduct,
}