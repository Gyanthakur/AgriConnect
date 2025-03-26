import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    status: {
      type: String,
      enum: ["available", "pending", "sold"],
      default: "available", // Default status is available
  },
    image: {
        type: String, // Cloudinary image URL
        required: true
    },
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
