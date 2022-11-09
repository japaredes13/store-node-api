const express = require('express');
const ProductsService = require('./../services/productService');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = service.getAll(limit);
  res.json({
    size : limit,
    products : products
  });
});

router.get('/filter', (req, res) => {
  res.send('es un filter');
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const product = service.findOne(id);

  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json(
    {
      message: 'created',
      data : body
    }
  );
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json(
    {
      id : id,
      message: 'updated',
      data : body
    }
  );
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id : id,
      message: 'deleted',
    }
  );
})

module.exports = router;
