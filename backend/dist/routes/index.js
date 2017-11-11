'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = _express2.default.Router();

const storage = _multer2.default.diskStorage({
  destination: '../frontend/src/static/',
  filename: (req, file, cb) => {
    _crypto2.default.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + '.' + _mimeTypes2.default.extension(file.mimetype));
    });
  }
});

const upload = (0, _multer2.default)({ storage });
routes.post('/', upload.single('img'), (req, res) => {
  res.send('success');
});

exports.default = routes;
//# sourceMappingURL=index.js.map