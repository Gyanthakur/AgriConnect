import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        unit: {
            type: String,
            enum: ["kg", "quintal", "tonne", "gram"],
            default: "kg",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        images: {
            type: [String],
            required: true,
        },
        status: {
            type: String,
            enum: ["available", "pending", "sold"],
            default: "available",
        },
        harvestDate: {
            type: Date,
        },
        expiryDate: {
            type: Date,
        },
        dispatchTime: {
            type: Number,
            required: true,
            min: 0,
            default: 1,
        },
        isOrganic: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

cropSchema.index({ user: 1 });

const CropModel = mongoose.model("Crop", cropSchema);
export default CropModel;
