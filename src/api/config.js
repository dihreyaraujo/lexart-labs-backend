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
  port,
  dialectModule: require('pg'),
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

// const phone = new Sequelize("postgres://default:Pi4nSqCAcx2W@ep-restless-frost-a4b9orug.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require", {
//   dialectModule: require('pg')
// });

module.exports = phone;
