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
  review: [String],
  purchase_history: {
    purchased_at: {
      type: Date,
      default: Date.now,
    },
    name: String,
    amount: Number,
    price: Number,
    status: String,
  },
  cart: {
    name: String,
    amount: Number,
    price: Number,
    image: String,
  },
  favorite: {
    name: String,
    price: Number,
    image: String,
  },
}, { timestamps: true })

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(15))
}

User.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', User)
