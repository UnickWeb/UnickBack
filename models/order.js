const { Schema, model } = require('mongoose');

const orderSchema = new Schema({

   productList: [{
      type: Schema.Types.ObjectId,
      ref: 'ToEdit'
   }],
   orderState: String,
   countItems: Number,
   totalPrice: Number

})

orderSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v

   }
})

const Order = model('Order', orderSchema);

module.exports = Order;
