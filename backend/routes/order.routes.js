import express from "express";

import verifyToken from '../middlewares/verifyToken.middleware.js';
import { getOrderDetails, getSellerOrders, getUserOrders, initiateOrder, placeOrder, updateOrderDetails, updateOrderStage } from "../controllers/order.controller.js";

const router = express.Router();

// POST /api/orders/initiate — Create an initial order (stage: "initiated")
router.post("/initiate", verifyToken, initiateOrder);

// POST /api/orders/:id/place — Finalize an order (stage: "placed")
router.post("/:id/place", verifyToken, placeOrder);

// PATCH /api/orders/:id — Update order details (deliveryAddress or notes)
router.patch("/:id", verifyToken, updateOrderDetails);

// GET /api/orders/user - Get all orders placed by the authenticated user
router.get("/user", verifyToken, getUserOrders);

// GET /api/orders/seller - Get all orders received by the seller
router.get("/seller", verifyToken, getSellerOrders);

// PUT /api/orders/:orderId/stage - Seller can update the order stage
router.put("/:orderId/stage", verifyToken, updateOrderStage);

// GET /api/orders/:orderId - Get order details by order ID, including crop and user details
router.get("/:orderId", verifyToken, getOrderDetails);

export default router;
