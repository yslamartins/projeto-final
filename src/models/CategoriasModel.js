const connection = require('./Connection');

async function getAllCategories() {
  const categories = await connection.query('SELECT * FROM categories');

  return categories.rows;
}

async function getCategoryById(id) {
  const category = await connection.query(
    `SELECT * FROM categories WHERE id = ${id}`,
  );

  return category.rows[0];
}

module.exports = {
  getAllCategories,
};
