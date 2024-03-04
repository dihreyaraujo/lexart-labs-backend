const { User } = require('../models');

const registerUser = async (data, token) => {
  const objDataBaseUser = {
    user_name: data.username,
    token_jwt: token
  };
  await User.create(objDataBaseUser);
}

module.exports = registerUser;
