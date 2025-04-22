import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import getToken from "../middlewares/getToken.middleware.js";
import {
    addEquipment,
    updateEquipment,
    deleteEquipment,
    getAllEquipments,
    getUserEquipments,
    getEquipmentById,
    getEquipmentsByUser,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.post("/add-equipment", verifyToken, addEquipment);
router.patch("/update-equipment/:id", verifyToken, updateEquipment);
router.delete("/delete-equipment/:id", verifyToken, deleteEquipment);
router.get("/all-equipments", getToken, getAllEquipments);
router.get("/my-equipments", verifyToken, getUserEquipments);
router.get("/get-equipment/:id", getToken, getEquipmentById);
router.get("/get-equipments-by-user/:id", getToken, getEquipmentsByUser);
// router.get("/search-equipments", getToken, searchEquipments);

export default router;
