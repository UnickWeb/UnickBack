const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  passwordHash: String,
  email: String,
  creationDate: Date,
  age: Number,
  gender: String,

  country: String,
  city: String,
  address: String,
  cp: String,
  phone: String,

  isAdmin: Boolean,

  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  toEdit: [{
    type: Schema.Types.ObjectId,
    ref: 'ToEdit'
  }],
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema);

module.exports = User;
