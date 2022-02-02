const express = require('express');
const faker = require('faker');
const Product = require('../models/product');

const router = express.Router();

router.get('/test', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })

  }
  res.json(products)
})

router.get('/', paginatedResults(Product), (req, res) => {

  res.json(res.paginatedResults)

})


function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)


    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previus = {
        page: page - 1,
        limit: limit
      }
    }

    try {
      //results.results = model.slice(startIndex, endIndex)
      //implementaion de la consulta a  la base de datos 
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()

    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}



router.get('/filter', (req, res) => {
  res.send('hola soy un filter');
});

/* router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'rommel',
    nick: 'jokeda'
  })
}); */



/* router.get('/', (req, res) => {
  const { limit, offset } = req.query;
 
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay paginas que mostrar');
  }
}); */

module.exports = router;

