const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.SECRET_KEY;

async function validateToken(token) {
  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = validateToken;
