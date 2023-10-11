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
exports.logout = exports.login = exports.signUp = void 0;
const joi_1 = __importDefault(require("joi"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().error(new Error('name is required!')),
        email: joi_1.default.string().lowercase().required().error(new Error('email is required!')),
        password: joi_1.default.string().trim().required().error(new Error('password is required!')),
        address: joi_1.default.string().required().error(new Error('address is required!')),
        gender: joi_1.default.number().required().error(new Error('gender is required!')),
        businessName: joi_1.default.string().required().error(new Error("businessName is Required!")),
        postCode: joi_1.default.string().required().error(new Error("postCode is Required!")),
        city: joi_1.default.string().required().error(new Error("city isRequired!")),
        phoneNumber: joi_1.default.string().required().error(new Error("phoneNumber is Required!")),
        deviceToken: joi_1.default.array().allow(null, "").error(new Error("Enter your deviceToken!")),
    });
    schema.validateAsync(req.body).then(() => {
        return next();
    }).catch(error => {
        res.status(400).json({ "message": "error", error });
    });
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        email: joi_1.default.string().lowercase().required().error(new Error('email is required!')),
        password: joi_1.default.string().required().error(new Error('password is required!')),
        deviceToken: joi_1.default.array().allow(null, "").error(new Error("Enter your deviceToken!")),
    });
    schema.validateAsync(req.body).then(() => {
        return next();
    }).catch(error => {
        res.status(400).json({ "message": "error", error });
    });
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        deviceToken: joi_1.default.string().error(new Error('deviceToken is string!')),
    });
    schema.validateAsync(req.body).then(() => {
        return next();
    }).catch(error => {
        res.status(400).json({ "message": "error", error });
    });
});
exports.logout = logout;
//# sourceMappingURL=user.js.map