"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const methods_1 = require("./methods");
const forwardRouter = (0, express_1.Router)();
forwardRouter.get("/hello", methods_1.sayHello);
exports.default = forwardRouter;
