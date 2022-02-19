const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  passwordHash: String,
  date: Date,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  toEdit: [{
    type: Schema.Types.ObjectId,
    ref: 'ToEdit'
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
