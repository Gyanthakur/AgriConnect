import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
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
        images: {
            type: [String],
            required: true,
            validate: [array => array.length > 0, "At least one image is required"],
        },
        pricePerDay: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["available", "unavailable", "pending", "archived"],
            default: "available",
        },
        isVerified: {
            type: Boolean,
            default: false, // Admin-verified
        },
        verificationDocuments: [
            {
                name: String,
                url: String,
            },
        ],
        contactNumber: {
            type: String,
            required: true,
            trim: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        bookingsCount: {
            type: Number,
            default: 0,
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
        availableFrom: {
            type: Date,
            default: Date.now,
        },
        availableTo: {
            type: Date,
            default: Date.now,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        safetyCheckPassed: {
            type: Boolean,
            default: false,
        },
        flaggedForReview: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

equipmentSchema.index({ user: 1 });
equipmentSchema.index({ category: 1 });

const EquipmentModel = mongoose.model("Equipment", equipmentSchema);
export default EquipmentModel;
