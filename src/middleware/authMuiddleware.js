const { getUserByEmailModel } = require('../models/usersModel');
const { comparePassword } = require('../helpers/encryptPass');

async function loginMiddleware(req, res, next) {
  const { email, password } = req.body;
  const user = await getUserByEmailModel(email);
  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  if (!email || !password) {
    return res.status(400).send('Preencha todos os campos');
  }

  const compare = await comparePassword(password, user.password);
  if (!compare) {
    return res.status(400).send('Informações de login inválidas');
  }

  const data = {
    id: user.id,
    email: user.email,
  };

  req.user = data;

  next();
}

module.exports = { loginMiddleware };
