'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _products = require('./routes/products');

var _products2 = _interopRequireDefault(_products);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _passport3 = require('./passport');

var _passport4 = _interopRequireDefault(_passport3);

var _sess = require('./sess');

var _sess2 = _interopRequireDefault(_sess);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use((0, _helmet2.default)());

app.use((0, _morgan2.default)('dev', {
  skip: () => app.get('env') === 'test'
}));

// connect db
(0, _models2.default)();
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)(_sess2.default));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
(0, _passport4.default)(app, _passport2.default);

// Routes
app.use('/users', _users2.default);
app.use('/products', _products2.default);

app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use('', _express2.default.static(_path2.default.join(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../../frontend/build/index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({
    err: err.message
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map