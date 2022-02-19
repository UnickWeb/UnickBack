const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const ToEdit = require('../models/toEdit');
const User = require('../models/user');

router.get('/', async (request, response) => {

   try {

      const toEdit = await ToEdit.find({}).populate('product', {
         title: 1,
         images: 1
      }).populate('user', {
         firstName: 1,
         nickName: 1
      })

      toEdit
         ? response.json(toEdit)
         : response.json({ message: 'error de no encontrad' })

   } catch (error) {
      console.log(error)
   }

});

router.post('/', async (request, response) => {

   const toEdit = request.body

   /*    if (!product) {
         return response.status(400).json({
            error: 'content field is missing'
         })
      } */

   const producto = await Product.findById(toEdit.productId);
   const user = await User.findById(toEdit.userId);

   const newToEdit = new ToEdit({

      user: user._id,
      product: producto._id

   })

   try {

      const savedToEdit = await newToEdit.save()

      user.toEdit = user.toEdit.concat(savedToEdit._id)

      await user.save()

      response.json(savedToEdit)

   } catch (error) {
      console.log(error);
   }



});


module.exports = router;