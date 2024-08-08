"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _helmet = _interopRequireDefault(require("helmet"));
var _morgan = _interopRequireDefault(require("morgan"));
var _db = _interopRequireDefault(require("./config/db.js"));
var _serviceRoutes = _interopRequireDefault(require("./routes/serviceRoutes.js"));
var _errorMiddleware = _interopRequireDefault(require("./middlewares/errorMiddleware.js"));
var _rateLimiter = require("./middlewares/rateLimiter.js");
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _UserServicereqRoute = _interopRequireDefault(require("./routes/Requests/UserServicereqRoute.js"));
var _colors = _interopRequireDefault(require("colors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
(0, _db["default"])();
var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])('common'));
app.use(_express["default"].json());
app.use('/api/', _rateLimiter.apiLimiter);
//authRoutes
app.use('/api/v1/auth', _authRoutes["default"]);

// Use the user request routes
app.use('/api/v1', _UserServicereqRoute["default"]);

//Service Route
app.use('/api/services', _serviceRoutes["default"]);
app.use(_errorMiddleware["default"]);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT).bgYellow.white);
});