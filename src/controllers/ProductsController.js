const productsModel = require('../models/productsModels');

async function createProduct(req, res) {
  const product = await productsModel.createProductModel(req.body);
  res.send(product);
}

async function getAllProducts(req, res) {
  const products = await productsModel.getAllProductsModel();
  res.send(products);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const product = await productsModel.getProductsByIdModel(id);
  res.send(product);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
