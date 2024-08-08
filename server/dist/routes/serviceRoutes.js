"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _serviceController = require("../controllers/serviceController.js");
var _validateMiddleware = require("../middlewares/validateMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/', _validateMiddleware.validateService, _serviceController.createService);
var _default = exports["default"] = router;