const connection = require('./connection');

async function insertCategoryModel(name, enable) {
  await connection.query(`
    INSERT INTO categories (name, enabled)
    VALUES('${name}', ${enable})
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

async function updateCategoryPropertyModel(id, property, newValue) {
  if (property === 'name') {
    await connection.query(`
    UPDATE categories
    SET name = ${newValue}
    WHERE id = ${id}
  `);
  } else if (property === 'enabled') {
    await connection.query(`
    UPDATE categories
    SET enabled = ${newValue}
    WHERE id = ${id}`);
  }

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
  insertCategoryModel,
  updateCategoryPropertyModel,
  deleteCategoryModel,
};
