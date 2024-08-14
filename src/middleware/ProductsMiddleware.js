const productsModel = require('../models/productsModels');

// middleware de busca de um produto pelo id
async function middlewareGetProductsById(req, res, next) {
  const { id } = req.params;
  const product = await productsModel.getProductsByIdModel(id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  next();
}

module.exports = {
  middlewareGetProductsById,
};
