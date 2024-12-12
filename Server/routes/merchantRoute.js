import express from 'express'

import upload from '../moddlewares/multer.js';

import { getprofile, LoginMerchant, paymentRazorpay, registerMerchant, updateProfile, verifyRazorpay } from '../controllers/MerchantController.js';
import authMerchant from '../moddlewares/authMerchant.js';

const merchantRouter = express.Router();

merchantRouter.post('/register',registerMerchant)
merchantRouter.post('/login',LoginMerchant)

merchantRouter.get('/get-profile',authMerchant,getprofile)
merchantRouter.post('/update-profile',upload.single('image'),authMerchant,updateProfile)

merchantRouter.post('/payment-razorpay',authMerchant,paymentRazorpay)
merchantRouter.post('/verifyRazorpay',authMerchant,verifyRazorpay)

export default merchantRouter;