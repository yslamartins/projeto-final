const connection = require('./connection');

async function createProductModel(product) {
  const query = `
    INSERT INTO products 
    (enabled, name, price, description, stock, discount_percentage, categorie_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *`;

  const result = await connection.query(query, [
    product.enabled,
    product.name,
    product.price,
    product.description,
    product.stock,
    product.discount_percentage || 0,
    product.categorie_id,
  ]);

  return result.rows[0];
}

async function getAllProductsModel() {
  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.categorie_id = c.id`;
    
  const result = await connection.query(query);
  return result.rows;
}

async function getProductByIdModel(id) {
  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.categorie_id = c.id 
    WHERE p.id = $1`;
    
  const result = await connection.query(query, [id]);
  return result.rows[0];
}

async function updateProductModel(id, updatedFields) {
  const setClauses = [];
  const values = [];

  for (const field in updatedFields) {
    if (updatedFields.hasOwnProperty(field)) {
      setClauses.push(`${field} = $${values.length + 1}`);
      values.push(updatedFields[field]);
    }
  }

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
  getProductByIdModel,
  updateProductModel,
};