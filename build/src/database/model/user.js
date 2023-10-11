"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, default: null, trim: true },
    email: { type: String, default: null, lowercase: true, trim: true },
    password: { type: String, default: null, trim: true },
    deviceToken: { type: [{ type: String }], default: [] },
    gender: { type: Number, default: 0, enum: [0, 1, 2] },
    address: { type: String, default: null },
    city: { type: String, default: null },
    businessName: { type: String, default: null },
    postCode: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.userModel = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=user.js.map