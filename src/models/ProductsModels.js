const connection = require('./connection');

async function createProductModel(product) {
  const query = `
        INSERT INTO products 
        (enabled, name, slug, use_in_menu, stock, description, price, price_with_discount) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`;

  const result = await connection.query(query, [
    product.enabled,
    product.name,
    product.slug,
    product.use_in_menu,
    product.stock,
    product.description,
    product.price,
    product.price_with_discount,
  ]);

  return result.rows[0];
}

async function getAllProductsModel() {
  const result = await connection.query('SELECT * FROM products');
  return result.rows;
}

async function getProductsByIdModel(id) {
  const result = await connection.query(
    'SELECT * FROM products WHERE id = $1',
    [id],
  );
  return result.rows[0];
}

module.exports = {
  createProductModel,
  getAllProductsModel,
  getProductsByIdModel,
};
