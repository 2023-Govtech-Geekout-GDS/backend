"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
var cors = require('cors');
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
app.use(cors());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
exports.default = app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});
