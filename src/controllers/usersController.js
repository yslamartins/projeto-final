const userModel = require('../models/usersModel');
const encryptPassword = require('../helpers/encryptPass');

async function createUser(req, res) {
  const { firstname, surname, email, password } = req.body;

  const hashedPassword = await encryptPassword.encryptPassword(password);
  await userModel.insertUserModel(firstname, surname, email, hashedPassword);
  return res.status(201).send('Usuário inserido com sucesso');
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send('Erro ao obter usuários');
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
  const data = req.body;

  await userModel.updateUserByIdModel(id, data);
  return res.status(201).send('Usuário inserido com sucesso');
}

async function updatePassword(req, res) {
  const { id } = req.params;
  const { password } = req.body;

  const hashedPassword = await encryptPassword.encryptPassword(password);
  await userModel.updateUserPasswordModel(id, hashedPassword);

  return res.status(200).send('Senha atualizada com sucesso');
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await userModel.deleteUserByIdModel(id);
    res.status(200).send('Usuário deletado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao deletar usuário');
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updatePassword,
  deleteUser,
};
