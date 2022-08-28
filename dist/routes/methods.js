"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
async function sayHello(req, res) {
    res.status(200).json({ title: "Hello World" });
}
exports.sayHello = sayHello;
