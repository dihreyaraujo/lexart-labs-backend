const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_KEY

const verifyAuth = (token) => {
  const decoded = jwt.verify(token, jwtKey);
  const user = User.findOne({ where: { user_name: decoded?.userName } });
  if (user) {
    return true;
  }
  return false;
}

const createToken = (data) => {
  const coded = jwt.sign(data, jwtKey);
  return coded;
}

module.exports = { verifyAuth, createToken }
