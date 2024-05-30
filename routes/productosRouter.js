const express = require('express');

const ProductosService = require('../services/productosServ');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/productosSchem');

const router = express.Router();
const service = new ProductosService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const productos = await service.find(req.query);
      res.status(200).json(productos);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const producto = await service.findOne(id);
      res.status(200).json(producto);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        message: 'Se agrego un nuevo producto',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.updatePartially(id, body);
      res.status(200).json({
        message: 'Se actualizó parcialmente el producto',
        data: updateProduct,
        id,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.updateCompletelly(id, body);
      res.status(200).json({
        message: 'Se actualizó completamente el producto',
        data: updateProduct,
        id,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.delete(id);
    res.status(200).json({
      message: 'Se elimino el producto',
      data: deleteProduct,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
