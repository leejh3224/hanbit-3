import mongoose from 'mongoose'

const { Schema } = mongoose

const Review = new Schema({
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

export default Review
