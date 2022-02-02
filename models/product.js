const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  title: String,
  images: [String],
  price: Number,
  description: String,
  createdBy: String,
  category: String

})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
