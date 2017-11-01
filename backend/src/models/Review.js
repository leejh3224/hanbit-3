import mongoose from 'mongoose'

const { Schema } = mongoose

const Review = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Review', Review)
