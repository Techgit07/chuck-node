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
exports.logOut = exports.chuckJoke = exports.getProfile = exports.login = exports.signUp = void 0;
const database_1 = require("../../database");
const config_1 = __importDefault(require("config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config_1.default.get('jwt_token_secret');
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    try {
        let existingMail = yield database_1.userModel.findOne({ email: body.email, isActive: true });
        if (!existingMail) {
            const salt = yield bcryptjs_1.default.genSaltSync(8);
            const hashPassword = yield bcryptjs_1.default.hash(body.password, salt);
            body.password = hashPassword;
            let response = yield database_1.userModel.create(body);
            if (response) {
                const token = jsonwebtoken_1.default.sign({
                    _id: response._id,
                    status: "Login",
                    generatedOn: (new Date().getTime())
                }, jwt_token_secret);
                return res.status(200).send({ "message": "userData add successfully", body, token });
            }
            else {
                return res.status(403).send({ "message": "bad request" });
            }
        }
        else {
            return res.status(409).send({ "message": "email already register" });
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({ "error": "internal server error" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = yield req.body, { user } = req.headers;
    try {
        let response = yield database_1.userModel.findOne({ email: body.email, isActive: true });
        console.log("----loginRes", response);
        if (!response) {
            return res.status(403).json({ "message": "invalid mail" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(body.password, response.password);
        if (!passwordMatch) {
            return res.status(403).json({ "message": "invalid email or Password" });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: response._id,
            status: "Login",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret);
        yield response.save();
        response = { response, token };
        return res.status(200).json({ "message": "login success", response, token });
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({ "message": 'internal server error' });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user } = req.headers, body = req.body;
    try {
        let response = yield database_1.userModel.findOne({ _id: new ObjectId(user === null || user === void 0 ? void 0 : user._id), isActive: true });
        if (response) {
            return res.status(200).json({ "message": 'profile get success!', response });
        }
        else {
            return res.status(404).json({ "message": 'profile not found' });
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({ "message": 'internal server error' });
    }
});
exports.getProfile = getProfile;
const chuckJoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user } = req.headers;
    try {
        let response = yield database_1.userModel.findOne({ _id: new ObjectId(user === null || user === void 0 ? void 0 : user._id), isActive: true });
        if (response) {
            const chuckNorrisApiResponse = yield axios.get('https://api.chucknorris.io/jokes/random');
            const joke = chuckNorrisApiResponse.data.value;
            res.json({ joke });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch Chuck Norris joke' });
    }
});
exports.chuckJoke = chuckJoke;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { user } = req.headers;
    try {
        let response = yield database_1.userModel.updateOne({ _id: new ObjectId(user === null || user === void 0 ? void 0 : user._id), isActive: true }, { $pull: { deviceToken: { $in: [(_a = req.body) === null || _a === void 0 ? void 0 : _a.deviceToken] } } });
        console.log(response);
        if (response) {
            return res.status(200).send({ error: 'logout success!', response });
        }
    }
    catch (error) {
        return res.status(500).send({ error: 'internal server error' });
    }
});
exports.logOut = logOut;
//# sourceMappingURL=user.js.map