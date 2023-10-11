"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const database_1 = require("../database");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const jwt_token_secret = config_1.default.get('jwt_token_secret');
const userJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { authorization } = req.headers, result;
    if (authorization) {
        try {
            let isVerifyToken = jsonwebtoken_1.default.verify(authorization, jwt_token_secret);
            result = yield database_1.userModel.findOne({ _id: new ObjectId(isVerifyToken._id), isActive: true });
            if ((result === null || result === void 0 ? void 0 : result.isActive) == true) {
                req.headers.user = result;
                return next();
            }
            else {
                return res.status(401).json({ "message": 'invalid token' });
            }
        }
        catch (err) {
            if (err.message == "invalid signature")
                return res.status(403).json({ "message": 'different token' });
            console.log(err);
            return res.status(401).json({ "message": 'invalid token' });
        }
    }
    else {
        return res.status(404).json({ "message": 'token not found' });
    }
});
exports.userJwt = userJwt;
//# sourceMappingURL=jwt.js.map