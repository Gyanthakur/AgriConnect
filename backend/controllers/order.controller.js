import CropModel from "../models/crop.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
export const initiateOrder = async (req, res) => {
    try {
        const buyerId = req.user._id;
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "At least one item is required to initiate an order." });
        }

        const crop = await CropModel.findById(items[0].cropId);
        if (!crop) return res.status(404).json({ message: "Crop not found." });

        const sellerId = crop.user;

        const orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const crop = await CropModel.findById(item.cropId);
            if (!crop || crop.isArchived || crop.status !== "available") {
                return res.status(400).json({ message: `Invalid or unavailable crop: ${item.cropId}` });
            }

            const itemTotal = crop.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                crop: crop._id,
                name: crop.name,
                quantity: item.quantity,
                unit: crop.unit,
                price: crop.price,
                totalPrice: itemTotal,
                image: crop.images[0],
            });
        }

        const order = new OrderModel({
            buyer: buyerId,
            seller: sellerId,
            items: orderItems,
            totalAmount,
            stage: "initiated",
        });

        await order.save();
        res.status(201).json({ message: "Order initiated successfully", order });

    } catch (err) {
        console.error("Initiate order error:", err);
        res.status(500).json({ message: "Server error while initiating order" });
    }
};

export const placeOrder = async (req, res) => {
    try {
        const buyerId = req.user._id;
        const orderId = req.params.id;
        const { deliveryAddress, notes } = req.body;

        if (!deliveryAddress || !deliveryAddress.line || !deliveryAddress.city) {
            return res.status(400).json({ message: "Delivery address is incomplete." });
        }

        const order = await OrderModel.findOne({ _id: orderId, buyer: buyerId });

        if (!order) return res.status(404).json({ message: "Order not found or unauthorized." });
        if (order.stage !== "initiated") {
            return res.status(400).json({ message: "Only initiated orders can be placed." });
        }

        order.deliveryAddress = deliveryAddress;
        order.notes = notes || "";
        order.stage = "placed";
        order.paymentId = `mock_${Date.now()}`;
        order.paymentStatus = "success";

        await order.save();

        res.status(200).json({ message: "Order placed successfully", order });

    } catch (err) {
        console.error("Place order error:", err);
        res.status(500).json({ message: "Failed to place order" });
    }

};

export const updateOrderDetails = async (req, res) => {
    try {
        const buyerId = req.user._id;
        const orderId = req.params.id;
        const updates = req.body;

        const order = await OrderModel.findOne({ _id: orderId, buyer: buyerId });

        if (!order) return res.status(404).json({ message: "Order not found or unauthorized." });

        // Only allow updates before dispatch
        if (["dispatched", "delivered", "cancelled"].includes(order.stage)) {
            return res.status(400).json({ message: "Cannot update order at this stage." });
        }

        if (updates.deliveryAddress) {
            order.deliveryAddress = updates.deliveryAddress;
        }
        if (updates.notes !== undefined) {
            order.notes = updates.notes;
        }

        await order.save();
        res.status(200).json({ message: "Order updated successfully", order });

    } catch (err) {
        console.error("Update order error:", err);
        res.status(500).json({ message: "Failed to update order" });
    }
};

export const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Fetch the order details by ID
        const order = await OrderModel.findById(orderId)
            .populate("buyer", "firstName lastName email phone image") // Get user details for the buyer
            .populate("seller", "firstName lastName email phone image") // Get user details for the seller
            .populate("items.crop", "name category price images"); // Get crop details for each item

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Populate crop and user details for the order items
        const enrichedItems = await Promise.all(order.items.map(async (item) => {
            const crop = await CropModel.findById(item.crop);
            const buyer = await UserModel.findById(order.buyer);
            return {
                ...item.toObject(),
                crop: crop ? crop : null,
                buyer: buyer ? buyer : null,
            };
        }));

        return res.status(200).json({
            message: "Order details fetched successfully",
            order: { ...order.toObject(), items: enrichedItems },
        });

    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Failed to fetch order details" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id; // Authenticated user

        // Fetch all orders for the user (either as buyer or seller)
        const orders = await OrderModel.find({
            $or: [{ buyer: userId }, { seller: userId }],
        })
            .populate("buyer", "firstName lastName email phone image") // Get buyer details
            .populate("seller", "firstName lastName email phone image") // Get seller details
            .populate("items.crop", "name category price images"); // Get crop details for items

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json({
            message: "User orders fetched successfully",
            orders,
        });

    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Failed to fetch user orders" });
    }
};


export const getSellerOrders = async (req, res) => {
    try {
        const userId = req.user._id; // Authenticated seller

        // Fetch all orders where the seller is the seller
        const orders = await OrderModel.find({ seller: userId })
            .populate("buyer", "firstName lastName email phone image") // Get buyer details
            .populate("seller", "firstName lastName email phone image") // Get seller details
            .populate("items.crop", "name category price images"); // Get crop details for items

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json({
            message: "Seller's orders fetched successfully",
            orders,
        });

    } catch (error) {
        console.error("Error fetching seller orders:", error);
        res.status(500).json({ message: "Failed to fetch seller orders" });
    }
};


export const updateOrderStage = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { stage } = req.body;

        // Validate the stage value
        const validStages = ["placed", "confirmed", "dispatched", "delivered", "cancelled"];
        if (!validStages.includes(stage)) {
            return res.status(400).json({ message: "Invalid stage value." });
        }

        // Fetch the order to check if it belongs to the authenticated seller
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if the seller is authorized to update this order
        if (order.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this order." });
        }

        // Update the order stage
        order.stage = stage;
        await order.save();

        return res.status(200).json({
            message: "Order stage updated successfully",
            order,
        });

    } catch (error) {
        console.error("Error updating order stage:", error);
        res.status(500).json({ message: "Failed to update order stage" });
    }
};
