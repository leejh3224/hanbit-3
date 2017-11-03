import mongoose from 'mongoose'
import Review from './Review'

const { Schema } = 'mongoose'

const Product = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumnail: {
    name: String,
    path: String,
    required: true,
  },
  pictures: [{ name: String, path: String }],
  information: {
    type: String,
    required: true,
  },
  reviews: [Review],
  related: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumnail: { name: String, path: String, required: true },
  },
  status: {
    type: String,
    enum: ['NEW', 'HOT', 'SALE', null],
    default: null,
  }
}, { timestamps: true })

export default mongoose.model('Product', Product)