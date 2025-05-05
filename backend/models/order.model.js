import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema(
    {
        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
            required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unit: {
            type: String,
            required: true,
            enum: ["kg", "quintal", "tonne", "gram"],
        },
        price: { type: Number, required: true, min: 0 },
        totalPrice: { type: Number, required: true, min: 0 },
        image: { type: String, required: true },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: [(val) => val.length > 0, "Order must have at least one item"],
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        stage: {
            type: String,
            enum: ["initiated", "review", "placed", "confirmed", "dispatched", "delivered", "cancelled"],
            default: "initiated",
        },

        paymentId: {
            type: String,
            default: null, // store Razorpay ID, Stripe ID, or mock ID
            trim: true,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "success", "failed", "cancelled"],
            default: "pending",
        },

        deliveryAddress: {
            type: new mongoose.Schema(
                {
                    line: { type: String, trim: true, default: "" },
                    city: { type: String, trim: true, default: "" },
                    state: { type: String, trim: true, default: "" },
                    zip: { type: String, trim: true, default: "" },
                    country: { type: String, trim: true, default: "India" },
                },
                { _id: false }
            ),
            default: {
                line: "",
                city: "",
                state: "",
                zip: "",
                country: "India",
            },
        },
        expectedDeliveryDays: {
            type: Number,
            min: 0,
            default: 3,
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
