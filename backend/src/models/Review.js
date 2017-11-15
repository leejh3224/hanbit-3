import mongoose from 'mongoose'

const { Schema } = mongoose

const Review = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  review_body: {
    type: String,
    required: true,
  },
  review_rating: {
    type: Number,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Review', Review)
