const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.get('/', async (request, response) => {

});

router.post('/', async (request, response) => {

   const { firstName, password } = request.body

   const user = await User.findOne({ firstName });

   console.log(user);
   const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

   if (!(passwordCorrect && user)) {
      response.status(401).send({
         error: 'invalid user or password'
      })
   }

   const userForToken = {
      id: user._id,
      nickName: user.nickName
   }

   /*si no posees los envs 
   const token = jwt.sign(userForToken,'unicksecret')
   */

   const token = jwt.sign(userForToken, process.env.SECRETTOKEN)


   response.status(200).send({
      nickName: user.nickName,
      fistName: user.firstName,
      token
   })

});


module.exports = router;