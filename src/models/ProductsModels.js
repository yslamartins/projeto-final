const connection = require('./connection');

async function createProductModel(product) {
  const query = `
    INSERT INTO products 
    (enabled, name, price, description, stock) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;

  const result = await connection.query(query, [
    product.enabled,
    product.name,
    product.price,
    product.description,
    product.stock,
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

async function updateProductModel(id, updatedFields) {
  const setClauses = [];
  const values = [];

  if (updatedFields.enabled !== undefined) {
    setClauses.push(`enabled = $${values.length + 1}`);
    values.push(updatedFields.enabled);
  }
  if (updatedFields.name !== undefined) {
    setClauses.push(`name = $${values.length + 1}`);
    values.push(updatedFields.name);
  }
  if (updatedFields.price !== undefined) {
    setClauses.push(`price = $${values.length + 1}`);
    values.push(updatedFields.price);
  }
  if (updatedFields.description !== undefined) {
    setClauses.push(`description = $${values.length + 1}`);
    values.push(updatedFields.description);
  }
  if (updatedFields.stock !== undefined) {
    setClauses.push(`stock = $${values.length + 1}`);
    values.push(updatedFields.stock);
  }

  setClauses.push(`id = $${values.length + 1}`);
  values.push(id);

  const query = `
    UPDATE products
    SET ${setClauses.join(', ')}
    WHERE id = $${values.length}
    RETURNING *`;

  const result = await connection.query(query, values);

  return result.rows[0];
}

module.exports = {
  createProductModel,
  getAllProductsModel,
  getProductsByIdModel,
  updateProductModel,
};