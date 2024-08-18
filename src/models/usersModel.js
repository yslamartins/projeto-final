const connection = require('./connection');

async function insertUserModel(firstname, surname, email, password) {
  await connection.query(
    `
        INSERT INTO users (firstname, surname, email, password) 
        VALUES($1, $2, $3, $4)`,
    [firstname, surname, email, password],
  );
}

async function getAllUsers() {
  const result = await connection.query(
    'SELECT id, firstname, surname, email, password FROM users',
  );
  return result.rows;
}

async function getUserByIdModel(id) {
  const result = await connection.query(
    `SELECT id, firstname, surname, email FROM users WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

async function getUserByEmailModel(email) {
  const result = await connection.query(
    `SELECT id, firstname, surname, email FROM users WHERE email = $1`,
    [email],
  );
  return result.rows[0];
}

async function updateUserByIdModel(id, firstname, surname, email) {
  await connection.query(
    `
        UPDATE users
        SET firstname = $1, surname = $2, email = $3
        WHERE id = $4
    `,
    [firstname, surname, email, id],
  );

  return;
}
async function deleteUserByIdModel(id) {
  await connection.query(
    `
        DELETE FROM users WHERE id = $1
    `,
    [id],
  );
}

module.exports = {
  insertUserModel,
  getAllUsers,
  getUserByIdModel,
  getUserByEmailModel,
  updateUserByIdModel,
  deleteUserByIdModel,
};
