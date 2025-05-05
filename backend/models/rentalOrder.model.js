import mongoose from "mongoose";

const rentalOrderSchema = new mongoose.Schema(
    {
        renter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true,
        },
        rentalStart: {
            type: Date,
            required: true,
        },
        rentalEnd: {
            type: Date,
            required: true,
        },
        totalDays: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        stage: {
            type: String,
            enum: [
                "initiated",
                "review",
                "confirmed",
                "ongoing",
                "completed",
                "cancelled",
            ],
            default: "initiated",
        },
        paymentId: {
            type: String,
            default: null,
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
            }
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

const RentalOrderModel = mongoose.model("RentalOrder", rentalOrderSchema);
export default RentalOrderModel;
