const { Router } = require('express');

const routes = Router();

routes.get('/test', (req, res) => {
  res.status(200).send('API FUNCIONANDO');
})

module.exports = routes;
