import { v2 as cloudinary } from "cloudinary";
export const uploadImage = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images provided" });
        }
        const uploadPromises = req.files.map((file) =>
            cloudinary.uploader.upload(file.path, {
                resource_type: "image",
            })
        );
        const results = await Promise.all(uploadPromises);
        const imageURLs = results.map((result) => result.secure_url);
        return res.status(200).json({ success: true, message: "Images uploaded successfully", data: imageURLs });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Upload failed" });
    }
}