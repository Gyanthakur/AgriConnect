import CropModel from "../models/crop.model.js";
import { validateCropInput } from "../utils/validator.js";

export const addCrop = async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            quantity,
            unit = "kg",
            description = "",
            images = [],
            expiryDate,
            dispatchTime = 1,
            isOrganic = false,
            tags = [],
            isArchived,
            harvestDate,
        } = req.body;
        const validation = validateCropInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message });
        }
        const newCrop = new CropModel({
            user: req.user?._id,
            name: name.trim(),
            category: category.trim(),
            price,
            quantity,
            unit,
            description: description.trim(),
            images,
            harvestDate: harvestDate ? new Date(harvestDate) : undefined,
            expiryDate: expiryDate ? new Date(expiryDate) : undefined,
            dispatchTime,
            isOrganic,
            tags,
            isArchived: isArchived || false,
        });
        const savedCrop = await newCrop.save();
        return res.status(201).json({ success: true, message: "Successfully added crop", data: savedCrop });
    } catch (error) {
        console.error("Error registering crop:", error);
        return res.status(500).json({ success: false, message: "Failed to register crop" });
    }
};

export const updateCrop = async (req, res) => {
    try {
        const cropId = req.params.id;
        const updates = req.body;
        const userId = req.user?._id;
        const crop = await CropModel.findOne({ _id: cropId, user: userId });
        if (!crop) {
            return res.status(404).json({ success: false, message: "Crop not found or unauthorized" });
        }
        const allowedFields = [
            "name",
            "category",
            "price",
            "quantity",
            "unit",
            "description",
            "images",
            "expiryDate",
            "dispatchTime",
            "isOrganic",
            "tags",
            "isArchived",
            "harvestDate"
        ];

        const updateData = {};
        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                updateData[field] = updates[field];
            }
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, message: "No valid fields to update" });
        }
        const validation = validateCropInput(updateData);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message });
        }
        const updatedCrop = await CropModel.findByIdAndUpdate(cropId, { $set: updateData }, { new: true });
        return res.status(200).json({ success: true, message: "Crop updated successfully", data: updatedCrop });
    } catch (error) {
        console.error("Error updating crop:", error);
        return res.status(500).json({ success: false, message: "Failed to update crop" });
    }
};

export const deleteCrop = async (req, res) => {
    try {
        const cropId = req.params.id;
        const userId = req.user?._id;
        const deletedCrop = await CropModel.findOneAndDelete({ _id: cropId, user: userId });
        if (!deletedCrop) {
            return res.status(404).json({ success: false, message: "Crop not found" });
        }
        return res.status(200).json({ success: true, message: "Crop deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to delete crop" });
    }
}

export const getAllCrops = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { page = 1, limit = 30 } = req.query;
        const { search } = req.query;
        const skip = (page - 1) * limit;
        const queryObj = {}
        if (search) {
            queryObj.$or = [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ]
        }
        const crops = await CropModel.find({ ...queryObj })
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image",
                model: "User",
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();

        const totalCrops = await CropModel.countDocuments({ ...queryObj });
        const modifiedCrops = crops.map(crop => {
            const isUserCrop = userId && crop.user._id.toString() === userId.toString() ? true : false;
            return {
                ...crop,
                isUserCrop
            };
        });
        return res.status(200).json({
            success: true, data: {
                crops: modifiedCrops,
                totalCrops,
                totalPages: Math.ceil(totalCrops / limit),
                currentPage: parseInt(page, 10),
            }
        });
    } catch (error) {
        console.error("Error fetching crops:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch crops" });
    }
};

export const getUserCrops = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const crops = await CropModel.find({ user: userId })
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image",
                model: "User",
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
        const totalCrops = await CropModel.countDocuments({ user: req.user?._id });
        const modifiedCrops = crops.map(crop => {
            return {
                ...crop,
                isUserCrop: true
            };
        });
        return res.status(200).json({
            success: true, data: {
                crops: modifiedCrops,
                totalCrops,
                totalPages: Math.ceil(totalCrops / limit),
                currentPage: parseInt(page, 10),
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch crops" });
    }
}

export const getCropById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    try {
        const crop = await CropModel.findById(id)
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image",
                model: "User",
            }).lean();
        if (!crop) {
            return res.status(404).json({ success: false, message: "Crop not found" });
        }
        const modifiedCrop = {
            ...crop,
            isUserCrop: userId && crop.user._id.toString() === userId.toString() ? true : false
        };
        return res.status(200).json({ success: true, message: "fetched crop successfully", data: modifiedCrop });

    } catch (error) {
        console.error("Error fetching crop:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch crop" });
    }
}

export const getCropsByUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const crops = await CropModel.find({ user: id })
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image",
                model: "User",
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
        const totalCrops = await CropModel.countDocuments({ user: id });
        const modifiedCrops = crops.map(crop => {
            const isUserCrop = userId && crop.user._id.toString() === userId.toString() ? true : false;
            return {
                ...crop,
                isUserCrop
            };
        });
        return res.status(200).json({
            success: true, message: "fetched cropz successfully", data: {
                crops: modifiedCrops,
                totalCrops,
                totalPages: Math.ceil(totalCrops / limit),
                currentPage: parseInt(page, 10),
            }
        });

    } catch (error) {
        console.error("Error fetching crops:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch crops" });
    }
}

export const searchCrops = async (req, res) => {
    const { search } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    if (!search) {
        return res.status(400).json({ success: false, message: "Query is required" });
    }
    try {
        const userId = req.user?._id;
        const crops = await CropModel.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ]
        }).populate({
            path: "user",
            select: "name email phoneNumber firstName lastName profileImage verified image",
            model: "User",
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
        const modifiedCrops = crops.map(crop => {
            const isUserCrop = userId && crop.user._id.toString() === userId.toString() ? true : false;
            return {
                ...crop,
                isUserCrop
            };
        });
        const totalCrops = await CropModel.countDocuments({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } }
            ]
        });

        return res.status(200).json({
            success: true, data: {
                crops: modifiedCrops,
                totalCrops,
                totalPages: Math.ceil(totalCrops / limit),
                currentPage: parseInt(page, 10),
            }
        });
    } catch (error) {

    }
}