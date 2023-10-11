import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, default: null, trim: true },
    email: { type: String, default: null, lowercase: true, trim: true },
    password: { type: String, default: null, trim: true },
    deviceToken: { type: [{ type: String }], default: [] },
    gender: { type: Number, default: 0, enum: [0, 1, 2] },  // 0 = Male || 1 = Female || 2 = Other
    address: { type: String, default: null },
    city: { type: String, default: null },
    businessName: { type: String, default: null },
    postCode: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema);
