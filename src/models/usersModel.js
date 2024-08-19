const connection = require('./connection');
const encryptPassword = require('../helpers/encryptPass');

async function insertUserModel(firstname, surname, email, password) {
  await connection.query(
    `
        INSERT INTO users (firstname, surname, email, password) 
        VALUES($1, $2, $3, $4)`,
    [firstname, surname, email, password],
  );
}

async function getAllUsers() {
  const result = await connection.query('SELECT * FROM users');
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
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );
  return result.rows[0];
}

async function updateUserByIdModel(id, values) {
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
    UPDATE users
    SET ${str}
    WHERE id = ${id}
  `);

  return;
}

async function updateUserPasswordModel(id, password) {
  await connection.query(`
    UPDATE users
    SET password = '${password}'
    WHERE id = ${id}  
  `);
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
  updateUserPasswordModel,
  deleteUserByIdModel,
};
