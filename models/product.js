const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: String,


})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
