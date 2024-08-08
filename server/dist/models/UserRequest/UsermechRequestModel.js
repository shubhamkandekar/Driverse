"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var truckDetailsSchema = new _mongoose["default"].Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});
var trailerDetailsSchema = new _mongoose["default"].Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});
var userRequestSchema = new _mongoose["default"].Schema({
  user_id: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  serviceType: {
    type: String,
    required: true
  },
  problemDescription: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    "default": []
  }],
  vehicleType: {
    type: String,
    "enum": ["Truck", "Trailer"],
    required: true
  },
  truckDetails: truckDetailsSchema,
  trailerDetails: trailerDetailsSchema,
  radius: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var UserRequest = _mongoose["default"].model("UserRequest", userRequestSchema);
var _default = exports["default"] = UserRequest;