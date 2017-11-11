'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Schema } = _mongoose2.default;

const User = new Schema({
  email: String,
  password: String,
  displayName: String,
  social: {
    naver: {
      access_token: String,
      id: String,
      displayName: String
    },
    facebook: {
      access_token: String,
      id: String,
      displayName: String
    }
  },
  name: String,
  phone: String,
  postcode: String,
  address1: String,
  address2: String,
  purchase_history: {
    purchased_at: {
      type: Date,
      default: Date.now
    },
    name: String,
    amount: Number,
    price: Number,
    payment_option: String,
    status: String
  },
  cart: {
    name: String,
    amount: Number,
    price: Number,
    thumnail: {
      name: String,
      path: String
    }
  },
  favorite: {
    name: String,
    price: Number,
    thumnail: {
      name: String,
      path: String
    }
  }
}, { timestamps: true });

User.methods.generateHash = function (password) {
  return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(15));
};

User.methods.validatePassword = function (password) {
  return _bcrypt2.default.compareSync(password, this.password);
};

exports.default = _mongoose2.default.model('User', User);
//# sourceMappingURL=User.js.map