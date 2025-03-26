import express from "express";
import { addCrop, getAllCrops, getCropById, updateCrop, deleteCrop, getMyCrops } from "../controllers/cropController.js";
// import upload from "../moddlewares/multer.js";
import upload from "../moddlewares/multer.js";
import authFarmer from "../moddlewares/farmerUser.js";

const cropRouter = express.Router();

cropRouter.post("/add", authFarmer, upload.single("image"), addCrop);
cropRouter.get("/all", getAllCrops);
cropRouter.get("/mine",authFarmer, getMyCrops);
cropRouter.get("/:cropId", getCropById);
cropRouter.put("/update/:cropId", authFarmer, upload.single("image"), updateCrop);
cropRouter.delete("/delete/:cropId", authFarmer, deleteCrop);


export default cropRouter;
