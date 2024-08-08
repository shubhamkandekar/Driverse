"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateService = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var serviceSchema = _joi["default"].object({
  serviceType: _joi["default"].string().valid('User', 'Carrier', 'Mechanic', 'Towing').required(),
  name: _joi["default"].string().required(),
  phone: _joi["default"].string().required(),
  email: _joi["default"].string().email().required(),
  companyName: _joi["default"].string().optional(),
  companyAddress: _joi["default"].string().optional()
});
var validateService = exports.validateService = function validateService(req, res, next) {
  var _serviceSchema$valida = serviceSchema.validate(req.body),
    error = _serviceSchema$valida.error;
  if (error) return res.status(400).json({
    error: error.details[0].message
  });
  next();
};