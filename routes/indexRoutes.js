const express = require('express');

const productosRouter = require('./productosRouter');
const usuariosRouter = require('./usuariosRouter');
const categoriasRouter = require('./categoriasRouter');
const orderRoutes = require('./orderRoutes');
const customersRouter = require('./customersRoutes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  router.use('/categorias', categoriasRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/orders', orderRoutes);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
