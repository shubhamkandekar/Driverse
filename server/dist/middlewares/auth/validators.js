"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserSignup = void 0;
var _expressValidator = require("express-validator");
var validateUserSignup = exports.validateUserSignup = [(0, _expressValidator.body)('username').notEmpty().withMessage('Username is required'), (0, _expressValidator.body)('email').isEmail().withMessage('Invalid email address'), (0, _expressValidator.body)('password').isLength({
  min: 6
}).withMessage('Password must be at least 6 characters'), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
}];