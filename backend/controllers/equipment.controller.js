import EquipmentModel from "../models/equipment.model.js";
import { validateEquipmentInput } from "../utils/validator.js";

export const addEquipment = async (req, res) => {
    try {
        const {
            name,
            category,
            pricePerDay,
            description = "",
            images = [],
            status = "available",
            tags = [],
            isArchived = false,
            contactNumber
        } = req.body;

        const validation = validateEquipmentInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message });
        }

        const newEquipment = new EquipmentModel({
            user: req.user?._id,
            name: name.trim(),
            category: category.trim(),
            pricePerDay,
            description: description.trim(),
            images,
            status,
            tags,
            isArchived,
            contactNumber
        });

        const savedEquipment = await newEquipment.save();
        return res.status(201).json({ success: true, message: "Successfully added equipment", data: savedEquipment });
    } catch (error) {
        console.error("Error adding equipment:", error);
        return res.status(500).json({ success: false, message: "Failed to add equipment" });
    }
};

export const updateEquipment = async (req, res) => {
    try {
        const equipmentId = req.params.id;
        const updates = req.body;
        const userId = req.user?._id;

        const equipment = await EquipmentModel.findOne({ _id: equipmentId, user: userId });
        if (!equipment) {
            return res.status(404).json({ success: false, message: "Equipment not found or unauthorized" });
        }

        const allowedFields = [
            "name",
            "category",
            "pricePerDay",
            "description",
            "images",
            "status",
            "tags",
            "isArchived",
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

        const validation = validateEquipmentInput(updateData);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message });
        }

        const updatedEquipment = await EquipmentModel.findByIdAndUpdate(equipmentId, { $set: updateData }, { new: true });
        return res.status(200).json({ success: true, message: "Equipment updated successfully", data: updatedEquipment });
    } catch (error) {
        console.error("Error updating equipment:", error);
        return res.status(500).json({ success: false, message: "Failed to update equipment" });
    }
};

export const deleteEquipment = async (req, res) => {
    try {
        const equipmentId = req.params.id;
        const userId = req.user?._id;

        const deletedEquipment = await EquipmentModel.findOneAndDelete({ _id: equipmentId, user: userId });
        if (!deletedEquipment) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }

        return res.status(200).json({ success: true, message: "Equipment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to delete equipment" });
    }
};

export const getAllEquipments = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { page = 1, limit = 30, search } = req.query;
        const skip = (page - 1) * limit;

        const queryObj = {};
        if (search) {
            queryObj.$or = [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ];
        }

        const equipments = await EquipmentModel.find({ ...queryObj })
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image address",
                model: "User",
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();

        const totalEquipments = await EquipmentModel.countDocuments({ ...queryObj });

        const modifiedEquipments = equipments.map(equipment => {
            const isUserEquipment = userId && equipment.user._id.toString() === userId.toString();
            return {
                ...equipment,
                isUserEquipment
            };
        });

        return res.status(200).json({
            success: true,
            data: {
                equipments: modifiedEquipments,
                totalEquipments,
                totalPages: Math.ceil(totalEquipments / limit),
                currentPage: parseInt(page, 10),
            }
        });
    } catch (error) {
        console.error("Error fetching equipments:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch equipments" });
    }
};

export const getUserEquipments = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const equipments = await EquipmentModel.find({ user: userId })
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image address",
                model: "User",
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();

        const totalEquipments = await EquipmentModel.countDocuments({ user: userId });

        const modifiedEquipments = equipments.map(equipment => ({
            ...equipment,
            isUserEquipment: true
        }));

        return res.status(200).json({
            success: true,
            data: {
                equipments: modifiedEquipments,
                totalEquipments,
                totalPages: Math.ceil(totalEquipments / limit),
                currentPage: parseInt(page, 10),
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch equipments" });
    }
};

export const getEquipmentById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    try {
        const equipment = await EquipmentModel.findById(id)
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image address",
                model: "User",
            }).lean();

        if (!equipment) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }

        const modifiedEquipment = {
            ...equipment,
            isUserEquipment: userId && equipment.user._id.toString() === userId.toString()
        };

        return res.status(200).json({ success: true, message: "Fetched equipment successfully", data: modifiedEquipment });

    } catch (error) {
        console.error("Error fetching equipment:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch equipment" });
    }
};

export const getEquipmentsByUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const equipments = await EquipmentModel.find({ user: id })
            .populate({
                path: "user",
                select: "name email phoneNumber firstName lastName profileImage verified image address",
                model: "User",
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();

        const totalEquipments = await EquipmentModel.countDocuments({ user: id });

        const modifiedEquipments = equipments.map(equipment => {
            const isUserEquipment = userId && equipment.user._id.toString() === userId.toString();
            return {
                ...equipment,
                isUserEquipment
            };
        });

        return res.status(200).json({
            success: true, message: "Fetched equipments successfully", data: {
                equipments: modifiedEquipments,
                totalEquipments,
                totalPages: Math.ceil(totalEquipments / limit),
                currentPage: parseInt(page, 10),
            }
        });

    } catch (error) {
        console.error("Error fetching equipments:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch equipments" });
    }
};
