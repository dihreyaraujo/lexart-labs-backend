const { Router } = require('express');
const { createToken } = require('../helpers/auth.js');
const registerUserService = require('../service/registerService.js');

const routes = Router();

routes.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const token = createToken(data);
    console.log('token: ', token)
    await registerUserService(data, token);
    res.status(200).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
})

module.exports = routes;
