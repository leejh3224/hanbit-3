import mongoose from 'mongoose'
import Review from './Review'

const { Schema } = mongoose

const Product = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  // Image path
  image: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock_keeping_unit: {
    type: Number,
    required: true,
  },
  aggregate_rating: {
    rating_value: Number,
    rating_count: Number,
  },
  review: [Review],
  low_price: {
    type: Number,
  },
  high_price: {
    type: Number,
  },
  promotions: {
    name: {
      type: String,
    },
    available_until: {
      type: String,
    },
  },
  related: [{
    name: { 
      type: String, 
    },
    low_price: {
      type: Number,
    },
    high_price: {
      type: Number,
    },
    promotions: {
      name: {
        type: String,
      },
      available_until: {
        type: String,
      },
    },
    image: [{
      type: String,
    }],
  }],
}, { timestamps: true })

export default mongoose.model('Product', Product)