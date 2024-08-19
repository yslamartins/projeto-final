const validateToken = require('../helpers/validateToken');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwtSecret = process.env.SECRET_KEY;
dotenv.config();
async function validateTokenMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Token não encontrado');
  }

  const tokenIsValid = validateToken(token);

  if (!tokenIsValid) {
    return res.status(401).send('Token expirado ou inválido');
  }

  next();
}

async function isAdminValidateMiddleware(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (!decoded) {
      return res.status(400).send('Faça login');
    }

    if (!decoded.email.includes('admin')) {
      return res.status(400).send('Não autorizado');
    }
  });

  next();
}

module.exports = { validateTokenMiddleware, isAdminValidateMiddleware };
