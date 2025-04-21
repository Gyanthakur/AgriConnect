import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import getToken from "../middlewares/getToken.middleware.js";
import { addCrop, deleteCrop, getAllCrops, getCropById, getCropsByUser, getUserCrops, searchCrops, updateCrop } from "../controllers/crop.controller.js";

const router = express.Router();

router.post("/add-crop", verifyToken, addCrop);
router.patch("/update-crop/:id", verifyToken, updateCrop);
router.delete("/delete-crop/:id", verifyToken, deleteCrop);
router.get("/all-crops", getToken, getAllCrops);
router.get("/my-crops", verifyToken, getUserCrops);
router.get("/get-crop/:id", getToken, getCropById);
router.get("/get-crops-by-user/:id", getToken, getCropsByUser);
router.get("/search-crops", getToken, searchCrops);


export default router;
