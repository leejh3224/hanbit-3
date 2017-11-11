'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { uri } = _config2.default.mongo;

const connectDB = () => {

  /* use promise for mongoose */
  _mongoose2.default.Promise = global.Promise;

  /* eslint-disable no-console */
  return _mongoose2.default.connect(uri, {
    useMongoClient: true
  }).then(() => console.log(`connected to db!`)).catch(e => console.log(e));
  /* eslint-enable no-console */
};

exports.default = connectDB;
//# sourceMappingURL=index.js.map