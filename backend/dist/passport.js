'use strict';

var _User = require('./models/User');

var _User2 = _interopRequireDefault(_User);

var _passportLocal = require('passport-local');

var _passportNaver = require('passport-naver');

var _passportFacebook = require('passport-facebook');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { naver, facebook } = _config2.default;

module.exports = (app, passport) => {

  app.use(passport.initialize());
  app.use(passport.session());

  /* eslint-disable no-console */
  passport.serializeUser((user, done) => {
    console.log('serialize');
    done(null, user.id);
  });

  passport.deserializeUser((_id, done) => {
    console.log('deserialize');
    _User2.default.findById({ _id }).then(user => done(null, user)).catch(e => done(e, false));
  });
  /* eslint-enable no-console */

  passport.use('local-signup', new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    const {
      name,
      phone,
      postcode,
      address1,
      address2
    } = req.body;

    _User2.default.findOne({ email }).then(user => {
      if (user) {
        done(null, false);
      }
      const newUser = new _User2.default();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.name = name;
      newUser.phone = phone;
      newUser.postcode = postcode;
      newUser.address1 = address1;
      newUser.address2 = address2;
      return newUser.save().then(user => done(null, user)).catch(e => done(e, false));
    }).catch(e => done(e, false));
  }));

  passport.use('local-signin', new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    _User2.default.findOne({ email }).then(user => {
      if (!user) {
        done(null, false);
      } else if (!user.validatePassword(password)) {
        done(null, false);
      } else {

        // else로 감싸지 않으면 done 함수가 두 번 불려지고
        // can't set headers after they're set 에러를 일으킴
        done(null, user);
      }
    }).catch(e => done(e, false));
  }));

  /* naver */
  passport.use('provider:naver', new _passportNaver.Strategy({
    clientID: naver.clientID,
    clientSecret: naver.clientSecret,
    callbackURL: naver.callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    _User2.default.findOne({ 'social.naver.id': profile.id }).then(user => {
      if (!user) {
        const newUser = new _User2.default();
        newUser.social.naver.access_token = accessToken;
        newUser.social.naver.id = profile.id;
        newUser.social.naver.displayName = profile.displayName;
        return newUser.save().then(user => done(null, user)).catch(e => done(e, false));
      } else {
        done(null, user);
      }
    }).catch(e => done(e, false));
  }));

  /* facebook */
  passport.use('provider:facebook', new _passportFacebook.Strategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    _User2.default.findOne({ 'social.facebook.id': profile.id }).then(user => {
      if (!user) {
        const newUser = new _User2.default();
        newUser.social.facebook.access_token = accessToken;
        newUser.social.facebook.id = profile.id;
        newUser.social.facebook.displayName = profile.displayName;
        return newUser.save().then(user => done(null, user)).catch(e => done(e, false));
      } else {
        done(null, user);
      }
    }).catch(e => done(e, false));
  }));
};
//# sourceMappingURL=passport.js.map