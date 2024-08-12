const connection = require('./Connection');

async function getAllProductsModel() {
    const result = await connection.query('SELECT * FROM products');
    return result.rows;
}

async function getProductsByIdModel(id) {
    const result = await connection.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = {
    getAllProductsModel,
    getProductsByIdModel
};