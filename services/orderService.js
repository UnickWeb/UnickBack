const axios = require('axios')
const User = require('../models/user')
const Order = require('../models/order');

const {
   PAYPAL_API_CLIENT,
   PAYPAL_API_SECRET,
   PAYPAL_API, HOST } = require('../constants/config')

const createOrder = async (request, response) => {

   const { userId } = request

   const user = await User.findById(userId);

   const {
      productList,
      
      countItems,
      totalPrice
   } = request.body


   try {

      const order = {
         intent: "CAPTURE",
         purchase_units: [

            {
               reference_id: `${productList}`,
               name: "Productos Unick",
               amount: {
                  currency_code: "USD",
                  value: `${totalPrice}`,
               },
               description: `Por la compra de ${countItems} productos`,
            },
         ],

         /*  */
         application_context: {
            brand_name: "UnickCompany.com",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-order`,
         },
      };


      const params = new URLSearchParams()
      params.append("grant_type", "client_credentials")

      const { data: { access_token } } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
         headers: {
            'Content-type': 'application/x-www-form-urlencoded',
         },
         auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
         }
      })

      const respuesta = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
         headers: {
            Authorization: `Bearer ${access_token}`
         }
      })

      /*meto la orden directo tendria que confirmar pero no se como*/

      const newOrder = new Order({
         'productList': productList,
         'countItems': countItems,
         'orderState': 'pending',
         'totalPrice': totalPrice
      })

      const savedOrder = await newOrder.save();
      user.order = user.order.concat(savedOrder._id)
      await user.save()



      console.log(productList, countItems, userId);
      //console.log(respuesta.data);
      response.status(200).send(respuesta.data)



   } catch (error) {

      console.log(error);
      response.status(500).send('algo salio mal')
   }
}





const captureOrder = async (request, response) => {

   const { token } = request.query

   const respuesta = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
         username: PAYPAL_API_CLIENT,
         password: PAYPAL_API_SECRET,
      }
   })

   //console.log(respuesta.data);

   console.log("**********************");
   console.log(respuesta.data.purchase_units[0].reference_id);
   console.log(respuesta.data.purchase_units[0].payments.captures[0].amount.value);


   //prueba si puedo enviar datos
   return response.redirect('http://localhost:3000/orders/checkpay')

}



const cancelOrder = (request, response) => {

   response.redirect('http://localhost:3000/product/products')

}

module.exports = { createOrder, captureOrder, cancelOrder }