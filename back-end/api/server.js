const app = require('./app.js');
const phone = require('./config.js');
require('dotenv').config();
const PhoneModel = require('../models/Phone.js');
const UserModel = require('../models/User.js');

const port = process.env.API_PORT || 3001;

const Phone = PhoneModel(phone);
const User = UserModel(phone);

app.listen(port, async () => {
  try {
    await phone.sync();
    console.log(`API running on PORT: ${port}`);
  } catch (error) {
    console.error("Error in sync the tabel: ", error);
  }
});

module.exports = { Phone, User };
