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
  let value = typeof newValue == String ? `'${newValue}'` : newValue;
  await connection.query(`
    UPDATE categories
    SET ${property} = ${value}
    WHERE id = 1
  `);
  return;
}

async function updateEveryPropertyCategoryModel(id, name, enable) {
  return;
}

async function deleteCategoryModel(id) {
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
