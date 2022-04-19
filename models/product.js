const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  /* id: Number, */
  title: String,
  images: [String],
  price: Number,
  description: String,
  createdBy: String,
  category: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

})
  
productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

  }
})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
