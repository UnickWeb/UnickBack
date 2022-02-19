const { Schema, model } = require('mongoose');

const toEditSchema = new Schema({

   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
   }

})

toEditSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v

   }
})

const ToEdit = model('ToEdit', toEditSchema);

module.exports = ToEdit;
