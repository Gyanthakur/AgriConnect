import express from 'express'
import { sendLoginOTP, sendRegistrationOTP, verifyLoginOTP, verifyRegistrationOTP } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login/request-otp', sendLoginOTP)
router.post('/login/verify-otp', verifyLoginOTP)
router.post('/register/request-otp', sendRegistrationOTP)
router.post('/register/verify-otp', verifyRegistrationOTP)



export default router
