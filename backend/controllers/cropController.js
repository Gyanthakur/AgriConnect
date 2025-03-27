
import { v2 as cloudinary } from "cloudinary";
import Crop from "../models/cropModel.js";
import farmerModel from "../models/farmerModel.js";



const addCrop = async (req, res) => {
    try {
        let { farmerId, name, category, price, quantity, description, status } = req.body;
        const imageFile = req.file;

        console.log("Received Data:", req.body, "File:", req.file);

        // Trim inputs if they are strings
        farmerId = farmerId?.trim();
        name = name?.trim();
        category = category?.trim();
        description = description?.trim();

        // Convert price & quantity to numbers safely
        price = Number(price);  
        quantity = Number(quantity);

        // Validate required fields
        if (!farmerId || !name || !category || isNaN(price) || isNaN(quantity) || !imageFile) {
            return res.status(400).json({ success: false, message: "Missing required fields or invalid data types" });
        }

        // Upload image to Cloudinary if available
        let imageURL = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            imageURL = imageUpload.secure_url;
        }

        // Create a new crop document
        const newCrop = new Crop({
            farmerId,
            name,
            category,
            price,
            quantity,
            description,
            status,
            image: imageURL,
        });

        await newCrop.save();
        res.status(201).json({ success: true, message: "Crop added successfully", crop: newCrop });

    } catch (error) {
        console.error("Error adding crop:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get all crops
const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json({ success: true, crops });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const getMyCrops = async (req, res) => {
    try {
        // Ensure farmer is authenticated
        if (!req.body.farmerId) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const farmerId = req.body.farmerId; // Get farmer ID from auth middleware

        // Fetch only the crops belonging to the logged-in farmer
        const crops = await Crop.find({ farmerId }); // Correct query

        res.json({ success: true, crops });
    } catch (error) {
        console.error("Error fetching farmer's crops:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};




// Get a single crop by ID
const getCropByFarmerId = async (req, res) => {
    try {
        const { farmerId } = req.params;
        const crop = await Crop.findById(farmerId);

        if (!crop) {
            return res.json({ success: false, message: "Crop not found" });
        }

        res.json({ success: true, crop });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Get a single crop by ID
// const getCropById = async (req, res) => {
//     try {
//         const { cropId } = req.params;
//         const { farmerId } = req.params;
//         console.log("Received Crop ID:", cropId);
//         console.log("Received Farmer ID:", farmerId);
//         const crop = await Crop.findById(cropId);

//         if (!crop) {
//             return res.json({ success: false, message: "Crop not found" });
//         }

//         res.json({ success: true, crop });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };

const getCropById = async (req, res) => {
    try {
        const { cropId } = req.params;
        // console.log("Received Crop ID:", cropId);

        // Fetch crop with farmer details
        const crop = await Crop.findById(cropId).lean();

        if (!crop) {
            return res.status(404).json({ success: false, message: "Crop not found" });
        }

        // Fetch farmer details
        const farmer = await farmerModel.findById(crop.farmerId).select("name email phone address image gender dob");
        // console.log("Farmer:", farmer);
        
        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer not found" });
        }

        res.json({ success: true, crop, farmer });
    } catch (error) {
        console.error("Error in getCropById:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update crop
const updateCrop = async (req, res) => {
    try {
        const { cropId } = req.params;
        const { name, category, price, quantity, description, status } = req.body;
        const imageFile = req.file;

        let updateData = { name, category, price, quantity, description, status };

        if (imageFile) {
            // Upload new image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            });
            updateData.image = imageUpload.secure_url;
        }

        const updatedCrop = await Crop.findByIdAndUpdate(cropId, updateData, { new: true });

        if (!updatedCrop) {
            return res.json({ success: false, message: "Crop not found" });
        }

        res.json({ success: true, message: "Crop updated successfully", crop: updatedCrop });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete a crop
const deleteCrop = async (req, res) => {
    try {
        const { cropId } = req.params;
        const deletedCrop = await Crop.findByIdAndDelete(cropId);

        if (!deletedCrop) {
            return res.json({ success: false, message: "Crop not found" });
        }

        res.json({ success: true, message: "Crop deleted successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addCrop, getAllCrops, getMyCrops, getCropByFarmerId, getCropById, updateCrop, deleteCrop };
