const connection = require('./connection');

async function insertCategoryModel() {
  return;
}

async function getAllCategories() {
  const getCategories = await connection.query(`
      SELECT
              produtos.id,
              produtos.name,
              produtos.preco,
              categorias.name,
              produtos.descricao
      FROM produtos
      JOIN categorias
      ON produtos.categoria_id = categorias.id
  `);
  return getCategories.rows[0];
}

async function getCategoryById(id) {
  const category = await connection.query(`
    SELECT
        produtos.id,
        produtos.name,
        produtos.preco,
        categorias.name,
        produtos.descricao
    FROM produtos
    JOIN categorias
    ON produtos.categoria_id = categorias.id
    WHERE produtos.id = ${id}
  `);
  return category.rows[0];
}

async function insertCategoryModel(name, enable) {
  return;
}

async function updateCategoryPropertyModel(id, property, newValue) {
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
