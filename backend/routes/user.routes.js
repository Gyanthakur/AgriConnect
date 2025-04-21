import express from 'express'
import verifyToken from '../middlewares/verifyToken.middleware.js';
import getToken from '../middlewares/getToken.middleware.js';
import { deleteUser, getAllUsers, getFarmers, getUserById, getUserDetail, updateProfileImage, updateUser } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js';
const router = express.Router();

router.get("/get-user", verifyToken, getUserDetail)
router.delete("/delete-user", verifyToken, deleteUser)
router.patch("/update-user", verifyToken, updateUser)
router.get("/get-user/:id", getToken, getUserById)
router.get("/all-users", getToken, getAllUsers)
router.get("/get-farmers", getToken, getFarmers)
router.post("/update-profile-image", verifyToken, upload.single("image"), updateProfileImage)
export default router
