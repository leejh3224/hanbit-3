'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { host, redis_conf } = _config2.default;

const RedisStore = require('connect-redis')(_expressSession2.default);
const client = _redis2.default.createClient(redis_conf.port, host);

/* eslint-disable no-console */
client.on('ready', () => {
  console.log('redis client is ready!');
});

client.on('error', err => {
  console.log(err);
});
/* eslint-enable no-console */

// use store to delete session for logout route
const store = exports.store = new RedisStore({
  client,
  prefix: 'session:',
  db: redis_conf.db
});

const sess = {
  store,
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {

    // if true, deserialize user will never be called
    secure: false,
    httpOnly: true,

    // 5 hrs duration
    maxAge: 1000 * 60 * 60 * 50
  }
};

exports.default = sess;
//# sourceMappingURL=sess.js.map