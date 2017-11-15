import Review from '../../models/Review'
import Product from '../../models/Product'
import User from '../../models/User'

exports.create = (req, res) => {
  const {
    product_id,
    user_id,
    author,
    review_body,
    review_rating,
  } = req.body

  return new Review({
    user_id,
    product_id,
    author,
    review_body,
    review_rating,
  }).save()
  .then(review => {
    return Promise.all([
      Product.findOneAndUpdate({ _id: product_id }, { $push: { review } }),
      User.findOneAndUpdate({ _id: user_id }, { $push: { review: review._id } }),
    ]).then(() => res.json({ review }))
    .catch(err => res.json({ err }))
  })
}

exports.readUserReview = (req, res) => {
  const { userId } = req.params

  return Review.find({ user_id: userId })
  .sort({ "createdAt": -1 })
  .limit(10)
  .then(reviews => res.json({ reviews }))
  .catch(error => res.json(error))
}

exports.update = (req, res) => {
  const {
    product_id,
    review_body,
    review_rating,
  } = req.body
  const { reviewId } = req.params

  // product_id를 키로써 활용
  Review.findOneAndUpdate(
    { review_id: reviewId },
    { 
      review_body,
      review_rating,
      updatedAt: Date.now(),
    },
    { new: true },
  ).then(review => {
    const { review_body, updatedAt, review_rating } = review

    /* 
     * review.$.field => Array에 속한 sub document의 특정 필드를 업데이트
     * 만약 그냥 string value 라면 review.$ => 하면 매칭되는 value가 업데이트됨
     */
    return Product.findOneAndUpdate(
      { _id: product_id, 'review._id': review._id },
      { 
        'review.$.review_body': review_body,
        'review.$.review_rating': review_rating,
        'review.$.updatedAt': updatedAt,
      },
      { new: true },
    ).then(() => res.json({ updated: true }))
    .catch(err => res.json({ err }))
  })
}

exports.delete = (req, res) => {
  const { reviewId } = req.params

  /*
   * User에 저장된 reference, 
   * Product의 sub document, 
   * Review 도큐먼트를 지움
   */
  return Review.findOneAndRemove({ _id: reviewId })
  .then(review => {
    const { _id, user_id, product_id } = review
    return Promise.all([
      User.findOneAndUpdate(
        { _id: user_id },
        { $pull: { review: _id } },
      ),
      Product.findOneAndUpdate(
        { _id: product_id },
        { $pull: { review: { _id } } },
      ),
    ]).then(() => res.json({ removed: true }))
    .catch(error => res.json({ error }))
  })
}