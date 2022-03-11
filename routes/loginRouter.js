const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.get('/', async (request, response) => {

});

router.post('/', async (request, response) => {

   const {
      email,
      userPassword
   } = request.body

   const user = await User.findOne({ email });

   //console.log(user);

   const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(userPassword, user.passwordHash)

   if (!(passwordCorrect && user)) {
      response.status(401).send({
         error: 'invalid user or password'
      })
   }

   const userForToken = {
      id: user._id,
      email: user.email
   }

   /*si no posees los envs 
   const token = jwt.sign(userForToken,'unicksecret')
   */

   const token = jwt.sign(userForToken, process.env.SECRETTOKEN)


   response.status(200).send({
      email: user.email,
      token
   }).end()

});


module.exports = router;