const productsModel = require('../models/ProductsModels');

async function middlewareGetProductsById(req, res, next) {
    const { id } = req.params;
    const product = await productsModel.getProductsByIdModel(id);

    if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    next();
}

async function middlewareGetAllProducts(req, res, next) {
    const products = await productsModel.getAllProductsModel();
    res.send(products);

    if (!products) {
        return res.status(404).json({ message: "Produtos não encontrados" });
    }

    next();
}

module.exports = {
    middlewareGetProductsById,
    middlewareGetAllProducts
};