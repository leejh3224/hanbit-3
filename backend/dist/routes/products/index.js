'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

var _product = require('./product.controller');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const csrfProtection = (0, _csurf2.default)({ cookie: true });

router.get('/', (req, res) => {
  res.json({ x: 'x' });
});

router.post('/:id', _product2.default.create);

exports.default = router;
//# sourceMappingURL=index.js.map