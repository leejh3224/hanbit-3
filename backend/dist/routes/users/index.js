'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('./user.controller');

var _user2 = _interopRequireDefault(_user);

var _composeMiddleware = require('compose-middleware');

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const csrfProtection = (0, _csurf2.default)({ cookie: true });

const customCallback = (req, res) => {
  const { passport } = req.session;
  const { email } = req.user;
  const { facebook, naver } = req.user.social;
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 5
  };

  const rightProvider = () => {
    if ((0, _isEmpty2.default)(facebook)) {
      return naver;
    }
    return facebook;
  };

  if (req.user.social) {
    res.cookie('user', `{sid:${passport.user}, user:${email ? email : rightProvider().displayName}}`, cookieOptions);
    res.redirect('/');
  } else {
    res.cookie('user', `{sid:'${passport.user}', user:'${email ? email : rightProvider().displayName}'}`, cookieOptions);
    res.end();
  }
};

const middlewareWithPassport = method => (0, _composeMiddleware.compose)([
//csrfProtection,
_passport2.default.authenticate(method), customCallback]);

router.get('/email/:email', _user2.default.findUserByEmail);

router.post('/signup', middlewareWithPassport('local-signup'));

router.post('/signin', middlewareWithPassport('local-signin'));

router.get('/signup/naver', middlewareWithPassport('provider:naver'));

router.get('/naver/callback', middlewareWithPassport('provider:naver'));

router.get('/signup/facebook', middlewareWithPassport('provider:facebook'));

router.get('/facebook/callback', middlewareWithPassport('provider:facebook'));

router.get('/logout', _user2.default.logout);

exports.default = router;
//# sourceMappingURL=index.js.map