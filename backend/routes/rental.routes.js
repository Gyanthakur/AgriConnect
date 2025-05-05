import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import {
    initiateRental,
    placeRental,
    updateRentalDetails,
    getUserRentals,
    getOwnerRentals,
    updateRentalStage,
    getRentalDetails,
} from "../controllers/rental.controller.js";

const router = express.Router();

// POST /api/rentals/initiate — Create an initial rental order (stage: "initiated")
router.post("/initiate", verifyToken, initiateRental);

// POST /api/rentals/:id/place — Finalize a rental order (stage: "placed")
router.post("/:id/place", verifyToken, placeRental);

// PATCH /api/rentals/:id — Update rental details (deliveryAddress or notes)
router.patch("/:id", verifyToken, updateRentalDetails);

// GET /api/rentals/user — Get all rentals placed by the authenticated renter
router.get("/user", verifyToken, getUserRentals);

// GET /api/rentals/owner — Get all rentals received by the equipment owner
router.get("/owner", verifyToken, getOwnerRentals);

// PUT /api/rentals/:orderId/stage — Owner can update the rental stage
router.put("/:orderId/stage", verifyToken, updateRentalStage);

// GET /api/rentals/:orderId — Get rental order details with equipment and user info
router.get("/:orderId", verifyToken, getRentalDetails);

export default router;
