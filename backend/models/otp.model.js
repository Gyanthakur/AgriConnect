import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10,15}$/,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["login", "verification", "password_reset"],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 2 * 60 * 1000)
    }
});

otpSchema.index({ phone: 1, type: 1 }, { unique: true });

const OTPModel = mongoose.model("OTP", otpSchema);
export default OTPModel;
