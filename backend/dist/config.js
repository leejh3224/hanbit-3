'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get env variables
(0, _dotenv.config)();

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
    mongo: {
      uri: process.env.MONGO_URI
    },
    redis_conf: {
      port: 6379,
      db: 0
    },
    naver: {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: '/users/naver/callback'
    },
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/users/facebook/callback'
    }
  },
  development: {},
  production: {
    host: process.env.HOST || 'http://hanbitglasses.com',
    port: process.env.PORT || 8080,
    redis_conf: {
      port: 6379,
      db: 1
    }
  }
};

exports.default = (0, _merge2.default)(config.all, config[config.all.env]);
//# sourceMappingURL=config.js.map