import Product from '../../models/Product'
import Review from '../../models/Review'

exports.create = (req, res) => {
  const {
    name,
    category,
    image,
    description,
    brand,
    stock_keeping_unit,
    options,
    aggregate_rating,
    review,
    low_price,
    high_price,
    promotions,
    related,
  } = req.body
  return new Product({
    name,
    category,
    image,
    description,
    brand,
    stock_keeping_unit,
    options,
    aggregate_rating,
    review,
    low_price,
    high_price,
    promotions,
    related,
  }).save().then(product => res.json({ product }))
  .catch(error => res.json({ error }))
}

exports.readMany = (req, res) => {
  const { limit } = req.params

  return Product.find()
  .sort({ "createdAt": -1 })
  .limit(parseInt(limit, 10))
  .then(products => res.json({ products }))
  .catch(error => res.json({ error }))
}

exports.read = (req, res) => {
  const { productId } = req.params
  
  return Product.findOne({ _id: productId })
  .then(product => res.json({ product }))
  .catch(error => res.json({ error }))
}

exports.update = (req, res) => {
  const { productId } = req.params
  const {
    name,
    category,
    image,
    description,
    brand,
    stock_keeping_unit,
    options,
    aggregate_rating,
    review,
    low_price,
    high_price,
    promotions,
    related,
  } = req.body

  return Product.findByIdAndUpdate(productId,
  {
    name,
    category,
    image,
    description,
    brand,
    stock_keeping_unit,
    options,
    aggregate_rating,
    review,
    low_price,
    high_price,
    promotions,
    related,
  }).then(() => res.json({ updated: true }))
  .catch(error => res.json({ error }))
}

exports.delete = (req, res) => {
  const { productId } = req.params

  // embeded review 도큐먼트와 Review 도큐먼트 모두를 지움
  return Product.findOneAndRemove({ _id: productId })
  .then(product => {
    const { review } = product
    return Review.findOneAndRemove({ _id: review._id })
    .then(() => res.json({ removed: true }))
    .catch(error => res.json({ error }))
  })
}