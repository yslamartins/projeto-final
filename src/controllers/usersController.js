const userModel = require("../models/usersModel");
const encryptPassword = require("../helpers/encryptPass");

async function createUser(req, res) {
  const { firstname, surname, email, password } = req.body;

  try {
    const hashedPassword = await encryptPassword(password);
    await userModel.insertUserModel(firstname, surname, email, hashedPassword);
    return res.status(201).send("Usuário inserido com sucesso");
  } catch (error) {
    return res.status(400).send("Esse usuário já está cadastrado");
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers(); 
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send("Erro ao obter usuários");
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    var user = await userModel.getUserByIdModel(id);
  } catch (error) {
    return res.status(400).send(error.message);
  }

  return res.send(user);
}
async function updateUser(req, res) {
  const { id } = req.params;
  const { firstname, surname, email, enabled } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID do usuário não fornecido." });
  }

  const fields = [];
  const values = [];

  if (firstname) {
    fields.push("firstname = $1");
    values.push(firstname);
  }
  if (surname) {
    fields.push("surname = $2");
    values.push(surname);
  }
  if (email) {
    fields.push("email = $3");
    values.push(email);
  }
  if (enabled !== undefined) {
    fields.push("enabled = $4");
    values.push(enabled);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "Nenhum campo para atualizar." });
  }

  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${fields.length + 1} RETURNING *`;
  values.push(id);

  try {
    const { rows } = await connection.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await userModel.deleteUserByIdModel(id);
    res.send("Usuário deletado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao deletar usuário");
  }
  return res.status(200).send("Usuário deletado com sucesso");
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
