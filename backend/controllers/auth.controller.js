import validator from "validator";
import OTPModel from "../models/otp.model.js";
import UserModel from "../models/user.model.js";
import { generateOTP, sendOTP } from "../utils/otpUtils.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/jwt.js";
export const sendRegistrationOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is Required" });
        }
        if (!validator.isMobilePhone(phone, "en-IN")) {
            return res.status(400).json({ success: false, message: "Invalid phone number" });
        }
        const existingFarmer = await UserModel.findOne({
            phone
        });
        if (existingFarmer) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }
        const existingOTP = await OTPModel.findOne({ phone, type: "register" });
        if (existingOTP && existingOTP.expiresAt > new Date()) {
            const timeLeft = Math.ceil((existingOTP.expiresAt - new Date()) / 1000);
            return res.status(429).json({
                success: false,
                message: `Please wait ${timeLeft} seconds before requesting another OTP.`,
            });
        }
        const otpCode = generateOTP();
        const otpSent = await sendOTP(phone, otpCode);
        if (!otpSent) {
            return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again later." });
        }
        await OTPModel.findOneAndUpdate(
            { phone, type: "register" },
            { otp: otpCode, expiresAt: new Date(Date.now() + 2 * 60 * 1000) },
            { upsert: true, new: true }
        );
        res.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.error("OTP request error:", error.stack);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const verifyRegistrationOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone | !otp) {
            return res.status(400).json({ success: false, message: "Phone Number and OTP is required" });
        }
        if (!validator.isMobilePhone(phone, "en-IN")) {
            return res.status(400).json({ success: false, message: "Invalid phone number" });
        }
        const otpRecord = await OTPModel.findOne({ phone, type: "register" });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            await OTPModel.deleteOne({ phone, type: "register" });
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }
        const existingFarmer = await UserModel.findOne({ phone });
        if (existingFarmer) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }
        const randomPassword = crypto.randomBytes(6).toString("hex");
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const newFarmer = await UserModel.create({
            phone,
            password: hashedPassword,
        });
        const token = generateJWT({ id: newFarmer._id }, process.env.JWT_SECRET);
        await OTPModel.deleteOne({ phone, type: "register" });
        res.json({
            success: true,
            message: "Registration successful",
            token,
        });
    } catch (error) {
        console.error("Registration error:", error.stack);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export const sendLoginOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        // Validate phone number
        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is Required" });
        }
        if (!validator.isMobilePhone(phone, "en-IN")) {
            return res.status(400).json({ success: false, message: "Invalid phone number" });
        }
        // Check if the farmer exists
        const farmer = await UserModel.findOne({ phone });
        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer not found" });
        }
        // Check if an OTP already exists and is still valid
        const existingOTP = await OTPModel.findOne({ phone, type: "login" });
        if (existingOTP && existingOTP.expiresAt > new Date()) {
            const timeLeft = Math.ceil((existingOTP.expiresAt - new Date()) / 1000);
            return res.status(429).json({
                success: false,
                message: `Please wait ${timeLeft} seconds before requesting another OTP.`,
            });
        }
        // Generate OTP
        const otpCode = generateOTP();
        // Send the otp
        const otpSent = await sendOTP(phone, otpCode);
        if (!otpSent) {
            return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again later." });
        }
        // Save OTP in the database only if sent successfully
        await OTPModel.findOneAndUpdate(
            { phone, type: "login" },
            { otp: otpCode, expiresAt: new Date(Date.now() + 2 * 60 * 1000) },
            { upsert: true, new: true }
        );
        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const verifyLoginOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
            return res.status(400).json({ success: false, message: "Phone and OTP are required" });
        }
        if (!validator.isMobilePhone(phone, "en-IN")) {
            return res.status(400).json({ success: false, message: "Invalid phone number" });
        }
        const otpRecord = await OTPModel.findOne({ phone, type: "login" });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }
        const farmer = await UserModel.findOne({ phone });
        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer not found" });
        }
        // Generate JWT token using utility function
        const token = generateJWT({ id: farmer._id }, process.env.JWT_SECRET);
        if (!token) {
            return res.status(500).json({ success: false, message: "Failed to generate token" });
        }
        await OTPModel.deleteOne({ phone }); // Delete OTP record after successful verification
        res.json({ success: true, token, message: "OTP verified successfully", token });
    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}