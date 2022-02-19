const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const User = require('../models/user');

router.get('/', async (request, response) => {

  try {

    const product = await Product.find({}).populate('user', {

      firstName: 1,
      nickName: 1
    })
    product
      ? response.json(product)
      : response.json({ message: 'error de no encontrado' })

  } catch {
    (e => console.log(e))
  }

});

router.get('/paginator', paginatedResults(Product), (req, res) => {

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

router.post('/', async (request, response) => {

  const product = request.body
  console.log(typeof product);

  if (!product) {
    return response.status(400).json({
      error: 'content field is missing'
    })
  }

  const user = await User.findById(product.userId);

  const newproduct = new Product({

    title: product.title,
    images: product.images,
    price: product.price,
    description: product.description,
    createdBy: product.createdBy,
    category: product.category,
    user: user._id

  })

  try {

    const savedproduct = await newproduct.save()
    user.products = user.products.concat(savedproduct._id)
    await user.save()

    response.json(savedproduct)

  } catch (error) {
    console.log(error);
  }

});

router.delete('/:id', (request, response) => {
  const { id } = request.params;

  Product.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err => console.log(err))
});


module.exports = router;


