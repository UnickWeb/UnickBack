const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/user')
const Product = require('../models/product')

router.get('/', async (request, response) => {

  try {

    const user = await User.find({}).populate('products', {
      title: 1,
      images: 1
    })

    user
      ? response.json(user)
      : response.json({ message: 'error de no encontrad' })

  } catch (error) {
    console.log(error)
  }

});

router.get('/:id', (request, response, next) => {

  const { id } = request.params;

  User.findById(id)
    .then(user => (
      user
        ? response.json(user)
        : response.status(404).end()
    ))
    .catch(err => {
      console.log(err)
      response.status(500).end()
    })

});

router.delete('/:id', (request, response) => {
  const { id } = request.params;

  User.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err => console.log(err))
});

router.post('/', async (request, response) => {

  const { firstName,
    lastName,
    nickName,
    passwordHash,

  } = request.body


  /*   if (!user) {
      return response.status(400).json({
        error: 'content field is missing'
      })
    } */



  const saltRound = 10;
  const password = await bcrypt.hash(passwordHash, saltRound);

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    nickName: nickName,
    passwordHash: password,
    date: new Date(),

  })



  try {

    const savedUser = await newUser.save();


    response.json(savedUser)

  } catch (error) {
    console.log(error);

  }


});

router.put('/:id', (request, response) => {

  const { id } = request.params
  const user = request.body

  const newUserInfo = {
    name: user.name,
    lastName: user.lastName,
    nickName: user.nickName
  }

  User.findByIdAndUpdate(id, newUserInfo, { new: true })
    .then(result => {
      response.json(result)
    })
})

router.patch('/:id', (request, response) => {

  const { id } = request.params
  const note = request.body
  let olduser

  User.findById(id)
    .then(user => olduser = user)

  const newNoteInfo = { ...olduser, ...note }

  User.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })

});




module.exports = router;
