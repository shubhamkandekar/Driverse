"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var serviceSchema = new Schema({
  serviceType: {
    type: String,
    "enum": ['User', 'Carrier', 'Mechanic', 'Towing'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: false
  },
  companyAddress: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
var Service = _mongoose["default"].model('Service', serviceSchema);
var _default = exports["default"] = Service;