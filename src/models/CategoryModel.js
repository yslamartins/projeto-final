const connection = require('./connection');

async function insertCategoryModel(name, enabled) {
  await connection.query(
    `
    INSERT INTO categories (name, enabled)
    VALUES($1, $2)
  `,
    [name, enabled],
  );
  return;
}

async function getAllCategories() {
  const getCategories = await connection.query(`
      SELECT * FROM categories
  `);
  return getCategories.rows;
}

async function getCategoryById(id) {
  const category = await connection.query(
    `
    SELECT * FROM categories WHERE id = $1
  `,
    [id],
  );
  return category.rows[0];
}

async function getCategoryByName(name) {
  const category = await connection.query(
    `
      SELECT * FROM categories WHERE name = $1
    `,
    [name],
  );
  return category.rows[0];
}

async function updateCategoryModel(id, values) {
  let str = '';

  values.updated_at = new Date().toISOString();

  for (let val in values) {
    str +=
      val +
      ' = ' +
      (typeof values[val] === 'string'
        ? `'${values[val]}', `
        : `${values[val]}, `);
  }

  str = str.slice(0, -2);

  await connection.query(`
    UPDATE categories
    SET ${str}
    WHERE id = ${id}
  `);

  return;
}

async function deleteCategoryModel(id) {
  await connection.query(
    `
    DELETE FROM categories
    WHERE id = $1
  `,
    [id],
  );
  return;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  insertCategoryModel,
  updateCategoryModel,
  deleteCategoryModel,
};
