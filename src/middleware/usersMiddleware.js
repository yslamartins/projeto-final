const usersModel = require('../models/usersModel');

async function middlewareInsertUser(req, res, next) {
  const { firstname, surname, email, password } = req.body;
  const hasUser = await usersModel.getUserByEmailModel(email);

  if (hasUser) {
    return res.status(400).send('Esse usuário já está cadastrado');
  }
  if (!firstname || !surname || !email || !password) {
    return res.status(400).send('Dados incompletos');
  }
  if (password.length < 6) {
    return res.status(400).send('A senha deve ter mais de 6 caracteres');
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).send('Email inválido');
  }

  if (!email.endsWith('admin.com') && !email.endsWith('user.com')) {
    return res.status(400).send('Email inválido');
  }

  next();
}
async function middlewareGetUserById(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send('Dados inválidos');
  }

  next();
}

async function middlewareUpdateUser(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  const hasUser = await usersModel.getUserByIdModel(id);
  const doesExistUser = await usersModel.getUserByEmailModel(data.email);
  if (doesExistUser) return res.status(400).send('Email inválido');

  if (!hasUser) return res.status(400).send('User não encontrado');

  for (info in data) {
    if (!data[info]) {
      return res.status(400).send('Preencha todos os campos');
    }

    if (info === 'password') {
      return res.status(400).send('Vá para a rota de trocar senhas');
    }

    if (info === 'email' && !data[info].includes('@')) {
      return res.status(400).send('Email inválido');
    }

    if (info === 'email' && !data[info].includes('.com')) {
      return res.status(400).send('Email inválido');
    }
  }

  next();
}

async function middlewareUpdatePassword(req, res, next) {
  const { id } = req.params;
  const { password } = req.body;

  const hasUser = await usersModel.getUserByIdModel(id);

  if (!hasUser) return res.status(400).send('User não encontrado');

  if (password.length < 6) {
    return res.status(400).send('Senha menor que 6 digitos');
  }

  next();
}

async function middlewareDeleteUser(req, res, next) {
  const { id } = req.params;
  const hasUser = await usersModel.getUserByIdModel(id);

  if (!hasUser) return res.status(400).send('User não encontrado');

  if (!id) {
    return res.status(400).send('Dados incompletos');
  }

  const user = await usersModel.getUserByIdModel(id);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  next();
}

module.exports = {
  middlewareInsertUser,
  middlewareGetUserById,
  middlewareUpdateUser,
  middlewareUpdatePassword,
  middlewareDeleteUser,
};
