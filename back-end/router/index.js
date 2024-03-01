const { Router } = require('express');
const { createToken } = require('../helpers/auth.js');
const registerUserService = require('../service/registerService.js');
const loginUserService = require('../service/loginService.js');

const routes = Router();

routes.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const token = createToken(data);
    console.log('token: ', token)
    await registerUserService(data, token);
    res.status(201).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
});

routes.post('/login', async (req, res) => {
  try {
    const data = req.body;
    const responseLogin = await loginUserService(data);
    console.log(responseLogin);
    if (responseLogin.message === 'Sucesso') {
      res.status(200).json(responseLogin)
    } else if (responseLogin.message === 'Usuário não encontrado') {
      res.status(404).json(responseLogin)
    } else {
      res.status(401).json(responseLogin);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
});

module.exports = routes;
