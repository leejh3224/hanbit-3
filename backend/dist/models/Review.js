'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Schema } = _mongoose2.default;

const Review = new Schema({
  displayName: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, { timestamps: true });

exports.default = Review;
//# sourceMappingURL=Review.js.map