import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const User = new Schema({
  email: String,
  password: String,
  displayName: String,
  social: {
    naver: {
      access_token: String,
      id: String,
      displayName: String,
    },
    facebook: {
      access_token: String,
      id: String,
      displayName: String,
    }
  },
  name: String,
  phone: String,
  postcode: String,
  address1: String,
  address2: String,
  purchase_history: {
    purchased_at: {
      type: Date,
      default: Date.now,
    },
    name: String,
    amount: Number,
    price: Number,
    payment_option: String,
    status: String,
  },
  cart: {
    name: String,
    amount: Number,
    price: Number,
    thumnail: {
      name: String,
      path: String,
    },
  },
  favorite: {
    name: String,
    price: Number,
    thumnail: {
      name: String,
      path: String,
    },
  },
}, { timestamps: true })

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

User.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', User)
