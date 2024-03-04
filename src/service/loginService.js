const { verifyAuthLogin } = require('../helpers/auth.js');

const loginUser = async (data) => {
  const verifyJwt = verifyAuthLogin(data);
  return verifyJwt;
}

module.exports = loginUser;
