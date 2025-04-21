import express from 'express'
import { ChatBot } from '../controllers/chat.controller.js';
const router = express.Router();

router.post("/", ChatBot)
router.post("/personalized", ChatBot)


export default router
