"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserMechRequest = _interopRequireDefault(require("../../controllers/Requests/UserMechRequest.js"));
var _UserTowRequest = _interopRequireDefault(require("../../controllers/Requests/UserTowRequest.js"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// POST Request To Take the Service
// Multer setup for handling file uploads
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});

// POST Request To Take the Service
router.post('/userMechRequest', upload.array('images', 10), _UserMechRequest["default"]);
router.post('/userTowRequest', upload.array('images', 10), _UserTowRequest["default"]);
var _default = exports["default"] = router;