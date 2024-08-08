"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var errorHandler = function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error'
  });
};
var _default = exports["default"] = errorHandler;