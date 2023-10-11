"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const helper_1 = require("../helper");
const validation = __importStar(require("../validation"));
const routes = express_1.default.Router();
// --signup flow
routes.post('/signUp', validation.signUp, controller_1.userController.signUp);
routes.post('/login', validation.login, controller_1.userController.login);
routes.post('/logout', helper_1.userJwt, validation.logout, controller_1.userController.logOut);
routes.use(helper_1.userJwt);
// --profile flow
routes.get('/get/profile', controller_1.userController.getProfile);
// --chuck-joke flow
routes.get('/api/random/joke', controller_1.userController.chuckJoke);
exports.userRouter = routes;
//# sourceMappingURL=user.js.map