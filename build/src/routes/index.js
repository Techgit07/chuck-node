"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const common_1 = require("../common");
const routes = express_1.default.Router();
exports.routes = routes;
const accessControl = (req, res, next) => {
    req.headers.userType = common_1.userStatus[req.originalUrl.split('/')[1]];
    next();
};
routes.use('/user', accessControl, user_1.userRouter);
//# sourceMappingURL=index.js.map