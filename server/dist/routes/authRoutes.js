"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/authController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import { validateUserSignup } from '../middlewares/auth/validators.js';

var router = _express["default"].Router();
router.post('/register', _authController.registerUser);
router.post('/login', _authController.authUser);
router.post('/logout', _authController.logoutUser);
router.post('/initiate-password-reset', _authController.initiatePasswordReset);
router.post('/verify-otp', _authController.verifyOtp);
router.post('/reset-password', _authController.resetPassword);
var _default = exports["default"] = router;