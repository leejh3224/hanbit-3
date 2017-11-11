'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Review = require('./Review');

var _Review2 = _interopRequireDefault(_Review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Schema } = _mongoose2.default;

const Picture = new Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

const Product = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumnail: [Picture],
  pictures: [Picture],
  promotions: [{
    name: String,
    period: String
  }],
  information: {
    type: String,
    required: true
  },
  reviews: [_Review2.default],
  related: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    thumnail: [Picture]
  }],
  status: {
    type: String,
    enum: ['NEW', 'HOT', 'SALE', null],
    default: null
  }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Product', Product);
//# sourceMappingURL=Product.js.map