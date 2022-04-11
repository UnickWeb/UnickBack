const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const ToEdit = require('../models/toEdit');
const User = require('../models/user');

const userExtractor = require('../middleware/userExtractor')

//trae todos los toEdit
router.get('/', async (request, response) => {

   try {

      const toEdit = await ToEdit.find({}).populate('product', {
         title: 1,
         images: 1,
         price: 1
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




router.post('/', userExtractor, async (request, response) => {

   const { userId } = request

   const toEdit = request.body

   /*    if (!product) {
         return response.status(400).json({
            error: 'content field is missing'
         })
      } */

   const producto = await Product.findById(toEdit.productId);
   const user = await User.findById(userId);

   const newToEdit = new ToEdit({
      user: user._id,
      product: producto._id,
      color: toEdit.color,
      neckType: toEdit.neckType,
      position: toEdit.position,
      proyectName: toEdit.proyectName,
      size: toEdit.size,
      stampingType: toEdit.stampingType,
      updatePrice: toEdit.updatePrice,
      imagesProduct: toEdit.imagesProduct
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





router.get('/:id', userExtractor, async (request, response) => {


   const { userId } = request


   try {
      const userFind = await ToEdit.find({ 'user': userId }).populate('product', {
         title: 1,
         images: 1,
         price: 1
      }).populate('user', {
         firstName: 1,
         nickName: 1
      })


      response.status(200).json(userFind)
   } catch (error) {
      response.status(404).end()
   }

});



module.exports = router;