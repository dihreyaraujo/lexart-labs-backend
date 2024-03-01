const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const jwtKey = process.env.JWT_KEY

const verifyAuthLogin = async (data) => {
  const user = await User.findOne({ where: { user_name: data.username } });
  if (!user) {
    return { message: 'Usuário não encontrado' };
  }
  const decoded = jwt.verify(user.token_jwt, jwtKey);
  if (decoded.password !== data.password) {
    return { message: 'Senha incorreta' }
  }
  return { message: 'Sucesso', token: user.token_jwt };
}

const verifyLogged = async (token) => {
  const user = await User.findOne({ where: { token_jwt: token } });
  if (user) {
    return true
  }
  return false
}

const createToken = (data) => {
  const coded = jwt.sign(data, jwtKey);
  return coded;
}

module.exports = { verifyAuthLogin, createToken, verifyLogged }
