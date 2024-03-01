const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = process.env.POSTGRESQL_DATABASE;

const username = process.env.POSTGRESQL_USERNAME;

const password = process.env.POSTGRESQL_PASSWORD;

const host = process.env.POSTGRESQL_HOST;

const port = process.env.POSTGRESQL_PORT;

const phone = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port
});

module.exports = phone;
