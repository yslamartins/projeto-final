const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.SECRET_KEY;

async function login(req, res) {
  const { id, email } = req.user;

  const token = jwt.sign({ id, email }, jwtSecret, { expiresIn: '5h' });

  res.send(token);
}

module.exports = { login };
