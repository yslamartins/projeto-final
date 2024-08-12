const productsModel = require('../models/ProductsModels');

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
    getAllProducts,
    getProductById
};