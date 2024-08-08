"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = require("winston");
var logger = (0, _winston.createLogger)({
  level: 'info',
  format: _winston.format.combine(_winston.format.colorize(), _winston.format.timestamp(), _winston.format.printf(function (_ref) {
    var timestamp = _ref.timestamp,
      level = _ref.level,
      message = _ref.message;
    return "".concat(timestamp, " ").concat(level, ": ").concat(message);
  })),
  transports: [new _winston.transports.Console(), new _winston.transports.File({
    filename: 'error.log',
    level: 'error'
  }), new _winston.transports.File({
    filename: 'combined.log'
  })]
});
var _default = exports["default"] = logger;