const { DataTypes } = require('sequelize');
require('dotenv').config()

module.exports = (sequelize) => {
  const Phone = sequelize.define('Phone', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    price:  {
      type: DataTypes.INTEGER
    },
    color: {
      type: DataTypes.STRING
    }
  }, { schema: process.env.POSTGRESQL_SCHEMA, tableName: 'phone_lexart_labs' });

  return Phone
}

  

