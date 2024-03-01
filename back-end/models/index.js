// db.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const UserModel = require('../models/User.js');
const PhoneModel = require('../models/Phone.js');
const config = require('../api/config.js')

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const phone = config; // Usando a instância do Sequelize diretamente do arquivo de configuração

// Adicione seus modelos manualmente aqui
const User = UserModel(phone);
const Phone = PhoneModel(phone);

db[User.name] = User;
db[Phone.name] = Phone;

// Opção: Importe modelos automaticamente do diretório de modelos
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(phone, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = phone;
db.Sequelize = Sequelize;

module.exports = db;
