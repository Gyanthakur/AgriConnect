import UserModel from "../models/user.model.js";
import validator from "validator";
import CropModel from "../models/crop.model.js";
import { v2 as cloudinary } from "cloudinary";
export const getUserDetail = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id)
            .select("-password")
            .lean()
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
            phone,
            email,
            firstName,
            lastName,
            aadharId,
            farmerId,
            address,
            gender,
            dob,
            image,
        } = req.body;

        if (phone) {
            return res.status(400).json({ success: false, message: "Phone number cannot be updated" });
        }

        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (firstName && (firstName.length < 2 || firstName.length > 30)) {
            return res.status(400).json({ success: false, message: "First name must be between 2 and 30 characters" });
        }
        if (lastName && (lastName.length < 2 || lastName.length > 30)) {
            return res.status(400).json({ success: false, message: "Last name must be between 2 and 30 characters" });
        }

        if (aadharId && !/^[0-9]{12}$/.test(aadharId)) {
            return res.status(400).json({ success: false, message: "Invalid Aadhar ID format" });
        }

        const validGenders = ["Male", "Female", "Other", "Not Selected"];
        if (gender && !validGenders.includes(gender)) {
            return res.status(400).json({ success: false, message: "Invalid gender" });
        }

        if (dob && isNaN(Date.parse(dob))) {
            return res.status(400).json({ success: false, message: "Invalid Date of Birth" });
        }

        let updateData = {};
        if (email !== undefined) updateData.email = email;
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (aadharId !== undefined) updateData.aadharId = aadharId;
        if (farmerId !== undefined) updateData.farmerId = farmerId;
        if (gender !== undefined) updateData.gender = gender;
        if (dob !== undefined) updateData.dob = dob;
        if (image !== undefined) updateData.image = image;
        const addressUpdate = {};
        if (address) {
            const { line, city, state, zip, country } = address;
            if (zip && !/^\d{5,10}$/.test(zip)) {
                return res.status(400).json({ success: false, message: "Invalid ZIP format" });
            }
            if (line !== undefined) addressUpdate["address.line"] = line;
            if (city !== undefined) addressUpdate["address.city"] = city;
            if (state !== undefined) addressUpdate["address.state"] = state;
            if (zip !== undefined) addressUpdate["address.zip"] = zip;
            if (country !== undefined) addressUpdate["address.country"] = country;
            updateData = {
                ...updateData,
                ...addressUpdate,
            };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id;
        const user = await UserModel.findById(id)
            .select("name email phoneNumber firstName lastName profileImage verified image")
            .lean()
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: {
                ...user,
                isAuthorized: userId === id ? true : false,
            }
        });
    } catch (error) {

    }
}

export const getAllUsers = async (req, res) => {
    try {
        const userId = req.user?._id;
        const users = await UserModel.find({})
            .select("name email phoneNumber firstName lastName profileImage verified image")
            .sort({ createdAt: -1 })
            .lean()

        users.forEach((user) => {
            user.isAuthorized = userId && userId.toString() === user._id.toString() ? true : false;
        });
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getFarmers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const userId = req.user?._id;
        const userWhoSellCrops = await CropModel.find({})
            .select("user")
        const ids = userWhoSellCrops.map((user) => user.user)
        const users = await UserModel.find({ _id: { $in: ids } })
            .select("name email phoneNumber firstName lastName profileImage verified image")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()
        users.forEach((user) => {
            user.isAuthorized = userId && userId.toString() === user._id.toString() ? true : false;
        });
        const totalUsers = await UserModel.countDocuments({ _id: { $in: ids } });
        return res.status(200).json({
            success: true,
            message: "Farmer details fetched successfully",
            data: {
                users,
                page: parseInt(page),
                limit: parseInt(limit),
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const updateProfileImage = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }
        const img = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image",
        })
        const imgUrl = img.secure_url
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { image: imgUrl },
            { new: true, runValidators: true }
        ).select("-password")
            .lean();
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            message: "Profile image updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}