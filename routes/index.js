const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const toEditRouter = require('./toEditRouter');

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router);
  router.use('/products', (productsRouter));
  router.use('/users', (usersRouter));
  router.use('/toEdit', (toEditRouter));
}

module.exports = routerApi;
