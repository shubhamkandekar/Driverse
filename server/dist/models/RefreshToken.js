"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var refreshTokenSchema = new _mongoose["default"].Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    expires: 604800
  } // Token expires in 1 week
});
var RefreshToken = _mongoose["default"].model('RefreshToken', refreshTokenSchema);
var _default = exports["default"] = RefreshToken;