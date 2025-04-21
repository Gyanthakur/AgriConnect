import express from 'express'
import upload from '../middlewares/multer.middleware.js';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { uploadImage } from '../controllers/utils.controller.js';
const router = express.Router();
router.post("/upload-images", verifyToken, upload.array("images", 10), uploadImage)
export default router
