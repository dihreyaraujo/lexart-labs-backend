const { Router } = require('express');
const { createToken } = require('../helpers/auth.js');
const registerUserService = require('../service/registerService.js');
const loginUserService = require('../service/loginService.js');
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../service/productService.js');

const routes = Router();

routes.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const token = createToken(data);
    console.log('token: ', token)
    const user = await registerUserService(data, token);
    if (user?.message) {
      res.status(400).json(user);
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso.' })
    }
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

routes.post('/products', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const data = req.body;
    const products = await createProduct(authorization, data);
    if (products.empty) {
      res.status(401).json({ message: products.empty });
    } else if (products) {
      res.status(200).json({ message: 'Produto cadastrado com sucesso' });
    } else {
      res.status(401).json({ message: 'Usuário não autorizado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

routes.get('/products', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const products = await getProduct(authorization);
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(401).json({ message: 'Usuário não autorizado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routes.put('/products', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const data = req.body;
    const products = await updateProduct(authorization, data);
    if (products) {
      res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } else {
      res.status(401).json({ message: 'Usuário não autorizado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routes.post('/productsDelete', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const data = req.body;
    const products = await deleteProduct(authorization, data.id);
    if (products) {
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(401).json({ message: 'Usuário não autorizado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

module.exports = routes;
