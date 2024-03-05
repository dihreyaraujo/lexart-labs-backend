const { User } = require('../models');
const { verifyExistUser } = require('../helpers/auth.js');

const registerUser = async (data, token) => {
  const verifyUserInDb = await verifyExistUser(data.username);
  if (verifyUserInDb?.message) {
    return verifyUserInDb
  }
  const objDataBaseUser = {
    user_name: data.username,
    token_jwt: token
  };
  await User.create(objDataBaseUser);
  return true
}

module.exports = registerUser;
