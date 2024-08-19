const {
  createProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
} = require('../models/productsModels');

async function createProduct(req, res) {
  try {
    const product = req.body;
    const newProduct = await createProductModel(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await getAllProductsModel();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getProductById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID do produto inválido' });
    }
    const product = await getProductByIdModel(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID do produto inválido' });
    }

    const updatedFields = req.body;
    const updatedProduct = await updateProductModel(id, updatedFields);
    
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID do produto inválido' });
    }
    const result = await deleteProductModel(id);
    if (result) {
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};