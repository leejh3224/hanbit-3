'use strict';

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _sess = require('../../sess');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.findUserByEmail = (req, res) => {
  const { email } = req.params;

  return _User2.default.findOne({ email }).then(user => {
    if (!user) {
      res.json({ available: true });
    } else {
      res.json({ available: false });
    }
  });
};

exports.logout = (req, res) => {
  console.log(req, res);
  if (!req.sessionID) {
    res.redirect('/');
  }
  _sess.store.destroy(req.sessionID, () => {
    res.clearCookie('user');
    req.session.destroy(() => {
      console.log('bbbbbb');
      res.redirect('/');
    });
  });
};
//# sourceMappingURL=user.controller.js.map