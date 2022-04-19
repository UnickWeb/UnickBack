const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/user')
const Product = require('../models/product')

const userExtractor = require('../middleware/userExtractor');
const Order = require('../models/order');

const { createOrder, cancelOrder, captureOrder } = require('../services/orderService');


router.get('/', async (request, response) => {

   try {

      const order = await Order.find({})
         .populate({
            path: 'productList',
            model: 'ToEdit',
            populate: [
               { path: 'user', model: 'User', select: 'email', },
               { path: 'product', model: 'Product', select: 'price' }
            ]
         })

      order
         ? response.json(order)
         : response.json({ message: 'error de no encontrado' })

   } catch {
      (e => console.log(e))
   }


})

/*aqui es la funcion de ordenes de cada cliente */
router.get('/clients/ordersBy', userExtractor, async (request, response) => {

   const { userId } = request
   console.log(userId);

   try {

      const userOrder = await User.findById(userId)
         .select({
            nickName: 1,
            email: 1
         })
         .populate({
            path: 'order',
            model: 'Order',
            populate: [{
               path: 'productList',
               model: 'ToEdit',
               /* select:{
   
               } */
            }]
         })

      userOrder
         ? response.json(userOrder)
         : response.json({ message: 'error de no encontrado' })

      response.status(200).send(userOrder)

   } catch (error) {

      console.log(error)

   }
})


router.post('/report/:idorder', userExtractor, async (request, response) => {

   const idOrder = request.params.idorder
   const { userId } = request



   console.log(userId);
   /*Aqui iria la busqueda a la orden de compra */


   try {
      const order = await Order.findById(idOrder)
         .populate({
            path: 'productList',
            model: 'ToEdit',
            populate: [{
               path: 'user',
               model: 'User',
               select: {
                  'firstName': 1,
                  'lastName': 1,
                  'email': 1,
                  'nickName': 1,
                  'country': 1,
                  'city': 1,
                  'address': 1,
                  'cp': 1,
                  'phone': 1,
               }
            },

            { path: 'product', model: 'Product', select: 'price' }
            ]
         })

      order
         ? response.json(order)
         : response.json({ message: 'error de no encontrado' })

      response.status(200).send(order)

   } catch (error) {
      console.log(error)

   }


})


router.post('/', userExtractor, async (request, response) => {

   const { userId } = request

   const user = await User.findById(userId);

   const {
      myNewOrder
   } = request.body

   //falta agregar algnos valores entre estos el valor final a pagar
   const newOrder = new Order({
      'myNewOrder': myNewOrder
   })


   try {

      const savedOrder = await newOrder.save();
      user.order = user.order.concat(savedOrder._id)
      await user.save()

      response.status(200).json(savedOrder)



   } catch (error) {
      console.log(error);

   }

});


//crear una ruta path para modificar el estado de la orden 
router.put('/changeState/:idorder', userExtractor, async (request, response) => {

   const idOrder = request.params.idorder
   const { userId } = request

   const order = request.body

   console.log(userId);


   try {

      const newStateOrder = {
         orderState: order.orderState

      }

      const newOrderState = await Order.findByIdAndUpdate(idOrder, newStateOrder, { new: true })

      response.status(201).send(newOrderState)


   } catch (error) {
      console.log(error);
   }


})



//con estas tres rutas tengo que poder implementar el pago mediante paypal 
router.post('/create-order', userExtractor, createOrder)

router.get('/capture-order', captureOrder)

router.get('/cancel-order', cancelOrder)



module.exports = router;


//necesito una funcion que me permita obtener las ordenes de cada usuario
//despues obtener los datos de cada orden
//formar la tabla
//y de cada orden obtener el reporte de compra usando el id de cada orden 