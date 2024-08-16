const connection = require('./connection');

async function insertCategoryModel(name, enabled) {
  await connection.query(`
    INSERT INTO categories (name, enabled)
    VALUES('${name}', ${enabled})
  `);
  return;
}

async function getAllCategories() {
  const getCategories = await connection.query(`
      select * from categories
  `);
  return getCategories.rows[0];
}

async function getCategoryById(id) {
  const category = await connection.query(`
    SELECT * FROM categories WHERE id = ${id}
  `);
  return category.rows[0];
}

async function getCategoryByName(name) {
  const category = await connection.query(`
      SELECT * FROM categories WHERE name = ${name}
    `);
  return category.rows[0];
}

async function updateCategoryPropertyModel(id, property, newValue) {
  await connection.query(
    `
    UPDATE categories
    SET $1 = $2
    WHERE id = $3
  `,
    [property, newValue, id],
  );

  return;
}

async function deleteCategoryModel(id) {
  await connection.query(`
    DELETE FROM categories
    WHERE id = ${id}
  `);
  return;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  insertCategoryModel,
  updateCategoryPropertyModel,
  deleteCategoryModel,
};
