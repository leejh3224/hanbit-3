'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { port } = _config2.default;

_app2.default.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
//# sourceMappingURL=index.js.map