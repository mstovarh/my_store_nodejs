const express = require('express');

const productosRouter = require('./productosRouter');
const usuariosRouter = require('./usuariosRouter');
const categoriasRouter = require('./categoriasRouter');
const orderRoutes = require('./orderRoutes');
const customersRouter = require('./customersRoutes');
const authRouter = require('./authRouter');
const { checkApiKey } = require('../middlewares/auth.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', checkApiKey, productosRouter);
  router.use('/categorias', checkApiKey, categoriasRouter);
  router.use('/usuarios', checkApiKey, usuariosRouter);
  router.use('/orders', checkApiKey, orderRoutes);
  router.use('/customers', checkApiKey, customersRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
