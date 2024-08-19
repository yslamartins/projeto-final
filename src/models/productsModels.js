const connection = require('./connection');

async function createProductModel(product) {
  const categoryQuery = 'SELECT id FROM categories WHERE name = $1';
  const categoryResult = await connection.query(categoryQuery, [product.category_name]);

  if (categoryResult.rows.length === 0) {
    throw new Error('Categoria não encontrada');
  }

  const categoryId = categoryResult.rows[0].id;

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
    categoryId,
  ]);

  const newProduct = result.rows[0];

  if (product.images && product.images.length > 0) {
    const imageQuery = `
      INSERT INTO product_image (product_id, content, enabled)
      VALUES ($1, $2, $3)`;

    for (const image of product.images) {
      await connection.query(imageQuery, [newProduct.id, image.content, image.enabled || false]);
    }
  }

  return newProduct;
}

async function getProductByIdModel(id) {
  const query = `
    SELECT
    p.id, p.name, p.price, p.discount_percentage, p.description, p.stock, p.enabled, 
    p.created_at, p.updated_at, c.name as category_name, 
      COALESCE(json_agg(json_build_object('content', pi.content, 'enabled', pi.enabled)) 
        FILTER (WHERE pi.id IS NOT NULL), '[]') as images 
    FROM products p 
    LEFT JOIN categories c ON p.categorie_id = c.id 
    LEFT JOIN product_image pi ON p.id = pi.product_id 
    WHERE p.id = $1 
    GROUP BY p.id, c.name`;

  const result = await connection.query(query, [id]);
  return result.rows[0];
}

async function getAllProductsModel() {
  const query = `
    SELECT 
      p.id, p.name, p.price, p.discount_percentage, p.description, p.stock,
      p.enabled, p.created_at, p.updated_at, c.name as category_name, 
      COALESCE(json_agg(json_build_object('content', pi.content, 'enabled', pi.enabled)) 
        FILTER (WHERE pi.id IS NOT NULL), '[]') as images 
    FROM products p 
    LEFT JOIN categories c ON p.categorie_id = c.id 
    LEFT JOIN product_image pi ON p.id = pi.product_id 
    GROUP BY p.id, c.name`;

  const result = await connection.query(query);
  return result.rows;
}


async function updateProductModel(id, updatedFields) {
  const setClauses = [];
  const values = [];

  setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
  
  if (updatedFields.category_name) {
    const categoryQuery = 'SELECT id FROM categories WHERE name = $1';
    const categoryResult = await connection.query(categoryQuery, [updatedFields.category_name]);

    if (categoryResult.rows.length === 0) {
      throw new Error('Categoria não encontrada');
    }

    updatedFields.categorie_id = categoryResult.rows[0].id;
    delete updatedFields.category_name;
  }

  for (const field in updatedFields) {
    if (updatedFields.hasOwnProperty(field) && field !== 'updated_at' && field !== 'images') {
      setClauses.push(`${field} = $${values.length + 1}`);
      values.push(updatedFields[field]);
    }
  }

  values.push(id);
  const query = `
    UPDATE products
    SET ${setClauses.join(', ')}
    WHERE id = $${values.length}
    RETURNING *;
  `;

  try {
    const result = await connection.query(query, values);
    const updatedProduct = result.rows[0];

    if (updatedFields.images) {
      await connection.query('DELETE FROM product_image WHERE product_id = $1', [id]);

      const imageQuery = `
        INSERT INTO product_image (product_id, content, enabled)
        VALUES ($1, $2, $3)`;

      for (const image of updatedFields.images) {
        await connection.query(imageQuery, [id, image.content, image.enabled || false]);
      }
    }

    return updatedProduct;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
}

async function deleteProductModel(id) {
  await connection.query('DELETE FROM product_image WHERE product_id = $1', [id]);
  const result = await connection.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0]; 
}

module.exports = {
  createProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
};