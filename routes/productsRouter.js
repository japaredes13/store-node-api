const express = require('express');
const ProductsService = require('./../services/productService');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const { size } = req.query;
  // const limit = size || 10;
  const products = await service.getAll();
  res.json({
    // size : limit,
    products : products
  });
});

router.get('/filter', (req, res) => {
  res.send('es un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(
      {
        message: 'created',
        data : newProduct
      }
    );
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res,next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(
        {
          id : id,
          message: 'updated',
          data : product
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(
    {
      message: 'deleted',
      response,
    }
  );
})

module.exports = router;
