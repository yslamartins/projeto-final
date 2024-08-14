const connection = require('./connection');

async function insertCategoryModel(name, slug, useMenu) {
  await connection.query(`
    INSERT INTO categories (name, slug, use_in_menu)
    VALUES('${name}', '${slug}', ${useMenu})
  `);

  return;
}

async function getAllCategories() {
  const getCategories = await connection.query('SELECT * FROM categories');

  return getCategories.rows;
}

async function getCategoryById(id) {
  const category = await connection.query(
    `SELECT * FROM categories WHERE id = ${id}`,
  );

  return category.rows[0];
}

async function insertCategoryModel(name, enable) {
  await connection.query(`
    INSERT INTO categories (name, enable)
    VALUES('${name}', ${enable})
  `);

  return;
}

async function updateCategoryPropertyModel(id, property, newValue) {
  await connection.query(`
    UPDATE categories
    SET ${property} = '${newValue}'
    WHERE id = ${id}
  `);

  return;
}

async function updateEveryPropertyCategoryModel(id, name, enable) {
  await connection.query(`
    UPDATE categories
    SET name = '${name}', enable = ${enable}
    WHERE id = ${id}
  `);

  return;
}

async function deleteCategoryModel(id) {
  await connection.query(`DELETE FROM categories WHERE id = ${id}`);

  return;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategoryModel,
  updateCategoryPropertyModel,
  updateEveryPropertyCategoryModel,
  deleteCategoryModel,
};
