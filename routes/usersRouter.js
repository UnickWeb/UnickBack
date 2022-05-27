const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/user')
const Product = require('../models/product')

const userExtractor = require('../middleware/userExtractor')

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


router.get('/:id', userExtractor, async (request, response) => {

  const { userId } = request

  //const { id } = request.params;

  try {
    const userFind = await User.findById(userId)
    response.status(200).json(userFind)
  } catch (error) {
    response.status(404).end()
  }

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

  const {
    firstName,
    nickName,
    email,
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
    nickName: nickName,
    email: email,
    passwordHash: password,
    creationDate: new Date(),
    isAdmin: false

  })



  try {

    const savedUser = await newUser.save();


    response.json(savedUser)

  } catch (error) {
    console.log(error);

  }


});

router.put('/adminPermits', userExtractor, (request, response) => {

  //queda para confirmar el token de un usuario
  const { userId } = request

  const { isAdmin, id } = request.body

  const newUserInfo = {
    isAdmin: isAdmin
  }

  User.findByIdAndUpdate(id, newUserInfo, { new: true })
    .then(result => {
      response.json(result)
    })


})


//este metodo se usa en dos llamadas: para la actualizacion de datos, para asignar permisos
router.put('/:id', userExtractor, (request, response) => {

  const { userId } = request
  const user = request.body

  const newUserInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    email: user.email,
    age: user.age,
    gender: user.gender,
    /* isAdmin: user.isAdmin, */

    country: user.country,
    city: user.city,
    address: user.address,
    cp: user.cp,
    phone: user.phone

  }

  User.findByIdAndUpdate(userId, newUserInfo, { new: true })
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
