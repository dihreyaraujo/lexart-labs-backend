const { DataTypes } = require('sequelize');
require('dotenv').config()

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
    },
    token_jwt: {
      type: DataTypes.STRING
    }
  }, { schema: process.env.POSTGRESQL_SCHEMA, tableName: 'user_lexart_labs' });

  return User
}
