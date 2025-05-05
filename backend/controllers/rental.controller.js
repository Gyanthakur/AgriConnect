import EquipmentModel from "../models/equipment.model.js";
import RentalOrderModel from "../models/rentalOrder.model.js";

export const initiateRental = async (req, res) => {
    try {
        const renterId = req.user._id;
        const { equipmentId, rentalStart, rentalEnd } = req.body;

        if (!equipmentId || !rentalStart || !rentalEnd) {
            return res.status(400).json({ message: "Equipment ID, rental start date, and rental end date are required." });
        }

        const equipment = await EquipmentModel.findById(equipmentId);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found." });
        }

        if (equipment.isArchived || equipment.status !== "available") {
            return res.status(400).json({ message: "Equipment is not available for rent." });
        }

        const startDate = new Date(rentalStart);
        const endDate = new Date(rentalEnd);

        if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
            return res.status(400).json({ message: "Invalid rental dates provided." });
        }

        const msInDay = 1000 * 60 * 60 * 24;
        const totalDays = Math.ceil((endDate - startDate) / msInDay);

        const totalPrice = equipment.pricePerDay * totalDays;

        const order = new RentalOrderModel({
            renter: renterId,
            owner: equipment.user,
            equipment: equipment._id,
            rentalStart: startDate,
            rentalEnd: endDate,
            totalDays,
            totalPrice,
            stage: "initiated",
        });

        await order.save();
        res.status(201).json({ message: "Rental initiated successfully", order });
    } catch (err) {
        console.error("Initiate rental error:", err);
        res.status(500).json({ message: "Server error while initiating rental" });
    }
};


export const placeRental = async (req, res) => {
    try {
        const renterId = req.user._id;
        const orderId = req.params.id;
        const { deliveryAddress, notes } = req.body;

        if (!deliveryAddress || !deliveryAddress.line || !deliveryAddress.city)
            return res.status(400).json({ message: "Delivery address is incomplete." });

        const order = await RentalOrderModel.findOne({ _id: orderId, renter: renterId });
        if (!order) return res.status(404).json({ message: "Rental not found or unauthorized." });
        if (order.stage !== "initiated")
            return res.status(400).json({ message: "Only initiated rentals can be placed." });

        order.deliveryAddress = deliveryAddress;
        order.notes = notes || "";
        order.stage = "confirmed";
        order.paymentId = `mock_${Date.now()}`;
        order.paymentStatus = "success";

        await order.save();
        res.status(200).json({ message: "Rental placed successfully", order });
    } catch (err) {
        console.error("Place rental error:", err);
        res.status(500).json({ message: "Failed to place rental" });
    }
};
export const updateRentalDetails = async (req, res) => {
    try {
        const renterId = req.user._id;
        const orderId = req.params.id;
        const updates = req.body;

        const order = await RentalOrderModel.findOne({ _id: orderId, renter: renterId });
        if (!order) return res.status(404).json({ message: "Rental not found or unauthorized." });

        if (["active", "completed", "cancelled"].includes(order.stage))
            return res.status(400).json({ message: "Cannot update rental at this stage." });

        if (updates.deliveryAddress) order.deliveryAddress = updates.deliveryAddress;
        if (updates.notes !== undefined) order.notes = updates.notes;

        await order.save();
        res.status(200).json({ message: "Rental updated successfully", order });
    } catch (err) {
        console.error("Update rental error:", err);
        res.status(500).json({ message: "Failed to update rental" });
    }
};
export const getRentalDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await RentalOrderModel.findById(orderId)
            .populate("renter", "firstName lastName email phone image")
            .populate("owner", "firstName lastName email phone image")
            .populate("equipment", "name images pricePerDay category");

        if (!order) return res.status(404).json({ message: "Rental not found" });

        res.status(200).json({ message: "Rental details fetched successfully", order });
    } catch (error) {
        console.error("Error fetching rental details:", error);
        res.status(500).json({ message: "Failed to fetch rental details" });
    }
};
export const getUserRentals = async (req, res) => {
    try {
        const userId = req.user._id;

        const rentals = await RentalOrderModel.find({
            $or: [{ renter: userId }, { owner: userId }],
        })
            .populate("renter", "firstName lastName email phone")
            .populate("owner", "firstName lastName email phone")
            .populate("equipment", "name category pricePerDay images");

        if (!rentals.length) return res.status(404).json({ message: "No rentals found" });

        res.status(200).json({ message: "User rentals fetched successfully", rentals });
    } catch (error) {
        console.error("Error fetching user rentals:", error);
        res.status(500).json({ message: "Failed to fetch user rentals" });
    }
};
export const getOwnerRentals = async (req, res) => {
    try {
        const userId = req.user._id;

        const rentals = await RentalOrderModel.find({ owner: userId })
            .populate("renter", "firstName lastName email phone")
            .populate("owner", "firstName lastName email phone")
            .populate("equipment", "name category pricePerDay images");

        if (!rentals.length) return res.status(404).json({ message: "No rentals found" });

        res.status(200).json({ message: "Owner rentals fetched successfully", rentals });
    } catch (error) {
        console.error("Error fetching owner rentals:", error);
        res.status(500).json({ message: "Failed to fetch owner rentals" });
    }
};
export const updateRentalStage = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { stage } = req.body;

        const validStages = [
            "confirmed",
            "ongoing",
            "completed",
            "cancelled",
        ]
        if (!validStages.includes(stage))
            return res.status(400).json({ message: "Invalid stage value." });

        const order = await RentalOrderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Rental not found" });

        if (order.owner.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "You are not authorized to update this rental." });

        order.stage = stage;
        await order.save();

        res.status(200).json({ message: "Rental stage updated successfully", order });
    } catch (error) {
        console.error("Error updating rental stage:", error);
        res.status(500).json({ message: "Failed to update rental stage" });
    }
};

